import { useState } from 'react'

const Anecdote = ({anecdotes, points, selected}) => {
  return (
    <p>
  {anecdotes[selected]}
  <br/>has {points[selected]} points</p>
  )
}

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const MostPopularAnecdote = ({anecdotes, points}) => {
  let max_points = -1
  let anecdote = anecdotes[0]
  for ( let i = 0; i < anecdotes.length; i++) {
    if ( points[i] > max_points ) {
      anecdote = i
      max_points = points[i]
    }
  }
  return (
  <div>
    <h1>Anecdote with most votes</h1>
    <Anecdote anecdotes={anecdotes} points={points} selected={anecdote}/>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const points_ = anecdotes.map(anecdote => 0)
  const [points, setPoints] = useState(points_)
  const points_copy = [...points]

  const randomAnecdoteHandler = () => {
    let rand = Math.floor((Math.random() * 100))%anecdotes.length
    if ( rand == selected ) rand = (rand + 1) % anecdotes.length
    setSelected(rand)
  }

  const voteHandler = () =>  {
    points_copy[selected]++
    setPoints(points_copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected} />
      <Button handleClick={voteHandler} text="vote"/>
      <Button handleClick={randomAnecdoteHandler} text="random anecdote"/>
      <MostPopularAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App