const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')

usersRouter.get('/logout', (req, res) => {
    localStorage.removeItem('authtoken')
    res.redirect('/')
})

module.exports = usersRouter