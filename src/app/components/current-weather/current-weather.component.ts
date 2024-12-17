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
}
