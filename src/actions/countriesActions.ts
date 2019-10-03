import request from 'superagent';

export const SET_COUNTRIES = 'SET_COUNTRIES'

export function setCountries() {
  return function(dispatch: any, getState: any) {
    if (getState().countries.length === 0) {
      return request
        .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;area;flag')
        .then(response => {
          dispatch({
            type: SET_COUNTRIES,
            payload: response.body
          });
        })
        .catch(console.error);
    }
  };
};