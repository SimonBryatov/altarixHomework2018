"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//в идеале, можно cделать отдельный стор для сессий, но я добавил простую деактивацию токенов
var UserSchema = new mongoose_1.Schema({
    login: String,
    password: String,
    email: String,
    jwtActiveUUID: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = UserSchema;
