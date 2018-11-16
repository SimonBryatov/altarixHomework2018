const { successResponse , errorResponse} = require('../helpers/responseHelpers')
const UserModel = require('../models/UserModel');
const ToDoEntryModel = require('../models/ToDoEntryModel');
const sha512 = require('hash.js/lib/hash/sha/512');
const uuidv1 = require('uuid/v1');
const { issueToken } = require('../helpers/jwtHelpers');

async function resetSessions(req, res) {
    try {
    const userLogin = req.userData.login;
    let user = await UserModel.find({ login: userLogin });
    user = user[0];   
    let session_uuid = uuidv1();
    user.jwtActiveUUID = session_uuid;
    await user.save();
    successResponse(res, {}, 200);
    } catch(err) {
        errorResponse(err, res)
    }
}


async function login(req, res) {
    try {
    const userLogin = req.body.login;
    const userPassword = req.body.password; 
    let user = await UserModel.find({ login: userLogin });
    
    user = user[0];

    if (!user || user.password !== sha512().update(userPassword).digest('hex')) {
        throw {message: "Wrong login/password provided", status: 401};
    }

    let token = issueToken({uuid: user.jwtActiveUUID, login: userLogin});

    successResponse(res, {token, userLogin}, 200);
    
    } catch(err) {
        errorResponse(err, res)
    }
}

async function register(req, res) {
    try {
        const userLogin = req.body.login;
        const userPassword = req.body.password; 
        let user = await UserModel.find({ login: userLogin });

        if (user.length) throw {message: "User with this login has already been created", status: 400};

        let session_uuid = uuidv1();

        user = await UserModel.create({
            login: userLogin,
            password: sha512().update(userPassword).digest('hex'),
            email: req.body.email,
            jwtActiveUUID: session_uuid
        });  

        let token = issueToken({uuid: session_uuid, login: userLogin});

        successResponse(res, token, 200);

    } catch (err) {
        errorResponse(err, res)
    }
}

async function getUserToDoEntries(req, res) {
    try {
        let userTodos = await ToDoEntryModel.find({creatorLogin: req.userData.login});
        successResponse(res, {todos: userTodos}, 200);
    } catch(err) {
        errorResponse(err, res)
    }
}

async function addTodo(req, res) {
    try {
    let user = req.userData;    
    let todo = await ToDoEntryModel.create({creatorLogin: user.login, caption: req.body.caption});
    successResponse(res, {
        message: 'Todo has been created'
    }, 200)
    } catch(err) {
        errorResponse(err, res)
    }
}

async function updateTodoStatus(req, res) {
    try {
        let user = req.userData; 
        let newTodoStatus = req.body.todoStatus;
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

async function deleteTodo(req, res) {
    try {
        let user = req.userData;
        await ToDoEntryModel.findOneAndDelete({creatorLogin: user.login, _id: req.body.todoId});
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