const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const User = require('../../models/Auth')

//@route GET api/auth/test

router.get('/test', (req, res) => res.json({msg: 'Auth Works'}))

//@route POST api/auth/register
//desc to register user

router.post('/register', (req, res) => {
    console.log('req',req.body)
    
    User.findOne({email: req.body.email})
        .then(user => {
            console.log('user',user)
            
            if(user)  { //checks if user is already registered
                return  res.status(400).json({email: 'Email already exists'})
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                // creating hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//@route POST api/auth/login
//desc to register user

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email}) //check email if it exists
        .then( user => {
            if(!user) {
                return res.status(404).json({email: 'User with that email not found'})
            } 

            //check password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if(isMatch) {
                        res.json({msg: 'Success'})
                    } else {
                        return res.status(404).json({password: 'Password Incorrect'})
                    }
                })
        })
})


module.exports = router