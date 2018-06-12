const express = require('express');
const app = express();
const db = require('./db');
const userController = require('./user/UserController');

app.use('/app/user/', userController);
module.exports = app;