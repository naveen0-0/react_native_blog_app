const router = require('express').Router()
const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

//@ Signup
router.route('/signup').post(async (req,res) => {
  const { username, email, password } = req.body;
  let userWithThatUsername = await User.findOne({ username })
  if(userWithThatUsername !== null) return res.send({ operation : false, feedback:"Username Taken" })

  let userWithThatEmail = await User.findOne({ email })
  if(userWithThatEmail !== null) return res.send({ operation : false, feedback:"Email Taken" })

  await User.create({ username, email, password })

  jwt.sign({ username, email }, process.env.ACCESS_TOKEN,(err, token) => {
    if(err){
      return res.send({ operation : false, feedback:"Error Creating Token" })
    }
    return res.send({ operation: true, username, email, loggedIn:true, token })
  });
})

//@ Login
router.route('/login').post(async (req,res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username })

  if(user === null) return res.send({ operation : false, feedback:"Username Incorrect" })

  if(user.password !== password) return res.send({ operation : false, feedback:"Password Incorrect" })

  jwt.sign({ username, email:user.email }, process.env.ACCESS_TOKEN,(err, token) => {
    if(err){
      console.log("Error While Creating a token");
      return res.send({ operation : false, feedback:"Error Creating Token" })
    }
    return res.send({ operation: true, username, email:user.email, loggedIn:true, token })
  });
})

//@ Get User
router.route('/getuser').get(async (req,res) => {
  const logintoken = req.headers.authorization;
  if(logintoken === null) return res.send({ operation : false })

  jwt.verify(logintoken, process.env.ACCESS_TOKEN,(err, decoded) => {
    if(err) return res.send({ operation : false, feedback:"Error Validating Token" })
    return res.send({ operation: true, ...decoded, loggedIn:true })
  });
})


module.exports = router