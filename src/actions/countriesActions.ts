import { CountriesActionType } from './actionTypes'
import { Country } from '../entities/Country'

export const SET_COUNTRIES = 'SET_COUNTRIES'

export const setCountries = (data: Country[]): CountriesActionType => {
  return ({
    type: SET_COUNTRIES,
    countries: data
  })   
}