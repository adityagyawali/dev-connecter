const mongoose = require('mongoose')

const Schema = mongoose.Schema

//Create Auth Schema
const AuthSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	date:{


		type:                   Date,
		default: Date.now(),
	},
})

module.exports         = mongoose.model('auth', AuthSchema)
