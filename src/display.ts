import { BrickletLCD20x4, IPConnection } from 'tinkerforge';
import { EventEmitter } from 'events';

export enum DisplayLine {
  LINE_ONE = 0,
  LINE_TWO = 1,
  LINE_THREE = 2,
  LINE_FOUR = 3,
}

export enum ButtonNumber {
  BUTTON_ONE = 0,
  BUTTON_TWO = 1,
  BUTTON_THREE = 2,
  BUTTON_FOUR = 3,
}

export enum BacklightState {
  ON = 0,
  OFF = 1,
}

export interface Display {
  on(event: 'buttonPressed', listener: (button: ButtonNumber) => void): this;
  on(event: 'buttonReleased', listener: (button: ButtonNumber) => void): this;
}

export class Display extends EventEmitter {
  private _display: BrickletLCD20x4;
  private _uid: string;
  private _connectedUid: string;
  private _position: string;
  private _hardwareVersion: [number];
  private _firmwareVersion: [number];

  constructor(
    uid: string,
    connectedUid: string,
    position: string,
    hardwareVersion: [number],
    firmwareVersion: [number],
    ipConnection: IPConnection,
  ) {
    super();
    this._display = new BrickletLCD20x4(uid, ipConnection);
    this._uid = uid;
    this._connectedUid = connectedUid;
    this._position = position;
    this._hardwareVersion = hardwareVersion;
    this._firmwareVersion = firmwareVersion;
    this._registerCallbacks();
    this.clearDisplay();
    this.setBacklightState(BacklightState.ON);
    console.info(`New ${BrickletLCD20x4.DEVICE_DISPLAY_NAME}`);
  }

  getDisplayInformation(): string[] {
    return [
      `UID: ${this._uid}\n`,
      `Connected UID: ${this._connectedUid}\n`,
      `Position: ${this._position}\n`,
      `Hardware Version: ${this._hardwareVersion}\n`,
      `Firmware Version: ${this._firmwareVersion}\n`,
    ];
  }

  private _onButtonPressed(button: number): void {
    if (this.listeners('buttonPressed').length > 0) {
      this.emit('buttonPressed', button);
    }
  }

  private _onButtonReleased(button: number): void {
    if (this.listeners('buttonReleased)').length > 0) {
      this.emit('buttonReleased', button);
    }
  }

  private _registerCallbacks(): void {
    this._display.on(
      BrickletLCD20x4.CALLBACK_BUTTON_PRESSED,
      this._onButtonPressed.bind(this),
    );

    this._display.on(
      BrickletLCD20x4.CALLBACK_BUTTON_RELEASED,
      this._onButtonReleased.bind(this),
    );
  }

  clearDisplay(): void {
    this._display.clearDisplay();
  }

  setBacklightState(state: BacklightState): void {
    if (state === BacklightState.ON) {
      return this._display.backlightOn();
    }

    if (state === BacklightState.OFF) {
      return this._display.backlightOff();
    }
  }

  switchBackLightState(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this._display.isBacklightOn((currentStateIsOn: boolean) => {
          if (currentStateIsOn) {
            this.setBacklightState(BacklightState.OFF);
          } else {
            this.setBacklightState(BacklightState.ON);
          }

          return resolve();
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  writeLine(line: DisplayLine, position: number, text: string): void {
    this._display.writeLine(line, position, text);
  }
}
