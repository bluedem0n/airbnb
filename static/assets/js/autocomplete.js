// Este ejemplo muestra un formulario de dirección, utilizando la función de autocompletar
// de Google places API para ayudar a los usuarios rellenar la información.

var placeSearch, autocomplete, autocomplete_textarea;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initialize() {
  // Cree el objeto de autocompletado, restringiendo la búsqueda
  autocomplete = new google.maps.places.Autocomplete(
     (document.getElementById('autocomplete')),
      { types: ['geocode'] });
  // Cuando el usuario selecciona una dirección en el menú desplegable,
  // rellena los campos de dirección en el formulario.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInAddress();
  });
  
  
  autocomplete_textarea = new google.maps.places.Autocomplete((document.getElementById('autocomplete_textarea')),
      { types: ['geocode'] }
  );
  google.maps.event.addListener(autocomplete_textarea, 'place_changed', function() {
    fillInAddress_textarea();
  });
}

function fillInAddress_textarea(){
  var place = autocomplete_textarea.getPlace();
  console.log( place.formatted_address );
  console.log( JSON.stringify(place) );
  $('#autocomplete_textarea').val( place.formatted_address );
}


function fillInAddress() {
  // Obtener los detalles de lugar el objeto de autocompletado.
  var place = autocomplete.getPlace();
  console.log( JSON.stringify(place) );
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Recibe cada componente de la dirección de los lugares más detalles
  // y llena el campo correspondiente en el formulario.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

//ubicación geográfica del usuario,

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
      autocomplete_textarea.setBounds(circle.getBounds());
    });
  }
}
