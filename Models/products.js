const { default: mongoose, Schema } = require("mongoose");

const productsSchema = new Schema({
    image: {
        type: [String],
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    productSize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sizes'
    }
},{timestamps:true})

const Products = mongoose.model.Products || mongoose.model('Products',productsSchema)

module.exports = Products