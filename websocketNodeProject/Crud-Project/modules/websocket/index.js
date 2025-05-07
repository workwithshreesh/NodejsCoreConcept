const personSocketHandler = require('./socketHandler');

module.exports = (wss) => {
  wss.on('connection', (ws) => {
    console.log('WebSocket connected');

    personSocketHandler(ws, wss);

    ws.on('close', () => {
      console.log('WebSocket disconnected');
    });
  });
};
