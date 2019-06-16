"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ToDoEntrySchema = require('../schemas/ToDoEntrySchema');
var ToDoEntryModel = mongoose_1.default.model('ToDoEntry', ToDoEntrySchema);
module.exports = ToDoEntryModel;
