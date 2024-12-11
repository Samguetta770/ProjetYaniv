const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes principales
app.use('/', indexRouter);

module.exports = app;
