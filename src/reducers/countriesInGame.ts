import { ADD_COUNTRY_IN_GAME, DELETE_ALL_COUNTRIES_IN_GAME } from '../actions/countriesInGameActions'
import { CountryActionType } from '../actions/actionTypes'
import { Reducer } from 'redux';

export const countriesInGame: Reducer<any, CountryActionType> = (state = [], { type, country }: CountryActionType) => {
  switch (type) {
    case ADD_COUNTRY_IN_GAME:
      return [...state, country];
    case DELETE_ALL_COUNTRIES_IN_GAME:
      return []
    default:
      return state;
  }
};