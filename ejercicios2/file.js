var http = require("http"),
  url = require('url'),
  fs = require('fs'),
  // inspect convierte obj en un string
  inspect = require('util').inspect;


var server = http.createServer();

// Solucion profesor
function readFl(path, cb){
  fs.exists(path, function(exists) {
    if (exists) {
      fs.readFile(path,cb);
    }
    else {
      cb(new Error("file " + path + " not exist"));
    }
  });
}

server.on("request", function(req, res) {
  // devuelve la url parseada
  var urlData = url.parse(req.url);

  readFl("./" + urlData.pathname, function(e,d){
    if(e){
      res.writeHead(404);
      res.end(e.message);
    }
    else{
      res.writeHead(200);
      res.end(d);
    }
  })

});

server.listen(3000);