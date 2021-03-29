const express = require('express');
const app = express();
const config = require('./config');
const port = config.port;

//////////////////////////////
const News = require('./models/news')
const mongoose = require('mongoose')
const mongourl = 'mongodb://127.0.0.1:27017/group1';
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: '. error.message)
})
///////////////////////////////


app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const apiRoutes = require('./routes/apiRoutes');


app.use(express.urlencoded({ extended: true }));

/////// Routes ////////

//Homepage
app.get('/', async (req, res, next) => {
    const newsList = await News.find({}).limit(4)
    res.render('index', {newsList})
})

app.get('/sports', (req, res) => res.render('sports')); // Sports Page
app.get('/chat', (req, res) => res.render('chat')); // Sports Page
app.get('/contact', (req, res) => res.render('contact',{ errorMsg: null, successMsg: null })); // Contact Us Page
app.get('/about', (req, res) => res.render('about')); // About Us Page
app.use('/api', apiRoutes);


app.listen(port, ()=>console.log(`Main server running on port ${port}`));