export interface DailyResponseInterface {
  latitude: number; // Широта местоположения
  longitude: number; // Долгота местоположения
  generationtime_ms: number; // Время генерации ответа в миллисекундах
  utc_offset_seconds: number; // Сдвиг UTC в секундах
  timezone: string; // Часовой пояс
  timezone_abbreviation: string; // Сокращение часового пояса
  elevation: number; // Высота над уровнем моря
  daily: {
    time: string[]; // Даты прогнозов в формате YYYY-MM-DD
    temperature_2m_min: number[]; // Минимальная температура за день
    temperature_2m_max: number[]; // Максимальная температура за день
  };
  daily_units: {
    time: string; // Единица измерения времени, например "iso8601"
    temperature_2m_min: string; // Единица измерения минимальной температуры, например "°C"
    temperature_2m_max: string; // Единица измерения максимальной температуры, например "°C"
  };
}
