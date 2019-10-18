import { CountryActionType } from './actionTypes'
import { Country } from '../entities/Country'

export const ADD_COUNTRY_IN_GAME = 'ADD_COUNTRY_IN_GAME'

export const addCountryInGame = (data: Country): CountryActionType => {
  return ({
    type: ADD_COUNTRY_IN_GAME,
    country: data
  })   
}

export const DELETE_ALL_COUNTRIES_IN_GAME = 'DELETE_ALL_COUNTRIES_IN_GAME'

export const deleteCountriesInGame = (): CountryActionType => {
  return ({
    type: DELETE_ALL_COUNTRIES_IN_GAME,
    country: 0
  })
}