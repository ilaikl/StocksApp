const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: Number,
    firstName: String,
    lastName: String,
    img: String,
    recommendedStocks: [{type: Schema.Types.ObjectId, ref: 'Recommendation'}],
    followedUsers:  [{type: Schema.Types.ObjectId, ref: 'User'}],
    rank: Number,
    myInvestments: [String]
})

const User = mongoose.model("user", userSchema)
module.exports = User