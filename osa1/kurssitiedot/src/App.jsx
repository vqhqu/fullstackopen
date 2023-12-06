const Header = (props) => {
  return (
    <div>
    <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = (props) => {
  let total_exercises = 0
  props.course.parts.forEach(part => {total_exercises += part.exercises})
  return (
    <div>
    <p>Number of exercises {total_exercises}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}
export default App
