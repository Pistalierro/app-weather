import {Component} from '@angular/core';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {ForecastComponent} from './components/forecast/forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CurrentWeatherComponent,
    ForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
