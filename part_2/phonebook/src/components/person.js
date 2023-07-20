
import React from 'react'
// render names on UI
const Persons = ({ personsFiltered }) => {
    return (
        <div>
            {personsFiltered.map(person => <div key={person.id}> {person.name} {person.number} </div>
            )}
        </div>
    )
}


export default Persons