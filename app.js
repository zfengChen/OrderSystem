const express = require('express')
var path = require('path')
var router = require('./router/router')
var userRouter = require('./router/userRouter')
var cartsRouter = require('./router/cartsRouter')
var menuRouter = require('./router/menuRouter')
var aboutRouter = require('./router/aboutRouter')
// var rmsRouter = require('./router/rmsRouter')

var session = require('express-session')

const app = express()

// 开放资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
// 模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}))
// parse application/json
app.use(express.json())
// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: false
}))

// 登录拦截
app.get('*', (req, res, next) => {
    // console.log('session', req.session.user);
    var urlpath = req.path;
    if (urlpath != '/register' && urlpath != '/') {
        if (!req.session.user) {
            console.log('请先登录');
            res.redirect('/register');
            return
        }
    }

    next()
})


// 把路由容器router挂载到app服务中
app.use(router)
app.use(userRouter)
app.use(cartsRouter)
app.use(menuRouter)
app.use(aboutRouter)
// app.use(rmsRouter)



app.listen(3000, () => {
    console.log('server running on http://127.0.0.1:3000');
})