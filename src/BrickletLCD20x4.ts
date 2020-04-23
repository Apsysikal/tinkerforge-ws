import {
  IPConnection,
  BrickletLCD20x4 as TFBrickletLCD20x4,
} from 'tinkerforge';
import { EventEmitter } from 'events';

export interface BrickletLCD20x4 {
  on(event: 'buttonPressed', listener: (button: number) => void): this;
  on(event: 'buttonReleased', listener: (button: number) => void): this;
}

export class BrickletLCD20x4 extends EventEmitter {
  private _originalBricklet: TFBrickletLCD20x4;

  public static CALLBACK_BUTTON_PRESSED =
    TFBrickletLCD20x4.CALLBACK_BUTTON_PRESSED;
  public static CALLBACK_BUTTON_RELEASED =
    TFBrickletLCD20x4.CALLBACK_BUTTON_RELEASED;
  public static DEVICE_DISPLAY_NAME = TFBrickletLCD20x4.DEVICE_DISPLAY_NAME;
  public static DEVICE_IDENTIFIER = TFBrickletLCD20x4.DEVICE_IDENTIFIER;

  constructor(uid: string, ipConnection: IPConnection) {
    super();

    this._originalBricklet = new TFBrickletLCD20x4(uid, ipConnection);
    this._originalBricklet.on(
      TFBrickletLCD20x4.CALLBACK_BUTTON_PRESSED,
      this._onButtonPressed.bind(this),
    );
    this._originalBricklet.on(
      TFBrickletLCD20x4.CALLBACK_BUTTON_RELEASED,
      this._onButtonReleased.bind(this),
    );
  }

  writeLine(line: number, position: number, text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.writeLine(
        line,
        position,
        text,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  clearDisplay(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.clearDisplay(
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  backlightOn(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.backlightOn(
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  backlightOff(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.backlightOff(
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  isBacklightOn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.isBacklightOn(
        (backlight: boolean) => {
          return resolve(backlight);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setConfig(cursor: boolean, blinking: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setConfig(
        cursor,
        blinking,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getConfig(): Promise<object> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getConfig(
        (cursor: boolean, blinking: boolean) => {
          return resolve({ cursor: cursor, blinking: blinking });
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  isButtonPressed(button: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.isButtonPressed(
        button,
        (pressed: boolean) => {
          return resolve(pressed);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setCustomCharacter(index: number, character: [number]): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setCustomCharacter(
        index,
        character,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getCustomCharacter(index: number): Promise<[number]> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getCustomCharacter(
        index,
        (character: [number]) => {
          return resolve(character);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setDefaultText(line: number, text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setDefaultText(
        line,
        text,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getDefaultText(line: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getDefaultText(
        line,
        (text: string) => {
          return resolve(text);
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  setDefaultTextCounter(counter: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.setDefaultTextCounter(
        counter,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getDefaultTextCounter(): Promise<number> {
    return new Promise((resolve, reject) => {
      this._originalBricklet.getDefaultTextCounter(
        (counter: number) => {
          return resolve(counter);
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
            connectedUid: connectedUid,
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

  private _onButtonPressed(button: number): void {
    if (this.listenerCount('buttonPressed') >= 0) {
      this.emit('buttonPressed', button);
    }
  }

  private _onButtonReleased(button: number): void {
    if (this.listenerCount('buttonReleased') >= 0) {
      this.emit('buttonReleased', button);
    }
  }
}
