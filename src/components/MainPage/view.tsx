import React from 'react';
import { Country } from '../../entities/Country'

export default function MainPage({ countries }: any) {
  const countriesSliced = countries.slice(0, 10)
  return countriesSliced.map((country: Country) => <div key={country.name}><p>{country.name}</p></div>)
}