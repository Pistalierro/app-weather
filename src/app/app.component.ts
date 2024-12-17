import {Component} from '@angular/core';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CurrentWeatherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
