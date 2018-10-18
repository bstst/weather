import fetch from '../utils/fetch';

const BASE = 'http://api.geonames.org';
const KEY = 'bstst'; // this should be extracted to an environmental value, of course

export const getCountries = () => fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha2Code', { method: 'GET' }).then(response => response.json());

export const getCountryCities = (countryCode) => fetch(`${BASE}/searchJSON?formatted=true&q=&maxRows=5&lang=en&username=${KEY}&style=FULL&country=${countryCode}&orderby=population&featureClass=P`, { method: 'GET' }).then(response => response.json());

export const getLocationByCoordinates = (lat, lon) => fetch(`${BASE}/findNearbyPlaceNameJSON?formatted=false&lat=${lat}&lng=${lon}&username=${KEY}&style=SHORT`);

export const autocompleteCities = (value) => fetch(`${BASE}/searchJSON?formatted=true&q=${value}&maxRows=10&lang=en&username=${KEY}&style=FULL&featureCode=PPLC&featureCode=PPLA&featureCode=PPLS`);
