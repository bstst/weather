import fetch from '../utils/fetch';

const BASE = 'http://api.apixu.com/v1';
const KEY = 'cacdf29dc2be47d484a105606152306';

export const search = val => fetch(`${BASE}/search.json?key=${KEY}&q=${val}`, { method: 'GET' });

export const getCurrentWeatherQuery = q => fetch(`${BASE}/current.json?key=${KEY}&q=${q}`, { method: 'GET' });

export const getCurrentWeatherForLatLon = (lat, lon) => getCurrentWeatherQuery(`${lat},${lon}`);

export const getCurrentLocation = () => new Promise((resolve, reject) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
    }, err => reject(err));
  } else {
    search('auto:ip')
      .then(response => response.json())
      .then((data) => {
        if (data.length) {
          resolve({ lat: data[0].lat, lon: data[0].lon });
        }
      });
  }
});
