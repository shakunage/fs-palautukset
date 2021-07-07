import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'


const reducers = combineReducers({
    blogs: blogReducer, 
    notifications: notificationReducer,
    user: userReducer  })

const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
  
  export default store