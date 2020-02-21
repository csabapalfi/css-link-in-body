const url = require('url');

module.exports = (request, response) => {
  const {query} = url.parse(request.url, true);
  const {delay = 0, index, color} = query;
  setTimeout(() => {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(`
      div:nth-of-type(${index}) {
        background-color: ${color}
      }`
    );
  }, delay);
}