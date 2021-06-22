import React from 'react'
import { connect } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      props.addNew(content)
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      addNew: (value) => {
        dispatch(addNew(value))
      },
    }
  }
  
  export default connect(null, mapDispatchToProps)(AnecdoteForm)