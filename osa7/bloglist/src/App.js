import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import SingleBlog from './components/SingleBlog'
import usersService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { logIn, restoreLogin } from './reducers/userReducer'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"

const App = () => {
  const [users, setUsers] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const notification = useSelector(({ notifications }) => {
    return notifications
  })

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const user = useSelector(({ user }) => {
    return user
  })
  
  const addBlogToDb = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const addLike = async (blogObject) => {
    blogObject.likes = blogObject.likes + 1
    dispatch(likeBlog(blogObject.id, blogObject))
  }

  const removeBlog = (blogObject) => {
    if (window.confirm(`Do you really want to remove blog ${blogObject.title} by ${blogObject.author}`)) {
      dispatch(deleteBlog(blogObject.id, blogObject))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      dispatch(logIn(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('invalid credentials'))
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(restoreLogin(user))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      const userlist = await usersService.getUsers()
      setUsers(userlist)
   })()
  }, [])

  const match = useRouteMatch('/users/:id')
  const singleUser = match 
    ? users.find(a => a.id === match.params.id)
    : null
  
  let blogList = []
  blogList = users
    ? users.map(user => blogList.concat(...user.blogs)) 
    : null
  
  const merged = [].concat.apply([], blogList);

  console.log(merged)
  
  const match2 = useRouteMatch('/blogs/:id')
  const singleBlog = match2
    ? merged.find(a => a.id === match2.params.id)
    : null
  

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
      <Notification message={notification} />
      <Menu />
      {user === null ?
        loginForm() :
        <span>
           <span > </span>{user.name} logged in<button type="logout" onClick={() => {window.localStorage.clear()}}>logout</button>
        </span>
      }
      <Switch>
        <Route path="/users/:id">
          <User user={singleUser}/>
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog blog={singleBlog} addLike={addLike}/>
        </Route>
        <Route path="/users">
          <Users users={users}/>
      </Route>
      <Route path="/">
      <h1>Blogs</h1>
      {user === null ?
        loginForm() :
        <div>
          <BlogForm createBlog={addBlogToDb} />

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} remove={removeBlog} username={user.username}/>
          )}
        </div>
      }
        </Route>
      </Switch>
    </div>
  )
}

export default App