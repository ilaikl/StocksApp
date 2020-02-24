const express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../model/User.js')
const requestPromise = require('request-promise')
const parseString = require('xml2js').parseString;
const Recommendation = require('../model/Recommendation.js')

const apiKey = `wViivid8O6bjEmZvBBMWxnMx4E9R2yDbmF2bWYSP5I9Ju1Bygbcp2FH9J7Qt`

const symbols ="'SNAP','TWTR','TEVA','VOD.L'"
router.get('/users', async function (req, res) {
    const users = await User.find({})
    console.log(users);
    
    res.send(users)
})
router.get('/user/:userId',  function (req, res) {
    let userId = req.params.userId
    User.findOne({userId: req.params.userId}, function (err, user) {
        res.send(user)   })
})    
router.get('/stocks', async function (req, res) {
    request( `https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=${apiKey}`

    ,function(req, response){
        let stocks = JSON.parse(response.body)
        console.log(stocks);
        res.send(stocks)
    })
})
router.get('/stock/:stockIdentifier', async function (req, res) {
    let stockId = req.params.stockIdentifier
    let Data
        try { Data = requestPromise(
            ` https://api.worldtradingdata.com/api/v1/stock?symbol=${stockId}&api_token=${apiKey}`)}
        catch(err){
            return
        }
parseString(Data, (err, result) => {
    Data = result.current
    Data = [Data]
    const relevantData = Data.map( t => {
        return{
           stockId: t.stockIdentifier[0].$.name,
           stockName: t.stockIdentifier,
           currentDate: t.stockIdentifier
        }
    })
})
})


router.get('/recommendationSS/:stockSymbol', function (req, res) {
    Recommendation.find({stockSymbol:req.params.stockSymbol}, function (err, recommendations) {
        res.send(recommendations)
    })
})

router.get('/recommendations', function (req, res) {
    Recommendation.find({}, function (err, recommendation) {
        res.send(recommendation)
    })
})
router.get('/recommendation/:rid', function (req, res) {
    Recommendation.findOne({recommendationId: req.params.rid}, function (err, recommendation) {
        res.send(recommendation)
    })
})

router.get('/recommendationUid/:userId', function (req, res) {//check if uid == uid
    // Recommendation.findOne({user.userId: req.params.userId}, function (err, recommendation) {
    //     res.send(recommendation)
    // })
})

router.post('/recommendation',  function (req, res) {
    const rcmnd = new Recommendation(req.body)
    rcmnd.save()        
        res.end()
    })

module.exports = router