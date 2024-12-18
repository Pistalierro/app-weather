interface WeatherRangeMapping {
  range?: [number, number];
  exact?: number[];
  video: string;
}

export const weatherMappings: WeatherRangeMapping[] = [
  {range: [200, 232], video: '/video/thunderstorm.mp4'},
  {range: [300, 321], video: '/video/drizzle.mp4'},
  {range: [500, 531], video: '/video/rain.mp4'},
  {range: [600, 616], video: '/video/snow.mp4'},
  {range: [620, 622], video: '/video/snowfall.mp4'},
  {range: [701, 781], video: '/video/mist.mp4'},
  {exact: [800], video: '/video/clear.mp4'},
  {exact: [801], video: '/video/few-clouds.mp4'},
  {exact: [802], video: '/video/scattered-clouds.mp4'},
  {exact: [803], video: '/video/slightly-cloudy.mp4'},
  {exact: [804], video: '/video/partly-cloudy.mp4'},
];
