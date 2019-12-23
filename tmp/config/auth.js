"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = {
    providers: {
        wechat: {
            appId: 'xxxxxx',
            appKey: 'xxxxxx'
        },
        qq: {
            appId: 'xxxxxx',
            appKey: 'xxxxxx'
        }
    },
    roles: {
        all: ['super', 'admin', 'user'],
        default: ['user']
    },
    expires: 60 * 60 * 24 * 360 * 10
};
