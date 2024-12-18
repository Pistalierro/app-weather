import {inject, Injectable, signal} from '@angular/core';
import {apiConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {CurrentResponseInterface} from '../models/current-response.interface';
import {GeolocationService} from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentWeather = signal<CurrentResponseInterface | null>(null);
  dailyWeather = signal<any | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private apiUrlCurrent: string = apiConfig.apiUrlOpenWeatherMap;
  private apiUrlOpenMeteo: string = apiConfig.apiUrlOpenMeteo;
  private apiKey: string = apiConfig.apiKeyOpenWeatherMa;
  private http = inject(HttpClient);
  private geolocationService = inject(GeolocationService);

  get coordinates() {
    return this.geolocationService.coordinates();
  }

  fetchCurrentWeatherByCity(city: string): void {
    this.loading.set(true);
    this.error.set(null);

    const url = `${this.apiUrlCurrent}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`;

    this.http.get<CurrentResponseInterface>(url).subscribe({
      next: (res: CurrentResponseInterface) => {
        this.currentWeather.set(res);
        this.loading.set(false);
        console.log(res.weather[0].description);
        const {lat, lon} = res.coord;
        this.fetchDailyWeather(lat, lon);
      },
      error: (err) => {
        console.error('Ошибка запроса:', err);
        this.error.set('Не удалось загрузить данные о погоде.');
        this.loading.set(false);
      },
    });
  }

  fetchCurrentWeatherByCoords(lat: number, lon: number): void {
    this.loading.set(true);
    this.error.set(null);

    const url = `${this.apiUrlCurrent}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=ru`;

    this.http.get<CurrentResponseInterface>(url).subscribe({
      next: (res: CurrentResponseInterface) => {
        this.currentWeather.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить текущую погоду.');
        this.loading.set(false);
      }
    });
  }

  fetchDailyWeather(lat: number, lon: number): void {
    const url = `${this.apiUrlOpenMeteo}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;

    this.http.get(url).subscribe({
      next: (res) => this.dailyWeather.set(res),
      error: (err) => this.error.set('Ошибка получения прогноза погоды'),
    });
  }

  getDefaultWeather(): CurrentResponseInterface {
    return {
      name: '',
      coord: {
        lat: 0,
        lon: 0
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
      weather: [{description: '', icon: ''}]
    };
  }
}
