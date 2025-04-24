const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from single-threaded Express!');
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
    console.log(`Server running at http://localhost:3000 with PID: ${process.pid}`);
});
