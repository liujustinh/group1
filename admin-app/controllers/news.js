const newsRouter = require('express').Router()
const News = require('../models/news')
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')


//ADD NEWS
newsRouter.post('/', async (req, res, next) => {
    try {
        const news = new News({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            image_url: req.body.image_url,
            publish_date: req.body.publish_date
        })
        const savedNews = news.save()
        console.log('News added succesfully')
        res.redirect('/newsform')
    }
    catch (err) {
        next(err)
    }
})

//GET 3 LATEST NEWS
newsRouter.get('/', async (req, res, next) => {
    try {
        const news = await News.find({})
        res.status(200).send(news)
    }
    catch (err) {
        next(err)
    }
})

//DELETE NEWS GIVEN ID
newsRouter.post('/delete', async (req, res, next) => {
    try {
        const id = req.body._id
        const newsToBeDeleted = await News.findById(id)
        console.log('_id: ', id)
        console.log('newsToBeDeleted: ', newsToBeDeleted)
        await newsToBeDeleted.remove()
        console.log('News deleted successfully')
        res.redirect('/editnews')
    }
    catch (err) {
        next(err)
    }
})

//REDIRECT TO EDIT NEWS FORM
newsRouter.post('/edit', async (req, res, next) => {
    try {
        const id = req.body._id
        const username = localStorage.getItem('username')
        const email = localStorage.getItem('email')
        const newsToBeEdited = await News.findById(id)
        console.log('_id: ', id)
        console.log('newsToBeEdited: ', newsToBeEdited._id)
        res.render('editnewsform', {newsToBeEdited, username, email})
    }
    catch (err) {
        next(err)
    }
})

//EDIT NEWS GIVEN ID
newsRouter.post('/editnews', async (req, res, next) => {
    try {
        const id = req.body._id
        const newsToBeEdited = await News.findById(id)
        if (newsToBeEdited) {
            newsToBeEdited.title = req.body.title
            newsToBeEdited.description = req.body.description
            newsToBeEdited.url = req.body.url
            newsToBeEdited.image_url = req.body.image_url
            newsToBeEdited.publish_date = req.body.publish_date
            await newsToBeEdited.save()
        }
        console.log('News updated successfully')
        res.redirect('/editnews')
    }
    catch (err) {
        next(err)
    }
})

module.exports = newsRouter