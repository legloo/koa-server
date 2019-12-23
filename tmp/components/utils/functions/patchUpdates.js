"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function patchUpdates(entity, updates) {
    if (updates._id)
        delete updates._id;
    let updated = _.mergeWith(entity, updates, (objValue, srcValue) => {
        if (_.isObject(objValue) && srcValue === null) {
            if (_.isArray(objValue))
                return [];
            return {};
        }
        if (_.isArray(objValue)) {
            let merged = [];
            for (let i = 0; i < srcValue.length; i++) {
                merged[i] = _.isEmpty(srcValue[i]) && srcValue[i] !== null ? objValue[i] : srcValue[i];
            }
            return merged.filter(x => x !== null);
        }
    });
    return updated;
}
exports.patchUpdates = patchUpdates;
