var template ='<div class="col s12 m12">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content teal lighten-2 white-text">' +
                            '<p>Nombre: <strong>{{name}}</strong></p>' +
                            '<p>Edad: {{age}} </p>'+
                            '<p>Dirección: {{address}}</p>'+
                            '<p>Distrito: {{distrito}}</p>'+
                            '<p>Teléfono: {{phone}}</p>'+
                            '<img src="{{image}}" id="image">'+
                        '</div>' +
                     '</div>' +
                '</div>' +
            '</div>';

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
            
$(document).ready(function(){

  $("#map").hide();
  $("#icon_prefix").keyup(validarForm);
    function validarForm () {
      var distritoInput = $(this).val();
      var valor = true;
      var regexDistrito = /^[a-zñáéíóúü]+$/gi;
        if (!regexDistrito.test(distritoInput)) {
          valor = false;
        }
    }

    var sigt = function(e){
      e.preventDefault();
      initMap();
      var maxImages = 9;
      var distritoIngresado = $('#icon_prefix').val();  
      $.when(
        $.ajax({ 
          url: "/cuidadores?lugar="+distritoIngresado,
          type: "GET"
        }), 
        $.ajax({
          url: 'https://randomuser.me/api?inc=picture&results=' + maxImages,
          dataType: 'json',
          type: "GET"
        })
      ).then(function(cuidadores,data){
        $.each(cuidadores[0], function (i,cuidador) {
          largo = cuidadores[0].length;
          console.log(largo);
          initMap();
          var cuidadorResultado = template.replace("{{name}}", cuidador.name)
            .replace("{{age}}", cuidador.age)
            .replace("{{address}}", cuidador.address)
            .replace("{{distrito}}", cuidador.distrito)
            .replace("{{phone}}", cuidador.contact.phone)
            .replace("{{image}}", data[0].results[i % maxImages].picture.medium);
            $("#resultados").append(cuidadorResultado);
        });
      });

      $("#map").show();
      $('#icon_prefix').val('');

    };

    $("#btn").click(sigt);
});
