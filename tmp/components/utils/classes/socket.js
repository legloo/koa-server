"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketIO {
    constructor(__socket) {
        this.__socket = __socket;
    }
    get socket() {
        return this.__socket;
    }
}
exports.SocketIO = SocketIO;
