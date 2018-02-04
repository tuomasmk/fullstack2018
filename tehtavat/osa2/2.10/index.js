import React from 'react';
import ReactDOM from 'react-dom'    
import Luettelo from './luettelo'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: 'uusi nimi...',
      newNumber: '12345',
      filter: ''
    }
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }
  
  lisaaNimi = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    if (!(this.state.persons.map((person) => person.name).includes(this.state.newName))) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const persons = this.state.persons.concat(personObject)

      this.setState({ persons: persons })
    }
  }

  render() {
    const personsToShow = 
      this.state.filter == '' ?
        this.state.persons :
        this.state.persons.filter((person) => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          rajaa näytettäviä: <input
          value={this.state.filter}
          onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.lisaaNimi}>
          <div>
            nimi: <input 
            value={this.state.newName} 
            onChange={this.handleNameChange} />
          </div>
          <div>
            puh.nro.: <input
            value={this.state.newNumber}
            onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Luettelo persons={personsToShow} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App