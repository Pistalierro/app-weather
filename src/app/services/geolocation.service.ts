import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  coordinates = signal<{ lat: number | null, lon: number | null }>({lat: null, lon: null});
  error = signal<any>(null);

  getCurrentLocation() {
    if (!navigator.geolocation) {
      this.error.set('Геолокация не поддерживается вашим браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        this.coordinates.set({lat: position.coords.latitude, lon: position.coords.longitude});
        this.error.set(null);
      },
      (error) => {
        this.error.set('Не удалось получить геопозицию: ' + error.message);
        this.coordinates.set({lat: null, lon: null});
      }
    );
  };
}
