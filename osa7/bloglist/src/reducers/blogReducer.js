import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
        return state.map(blog =>
            blog.id !== action.data.id ? blog : action.data.newObject 
          )
    case 'REMOVE_BLOG':
        console.log('action.data for remove is:' + action.data)
        return state.filter(({ id }) => id !== action.data)
    default:
      return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
    dispatch(setNotification(`a new blog ${content.title} by ${content.author} added!`, 3))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (id, newObject) => {
    return async dispatch => {
      await blogService.update(id, newObject)
      dispatch({
        type: 'LIKE',
        data: {id, newObject}
      })
      dispatch(setNotification(`blog ${newObject.title} was liked!`, 3))
    }
  }

export const deleteBlog = (id, blogObject) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: {id}
        })
        dispatch(setNotification(`blog ${blogObject.title} was removed!`, 3))
    }
}

export default blogReducer