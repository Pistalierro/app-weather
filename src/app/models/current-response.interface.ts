export interface CurrentResponseInterface {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    id: number;
  }>;
}
