//Step 1: Import the http module
const http = require('http');
// Step 2: Define the hostname and port number
const hostname = 'localhost'; // localhost
const port = 3000; // Port number where the server will listen
// Step 3: Create the server
const server = http.createServer((req, res) => {
    // Step 4: Set the response header
    res.setHeader('Content-Type', 'application/json'); // Indicate that the response is in JSON format
    let body = '';
    // Collect data chunks for POST, PUT, DELETE requests
    req.on('data', chunk => {
        body += chunk.toString(); // Convert data chunk to string
    });
    req.on('end', () => {
        if (req.method === 'GET' && req.url === '/') {
            // Respond to GET requests to the root URL
            res.statusCode = 200; // HTTP status code 200 (OK)
            res.end(JSON.stringify({ message: 'Welcome to the Node.js server!' })); // Send response
        } else if (req.method === 'POST' && req.url === '/') {
            // Handle POST requests to root URL
            try {
                const data = JSON.parse(body);
                if (data.option === 'posting') {
                    res.statusCode = 201; // HTTP status code 201 (Created)
                    res.end(JSON.stringify({ message: 'Successfully created!', data: data })); // Respond with created data
                } else {
                    throw new Error('Invalid option for POST request. Expected { "option": "posting" }');
                }
            } catch (error) {
                res.statusCode = 400; // HTTP status code 400 (Bad Request)
                res.end(JSON.stringify({ error: error.message }));
            }
        } else if (req.method === 'PUT' && req.url === '/') {
            // Handle PUT requests to root URL
            try {
                const data = JSON.parse(body);
                if (data.option === 'update') {
                    res.statusCode = 200; // HTTP status code 200 (OK)
                    res.end(JSON.stringify({ message: 'Successfully updated!', data: data })); // Respond with updated data
                } else {
                    throw new Error('Invalid option for PUT request. Expected { "option": "update" }');
                }
            } catch (error) {
                res.statusCode = 400; // HTTP status code 400 (Bad Request)
                res.end(JSON.stringify({ error: error.message }));
            }
        } else if (req.method === 'DELETE' && req.url === '/') {
            // Handle DELETE requests to root URL
            try {
                const data = JSON.parse(body);
                if (data.option === 'removal') {
                    res.statusCode = 200; // HTTP status code 200 (OK)
                    res.end(JSON.stringify({ message: 'Successfully deleted!', data: data })); // Respond with deletion confirmation
                } else {
                    throw new Error('Invalid option for DELETE request. Expected { "option": "removal" }');
                }
            } catch (error) {
                res.statusCode = 400; // HTTP status code 400 (Bad Request)
                res.end(JSON.stringify({ error: error.message }));
            }
        } else {
            // Handle all other routes
            res.statusCode = 404; // HTTP status code 404 (Not Found)
            res.end(JSON.stringify({ message: 'Route not found' })); // Respond with an error message
        }
    });
});
// Step 6: Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`); // Log server startup
});
