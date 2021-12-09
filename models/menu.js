var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/capstone')

var menuSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    checked: String,
    productNum: Number
})

module.exports = mongoose.model('Menu', menuSchema)