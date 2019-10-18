import { Country } from '../entities/Country'

export interface ActionTypeBase {
  type: string;
}

export interface CountriesActionType extends ActionTypeBase {
  countries : Country[];
}

export interface CountryActionType extends ActionTypeBase {
  country : 0 | Country;
}