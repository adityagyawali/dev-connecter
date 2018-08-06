const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const db = require('./config/keys').MONGO_URI

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected' ))
    .catch(err => console.log(err))



const port = process.env.PORT || 8002



app.listen(port, () => {
    console.log(`Server is running in ${port}`);
    
})



