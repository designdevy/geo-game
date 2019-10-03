import { Country } from '../entities/Country'

export interface ActionTypeBase {
  type: string;
}

export interface CountriesActionType extends ActionTypeBase {
  countries? : Country[];
}