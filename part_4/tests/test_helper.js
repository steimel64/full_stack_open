const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Bills Blog',
    'author': 'Mariya Takeuchi',
    'url': 'www.google.com',
    'likes': 3
  },
  {
    'title': 'Joes Blog',
    'author': 'Joe',
    'url': 'www.joe.com',
    'likes': 0
  },
  {
    'title': 'full stack Blog',
    'author': 'full stacker',
    'url': 'www.fullstack.com',
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,  blogsInDb
}