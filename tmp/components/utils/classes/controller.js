"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(__model) {
        this.__model = __model;
        for (let method of ['index', 'show', 'create', 'update', 'destroy']) {
            this[method] = this[method].bind(this);
        }
    }
    get model() {
        return this.__model;
    }
}
exports.Controller = Controller;
