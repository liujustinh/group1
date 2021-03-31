const mongoose = require('mongoose')

const querySchema = new mongoose.Schema({
    email: { type: String },
    query: { type: String},
})

module.exports = mongoose.model("Query", querySchema)