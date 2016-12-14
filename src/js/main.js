var template =  "<div class='col s12 m12 l6'>" +
                    "<div class='card'>" +
                        "<div class='card-image'>" +
                            "<img src='/assets/img/img-2.jpg'>" +
                            "<span class='card-title precio'>s/. {{precio}}</span>" +                               
                        "</div>" +
                        "<div class='col s2'>" +
                            "<img src='/assets/img/user-1.jpg' alt='' class='circle responsive-img image-user'>" +
                        "</div>" +
                        "<div class='card-content'>" +
                           	"<p><a class='titulo' href='#''>{{titulo}}</a></p>" +
                           	"<ul>" +
                               	"<li>{{tipo}}</li>" +
                               	"<li>* {{num_huespedes}} huéspedes</li>" +
                               	"<li>* {{num_evaluaciones}} evaluaciones</li>" +
                           	"</ul>" +
                        "</div>" +
                    "</div>" +
                "</div>";

var lugarIngresado = localStorage.getItem("lugar");
var llegadaIngresada = localStorage.getItem("llegada");
var salidaIngresada = localStorage.getItem("salida");
var numHuespedes = localStorage.getItem("huespedes");

var inputLugar = $('#lugar');
var inputLlegada = $('#llegada');
var inputSalida = $('#salida');
var inputHuespedes = $('#huespedes');
var btnBuscar = $('#buscar');

$(document).ready(function () {

    if (window.location.href == '/search.html') {
    	$('#searchLugar').html(lugarIngresado);    	
	    $.when(
	        $.ajax({ 
	          url: "/lugares?lugar="+lugarIngresado,
	          type: "GET"
	        }) 
	    ).then(function(lugares,data){
	        $.each(lugares[0], function (i,lugar) {
	          	var largo = lugares[0].length;
	          	console.log(largo);
	        	initMap();
	        	var lugarResultado = template.replace("{{precio}}", lugar.precio)
	        	.replace("{{titulo}}", lugar.titulo)
	        	.replace("{{tipo}}", lugar.tipo)
	            .replace("{{num_huespedes}}", huespedes)
	            .replace("{{num_evaluaciones}}", lugar.evaluaciones)
	            $("#resultados").append(lugarResultado);
	        });
		});	
    }
	$('.button-collapse').sideNav({
		menuWidth: 380, 
		edge: 'left', 
		closeOnClick: false, 
		draggable: true 
	});
	$('.modal').modal();
	$('#buscar').click(buscarLugar);

	function validarTeclas (e) {
		var ascii = e.keyCode;
		if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
			return true;
		} else {
			return false;			
		}
	}

	function validarInputs () {
		if (inputLugar.val() != '' && inputLlegada.val() != '' && inputLlegada.val() != '') {
			return true;
		}	
	}

	function buscarLugar () {
		if(validarInputs() != true) { return undefined;}

		var lugar = inputLugar.val();
		lugarIngresado = localStorage.setItem("lugar", lugar);	
		var llegada = inputSalida.val();
		llegadaIngresada = localStorage.setItem("llegada", llegada);
		var salida = inputLlegada.val();
		salidaIngresada = localStorage.setItem("salida", salida);
		var huespedes = inputHuespedes.val();
		huespedesIngresados = localStorage.setItem("huespedes", huespedes);

	    window.location.href = '/search.html';

	}


});