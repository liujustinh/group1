const app = require('./app')
const express = require('express')
const port = 3000;

app.set('view engine', 'ejs')

app.use(express.json({type: ['application/json', 'text/plain']}))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('auth')
})

const server = app.listen(port, () => {
    console.log('Server listening on port ' + port)
})