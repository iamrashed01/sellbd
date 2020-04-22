const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const passport = require("passport");
require('dotenv').config()





// connect DB
const connectDB = require('./config/db')
connectDB();

// init middleware
app.use(express.json({ extended: true }))
app.use(cors())
app.use(morgan('dev'))


app.use(passport.initialize());
require('./services/googleStrategy')
require('./services/facebookStrategy')


// routes
require('./routes/googleAuth')(app)
require('./routes/facebookAuth')(app)


app.use('/', require('./routes/advertise'))
app.use('/', require('./routes/localAuth'))


// Start the Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})