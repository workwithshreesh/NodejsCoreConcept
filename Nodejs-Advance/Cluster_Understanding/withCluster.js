const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary PID: ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

} else {
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });

    app.get('/heavy', (req, res) => {
    const start = Date.now();
    let count = 0;
    for (let i = 0; i < 1e8; i++) {
        count += i;
    }
    const end = Date.now();
    res.send(`Heavy task completed in ${end - start}ms on PID: ${process.pid}`);
});


    app.listen(3000, () => {
        console.log(`Worker ${process.pid} running at http://localhost:3000`);
    });
}
