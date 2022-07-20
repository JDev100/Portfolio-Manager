const express = require("express")
const cors = require('cors')
const stockRoutes = require('./routes/stockRoutes')

//Boiler plate
const app = express()
require('dotenv').config()

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(express.json())

//API Routes
app.use('/api/stocks', stockRoutes)

//Port listening
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server connected`)
})  