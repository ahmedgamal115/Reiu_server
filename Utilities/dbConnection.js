const { default: mongoose } = require("mongoose");
require('dotenv').config()

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODBURL)
        console.log("Database Connected successfull...")
    } catch (error) {
        console.error(error)
    }
}

module.exports = dbConnect