const {getDow, getStockDetails, getStockHistory} = require('../controllers/stocksController')

const router = require('express').Router()

router.post('/getdow', getDow)
router.get('/:stockid', getStockDetails)
router.post('/gethistory', getStockHistory)

module.exports = router