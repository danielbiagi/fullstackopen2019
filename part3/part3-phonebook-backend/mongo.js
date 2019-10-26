const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const argPassword = process.argv[2]
const argName = process.argv[3]
const argNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${argPassword}@cluster0-ypm2i.mongodb.net/app-persons?retryWrites=true&w=majority`
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: argName,
  number: argNumber,
  id: Math.floor(Math.random() * Math.pow(2, 32)),
})

if (argName !== undefined) {

  person.save().then(() => {
    console.log(`added ${argName} number ${argNumber} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('phonebook:')

  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, ' ', person.number)
        mongoose.connection.close()
      })
    })
}
