const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10

  // password exists validation
  if (!password) {
    return response.status(400).json({
      error: 'password missing'
    })
  }
  // password length validation
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be 3 characters in length'
    })
  }




  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter