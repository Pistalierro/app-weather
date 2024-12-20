import {Component, inject} from '@angular/core';
import {WeatherService} from './services/weather.service';
import {CommonModule, NgIf} from '@angular/common';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {ForecastComponent} from './components/forecast/forecast.component';
import {getWeatherVideoById} from './utils/getWeatherVideo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    CurrentWeatherComponent,
    ForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private weatherService = inject(WeatherService);
  loading = this.weatherService.loading();
  error = this.weatherService.error();

  getCurrentVideo(): string {
    const currentWeather = this.weatherService.currentWeather();
    if (!currentWeather) return '/video/default.mp4';
    return getWeatherVideoById(currentWeather.weather[0].id);
  }
}
