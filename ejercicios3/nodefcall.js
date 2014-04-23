var fs = require('fs'),
  Q = require('Q');

function nodefcall(fn){
  // 1 - crear un DIFERIDO
  var defer = Q.defer()
    , args = [].slice.call(arguments, 1);

  // 2 - Leer el fichero y resolver el diferido
  // args.push(function(err, data) {
  //   err ? defer.reject(err) : defer.resolve(data) ;
  // });

  // el codigo de arriba solo vale si recibe dos parametros, en caso de que sean mas, es imprescindible gestionar y devolver el resto de parametros
  args.push(function(err) {
    var argsAux = [].slice.call(arguments, 1);
    // recuerda que el metodo apply asocia cada elemento de la lista con los argumentos de una funcion !!!! defer es el contexto de la funcion
    err ? defer.reject(err) : defer.resolve.apply(defer, argsAux) ;
  });

  fn.apply({}, args);

  // 3 - Retornar la promesa
  return defer.promise;
};


nodefcall(fs.stat, 'call.js')
.then( function(contents){
  console.log(contents);
})
.fail( function(err){
  console.log(err);
});
