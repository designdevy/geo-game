import { SET_COUNTRIES } from '../actions/countriesActions'
import { CountriesActionType } from '../actions/actionTypes'
import { Reducer } from 'redux';

export const countries: Reducer<any> =(state = [], { type, countries }: CountriesActionType) => {
  switch (type) {
    case SET_COUNTRIES:
      return countries;
    default:
      return state;
  }
};