const express = require('express')
const app = express()
const connectDB = require('./database/db')

connectDB();

app.get('/', async(req,res) => {
    res.send("api running")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})