const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('when there is initially one user at db', () => {
  jest.setTimeout(23000)
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 23000)
})

describe('when there is initially one user at db', () => {
  jest.setTimeout(23000)

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root2',
        name: 'Superuser',
        password: 'salainen'
      }

      await api
      .post('/api/users') 
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

     const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    }, 23000)
  })

  // describe('when there is initially one user at db', () => {
  //   // ...

  //   test('creation fails with proper statuscode and message if username already taken', async () => {
  //     const usersAtStart = await helper.usersInDb()

  //     const newUser = {
  //       username: 'root',
  //       name: 'Superuser',
  //       password: 'salainen',
  //     }

  //     const result = await api
  //       .post('/api/users')
  //       .send(newUser)
  //       .expect(400)
  //       .expect('Content-Type', /application\/json/)

  //     expect(result.body.error).toContain('`username` to be unique')

  //     const usersAtEnd = await helper.usersInDb()
  //     expect(usersAtEnd.length).toBe(usersAtStart.length)
  //   })
  // })

  afterAll(() => {
    mongoose.connection.close()
})