import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Notification from './Notification'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'


const App = () => {
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSucessMessage] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    // Check for person's name
    if ((persons.findIndex(a => a.name === personObject['name']) === -1) ? false : true) {
      window.confirm(personObject['name'] + " is already added to phonebook, replace the old number with the new one?") ? updateNumber(personObject) : void (0)
      // Check for person's number
    } else if ((persons.findIndex(a => a.number === personObject['number']) === -1) ? false : true) {
      setErrorMessage(personObject['number'] + " number exists for other person!")
      setTimeout(() => { setErrorMessage(null) }, 5000)
      // Insert person
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSucessMessage(personObject['name'] + " created!")
          setTimeout(() => { setSucessMessage(null) }, 5000)
        })
    }
  }

  const updateNumber = p => {
    const person = persons.find(pe => pe.name === p.name)
    const changedPerson = { ...person, number: p.number }

    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== p.name ? person : returnedPerson))
        setSucessMessage(returnedPerson['name'] + " number updated!")
        setTimeout(() => { setSucessMessage(null) }, 5000)
      })
      .catch(error => {
        setErrorMessage(`the person '${person.name}' was already deleted from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setPersons(persons.filter(pe => pe.id !== p.id))
      })
  }

  const handleDeleteClick = p => {
    if (window.confirm(`Delete ${p.name} from phonebook?`)) {
      personService
        .remove(p.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== p.id ? person : false))
          setSucessMessage(p.name + " deleted!")
          setTimeout(() => { setSucessMessage(null) }, 5000)
        })
        .catch(error => {
          setErrorMessage(`the person '${p.name}' was already deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const rowsFilter = filter === "" ? persons : persons.filter(
    person => {
      const pName = person['name'].toUpperCase()
      return pName.includes(filter.toUpperCase())
    }
  )

  const rows = () => rowsFilter.map(p =>
    < li key={p.id} > {p.name} {p.number} <button onClick={() => handleDeleteClick(p)}>delete</button></li >
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter value={filter} handleFilterChange={(e) => handleFilterChange(e)} />
      <h3>add a new</h3>
      <PersonForm addName={(e) => addName(e)} newName={newName} newNumber={newNumber}
        handleNameChange={(e) => handleNameChange(e)} handleNumberChange={(e) => handleNumberChange(e)} />
      <h3>Numbers</h3>
      <Persons rows={() => rows()} />
    </div>
  )
}

export default App