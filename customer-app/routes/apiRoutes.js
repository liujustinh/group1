const express = require('express');

const ApiController = require('../controllers/apiController');

const router = express.Router();
const Query = require('../models/query')

// /api/v1/news
router.get('/v1/news', ApiController.getNews);

router.post('/post-query', async (req, res, next) => {
    try {
        const query = new Query({
            email: req.body.title,
            query: req.body.description,
            
        })
        const savedQuery = query.save()
        res.send('Query added succesfully')
    }
    catch (err) {
        next(err)
    }
})


// router.get('/', async (req, res, next) => {
//     try {
//         const query = await Query.find({})
        
//     }
//     catch (err) {
//         next(err)
//     }
// })

module.exports = router;
