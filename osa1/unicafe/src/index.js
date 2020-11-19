import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => {
  const handleLeftClick = (rating, setter) => {
    setter(rating + 1)
  }
  return (
    <button onClick={() => handleLeftClick(props.value, props.setter)}>{props.label}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
      <br></br>
    </div>
  )
}

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if (good+neutral+bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text={"good"} value={good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text={"neutral"} value={neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text={"bad"} value={bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text={"average"} value={((good-bad)/(good+bad+neutral)).toFixed(2)} /></td>
        </tr>
        <tr>
          <td><StatisticLine text={"positive"} value={((good)/(good+bad+neutral)*100).toFixed(2)+"%"} /></td>
        </tr>
      </tbody>
    </table>
   
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

return (
  <div>
    <Header header={'give feedback'}/>
    
    <Button value={good} setter={setGood} label={"good"}/>
    <Button value={bad} setter={setBad} label={"bad"}/>
    <Button value={neutral} setter={setNeutral} label={"neutral"}/>


    <Header header={'statistics'}/>
    
    <Statistics good={good} neutral={neutral} bad={bad}/>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
