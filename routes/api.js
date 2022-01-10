const router = require('express').Router()
const { Blog } = require('../models/Blog')

router.route('/newblog').post(async (req, res) => {
  const { title, body } = req.body;
  try {
    let blog = await Blog.create({ title, body })
    console.log(blog);
    return res.send({ operation : true, blog  })
  } catch (error) {
    return res.send({ operation : false })
  }
})

router.route('/allblogs').get(async (req,res) => {
  try {
    let blogs = await Blog.find({},{ title:1, body:1, })
    console.log(blogs);
    return res.send({ operation : true, blogs })
  } catch (error) {
    return res.send({ operation : false })
  }
})

module.exports = router