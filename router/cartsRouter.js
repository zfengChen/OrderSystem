var express = require('express')
var User = require('../models/user')
var Table = require('../models/table')
var ObjectId = require('mongodb').ObjectID;

var router = express.Router()

function userfind(userId) {
    User.findOne({
        "_id": userId
    }, (err, docs) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        // console.log(docs);
        console.log(docs);
        req.session.user = docs;
    })
}

// 渲染购物车页面
router.get('/cart', (req, res) => {
    var userId = req.session.user._id
    // var userId = '616ba8b465f4207618e2e103';
    // console.log(userId);
    User.findOne({ "_id": userId }, (err, userDoc) => {
        if (err) {
            return res.status(500).send('server error');
        } else {
            var cartList = JSON.stringify(userDoc.cartList); // [{},{},{}]
            // res.status(200).json({
            //     err_code: 0,
            //     message: cartList
            // })
            cartList = JSON.parse(cartList);
            res.render('cart.html', {
                cartList: cartList,
                user: req.session.user
            });
        }


    });
});

// 删除商品
router.post('/cart/remove', (req, res) => {
    var userId = req.session.user._id
    var productId = req.body.productId

    User.updateOne({
        "_id": userId
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })

    })


})

// 商品数量修改
router.post('/cart/edit', (req, res) => {
    var userId = req.session.user._id
    var productId = req.body.productId
    var productNum = req.body.productNum

    // console.log(body)
    User.updateOne({
        "_id": userId,
        "cartList.productId": productId
    }, {
        "cartList.$.productNum": productNum
    }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        // userfind(userId);
        User.findOne({
            "_id": userId
        }, (err, docs) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            // console.log(docs);
            // console.log(docs);
            req.session.user = docs;
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })


    })



})

// 获取购物车商品信息
router.get('/goods/checked', (req, res) => {
    var userId = req.query.userId
    // console.log(userId);
    User.findOne({ "_id": userId }, (err, userDoc) => {
        if (err) {
            return res.status(500).send('server error');
        } else {
            // 数据过大导致内存溢出 
            // 解决方案 将取出用户文档转换成json格式的字符串
            var cartList = JSON.stringify(userDoc.cartList);
            cartList = JSON.parse(cartList);
            // console.log(cartList)
            res.render('cart.html', {
                cartList
            });
        }


    });
})

// 创建订单
router.post('/goods/create', (req, res) => {
    var orderData = req.body;
    // console.log(orderData)

    var userId = req.session.user._id;

    User.findOne({
        "_id": userId
    }, (err, userDoc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        // orderData._id = ObjectId();
        orderData.created_time = (new Date().toLocaleString());
        orderData.last_modified_time = (new Date().toLocaleString());
        // 去除orderData.cartList前后的[]
        // orderData.cartList = orderData.cartList.replace("[", "");
        // orderData.cartList = orderData.cartList.replace("]", "");
        // 字符串格式转成json对象格式
        // console.log(orderData.cartList)
        // orderData.cartList = JSON.stringify(orderData.cartList);
        // console.log(orderData.cartList)
        orderData.cartList = JSON.parse(orderData.cartList);
        // console.log(orderData.cartList)

        // 将商品插入历史订单中(旧-假数据，还未插入到数据库中)
        userDoc.orderList.push(orderData);
        // 溢出个人购物车(清空购物车)
        userDoc.cartList.splice(0, userDoc.cartList.length);

        // 取消占位
        Table.updateOne({
            "tableId": userDoc.occupiedMsg.tableId
        }, {
            "status": "空闲"
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            // console.log("桌位取消成功");
        })

        userDoc.occupiedMsg.tableId = "";
        userDoc.occupiedMsg.tableStatus = "";
        // 添加到历史订单
        User.findByIdAndUpdate(userId, userDoc, (err) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }

            // console.log('订单创建成功');
            res.status(200).json({
                err_code: 0,
                message: '订单创建成功'
            })
        })

    })

})

// 取消订单
router.post('/goods/remove', (req, res) => {
    var orderId = req.body.orderId
    // console.log(orderId)
    var userId = req.session.user._id

    User.updateOne({
        "_id": userId
    }, {
        $pull: {
            orderList: {
                "_id": orderId
            }
        }
    }, (err, doc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })

    })

})

// 订单详情
router.get('/goods/details', (req, res) => {
    var orderIndex = req.query.orderIndex;
    var userId = req.session.user._id;

    // console.log(orderIndex)

    User.findOne({
        "_id": userId
    }, function (err, userDoc) {
        if (err) {
            return res.status(500).send('server error')
        }
        // console.log(userDoc.orderList[orderIndex]);
        res.status(200).json({
            err_code: 0,
            message: userDoc.orderList[orderIndex]
        })
        // res.render('orderList.html', {
        //     user: req.session.user
        // })
    })


})


module.exports = router
