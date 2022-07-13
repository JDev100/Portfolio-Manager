const {getDow} = require('../controllers/stocksController')

const router = require('express').Router()

router.post('/getdow', getDow)

module.exports = router