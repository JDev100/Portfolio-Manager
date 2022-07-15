const express = require("express") 
const cors = require('cors')
const stockRoutes = require('./routes/stockRoutes')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})
//API Routes
app.use('/api/stocks', stockRoutes)

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, ()=> {
    console.log(`Server connected on Port ${PORT}`)
})

// var yahooFinance = require('yahoo-finance');

// yahooFinance.quote({
//   symbol: 'TSLA',
//   modules: ['price', 'summaryDetail']       // optional; default modules.
// }, (err, quote) => {
//   console.log(quote);
// });