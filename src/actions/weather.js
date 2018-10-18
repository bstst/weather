import fetch from '../utils/fetch';
import { getItem, setItem } from '../utils/storage';

const BASE = 'http://api.apixu.com/v1';
const KEY = 'cacdf29dc2be47d484a105606152306'; // this should be extracted to an environmental value, of course

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

export const getRecentLocations = () => getItem('recent') || [];

export const saveRecentLocation = (newLocation) => {
  const now = Math.floor(Date.now() / 1000);
  const recentLocations = getRecentLocations();
  const foundInRecent = recentLocations.find(location => location.name === newLocation.name);
  if (foundInRecent) {
    foundInRecent.timestamp = now;
  } else {
    recentLocations.push({ ...newLocation, timestamp: now });
  }
  setItem('recent', recentLocations.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10));
};
