import React from 'react';
import { Country } from '../../entities/Country'
import './styles.css'

export default function MainPage({ countriesInGame }: any) {

  return countriesInGame.map((country: Country) => <div className="country" key={country.name}>
    <img src={country.flag} alt={country.name} />
    <p>{country.name}</p>
  </div>)
}