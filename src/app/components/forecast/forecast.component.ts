import {Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {GeolocationService} from '../../services/geolocation.service';
import {CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CommonModule,
    SlicePipe,
    DatePipe,
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit {

  city!: string;
  private weatherService = inject(WeatherService);
  loading = this.weatherService.loading;
  error = this.weatherService.error;
  forecastWeather = this.weatherService.forecastWeather;
  private geolocationService = inject(GeolocationService);

  constructor() {
    effect(() => {
        const coords = this.geolocationService.coordinates();
        if (coords.lat && coords.lon) {
          this.weatherService.fetchForecastWeatherByCoords(coords.lat, coords.lon);
          this.weatherService.fetchDailyWeather(coords.lat, coords.lon);
        }
      },
      {allowSignalWrites: true}
    );
  }

  ngOnInit(): void {
    this.geolocationService.getCurrentLocation();
  }

  getDynamicForecast(): any[] {
    const forecast = this.weatherService.forecastWeather();
    if (!forecast) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const filteredList = forecast.list.filter((item) => {
      const forecastHour = new Date(item.dt_txt).getHours();
      return forecastHour >= currentHour;
    });
    if (filteredList.length > 0) return [{label: 'Сейчас', ...filteredList[0]}, ...filteredList.slice(1)];
    return filteredList;
  }
}
