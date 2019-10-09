import { ADD_COUNTRY_IN_GAME } from '../actions/countriesInGameActions'
import { CountriesActionType } from '../actions/actionTypes'
import { Reducer } from 'redux';

export const countriesInGame: Reducer<any> = (state = [], { type, countries }: CountriesActionType) => {
  switch (type) {
    case ADD_COUNTRY_IN_GAME:
      return countries;
    default:
      return state;
  }
};