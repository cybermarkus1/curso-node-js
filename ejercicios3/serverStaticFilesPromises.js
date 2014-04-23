var http = require("http"),
  url = require('url'),
  fs = require('fs'),
  // inspect convierte obj en un string
  inspect = require('util').inspect,
  Q = require('Q');


var server = http.createServer();

function fileExistPromise(path) {
  // 1 - crear un DIFERIDO
  var defer = Q.defer();

  // 2 - Leer el fichero y resolver el diferido
  fs.exists(path, function(exist){
    // el return se pone para que no de problemas el JSHINt
    return exist ? defer.resolve(true) : defer.reject(new Error('NOO existe'));
  });

  // 3 - Retornar la promesa
  return defer.promise;
}


function readFilePromise(path){
  // 1 - crear un DIFERIDO
  var defer = Q.defer();

  // 2 - Leer el fichero y resolver el diferido
  fs.readFile(path, function(err, data) {
    err ? defer.reject(err) : defer.resolve(data) ;
  });

  // 3 - Retornar la promesa
  return defer.promise;
}


server.on("request", function(req, res) {
  // devuelve la url parseada
  var urlData = url.parse(req.url);

  // configuras el FLUJO DE EJECUCION
  fileExistPromise("./" + urlData.pathname)
  .then(function(){
    return readFilePromise("./" + urlData.pathname);
  })
  .then(function(data) {
    console.log('Existe');
    res.writeHead(200);
    res.end(data);
  })
  .fail(function(err) {
    console.log('NOOO Existe');
    res.writeHead(404);
    // ATENCION AL err.MESSAGE!!
    res.end(err.message);
  })

});

server.listen(3000);
