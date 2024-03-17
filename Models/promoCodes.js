const { default: mongoose, Schema } = require("mongoose");

const promoCodesSchema = new Schema({
    code: {
        type: String,
        require: true,
        index: {unique: true}
    },
    amount: {
        type: Number,
        validate: {
            validator: function(value) {
                return !(value && this.discount);
            },
            message: 'If set discount dont set amount'
        }
    },
    discount: {
        type: Number,
        validate: {
            validator: function(value) {
                return !(value && this.amount);
            },
            message: 'If set amount dont set discount'
        }
    },
    expire: {
        type: Date,
        required: true,
    },
    expired: {
        type: Boolean,
        required: true,
        default: false
    },
},{timestamps:true})

const promoCodes = mongoose.model.Promocodes || mongoose.model('Promocodes',promoCodesSchema)

module.exports = promoCodes