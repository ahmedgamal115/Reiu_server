const { default: mongoose, Schema } = require("mongoose");

const ordersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    otherPhone: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: [Number],
        required: true
    },
    delivered:{
        type: Boolean,
        default: false
    },
    customHeight: {
        type: Number
    },
    customWidth: {
        type: Number
    },
    customeImage: {
        type: String,
        required: function(value) {
            return (value && this.customWidth && this.customHeight);
        }
    },
    customPrice: {
        type: Number
    },
    comment: {
        type: String
    },
    discountCode:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promocodes'
    },
    productOrder: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Products',
        validate: {
            validator: function(value) {
                console.log(value)
                return !(value.length !== 0 && this.customeImage);
            },
            message: 'If set product dont set custom product'
        }
    }
},{timestamps:true})

const Orders = mongoose.model.Orders || mongoose.model('Orders',ordersSchema)

module.exports = Orders