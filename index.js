const http = require('http');
const {createReadStream} = require('fs');
const url = require('url');

function sendFile(response, path, contentType) {
  response.writeHead(200, {'Content-Type': contentType});
  createReadStream(path).pipe(response);
}

function sendStyles(response, {delay = 0, index, color}) {
  setTimeout(() => {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(`
      div:nth-of-type(${index}) {
        background-color: ${color}
      }`
    );
  }, delay);
}


const server = http.createServer((request, response) => {
  const {url: path, method} = request;
  console.log(method, path);

  const {pathname, query} = url.parse(path, true);
  switch(pathname) {
    case '/':
      sendFile(response, 'index.html', 'text/html');
    break;
    case '/favicon.ico':
      sendFile(response, 'favicon.ico', 'image/x-icon');
    break;
    case '/test.css':
      sendStyles(response, query);
      break;
    default:
      response.writeHead(404);
      response.end();
  }
});

server.on('error', (err) => console.error(err));
server.listen(8080);