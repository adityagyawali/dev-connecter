const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const passport = require('passport')

//Validator
const validatPostInput = require('../../validation/post')

//Load Model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//@route GET api/posts/test

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }))

//@route POST /api/posts
//@desc Create posts
//@access Private

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatPostInput(req.body)

		//check Validation
		if (!isValid) {
			//return any erros with 400 status
			return res.status(400).json(errors)
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.name,
			user: req.user.id, //current logged in user
		})
		newPost.save().then(post => res.json(post))
	}
)
//@route GET /api/posts
//@desc Get all the posts
//@access Public

router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(() => res.json('No Posts found'))
})

//@route GET /api/posts/id
//@desc Get single the post
//@access Public
router.get('/:id', (req, res) => {
	console.log('param', req.param.id)
	console.log('params', req.params.id)

	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(() => res.json('No post found with that id'))
})

//@route DELETE /api/posts/:id
//@desc DELETE single the post
//@access Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		console.log('req.user', req.user.id)
		console.log('req.user', req.params.id)

		Profile.findOne({ user: req.user.id }).then(() => {
			Post.findById(req.params.id).then(post => {
				console.log('post', post.user)

				if (post.user.toString() !== req.user.id) {
					return res.status(401).json('unauthorized')
				}
				post
					.deleteOne()
					.then(() => res.json({ success: true }))
					.catch(() => res.json({ notfound: 'post not found' }))
			})
		})
	}
)

//@route POST /api/posts/like:id
//@desc Like Post
//@access Private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findById(req.user.id).then(() => {
			Post.findById(req.params.id).then(post => {
				if (post.likes.filter(like => like.id === req.user.id).length > 0) {
					return res.json({ error: 'User already liked this post' })
				} else {
					//add to lieks array
					post.likes.unshift({ user: req.user.id })
					//save the changes
					post
						.save()
						.then(post => res.json(post))
						.catch(err => res.json(err))
				}
			})
		})
	}
)
//@route POST /api/posts/unlike:id
//@desc UnLike Post
//@access Private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findById(req.user.id).then(() => {
			Post.findById(req.params.id).then(post => {
				if (post.likes.filter(like => like.id === req.user.id).length === 0) {
					return res.json({ error: 'You haven\'t like the post' })
				}
				const removeLike = post.likes
					.map(like => like.user.toString())
					.indexOf(req.user.id)

				post.likes.splice(removeLike, 1)
				post
					.save()
					.then(post => res.json(post))
					.catch(err => res.json(err))
			})
		})
	}
)

//@route POST /api/posts/comment:id
//@desc Comment on a  Post
//@access Private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatPostInput(req.body)

		//check Validation
		if (!isValid) {
			//return any erros with 400 status
			return res.status(400).json(errors)
		}
		Post.findById(req.params.id).then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id,
			}

			//add to comment array
			post.comments.unshift(newComment)
			//save the changes
			post
				.save()
				.then(post => res.json(post))
				.catch(err => res.json(err))
		})
	}
)

//@route DELETE /api/posts/comment:id/:comment_id
//@desc Delete Comment on a  Post
//@access Private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt'),
	(req, res) => {
		Post.findById(req.params.id).then(post => {
			//check if comment exits
			if (
				post.comments.filter(comment => comment._id === req.params.comment_id)
					.length > 0
			) {
				return res.json('comment doesnt exist')
			}
			//remove comment_
			const removeComment = post.comments
				.map(comment => comment._id.toString())
				.indexOf(req.params.comment_id)

			post.comments.splice(removeComment)

			post
				.save()
				.then(comment => res.json(comment))
				.err(err => res.json(err))
		})
	}
)

module.exports = router
