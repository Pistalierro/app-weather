export interface ForecastResponseInterface {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  city: {
    name: string;
    country: string;
  };
  todayTempMin?: number;
  todayTempMax?: number;
}
