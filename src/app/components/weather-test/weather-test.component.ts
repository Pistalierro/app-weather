import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-weather-test',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './weather-test.component.html',
  styleUrl: './weather-test.component.scss'
})
export class WeatherTestComponent implements OnInit {
  city: string = 'Kyiv';
  weather!: any;
  isLoading = false;
  error: string | null = null;

  private weatherService = inject(WeatherService);

  ngOnInit(): void {
  }

  fetchWeather(): void {
    this.isLoading = true;
    this.error = null;
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: res => {
        this.weather = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Ошибка загрузки данных';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
