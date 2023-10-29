const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })


})

describe('user creation tests', () => {
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if pw less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'billys boot',
      name: 'billys boot camp',
      password: 'bb',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be 3 characters in length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bi',
      name: 'billys boot camp',
      password: 'bootcamp',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('login test', () => {
  test('login should have proper auth token', async () => {

    const newUser = {
      username: 'mluukkai',
      password: 'salainen',
    }

    const result =  await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(result)
  })
})
