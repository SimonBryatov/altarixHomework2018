"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('../helpers/responseHelpers'), successResponse = _a.successResponse, errorResponse = _a.errorResponse;
var UserModel = require('../models/UserModel');
var ToDoEntryModel = require('../models/ToDoEntryModel');
var sha512 = require('hash.js/lib/hash/sha/512');
var uuidv1 = require('uuid/v1');
var issueToken = require('../helpers/jwtHelpers').issueToken;
function resetSessions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLogin, user, session_uuid, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userLogin = req.userData.login;
                    return [4 /*yield*/, UserModel.findOne({ login: userLogin })];
                case 1:
                    user = _a.sent();
                    session_uuid = uuidv1();
                    user.jwtActiveUUID = session_uuid;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    successResponse(res, {}, 200);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    errorResponse(err_1, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLogin, userPassword, user, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userLogin = req.body.login;
                    userPassword = req.body.password;
                    return [4 /*yield*/, UserModel.findOne({ login: userLogin })];
                case 1:
                    user = _a.sent();
                    if (!user || user.password !== sha512().update(userPassword).digest('hex')) {
                        throw { message: "Wrong login/password provided", status: 401 };
                    }
                    token = issueToken({ uuid: user.jwtActiveUUID, login: userLogin });
                    successResponse(res, { token: token, userLogin: userLogin }, 200);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    errorResponse(err_2, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userLogin, userPassword, users, session_uuid, token, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userLogin = req.body.login;
                    userPassword = req.body.password;
                    return [4 /*yield*/, UserModel.find({ login: userLogin })];
                case 1:
                    users = _a.sent();
                    if (users.length)
                        throw { message: "User with this login has already been created", status: 400 };
                    session_uuid = uuidv1();
                    return [4 /*yield*/, UserModel.create({
                            login: userLogin,
                            password: sha512().update(userPassword).digest('hex'),
                            email: req.body.email,
                            jwtActiveUUID: session_uuid
                        })];
                case 2:
                    _a.sent();
                    token = issueToken({ uuid: session_uuid, login: userLogin });
                    successResponse(res, { token: token, userLogin: userLogin }, 200);
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    errorResponse(err_3, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUserToDoEntries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userTodos, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ToDoEntryModel.find({ creatorLogin: req.userData.login })];
                case 1:
                    userTodos = _a.sent();
                    successResponse(res, { todos: userTodos }, 200);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    errorResponse(err_4, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addTodo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.userData;
                    return [4 /*yield*/, ToDoEntryModel.create({ creatorLogin: user.login, caption: req.body.caption })];
                case 1:
                    _a.sent();
                    successResponse(res, { message: 'Todo has been created' }, 200);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    errorResponse(err_5, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateTodoStatus(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, newTodoStatus, possibleStatuses, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.userData;
                    newTodoStatus = req.body.newStatus;
                    possibleStatuses = ['completed', 'incompleted'];
                    if (possibleStatuses.indexOf(newTodoStatus) < 0)
                        throw { message: 'Invalid todo status provided', status: 400 };
                    return [4 /*yield*/, ToDoEntryModel.updateOne({ creatorLogin: user.login, _id: req.body.todoId }, { status: newTodoStatus })];
                case 1:
                    _a.sent();
                    successResponse(res, {
                        message: 'Todo has been updated'
                    }, 200);
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    errorResponse(err_6, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.userData;
                    return [4 /*yield*/, ToDoEntryModel.findOneAndDelete({ creatorLogin: user.login, _id: req.params.id })];
                case 1:
                    _a.sent();
                    successResponse(res, {
                        message: 'Todo has been deleted'
                    }, 200);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    errorResponse(err_7, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    resetSessions: resetSessions,
    login: login,
    register: register,
    getUserToDoEntries: getUserToDoEntries,
    addTodo: addTodo,
    updateTodoStatus: updateTodoStatus,
    deleteTodo: deleteTodo
};
