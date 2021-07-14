const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bungaSchema = new Schema({
    pesanan: {
        type: String
    },
    harga: {
        type: Number

    },
    jenisbunga: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('bunga', bungaSchema)