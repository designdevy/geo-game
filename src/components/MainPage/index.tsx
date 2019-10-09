import React from 'react';
import request from 'superagent';
import { connect } from "react-redux";
import { setCountries } from '../../actions/countriesActions'
import { addCountryInGame } from '../../actions/countriesInGameActions'
import { StoreStructure } from '../../entities/StoreStructure'
import store from '../../store'
import MainPage from './view'

type ReduxType = ReturnType<typeof mapStateToProps>

class MainPageContainer extends React.Component<ReduxType> {
  state = {
    answer: ""
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
    const answerCountry = this.props.countries.find(country => country.name === this.state.answer)
    if (answerCountry) {
      store.dispatch(addCountryInGame(answerCountry));
    this.setState({
      answer: ""
    });
    }
  };

  render() {
    if (this.props.countriesInGame.length < 1 && this.props.countries.length > 1) {
      const randomIndex = Math.floor(Math.random() * this.props.countries.length)
      const randomCountry = this.props.countries.slice(randomIndex, randomIndex + 1)[0]
      store.dispatch(addCountryInGame(randomCountry))
    }

    const task = this.props.countriesInGame[this.props.countriesInGame.length-1]

    return <MainPage
      countriesInGame={this.props.countriesInGame}
      task={task}
      answer={this.state.answer}
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