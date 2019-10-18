import React from 'react';
import { Country } from '../../entities/Country'
import './styles.css'

export default function MainPage({ 
  countriesInGame, 
  task, 
  answer, 
  error, 
  lastLetter, 
  handleSubmit, 
  handleChange, 
  getHint, 
  hint,
  gameOver 
}: any) {
  if (task) {
    return (
      <div className="flexbox">
        <div className="form">
          <h2 className="form-title">Rules of the game</h2>
          <ul>
            <li className="rules">You and computer in turn guess the name of the country, that begins from the last letter of the previous country name.</li>
            <li className="rules">You cannot use one name twice.</li>
            <li className="rules">You can use a Hint and see 3 first letters of the possible answer.</li>
            <li className="rules">Game ends when you or computer cannot find any country on the given letter.</li>
          </ul>
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
            <p className="hint">{hint}</p>
            <input className="input-button" type="submit" value="Submit" />
            <button className="input-button" onClick={getHint}>Hint</button>
            <button className="input-button" onClick={gameOver}>Quit</button>
          </form>
        </div>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }

}