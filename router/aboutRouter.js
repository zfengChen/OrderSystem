// 注册、登录、退出
var express = require('express')
var User = require('../models/user')
// var path = require('path')


var router = express.Router()

// 个人主页渲染
router.get('/about/me', (req, res) => {
    var userId = req.session.user._id
    // console.log(userId)

    res.render('aboutMe.html', {
        user: req.session.user
    })
})

// 个人主页设置渲染
router.get('/about/setting', (req, res) => {
    var userId = req.session.user._id
    // console.log(userId)

    res.render('aboutMe.html', {
        user: req.session.user
    })
})

// 个人信息修改
router.post('/about/setting', (req, res) => {
    var body = req.body
    // console.log(body)
    User.findByIdAndUpdate(body.userId, body, (err) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        console.log('update success');
        res.redirect('/about/me');
    })
})

// 个人主页  历史订单渲染
router.get('/about/orderlist', (req, res) => {
    var userId = req.session.user._id
    // console.log(userId)

    User.findOne({
        "_id": userId
    }, (err, userDoc) => {
        if (err) {
            return res.status(500).send('server error')
        }
        var orderList = JSON.stringify(userDoc.orderList);
        orderList = JSON.parse(orderList);
        // console.log(orderList)
        // console.log(typeof orderList.cartList)
        res.render('orderList.html', {
            user: req.session.user,
            orderList: orderList
        })
    })



})



module.exports = router