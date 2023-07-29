import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/person'
import PersonForm from './components/person_form'
import nameService from './services/persons'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [personsFiltered, filterPersons] = useState(persons)
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const checkname = persons => persons.name === newName;

  const PromptUser = (nameObject) => {
    if (window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )) {
      const matching_record = persons.filter(x => x.name === newName)
      const matching_record_id = matching_record[0].id
      nameObject['id'] = matching_record_id

      nameService
        .update(matching_record_id, nameObject)

      nameService
        .getAll()
        .then(response => {
          setPersons(response.data)
          filterPersons(response.data.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))

          setNewName('')
          setNewNumber('')
        }
        )
    }
  }



  useEffect(() => {
    nameService
      .getAll()
      .then(response => {
        setPersons(response.data)
        filterPersons(response.data)
      })

  }, [])

  // addName Form
  const addToPhoneBook = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    // Check if name exists before adding
    if (persons.some(checkname) === true) {
      PromptUser(nameObject)
    }

    // else update phone book
    else {
      nameService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          filterPersons(persons.concat(response.data).filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
          setNewName('')
          setNewNumber('')
        })
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

  const handleDelete = (event) => {

    { alert(`Delete ${event.name} ?`) }
    nameService
      .deleteRecord(event.id)

    nameService
      .getAll()
      .then(response => {
        setPersons(response.data)
        filterPersons(response.data.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())))
      })
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm addToPhoneBook={addToPhoneBook} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} handleDelete={handleDelete} />
    </div>
  )
}

export default App

// 2.6 complete 7/18 
// 2.7 complete 7/18 
// 2.8 complete 7/18
// 2.9 complete 7/19
// 2.10 complete 7/19 but requires minor cleanup
// 2.11 complete 7/28
// 2.12 complete 7/28
// 2.13 complete 7/28
// 2.14 complete 7/29
// 2.15 complete 7/29