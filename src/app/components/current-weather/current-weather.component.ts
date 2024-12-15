import {Component, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnInit {
  city: string = 'Kyiv';
  private weatherService = inject(WeatherService);

  weather = this.weatherService.currentWeather;
  loading = this.weatherService.loading;
  error = this.weatherService.error;

  ngOnInit(): void {
    this.weatherService.fetchCurrentWeather(this.city);
  }
}
