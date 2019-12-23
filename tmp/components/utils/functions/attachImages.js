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
const sharp = require("sharp");
function attachImages(ctx, options) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let key of Object.keys(ctx.request.fields)) {
            if (ctx.request.fields[key].contructor === File) {
                let meta = yield sharp(ctx.request.fields[key].path).metadata();
                let image = {
                    tmp: ctx.request.fields[key].path,
                    path: 'abc'
                };
            }
        }
    });
}
exports.attachImages = attachImages;
