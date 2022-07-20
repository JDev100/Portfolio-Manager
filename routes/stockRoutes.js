const {getDow, getStockDetails} = require('../controllers/stocksController')

const router = require('express').Router()

router.post('/getdow', getDow)
router.get('/:stockid', getStockDetails)

module.exports = router