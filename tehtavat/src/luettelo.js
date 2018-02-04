import React from 'react'

const Luettelo = ({persons, deleteNote}) => {
  return (
    <table>
      <tbody>
      {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={deleteNote(person.id)}>poista</button></td>
          </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Luettelo