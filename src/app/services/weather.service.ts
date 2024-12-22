import {inject, Injectable, signal} from '@angular/core';
import {apiConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {CurrentResponseInterface} from '../models/current-response.interface';
import {DailyResponseInterface} from '../models/daily-response.interface';
import {ForecastResponseInterface} from '../models/forecast-response.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentWeather = signal<CurrentResponseInterface | null>(null);
  dailyWeather = signal<DailyResponseInterface | null>(null);
  forecastWeather = signal<ForecastResponseInterface | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private apiUrlCurrent: string = apiConfig.apiUrlOpenWeatherMap;
  private apiUrlOpenMeteo: string = apiConfig.apiUrlOpenMeteo;
  private apiKey: string = apiConfig.apiKeyOpenWeatherMa;
  private http = inject(HttpClient);

  fetchCurrentWeatherByCoords(lat: number, lon: number): void {
    this.loading.set(true);
    this.error.set(null);
    const url = `${this.apiUrlCurrent}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=ru`;

    this.http.get<CurrentResponseInterface>(url).subscribe({
      next: (res: CurrentResponseInterface) => {
        // console.log('fetchCurrentWeatherByCoords returned: ', res);
        this.currentWeather.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить текущую погоду.');
        this.loading.set(false);
      }
    });
  }

  fetchCurrentWeatherByCity(city: string): void {
    this.loading.set(true);
    this.error.set(null);
    const url = `${this.apiUrlCurrent}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`;

    this.http.get<CurrentResponseInterface>(url).subscribe({
      next: (res: CurrentResponseInterface) => {
        // console.log('fetchCurrentWeatherByCity returned: ', res);
        this.currentWeather.set(res);
        this.loading.set(false);
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

  fetchForecastWeatherByCoords(lat: number, lon: number): void {
    this.loading.set(true);
    this.error.set(null);
    const url = `${this.apiUrlCurrent}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${this.apiKey}`;

    this.http.get<ForecastResponseInterface>(url).subscribe({
      next: (res: ForecastResponseInterface) => {
        console.log('fetchForecastWeatherByCoords returned: ', res);
        this.forecastWeather.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить прогноз погоды.');
        this.loading.set(false);
      }
    });
  }

  fetchForecastWeatherByCity(city: string): void {
    this.loading.set(true);
    this.error.set(null);
    const url = `${this.apiUrlCurrent}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`;

    this.http.get<ForecastResponseInterface>(url).subscribe({
      next: (res: ForecastResponseInterface) => {
        // console.log('fetchForecastWeatherByCity returned: ', res);
        this.forecastWeather.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Не удалось загрузить прогноз погоды.');
        this.loading.set(false);
      }
    });
  }

  fetchDailyWeather(lat: number, lon: number): void {
    const url = `${this.apiUrlOpenMeteo}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;

    this.http.get<DailyResponseInterface>(url).subscribe({
      next: (res) => {
        this.dailyWeather.set(res);
      },
      error: (err) => this.error.set('Ошибка получения прогноза погоды'),
    });
  }
}
