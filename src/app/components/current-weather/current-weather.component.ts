import {ChangeDetectionStrategy, Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {DecimalPipe, NgIf} from '@angular/common';
import {GeolocationService} from '../../services/geolocation.service';
import {getWeatherVideoById} from '../../utils/getWeatherVideo';
import {ForecastComponent} from '../forecast/forecast.component';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [FormsModule, NgIf, DecimalPipe, ForecastComponent],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.5s ease-in', style({opacity: 1}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CurrentWeatherComponent implements OnInit {
  city!: string;
  shouldResetScroll: boolean = false;
  private weatherService = inject(WeatherService);
  loading = this.weatherService.loading;
  currentWeather = this.weatherService.currentWeather;
  error = this.weatherService.error;
  dailyWeather = this.weatherService.dailyWeather;
  private geolocationService = inject(GeolocationService);

  constructor() {
    effect(() => {
        const coords = this.geolocationService.coordinates();
        if (coords.lat && coords.lon) {
          this.weatherService.fetchCurrentWeatherByCoords(coords.lat, coords.lon);
          this.weatherService.fetchDailyWeather(coords.lat, coords.lon);
        }
      },
      {allowSignalWrites: true}
    );
  }

  ngOnInit() {
    this.geolocationService.getCurrentLocation();
  }

  fetchWeatherAndForecastByCity(): void {
    if (this.city.length > 0) {
      this.weatherService.fetchCurrentWeatherByCity(this.city.trim());
      this.weatherService.fetchForecastWeatherByCity(this.city.trim());
      this.city = '';

      this.shouldResetScroll = true;
      setTimeout(() => {
        this.shouldResetScroll = false;
      }, 100);
    }
  }

  getWeatherVideo(weather: any): string {
    if (!weather || !weather.id) return '/video/default.mp4';

    return getWeatherVideoById(weather.id);
  }

  getSunriseTime(): string | null {
    const weather = this.currentWeather();
    if (weather && weather.sys && weather.sys.sunrise) {
      return new Date(weather.sys.sunrise * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return null;
  }

  getSunsetTime(): string | null {
    const weather = this.currentWeather();
    if (weather && weather.sys && weather.sys.sunset) {
      return new Date(weather.sys.sunset * 1000).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return null;
  }

  getWindDirection(degrees: number): string {
    const directions = ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

}
