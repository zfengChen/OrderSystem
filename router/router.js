// var md5 = require('blueimp-md5')
var express = require('express')

var MenuLists = require('../models/menuLists')
var User = require('../models/user')
var Table = require('../models/table')

var router = express.Router()

// 首页
router.get('/', (req, res) => {
    // console.log(req.session.user);

    Table.find((err, tables) => {
        if (err) {
            return res.status(500).send('server error')
        }

        res.render('index.html', {
            user: req.session.user,
            tables: tables
        })
    })
    // res.render('index.html', {
    //     user: req.session.user
    // })
})

// 首页查询餐桌   傻逼问题   bug
router.get('/search', (req, res) => {
    var tableId = req.query.tableId
    // console.log(tableId)
    if (tableId == '') {
        res.status(200).json({
            err_code: 2,
            message: '请输入桌子号'
        })
    } else if (tableId == 'all') {
        Table.find((err, tables) => {
            if (err) {
                return res.status(500).send('server error')
            }
            res.status(200).json({
                err_code: 0,
                message: tables
            })
        })
    }else {
        Table.findOne({ tableId: tableId }, (err, table) => {
            if (err) {
                return res.status(500).send('server error')
            }

            // console.log(table)
            if (table == null) {
                return res.status(200).json({
                    err_code: 2,
                    message: "请输入正确的桌子号"
                })
            } else {
                res.status(200).json({
                    err_code: 1,
                    message: table
                })
            }

            // res.render('index.html', {
            //     user: req.session.user,
            //     table: table
            // })

        })
    }

})

// 占位
router.post('/perch', (req, res) => {
    if (req.session.user === undefined) {
        res.status(200).json({
            err_code: 1,
            message: '请先登录'
        })
        console.log('请先登录');
    } else {
        var tableId = req.body.tableId;
        var tableStatus = req.body.tableStatus;
        var userId = req.session.user._id;
        Table.findOne({
            tableId: tableId
        }, (err, tableDoc) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            // console.log(tableDoc);
            if (tableStatus == '繁忙') {
                res.status(200).json({
                    err_code: 1,
                    message: '该桌子已被占用'
                })
            } else {
                // 将桌子状态改成繁忙
                tableStatus = '繁忙'
                tableDoc.status = '繁忙'
                // console.log('2=' + tableDoc.status);

                Table.updateOne({
                    "tableId": tableId
                }, {
                    "status": tableStatus
                }, (err, doc) => {
                    if (err) {
                        return res.status(500).json({
                            err_code: 500,
                            message: err.message
                        })
                    }

                    // 将餐桌信息插入user中
                    User.findOne({
                        "_id": userId
                    }, (err, userDoc) => {
                        if (err) {
                            return res.status(500).json({
                                err_code: 500,
                                message: err.message
                            })
                        }
                        // console.log(userDoc.occupiedMsg);
                        // 将占位桌子信息插入到occupiedMsg中
                        // userDoc.occupiedMsg.created_time = new Date;
                        // userDoc.occupiedMsg.last_modified_time = new Date;
                        userDoc.occupiedMsg.tableId = tableId;
                        userDoc.occupiedMsg.tableStatus = tableStatus;
                        // console.log(userDoc.occupiedMsg);

                        // 添加到occupiedMsg
                        User.findByIdAndUpdate(userId, userDoc, function (err, userMsg) {
                            if (err) {
                                return res.status(500).json({
                                    err_code: 500,
                                    message: err.message
                                })
                            }

                            console.log('success');
                            // 问题：返回的数据userMsg不是最新的
                            // console.log(userMsg.occupiedMsg);
                            // console.log(userDoc.occupiedMsg);

                            // res.render('index.html', {
                            //     user: result
                            // })

                            // req.session.user = null

                            req.session.user.occupiedMsg = userDoc.occupiedMsg;

                            res.status(200).json({
                                err_code: 0,
                                message: '占位成功！'
                            })
                        })

                    })
                })




            }

        })
    }
})

// 取消占位
router.post('/occupied/cancel', (req, res) => {
    var userId = req.session.user._id
    var tableId = req.body.tableId

    User.findOne({
        "_id": userId
    }, (err, userDoc) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        Table.updateOne({
            "tableId": tableId
        }, {
            "status": "空闲"
        }, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: err.message
                })
            }
            // console.log(userDoc.occupiedMsg);
            // 将占位桌子信息插入到occupiedMsg中
            userDoc.occupiedMsg.last_modified_time = new Date
            userDoc.occupiedMsg.tableId = ''
            userDoc.occupiedMsg.tableStatus = ''
            // console.log(userDoc.occupiedMsg);

            // 添加到occupiedMsg 为解决问题返回的数据userMsg是未更新的数据
            User.findByIdAndUpdate(userId, userDoc, (err, userMsg) => {
                if (err) {
                    return res.status(500).json({
                        err_code: 500,
                        message: err.message
                    })
                }
                console.log('取消占位成功!');

                req.session.user = userDoc;
                // console.log(req.session.user);
                res.status(200).json({
                    err_code: 0,
                    message: '取消占位成功！'
                })

            })

        })

    })

})


// 热门美食展示
router.get('/menuList', (req, res) => {
    MenuLists.find((err, menuList) => {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('menuList.html', {
            menuList: menuList,
            user: req.session.user
        })
    })

})




module.exports = router