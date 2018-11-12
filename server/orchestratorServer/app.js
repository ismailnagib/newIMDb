const express = require('express');
const eGraphQL = require('express-graphql')
const logger = require('morgan');

const schema = require('./schema')
const moviesRouter = require('./routes/movies');
const tvsRouter = require('./routes/tvs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', eGraphQL({
    schema,
    graphiql: true
}))

app.use('/movies', moviesRouter);
app.use('/tvs', tvsRouter);

module.exports = app;