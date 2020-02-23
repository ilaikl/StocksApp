const express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../model/User.js')
const Recommendation = require('../model/Recommendation.js')


router.get('/users', function (req, res) {
    
})

router.get('/user/:userName', function (req, res) {
    
    let userName = req.params.userName
})

router.get('/stock/:stockIdentifier', function (req, res) {
    
    let stockId = req.params.stockIdentifier
    request(`http://url`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
        else {
            console.log("errorrrrr")
        }
    })
})

router.get('/stocs', function (req, res) {
    
    request(`http://url`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
        else {
            console.log("errorrrrr")
        }
    })
})


router.get('/recommendation', function (req, res) {

    Recommendation.find({}, function (err, recommendation) {
        res.send(recommendation)
    })

})

router.post('/recommendation', async function (req, res) {
    if(req.body.!=undefined && req.body.!=undefined){
        let recommendation = new Recommendation({ })

        // await City.remove({"name":req.body.name})

        recommendation.save()
        
        res.end()

    }
})



// router.delete('/city/:cityName', function (req, res) {
//     City.deleteOne({ name: req.params.cityName }, function (err, ct) {
//         res.send(ct)
//     })
// })


module.exports = router