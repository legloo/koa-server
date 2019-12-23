"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const Utils = require("../../components/utils");
class Controller extends Utils.Controller {
    // Gets a list of Models
    index(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let paginateResult = yield Utils.paginate(this.model, ctx);
                ctx.status = 200;
                ctx.body = paginateResult;
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        });
    }
    // Gets a single Model from the DB
    show(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let entity = yield Utils.show(this.model, ctx);
                Utils.validateEntity(entity);
                ctx.status = 200;
                ctx.body = entity;
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        });
    }
    // Creates a new Model in the DB
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete ctx.request.fields._id;
                let entity = yield this.model.create(ctx.request.fields);
                ctx.status = 201;
                ctx.body = entity;
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        });
    }
    // Updates an existing Model in the DB
    update(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete ctx.request.fields._id;
                let entity = yield this.model.findById(ctx.params.id).exec();
                Utils.validateEntity(entity);
                Utils.patchUpdates(entity, ctx.request.fields);
                yield entity.save();
                ctx.status = 200;
                ctx.body = entity;
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        });
    }
    // Deletes a Model from the DB
    destroy(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let entity = yield this.model.findById(ctx.params.id).exec();
                Utils.validateEntity(entity);
                yield entity.remove();
                ctx.status = 204;
                ctx.body = '';
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        });
    }
}
exports.default = new Controller(model_1.default);
