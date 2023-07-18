import { useState } from 'react'

const App = () => {
  // persons in phonebook app 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1}
  ]) 
  // set new names 
  const [newName, setNewName] = useState('')
  // check if name exists
  const checkname = persons => persons.name === newName;
  console.log({checkname})

  // addName Form
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }

    // Check if name exists 
    if (persons.some(checkname) === true)
    // alert 
    {alert(`${newName} is already added to phonebook`)}
    // else update phone book
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  // name change listener
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // render names 
  const Names = (person) => {
    return (
        <div>{person.name}</div>
    )
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person=> 
          <Names key={person.id} name={person.name} />
        )}
    </div>
  )
}

export default App

// 2.6 complete 7/18 
// 2.7 complete 7/18 
// 2.8
// 2.9 