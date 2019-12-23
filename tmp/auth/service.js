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
const config = require("../config");
const jwt = require("jsonwebtoken");
const compose = require("koa-compose");
const model_1 = require("./model");
const Utils = require("../components/utils");
function signToken(id, roles, providers) {
    return jwt.sign({ _id: id, roles: roles, providers: providers }, config.secrets.session, {
        expiresIn: config.auth.expires
    });
}
exports.signToken = signToken;
function validateToken(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!ctx.headers.authorization || !ctx.headers.authorization.startsWith('Bearer '))
                throw new Utils.AuthError('invalid token');
            let token = ctx.headers.authorization.replace('Bearer ', '');
            ctx.user = yield new Promise((resolve, reject) => {
                jwt.verify(token, config.secrets.session, (error, decoded) => {
                    if (error) {
                        reject(new Utils.AuthError('invalid token'));
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
            yield next();
        }
        catch (e) {
            Utils.handleError(ctx, e);
        }
    });
}
function validateUser(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield model_1.default.findById(ctx.user._id).exec();
            if (!user) {
                throw new Utils.EntityNotFoundError('Invalid user id');
            }
            ;
            ctx.user = user;
            yield next();
        }
        catch (e) {
            Utils.handleError(ctx, e);
        }
    });
}
function isAuthenticated() {
    return compose([
        validateToken,
        validateUser
    ]);
}
exports.isAuthenticated = isAuthenticated;
/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose([
        isAuthenticated(),
        (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!!~ctx.user.roles.indexOf(roleRequired) || !!~ctx.user.roles.indexOf('super')) {
                    yield next();
                }
                else {
                    throw new Utils.PermissonError('you do not have sufficient privilege to perform this action');
                }
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        })
    ]);
}
exports.hasRole = hasRole;
/*
 * Checks if the user role meets the minimum requirements of the route or matches req.params.id
 */
function OwnsOrHasRole(roleRequired, model, field) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose([
        isAuthenticated(),
        (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!!~ctx.user.roles.indexOf(roleRequired) || !!~ctx.user.roles.indexOf('super')) {
                    ctx.user.hasRole = true;
                }
                if (ctx.user._id == ctx.params.id) {
                    ctx.user.owns = true;
                }
                if (!ctx.user.owns) {
                    if (!model)
                        throw Error();
                    let entity = yield model.findById(ctx.params.id, field).exec();
                    Utils.validateEntity(entity);
                    if (entity[field]._id == ctx.user._id) {
                        ctx.user.owns = true;
                    }
                }
                if (!ctx.user.hasRole && !ctx.user.owns) {
                    throw new Utils.PermissonError('you do not have sufficient privilege to perform this action');
                }
                yield next();
            }
            catch (e) {
                Utils.handleError(ctx, e);
            }
        })
    ]);
}
exports.OwnsOrHasRole = OwnsOrHasRole;
function appendUser() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!ctx.headers.authorization || !ctx.headers.authorization.startsWith('Bearer '))
                    throw new Utils.AuthError('invalid token');
                let token = ctx.headers.authorization.replace('Bearer ', '');
                ctx.user = yield new Promise((resolve, reject) => {
                    jwt.verify(token, config.secrets.session, (error, decoded) => {
                        if (error) {
                            reject(new Utils.AuthError('invalid token'));
                        }
                        else {
                            resolve(decoded);
                        }
                    });
                });
                yield next();
            }
            catch (e) {
                yield next();
            }
        });
    };
}
exports.appendUser = appendUser;
