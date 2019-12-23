"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// Evironment
exports.env = process.env.NODE_ENV;
// Root path of server
exports.root = path_1.normalize(__dirname + '/../..');
// Server port
exports.port = process.env.PORT || 9000;
// Server IP
exports.ip = process.env.IP || '0.0.0.0';
// Server Domain
exports.domain = process.env.DOMAIN || `localhost:${exports.port}`;
// Secret for session, you will want to change this and make it an environment variable
exports.secrets = {
    session: 'server-secret'
};
