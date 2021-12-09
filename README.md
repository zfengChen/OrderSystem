# 使用该项目时，请仔细阅读一下介绍

## 项目缺少相关的依赖 请在控制台通过 `npm i` 来下载相关的依赖项。项目通过在控制台输入 `nodemon app.js` 来运行。默认在127.0.0.1:3000运行。若端口号被占用，可以在app.js修改的运行端口号。 

## 使用npm指令的前提是安转node，请自行去官网下载

## 本项目处于1.0版本，可能存在一些bug，欢迎各位通过qq邮箱的方式来告诉我，QQ邮箱：1029251038@qq.com

## 本项目使用的数据库是mogodb，数据的备份，我放在backups文件夹里。mogodb也需要你们自行安装。

## 最后就是关于该项目的后台部分，由于事件问题，我没有去完成后台的管理，下次有空一定完善，溜了~~~

### 项目需求：校园点餐系统
1. 项目运行展示首页，自动查询目前未使用的餐桌
2. 首页需求
 -  （1）可根据餐桌名称和餐桌的使用状态查找餐桌
 -  （2）点击餐桌名称，进入菜单页面占位——加入商品到购物车——下单
3. 菜单页功能
 -  （1）占位——改变餐桌状态为正在使用，记录开始使用的时间
 -  （2）取消占位——改变餐桌状态为未使用
 -  （3）购物车——加入商品到购物车，购物车商品数量修改及删除
 -  （4）下单——删除当前餐桌中购物车中商品，保存订单信息到数据库
 -  （5）付款——下单后可取消订单或付款，同时餐桌的状态改为未使用
4. 登录和注册   filter / cookies
 -  （1）登录拦截器——要求3内的功能都需登录才可操作				
 -  （2）记住密码 cookie。
 -  注册： 帐号 姓名 密码 地址 手机
 -  登录： 帐号 密码 

### 以下是后台路由介绍
| 路径             | 方法 | get参数            | post参数                                      | 是否需要登录权限 | 备注信息               |
| ---------------- | ---- | ------------------ | --------------------------------------------- | ---------------- | ---------------------- |
| /                | GET  |                    |                                               |                  | 渲染首页               |
| /register        | GET  |                    |                                               |                  | 渲染注册页面           |
| /register        | POST |                    | email、nickname、password、address、cellphone |                  | 处理注册请求           |
| /login           | GET  |                    |                                               |                  | 渲染登录页面           |
| /login           | POST |                    | email、password                               |                  | 处理登录请求           |
| /logout          | GET  |                    |                                               |                  | 处理退出请求           |
| /search          | GET  | tableId            |                                               |                  | 首页查询餐桌           |
| /perch           | POST |                    | tableId、tableStatus、userId                  | 需要             | 占位                   |
| /occupied/cancel | POST |                    | tableId、userId                               | 需要             | 取消占位               |
| /menu            | GET  |                    |                                               | 需要             | 渲染菜单页面           |
| /menus/add       | POST |                    | userId                                        | 需要             | 商品加入购物车         |
| /menu/shop       | GET  | shopId             |                                               | 需要             | 渲染商店页面           |
| /menuList        | GET  |                    |                                               | 需要             | 渲染热门美食页面       |
| /cart            | GET  | userId             |                                               | 需要             | 渲染购物车页面         |
| /cart/remove     | POST |                    | userId、productId                             | 需要             | 删除商品               |
| /cart/edit       | POST |                    | userId、productId、productNum                 | 需要             | 商品数量修改           |
| /goods/checked   | GET  | userId             |                                               | 需要             | 获取购物车商品信息     |
| /goods/create    | POST |                    | orderData、userId                             | 需要             | 创建订单               |
| /goods/remove    | POST |                    | orderId、userId                               | 需要             | 取消订单               |
| /goods/details   | GET  | userId、orderIndex |                                               | 需要             | 订单详情               |
| /about/me        | GET  | userId             |                                               | 需要             | 个人主页渲染           |
| /about/setting   | GET  | userId             |                                               | 需要             | 个人主页设置渲染       |
| /about/setting   | POST |                    | body                                          | 需要             | 个人信息修改           |
| /about/orderlist | GET  | userId             |                                               | 需要             | 个人主页  历史订单渲染 |
| /rms/signin      | GET  |                    | email、password                               |                  | 后台登录               |
| /404             | GET  |                    |                                               |                  | 渲染404页面            |







