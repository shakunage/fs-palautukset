import React from 'react'

const Course = (props) => {
    const course = props.course
  
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Part = (props) => {
  
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  const Total = ({ course }) => {
  
    let sum = course.parts.map(part => part.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue
  
    return (
      <p><b>total of {sum.reduce(reducer)} exercises</b></p>
    ) 
  }

  export default Course
