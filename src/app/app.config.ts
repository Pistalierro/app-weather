import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyDIgRkgzoZXx9selPEGCWFhKx3Zp22aB4g',
  authDomain: 'weather-application-e4426.firebaseapp.com',
  projectId: 'weather-application-e4426',
  storageBucket: 'weather-application-e4426.firebasestorage.app',
  messagingSenderId: '223082059763',
  appId: '1:223082059763:web:992daf8afee48985b76486'
};

export const apiConfig = {
  apiUrlOpenWeatherMap: 'https://api.openweathermap.org/data/2.5',
  apiKeyOpenWeatherMa: '41f36d2a0b64044a0868f2b100110395',
  apiUrlOpenMeteo: 'https://api.open-meteo.com/v1/forecast'
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideAnimations()
  ]
};
