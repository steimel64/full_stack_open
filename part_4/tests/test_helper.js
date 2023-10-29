const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Bills Blog',
    'author': 'Mariya Takeuchi',
    'url': 'www.google.com',
    'likes': 3,
    'userId': '653e6f4774198d14ca396f07'
  },
  {
    'title': 'Joes Blog',
    'author': 'Joe',
    'url': 'www.joe.com',
    'likes': 0,
    'userId': '653e6f4774198d14ca396f07'
  },
  {
    'title': 'full stack Blog',
    'author': 'full stacker',
    'url': 'www.fullstack.com',
    'userId': '653e6f4774198d14ca396f07'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,  blogsInDb, usersInDb, authHeader
}