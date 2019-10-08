import React from 'react';
import request from 'superagent';
import { connect } from "react-redux";
import { setCountries } from '../../actions/countriesActions'
import { StoreStructure } from '../../entities/StoreStructure'
import store from '../../store'
import MainPage from './view'

type ReduxType = ReturnType<typeof mapStateToProps>

class MainPageContainer extends React.Component<ReduxType> {
  componentDidMount() {
    request
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;area;flag')
      .then(response => {
        store.dispatch(setCountries(response.body))
      })
      .catch(console.error);
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.props.countries.length)
    const countriesSliced = this.props.countries.slice(randomIndex, randomIndex + 1)

    return <MainPage countriesSliced={countriesSliced} />
  }
}

const mapStateToProps = (state: StoreStructure) => ({
  countries: state.countries
});

export default connect(
  mapStateToProps
)(MainPageContainer);