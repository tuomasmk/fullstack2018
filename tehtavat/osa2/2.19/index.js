import React from 'react';
import ReactDOM from 'react-dom'    
import Luettelo from './luettelo'
import personService from './services/persons'
import './index.css'

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
/*        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }*/
      ],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      success: null

    }
    console.log('constructor')
  }

  componentWillMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(persons => {
        console.log('prmise fulfilled')
        this.setState({ persons: persons })
      })
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

  lisaaPainettu = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    let result = this.state.persons.map((person) => person.name).includes(this.state.newName)
    if (!result) {
      this.lisaaNimi()
    } else { 
      result = window.confirm("Korvataanko olemassa oleva numero?")
      if (result) {
        this.paivitaNumero()
      }
    }
  }

  lisaaNimi = () => {
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService
      .create(personObject)
      .then(persons => {
        this.setState({ 
          persons: this.state.persons.concat(persons),
          newName: '',
          newNumber: '', 
          success: `Numero henkilölle '${personObject.name}' lisätty`
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 5000)
      })
  }
    
  paivitaNumero = () => {      
    const person = this.state.persons.find(p => p.name === this.state.newName)
    const id = person.id
    const changedPerson = { ...person, number: this.state.newNumber}

    personService
      .update(id, changedPerson)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(
            person => person.id !== id ?person : changedPerson),
            success: 'numero vaihdettu'
          })
          setTimeout(() => {
            this.setState({success: null})
          }, 5000)
      })
      .catch(error => {
        this.lisaaNimi()
      })
    }

  deleteNote = (id) => {
    console.log('delete person with id: ', id)
    return () =>
      personService
        .Delete(id)
        .then(persons => {
          console.log('persons', persons)
          this.setState({ 
            persons: this.state.persons.filter((person) => person.id !== id) 
          })
        })
  }

  render() {
    console.log('render')
    const personsToShow = 
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter((person) => person.name.toUpperCase().includes(this.state.filter.toUpperCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Error message={this.state.error} />
        <Notification message={this.state.success} />
        <div>
          rajaa näytettäviä: <input
          value={this.state. filter}
          onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.lisaaPainettu}>
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
        <Luettelo persons={personsToShow} deleteNote={this.deleteNote} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App