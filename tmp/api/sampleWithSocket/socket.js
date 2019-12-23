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
const utils_1 = require("../../components/utils");
class IO extends utils_1.SocketIO {
    save(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            this.socket.emit('sample:save', doc);
        });
    }
    remove(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            this.socket.emit('sample:remove', doc);
        });
    }
}
function setup(socket) {
    exports.io = new IO(socket);
}
exports.setup = setup;
