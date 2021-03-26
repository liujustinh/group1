const app = require('./app')
const express = require('express')
const port = 3000;
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')

app.set('view engine', 'ejs')

app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('auth')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/logout', (req, res) => {
    localStorage.removeItem('authtoken')
    res.redirect('/')
})

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})