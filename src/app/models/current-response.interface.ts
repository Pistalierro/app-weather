export interface CurrentResponseInterface {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
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
  }>;
}