const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recommendationSchema = new Schema({
    recommendationId:Number,
    stockSymbol: String,
    currentDate: Date,
    forcastDate: Date,
    currentValuw:Number,
    forcastValue:Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}  
        
})

const Recommendation = mongoose.model("recommendation", recommendationSchema)

module.exports = Recommendation