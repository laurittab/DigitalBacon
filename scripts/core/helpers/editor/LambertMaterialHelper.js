/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import LambertMaterial from '/scripts/core/assets/materials/LambertMaterial.js';
import TextureTypes from '/scripts/core/enums/TextureTypes.js';
import { COMBINE_MAP } from '/scripts/core/helpers/constants.js';
import EditorHelperFactory from '/scripts/core/helpers/editor/EditorHelperFactory.js';
import MaterialHelper from '/scripts/core/helpers/editor/MaterialHelper.js';
import CheckboxInput from '/scripts/core/menu/input/CheckboxInput.js';
import ColorInput from '/scripts/core/menu/input/ColorInput.js';
import EnumInput from '/scripts/core/menu/input/EnumInput.js';
import NumberInput from '/scripts/core/menu/input/NumberInput.js';
import TextureInput from '/scripts/core/menu/input/TextureInput.js';

export default class LambertMaterialHelper extends MaterialHelper {
    constructor(asset) {
        super(asset);
    }

    static fields = [
        { "parameter": "color", "name": "Color", "type": ColorInput },
        { "parameter": "map","name": "Texture Map",
            "filter": TextureTypes.BASIC, "type": TextureInput },
        { "parameter": "side" },
        { "parameter": "transparent" },
        { "parameter": "opacity" },
        { "parameter": "alphaMap","name": "Alpha Map",
            "filter": TextureTypes.BASIC, "type": TextureInput },
        { "parameter": "wireframe", "name": "Wireframe", "type": CheckboxInput},
        { "parameter": "emissive", "name": "Emissive Color", "type":ColorInput},
        { "parameter": "emissiveMap","name": "Emissive Map",
            "filter": TextureTypes.BASIC, "type": TextureInput },
        { "parameter": "emissiveIntensity","name": "Emissive Intensity",
            "min": 0, "type": NumberInput },
        { "parameter": "envMap","name": "Environment Map",
            "filter": TextureTypes.CUBE, "type": TextureInput },
        { "parameter": "combine","name": "Color & Environment Blend",
            "map": COMBINE_MAP, "type": EnumInput },
        { "parameter": "reflectivity","name": "Reflectivity",
            "min": 0, "max": 1, "type": NumberInput },
        { "parameter": "refractionRatio","name": "Refraction Ratio",
            "min": 0, "max": 1, "type": NumberInput },
    ];
}

EditorHelperFactory.registerEditorHelper(LambertMaterialHelper, LambertMaterial);
