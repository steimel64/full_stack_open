
import React from 'react'

const Button = ({handleClick, text, person}) => {
    return (
      <button onClick={() => handleClick(person)}>
      {text}
      </button>
    );
    }

// render names on UI
const Persons = ({ personsFiltered, handleDelete}) => {
    return (
        <div>
            {personsFiltered.map(person => <div key={person.id}> {person.name} {person.number} <Button handleClick={handleDelete} text = "delete" person={person} /></div>
            )}
        </div>
    )
}


export default Persons