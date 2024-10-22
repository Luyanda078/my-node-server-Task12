// Import the http module
const http = require('http');

// Define the hostname and port
const hostname = '127.0.0.1'; // localhost
const port = 3000; // Port number

// Create the server
const server = http.createServer((req, res) => {
    // Set the response header for JSON content
    res.setHeader('Content-Type', 'application/json');

    // Define routes
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Welcome to the Node.js server!' }));
    } else if (req.method === 'PUT' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Successfully updated!', data: JSON.parse(body) }));
        });
    } else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.statusCode = 201; // 201 Created
            res.end(JSON.stringify({ message: 'Successfully created!', data: JSON.parse(body) }));
        });
    } else if (req.method === 'DELETE' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Successfully deleted!', data: JSON.parse(body) }));
        });
    } else {
        // Handle 404 Not Found
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
