const redis = require("redis");
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors())
const publisher = redis.createClient();
const subscriber = redis.createClient();

subscriber.subscribe('my-channel');

app.get('/events', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });

    subscriber.on('message', (channel, message) => {
        res.write(`data: ${message}\n\n`);
    });
    
    req.on('close', () => {
        subscriber.removeAllListeners('message');
    });
});


app.post('/publish', (req, res) => {
    publisher.publish('my-channel', 'Hello from Redis!');
    res.sendStatus(200);
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))