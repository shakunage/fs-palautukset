import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const VoteButton = (props) => {
  
  const handleLeftClick = () => {
    props.array[props.anecdote] += 1
    console.log("vote added " + props.anecdote + " has " + props.array[props.anecdote] + "votes")
  }

  return (
    <button onClick={() => handleLeftClick()}>vote</button>
  )
}

const NextButton = (props) => {  
  const handleLeftClick = () => {
    props.function(Math.floor(Math.random() * 6))
  }

  return (
    <button onClick={() => handleLeftClick()}>next anecdote</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  let i = ary.indexOf(Math.max(...ary))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      has {ary[selected]} votes
      <br></br>
      <NextButton function={setSelected}/>
      <VoteButton anecdote={selected} array={ary}/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[i]}
      <br></br>
      has {ary[i]} votes
    </div>
  )
}

var ary = new Uint8Array(6)


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)