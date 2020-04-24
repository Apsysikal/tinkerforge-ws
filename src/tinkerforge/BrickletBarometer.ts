import { BrickletBarometer as TFBrickletBarometer } from 'tinkerforge';
import { IPConnection } from './IPConnection';
import { EventEmitter } from 'events';

export interface BrickletBarometer {
  on(event: 'airPressure', listener: (airPressure: number) => void): this;
  on(event: 'altitude', listener: (altitude: number) => void): this;
  on(
    event: 'airPressureReached',
    listener: (airPressure: number) => void,
  ): this;
  on(event: 'altitudeReached', listener: (altitude: number) => void): this;
}

export class BrickletBarometer extends EventEmitter {
  private _originalBricklet: TFBrickletBarometer;

  public static DEVICE_DISPLAY_NAME = TFBrickletBarometer.DEVICE_DISPLAY_NAME;
  public static DEVICE_IDENTIFIER = TFBrickletBarometer.DEVICE_IDENTIFIER;

  constructor(uid: string, ipConnection: IPConnection) {
    super();

    this._originalBricklet = new TFBrickletBarometer(
      uid,
      ipConnection.originalIPConnection,
    );
    this._originalBricklet.on(
      TFBrickletBarometer.CALLBACK_AIR_PRESSURE,
      this._onAirPressure.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletBarometer.CALLBACK_ALTITUDE,
      this._onAltitude.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletBarometer.CALLBACK_AIR_PRESSURE_REACHED,
      this._onAirPressureReached.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletBarometer.CALLBACK_ALTITUDE_REACHED,
      this._onAltitudeReached.bind(this),
    );
  }

  getAirPressure(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAirPressure(
        (airPressure: number) => {
          return resolve(airPressure);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getAltitude(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAltitude(
        (altitude: number) => {
          return resolve(altitude);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setReferenceAirPressure(airPressure: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setReferenceAirPressure(
        airPressure,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getReferenceAirPressure(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getReferenceAirPressure(
        (airPressure: number) => {
          return resolve(airPressure);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getChipTemperature(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getChipTemperature(
        (temperature: number) => {
          return resolve(temperature);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setAveraging(
    movingAveragePressure: number,
    averagePressure: number,
    averageTemperature: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAveraging(
        movingAveragePressure,
        averagePressure,
        averageTemperature,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getAveraging(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAveraging(
        (
          movingAveragePressure: number,
          averagePressure: number,
          averageTemperature: number,
        ) => {
          return resolve({
            movingAveragePressure: movingAveragePressure,
            averagePressure: averagePressure,
            averageTemperature: averageTemperature,
          });
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

  setAirPressureCallbackPeriod(period: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAirPressureCallbackPeriod(
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

  getAirPressureCallbackPeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAirPressureCallbackPeriod(
        (period: number) => {
          return resolve(period);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setAltitudeCallbackPeriod(period: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAltitudeCallbackPeriod(
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

  getAltitudeCallbackPeriod(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAltitudeCallbackPeriod(
        (period: number) => {
          return resolve(period);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setAirPressureCallbackThreshold(
    option: string,
    min: number,
    max: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAirPressureCallbackThreshold(
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

  getAirPressureCallbackThreshold(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAirPressureCallbackThreshold(
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

  setAltitudeCallbackThreshold(
    option: string,
    min: number,
    max: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setAltitudeCallbackThreshold(
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

  getAltitudeCallbackThreshold(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getAltitudeCallbackThreshold(
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

  private _onAirPressure(airPressure: number): void {
    if (this.listenerCount('airPressure') >= 0) {
      this.emit('airPressure', airPressure);
    }
  }

  private _onAltitude(altitude: number): void {
    if (this.listenerCount('altitude') >= 0) {
      this.emit('altitude', altitude);
    }
  }

  private _onAirPressureReached(airPressure: number): void {
    if (this.listenerCount('airPressure') >= 0) {
      this.emit('airPressure', airPressure);
    }
  }

  private _onAltitudeReached(altitude: number): void {
    if (this.listenerCount('altitude') >= 0) {
      this.emit('altitude', altitude);
    }
  }
}
