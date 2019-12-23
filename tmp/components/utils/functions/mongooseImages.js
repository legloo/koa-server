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
const mongoose_1 = require("../../../mongoose");
const config_1 = require("../../../config");
const fsp = require('fs-extra');
// import * as fsp from 'fs-extra';
const del = require("del");
const sharp = require("sharp");
function mongooseImages(schema, options) {
    schema.pre('save', function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            let baseDir = options.baseDir || config_1.root + '/static';
            let dir = baseDir + '/' + self._id;
            let exists = yield fsp.ensureDir(dir);
            if (!exists) {
                yield fsp.mkdirs(dir);
            }
            for (let path of Object.keys(schema['paths'])) {
                if (schema['paths'][path].constructor == mongoose_1.Image) {
                    if (self[path] && self[path].length) {
                        let tmp = self[path][0].path;
                        let meta = yield sharp(tmp).metadata();
                        let filePath = `${dir}/${path}`;
                        yield del(`${dir}/${path}.*`, { force: true });
                        yield fsp.copy(tmp, filePath + '.' + meta.format);
                        yield del(tmp, { force: true });
                        let imagePath = `${self._id}/${path}.${meta.format}`;
                        let url;
                        if (options.generateUrl) {
                            url = options.generateUrl(baseDir, `${self._id}/${path}.${meta.format}`);
                        }
                        else {
                            url = filePath;
                        }
                        self[path] = {
                            url: url,
                            width: meta.width,
                            height: meta.height,
                            channel: meta.channels,
                            hasAlpha: meta.hasAlpha,
                            hasProfile: meta.hasProfile,
                            format: meta.format,
                            size: self[path][0].size
                        };
                    }
                }
            }
            next();
        });
    });
    schema.pre('remove', function (next) {
        let dir = config_1.root + '/static/' + this._id;
        del(dir);
        next();
    });
}
exports.mongooseImages = mongooseImages;
