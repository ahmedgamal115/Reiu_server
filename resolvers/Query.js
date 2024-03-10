module.exports = {
    sizesFeed: async(parent, args, {Models})=> {
        return await Models.sizes.find({}).sort({"createdAt":-1})
    },
    sizesByWidth: async(parent, args, {Models})=> {
        return await Models.sizes.find({width : args.width})
    },
    sizesByHeight: async(parent, args, {Models})=> {
        return await Models.sizes.find({height : args.height})
    },
    productsFeed: async(parent, args, {Models})=> {
        return await Models.products.find({})
    },
    product: async(parent, {id},{Models})=> {
        return await Models.products.findById(id)
    },
    productBySize: async(parent, {productSize},{Models})=> {
        return await Models.products.find({productSize})
    },
    promocodes: async(parent, args,{Models})=> {
        return await Models.promocodes.find({}).sort({"createdAt":-1})
    },
    promocode: async(parent, {id},{Models})=> {
        return await Models.promocodes.findOne({_id: id})
    },
    checkPromocode: async(parent, {code},{Models})=> {
        return await Models.promocodes.findOne({code})
    },
    OrdersFeed: async(parent, args,{Models})=>{
        return await Models.orders.find({})
    }
}
