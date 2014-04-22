var Reloj = require("./reloj").Reloj;
var reloj = new Reloj();

reloj.on("segundo", function(fecha) {
 console.log("Un segundo son las:", fecha);
 // reloj.removeAllListeners("segundo"); -> Elimina todos los listener asique falsea un once
});