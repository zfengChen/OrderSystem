// 餐桌
var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/capstone')

var tableSchema = new Schema({
    tname: {
        type: String,
        required: true
    },
    tableId: String,
    status: {
        type: String,
        default: "空闲"
    }
})


module.exports = mongoose.model('Table', tableSchema)