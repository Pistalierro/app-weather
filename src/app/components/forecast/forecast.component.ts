import {Component, effect, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {GeolocationService} from '../../services/geolocation.service';
import {CommonModule, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ScrollService} from '../../services/scroll.service';

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
export class ForecastComponent implements OnInit {
  private weatherService = inject(WeatherService);
  currentWeather = this.weatherService.currentWeather;
  forecastWeather = this.weatherService.forecastWeather;
  error = this.weatherService.error;
  private previousCoords: { lat: number | null; lon: number | null } | null = null;
  private geolocationService = inject(GeolocationService);
  private scrollService = inject(ScrollService);

  constructor() {
    effect(() => {
        const coords = this.geolocationService.coordinates();
        if (coords.lat !== null && coords.lon !== null) {
          // Проверяем, изменились ли координаты
          if (
            !this.previousCoords ||
            this.previousCoords.lat !== coords.lat ||
            this.previousCoords.lon !== coords.lon
          ) {
            this.previousCoords = {lat: coords.lat, lon: coords.lon}; // Сохраняем координаты
            this.weatherService.fetchForecastWeatherByCoords(coords.lat, coords.lon);
            this.weatherService.fetchDailyWeather(coords.lat, coords.lon);
          }
        }

        // Обрабатываем сигнал сброса скролла
        if (this.scrollService.resetSignal()) {
          this.resetScroll();
        }
      },
      {allowSignalWrites: true}
    );
  }

  ngOnInit(): void {
    this.geolocationService.getCurrentLocation();
  }

  resetScroll(): void {
    const scrollContainer = document.querySelector('.hourly-weather-scroll') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTo({left: 0, behavior: 'smooth'});
    }
  }

  getDynamicForecast(): any[] {
    const forecast = this.forecastWeather();
    if (!forecast) return [];

    const now = new Date();
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

    const currentWeatherFormatted = {
      label: 'Сейчас',
      main: currentWeather.main,
      weather: currentWeather.weather,
      dt_txt: '',
    };

    return [currentWeatherFormatted, ...forecast];
  }

  getDailyForecast(): any[] {
    const dailyWeather = this.weatherService.dailyWeather();
    const forecastWeather = this.weatherService.forecastWeather();

    if (!dailyWeather || !dailyWeather.daily || !forecastWeather || !forecastWeather.list) return [];

    // Сопоставляем даты и данные о погоде
    return dailyWeather.daily.time.map((time: string, index: number) => {
      // Ищем ближайшее совпадение по времени
      const matchingForecast = forecastWeather.list.find((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).toDateString();
        const dailyDate = new Date(time).toDateString();
        return forecastDate === dailyDate;
      });

      return {
        date: new Date(time),
        tempMin: dailyWeather.daily.temperature_2m_min[index],
        tempMax: dailyWeather.daily.temperature_2m_max[index],
        label: index === 0 ? 'Сегодня' : new Date(time).toLocaleDateString('ru-RU', {weekday: 'long'}),
        icon: matchingForecast?.weather[0]?.icon || '01d', // Иконка из прогноза
        description: matchingForecast?.weather[0]?.description || 'Нет данных', // Описание из прогноза
      };
    });
  }


}
