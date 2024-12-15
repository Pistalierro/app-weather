import {inject, Injectable} from '@angular/core';
import {apiConfig} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl: string = apiConfig.weatherApiUrl;
  private apiKey: string = apiConfig.weatherApiKey;
  private http = inject(HttpClient);

  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
