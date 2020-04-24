import { IPConnection } from './IPConnection';
import { EventEmitter } from 'events';
import { BrickletLCD20x4 } from './BrickletLCD20x4';

export class WeatherStation extends EventEmitter {
  private _host: string;
  private _port: number;
  private _ipConnection: IPConnection;
  display: undefined | BrickletLCD20x4;

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
