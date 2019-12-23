"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const socket_1 = require("./socket");
exports.default = mongoose.model('Samplewithsocket', new mongoose.Schema({
    name: String,
    info: String
})
    .plugin(paginate)
    .post('save', function (doc) {
    socket_1.io.save(doc);
})
    .post('remove', function (doc) {
    socket_1.io.remove(doc);
}));
