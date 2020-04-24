import { BrickletHumidity as TFBrickletHumidity } from 'tinkerforge';
import { IPConnection } from './IPConnection';
import { EventEmitter } from 'events';

export interface BrickletAmbientLight {
  on(event: 'humidity', listener: (humidity: number) => void): this;
  on(event: 'analogValue', listener: (value: number) => void): this;
  on(event: 'humidityReached', listener: (humidity: number) => void): this;
  on(event: 'analogValueReached', listener: (value: number) => void): this;
}

export class BrickletHumidity extends EventEmitter {
  private _originalBricklet: TFBrickletHumidity;

  public static DEVICE_DISPLAY_NAME = TFBrickletHumidity.DEVICE_DISPLAY_NAME;
  public static DEVICE_IDENTIFIER = TFBrickletHumidity.DEVICE_IDENTIFIER;

  constructor(uid: string, ipConnection: IPConnection) {
    super();

    this._originalBricklet = new TFBrickletHumidity(
      uid,
      ipConnection.originalIPConnection,
    );
    this._originalBricklet.on(
      TFBrickletHumidity.CALLBACK_HUMIDITY,
      this._onHumidity.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletHumidity.CALLBACK_ANALOG_VALUE,
      this._onAnalogValue.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletHumidity.CALLBACK_HUMIDITY_REACHED,
      this._onHumidityReached.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletHumidity.CALLBACK_ANALOG_VALUE_REACHED,
      this._onAnalogValueReached.bind(this),
    );
  }

  getHumidity(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getHumidity(
        (humidity: number) => {
          return resolve(humidity);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getAnalogValue(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAnalogValue(
        (value: number) => {
          return resolve(value);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getIdentity(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getIdentity(
        (
          uid: string,
          connectedUid: string,
          position: string,
          hardwareVersion: [number],
          firmwareVersion: [number],
          deviceIdentifier: number,
        ) => {
          return resolve({
            uid: uid,
            cogetIdnnectedUid: connectedUid,
            position: position,
            hardwareVersion: hardwareVersion,
            firmwareVersion: firmwareVersion,
            deviceIdentifier: deviceIdentifier,
          });
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setHumidityCallbackPeriod(period: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setHumidityCallbackPeriod(
        period,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getHumidityCallbackPeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getHumidityCallbackPeriod(
        (period: number) => {
          return resolve(period);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setAnalogValueCallbackPeriod(period: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAnalogValueCallbackPeriod(
        period,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getAnalogValueCallbackPeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAnalogValueCallbackPeriod(
        (period: number) => {
          return resolve(period);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setHumidityCallbackThreshold(
    option: string,
    min: number,
    max: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setHumidityCallbackThreshold(
        option,
        min,
        max,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getHumidityCallbackThreshold(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getHumidityCallbackThreshold(
        (option: string, min: number, max: number) => {
          return resolve({
            option: option,
            min: min,
            max: max,
          });
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setAnalogValueCallbackThreshold(
    option: string,
    min: number,
    max: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAnalogValueCallbackThreshold(
        option,
        min,
        max,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getAnalogValueCallbackThreshold(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAnalogValueCallbackThreshold(
        (option: string, min: number, max: number) => {
          return resolve({
            option: option,
            min: min,
            max: max,
          });
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setDebouncePeriod(debounce: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setDebouncePeriod(
        debounce,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getDebouncePeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getDebouncePeriod(
        (debounce: number) => {
          return resolve(debounce);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  private _onHumidity(humidity: number): void {
    if (this.listenerCount('humidity') >= 0) {
      this.emit('humidity', humidity);
    }
  }

  private _onAnalogValue(value: number): void {
    if (this.listenerCount('analogValue') >= 0) {
      this.emit('analogValue', value);
    }
  }

  private _onHumidityReached(humidity: number): void {
    if (this.listenerCount('humidityReached') >= 0) {
      this.emit('humidityReached', humidity);
    }
  }

  private _onAnalogValueReached(value: number): void {
    if (this.listenerCount('analogValueReached') >= 0) {
      this.emit('analogValueReached', value);
    }
  }
}
