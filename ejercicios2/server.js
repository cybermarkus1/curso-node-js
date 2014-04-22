var http = require("http");

var server = http.createServer();

server.on("request", function(req, res) {
  res.end("Hola, Mundo");
});
server.listen(3000);