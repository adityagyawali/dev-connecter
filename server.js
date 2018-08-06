const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').MONGO_URI

//DB connection
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected' ))
    .catch(err => console.log(err))



//Use Routes
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/posts', posts)


//Listening to port 
const port = process.env.PORT || 8002

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
    
})



