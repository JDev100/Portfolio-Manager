const {getDow, getStockDetails, getStockHistory, backtest} = require('../controllers/stocksController')

const router = require('express').Router()

router.post('/getdow', getDow)
router.get('/:stockid', getStockDetails)
router.post('/gethistory', getStockHistory)
//router.post('/backtest', backtest)

module.exports = router