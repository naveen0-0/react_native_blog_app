const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')


const app = express()

//@ Middleware
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

//@ Routes
app.get('/', (req,res) => { res.sendFile( __dirname + '/pages/welcome.html') })
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

//@ Mongo DB Initialization
mongoose.connect(process.env.MONGO || "mongodb://localhost/blog")
  .then(() => console.log("Mongo DB Connection Successful"))
  .catch(() => console.log("Mongo DB Connection Failure"))


const PORT = process.env.PORT || 5000 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))