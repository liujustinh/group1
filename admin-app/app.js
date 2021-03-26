const express = require('express');
const app = express();
const db = require('./db')
app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended: true}))

//ROUTES
const usersRouter = require('./controllers/users')
app.use('/users', usersRouter)

const authRouter = require('./controllers/auth')
app.use('/api/auth', authRouter)

const newsRouter = require('./controllers/news')
app.use('/news', newsRouter)


module.exports = app;