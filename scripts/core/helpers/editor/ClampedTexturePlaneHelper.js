/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import global from '/scripts/core/global.js';
import ClampedTexturePlane from '/scripts/core/assets/ClampedTexturePlane.js';
import PubSubTopics from '/scripts/core/enums/PubSubTopics.js';
import { vector3s } from '/scripts/core/helpers/constants.js';
import AssetEntityHelper from '/scripts/core/helpers/editor/AssetEntityHelper.js';
import EditorHelperFactory from '/scripts/core/helpers/editor/EditorHelperFactory.js';
import CheckboxInput from '/scripts/core/menu/input/CheckboxInput.js';

export default class ClampedTexturePlaneHelper extends AssetEntityHelper {
    constructor(asset) {
        super(asset, PubSubTopics.IMAGE_UPDATED);
    }

    place(intersection) {
        let object = intersection.object;
        let point = intersection.point;
        let face = intersection.face;
        object.updateMatrixWorld();
        let normal = intersection.face.normal.clone()
            .transformDirection(object.matrixWorld).clampLength(0, 0.001);
        if(global.camera.getWorldDirection(vector3s[0]).dot(normal) > 0)
            normal.negate();
        this._object.position.copy(normal).add(point);
        this._object.lookAt(normal.add(this._object.position));
        this.roundAttributes(true);
    }

    static fields = [
        { "parameter": "visualEdit" },
        { "parameter": "doubleSided", "name": "Double Sided",
            "suppressMenuFocusEvent": true, "type": CheckboxInput },
        { "parameter": "parentId" },
        { "parameter": "position" },
        { "parameter": "rotation" },
        { "parameter": "scale" },
    ];
}

EditorHelperFactory.registerEditorHelper(ClampedTexturePlaneHelper, ClampedTexturePlane);
