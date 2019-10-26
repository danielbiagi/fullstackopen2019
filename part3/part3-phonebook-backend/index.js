const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const morganBody = require('morgan-body')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/persons')

mongoose.set('useFindAndModify', false)

app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('id', function getId(req) {
  return req.id
})

function assignId(req, res, next) {
  // req.id = uuid.v4()
  next()
}

app.use(assignId)
app.use(morgan(':id :method :url :response-time'))

morganBody(app)



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.use(cors())
//

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const size = Object.keys(persons).length
    const today = new Date()
    let info = 'Phonebook has info for '
    res.send('<h3>' + info + size + ' people<br>' + today + '</h3>')
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})
//inseri o next
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const generateId = () => {
  const randId = Math.floor(Math.random() * Math.pow(2, 32))
  return randId
}

//inseri o next
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const isUnique = Person.find({}).then(persons => persons.findIndex(a => a.name === body.name) === -1)


  if (!body.name) {
    // console.log(body)
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    // console.log(body)
    return response.status(400).json({
      error: 'number missing'
    })
  }
  if (!isUnique) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})