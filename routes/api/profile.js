const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load  model
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//Load Vlaidation
const ValidProfileInput = require('../../validation/profile')
const ValidExperienceInput = require('../../validation/experience')
const ValidEducationInput = require('../../validation/education')
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

////get api/profile/handle/:handle
//note: here we are going to access handle/:handle to get single user
//return current users profile
//Public route

router.get('/handle/:handle', (req, res) => {
	const errors = {}
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.handle = 'Profile with that handle doesn\'t exists'
				res.status(404).json(errors)
			} else {
				res.json(profile)
			}
		})
		.catch(() => res.json({ err: 'Profile with that handle doesn\'t exists' }))
})

////get api/profile/user/:user_id
//note: here we are going to access api/profile/user/:user_id to get single user
//return current users profile
//Public route

router.get('/user/:user_id', (req, res) => {
	console.log('req.params', req.param)
	const errors = {}
	Profile.findById(req.params.user_id)
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.user_id = 'Profile with that handle doesn\'t exists'
				res.status(404).json(errors)
			} else {
				res.json(profile)
			}
		})
		.catch(() => res.json({ err: 'Profile with that handle doesn\'t exists' }))
})

////get api/profile/all
//note: here we are going to access all the profiles
//return all users profiles
//Public route

router.get('/all', (req, res) => {
	const errors = {}
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'There are no profiles'
				res.status(404).json(errors)
			}
			res.json(profiles)
		})
		.catch(() => res.json({ err: 'Profile with that handle doesn\'t exists' }))
})

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

//POST api/profile/experience
//we will be using jwt to get user information
//here we create experience inside user profile
//Private route

router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		console.log('req.body.fromexpe', req.body)

		const { errors, isValid } = ValidExperienceInput(req.body)

		//check Validation
		if (!isValid) {
			//return any erros with 400 status
			return res.status(400).json(errors)
		}
		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				const newExperience = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description,
				}
				//add this new experience to the profile(start)
				profile.experience.unshift(newExperience)

				//save everything
				profile.save().then(profile => res.json(profile))
			}
		})
	}
)
//POST api/profile/education
//we will be using jwt to get user information
//here we create education inside user profile
//Private route

router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		console.log('req.body', req.body)

		const { errors, isValid } = ValidEducationInput(req.body)

		//check Validation
		if (!isValid) {
			//return any erros with 400 status
			return res.status(400).json(errors)
		}
		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				const newEducation = {
					school: req.body.school,
					degree: req.body.degree,
					fieldofstudy: req.body.fieldofstudy,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description,
				}
				//add this new experience to the profile(start)
				profile.education.unshift(newEducation)

				//save everything
				profile.save().then(profile => res.json(profile))
			}
		})
	}
)

////DELETE api/profile/experience
//we will be using jwt to get user information
//here we DELETE experience inside user profile, with user id
//Private route

router.delete(
	'/experience/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				//when the pofile is found find the experience you want to dlete

				const removeExp = profile.experience
					.map(exp => exp.id)
					.indexOf(req.params.id)

				profile.experience.splice(removeExp, 1)

				//save profile
				profile.save().then(profile => res.json(profile))
			})
			.catch(err => res.status(404).json(err))
	}
)
////DELETE api/profile/education
//we will be using jwt to get user information
//here we DELETE experience inside user profile, with user id
//Private route

router.delete(
	'/education/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				//when the pofile is found find the experience you want to dlete

				const removeEdu = profile.education
					.map(edu => edu.id)
					.indexOf(req.params.id)

				profile.education.splice(removeEdu, 1)

				//save profile
				profile.save().then(profile => res.json(profile))
			})
			.catch(err => res.status(404).json(err))
	}
)

////DELETE api/profile
//we will be using jwt to get user information
//here we DELETE the whole user and his profile
//Private route
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ success: true })
			)
		})
	}
)

module.exports = router
