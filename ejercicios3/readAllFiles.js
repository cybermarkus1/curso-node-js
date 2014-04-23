var fs = require('fs'),
  Q = require('Q');

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

function readAllFiles(fileArray){

  // console.log(fileArray.length);
  var promises = new Array();

  for( var i = 0; i< fileArray.length; i++){
    promises.push(fileExistPromise(fileArray[i]));
  }

  // USAR el metodo 'map' QUE opera con LISTAS , genera UNA NUEVA LISTA aplicando la funcion que se le pasa por argumento
  // var promises = fileArray.map(readFilePromise);

  return Q.all(promises);

}

// para tomar argumentos por consola
var files = process.argv.slice(2);

// el Metodo apply permite asociar el contexto [1 arg] y cada uno de los elementos del array pasado como segundo parametro se asocia con los parametros de la funcion

files = ['filepromise.js', 'test.txt', 'lkhlkh'];
readAllFiles(files).then( function(contents){
  console.log(contents.join('\n\n\n'));
})
.fail( function(err){
  console.log(err);
});


