const { successResponse , errorResponse} = require('../helpers/responseHelpers')
const UserModel = require('../models/UserModel');
const ToDoEntryModel = require('../models/ToDoEntryModel');
const sha512 = require('hash.js/lib/hash/sha/512');
const uuidv1 = require('uuid/v1');
const { issueToken } = require('../helpers/jwtHelpers');
import {Response} from 'express';
import IRequest from '@/interfaces/IRequest';
import IUser from '@/interfaces/IUser';
import IToDo from '@/interfaces/IToDo';

async function resetSessions(req: IRequest, res: Response) {
    try {
    const userLogin = req.userData.login;
    let user: IUser = await UserModel.findOne({ login: userLogin });   
    let session_uuid: string = uuidv1();
    user.jwtActiveUUID = session_uuid;
    await user.save();
    successResponse(res, {}, 200);
    } catch(err) {
        errorResponse(err, res)
    }
}

async function login(req: IRequest, res: Response) {
    try {
    const userLogin = req.body.login;
    const userPassword = req.body.password; 
    let user: IUser = await UserModel.findOne({ login: userLogin });
    if (!user || user.password !== sha512().update(userPassword).digest('hex')) {
        throw {message: "Wrong login/password provided", status: 401};
    }

    let token = issueToken({uuid: user.jwtActiveUUID, login: userLogin});

    successResponse(res, {token, userLogin}, 200);
    
    } catch(err) {
        errorResponse(err, res)
    }
}

async function register(req: IRequest, res: Response) {
    try {
        const userLogin = req.body.login;
        const userPassword = req.body.password; 
        const users: IUser[] = await UserModel.find({ login: userLogin });
        
        if (users.length) throw {message: "User with this login has already been created", status: 400};

        let session_uuid = uuidv1();

        await UserModel.create({
            login: userLogin,
            password: sha512().update(userPassword).digest('hex'),
            email: req.body.email,
            jwtActiveUUID: session_uuid
        });  

        let token: string = issueToken({uuid: session_uuid, login: userLogin});

        successResponse(res, {token, userLogin}, 200);

    } catch (err) {
        errorResponse(err, res)
    }
}

async function getUserToDoEntries(req: IRequest, res: Response) {
    try {
        let userTodos: IToDo[] = await ToDoEntryModel.find({creatorLogin: req.userData.login});
        successResponse(res, {todos: userTodos}, 200);
    } catch(err) {
        errorResponse(err, res)
    }
}

async function addTodo(req: IRequest, res: Response) {
    try {
        let user = req.userData;    
        await ToDoEntryModel.create({creatorLogin: user.login, caption: req.body.caption});
        successResponse(res, {message: 'Todo has been created'}, 200);
    } catch(err) {
        errorResponse(err, res)
    }
}

async function updateTodoStatus(req: IRequest, res: Response) {
    try {
        let user = req.userData; 
        let newTodoStatus = req.body.newStatus;
        let possibleStatuses = ['completed', 'incompleted'];
        if (possibleStatuses.indexOf(newTodoStatus) < 0) throw {message: 'Invalid todo status provided', status: 400};    
        await ToDoEntryModel.updateOne({creatorLogin: user.login, _id: req.body.todoId}, {status: newTodoStatus});
        successResponse(res, {
            message: 'Todo has been updated'
        }, 200)
        } catch(err) {
            errorResponse(err, res)
        }
}

async function deleteTodo(req: IRequest, res: Response) {
    try {
        let user = req.userData;
        await ToDoEntryModel.findOneAndDelete({creatorLogin: user.login, _id: req.params.id});
        successResponse(res, {
            message: 'Todo has been deleted'
        }, 200)
    } catch (err) {
        errorResponse(err, res)
    }
}

module.exports = {
    resetSessions,
    login,
    register,
    getUserToDoEntries,
    addTodo,
    updateTodoStatus,
    deleteTodo
}