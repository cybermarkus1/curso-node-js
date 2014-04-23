function fcall(fn){
  // Llamo al metodo slice para devolverme un array con los argumentos a partir del primer elemento
  var args = [].slice.call(arguments, 1);
  // El metodo apply recibe como primer parametro el contexto de la funcion, y el resto de parametros
  return fn.apply({}, args);
}

function sume(a, b){
  return a + b;
}

function siete(){
  return 7;
}

fcall(siete);

fcall(sume, 1, 2);

obj = {
  hola: function(){
    console.log(this.message);
  },
  message = 'hola';
}