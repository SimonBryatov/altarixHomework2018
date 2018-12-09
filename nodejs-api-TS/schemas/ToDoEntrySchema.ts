import {Schema} from 'mongoose';

const ToDoEntrySchema = new Schema({
    creatorLogin:  String,
    caption: String,
    status: { type: String, default: 'incompleted'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = ToDoEntrySchema;