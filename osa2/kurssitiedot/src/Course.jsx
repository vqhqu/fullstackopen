const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total course={course}/>
      </>
    )
  }

  const Header = ({name}) => {
    return (
      <div>
      <h2>{name}</h2>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => {
        return <Part key={part.id} part={part} /> })
        }
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce( (exercise_sum, part) => exercise_sum + part.exercises, 0)
    return (
      <div>
      <p><strong>total of {total} exercises</strong></p>
      </div>
    )
  }

  export default Course