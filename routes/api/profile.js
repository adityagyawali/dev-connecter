const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load profile model
const Profile = require('../../models/Profile')

//Load user model
const User = require('../../models/Auth')

//@route GET api/profile/test

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }))

//get api/profile
//note: here we are not doint profile/:id to get single user becuse cont...
//we will be using jwt to get user information
//return current users profile
//Private route

router.get('/', passport.authenticate('jwt', { session : false }), (req, res) => {
	const errors = {}
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			if(!profile) {
				errors.noprofile = 'There is no profile for this user'
				return res.status(404).json(errors)
			}
			res.json(profile)
		})
		.catch(err => res.status(404).json(err))
})


module.exports = router
