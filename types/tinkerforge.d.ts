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
    constructor();
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
     * IPConnection.CONNECTION_STATE_DISCONNECTED = 0: No connection is established.
     * IPConnection.CONNECTION_STATE_CONNECTED = 1: A connection to the Brick Daemon or the WIFI/Ethernet Extension is established.
     * IPConnection.CONNECTION_STATE_PENDING = 2: IP Connection is currently trying to connect.
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
     * Default timeout is 2500.
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
    /**
     * Callbacks can be registered to be notified about events. The registration is done with the on() function. The first parameter is the callback ID and the second parameter the callback function.
     * @param id
     * @param returnCallback
     */
    on(id: number, returnCallback: (params: unknown) => void): void;
  }

  export namespace BrickMaster {
    const CALLBACK_STACK_CURRENT: number;
    const CALLBACK_STACK_CURRENT_REACHED: number;
    const CALLBACK_STACK_VOLTAGE: number;
    const CALLBACK_STACK_VOLTAGE_REACHED: number;
    const CALLBACK_USB_VOLTAGE: number;
    const CALLBACK_USB_VOLTAGE_REACHED: number;
    const CHIBI_FREQUENCY_BPSK40_915_MHZ: number;
    const CHIBI_FREQUENCY_OQPSK_780_MHZ: number;
    const CHIBI_FREQUENCY_OQPSK_868_MHZ: number;
    const CHIBI_FREQUENCY_OQPSK_915_MHZ: number;
    const COMMUNICATION_METHOD_CHIBI: number;
    const COMMUNICATION_METHOD_ETHERNET: number;
    const COMMUNICATION_METHOD_NONE: number;
    const COMMUNICATION_METHOD_RS485: number;
    const COMMUNICATION_METHOD_SPI_STACK: number;
    const COMMUNICATION_METHOD_USB: number;
    const COMMUNICATION_METHOD_WIFI: number;
    const COMMUNICATION_METHOD_WIFI_V2: number;
    const CONNECTION_TYPE_CHIBI: number;
    const CONNECTION_TYPE_ETHERNET: number;
    const CONNECTION_TYPE_NONE: number;
    const CONNECTION_TYPE_RS485: number;
    const CONNECTION_TYPE_SPI_STACK: number;
    const CONNECTION_TYPE_USB: number;
    const CONNECTION_TYPE_WIFI: number;
    const CONNECTION_TYPE_WIFI2: number;
    const DEVICE_DISPLAY_NAME: string;
    const DEVICE_IDENTIFIER: number;
    const ETHERNET_CONNECTION_DHCP: number;
    const ETHERNET_CONNECTION_STATIC_IP: number;
    const EXTENSION_TYPE_CHIBI: number;
    const EXTENSION_TYPE_ETHERNET: number;
    const EXTENSION_TYPE_RS485: number;
    const EXTENSION_TYPE_WIFI: number;
    const EXTENSION_TYPE_WIFI2: number;
    const FUNCTION_DISABLE_STATUS_LED: number;
    const FUNCTION_DISABLE_WIFI2_STATUS_LED: number;
    const FUNCTION_ENABLE_STATUS_LED: number;
    const FUNCTION_ENABLE_WIFI2_STATUS_LED: number;
    const FUNCTION_GET_BRICKLETS_ENABLED: number;
    const FUNCTION_GET_CHIBI_ADDRESS: number;
    const FUNCTION_GET_CHIBI_CHANNEL: number;
    const FUNCTION_GET_CHIBI_ERROR_LOG: number;
    const FUNCTION_GET_CHIBI_FREQUENCY: number;
    const FUNCTION_GET_CHIBI_MASTER_ADDRESS: number;
    const FUNCTION_GET_CHIBI_SIGNAL_STRENGTH: number;
    const FUNCTION_GET_CHIBI_SLAVE_ADDRESS: number;
    const FUNCTION_GET_CHIP_TEMPERATURE: number;
    const FUNCTION_GET_CONNECTION_TYPE: number;
    const FUNCTION_GET_DEBOUNCE_PERIOD: number;
    const FUNCTION_GET_ETHERNET_AUTHENTICATION_SECRET: number;
    const FUNCTION_GET_ETHERNET_CONFIGURATION: number;
    const FUNCTION_GET_ETHERNET_STATUS: number;
    const FUNCTION_GET_ETHERNET_WEBSOCKET_CONFIGURATION: number;
    const FUNCTION_GET_EXTENSION_TYPE: number;
    const FUNCTION_GET_IDENTITY: number;
    const FUNCTION_GET_LONG_WIFI_KEY: number;
    const FUNCTION_GET_PROTOCOL1_BRICKLET_NAME: number;
    const FUNCTION_GET_RS485_ADDRESS: number;
    const FUNCTION_GET_RS485_CONFIGURATION: number;
    const FUNCTION_GET_RS485_ERROR_LOG: number;
    const FUNCTION_GET_RS485_SLAVE_ADDRESS: number;
    const FUNCTION_GET_SEND_TIMEOUT_COUNT: number;
    const FUNCTION_GET_SPITFP_BAUDRATE: number;
    const FUNCTION_GET_SPITFP_BAUDRATE_CONFIG: number;
    const FUNCTION_GET_SPITFP_ERROR_COUNT: number;
    const FUNCTION_GET_STACK_CURRENT: number;
    const FUNCTION_GET_STACK_CURRENT_CALLBACK_PERIOD: number;
    const FUNCTION_GET_STACK_CURRENT_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_STACK_VOLTAGE: number;
    const FUNCTION_GET_STACK_VOLTAGE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_STACK_VOLTAGE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_USB_VOLTAGE: number;
    const FUNCTION_GET_USB_VOLTAGE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_USB_VOLTAGE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_WIFI2_AP_CONFIGURATION: number;
    const FUNCTION_GET_WIFI2_AP_PASSWORD: number;
    const FUNCTION_GET_WIFI2_AUTHENTICATION_SECRET: number;
    const FUNCTION_GET_WIFI2_CLIENT_CONFIGURATION: number;
    const FUNCTION_GET_WIFI2_CLIENT_HOSTNAME: number;
    const FUNCTION_GET_WIFI2_CLIENT_PASSWORD: number;
    const FUNCTION_GET_WIFI2_CONFIGURATION: number;
    const FUNCTION_GET_WIFI2_FIRMWARE_VERSION: number;
    const FUNCTION_GET_WIFI2_MESH_AP_STATUS: number;
    const FUNCTION_GET_WIFI2_MESH_CLIENT_STATUS: number;
    const FUNCTION_GET_WIFI2_MESH_COMMON_STATUS: number;
    const FUNCTION_GET_WIFI2_MESH_CONFIGURATION: number;
    const FUNCTION_GET_WIFI2_MESH_ROUTER_PASSWORD: number;
    const FUNCTION_GET_WIFI2_MESH_ROUTER_SSID: number;
    const FUNCTION_GET_WIFI2_STATUS: number;
    const FUNCTION_GET_WIFI_AUTHENTICATION_SECRET: number;
    const FUNCTION_GET_WIFI_BUFFER_INFO: number;
    const FUNCTION_GET_WIFI_CERTIFICATE: number;
    const FUNCTION_GET_WIFI_CONFIGURATION: number;
    const FUNCTION_GET_WIFI_ENCRYPTION: number;
    const FUNCTION_GET_WIFI_HOSTNAME: number;
    const FUNCTION_GET_WIFI_POWER_MODE: number;
    const FUNCTION_GET_WIFI_REGULATORY_DOMAIN: number;
    const FUNCTION_GET_WIFI_STATUS: number;
    const FUNCTION_IS_CHIBI_PRESENT: number;
    const FUNCTION_IS_ETHERNET_PRESENT: number;
    const FUNCTION_IS_RS485_PRESENT: number;
    const FUNCTION_IS_STATUS_LED_ENABLED: number;
    const FUNCTION_IS_WIFI2_PRESENT: number;
    const FUNCTION_IS_WIFI2_STATUS_LED_ENABLED: number;
    const FUNCTION_IS_WIFI_PRESENT: number;
    const FUNCTION_READ_BRICKLET_PLUGIN: number;
    const FUNCTION_READ_WIFI2_SERIAL_PORT: number;
    const FUNCTION_REFRESH_WIFI_STATUS: number;
    const FUNCTION_RESET: number;
    const FUNCTION_SAVE_WIFI2_CONFIGURATION: number;
    const FUNCTION_SET_BRICKLETS_ENABLED: number;
    const FUNCTION_SET_BRICKLET_XMC_FLASH_CONFIG: number;
    const FUNCTION_SET_BRICKLET_XMC_FLASH_DATA: number;
    const FUNCTION_SET_CHIBI_ADDRESS: number;
    const FUNCTION_SET_CHIBI_CHANNEL: number;
    const FUNCTION_SET_CHIBI_FREQUENCY: number;
    const FUNCTION_SET_CHIBI_MASTER_ADDRESS: number;
    const FUNCTION_SET_CHIBI_SLAVE_ADDRESS: number;
    const FUNCTION_SET_DEBOUNCE_PERIOD: number;
    const FUNCTION_SET_ETHERNET_AUTHENTICATION_SECRET: number;
    const FUNCTION_SET_ETHERNET_CONFIGURATION: number;
    const FUNCTION_SET_ETHERNET_HOSTNAME: number;
    const FUNCTION_SET_ETHERNET_MAC_ADDRESS: number;
    const FUNCTION_SET_ETHERNET_WEBSOCKET_CONFIGURATION: number;
    const FUNCTION_SET_EXTENSION_TYPE: number;
    const FUNCTION_SET_LONG_WIFI_KEY: number;
    const FUNCTION_SET_RS485_ADDRESS: number;
    const FUNCTION_SET_RS485_CONFIGURATION: number;
    const FUNCTION_SET_RS485_SLAVE_ADDRESS: number;
    const FUNCTION_SET_SPITFP_BAUDRATE: number;
    const FUNCTION_SET_SPITFP_BAUDRATE_CONFIG: number;
    const FUNCTION_SET_STACK_CURRENT_CALLBACK_PERIOD: number;
    const FUNCTION_SET_STACK_CURRENT_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_STACK_VOLTAGE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_STACK_VOLTAGE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_USB_VOLTAGE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_USB_VOLTAGE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_WIFI2_AP_CONFIGURATION: number;
    const FUNCTION_SET_WIFI2_AP_PASSWORD: number;
    const FUNCTION_SET_WIFI2_AUTHENTICATION_SECRET: number;
    const FUNCTION_SET_WIFI2_CLIENT_CONFIGURATION: number;
    const FUNCTION_SET_WIFI2_CLIENT_HOSTNAME: number;
    const FUNCTION_SET_WIFI2_CLIENT_PASSWORD: number;
    const FUNCTION_SET_WIFI2_CONFIGURATION: number;
    const FUNCTION_SET_WIFI2_MESH_CONFIGURATION: number;
    const FUNCTION_SET_WIFI2_MESH_ROUTER_PASSWORD: number;
    const FUNCTION_SET_WIFI2_MESH_ROUTER_SSID: number;
    const FUNCTION_SET_WIFI_AUTHENTICATION_SECRET: number;
    const FUNCTION_SET_WIFI_CERTIFICATE: number;
    const FUNCTION_SET_WIFI_CONFIGURATION: number;
    const FUNCTION_SET_WIFI_ENCRYPTION: number;
    const FUNCTION_SET_WIFI_HOSTNAME: number;
    const FUNCTION_SET_WIFI_POWER_MODE: number;
    const FUNCTION_SET_WIFI_REGULATORY_DOMAIN: number;
    const FUNCTION_START_WIFI2_BOOTLOADER: number;
    const FUNCTION_WRITE_BRICKLET_PLUGIN: number;
    const FUNCTION_WRITE_WIFI2_SERIAL_PORT: number;
    const RS485_PARITY_EVEN: string;
    const RS485_PARITY_NONE: string;
    const RS485_PARITY_ODD: string;
    const THRESHOLD_OPTION_GREATER: string;
    const THRESHOLD_OPTION_INSIDE: string;
    const THRESHOLD_OPTION_OFF: string;
    const THRESHOLD_OPTION_OUTSIDE: string;
    const THRESHOLD_OPTION_SMALLER: string;
    const WIFI2_AP_ENCRYPTION_OPEN: number;
    const WIFI2_AP_ENCRYPTION_WEP: number;
    const WIFI2_AP_ENCRYPTION_WPA2_PSK: number;
    const WIFI2_AP_ENCRYPTION_WPA_PSK: number;
    const WIFI2_AP_ENCRYPTION_WPA_WPA2_PSK: number;
    const WIFI2_CLIENT_STATUS_CONNECTING: number;
    const WIFI2_CLIENT_STATUS_CONNECT_FAILED: number;
    const WIFI2_CLIENT_STATUS_GOT_IP: number;
    const WIFI2_CLIENT_STATUS_IDLE: number;
    const WIFI2_CLIENT_STATUS_NO_AP_FOUND: number;
    const WIFI2_CLIENT_STATUS_UNKNOWN: number;
    const WIFI2_CLIENT_STATUS_WRONG_PASSWORD: number;
    const WIFI2_MESH_STATUS_AP_AVAILABLE: number;
    const WIFI2_MESH_STATUS_AP_SETUP: number;
    const WIFI2_MESH_STATUS_DISABLED: number;
    const WIFI2_MESH_STATUS_GOT_IP: number;
    const WIFI2_MESH_STATUS_LEAF_AVAILABLE: number;
    const WIFI2_MESH_STATUS_MESH_LOCAL: number;
    const WIFI2_MESH_STATUS_MESH_ONLINE: number;
    const WIFI2_MESH_STATUS_WIFI_CONNECTING: number;
    const WIFI2_PHY_MODE_B: number;
    const WIFI2_PHY_MODE_G: number;
    const WIFI2_PHY_MODE_N: number;
    const WIFI_CONNECTION_ACCESS_POINT_DHCP: number;
    const WIFI_CONNECTION_ACCESS_POINT_STATIC_IP: number;
    const WIFI_CONNECTION_AD_HOC_DHCP: number;
    const WIFI_CONNECTION_AD_HOC_STATIC_IP: number;
    const WIFI_CONNECTION_DHCP: number;
    const WIFI_CONNECTION_STATIC_IP: number;
    const WIFI_DOMAIN_CHANNEL_1TO11: number;
    const WIFI_DOMAIN_CHANNEL_1TO13: number;
    const WIFI_DOMAIN_CHANNEL_1TO14: number;
    const WIFI_EAP_OPTION_CERT_TYPE_CA_CERT: number;
    const WIFI_EAP_OPTION_CERT_TYPE_CLIENT_CERT: number;
    const WIFI_EAP_OPTION_CERT_TYPE_PRIVATE_KEY: number;
    const WIFI_EAP_OPTION_INNER_AUTH_EAP_GTC: number;
    const WIFI_EAP_OPTION_INNER_AUTH_EAP_MSCHAP: number;
    const WIFI_EAP_OPTION_OUTER_AUTH_EAP_FAST: number;
    const WIFI_EAP_OPTION_OUTER_AUTH_EAP_PEAP: number;
    const WIFI_EAP_OPTION_OUTER_AUTH_EAP_TLS: number;
    const WIFI_EAP_OPTION_OUTER_AUTH_EAP_TTLS: number;
    const WIFI_ENCRYPTION_NO_ENCRYPTION: number;
    const WIFI_ENCRYPTION_WEP: number;
    const WIFI_ENCRYPTION_WPA_ENTERPRISE: number;
    const WIFI_ENCRYPTION_WPA_WPA2: number;
    const WIFI_POWER_MODE_FULL_SPEED: number;
    const WIFI_POWER_MODE_LOW_POWER: number;
    const WIFI_STATE_ASSOCIATED: number;
    const WIFI_STATE_ASSOCIATING: number;
    const WIFI_STATE_DISASSOCIATED: number;
    const WIFI_STATE_ERROR: number;
    const WIFI_STATE_NOT_INITIALIZED_YET: number;

    class BrickMaster {
      constructor(uid: string, ipConnection: IPConnection);
      /**
       * Returns the stack voltage. The stack voltage is the voltage that is supplied via the stack, i.e. it is given by a Step-Down or Step-Up Power Supply.
       * @param returnCallback
       * @param errorCallback
       */
      getStackVoltage(
        returnCallback?: (voltage: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      /**
       * Returns the stack current. The stack current is the current that is drawn via the stack, i.e. it is given by a Step-Down or Step-Up Power Supply.
       * @param returnCallback
       * @param errorCallback
       */
      getStackCurrent(
        returnCallback?: (current: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      on(id: number, returnCallback: (params: unknown) => void): void;
    }
  }

  export namespace BrickletAmbientLight {
    const CALLBACK_ANALOG_VALUE: number;
    const CALLBACK_ANALOG_VALUE_REACHED: number;
    const CALLBACK_ILLUMINANCE: number;
    const CALLBACK_ILLUMINANCE_REACHED: number;
    const DEVICE_DISPLAY_NAME: string;
    const DEVICE_IDENTIFIER: number;
    const FUNCTION_GET_ANALOG_VALUE: number;
    const FUNCTION_GET_ANALOG_VALUE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_ANALOG_VALUE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_DEBOUNCE_PERIOD: number;
    const FUNCTION_GET_IDENTITY: number;
    const FUNCTION_GET_ILLUMINANCE: number;
    const FUNCTION_GET_ILLUMINANCE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_ILLUMINANCE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_ANALOG_VALUE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_ANALOG_VALUE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_DEBOUNCE_PERIOD: number;
    const FUNCTION_SET_ILLUMINANCE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_ILLUMINANCE_CALLBACK_THRESHOLD: number;
    const THRESHOLD_OPTION_GREATER: string;
    const THRESHOLD_OPTION_INSIDE: string;
    const THRESHOLD_OPTION_OFF: string;
    const THRESHOLD_OPTION_OUTSIDE: string;
    const THRESHOLD_OPTION_SMALLER: string;

    class BrickletAmbientLight {
      constructor(uid: string, ipConnection: IPConnection);
      getIlluminance(
        returnCallback?: (illuminance: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValue(
        returnCallback?: (value: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getIdentity(
        returnCallback?: (
          uid: string,
          connectedUid: string,
          position: string,
          hardwareVersion: [number],
          firmwareVersion: [number],
          deviceIdentifier: number,
        ) => void,
        errorCallback?: (error: number) => void,
      ): void;
      on(id: number, returnCallback: (params: unknown) => void): void;
      setIlluminanceCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getIlluminanceCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAnalogValueCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValueCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setIlluminanceCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getIlluminanceCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAnalogValueCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValueCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setDebouncePeriod(
        debounce: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getDebouncePeriod(
        returnCallback?: (debounce: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
    }
  }

  export namespace BrickletHumidity {
    const CALLBACK_ANALOG_VALUE: number;
    const CALLBACK_ANALOG_VALUE_REACHED: number;
    const CALLBACK_HUMIDITY: number;
    const CALLBACK_HUMIDITY_REACHED: number;
    const DEVICE_DISPLAY_NAME: string;
    const DEVICE_IDENTIFIER: number;
    const FUNCTION_GET_ANALOG_VALUE: number;
    const FUNCTION_GET_ANALOG_VALUE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_ANALOG_VALUE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_DEBOUNCE_PERIOD: number;
    const FUNCTION_GET_HUMIDITY: number;
    const FUNCTION_GET_HUMIDITY_CALLBACK_PERIOD: number;
    const FUNCTION_GET_HUMIDITY_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_IDENTITY: number;
    const FUNCTION_SET_ANALOG_VALUE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_ANALOG_VALUE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_DEBOUNCE_PERIOD: number;
    const FUNCTION_SET_HUMIDITY_CALLBACK_PERIOD: number;
    const FUNCTION_SET_HUMIDITY_CALLBACK_THRESHOLD: number;
    const THRESHOLD_OPTION_GREATER: string;
    const THRESHOLD_OPTION_INSIDE: string;
    const THRESHOLD_OPTION_OFF: string;
    const THRESHOLD_OPTION_OUTSIDE: string;
    const THRESHOLD_OPTION_SMALLER: string;

    class BrickletHumidity {
      constructor(uid: string, ipConnection: IPConnection);
      getHumidity(
        returnCallback?: (humidity: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValue(
        returnCallback?: (value: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getIdentity(
        returnCallback?: (
          uid: string,
          connectedUid: string,
          position: string,
          hardwareVersion: [number],
          firmwareVersion: [number],
          deviceIdentifier: number,
        ) => void,
        errorCallback?: (error: number) => void,
      ): void;
      on(id: number, returnCallback: (params: unknown) => void): void;
      setHumidityCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getHumidityCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAnalogValueCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValueCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setHumidityCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getHumidityCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAnalogValueCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAnalogValueCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setDebouncePeriod(
        debounce: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getDebouncePeriod(
        returnCallback?: (debounce: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
    }
  }

  export namespace BrickletBarometer {
    const CALLBACK_AIR_PRESSURE: number;
    const CALLBACK_AIR_PRESSURE_REACHED: number;
    const CALLBACK_ALTITUDE: number;
    const CALLBACK_ALTITUDE_REACHED: number;
    const DEVICE_DISPLAY_NAME: string;
    const DEVICE_IDENTIFIER: number;
    const FUNCTION_GET_AIR_PRESSURE: number;
    const FUNCTION_GET_AIR_PRESSURE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_AIR_PRESSURE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_ALTITUDE: number;
    const FUNCTION_GET_ALTITUDE_CALLBACK_PERIOD: number;
    const FUNCTION_GET_ALTITUDE_CALLBACK_THRESHOLD: number;
    const FUNCTION_GET_AVERAGING: number;
    const FUNCTION_GET_CHIP_TEMPERATURE: number;
    const FUNCTION_GET_DEBOUNCE_PERIOD: number;
    const FUNCTION_GET_IDENTITY: number;
    const FUNCTION_GET_REFERENCE_AIR_PRESSURE: number;
    const FUNCTION_SET_AIR_PRESSURE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_AIR_PRESSURE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_ALTITUDE_CALLBACK_PERIOD: number;
    const FUNCTION_SET_ALTITUDE_CALLBACK_THRESHOLD: number;
    const FUNCTION_SET_AVERAGING: number;
    const FUNCTION_SET_DEBOUNCE_PERIOD: number;
    const FUNCTION_SET_REFERENCE_AIR_PRESSURE: number;
    const THRESHOLD_OPTION_GREATER: string;
    const THRESHOLD_OPTION_INSIDE: string;
    const THRESHOLD_OPTION_OFF: string;
    const THRESHOLD_OPTION_OUTSIDE: string;
    const THRESHOLD_OPTION_SMALLER: string;

    class BrickletBarometer {
      constructor(uid: string, ipConnection: IPConnection);
      getAirPressure(
        returnCallback?: (airPressure: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAltitude(
        returnCallback?: (altitude: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setReferenceAirPressure(
        airPressure: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getReferenceAirPressure(
        returnCallback?: (airPressure: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getChipTemperature(
        returnCallback?: (temperature: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAveraging(
        movingAveragePressure: number,
        averagePressure: number,
        averageTemperature: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAveraging(
        returnCallback?: (
          movingAveragePressure: number,
          averagePressure: number,
          averageTemperature: number,
        ) => void,
        errorCallback?: (error: number) => void,
      ): void;
      getIdentity(
        returnCallback?: (
          uid: string,
          connectedUid: string,
          position: string,
          hardwareVersion: [number],
          firmwareVersion: [number],
          deviceIdentifier: number,
        ) => void,
        errorCallback?: (error: number) => void,
      ): void;
      on(id: number, returnCallback: (params: unknown) => void): void;
      setAirPressureCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAirPressureCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAltitudeCallbackPeriod(
        period: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAltitudeCallbackPeriod(
        returnCallback?: (period: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAirPressureCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAirPressureCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setAltitudeCallbackThreshold(
        option: string,
        min: number,
        max: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getAltitudeCallbackThreshold(
        returnCallback?: (option: string, min: number, max: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
      setDebouncePeriod(
        debounce: number,
        returnCallback?: () => void,
        errorCallback?: (error: number) => void,
      ): void;
      getDebouncePeriod(
        returnCallback?: (debounce: number) => void,
        errorCallback?: (error: number) => void,
      ): void;
    }
  }
}
