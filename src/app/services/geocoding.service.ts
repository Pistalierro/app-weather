import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  coordinates = signal<{ lat: number | null; lon: number | null }>({lat: null, lon: null});
  error = signal<any | null>(null);

  private geocodeUrl = 'https://nominatim.openstreetmap.org/search';
  private http = inject(HttpClient);

  getCoordinates(city: string): any {
    this.error.set(null);
    const url = `${this.geocodeUrl}?q=${encodeURIComponent(city)}&format=json&limit=1`;

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.coordinates.set({
            lat: Number(parseFloat(res[0].lat).toFixed(2)),
            lon: Number(parseFloat(res[0].lon).toFixed(2)),
          });
        } else {
          this.error.set('Город не найден');
          this.coordinates.set({lat: null, lon: null});
        }
      },
      error: () => {
        this.error.set('Ошибка при получении координат');
        this.coordinates.set({lat: null, lon: null});
      },
    });
  }
}
