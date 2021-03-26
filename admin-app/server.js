const app = require('./app')
const express = require('express')
const port = 3000;
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')
const News = require('./models/news')

app.set('view engine', 'ejs')

app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('auth')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/newsform', (req, res) => {
    res.render('newsform')
})

app.get('/editnews', async (req, res, next) => {
    try {
        const newsList = await News.find({})
        res.render('editnews', {newsList})
    }
    catch (err) {
        next(err)
    }
})

app.get('/logout', (req, res) => {
    localStorage.removeItem('authtoken')
    res.redirect('/')
})

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})