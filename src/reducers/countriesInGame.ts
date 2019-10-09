import { ADD_COUNTRY_IN_GAME } from '../actions/countriesInGameActions'
import { CountryActionType } from '../actions/actionTypes'
import { Reducer } from 'redux';

export const countriesInGame: Reducer<any, CountryActionType> = (state = [], { type, country }: CountryActionType) => {
  switch (type) {
    case ADD_COUNTRY_IN_GAME:
      return [...state, country];
    default:
      return state;
  }
};