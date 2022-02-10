const express = require('express')
const app = express()
const connectDB = require('./database/db')

connectDB();

app.use(express.json())

// Routes
app.use('/api/user/', require('./routes/user'))
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/post/', require('./routes/post'))
app.use('/api/category/', require('./routes/category'))

app.get('/', async(req,res) => {
    res.send("api running")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})