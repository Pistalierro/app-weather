import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

export const apiConfig = {
  apiUrlOpenWeatherMap: 'https://api.openweathermap.org/data/2.5',
  apiKeyOpenWeatherMa: '41f36d2a0b64044a0868f2b100110395',
  apiUrlOpenMeteo: 'https://api.open-meteo.com/v1/forecast'
};

function setViewportHeight(): void {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
