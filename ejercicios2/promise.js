var fakePromise = require('./fakePromise');

var promise = fakePromise.gimmePromise();

promise.then(function(){
  return 'hola';
})
.then(function(msg){
  console.log(msg);
  return 'pepe';
})
.then(function(msg2){
  console.log(msg2);
})
.fail(function(msg3){
  console.log('Error msg:' + msg3);
})

// UNA promesa puefde estar Pendiente , resuelta o rechazada!

// para resolver una promesa usamos el metodo 'resolve()'

// promise.resolve(42);

promise.reject(new Error('Oops!'))