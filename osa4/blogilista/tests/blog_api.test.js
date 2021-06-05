const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    "title": "Placeholder title",
    "author": "John Doe",
    "url": "aalto.fi",
    "likes": 0
  },
  {
    "title": "Time traveling",
    "author": "John Titor",
    "url": "future.org",
    "likes": 44
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('new blogs can be added and read', async () => {
    const newBlog = {
        "title": "How to Win Friends and Influence People",
        "author": "Dale Carnegie",
        "url": "penguin.com",
        "likes": 1934
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toEqual(initialBlogs.length+1)
    expect(response.body[2].title).toBe("How to Win Friends and Influence People")
})

test('id is stored in a properly named field', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('likes will be set to 0 if undefined', async () => {
    const newBlog = {
        "title": "Undefined People",
        "author": "No likes",
        "url": "nolikes.com",
        "likes":""
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')

    expect(response.body[2].title).toBe("Undefined People")
    expect(response.body[2].likes).toBe(0)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('HTTP error 200 will be returned for blogs with no title', async () => {
    const noTitle = {
        "title": "",
        "author": "No Title",
        "url": "nothing.com",
        "likes":"21"
    }
    
    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)
  
})

test('HTTP error 200 will be returned for blogs with no url', async () => {
    const noUrl = {
        "title": "No Url",
        "author": "No No Url",
        "url": "",
        "likes":"21"
    }
  
    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)
  
})
afterAll(() => {
  mongoose.connection.close()
})