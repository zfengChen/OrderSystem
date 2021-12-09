// // 注册页面
// router.get('/register', (req, res) => {
//     res.render('register.html')
// })

// // 注册页面post请求
// router.post('/register', function (req, res) {
//     var body = req.body
//     User.findOne({
//         $or: [{
//                 email: body.email
//             },
//             {
//                 nickname: body.nickname
//             }
//         ]
//     }, function (err, data) {
//         if (err) {
//             return res.status(500).json({
//                 err_code: 500,
//                 message: 'server error'
//             })
//         }

//         if (data) {
//             // 邮箱或者昵称已存在
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'Email or nickname aleady exists.'
//             })
//         }

//         // 对密码进行 md5 重复加密
//         body.password = md5(md5(body.password))

//         new User(body).save(function (err, user) {
//             if (err) {
//                 return res.status(500).json({
//                     err_code: 500,
//                     message: 'server error'
//                 })
//             }

//             // 注册成功，使用 Session 记录用户的登陆状态
//             req.session.user = user

//             res.status(200).json({
//                 err_code: 0,
//                 message: 'OK'
//             })

//         })
//     })
// })

// // 登录post请求 跳转 
// router.post('/login', (req, res) => {
//     console.log(req.body);
//     User.findOne({
//         email: req.body.email,
//         password: md5(md5(req.body.password))
//     }, (err, user) => {
//         if (err) {
//             return res.status(500).json({
//                 err_code: 500,
//                 message: err.message
//             })
//         }
//         // 若没有此项数据
//         if (!user) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'Email or password is invalid.'
//             })
//         }

//         // 用户存在 ，登录成功 ， 记录状态
//         req.session.user = user

//         res.status(200).json({
//             err_code: 0,
//             message: 'ok'
//         })



//     })


// })

// //  退出get请求
// router.get('/logout', (req, res) => {
//     req.session.user = null
//     res.redirect('/register')
// })