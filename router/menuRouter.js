// 菜单页面路由设置
var express = require('express')

var User = require('../models/user')
var Menu = require('../models/menu')
var Shop = require('../models/shop')


var router = express.Router()

// 渲染菜单页
router.get('/menu', (req, res) => {

    Menu.find((err, menus) => {
        if (err) {
            return res.status(500).send('server error');
        }
        Shop.find((err,shops) => {
            if (err) {
                return res.status(500).send('server error');
            }
            res.render('menu.html', {
                user: req.session.user,
                menus,
                shops
            })
        })

    })
})

// 商品加入购物车
router.post('/menus/add', (req, res) => {
    // 接受用户id 用于查询用户
    var userId = req.body.userId
    // console.log(userId)
    // 成功获取商品productId
    // console.log(req.body.productId);
    // 用户查询
    User.findOne({
        "_id": userId
    }, (err, userDoc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        // console.log(userDoc);
        // 判断用户购物车是否存在商品 若存在productNum++
        var goodsItem = ''
        userDoc.cartList.forEach(element => {
            if (element.productId == req.body.productId) {
                goodsItem = element;
                // console.log(element);
                element.productNum++;
            }
        });
        if (goodsItem) {
            // 重新更新数据 
            User.findByIdAndUpdate(userId, userDoc, (err) => {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: err.message
                    })
                }
                console.log('success');
                res.status(200).json({
                    err_code: 0,
                    message: 'ok'
                })
            })
        } else {
            // 商品查询
            Menu.findOne({
                productId: req.body.productId
            }, (err, menuDoc) => {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: err.message
                    })
                }
                // console.log(menuDoc);
                // 如果商品存在 添加添加到cartList中
                if (menuDoc) {
                    menuDoc.productNum = 1
                    menuDoc.checked = "1"
                    userDoc.cartList.push(menuDoc)
                    // console.log(userDoc.cartList)
                    User.findByIdAndUpdate(userId, userDoc, (err) => {
                        if (err) {
                            return res.status(500).json({
                                err_code: 500,
                                message: err.message
                            })
                        }
                        console.log('success');
                        res.status(200).json({
                            err_code: 0,
                            message: 'ok'
                        })
                    })

                }

            })
        }


    })

})

// 渲染商店页面
router.get('/menu/shop', (req, res) => {
    var shopId = req.query.id;
    // console.log(shopId);
    Shop.findOne({ "_id": shopId },(err,shopDoc) => {
        if (err) {
            return res.status(500).send('server error');
        }
        // console.log(shopDoc);
        res.render('shop.html', {
            user: req.session.user,
            shop:shopDoc
        })
    })
})


module.exports = router