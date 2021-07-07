import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
        return action.data
    default:
      return state
  }
}

export const logIn = (username, password) => {
    return async dispatch => {
        try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
        dispatch(setNotification(`invalid credentials`, 3))
    }
    } 
  }

  export const restoreLogin = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }

export default userReducer