import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDIgRkgzoZXx9selPEGCWFhKx3Zp22aB4g',
  authDomain: 'weather-application-e4426.firebaseapp.com',
  projectId: 'weather-application-e4426',
  storageBucket: 'weather-application-e4426.firebasestorage.app',
  messagingSenderId: '223082059763',
  appId: '1:223082059763:web:992daf8afee48985b76486'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
