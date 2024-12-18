import {Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {DecimalPipe, NgIf} from '@angular/common';
import {GeolocationService} from '../../services/geolocation.service';

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
  ]
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
    if (!weather) return '/video/default.mp4';

    const id = weather.id;

    if (id >= 200 && id <= 232) return '/video/thunderstorm.mp4';
    if (id >= 300 && id <= 321) return '/video/drizzle.mp4';
    if (id >= 500 && id <= 531) return '/video/rain.mp4';
    if (id >= 600 && id <= 616) return '/video/snow.mp4';
    if (id >= 620 && id <= 622) return '/video/snowfall.mp4';
    if (id >= 701 && id <= 781) return '/video/mist.mp4';
    if (id === 800) return '/video/clear.mp4';
    if (id === 801) return '/video/few-clouds.mp4';
    if (id === 802) return '/video/scattered-clouds.mp4';
    if (id === 803) return '/video/slightly-cloudy.mp4';
    if (id === 804) return '/video/partly-cloudy.mp4';

    return '/video/default.mp4';
  }
}
