"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(boomError) {
        super(boomError.message);
    }
}
exports.Exception = Exception;
