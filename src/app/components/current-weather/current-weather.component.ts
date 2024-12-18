import {ChangeDetectionStrategy, Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {DecimalPipe, NgIf} from '@angular/common';
import {GeolocationService} from '../../services/geolocation.service';
import {getWeatherVideoById} from '../../utils/getWeatherVideo';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    DecimalPipe
  ],
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

  fetchWeatherByCity(): void {
    if (this.city.length > 0) this.weatherService.fetchCurrentWeatherByCity(this.city);
  }

  getWeatherVideo(weather: any): string {
    if (!weather || !weather.id) return '/video/default.mp4';

    return getWeatherVideoById(weather.id);
  }
}
