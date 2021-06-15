import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Confirmation from './components/Confirmation'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const addBlogToDb = (blogObject) => {
    blogService
    .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setInfoMessage(`a new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
  
      
    })
  }

  const addLike = (blogObject) => {
    blogObject.likes = blogObject.likes + 1
    blogService
    .update(blogObject.id, blogObject)
      setInfoMessage(`blog ${blogObject.title} was liked!`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
  }

  const removeBlog = (blogObject) => {
    if ((window.confirm(`Do you really want to remove blog ${blogObject.name} by ${blogObject.author}`))) {
      blogService
    .remove(blogObject.id)
      setInfoMessage(`blog ${blogObject.title} was deleted!`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('invalid credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(function (a, b) {
        return b.likes - a.likes;
      }))
    )
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>      
  )

  return (    
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <Confirmation message={infoMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p><button type="logout" onClick={() => {window.localStorage.clear()}}>logout</button>
        
          <BlogForm createBlog={addBlogToDb} />

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} remove={removeBlog} username={user.username}/>
          )}
        </div>
        
      }
    </div>
  )
}

export default App