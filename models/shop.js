var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/capstone')

var shopSchema = new Schema({
    shop_id: {
        type: Number,
        required: true
    },
    shop_name: {
        type: String,
        required: true
    },
    shop_img: {
        type:String
    },
    shop_phone: {
        type: Number,
        required: true
    },
    shop_introduction: {
        type: String,
        default: '这家店铺什么也没有说~'
    },
    shop_address: {
        type: String,
        required: true
    },
    shop_goods: Array
})


module.exports = mongoose.model('Shop', shopSchema)