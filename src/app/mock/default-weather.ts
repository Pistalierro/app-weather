import {CurrentResponseInterface} from '../models/current-response.interface';

export const DEFAULT_WEATHER: CurrentResponseInterface = {
  name: '',
  coord: {
    lat: 0,
    lon: 0,
  },
  sys: {country: ''},
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    pressure: 0,
    feels_like: 0,
  },
  wind: {speed: 0},
  weather: [{description: '', icon: ''}],
};
