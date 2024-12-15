import {inject, Injectable, signal} from '@angular/core';
import {apiConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentWeather = signal<any | null>(null);
  forecast = signal<any | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private apiUrl: string = apiConfig.weatherApiUrl;
  private apiKey: string = apiConfig.weatherApiKey;
  private http = inject(HttpClient);

  fetchCurrentWeather(city: string) {
    this.loading.set(true);
    this.error.set(null);

    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe({
      next: (res: any) => {
        this.currentWeather.set(res);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.error.set('Ошибка загрузки текущей погоды');
        this.loading.set(false);
        console.log(err);
      }
    });
  }

  fetchForecastWeather(city: string) {
    this.loading.set(true);
    this.error.set(null);

    const url = `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;

    this.http.get(url).subscribe({
      next: (res: any) => {
        const dailyForecast = res.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
        this.forecast.set(dailyForecast);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Ошибка загрузки прогноза');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
