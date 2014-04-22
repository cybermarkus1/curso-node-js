var fs = require("fs"),
  readStream,
  totalLines= 0,
  branch = '\n';

readStream = fs.createReadStream("/etc/passwd", {
 flags: "r",
 encoding: "ascii",
 autoClose: true
});

readStream.on("data", function(chunk) {
  for(i = 0; i<chunk.length; i++){
    if (chunk[i] == branch){
      totalLines ++;
    }
  }
 console.log("He leído:", chunk.length + ' letras(bytes) y ' + totalLines + ' lineas');
});

readStream.on("end", function(chunk) {
 console.log("Finalizo la lectura del fichero");
});