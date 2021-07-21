const { ApolloServer, UserInputError, AuthenticationError, gql} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()


const JWT_SECRET = process.env.SECRET

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int,
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }    
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) =>  {
      let books = await Book.find({})
      const authors = await Author.find({})

      books = books.map(b => ({...b, author: authors.find((obj) => obj.id == b.author)}))
      books = books.map(b => ({title: b._doc.title, published: b._doc.published, genres: b._doc.genres, author: b.author}))
      console.log(books)

      if (!args.genre && !args.author) {
        return books
      }
      if (!args.genre) { 
      return books.filter((a) => a.author ==  args.author)
      }
      if (!args.author) {
        return books.filter((a) => a.genres.includes(args.genre))
      }
      return books.filter((a) => a.genres.includes(args.genre)).filter((a) => a.author ==  args.author)
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})

      const newArr = authors.map(v => ({...v, bookCount: books.filter((obj) => obj.author == v.id).length}))
      return newArr.map(a => ({name: a._doc.name, born: a._doc.born, bookCount: a.bookCount}))
    },
    me: async (root, args, context) => {
      const currentUser = await context.currentUser 
      console.log(currentUser)
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book = {title: args.title, published: args.published, author: {name: args.author}, genres: args.genres, id: uuid() }

      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (await Author.findOne({ name: book.author.name }) === null) {
        const author = new Author({name: book.author.name, id: uuid()})
        book = new Book({...book, author: author})
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }

      if (await Author.findOne({ name: book.author.name })) {
        const author = await Author.findOne({ name: book.author.name })
        book = new Book({...book, author: author})
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }
    },
    
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author.born = args.setBornTo
      return author.save()
    },

    createUser: async (root, args) => {
      const user = await new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
