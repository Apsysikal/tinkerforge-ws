import { WeatherStation } from './weatherstation';
import { BrickletLCD20x4 } from './tinkerforge/BrickletLCD20x4';

async function writeIlluminanceToDisplay(
  display: BrickletLCD20x4,
  line: number,
  position: number,
  illuminance: number,
): Promise<void> {
  await display.writeLine(
    line,
    position,
    'Illuminanc' + illuminance.toFixed(1).padStart(7, ' ') + ' lx',
  );
}

async function writeHumidityToDisplay(
  display: BrickletLCD20x4,
  line: number,
  position: number,
  humidity: number,
): Promise<void> {
  await display.writeLine(
    line,
    position,
    'Humidity' + humidity.toFixed(1).padStart(9, ' ') + ' %',
  );
}

async function writeAirPressureToDisplay(
  display: BrickletLCD20x4,
  line: number,
  position: number,
  airPressure: number,
): Promise<void> {
  await display.writeLine(
    line,
    position,
    'Air Press' + airPressure.toFixed(1).padStart(8, ' ') + ' mb',
  );
}

async function writeTemperatureToDisplay(
  display: BrickletLCD20x4,
  line: number,
  position: number,
  temperature: number,
): Promise<void> {
  await display.writeLine(
    line,
    position,
    'Temperature' +
      '  ' +
      temperature.toFixed(1).padStart(4, ' ') +
      ' \xDF' +
      'C',
  );
}

export async function displayCurrentValues(
  weatherStation: WeatherStation,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const display = weatherStation.display;
      const ambientLightSensor = weatherStation.ambientLightSensor;
      const humiditySensor = weatherStation.humiditySensor;
      const barometerSensor = weatherStation.barometerSensor;

      if (!weatherStation || !display) {
        return;
      }

      await weatherStation?.display?.clearDisplay();
      await weatherStation?.display?.backlightOn();

      ambientLightSensor?.on(
        'illuminance',
        async (illuminance: number) =>
          await writeIlluminanceToDisplay(display, 0, 0, illuminance / 10.0),
      );

      humiditySensor?.on('humidity', async (humidity: number) => {
        await writeHumidityToDisplay(display, 1, 0, humidity / 10.0);
      });

      barometerSensor?.on('airPressure', async (airPressure: number) => {
        const temperature = await barometerSensor.getChipTemperature();
        await writeAirPressureToDisplay(display, 2, 0, airPressure / 1000.0);
        await writeTemperatureToDisplay(display, 3, 0, temperature / 100.0);
      });

      await ambientLightSensor?.setIlluminanceCallbackPeriod(1000 * 1);
      await humiditySensor?.setHumidityCallbackPeriod(1000 * 1);
      await barometerSensor?.setAirPressureCallbackPeriod(1000 * 1);

      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}
