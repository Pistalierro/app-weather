// import {Component, inject, OnInit} from '@angular/core';
// import {WeatherService} from '../../services/weather.service';
// import {DatePipe, NgForOf, NgIf} from '@angular/common';
//
// @Component({
//   selector: 'app-forecast',
//   standalone: true,
//   imports: [
//     NgIf,
//     NgForOf,
//     DatePipe
//   ],
//   templateUrl: './forecast.component.html',
//   styleUrl: './forecast.component.scss'
// })
// export class ForecastComponent implements OnInit {
//
//   city: string = 'Kyiv';
//   private weatherService = inject(WeatherService);
//
//   loading = this.weatherService.loading;
//   error = this.weatherService.error;
//
//   ngOnInit(): void {
//
//   }
//
//   fetchForecast(): void {
//     // this.weatherService.fetchForecastWeather(this.city);
//   }
// }
