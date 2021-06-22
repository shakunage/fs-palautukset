import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        console.log(filter)
        if ( filter === 'ALL' ) {
          return anecdotes
        }
        else 
            console.log(anecdotes)
            return anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().indexOf(filter) > -1)
      })

    const dispatch = useDispatch()

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted for ${anecdote.content}`, 3))
      }

    return (
      <div>
        <h2>Anecdotes</h2>
      {anecdotes.sort(function (a, b) {
        return b.votes - a.votes;
        }).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }
  
  export default AnecdoteList