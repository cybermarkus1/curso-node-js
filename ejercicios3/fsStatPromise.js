var fs = require('fs'),
  Q = require('Q');

function fsStatPromise(path){
  // 1 - crear un DIFERIDO
  var defer = Q.defer();

  // 2 - Leer el fichero y resolver el diferido
  fs.stat(path, function(err, data) {
    err ? defer.reject(err) : defer.resolve(data) ;
  });

  // 3 - Retornar la promesa
  return defer.promise;
}