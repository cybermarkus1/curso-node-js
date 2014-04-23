var fakePromise = require('./fakePromise');

var promise = fakePromise.gimmePromise();

promise.then(function(){
  return 'hola';
})
.then(function(msg){
  console.log(msg);
  throw new Error('oh oh...');
  return 'pepe';
})
.then(function(msg2){
  console.log(msg2);
})
.fail(function(msg3){
  console.log('Error msg:' + msg3);
  return 'Mal'
})
.then(function(msg){
  console.log('tras fail ' + msg);
})

// UNA promesa puefde estar Pendiente , resuelta o rechazada!

// para resolver una promesa usamos el metodo 'resolve()'

promise.resolve('hola');

// promise.reject(new Error('Oops!'))