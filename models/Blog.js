const { Schema, model } = require('mongoose')

const RequiredString = {
  type:String,
  required:true
}

const blogSchema = new Schema({
  title:RequiredString,
  body:RequiredString
})

const Blog = model('blogs', blogSchema)

module.exports = {
  Blog
}