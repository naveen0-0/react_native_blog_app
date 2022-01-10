const { Schema, model } = require('mongoose')

const RequiredString = {
  type : String,
  required:true
}

const userSchema = new Schema({
  username : RequiredString,
  email:RequiredString,
  password:RequiredString
})

const User = model('users', userSchema)
module.exports = {
  User
}