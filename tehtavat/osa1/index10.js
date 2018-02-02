import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => <h2>{props.caption}</h2>

const Nappi = (props) => {
    return (
        <button onClick={props.onClick}>{props.caption}</button>
    )
}

const Statistics = (props) => {
    const average = (a, b, c) => {
        return (
            (a - c) / (a + b + c)
        )
    }
    const positives = (a, b, c) => {
        return (
            a / (a + b + c) * 100
        )
    }
    if (props.states.hyva === 0 && props.states.neutraali === 0 && props.states.huono === 0) {
        return (
            <div>
                <Otsikko caption="Statistiikka" />
                <div>Yhtään palautetta ei ole annettu</div>
            </div>
        )
    }
    return (
        <div>
            <Otsikko caption="Statistiikka" />
            <Statistic text="Hyviä: " value={props.states.hyva} />
            <Statistic text="Neutraaleja: " value={props.states.neutraali} />
            <Statistic text="Huonoja: " value={props.states.huono} />
            <Statistic text="Keskiarvo: " value={average(props.states.hyva, 
                props.states.neutraali, props.states.huono).toPrecision(1)} unit="" />
            <Statistic text="Positiivisia: " value={positives(props.states.hyva, 
                props.states.neutraali, props.states.huono).toPrecision(3)} unit="%" />
        </div>
    )
}

const Statistic = (props) => {
    return (
        <div>{props.text} {props.value} {props.unit}</div>        
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

    render () {
        const setToValue = (name, state) => () => {
            if (name === "hyva") {
                console.log("Hyvä painettu", state)
                this.setState({ hyva: (state + 1)})
            } else if (name === "neutraali") {
                this.setState({ neutraali: (state + 1)})
            } else {
                this.setState({ huono: (state + 1)})
            }
        }

        return (
            <div>
                <Otsikko caption="Anna palautetta"/>
                <Nappi onClick={setToValue("hyva", this.state.hyva)} caption="Hyvä"/>
                <Nappi onClick={setToValue("neutraali", this.state.neutraali)} caption="Neutraali"/>
                <Nappi onClick={setToValue("huono", this.state.huono)} caption="Huono"/>
                <Statistics states={this.state}/>
            </div>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));
