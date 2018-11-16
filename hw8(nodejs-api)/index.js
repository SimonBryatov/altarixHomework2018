require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authHandler = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const User = require('./controllers/User');

const port = process.env.PORT || 8080;

mongoose.connect(`mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@ds024748.mlab.com:24748/todo-app`, { useNewUrlParser: true }, (err) => {
    if (!err) console.log('Connected to remote MongoDB')
    else console.log('Mongo connection failed:\n', err.message);
})

// app.options('*', cors());

var corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));  
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser());

//account routes
app.post('/login', User.login);
app.post('/register', User.register);
//app.get('/logout', User.onLogout);

app.use(authHandler);

app.get('/resetSessions', User.resetSessions);
app.get('/getUserToDoEntries', User.getUserToDoEntries);
app.post('/addTodo', User.addTodo);
app.post('/updateTodoStatus', User.updateTodoStatus);
app.delete('/deleteTodo', User.deleteTodo);

app.use(errorHandler);

app.listen(PORT, () => console.log('App has started at port ' + process.env.port))
