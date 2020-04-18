import { IPConnection, BrickletLCD20x4 } from 'tinkerforge';
import { EventEmitter } from 'events';
import { Display } from './display';

export class WeatherStation extends EventEmitter {
  private _host: string;
  private _port: number;
  private _ipConnection: IPConnection;
  display: undefined | Display;

  constructor(host?: string, port?: number) {
    super();
    this._host = host || 'localhost';
    this._port = port || 4223;
    this._ipConnection = new IPConnection();
  }

  initialize(): void {
    this._ipConnection.on(
      IPConnection.CALLBACK_CONNECTED,
      this._onConnect.bind(this),
    );
    this._ipConnection.on(
      IPConnection.CALLBACK_ENUMERATE,
      this._onEnumerate.bind(this),
    );
    this._ipConnection.connect(this._host, this._port);
  }

  private _onConnect(): void {
    this._ipConnection.enumerate();
  }

  private _onEnumerate(
    uid: string,
    connectedUid: string,
    position: string,
    hardwareVersion: [number],
    firmwareVersion: [number],
    deviceIdentifier: number,
    enumerationType: number,
  ): void {
    switch (deviceIdentifier) {
      case BrickletLCD20x4.DEVICE_IDENTIFIER:
        this.display = new Display(
          uid,
          connectedUid,
          position,
          hardwareVersion,
          firmwareVersion,
          this._ipConnection,
        );
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
