import React from 'react'

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

const Yhteensa = ({osat}) => {
  let sum = osat.map(osa => osa.tehtavia).reduce((summa, tehtavia) =>
    summa + tehtavia)
  console.log(sum)
    return (
      <div>yhteensä {sum} tehtävää</div>
    )
}

const Kurssi = ({kurssit}) => {
  return (
    kurssit.map((kurssi) =>
    <div>
      <Otsikko kurssi={kurssi} />
      <Osa kurssi={kurssi} />
      <Yhteensa osat={kurssi.osat} />
    </div>
    )
  )
}

export default Kurssi