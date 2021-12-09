var http = require('http')
var fs = require('fs')
var url = require('url')
var path = require('path');
//静态资源访问服务器功能
// app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer();

server.on('request', (req, res) => {
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    var paresObj = url.parse(req.url, true);
    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = paresObj.pathname;

    if (pathname === '/') {
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        })
    } else if (pathname.indexOf('/public/') === 0) {
        // js、css、images等文件请求
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname === '/menu') {
        // 菜单页面
        fs.readFile('./views/menu.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname === '/cart') {
        // 购物车页面
        fs.readFile('./views/cart.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname === '/register') {
        // 登录页面
        fs.readFile('./views/register.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (pathname === '/menuList') {
        // 登录页面
        fs.readFile('./views/menuList.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                res.end('404 Nodt Found.')
            }
            res.end(data)
        })
    }

})



server.listen(3000, () => {
    console.log('服务器启动成功，请访问http://127.0.0.1:3000');
})