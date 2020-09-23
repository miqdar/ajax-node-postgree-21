var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'university',
    password: '12345',
    port: 5432,
})

// var indexRouter = require('./routes/index')(pool);
var muridRouter = require('./routes/murid')(pool);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/murid', muridRouter);

module.exports = app;
