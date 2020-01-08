/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//
// eslint-disable-next-line no-empty-pattern
blogsRouter.get('/', async ({}, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id,
      comments: []
    })


    if (!blog.title || !blog.url) {
      return response.status(400).json({
        error: 'title and url must be informed' 
      })
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if (blog !== null && blog.user !== undefined && blog.user.toString() !== decodedToken.id) response.status(403).json({
      "error": 'this blog is not yours'
    })
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: body.comments ? body.comments : []
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    if (updatedBlog !== undefined && updatedBlog !== null)
      response.status(201).json(updatedBlog.toJSON())
    else
      response.status(404).json({
        error: 'whoops'
      })
  } catch (error) {
    next(error)
  }
})

// comments
blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findOne({_id: request.params.id})

    if( !blog ) response.status(404).end()
      const comments =  blog.comments ? [...blog.comments, request.body.comment] : [ request.body.comment]
      // const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: request.body.comment } }, { new: true })

      const blogObj = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user,
        comments: comments
      }

      ret = await Blog.findOneAndUpdate({ _id: request.params.id }, blogObj, { new:true } )
      console.log("ret", ret, "blogObj", blogObj)

      if( ret === null )
        response.status(400).json({ error: 'bad request' })

      response.status(201).json(blogObj)

  } catch (error) {
      next(error)
  }

})

module.exports = blogsRouter