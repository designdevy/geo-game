import React from 'react';
import { Country } from '../../entities/Country'
import './styles.css'

export default function MainPage({ countriesInGame, task, answer, handleSubmit, handleChange }: any) {
  if (task) {
    return (
      <div className="flexbox">
        <div>
          <h2>Countries already used:</h2>
          {countriesInGame.map((country: Country) => <div className="country-list" key={country.name}>
            <p>{country.name}</p>
          </div>)}
        </div>
        <div className="country" key={task.name}>
          <img src={task.flag} alt={task.name} />
          <p>{task.name}</p>
        </div>
        <div className="form-title">Add your country</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input-form"
            type="text"
            name="answer"
            placeholder="country"
            value={answer}
            onChange={handleChange}
          />
          <input className="input-button" type="submit" value="Submit" />
        </form>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }

}