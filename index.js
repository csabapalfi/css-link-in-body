const {createReadStream, readFileSync} = require('fs');
const url = require('url');

const htmlTemplate = `
<!doctype html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>CSS link in body test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>
        body {
            margin: 0;
        }
        div {
            width: 100vw;
            height: 20vh;
        }
    </style>
    </head>

    <body>
        {content}
    </body>

</html>
`

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
        ${scripts ? '<script> </script>' : ''}<div></div>`
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


const handler = (request, response) => {
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
}
module.exports = handler;

if (require.main === module) {
  const http = require('http');
  const server = http.createServer(handler);
  server.on('error', (err) => console.error(err));
  server.listen(8080);
}