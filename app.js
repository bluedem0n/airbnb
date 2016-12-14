var express = require("express");
var app = express();
var dream = require('dreamjs');

var distritos = ['Lima', 'Ate', 'Barranco', 'Breña', 'Comas', 'Chorrillos', 'El Agustino', 'Jesús María', 
  'La Molina', 'La Victoria', 'Lince', 'Magdalena del Mar', 'Miraflores', 'Pueblo Libre', 'Puente Piedra',
  'Rimac', 'San Isidro', 'Independencia', 'San Juan de Miraflores', 'San Luis', 'San Martin de Porres', 'San Miguel',
  'Santiago de Surco', 'Surquillo', 'Villa María del Triunfo', 'San Juan de Lurigancho', 'Santa Rosa', 'Los Olivos',
  'San Borja', 'Villa El Savador', 'Santa Anita', 'Callao', 'Bellavista', 'Carmen de la Legua', 'La Perla', 'La Punta', 'Ventanilla'];
var precios = [46, 52, 93, 67, 121, 211];
var evaluaciones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var tipo = ["Departamento", "Casa", "Habitación"];
var titulo = ["Habitación con vista al mar", "Habitación entrada independiente"];

dream.customType('pi', function () {
	return Math.PI;
});
dream.customType('distrito', function (helper) {
	return helper.oneOf(distritos);
});
dream.customType('precio', function (helper) {
	return helper.oneOf(precios);
})
dream.customType('evaluaciones', function (helper) {
	return helper.oneOf(evaluaciones);
})
dream.customType('tipo', function (helper) {
	return helper.oneOf(tipo);
})
dream.customType('titulo', function (helper) {
	return helper.oneOf(titulo);
})


var lugares = dream
  .schema({
  	titulo: 'titulo',
    distrito: 'distrito',
    precio: 'precio',
    evaluaciones: 'evaluaciones',
    tipo: 'tipo',
    foo: function () {
      return 'bar';
    },
    pi: 'pi',
    hello: 'hello'
  })
  .generateRnd(100)
  .output();
  
app.get('/lugares', function (req, res) {
    var lugar = req.query.lugar;
    var lugaresFiltrados = [];
    for (var i = 0; i < lugares.length; i++) {
        var lugar = lugares[i];
        if (lugar.distrito == lugar) {
            lugaresFiltrados.push(lugar);
        }       
    }
    res.send(lugaresFiltrados);
})

app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/static"));
app.listen(3000 , function(){
  console.log("Servidor Encendido");
});
