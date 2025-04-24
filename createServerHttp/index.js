const http = require('http');

const server = http.createServer((req, res) => {
  // Set common headers
  res.setHeader('Content-Type', 'application/json');

  // Simple routing
  if (req.url === '/api' && req.method === 'GET') {
    const data = {
      message: 'Hello from API!',
      time: new Date()
    };
    res.writeHead(200);
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
