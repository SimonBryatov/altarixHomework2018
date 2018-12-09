"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var authHandler = require('./middlewares/authMiddleware');
var errorHandler = require('./middlewares/errorMiddleware');
var User = require('./controllers/User');
var port = process.env.PORT || 8080;
mongoose.connect("mongodb://" + process.env.MONGO_LOGIN + ":" + process.env.MONGO_PASSWORD + "@ds024748.mlab.com:24748/todo-app", { useNewUrlParser: true }, function (err) {
    if (!err)
        console.log('Connected to remote MongoDB');
    else
        console.log('Mongo connection failed:\n', err.message);
});
var corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());
app.post('/login', User.login);
app.post('/register', User.register);
app.use(authHandler);
app.get('/resetSessions', User.resetSessions);
app.get('/getUserToDoEntries', User.getUserToDoEntries);
app.post('/addTodo', User.addTodo);
app.post('/updateTodoStatus', User.updateTodoStatus);
app.delete('/deleteTodo', User.deleteTodo);
app.use(errorHandler);
app.listen(port, function () { return console.log('App has started at port ' + process.env.Port); });
