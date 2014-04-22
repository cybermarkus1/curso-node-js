var fs = require("fs");

console.log(process.argv[2]);
console.log(process.argv[3]);

var readStream = fs.createReadStream(process.argv[2], {
 flags: "r",
 encoding: "ascii",
 autoClose: true
});

var writeStream = fs.createWriteStream(process.argv[3], {
 flags: "w",
 encoding: "utf-8"
});

//readStream.on("data", writeStream.write.bind(writeStream));

readStream.on("data", function(chunk) {
  writeStream.write(chunk);
});

writeStream.on("finish", function() {
 console.log("Listo");
});