const express = require('express')
const LocalStorage = require('node-localstorage').LocalStorage
const authRouter = require('express').Router()
const localStorage = new LocalStorage('./scratch')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const User = require('../models/user')
app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended: true}))

authRouter.post('/register', async (req, res, next) => {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        const savedUser = await user.save()
        const token = jwt.sign({id: savedUser._id }, config.secret, {
            expiresIn: 86400
        })

        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)

        const string = encodeURIComponent('Successfully registered! Please login.')
        res.redirect('/?msg=' + string)
    }
    catch(err) {
        next(err)
    }
})

authRouter.post('/login', async (req, res, next) => {
    try {
        const string = encodeURIComponent('! Please enter valid value')
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(404).send('User not found!')
        }
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCorrect) {
            return res.status(401).send('Incorrect password!')
        }
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        })
        localStorage.setItem('authtoken', token)
        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)
        res.redirect('/home')
    }
    catch (err) {
        next(err)
    }
})

module.exports = authRouter