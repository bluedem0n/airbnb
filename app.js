var express = require("express");
var app = express();
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/static"));
app.listen(8080 , function(){
  console.log("Servidor Encendido");
});