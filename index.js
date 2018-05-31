const http = require('http');
const {createReadStream, readFileSync} = require('fs');
const url = require('url');

const htmlTemplate = readFileSync('index.html', 'utf-8');

function sendFile(response, path, contentType) {
  response.writeHead(200, {'Content-Type': contentType});
  createReadStream(path).pipe(response);
}


const colors = ["thistle", "cornflowerblue", "springgreen", "peru", "fuchsia"];
function sendHtml(response, scripts) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(
    htmlTemplate.replace(
      '{content}',
      colors.map((color, index) => `
        <link rel="stylesheet" href="test.css?index=${index + 1}&delay=${index * 1000}&color=${color}" />
        <div></div>${scripts ? '<script> </script>' : ''}`
      ).join('\n')
    )
  );
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
      sendHtml(response, !!query.scripts);
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