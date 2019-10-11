import React from 'react';
import request from 'superagent';
import { connect } from "react-redux";
import { setCountries } from '../../actions/countriesActions'
import { addCountryInGame } from '../../actions/countriesInGameActions'
import { StoreStructure } from '../../entities/StoreStructure'
import { Country } from '../../entities/Country'
import store from '../../store'
import MainPage from './view'

type ReduxType = ReturnType<typeof mapStateToProps>

class MainPageContainer extends React.Component<ReduxType> {
  state = {
    answer: "",
    error: "",
    hint: "",
    youWin: false,
    computerWin: false
  }

  componentDidMount() {
    request
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;area;flag')
      .then(response => {
        store.dispatch(setCountries(response.body))
      })
      .catch(console.error);
  }

  getLastLetter = () => {
    let lastLetter: string = "A"

    if (this.props.countriesInGame.length > 0) {
      const lastCountry: string[] = this.props.countriesInGame[this.props.countriesInGame.length - 1].name.split("")
      if (lastCountry[lastCountry.length - 1].match(/[a-z]/)) {
        lastLetter = lastCountry[lastCountry.length - 1].toUpperCase()
      } else if (lastCountry[lastCountry.length - 1].match(/[)]/)) {
        const shortName = this.props.countriesInGame[this.props.countriesInGame.length - 1].name.split("(")[0].trim().split("")
        lastLetter = shortName[shortName.length - 1].toUpperCase()
      }
    }

    return lastLetter;
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const lastLetter: string = this.getLastLetter()

    if (this.state.answer[0] === lastLetter) {
      let answerCountry = this.props.countries.find(country => country.name === this.state.answer)

      if (!answerCountry) {
        answerCountry = this.props.countries.find(country => country.name.slice(0, 6) === this.state.answer.slice(0, 6))
      }

      if (!answerCountry) {
        answerCountry = this.props.countries.find(country => country.name.slice(0, 6) === this.state.answer.slice(0, 6))
      }

      //Checking the users answer
      if (answerCountry && !this.props.countriesInGame.includes(answerCountry)) {
        store.dispatch(addCountryInGame(answerCountry));
        this.setState({
          answer: "",
          error: "",
          hint: ""
        });

        //Adding computers answer
        const usedCountries = this.props.countriesInGame.map(country => country.name);
        let newLastLetter: string

        //Getting new last letter
        if (answerCountry.name[answerCountry.name.length - 1].match(/[a-z]/)) {
          newLastLetter = answerCountry.name[answerCountry.name.length - 1].toUpperCase()
        } else if (answerCountry.name[answerCountry.name.length - 1].match(/[)]/)) {
          const shortName = this.props.countriesInGame[this.props.countriesInGame.length - 1].name.split("(")[0].trim().split("")
          newLastLetter = shortName[shortName.length - 1].toUpperCase()
        }

        //Getting an array of possible right answers and random answer from it
        const possibleComputerAnswers: Country[] = this.props.countries.filter(country => country.name[0] === newLastLetter && !usedCountries.includes(country.name))
        const index2: number = this.randomIndex(possibleComputerAnswers)
        const computerAnswer: Country | undefined = possibleComputerAnswers[index2]
        if (computerAnswer) {
          store.dispatch(addCountryInGame(computerAnswer))
        } else {
          this.setState({
            youWin: true
          })
        }
      } else if (answerCountry && this.props.countriesInGame.includes(answerCountry)) {
        this.setState({
          error: "This country was already used!"
        });
      } else {
        this.setState({
          error: "Are you sure? Computer don't know this country."
        });
      }
    } else {
      this.setState({
        error: `Add a contry that starts from ${lastLetter}`
      });
    }
  };

  getHint = (e: any) => {
    e.preventDefault();
    const lastLetter: string = this.getLastLetter()
    const usedCountries = this.props.countriesInGame.map(country => country.name);
    const hint: Country | undefined = this.props.countries.find(country => country.name[0] === lastLetter && !usedCountries.includes(country.name))
    if (hint) {
      this.setState({
        hint: `Begins with: ${hint.name.slice(0, 3)}...`
      })
    }
  }

  gameOver = (e: any) => {
    e.preventDefault();
    this.setState({
      computerWin: true
    })
  }

  randomIndex = (array: Country[]) => {
    const randomIndex: number = Math.floor(Math.random() * array.length)
    return randomIndex
  }

  render() {
    const lastLetter = this.getLastLetter()

    //adding first task name to the game
    if (this.props.countriesInGame.length < 1 && this.props.countries.length > 1) {
      const index: number = this.randomIndex(this.props.countries)
      const randomCountry: Country = this.props.countries.slice(index, index + 1)[0]
      store.dispatch(addCountryInGame(randomCountry))
    }

    const task: Country = this.props.countriesInGame[this.props.countriesInGame.length - 1]

    return <MainPage
      countriesInGame={this.props.countriesInGame}
      task={task}
      answer={this.state.answer}
      lastLetter={lastLetter}
      error={this.state.error}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      getHint={this.getHint}
      hint={this.state.hint}
      gameOver={this.gameOver}
    />
  }
}

const mapStateToProps = (state: StoreStructure) => ({
  countries: state.countries,
  countriesInGame: state.countriesInGame
});

export default connect(
  mapStateToProps
)(MainPageContainer);