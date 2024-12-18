export function getWeatherVideoById(id: number): string {
  if (id >= 200 && id <= 232) return '/video/thunderstorm.mp4';
  if (id >= 300 && id <= 321) return '/video/drizzle.mp4';
  if (id >= 500 && id <= 531) return '/video/rain.mp4';
  if (id >= 600 && id <= 616) return '/video/snow.mp4';
  if (id >= 620 && id <= 622) return '/video/snowfall.mp4';
  if (id >= 701 && id <= 781) return '/video/mist.mp4';
  if (id === 800) return '/video/clear.mp4';
  if (id === 801) return '/video/few-clouds.mp4';
  if (id === 802) return '/video/scattered-clouds.mp4';
  if (id === 803) return '/video/slightly-cloudy.mp4';
  if (id === 804) return '/video/partly-cloudy.mp4';

  return '/video/default.mp4';
}
