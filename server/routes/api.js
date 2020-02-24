const express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../model/User.js')
const requestPromise = require('request-promise')
const parseString = require('xml2js').parseString;
const Recommendation = require('../model/Recommendation.js')

const apiKey = `wViivid8O6bjEmZvBBMWxnMx4E9R2yDbmF2bWYSP5I9Ju1Bygbcp2FH9J7Qt`

const DBInit = function(){  
    console.log("adding to db");
    
    let u1 = new User({
        firstName: "james",
        lastName: "shoobert",
        img: "imgurl",
        recommendedStocks: [],
        followedUsers:  [],
        rank: 0,
        myInvestments: ["XXX"] })
    let u2 = new User({
        firstName: "salim",
        lastName: "toama",
        img: "imgurl",
        recommendedStocks: [],
        followedUsers:  [],
        rank: 15,
        myInvestments: ["HTA"] })

    u1.save()
    u2.save()
}
// DBInit() //RUN ONCE


const symbols = "'SNAP','TWTR','TEVA','VOD.L'"
router.get('/users', async function (req, res) {
    const users = await User.find({})
    console.log(users);

    res.send(users)
})
router.get('/user/:userId', function (req, res) {
    let userId = req.params.userId
    
    User.findOne({ _id: userId }, function (err, user) {
        res.send(user)
    })
})
router.get('/stocks', async function (req, res) {
    request(`https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=${apiKey}`

        , function (req, response) {
            let stocks = JSON.parse(response.body)
            res.send(stocks)
        })
})

router.get('/stock/:stockIdentifier', async function (req, res) {

    let stockId = req.params.stockIdentifier
    let stockData

    request(` https://api.worldtradingdata.com/api/v1/stock?symbol=${stockId}&api_token=${apiKey}`, function (err, response) {

        if (err) {
            console.log('error');

        } else {
            stockData = JSON.parse(response.body)
            res.send(stockData)

        }

    })

})

router.get('/recommendationSS/:stockSymbol', function (req, res) {
    Recommendation.find({ stockSymbol: req.params.stockSymbol }, function (err, recommendations) {
        console.log(recommendations);
        
        res.send(recommendations)
    })
})

router.get('/recommendations', function (req, res) {
    Recommendation.find({}, function (err, recommendation) {
        res.send(recommendation)
    })
})
router.get('/recommendation/:rid', function (req, res) {
    Recommendation.findOne({ _id: req.params.rid }, function (err, recommendation) {
        res.send(recommendation)
    })
})

router.get('/recommendationUid/:userId', function (req, res) {//check if uid == uid
    // Recommendation.findOne({user.userId: req.params.userId}, function (err, recommendation) {
    //     res.send(recommendation)
    // })
})

router.post('/recommendation', function (req, res) {
    const rcmnd = new Recommendation(req.body)
    rcmnd.save()
    res.end()
})

module.exports = router