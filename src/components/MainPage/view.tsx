import React from 'react';
import { Country } from '../../entities/Country'
import './styles.css'

export default function MainPage({ countriesInGame, task, answer, error, lastLetter, handleSubmit, handleChange }: any) {
  if (task) {
    return (
      <div className="flexbox">
        <div className="form">
          <h2 className="form-title">Countries already used:</h2>
          {countriesInGame.map((country: Country) => {
            return (
              <div className="country-list" key={country.name}>
                <img className="small-flag" src={country.flag} alt={country.name} />
                <span className="list-country">{country.name}</span>
              </div>
            )
          }
          )}
        </div>
        <div className="country" >
          <div className="form-title">Computer answers</div>
          <div className="task">
            <img src={task.flag} alt={task.name} />
            <p className="task-name">{task.name}</p>
          </div>
          <div className="form-title">Your answer</div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-form"
              type="text"
              name="answer"
              placeholder={`Country starting from ${lastLetter}`}
              value={answer}
              onChange={handleChange}
            />
            <p className="error">{error}</p>
            <input className="input-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }

}