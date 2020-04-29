import { IPConnection as TFIPConnection } from 'tinkerforge';
import { EventEmitter } from 'events';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPConnection {
  on(event: 'connected', listener: (connectReason: number) => void): this;
  on(event: 'disconnected', listener: (disconnectReason: number) => void): this;
  on(
    event: 'enumerate',
    listener: (
      uid: string,
      connectedUid: string,
      position: string,
      hardwareVersion: [number, number, number],
      firmwareVersion: [number, number, number],
      deviceIdentifier: number,
      enumerationType: number,
    ) => void,
  ): this;
}

export class IPConnection extends EventEmitter {
  private _originalIPConnection: TFIPConnection;

  get originalIPConnection(): TFIPConnection {
    return this._originalIPConnection;
  }

  constructor() {
    super();
    this._originalIPConnection = new TFIPConnection();
    this._originalIPConnection.on(
      TFIPConnection.CALLBACK_CONNECTED,
      this._onConnected.bind(this),
    );
    this._originalIPConnection.on(
      TFIPConnection.CALLBACK_DISCONNECTED,
      this._onDisconnected.bind(this),
    );
    this._originalIPConnection.on(
      TFIPConnection.CALLBACK_ENUMERATE,
      this._onEnumerate.bind(this),
    );
  }

  /**
   * Connects to the brickv service.
   * IMPORTANT: This promise always resolves. To make sure there is a
   * successful connection before using the connection use the 'connect' event.
   * @param host Host of the brickv service.
   * @param port Port of the brickv service.
   */
  connect(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalIPConnection.connect(host, port, (error) => {
        return reject(error);
      });

      return resolve();
    });
  }

  /**
   * Disconnects from the brickv service.
   * IMPORTANT: This promise always resolves. To make sure the connection
   * is successfully close use the 'disconnect' event.
   */
  disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalIPConnection.disconnect((error) => {
        return reject(error);
      });

      return resolve();
    });
  }

  authenticate(secret: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalIPConnection.authenticate(
        secret,
        () => {
          return resolve();
        },
        (error) => {
          return reject(error);
        },
      );
    });
  }

  getConnectionState(): number {
    return this._originalIPConnection.getConnectionState();
  }

  setAutoReconnect(autoReconnect: boolean): void {
    return this._originalIPConnection.setAutoReconnect(autoReconnect);
  }

  getAutoReconnect(): boolean {
    return this._originalIPConnection.getAutoReconnect();
  }

  setTimeout(timeout: number): void {
    return this._originalIPConnection.setTimeout(timeout);
  }

  getTimeout(): number {
    return this._originalIPConnection.getTimeout();
  }

  enumerate(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._originalIPConnection.enumerate((error) => {
        return reject(error);
      });

      return resolve();
    });
  }

  private _onConnected(connectReason: number): void {
    if (this.listenerCount('connected') >= 0) {
      this.emit('connected', connectReason);
    }
  }

  private _onDisconnected(connectReason: number): void {
    if (this.listenerCount('disconnected') >= 0) {
      this.emit('disconnected', connectReason);
    }
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
    if (this.listenerCount('enumerate') >= 0) {
      this.emit(
        'enumerate',
        uid,
        connectedUid,
        position,
        hardwareVersion,
        firmwareVersion,
        deviceIdentifier,
        enumerationType,
      );
    }
  }
}
