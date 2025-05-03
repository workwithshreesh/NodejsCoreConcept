const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const socketHandler = require('./websocket/socketHandler');

app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});

let items = []; //in memory db
let sockets = [];

wss.on('connection', (ws) => {
    console.log('client connection via websocket');
    socketHandler(ws, wss)
});


// Helper function to brodcast
function broadcast(data){
    sockets.forEach(s => {
        if(s.readyState === WebSocket.OPEN){
            s.send(JSON.stringify(data))
        }
    });
}

app.listen(process.env.PORT,()=>console.log(`Server is started... on port ${process.env.PORT}`));