import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => <h2>{props.caption}</h2>

const Nappi = (props) => {
    return (
        <button onClick={props.onClick}>{props.caption}</button>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }
    
    neutraaliPainettu = () => this.setState({neutraali: this.state.neutraali + 1})
    huonoPainettu = () => this.setState({huono: this.state.huono + 1})

    render () {
        const setToValue = () => () => {
            console.log('Hyvä painettu')
            this.setState({ hyva: this.state.hyva + 1})
        }

        return (
            <div>
                <Otsikko caption="Anna palautetta"/>
                <Nappi onClick={setToValue()} caption="Hyvä"/>
                <Nappi onClick={this.neutraaliPainettu} caption="Neutraali"/>
                <Nappi onClick={this.huonoPainettu} caption="Huono"/>
                <Otsikko caption="Statistiikka"/>
                <div>Hyvä: {this.state.hyva}</div>
                <div>Neutraali: {this.state.neutraali}</div>
                <div>Huono: {this.state.huono}</div>
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
