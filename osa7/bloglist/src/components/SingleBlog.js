import React, { useState, useEffect } from 'react'
import usersService from '../services/users'


const SingleBlog = ({blog, addLike}) => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        (async () => {
          const userlist = await usersService.getUsers()
          setUsers(userlist)
       })()
      }, [])


    if (!blog || !users) {
      return null
  }

  console.log('comments are : ' +blog.comments)
  const user = users
  ? users.find(a => a.id === blog.user)
  : null


  return (
    <div>
      <h1>{blog.title} <span> </span> {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        {blog.likes} likes <button onClick={() => addLike(blog)}>like</button>
        <br></br>
        added by {user.name}
        <h2>comments</h2>
        {blog.comments.map(comment =>
            <li key={comment.id}>
                {comment.comment}
            </li>
          )}
    </div>
  )
}

export default SingleBlog