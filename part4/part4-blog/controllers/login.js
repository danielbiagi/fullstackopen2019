const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = await request.body

    if (body.username === undefined || body.password === undefined)  {    return response.status(400).json({ error: 'username/password missing' })  }

    if (body.username.length < 3 || body.password.length < 3)  {    
        return response.status(400).json({ error: 'username/password too short' })
    }

    const user = await User.findOne({
        username: body.username
    })

    const passwordCorrect = user === null ?
        false :
        await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({
            token,
            username: user.username,
            name: user.name
        })
})

module.exports = loginRouter