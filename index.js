const express = require("express") 
const cors = require('cors')
const stockRoutes = require('./routes/stockRoutes')

//Boiler plate
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

//API Routes
app.use('/api/stocks', stockRoutes)

//Port listening
const PORT = 5000 || process.env.PORT;

const server = app.listen(5000, ()=> {
    console.log(`Server connected on Port 5000`)
})