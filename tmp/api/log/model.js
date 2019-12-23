"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
exports.default = mongoose.model('Log', new mongoose.Schema({
    content: String,
    time: Date,
    smiles: Boolean
})
    .plugin(paginate));
