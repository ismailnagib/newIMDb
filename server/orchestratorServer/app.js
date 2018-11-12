const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const tvsRouter = require('./routes/tvs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/tvs', tvsRouter);

module.exports = app;