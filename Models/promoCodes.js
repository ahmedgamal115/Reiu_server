const { default: mongoose, Schema } = require("mongoose");

const promoCodesSchema = new Schema({
    code: {
        type: String,
        require: true,
        index: {unique: true}
    },
    discount: {
        type: Number,
        require: true,
    },
    expire: {
        type: Date,
        require: true,
    },
    expired: {
        type: Boolean,
        require: true,
        default: false
    },
},{timestamps:true})

const promoCodes = mongoose.model.Promocodes || mongoose.model('Promocodes',promoCodesSchema)

module.exports = promoCodes