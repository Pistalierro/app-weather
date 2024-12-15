import {Component} from '@angular/core';
import {WeatherTestComponent} from './components/weather-test/weather-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WeatherTestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
