import { combineReducers } from 'redux';
import { countries } from './countries';
import { countriesInGame } from './countriesInGame'

export default combineReducers({ countries, countriesInGame });