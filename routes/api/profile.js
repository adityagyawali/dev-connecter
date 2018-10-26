const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load  model
const Profile = require('../../models/Profile')

//Load Vlaidation
const ValidProfileInput = require('../../validation/profile')
//@route GET api/profile/test

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }))

//get api/profile
//note: here we are not doint profile/:id to get single user becuse cont...
//we will be using jwt to get user information
//return current users profile
//Private route

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {}
		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user'
					return res.status(404).json(errors)
				} else {
					res.json(profile)
				}
			})
			.catch(err => res.status(404).json(err))
	}
)

//POST api/profile
//note: here we are not doint profile/:id to get single user becuse cont...
//we will be using jwt to get user information
//return current users profile, here we create or update user profile
//Private route

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),

	(req, res) => {
		const { errors, isValid } = ValidProfileInput(req.body)

		//check Validation
		if (!isValid) {
			//return any erros with 400 status
			return res.status(400).json(errors)
		}

		//putting everything in this empty object that coemes from form or jwt
		const profileFields = {}

		if (req.user.id) profileFields.user = req.user.id //comesfrom jwt token
		if (req.body.handle) profileFields.handle = req.body.handle
		if (req.body.company) profileFields.company = req.body.company
		if (req.body.website) profileFields.website = req.body.website
		if (req.body.location) profileFields.location = req.body.location
		if (req.body.status) profileFields.status = req.body.status
		if (req.body.githubusername)
			profileFields.githubusername = req.body.githubusername
		if (req.body.bio) profileFields.bio = req.body.bio
		//since skills will come as comma seperated values, we split them in array
		if (req.body.skills) {
			profileFields.skills = req.body.skills.split(',')
		}
		// social info
		profileFields.social = {} //another social object inside profileFields object
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				//if profile found update the profile
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => {
					res.json(profile)
				})
			} else {
				//if no profile, create new one
				//new profile

				//check if the handle already exists in url
				Profile.findOne({ handle: req.body.handle }).then(profile => {
					if (profile) {
						const errors = {}
						errors.handle = 'This handle already exists'
						res.json(errors)
					} else {
						//save profile
						new Profile(profileFields).save().then(profile => {
							res.json(profile)
						})
					}
				})
			}
		})
	}
)

module.exports = router
