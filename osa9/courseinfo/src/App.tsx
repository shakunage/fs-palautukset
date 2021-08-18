import React from 'react';
import { isPropertySignature } from 'typescript';

interface Header {
  name: string
}

interface Course {
  name: string,
  exerciseCount: number
}

interface Content {
  content: Course[]
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBase, CoursePartDesc {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, CoursePartDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase, CoursePartDesc {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <br></br> 
          <b>{part.name} {part.exerciseCount}</b>
          <br></br> 
          <i>{part.description}</i> 
        </div>
      )
    case "groupProject":
      return (
        <div>
          <br></br> 
          <b>{part.name} {part.exerciseCount}</b>
          <br></br> 
          project exercises {part.groupProjectCount} 
        </div>
      )
    case "submission":
      return (
        <div>
          <br></br> 
          <b>{part.name} {part.exerciseCount}</b>
          <br></br> 
          <i>{part.description}</i>
          <br></br> 
          submit to {part.exerciseSubmissionLink}
        </div>
      )
      case "special":
        return (
          <div>
            <br></br> 
            <b>{part.name} {part.exerciseCount}</b>
            <br></br> 
            <i>{part.description}</i>
            <br></br>
            required skills: {part.requirements.join(", ")} 
          </div>
        )
    default:
      return (null)
  }
}

const Header = (props: Header) => {
  return ( 
    <div>
      <h1>{props.name}</h1>
    </div>
    )
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return ( 
    <div>
      {courseParts.map(c => 
        <div key={c.name}>
          <Part part={c} />
        </div>
        )}
    </div>
    )
}

const Total = (props: Content) => {
  return ( 
    <div>
      <p>
        Number of exercises{" "}
        {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
    )
}

const App = () => {
  const courseName = "Half Stack application development";
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
  

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total content={courseParts}/>
    </div>
  );
};

export default App;
