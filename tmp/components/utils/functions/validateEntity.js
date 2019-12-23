"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
function validateEntity(entity) {
    if (!entity) {
        throw new __1.EntityNotFoundError();
    }
}
exports.validateEntity = validateEntity;
