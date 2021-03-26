const mongoose = require('mongoose')
const mongourl = 'mongodb://127.0.0.1:27017/group1';
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: '. error.message)
})