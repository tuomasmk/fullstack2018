import React from 'react'
import ReactDOM from 'react-dom'


const Vote = (props) => {
    return (
        <div>Has {props.states.pisteet[props.states.selected]} vote(s)</div>
    )
}

const MostVotes = (props) => {
    let eniten = 0
    let indeksi = 0
    let i
    for (i = 0; i < 6; i++) {
        if (props.states.pisteet[i] > eniten) {
            eniten = props.states.pisteet[i];
            indeksi = i;
        }
    }
    return (
        <div>
            <div>{props.anecdotes[indeksi]}</div>
            <div>has {eniten} votes</div>
        </div>
    )
}


class App extends React.Component {
constructor(props) {
super(props)
this.state = {
    selected: 0,
    pisteet: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }
}
}

vote = () => {
    return () => {
        const temp = this.state.selected
        const pisteet = {...this.state.pisteet}
        pisteet[temp] = pisteet[temp] + 1
        this.setState({ pisteet })
    }
}

showRandom = () => {
    return () => {
        const temp = Math.floor(Math.random() * 6)
        this.setState({ selected: temp })
    }
}

render() {
return (
    <div>
        {this.props.anecdotes[this.state.selected]}
        <Vote states={this.state} />
        <div>
            <button onClick={this.vote()}>Vote</button>
            <button onClick={this.showRandom()}>Random anecdote</button>
        </div>
        <h2>Anecdote with most votes:</h2>
        <MostVotes states={this.state} anecdotes={this.props.anecdotes} />
    </div>
)
}
}

const anecdotes = [
'If it hurts, do it more often',
'Adding manpower to a late software project makes it later!',
'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
'Premature optimization is the root of all evil.',
'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
<App anecdotes={anecdotes} />,
document.getElementById('root')
)
