"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
exports.default = mongoose.model('Authinelog', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    workItem: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
})
    .plugin(paginate));
