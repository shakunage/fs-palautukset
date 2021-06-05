const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({ 
        error: 'password must exist and be atleast 3 characters long' 
      })
  }

  var users = await User.find({})
  users = users.map(user => user.toJSON())
  
    
  console.log('Users are: ', users)
  const usernames = users.map((user) => user.username)
  console.log('Names are: ', usernames)

  if (usernames.includes(body.username)) {
    return response.status(400).json({ 
      error: 'username must be unique' 
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })


  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
