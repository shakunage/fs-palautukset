import React, { useState } from 'react'
import PropTypes from 'prop-types'


const ShowDeleteButton = ({blog, remove, username}) => {
  if (blog.user.username === username) {
      return (
        <div>
          <button id="delete-button" onClick={() => remove(blog)}>remove</button>
        </div>
      )
    } else return (
      null
    )
}

const Blog = ({ blog, addLike, remove, username }) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
  <div>
  <div style={hideWhenVisible}>
    <li className='blog'>
      {blog.title} by {blog.author} <button id='view-button' onClick={() => toggleVisibility()}>view</button>
    </li>
  </div>
  <div style={showWhenVisible} className="togglableContent">
    {blog.title} <button onClick={() => toggleVisibility()}>hide</button>
    <p></p>
    {blog.author}
    <p></p>
    {blog.url}
    <p></p>
    {blog.likes} <button id='like-button' onClick={() => addLike(blog)}>like</button>
    <p></p>
    {blog.user.name}
    <p></p>
   <ShowDeleteButton blog={blog} remove={remove} username={username}/>
</div>
</div>
  )
}

Blog.propTypes = {
  remove: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog