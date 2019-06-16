"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ToDoEntrySchema = new mongoose_1.Schema({
    creatorLogin: String,
    caption: String,
    status: { type: String, default: 'incompleted' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = ToDoEntrySchema;
