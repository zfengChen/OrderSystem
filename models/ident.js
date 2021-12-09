// 订单
var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/capstone')

var identSchema = new Schema({
    nickname: {
        type: String,
        required: true
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
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Ident', identSchema)