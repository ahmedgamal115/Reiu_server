const { default: mongoose, Schema } = require("mongoose");

const sizesSchema = new Schema({
    height: {
        type: Number,
        require : true
    },
    width: {
        type: Number,
        require : true
    }
    
},{ timestamps:true })

sizesSchema.index({width: 1,height: 1},{ unique: true })

const Sizes = mongoose.model.Sizes || mongoose.model('Sizes',sizesSchema)

module.exports = Sizes