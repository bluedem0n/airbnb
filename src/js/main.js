var lugarIngresado = ;
var llegadaIngresada = ;
var salidaIngresada = ;
var numHuespedes = ;

var inputLugar = $('#lugar');
var inputLlegada = $('#llegada');
var inputSalida = $('#salida');
var btnBuscar = $('#buscar');

var validarTeclas = function () {
	var ascii = 
}

var buscarLugar = function () {
	if (inputLugar != '' && inputLlegada != '' && inputLlegada != '') {
		btnBuscar.attr('href', 'localhost:3000/search.html');
	}
}

var cargarPagina = function () {

	$('.button-collapse').sideNav({
		menuWidth: 380, 
		edge: 'left', 
		closeOnClick: false, 
		draggable: true 
	});

	$('.modal').modal();

	$('#buscar').click(buscarLugar);
}
$(document).ready(cargarPagina);