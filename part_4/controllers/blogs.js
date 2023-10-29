const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogToDelete = request.params.id
  await Blog.findOneAndDelete({ _id: blogToDelete })
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.status(200).json({ message: 'Update Successful' }).end()

})
module.exports = blogRouter