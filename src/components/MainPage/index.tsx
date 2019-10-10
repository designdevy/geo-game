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
    error: ""
  }

  componentDidMount() {
    request
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;area;flag')
      .then(response => {
        store.dispatch(setCountries(response.body))
      })
      .catch(console.error);
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

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

    if (this.state.answer[0] === lastLetter) {
      let answerCountry = this.props.countries.find(country => country.name === this.state.answer)

    if (!answerCountry) {
      answerCountry = this.props.countries.find(country => country.name.slice(0, 6) === this.state.answer.slice(0, 6))
    }

    if(!answerCountry) {
      answerCountry = this.props.countries.find(country => country.name.slice(0, 6) === this.state.answer.slice(0, 6))
    }

    //Checking the users answer
    if (answerCountry && !this.props.countriesInGame.includes(answerCountry)) {
      store.dispatch(addCountryInGame(answerCountry));
      this.setState({
        answer: "",
        error: ""
      });
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

  render() {
    let lastLetter: string = "A"
    const usedCountries = this.props.countriesInGame.map(country => country.name);

    //Finding the last letter of previous answer
    if (this.props.countriesInGame.length > 0) {
      const lastCountry: string[] = this.props.countriesInGame[this.props.countriesInGame.length - 1].name.split("")
      if (lastCountry[lastCountry.length - 1].match(/[a-z]/)) {
        lastLetter = lastCountry[lastCountry.length - 1].toUpperCase()
      } else if (lastCountry[lastCountry.length - 1].match(/[)]/)) {
        const shortName = this.props.countriesInGame[this.props.countriesInGame.length - 1].name.split("(")[0].trim().split("")
        lastLetter = shortName[shortName.length - 1].toUpperCase()
      }
    }

    //adding to the list of used names
    if (this.props.countriesInGame.length < 1 && this.props.countries.length > 1) {
      const randomIndex: number = Math.floor(Math.random() * this.props.countries.length)
      const randomCountry: Country = this.props.countries.slice(randomIndex, randomIndex + 1)[0]
      store.dispatch(addCountryInGame(randomCountry))
    } else if (this.props.countriesInGame.length % 2 === 0) {
      const computerAnswer: Country | undefined = this.props.countries.find(country => country.name[0] === lastLetter && !usedCountries.includes(country.name))
      if (computerAnswer) {
        store.dispatch(addCountryInGame(computerAnswer))
      }
    }

    const task = this.props.countriesInGame[this.props.countriesInGame.length - 1]

    return <MainPage
      countriesInGame={this.props.countriesInGame}
      task={task}
      answer={this.state.answer}
      lastLetter={lastLetter}
      error={this.state.error}
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
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