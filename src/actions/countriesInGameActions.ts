import { CountriesActionType } from './actionTypes'
import { Country } from '../entities/Country'

export const ADD_COUNTRY_IN_GAME = 'ADD_COUNTRY_IN_GAME'

export const addCountryInGame = (data: Country[]): CountriesActionType => {
  return ({
    type: ADD_COUNTRY_IN_GAME,
    countries: data
  })   
}