import { IPConnection } from 'tinkerforge';
import { EventEmitter } from 'events';

export class WeatherStation extends EventEmitter {
  private _host: string;
  private _port: number;
  private _ipConnection: IPConnection;

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
    console.log(this._ipConnection);
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
    console.log(`UID: ${uid}`);
    console.log(`Connected UID: ${connectedUid}`);
    console.log(`Position: ${position}`);
    console.log(`Hardware Version: ${hardwareVersion}`);
    console.log(`Firmware Version: ${firmwareVersion}`);
    console.log(`Device Identifier: ${deviceIdentifier}`);
    console.log(`Enumeration Type: ${enumerationType}`);
  }
}
