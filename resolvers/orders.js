module.exports = {
    discountCode: async(promo, args,{Models})=>{
        return await Models.promocodes.findById(promo.discountCode)
    },
    productOrder: async(product, args,{Models})=>{
        return await Models.products.find({_id: {$in: product.productOrder}})
    }  
}