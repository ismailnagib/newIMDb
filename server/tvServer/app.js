require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/newIMDB-tvseries', { useNewUrlParser: true })

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;