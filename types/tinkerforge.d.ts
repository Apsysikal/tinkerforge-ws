/* eslint-disable @typescript-eslint/no-unused-vars */

declare module 'tinkerforge' {
  export namespace IPConnection {
    const BROADCAST_UID: number;

    const CALLBACK_CONNECTED: number;

    const CALLBACK_DISCONNECTED: number;

    const CALLBACK_ENUMERATE: number;

    const CONNECTION_STATE_CONNECTED: number;

    const CONNECTION_STATE_DISCONNECTED: number;

    const CONNECTION_STATE_PENDING: number;

    const CONNECT_REASON_AUTO_RECONNECT: number;

    const CONNECT_REASON_REQUEST: number;

    const DISCONNECT_PROBE_INTERVAL: number;

    const DISCONNECT_REASON_ERROR: number;

    const DISCONNECT_REASON_REQUEST: number;

    const DISCONNECT_REASON_SHUTDOWN: number;

    const ENUMERATION_TYPE_AVAILABLE: number;

    const ENUMERATION_TYPE_CONNECTED: number;

    const ENUMERATION_TYPE_DISCONNECTED: number;

    const ERROR_ALREADY_CONNECTED: number;

    const ERROR_CONNECT_FAILED: number;

    const ERROR_DEVICE_REPLACED: number;

    const ERROR_FUNCTION_NOT_SUPPORTED: number;

    const ERROR_INVALID_FUNCTION_ID: number;

    const ERROR_INVALID_PARAMETER: number;

    const ERROR_NON_ASCII_CHAR_IN_SECRET: number;

    const ERROR_NOT_CONNECTED: number;

    const ERROR_STREAM_OUT_OF_SYNC: number;

    const ERROR_TIMEOUT: number;

    const ERROR_UNKNOWN_ERROR: number;

    const ERROR_WRONG_DEVICE_TYPE: number;

    const ERROR_WRONG_RESPONSE_LENGTH: number;

    const FUNCTION_DISCONNECT_PROBE: number;

    const FUNCTION_ENUMERATE: number;

    const RETRY_CONNECTION_INTERVAL: number;

    const TASK_KIND_AUTHENTICATE: number;

    const TASK_KIND_AUTO_RECONNECT: number;

    const TASK_KIND_CONNECT: number;

    const TASK_KIND_DISCONNECT: number;
  }

  class IPConnection {
    /**
     * Creates a TCP/IP connection to the given host and port. The host and port can refer to a Brick Daemon or to a WIFI/Ethernet Extension.
     * Devices can only be controlled when the connection was established successfully.
     * @param host
     * @param port
     * @param errorCallback
     */
    connect(
      host: string,
      port: number,
      errorCallback?: (error: number) => void,
    ): void;
    /**
     * Disconnects the TCP/IP connection from the Brick Daemon or the WIFI/Ethernet Extension.
     * @param errorCallback
     */
    disconnect(errorCallback?: (error: number) => void): void;
    /**
     * Performs an authentication handshake with the connected Brick Daemon or WIFI/Ethernet Extension. If the handshake succeeds the connection switches from non-authenticated to authenticated state and communication can continue as normal. If the handshake fails then the connection gets closed. Authentication can fail if the wrong secret was used or if authentication is not enabled at all on the Brick Daemon or the WIFI/Ethernet Extension.
     * See the authentication tutorial for more information.
     * @param secret
     * @param returnCallback
     * @param errorCallback
     */
    authenticate(
      secret: string,
      returnCallback?: () => void,
      errorCallback?: (error: number) => void,
    ): void;
    /**
     * Can return the following states:
     *IPConnection.CONNECTION_STATE_DISCONNECTED = 0: No connection is established.
     *IPConnection.CONNECTION_STATE_CONNECTED = 1: A connection to the Brick Daemon or the WIFI/Ethernet Extension is established.
     *IPConnection.CONNECTION_STATE_PENDING = 2: IP Connection is currently trying to connect.
     */
    getConnectionState(): number;
    /**
     * Enables or disables auto-reconnect. If auto-reconnect is enabled, the IP Connection will try to reconnect to the previously given host and port, if the currently existing connection is lost. Therefore, auto-reconnect only does something after a successful connect() call.
     * Default value is true.
     * @param autoReconnect
     */
    setAutoReconnect(autoReconnect: boolean): void;
    /**
     * Returns true if auto-reconnect is enabled, false otherwise.
     */
    getAutoReconnect(): boolean;
    /**
     * Sets the timeout in milliseconds for getters and for setters for which the response expected flag is activated.
     *Default timeout is 2500.
     * @param timeout
     */
    setTimeout(timeout: number): void;
    /**
     * Returns the timeout as set by setTimeout().
     */
    getTimeout(): number;
    /**
     * Broadcasts an enumerate request. All devices will respond with an enumerate callback.
     * @param errorCallback
     */
    enumerate(errorCallback?: (error: number) => void): void;

    on(id: number, returnCallback: (params: unknown) => void): void;
  }
}
