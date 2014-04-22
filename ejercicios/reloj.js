var inherits = require("util").inherits,
  eventEmitter = require("events").EventEmitter
;

var Reloj = function(){

  var self = this;

  setInterval(function() {
    // esto falla porque paunta al gloabl y no funciona
    // this.emit("segundo", new Date());
    // self permite pasar el contexto correctamente
    self.emit("segundo", new Date());
  }, 1000);

};

inherits(Reloj, eventEmitter);

exports.Reloj = Reloj;


// function pruebaThis(){
//   return this;
// };

// var obj = {
//   prueba: prueba
// };

// // objeto global
// prueba();

// // obj
// obj.prueba();

// // se ejecuta con invocacion directa - apunta al objeto global
// setTimeout(prueba, 0);

// // Sigue apuntando al objeto gloabl porque no la invocas tu, la invoca node de forma directa
// setTimeout(obj.prueba, 0);
