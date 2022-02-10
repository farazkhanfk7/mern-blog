const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send('Category route')
})

module.exports = router;