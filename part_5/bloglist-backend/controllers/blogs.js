const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({ title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

  const user = request.user

  const blogToDelete = request.params.id
  const blogDetail = await Blog.findById(blogToDelete)

  if (blogDetail.user.toString() === user._id.toString()) {
    console.log('lets go')
    await Blog.findOneAndDelete({ _id: blogToDelete })
    response.status(204).end()
  }
  else {
    response.status(401).end()
  }

})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.status(200).json({ message: 'Update Successful' }).end()

})
module.exports = blogRouter