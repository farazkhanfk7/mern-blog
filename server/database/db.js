const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config();

const connectDB = async () => {
    const dbUrl = process.env.MONGO_URL
    await mongoose.connect(dbUrl, ()=> {
        console.log(`MongoDB Connected`)
    })
}

module.exports = connectDB;