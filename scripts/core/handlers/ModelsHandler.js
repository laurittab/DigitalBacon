/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import GLTFAsset from '/scripts/core/assets/GLTFAsset.js';
import AssetTypes from '/scripts/core/enums/AssetTypes.js';
import PubSubTopics from '/scripts/core/enums/PubSubTopics.js';
import AssetsHandler from '/scripts/core/handlers/AssetsHandler.js';
import LibraryHandler from '/scripts/core/handlers/LibraryHandler.js';

class ModelsHandler extends AssetsHandler {
    constructor() {
        super(PubSubTopics.MODEL_ADDED, PubSubTopics.MODEL_DELETED,
            AssetTypes.MODEL);
    }

    addNewAsset(assetId, params, ignoreUndoRedo, ignorePublish) {
        let asset = new GLTFAsset(params || { assetId: assetId });
        this.addAsset(asset, ignoreUndoRedo, ignorePublish);
        return asset;
    }

    load(assets, isDiff) {
        if(!assets) return;
        if(isDiff) {
            let assetsToDelete = [];
            for(let id in this._assets) {
                let asset = this._assets[id];
                let assetId = asset.getAssetId();
                if(!(assetId in assets) || !assets[assetId].some(p=>p.id==id))
                    assetsToDelete.push(asset);
            }
            for(let asset of assetsToDelete) {
                this.deleteAsset(asset, true, true);
            }
        }
        for(let assetTypeId in assets) {
            if(!(assetTypeId in LibraryHandler.library)) {
                console.error("Unrecognized asset found");
                continue;
            }
            for(let params of assets[assetTypeId]) {
                if(isDiff && this._assets[params.id]) {
                    this._assets[params.id].updateFromParams(params);
                } else {
                    this.addNewAsset(assetTypeId, params, true, true);
                }
            }
        }
    }
}

let modelsHandler = new ModelsHandler();
export default modelsHandler;
