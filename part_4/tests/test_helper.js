const Blog = require('../models/blog')
const User = require('../models/user')
const ObjectId = require('mongodb').ObjectId

const initialBlogs = [
  {
    'title': 'Bills Blog',
    'author': 'Mariya Takeuchi',
    'url': 'www.google.com',
    'likes': 3,
    'user': new ObjectId('653e84c59aa09b45955f6625')
  },
  {
    'title': 'Joes Blog',
    'author': 'Joe',
    'url': 'www.joe.com',
    'likes': 0,
    'user': new ObjectId('653e84c59aa09b45955f6625')
  },
  {
    'title': 'full stack Blog',
    'author': 'full stacker',
    'url': 'www.fullstack.com',
    'user': new ObjectId('653e84c59aa09b45955f6625')
  }
]

const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NTNlODRjNTlhYTA5YjQ1OTU1ZjY2MjUiLCJpYXQiOjE2OTg1OTYwMzl9.B4JVxnw1i_Hs1PIF8UyAD7FRyI3D63bpj4CkIil88Nc'

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



module.exports = {
  initialBlogs, usersInDb, blogsInDb,  authHeader
}