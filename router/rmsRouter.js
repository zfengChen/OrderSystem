// 后台路由
var express = require('express')
var User = require('../models/user')

var router = express.Router()

// 后台登录 事件不够 没做
router.get('/rms/signin',(req,res) => {
    
})

module.exports = router
