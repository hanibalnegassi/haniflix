const io = require('socket.io-client');
const socketClient = io.connect('http://50.62.182.51:8800');

socketClient.on('connect', () => {
  socketClient.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});