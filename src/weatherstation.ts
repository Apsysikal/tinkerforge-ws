import { EventEmitter } from 'events';
import { IPConnection } from './tinkerforge/IPConnection';
import { BrickletLCD20x4 } from './tinkerforge/BrickletLCD20x4';
import { BrickletAmbientLight } from './tinkerforge/BrickletAmbientLight';
import { BrickletBarometer } from './tinkerforge/BrickletBarometer';
import { BrickletHumidity } from './tinkerforge/BrickletHumidity';

export class WeatherStation extends EventEmitter {
  private _host: string;
  private _port: number;
  private _ipConnection: IPConnection;
  display: undefined | BrickletLCD20x4;
  ambientLightSensor: undefined | BrickletAmbientLight;
  barometerSensor: undefined | BrickletBarometer;
  humiditySensor: undefined | BrickletHumidity;

  constructor(host?: string, port?: number) {
    super();
    this._host = host || 'localhost';
    this._port = port || 4223;
    this._ipConnection = new IPConnection();
  }

  initialize(): void {
    this._ipConnection.on('connected', this._onConnect.bind(this));
    this._ipConnection.on('enumerate', this._onEnumerate.bind(this));
    this._ipConnection.connect(this._host, this._port);
  }

  private _onConnect(): void {
    this._ipConnection.enumerate();
  }

  private _onEnumerate(
    uid: string,
    connectedUid: string,
    position: string,
    hardwareVersion: [number, number, number],
    firmwareVersion: [number, number, number],
    deviceIdentifier: number,
    enumerationType: number,
  ): void {
    switch (deviceIdentifier) {
      case BrickletLCD20x4.DEVICE_IDENTIFIER:
        this.display = new BrickletLCD20x4(uid, this._ipConnection);
        this.display.on('buttonPressed', (button) => {
          console.log(`Button ${button} pressed`);
        });

        break;

      case BrickletAmbientLight.DEVICE_IDENTIFIER:
        this.ambientLightSensor = new BrickletAmbientLight(
          uid,
          this._ipConnection,
        );
        this.ambientLightSensor.on('illuminance', (illuminance: number) => {
          console.log(`Illuminance: ${illuminance / 10.0} lx`);
        });
        this.ambientLightSensor
          .setIlluminanceCallbackPeriod(1000 * 15)
          .catch((error) => {
            console.error(error);
          });
        break;

      case BrickletBarometer.DEVICE_IDENTIFIER:
        this.barometerSensor = new BrickletBarometer(uid, this._ipConnection);
        this.barometerSensor.on('airPressure', (airPressure: number) => {
          console.log(`Air Pressure: ${airPressure / 1000.0} hpa`);
        });
        this.barometerSensor.on('altitude', (altitude: number) => {
          console.log(`Altitude: ${altitude / 100.0} maS`);
        });
        this.barometerSensor
          .setAirPressureCallbackPeriod(1000 * 15)
          .catch((error) => {
            console.error(error);
          });
        this.barometerSensor
          .setAltitudeCallbackPeriod(1000 * 15)
          .catch((error) => {
            console.error(error);
          });
        break;

      case BrickletHumidity.DEVICE_IDENTIFIER:
        this.humiditySensor = new BrickletHumidity(uid, this._ipConnection);
        this.humiditySensor.on('humidity', (humidity: number) => {
          console.log(`Humidity: ${humidity / 10.0} %rH`);
        });
        this.humiditySensor
          .setHumidityCallbackPeriod(1000 * 15)
          .catch((error) => {
            console.error(error);
          });
        break;

      default:
        console.warn([
          'No initializer for the device with the following parameter:',
          `UID: ${uid}`,
          `Connected UID: ${connectedUid}`,
          `Position: ${position}`,
          `Hardware Version: ${hardwareVersion}`,
          `Firmware Version: ${firmwareVersion}`,
          `Device Identifier: ${deviceIdentifier}`,
          `Enumeration Type: ${enumerationType}`,
        ]);
        break;
    }
  }
}
