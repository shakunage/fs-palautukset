import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const DeleteButton = (props) => {

  return (
    <button type="delete" onClick={event => props.feature(event, props.name)}>delete</button>
  )
}

const Person = (props) => {
  
  return (
    <p>
      {props.name} {props.number} <DeleteButton feature={props.feature} persons={props.persons} name={props.name}/>
    </p>    
  )
}

const Filter = (props) => {
  
  return (
    <p>
      filter: <input
          value={props.inputValue}
          onChange={props.function}
        />
    </p>
  )
}

const PersonForm = (props) => {
  
  return (
    <form onSubmit={props.submitFunction}>
        <div>
          name: <input
            value={props.nameInput}
            onChange={props.nameFieldChange}
          />
          <br></br>
          number: <input 
          value={props.numberInput}
          onChange={props.numberFieldChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
   personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)}
      )
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    console.log(isNaN(newNumber))
    console.log(newNumber === '')

    const names = persons.map((person) => person.name)
    
    if (names.indexOf(newName) === -1) {
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))},
      setNotificationMessage(
        `Added '${newName}'`
      ),
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)  
        )
    } else if (window.confirm(newName + " is already added to the phonebook, replace old number with new?")) {
        personService
          .update(persons.find(x => x.name === newName).id, personObject)
          .then(response => {setNotificationMessage(
            `Updated '${newName}'`
          )},
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000))
          .catch(
            (setErrorMessage(
              `Information for  '${newName}' has already been removed from server`),
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000))
          )
        
    } else window.alert(newName + " is already added to phonebook")
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameSearch(event.target.value)
    setShowAll(false)
  }

  const handleLeftClick = (event, name) => {
    if (window.confirm("Delete " + name + " from phonebook?")) {
      personService
        .remove(persons.find(x => x.name === name).id)
        .then(setNotificationMessage(
          `Removed '${name}'`
        ),
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000))
    } else console.log('ei')
    setPersons(persons.filter(x => x.name !== name))
  }

  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(nameSearch) > -1)


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <Filter inputValue={nameSearch} function={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm submitFunction={addName} nameInput={newName} nameFieldChange={handleNameChange} numberInput={newNumber} numberFieldChange={handleNumberChange} />
      <h2>Numbers</h2>
        <ul>
        {personsToShow.map((person, i) => 
          (<Person key={i} persons={persons} feature={handleLeftClick} name={person.name} number={person.number}/>)
        )}
        </ul>
    </div>
  )
}

export default App
