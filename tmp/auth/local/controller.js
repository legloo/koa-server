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
const service_1 = require("../service");
const model_1 = require("../../api/user/model");
const Utils = require("../../components/utils");
const config = require("../../config");
function signIn(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield model_1.default.findOne({
                username: ctx.request.fields.username
            }).exec();
            if (!user) {
                throw new Utils.AuthError('This username is not registered');
            }
            let authenticated = yield user.authenticate(ctx.request.fields.password);
            if (!authenticated) {
                throw new Utils.AuthError('This password is not correct');
            }
            else {
                const token = service_1.signToken(user._id, user.roles);
                ctx.body = { token };
            }
        }
        catch (e) {
            Utils.handleError(ctx, e);
        }
    });
}
exports.signIn = signIn;
function signUp(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(ctx.request.fields);
            let newUser = new model_1.default(ctx.request.fields);
            console.log('newUser=>>>', newUser);
            newUser['roles'] = config.auth.roles.default;
            yield newUser.save();
            const token = service_1.signToken(newUser._id, newUser['roles']);
            ctx.status = 200;
            ctx.body = { token };
        }
        catch (e) {
            Utils.handleError(ctx, e);
        }
    });
}
exports.signUp = signUp;
function reset(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldPass = String(ctx.request.fields.oldPassword);
        const newPass = String(ctx.request.fields.newPassword);
        try {
            let user = yield model_1.default.findById(ctx.user._id).exec();
            Utils.validateEntity(user);
            let authenticated = yield user['authenticate'](oldPass);
            if (!authenticated) {
                throw new Utils.AuthError();
            }
            user['password'] = newPass;
            yield user.save();
            ctx.status = 204;
            ctx.body = '';
        }
        catch (e) {
            Utils.handleError(ctx, e);
        }
    });
}
exports.reset = reset;
