import { useState }  from 'react'
import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')
    const [createNewVisible, setCreateNewVisible] = useState(false)
    const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
    const showWhenVisible = { display: createNewVisible ? '' : 'none' }

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }
    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl,
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      }

    return (
    <div>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button id="create-button" onClick={() => setCreateNewVisible(true)}>create</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          title: <input
            value={newBlogTitle}
            onChange={handleBlogTitleChange}
            id="title"
          />
          <p></p>
          author: <input
            value={newBlogAuthor}
            onChange={handleBlogAuthorChange}
            id="author"
          />
          <p></p>
          url: <input
            value={newBlogUrl}
            onChange={handleBlogUrlChange}
            id="url"
          />
          <button type="submit" id="save-button" onClick={() => setCreateNewVisible(false)}>save</button>
          <button onClick={() => setCreateNewVisible(false)}>cancel</button>
        </form>
        </div>
    </div>
    )
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  export default BlogForm
