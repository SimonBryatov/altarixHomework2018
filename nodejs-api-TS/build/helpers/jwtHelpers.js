"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cert = process.env.JWT_SECRET;
function issueToken(userData) {
    return jsonwebtoken_1.default.sign(userData, cert, { expiresIn: '14d' });
}
function checkToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, cert);
    }
    catch (_a) {
        throw { message: 'Invalid token provided', status: 401 };
    }
}
module.exports = { issueToken: issueToken, checkToken: checkToken };
