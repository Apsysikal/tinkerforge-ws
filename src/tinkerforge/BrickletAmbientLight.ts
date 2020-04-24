import { BrickletAmbientLight as TFBrickletAmbientLight } from 'tinkerforge';
import { IPConnection } from './IPConnection';
import { EventEmitter } from 'events';

export interface BrickletAmbientLight {
  on(event: 'illuminance', listener: (illuminance: number) => void): this;
  on(event: 'analogValue', listener: (value: number) => void): this;
  on(
    event: 'illuminanceReached',
    listener: (illuminance: number) => void,
  ): this;
  on(event: 'analogValueReached', listener: (value: number) => void): this;
}

export class BrickletAmbientLight extends EventEmitter {
  private _originalBricklet: TFBrickletAmbientLight;

  public static DEVICE_DISPLAY_NAME =
    TFBrickletAmbientLight.DEVICE_DISPLAY_NAME;
  public static DEVICE_IDENTIFIER = TFBrickletAmbientLight.DEVICE_IDENTIFIER;

  constructor(uid: string, ipConnection: IPConnection) {
    super();

    this._originalBricklet = new TFBrickletAmbientLight(
      uid,
      ipConnection.originalIPConnection,
    );
    this._originalBricklet.on(
      TFBrickletAmbientLight.CALLBACK_ILLUMINANCE,
      this._onIlluminance.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletAmbientLight.CALLBACK_ANALOG_VALUE,
      this._onAnalogValue.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletAmbientLight.CALLBACK_ILLUMINANCE_REACHED,
      this._onIlluminanceReached.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletAmbientLight.CALLBACK_ANALOG_VALUE_REACHED,
      this._onAnalogValueReached.bind(this),
    );
  }

  getIlluminance(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getIlluminance(
        (illuminance: number) => {
          return resolve(illuminance);
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

  setIlluminanceCallbackPeriod(period: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setIlluminanceCallbackPeriod(
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

  getIlluminanceCallbackPeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getIlluminanceCallbackPeriod(
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

  setIlluminanceCallbackThreshold(
    option: string,
    min: number,
    max: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setIlluminanceCallbackThreshold(
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

  getIlluminanceCallbackThreshold(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getIlluminanceCallbackThreshold(
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

  private _onIlluminance(illuminance: number): void {
    if (this.listenerCount('illuminance') >= 0) {
      this.emit('illuminance', illuminance);
    }
  }

  private _onAnalogValue(value: number): void {
    if (this.listenerCount('analogValue') >= 0) {
      this.emit('analogValue', value);
    }
  }

  private _onIlluminanceReached(illuminance: number): void {
    if (this.listenerCount('illuminanceReached') >= 0) {
      this.emit('illuminanceReached', illuminance);
    }
  }

  private _onAnalogValueReached(value: number): void {
    if (this.listenerCount('analogValueReached') >= 0) {
      this.emit('analogValueReached', value);
    }
  }
}
