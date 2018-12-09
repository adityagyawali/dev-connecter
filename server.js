const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const app = express()

//cors
app.use(cors())

const user = require('./routes/api/user')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').MONGO_URI

//DB connection
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport)

//Use Routes
app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

//Server Static Assets if in porduction
if (process.env.NODE_ENV === 'production') {
	console.log('process.env.NODE_ENV', process.env.NODE_ENV)
	//set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

//Listening to port
const port = 5000

app.listen(port, () => {
	console.log(`Server is running in ${port}`)
})
