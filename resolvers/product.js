module.exports = {
    productSize: async(parent, args,{Models})=>{
        return await Models.sizes.findById(parent.productSize)
    }
}