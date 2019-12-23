"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = require("boom");
const Errors = [
    {
        code: 400,
        b(m) {
            return Boom.badRequest(m);
        },
        types: ['CastError']
    },
    {
        code: 401,
        b(m) {
            return Boom.unauthorized(m);
        },
        types: ['AuthError', 'UnauthorizedError']
    },
    {
        code: 403,
        b(m) {
            return Boom.forbidden(m);
        },
        types: ['PermissonError']
    },
    {
        code: 404,
        b(m) {
            return Boom.notFound(m);
        },
        types: ['EntityNotFoundError']
    },
    {
        code: 422,
        b(m) {
            return Boom.badData(m);
        },
        types: ['ValidationError', 'SyntaxError', 'FileUploadError', 'WechatError', 'ImageProcessError']
    }
];
function getErrorStatus(error) {
    for (let Error of Errors) {
        if (!!~Error.types.indexOf(error.name)) {
            let a = Error.b;
            let c = a(error.message);
            return c;
        }
    }
}
exports.getErrorStatus = getErrorStatus;
function getErrorStatusCode(error) {
    for (let Error of Errors) {
        if (!!~Error.types.indexOf(error.name)) {
            return Error.code;
        }
    }
    return 500;
}
exports.getErrorStatusCode = getErrorStatusCode;
class EntityNotFoundError extends Error {
    constructor(message) {
        super(message || 'Entity not found');
        this.name = 'EntityNotFoundError';
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class PermissonError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PermissonError';
    }
}
exports.PermissonError = PermissonError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class FileUploadError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileUploadError';
    }
}
exports.FileUploadError = FileUploadError;
class WechatError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WechatError';
    }
}
exports.WechatError = WechatError;
class ImageProcessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageProcessError';
    }
}
exports.ImageProcessError = ImageProcessError;
