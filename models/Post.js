const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	user: {
		type: Schema.Types.Object,
		ref: 'user',
	},
	text: {
		type: String,
		required: true,
	},
	name: String,
	avatar: String,
	likes: [
		{
			user: {
				type: Schema.Types.Object,
				ref: 'user',
			},
		},
	],
	comments: [
		{
			user: {
				type: Schema.Types.Object,
				ref: 'user',
			},
			text: {
				type: String,
				required: true,
			},
			name: String,
			avatar: String,
			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('post', PostSchema)
