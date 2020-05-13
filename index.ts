import { IPConnection } from './src/tinkerforge/IPConnection';
import { BrickletAmbientLight } from './src/tinkerforge/BrickletAmbientLight';
import { BrickletBarometer } from './src/tinkerforge/BrickletBarometer';
import { BrickletHumidity } from './src/tinkerforge/BrickletHumidity';
import { BrickletLCD20x4 } from './src/tinkerforge/BrickletLCD20x4';

let connection: IPConnection;

// Bricklets
let brickletAmbientLight: BrickletAmbientLight;
let brickletBarometer: BrickletBarometer;
let brickletHumidity: BrickletHumidity;
let brickletDisplay: BrickletLCD20x4;

// Values
let illuminance = 0.0;
let airPressure = 0.0;
let chipTemperature = 0.0;
let humidity = 0.0;

// Display
let currentlyUpdating = false;
let displayInterval: NodeJS.Timeout;

async function updateDisplay(): Promise<void> {
  await brickletDisplay.writeLine(
    0,
    0,
    'Illuminanc ' + illuminance.toFixed(1).toString().padStart(6, ' ') + ' lx',
  );

  await brickletDisplay.writeLine(
    1,
    0,
    'Air Press ' + airPressure.toFixed(1).toString().padStart(6, ' ') + ' hpa',
  );

  await brickletDisplay.writeLine(
    2,
    0,
    'Temperature ' +
      chipTemperature.toFixed(1).toString().padStart(4, ' ') +
      ' \xDF' +
      'C',
  );

  await brickletDisplay.writeLine(
    3,
    0,
    'Humidity ' + humidity.toFixed(1).toString().padStart(9, ' ') + ' %',
  );
}

export function stopUpdateDisplay(): void {
  if (currentlyUpdating) {
    clearInterval(displayInterval);
  }
}

async function onEnumerate(
  uid: string,
  connectedUid: string,
  position: string,
  hardwareVersion: [number, number, number],
  firmwareVersion: [number, number, number],
  deviceIdentifier: number,
  enumerationType: number,
): Promise<void> {
  try {
    if (deviceIdentifier === BrickletAmbientLight.DEVICE_IDENTIFIER) {
      brickletAmbientLight = new BrickletAmbientLight(uid, connection);
      brickletAmbientLight.on('illuminance', (rawIlluminance: number) => {
        illuminance = rawIlluminance / 10.0;
      });
      await brickletAmbientLight.setIlluminanceCallbackPeriod(1000);
    }
    if (deviceIdentifier === BrickletBarometer.DEVICE_IDENTIFIER) {
      brickletBarometer = new BrickletBarometer(uid, connection);
      brickletBarometer.on('airPressure', async (rawAirPressure) => {
        airPressure = rawAirPressure / 1000.0;
        chipTemperature =
          (await brickletBarometer.getChipTemperature()) / 100.0;
      });
      await brickletBarometer.setAirPressureCallbackPeriod(1000);
    }
    if (deviceIdentifier === BrickletHumidity.DEVICE_IDENTIFIER) {
      brickletHumidity = new BrickletHumidity(uid, connection);
      brickletHumidity.on('humidity', (rawHumidity: number) => {
        humidity = rawHumidity / 10.0;
      });
      brickletHumidity.setHumidityCallbackPeriod(1000);
    }
    if (deviceIdentifier === BrickletLCD20x4.DEVICE_IDENTIFIER) {
      brickletDisplay = new BrickletLCD20x4(uid, connection);
      await brickletDisplay.clearDisplay();
      await brickletDisplay.backlightOn();
      displayInterval = setInterval(updateDisplay, 1000);
      currentlyUpdating = true;
    }

    console.info([
      uid,
      connectedUid,
      position,
      hardwareVersion,
      firmwareVersion,
      deviceIdentifier,
      enumerationType,
    ]);
  } catch (error) {
    console.error(error);
  }
}

function main(): void {
  connection = new IPConnection();

  connection.on('enumerate', onEnumerate);
  connection.on('connected', () => {
    connection.enumerate();
  });

  connection.connect('localhost', 4223);
}

main();
