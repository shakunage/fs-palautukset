import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      console.log(action)
      const id = action.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      )
    case 'ADDNEW':
      return state.concat(action.content)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const newObject = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes +1
    }
    await anecdoteService.update(newObject)
    await dispatch({
      type: 'VOTE',
      id: anecdote.id 
    })
    dispatch(setNotification(`you voted for ${anecdote.content}`, 3))
  }
}

export const addNew = (anecdote) => {
  return async dispatch => {
    const content = asObject(anecdote)
    await anecdoteService.createNew(content)
    console.log('the new anecdote is: ' + content)
    await dispatch({
      type: 'ADDNEW',
      content: content
    })
    dispatch(setNotification(`you created a new anecdote ${anecdote}`, 3))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer