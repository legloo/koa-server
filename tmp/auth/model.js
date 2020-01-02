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
const crypto = require("crypto");
const mongoose = require("mongoose");
// import { Schema } from 'mongoose'
const config = require("../config");
const authTypes = Object.keys(config.auth.providers);
const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: function () {
            if (!this.providers || !this.providers.length) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    password: {
        type: String,
        required: function () {
            if (!this.providers || !this.providers.length) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    roles: [{
            type: String
        }],
    datetime: {
        type: Date,
        default: Date.now
    },
    providers: [{
            name: {
                type: String,
                enum: authTypes
            },
            openid: String
        }],
    salt: String
}, {
    collection: 'auths',
    discriminatorKey: '_model'
});
AuthSchema['options'].toJSON = {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.salt;
        return ret;
    }
};
/**
 * Validations
 */
// Validate empty username
AuthSchema
    .path('username')
    .validate(function (username) {
    if (this.providers && this.providers.length) {
        return true;
    }
    return username.length;
}, 'Username cannot be blank');
// Validate empty password
AuthSchema
    .path('password')
    .validate(function (password) {
    if (this.providers && this.providers.length) {
        return true;
    }
    return password.length;
}, 'Password cannot be blank');
// Validate username is not taken
AuthSchema
    .path('username')
    .validate(function (value, respond) {
    var self = this;
    if (this.providers && this.providers.length) {
        return respond;
    }
    return this.constructor.findOne({ username: value }).exec()
        .then(function (user) {
        if (user) {
            if (self.id === user.id) {
                return respond;
            }
            return respond;
        }
        return respond;
    })
        .catch(function (err) {
        throw err;
    });
}, 'The specified username is already in use.');
/**
 * Pre-save hook
 */
function validatePresenceOf(value) {
    return value && value.length;
}
AuthSchema
    .pre('save', (next) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle new/update passwords
    if (!this.isModified('password')) {
        return next();
    }
    if (!validatePresenceOf(this.password)) {
        if (!this.providers || !this.providers.length) {
            return next(new Error('Invalid password'));
        }
        else {
            return next();
        }
    }
    // Make salt
    try {
        let salt = yield this.makeSalt();
        this.salt = salt;
        let hashedPassword = yield this.encryptPassword(this.password);
        this.password = hashedPassword;
        next();
    }
    catch (e) {
        next(e);
    }
}));
/**
 * Methods
 */
AuthSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @return {Boolean}
     * @api public
     */
    authenticate(password) {
        return __awaiter(this, void 0, void 0, function* () {
            let pwdGen = yield this.encryptPassword(password);
            return this.password === pwdGen;
        });
    },
    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @return {String}
     * @api public
     */
    makeSalt(byteSize = 16) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(byteSize, (err, salt) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(salt.toString('base64'));
                }
            });
        });
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            if (!password || !this.salt) {
                reject(new Error('Missing password or salt'));
            }
            let defaultIterations = 10000;
            let defaultKeyLength = 64;
            let salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(key.toString('base64'));
                }
            });
        });
    }
};
exports.default = mongoose.model('Auth', AuthSchema);
