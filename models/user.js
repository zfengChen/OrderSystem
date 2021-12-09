var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/capstone')

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "/public/images/avatar-default.png"
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        // 保持结构完整性
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    cellphone: {
        type: String,
        default: ''
    },
    orderList: [
        {
            nickname: String,
            cellphone: String,
            address: String,
            totalPrice: String,
            cartList: Object,
            created_time:String,
            last_modified_time:String,
        }
    ],
    // 订单表
    cartList: [
        {
            "productId": String,
            "fname": String,
            "price": String,
            "img": String,
            "checked": String,
            "productNum": String
        }
    ],
    occupiedMsg: {
        "created_time": {
            type: Date,
            default: Date.now
        },
        "last_modified_time": {
            type: Date,
            default: Date.now
        },
        "tableId": {
            type: String,
            default:''
        },
        "tableStatus": {
            type: String,
            default:''
        }
    }

})

module.exports = mongoose.model('User', userSchema)