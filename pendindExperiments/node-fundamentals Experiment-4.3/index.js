const http = require('http');

const handler = (req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Sujal \n');
}
const server = http.createServer(handler);

const port = 3000;
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});