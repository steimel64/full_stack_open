import { useState } from 'react'
import Filter from './components/filter'
import Persons from './components/person'
import PersonForm from './components/person_form'


const App = () => {
  // States
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [personsFiltered, filterPersons] = useState(persons)
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const checkname = persons => persons.name === newName;

  // addName Form
  const addToPhoneBook = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    // Check if name exists before adding
    if (persons.some(checkname) === true)
    // alert 
    { alert(`${newName} is already added to phonebook`) }
    // else update phone book
    else {
      const persons_updated = persons.concat(nameObject)
      setPersons(persons_updated)
      filterPersons(persons_updated.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
      setNewName('')
      setNewNumber('')
    }
  }

  // name change event handler
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // number change event handler
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // number change event handler
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    if (newFilter !== '') {
      filterPersons(persons.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm addToPhoneBook={addToPhoneBook} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} />
    </div>
  )
}

export default App

// 2.6 complete 7/18 
// 2.7 complete 7/18 
// 2.8 complete 7/18
// 2.9 complete 7/19
// 2.10 complete 7/19 but requires minor cleanup