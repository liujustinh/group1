const newsRouter = require('express').Router()
const News = require('../models/news')


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
        
    }
    catch (err) {
        next(err)
    }
})

module.exports = newsRouter