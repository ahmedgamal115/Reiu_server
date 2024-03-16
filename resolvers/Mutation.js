const { default: mongoose } = require("mongoose")
const path = require('path')
const fs = require('fs')
const { GetColorName } = require("hex-color-to-color-name")
const bucket = require("../Utilities/fireBaseConfig")

const deleteOldImage = async(images)=>{
    for (let index = 0; index < images.length; index++) {
        let url = images[index]
        let path = url.split(`${bucket.name}/`)[1].split('?')[0].replace("%20"," ").replace("%28","(").replace("%29",")");
        console.log(path)
        await bucket.file(path).delete()
    }
}
const addnewImage = async(images)=>{
    let imagesPath = []
    for (let index = 0; index < images.length; index++) {
        const { createReadStream, filename, encoding, mimetype } = await images[index]
        const stream = createReadStream();
        const fileUpload = bucket.file(`StanderImage/${filename}`);
        const uploadStream = fileUpload.createWriteStream({
            metadata: {
                contentType: mimetype
            }
        });
        await stream.pipe(uploadStream)
        let imageUrl = (await fileUpload.getSignedUrl({
            action: 'read',
            expires: '01-01-2030' // Adjust the expiration time as needed
        }))
        imagesPath.push(imageUrl[0])
    }
    return imagesPath
}


module.exports = {
    addSizes: async(parent, args, {Models})=>{
        let newSize = new Models.sizes({
            width: args.width,
            height: args.height
        })
        return await newSize.save()
    },
    deleteSize: async(parent, args, {Models})=>{
        if(await Models.sizes.findById(args.id)){
            await Models.sizes.findByIdAndDelete(args.id)
            return "deleted Successfully"
        }else{
            console.log("Invalid id")
        }
    },
    updateSize: async(parent, args, {Models})=>{
        if(await Models.sizes.findById(args.id)){
            return await Models.sizes.findOneAndUpdate({_id:args.id},{$set:{
                width: args.width,
                height: args.height
            }},{new:true})
        }else{
            console.log("Don't find that id")
        }
    },

    addProduct: async(parent, args, {Models})=>{
        return addnewImage(args.image).then(async(imageData)=>{
            let newProduct = Models.products({
                image: imageData,
                productSize: args.productSize,
                price: args.price
            })
            return await newProduct.save()
        })
        
    },
    deleteProduct: async(parent, args, {Models})=>{
        try {
            if(await Models.products.findById(id)){
                await Models.products.findByIdAndDelete(args.id)
                return 'Product deleted'
            }else{
                return "Invalid id"
            }
        } catch (error) {
            console.error(error)
        }
    },
    updateProduct: async(parent, args, {Models})=>{
        try {
            if(args.image){
                // Delete old image from files images
                return deleteOldImage(args.oldImage).then(()=>{
                    // Upload new image
                    return addnewImage(args.image).then(async(imageData)=>{
                        // set new data in db
                        return await Models.products.findOneAndUpdate( {_id:args.id},{$set:{
                            image: imageData,
                            productSize: args.productSize,
                            price: args.price}},{new:true})
                    })
                })
            }else{
                return await Models.products.findOneAndUpdate( {_id:args.id},{$set:{
                    image: args.image,
                    productSize: args.productSize,
                    price: args.price}},{new:true})
            }
        } catch (error) {
            console.error(error)
        }
    },

    addPromoCode: async(parent, args, {Models})=>{
        let newPromoCode = Models.promocodes({
            code: args.code,
            discount: args.discount,
            expire: new Date(args.expire).toString(),
        })
        return await newPromoCode.save()
    },
    deletePromoCode: async(parent, args, {Models})=>{
        try {
            if(await Models.promocodes.findById(args.id)){
                await Models.promocodes.findByIdAndDelete(args.id)
                return 'Promo code deleted'
            }else{
                return 'Invalid id'
            }
        } catch (error) {
            console.error(error)
        }
    },
    updatePromoCode: async(parent, args, {Models})=>{
        try {
            return await Models.promocodes.findOneAndUpdate( {_id:args.id},{$set:{
                code: args.code,
                discount: args.discount,
                expire: new Date(args.expire).toString()}},{new:true})
        } catch (error) {
            console.error(error)
        }
    },

    makeOrder: async(parent, args, {Models})=>{
        try {
            let imageUrl = null
            let productImages = new Array()
            if(args.customeImage){
                const { createReadStream, filename, encoding, mimetype } = await args.customeImage
                const stream = createReadStream();
                const fileUpload = bucket.file(`customImage/${filename}`);
                const uploadStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: mimetype
                    }
                });
                await stream.pipe(uploadStream)
                imageUrl = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '01-01-2030' // Adjust the expiration time as needed
                })
            }
            let newOrder = Models.orders({
                username: args.username,
                phone: args.phone,
                otherPhone: args.otherPhone,
                address: args.address,
                amount: args.amount,
                customHeight: args.customHeight,
                customWidth: args.customWidth,
                customPrice: args.customPrice,
                comment: args.comment,
                customeImage: imageUrl ? imageUrl[0] : null,
                discountCode: args.discountCode,
                productOrder: args.productOrder,
            })
            try {
                await newOrder.save()
                return newOrder
            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.error('Error When Make Order'+error)
        }
    },
    
    deliverOrder: async(parent, { id }, {Models})=>{   
        try {
            if(await Models.orders.findById(id)){
                await Models.orders.findOneAndUpdate({_id: id},{delivered: true})
                return "Delivered Done"
            }else{
                return "Not avalid id"
            }
        } catch (error) {
            console.error(error)
        }
    },
    deleteOrder: async(parent, { id }, {Models})=>{
        try {
        let orderData = await Models.orders.findById(id)
           if(orderData){
            if(orderData.customeImage){
                let url = orderData.customeImage
                let path = url.split(`${bucket.name}/`)[1].split('?')[0];
                await bucket.file(path).delete()
            }
            await Models.orders.findByIdAndDelete(id)
            return "Order deleted"
           }else{
            return "Not avalid id"
           }
        } catch (error) {
            console.error(error)
        }
    }
}