const express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../model/User.js')
const requestPromise = require('request-promise')
const parseString = require('xml2js').parseString;
const Recommendation = require('../model/Recommendation.js')

// const apiKey = `wViivid8O6bjEmZvBBMWxnMx4E9R2yDbmF2bWYSP5I9Ju1Bygbcp2FH9J7Qt`
const apiKey = `NC4jetaZxIMrSFZVlyO3YDurJgcIYr5ztdJaTXj1bS4JRjfzuM6MDpkmuNki`
//const apiKey = `F46XwVDlHPb0t6dHqwpDGwyWFHXjTEopln1c7CuOlw8omMBTsadKuUGzNls6`

const DBInit = function () {
    console.log("adding to db");

    // let u1 = new User({
    //     firstName: "james",
    //     lastName: "shoobert",
    //     img: "imgurl",
    //     recommendedStocks: [],
    //     followedUsers:  [],
    //     rank: 0,
    //     myInvestments: ["XXX"] })
    // let u2 = new User({
    //     firstName: "salim",
    //     lastName: "toama",
    //     img: "imgurl",
    //     recommendedStocks: [],
    //     followedUsers:  [],
    //     rank: 15,
    //     myInvestments: ["HTA"] })
    // let u3 = new User({
    //     firstName: "yam",
    //     lastName: "ohana",
    //     img: "imgurl",
    //     recommendedStocks: [],
    //     followedUsers:  [],
    //     rank: 14,
    //     myInvestments: ["IN"] })

    // let r1 = new Recommendation({

    //     stockSymbol: "SNAP"
    // })

    // u3.save()
    // r1.user=u3
    // r1.save()

    // let r2 = new Recommendation({

    //     stockSymbol: "test"
    // })
    // let r3 = new Recommendation({

    //     stockSymbol: "wallak"
    // })
    //     let u4 = new User({
    //     firstName: "kanye",
    //     lastName: "west",
    //     img: "imgurl",
    //     recommendedStocks: [],
    //     followedUsers:  [],
    //     rank: 44,
    //     myInvestments: ["NN"] })
    // u4.save()
    // r2.user=u4
    // r3.user=u4
    // r2.save()
    // r3.save()


    // u1.save()
    // u2.save()
}
// const DBInit = function () {
// console.log("adding to db");

//     let u1 = new User({
//         firstName: "William",
//         lastName: "Bridges",
//         img: "imgurl",
//         recommendedStocks: [],
//         followedUsers:  [],
//         rank: 0,
//         myInvestments: ["XXX"] })
//     let u2 = new User({
//         firstName: "Warm",
//         lastName: "Baffet",
//         img: "imgurl",
//         recommendedStocks: [],
//         followedUsers:  [],
//         rank: 15,
//         myInvestments: ["HTA"] })
//     let u3 = new User({
//         firstName: "Melon",
//         lastName: "Eusk",
//         img: "imgurl",
//         recommendedStocks: [],
//         followedUsers:  [],
//         rank: 14,
//         myInvestments: ["IN"] })

//     let r1 = new Recommendation({

//         stockSymbol: "SNAP"
//     })

//     u3.save()
//     r1.user=u3
//     r1.save()

//     let r2 = new Recommendation({

//         stockSymbol: "test"
//     })
//     let r3 = new Recommendation({

//         stockSymbol: "wallak"
//     })
//         let u4 = new User({
//         firstName: "Spark",
//         lastName: "Zukerburger",
//         img: "imgurl",
//         recommendedStocks: [],
//         followedUsers:  [],
//         rank: 44,
//         myInvestments: ["NN"] })
//     u4.save()
//     r2.user=u4
//     r3.user=u4
//     r2.save()
//     r3.save()


//     u1.save()
//     u2.save()
// }
// DBInit() //RUN ONCE


const symbols = "'SNAP','TWTR','TEVA','VOD.L'"
router.get('/users', async function (req, res) {
    const users = await User.find({})
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

    // await request(`https://api.worldtradingdata.com/api/v1/history?symbol=${stockId}&api_token=${apiKey}`, function (err, result) {

    //     stockHistory = JSON.parse(result.body)
    //     res.send(stockHistory)
    // })

})

router.get('/recommendationsSS/:stockSymbol', function (req, res) {
    Recommendation.find({ stockSymbol: req.params.stockSymbol }, function (err, recommendations) {
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

router.get('/recommendationsUid/:userId', function (req, res) {


    Recommendation.find({ user: req.params.userId }).exec(function (err, recommendations) {

        res.send(recommendations)

    })

})

router.post('/recommendation', function (req, res) {
    const rcmnd = new Recommendation(req.body)
    rcmnd.save()
    res.end()
})




router.put('/user/:userId/:followedUserID', async function (req, res) {

    User.findOneAndUpdate({ _id: req.params.userId }).exec(function (err, user) {

        user.followedUsers.push(req.params.followedUserID)

    })
})



module.exports = router