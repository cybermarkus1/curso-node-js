var fs = require('fs'),
  Q = require('Q');

function readFilePromise(path){
  // 1 - crear un DIFERIDO
  var defer = Q.defer();

  // 2 - Leer el fichero y resolver el diferido
  fs.readFile(path, function(err, data) {
    // if (err) {
    //   defer.reject(err);
    // }
    // else {
    //   defer.resolve(data.toString());
    // }
    err ? defer.reject(err) : defer.resolve(data) ;

  });

  // 3 - Retornar la promesa
  return defer.promise;
};

readFilePromise("./test.txt")
.then(function(data) {
  console.log("Contenido del fichero: ", data);
}, function(err) {
  console.log("Ooops", err);
})