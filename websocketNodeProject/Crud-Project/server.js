// server.js or app.js
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const socketRoute = require('./modules/websocket'); // Automatically picks index.js in /websocket


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Create HTTP server (to be shared by WebSocket and Express)
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// Attach WebSocket routes/handlers
socketRoute(wss);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
