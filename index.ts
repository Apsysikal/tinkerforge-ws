import { WeatherStation } from './src/weatherstation';
import { displayCurrentValues } from './src/display';

const ws = new WeatherStation();
ws.initialize();

setTimeout(() => {
  displayCurrentValues(ws);
}, 1000);
