import {AfterViewInit, Component, effect, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {GeolocationService} from '../../services/geolocation.service';
import {CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  private weatherService = inject(WeatherService);
  currentWeather = this.weatherService.currentWeather;
  forecastWeather = this.weatherService.forecastWeather;
  error = this.weatherService.error;
  private geolocationService = inject(GeolocationService);

  constructor() {
    effect(() => {
        const coords = this.geolocationService.coordinates();
        if (coords.lat && coords.lon) {
          this.weatherService.fetchForecastWeatherByCoords(coords.lat, coords.lon);
          this.weatherService.fetchDailyWeather(coords.lat, coords.lon);
        }
      },
      {allowSignalWrites: true}
    );
  }

  @Input() set resetScroll(value: boolean) {
    if (value) this.scrollStart();
  }

  ngOnInit(): void {
    this.geolocationService.getCurrentLocation();
  }

  ngAfterViewInit(): void {
    this.scrollStart();
  }

  getDynamicForecast(): any[] {
    const forecast = this.forecastWeather();
    if (!forecast) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = currentHour % 3 === 0 ? currentHour : currentHour + (3 - (currentHour % 3));

    const filteredList = forecast.list.filter((item: any) => {
      const forecastDate = new Date(item.dt_txt);
      return forecastDate >= now;
    });
    return filteredList.slice(0, 24);
  }

  getEnhancedForecast(): any[] {
    const currentWeather = this.currentWeather();
    const forecast = this.getDynamicForecast();

    if (!currentWeather || !forecast) return [];

    // Форматируем текущую погоду в том же формате, что и прогноз
    const currentWeatherFormatted = {
      label: 'Сейчас', // Замена времени на "Сейчас"
      main: currentWeather.main,
      weather: currentWeather.weather,
      dt_txt: '', // Для текущей погоды время не требуется
    };

    // Возвращаем текущую погоду как первый элемент списка
    return [currentWeatherFormatted, ...forecast];
  }

  scrollStart(): void {
    if (this.scrollContainer) this.scrollContainer.nativeElement.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }

}
