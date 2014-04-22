var http = require("http"),
  url = require('url'),
  // inspect convierte obj en un string NO OLVIDAR EL INSPECT
  inspect = require('util').inspect;


var server = http.createServer();

server.on("request", function(req, res) {
  var date = new Date();
  // res.end('la hora es: '+ date.getHours);
  // devuelve la url parseada
  var urlData = url.parse(req.url, true);
  res.end(inspect(urlData, {colors: false} ) );
});
server.listen(3000);