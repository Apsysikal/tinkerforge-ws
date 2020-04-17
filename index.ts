import { IPConnection } from 'tinkerforge';

let ip: IPConnection;
ip = new IPConnection();
ip.connect('localhost', 4223);

ip.on(IPConnection.CALLBACK_ENUMERATE, () => {});

ip.on(IPConnection.CALLBACK_CONNECTED, () => {
  ip.enumerate();
});

ip.connect('localhost', 4223);
