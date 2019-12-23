"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
exports.default = mongoose.model('Sample', new mongoose.Schema({
    name: String,
    info: String
})
    .plugin(paginate));
