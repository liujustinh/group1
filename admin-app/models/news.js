const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String},
    url: { type: String },
    image_url: { type: String },
    publish_date: { type: String }
})

module.exports = mongoose.model("News", newsSchema)