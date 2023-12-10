import { useState, useEffect } from 'react'
import personService from './personService'

const Notification = ( {message} ) => {
  if ( message === null ) {
    return null
  }
  const notifyStyle = {
    color: 'green',
    padding: '3px',
    background: 'lightgray',
    border: '2px solid',
    borderRadius: '6px'
  }
  return ( 
    <div style={notifyStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ( {message} ) => {
  if ( message === null ) {
    return null
  }
  const notifyStyle = {
    color: 'red',
    padding: '3px',
    background: 'lightgray',
    border: '2px solid',
    //borderRadius: '6px'
  }
  return ( 
    <div style={notifyStyle}>
      {message}
    </div>
  )
}

const Persons = (  {filter, persons, deleteHandler} ) => {
  return <div>{persons.filter((p) => p.name.toLowerCase().includes(filter .toLowerCase()) ).map( (p) => <Person key={p.name} person={p} deleteHandler={deleteHandler}/>) } </div>
}

const Person = ( {person, deleteHandler}) => {
  return (
  <div>
    {person.name} {person.number}
    <button onClick={() => { deleteHandler(person)}}>delete</button>
    </div>
  )
}

const Filter = ({handler, filter}) => {
  return <div>filter shown with: <input value={filter} onChange={handler} /></div>
}

const Add = (props) => {
  return (<form onSubmit={props.formHandler}>
  <div>
    name: <input value={props.newName} onChange={props.nameChangeHandler} />
    number: <input value={props.newNumber} onChange={props.numberChangeHandler} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWith, setFilterWith] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect( () => {
    personService.getAll()
    .then((response) => {
      setPersons(response)
    })
    //console.log(persons)
  }, [])
  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }
  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const filterChangeHandler = (event) => {
    setFilterWith(event.target.value)
  }
  const formHandler = (event) => {
    event.preventDefault()
    if ( persons.find((p) => p.name === newName) != undefined ) {
      if ( window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
        const person = persons.find((p) => (p.name === newName))
        const newPerson = {...person, number : newNumber}
        console.log(person)
        personService.update(person.id, newPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNotifyMessage(`Updated number for ${person.name}`)
          setTimeout( () => {setNotifyMessage(null)}, 5000)
        }).catch((error) => {
          setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
          setTimeout(() => setErrorMessage(null), 5000)
          personService.getAll().then(response => setPersons(response))
        })
      }
    } 
    else {
      personService.create({name: newName, number: newNumber})
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotifyMessage(`Added number for ${response.name}`)
        setTimeout( () => {setNotifyMessage(null)}, 5000)
      })
    }
  }
  const deleteHandler = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(person.id)
      .then( () => personService.getAll().then(response => {
        setPersons(response)
        setNotifyMessage(`Deleted number for ${person.name}`)
        setTimeout( () => {setNotifyMessage(null)}, 5000)
      }))
      }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter handler={filterChangeHandler} filter={filterWith} />
      <h2>add a new</h2>
      <Add newName={newName} newNumber={newNumber} formHandler={formHandler} numberChangeHandler={numberChangeHandler} nameChangeHandler={nameChangeHandler} />
      <h2>Numbers</h2>
      <Persons filter={filterWith} persons={persons} deleteHandler={deleteHandler}/>
    </div>
  )

}

export default App