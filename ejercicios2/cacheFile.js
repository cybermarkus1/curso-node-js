var http = require("http")
  , url = require('url')
  , fs = require('fs')
  // inspect convierte obj en un string
  , inspect = require('util').inspect
  , server = http.createServer()
  , obj = {};

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

  // readFl("./public" + urlData.pathname, function(e,d){
  var path = urlData.pathname;

  if (obj[path]) {
    console.log('accesing cache');
    res.end(obj[path]);
  }
  else{
    console.log('not cache');
    readFl("./" + urlData.pathname, function(err,d){
      if(err){
        res.writeHead(404);
        res.end(e.message);
      }
      else{
        res.writeHead(200);
        obj[urlData.pathname] = d;
        res.end(d);
      }
    })

  }

});

server.listen(3000);