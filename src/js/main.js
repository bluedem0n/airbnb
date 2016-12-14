var lugarIngresado = localStorage.getItem("");
var llegadaIngresada = localStorage.getItem("");
var salidaIngresada = localStorage.getItem("");
var numHuespedes = localStorage.getItem("");

var inputLugar = $('#lugar');
var inputLlegada = $('#llegada');
var inputSalida = $('#salida');
var btnBuscar = $('#buscar');

var validarTeclas = function (e) {
	var ascii = e.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;			
		}
	}

var buscarLugar = function () {
	var lugar = inputLugar.val();
	lugarIngresado = localStorage.setItem("lugar", lugar);
	
	var llegada = inputSalida.val();
	llegadaIngresada = localStorage.setItem("llegada", llegada);

	var salida = inputLlegada.val();
	salidaIngresada = localStorage.setItem("salida", salida);

	if (inputLugar != '' && inputLlegada != '' && inputLlegada != '') {
		$(location).attr('href','/search.html');
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