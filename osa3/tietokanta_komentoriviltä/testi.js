const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://veikka:${password}@cluster0.6uygf.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (!(process.argv[3]) && !(process.argv[4])) {
  console.log('phonebook:')
  Person
  .find({})
  .then(persons => { 
    const nameList = persons.map(a => a.name)
    const numberList = persons.map(a => a.number)
    mongoose.connection.close()
    for (var i = 0; i < nameList.length; i++) {
      console.log(nameList[i] + " " + numberList[i])
    }
  })
} 

const person = new Person({
  name: `${process.argv[3]}`,
  number: `${process.argv[4]}`
})

if ((process.argv[3]) || (process.argv[4])) {
  person.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
} 

