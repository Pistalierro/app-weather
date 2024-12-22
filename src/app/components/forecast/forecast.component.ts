import {Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {GeolocationService} from '../../services/geolocation.service';
import {CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ScrollService} from '../../services/scroll.service';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit {
  private weatherService = inject(WeatherService);
  currentWeather = this.weatherService.currentWeather;
  forecastWeather = this.weatherService.forecastWeather;
  error = this.weatherService.error;
  private geolocationService = inject(GeolocationService);
  private scrollService = inject(ScrollService);

  constructor() {
    effect(() => {
        const coords = this.geolocationService.coordinates();
        if (coords.lat && coords.lon) {
          this.weatherService.fetchForecastWeatherByCoords(coords.lat, coords.lon);
          this.weatherService.fetchDailyWeather(coords.lat, coords.lon);
        }
        if (this.scrollService.resetSignal()) {
          this.resetScroll();
        }
      },
      {allowSignalWrites: true}
    );
  }

  ngOnInit(): void {
    this.geolocationService.getCurrentLocation();
  }

  resetScroll(): void {
    const scrollContainer = document.querySelector('.hourly-weather-scroll') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTo({left: 0, behavior: 'smooth'});
    }
  }

  getDynamicForecast(): any[] {
    const forecast = this.forecastWeather();
    if (!forecast) return [];

    const now = new Date();
    const filteredList = forecast.list.filter((item: any) => {
      const forecastDate = new Date(item.dt_txt);
      return forecastDate >= now;
    });
    return filteredList.slice(0, 24);
  }

  getEnhancedForecast(): any[] {
    const currentWeather = this.currentWeather();
    const forecast = this.getDynamicForecast();

    if (!currentWeather || !forecast) return [];

    const currentWeatherFormatted = {
      label: 'Сейчас',
      main: currentWeather.main,
      weather: currentWeather.weather,
      dt_txt: '',
    };

    return [currentWeatherFormatted, ...forecast];
  }
}
