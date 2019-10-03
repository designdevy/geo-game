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
    return <MainPage countries={this.props.countries}/>
  }
}

const mapStateToProps = (state: StoreStructure) => ({
  countries: state.countries
});

export default connect(
  mapStateToProps
)(MainPageContainer);