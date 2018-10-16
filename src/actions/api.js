import fetch from '../utils/fetch';

const BASE = 'http://api.apixu.com/v1';
const KEY = 'cacdf29dc2be47d484a105606152306';

export const search = val => fetch(`${BASE}/search.json?key=${KEY}&q=${val}`, { method: 'GET' });
