require('dotenv').config({path: './.env'});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const sequelize = require("./config/database");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// // Protected route
// router.get('/', checkTokenValidity, (req, res) => {
//     res.status(200).json({ message: 'Protected route accessed successfully' });
// });

sequelize.authenticate()
    .then(() => console.log('Connection to database has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));


module.exports = app;
