// require('dotenv').config({path: './.env'});
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
const sequelize = require("./config/database");

const app = express();

const whitelist = [
    'https://enchanting-dango-e9c386.netlify.app', 'https://main--enchanting-dango-e9c386.netlify.app',
    'http://localhost:3000'
];


// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        console.log("Origin of request " + origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin permissible");
            callback(null, true);
        } else {
            console.log("Origin blocked by CORS");
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization',
    ],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.get("/health", (req, res) => {
    res.sendStatus(200)
});

sequelize.authenticate()
    .then(() => console.log('Connection to database has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));


module.exports = app;
