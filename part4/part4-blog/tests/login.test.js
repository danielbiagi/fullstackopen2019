const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('login basic test', () => {
  jest.setTimeout(23000)

  test('no username/password', async () => {
    const newUser = {
      username: 'mluukkai',
    }

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('missing')

    const newUser2 = {
      password: 'salainen'
    }

    const result2 = await api
      .post('/api/login')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('missing')
  }, 23000)

  test('username/password shorter than 3 chars', async () => {
    const newUser = {
      username: 'ml',
      password: 'salainen'
    }

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('short')

    const newUser2 = {
      username: 'mluukkai',
      password: 'sa'
    }

    const result2 = await api
      .post('/api/login')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('short')
  }, 23000)
})

describe('login success', () => {
  jest.setTimeout(23000)

  test('checking if we got a token', async () => {
    jest.setTimeout(23000)

    await User.deleteMany()
    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }

    const newUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token)
  }, 23000)
})

afterAll(() => {
  mongoose.connection.close()
})