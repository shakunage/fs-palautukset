require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/contact')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []
  
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {

  const currentDate = new Date()

  Person.count({}, function( err, count){
    res.send('Phonebook has info for ' + count + ' persons <br>' + currentDate)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })

})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  
  const person = request.body
  console.log(person)


  if (!person.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!person.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const names = persons.map((person) => person.name)

  if (names.includes(person.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const newPerson = new Person({
    name: person.name,
    number: person.number || false
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted name or number' })
  }

  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
      