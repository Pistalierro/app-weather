import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {DecimalPipe, NgIf} from '@angular/common';

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
  city: string = 'Kyiv';
  private weatherService = inject(WeatherService);
  currentWeather = computed(() =>
    this.weatherService.currentWeather() || this.weatherService.getDefaultWeather()
  );
  loading = this.weatherService.loading;
  error = this.weatherService.error;
  dailyWeather = this.weatherService.dailyWeather;

  constructor() {
    effect(() => {
        const weather = this.weatherService.currentWeather();
        if (weather?.coord) {
          const {lat, lon} = weather.coord;
          this.weatherService.fetchDailyWeather(lat, lon);
        }
      },
      {allowSignalWrites: true}
    );
  }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather(): void {
    this.weatherService.fetchCurrentWeather(this.city);
  }

  getWeatherVideo(weather: any): string {
    if (!weather) {
      return '/video/default.mp4';
    }

    const description = weather.description;
    const videoMap: Record<string, string> = {
      'ясно': '/video/clear.mp4',
      'пасмурно': '/video/partly-cloudy.mp4',
      'небольшая облачность': '/video/slightly-cloudy.mp4',
      'переменная облачность': '/video/partly-cloudy.mp4',
      'облачно': '/video/clouds.mp4',
      'туман': '/video/atmosphere.mp4',
      'дымка': '/video/atmosphere.mp4',
      'пыль': '/video/atmosphere.mp4',
      'дождь': '/video/rain.mp4',
      'небольшой дождь': '/video/drizzle.mp4',
      'гроза': '/video/thunderstorm.mp4',
      'снег': '/video/snow.mp4'
    };
    
    return videoMap[description] || '/video/default.mp4';
  }


}
