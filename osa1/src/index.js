import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return <h1>{props.kurssi.nimi}</h1>
}    

const Osa = ({kurssi}) => {
    return (
      kurssi.osat.map(osa =>
      <li key={osa.id}>
        {osa.nimi} {osa.tehtavia}
      </li>
    )
  )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osat[0].nimi} tehtavia={props.osat[0].tehtavia}/>
            <Osa osa={props.osat[1].nimi} tehtavia={props.osat[1].tehtavia}/>
            <Osa osa={props.osat[2].nimi} tehtavia={props.osat[2].tehtavia}/>
        </div>
    )
}

const Yhteensa = (props) => {
    return <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
}

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Osa kurssi={kurssi} />
    </div>
  )
}
    
    
const App = () => {
    const kurssi = {
      nimi: 'Half Stack -sovelluskehitys',
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
          <Kurssi kurssi={kurssi} />
      </div>
    )
  }
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
