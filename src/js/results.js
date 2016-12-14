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
                           	"<p><a class='titulo' href='#''>Modern & New Apartment</a></p>" +
                           	"<ul>" +
                               	"<li>{{tipo}}</li>" +
                               	"<li>* {{num_huespedes}} huéspedes</li>" +
                               	"<li>* {{num_evaluaciones}} evaluaciones</li>" +
                           	"</ul>" +
                        "</div>" +
                    "</div>" +
                "</div>";

var map;
var infowindow;
var largo;

function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};
    map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
	});
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
	location: pyrmont,
	radius: 30
	}, callback);
}

function callback(results, status, largo) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < largo; i++) {
        	console.log(largo);
        	createMarker(largo[i]);
    	}
    }
}

function createMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place.geometry.location
 	 });

  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);
  	});
}

var busqueda = function(e){
    e.preventDefault();
    initMap();
    var lugarIngresado = $('#lugar').val();  
    $.when(
        $.ajax({ 
          url: "http://localhost:3000/demo.json",
          type: "GET"
        }), 
/*        $.ajax({
          url: 'https://randomuser.me/api?inc=picture&results=' + maxImages,
          dataType: 'json',
          type: "GET"
        })*/
    ).then(function(lugares,data){
        $.each(lugares[0], function (i,lugar) {
          	largo = lugares[0].length;
          	console.log(largo);
        	initMap();
        	var lugarResultado = template.replace("{{precio}}", cuidador.precio)
            .replace("{{num_huespedes}}", lugar.num_huespedes)
            .replace("{{num_evaluaciones}}", lugar.num_evaluaciones)
            $("#resultados").append(lugarResultado);
        });
    });

    $('#lugar').val('');
}

$(document).ready(busqueda);