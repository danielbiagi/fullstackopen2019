const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany()

    // helper.initialBlogs[0] =
    // const blogObject = new Blog(blog)
    // blogObject.save()
    //apparently this being async sometimes cause the list to be in a different order
    // helper.initialBlogs.forEach(async blog => {
    //     const blogObject = new Blog(blog)
    //     await blogObject.save()
    // })

    // const blogObjects = helper.initialBlogs
    //     .map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // const results = await Promise.all(promiseArray)
    // console.log(results)
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
      }


})


describe('blog api GET tests', () => {
    jest.setTimeout(23000)
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 23000)

    test('there are six blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(6)
    }, 23000)

    test('the first blog is about React patterns', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe('React patterns')
    }, 23000)

    test('there should be an id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    }, 23000)
})

describe('blog api POST tests', () => {
    jest.setTimeout(23000)
    test('trying to insert a new blog as json', async () => {

        const newBlog = {
            title: 'a new blog post here',
            author: 'Daniel Biagi',
            url: 'https://danielbiagi.dev',
            likes: 1000,
            userId: "5d92bc0af1ae44733e54b07a"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)

        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
        expect(titles).toContain('a new blog post here')
    }, 23000)

    test('trying to insert a blog post without likes', async () => {

        const newBlog = {
            title: 'I have zero likes',
            author: 'Daniel Biagi',
            url: 'https://danielbiagi.dev',
            userId: "5d92bc0af1ae44733e54b07a"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const likes = await response.body.map(r => r.likes)

        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
        expect(likes[helper.initialBlogs.length]).toBe(0)
    }, 23000)

    test('trying to insert a blog post without title', async () => {

        const newBlog = {
            author: 'Daniel Biagi',
            url: 'https://danielbiagi.dev',
            likes: 1001,
            userId: "5d92bc0af1ae44733e54b07a"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(helper.initialBlogs.length)

    }, 23000)
})


afterAll(() => {
    mongoose.connection.close()
})
