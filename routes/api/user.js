const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

//@route GET api/user/test

router.get('/test', (req, res) => res.json({ msg: 'User Works' }))

//@route POST api/user/register
//desc to register user

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)
	//check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	console.log('req', req.body)

	User.findOne({ email: req.body.email }).then(user => {
		console.log('user', user)

		if (user) {
			//checks if user is already registered
			errors.email = 'Email already exists'
			return res.status(400).json(errors)
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', //size
				r: 'pg', //rating
				d: 'mm', //default
			})
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password,
			})

			// creating hash password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err
					newUser.password = hash
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err))
				})
			})
		}
	})
})

//@route POST api/user/login
//desc to register user

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)
	//check validation
	if (!isValid) {
		return res.status(400).json(errors)
	}
	const email = req.body.email
	const password = req.body.password
	User.findOne({ email }) //check email if it exists
		.then(user => {
			if (!user) {
				errors.email = 'User not found'
				return res.status(404).json(errors)
			}

			//check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					//user matched
					const payload = { id: user.id, name: user.name, avatar: user.avatar } //JWT Payload

					//sign token
					jwt.sign(
						payload,
						keys.secretOrKey,
						{ expiresIn: 3600 },
						(err, token) => {
							res.json({
								success: true,
								token: 'Bearer ' + token,
							})
						}
					)
				} else {
					errors.password = 'Password incorrect'
					return res.status(404).json(errors)
				}
			})
		})
})

//get api/users/current
//return current user
//Private route

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		})
	}
)

module.exports = router
