const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

// Serve a static HTML file for testing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('🔌 Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);

        // Example: send back to client
        ws.send(`Server response: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
