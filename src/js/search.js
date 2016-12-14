var cargar = function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarMapa, error);
	}
}

$(document).ready(cargar);

var mostrarMapa = function (position) {

	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var latlon = new google.maps.LatLng(lat, lon);
	firstPosition = latlon;

	var myOptions = {
		center: latlon,
		zoom: 3,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	};
	var map = new google.maps.Map(document.getElementById("map"), myOptions);

	//*autocomplete*//
	var input = document.getElementById("search");

	var autocomplete = new google.maps.places.Autocomplete(input);

	autocomplete.bindTo('bounds', map);

	var infowindow = new google.maps.InfoWindow();

	var marker = new google.maps.Marker({
		map: map,
		anchorPoint: new google.maps.Point(0, -29)
	});
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});

	autocomplete.addListener('place_changed', function () {
		marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			window.alert("No se encontraron resultados");
			return;
		}
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		marker.setIcon(({
			url: place.icon,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(35, 35)
		}));
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);

		// Set the position of the marker using the place ID and location.
		marker.setPlace({
			placeId: place.place_id,
			location: place.geometry.location
		});
		marker.setVisible(true);

		var contentString = '<img src="{{image}}" width="300px" height="150px">' +
			'<i class="heart-search material-icons"></i>' +
			'<a href="" target="_blank">' +
			'<p class="black-text"><strong class="blue-text">New: </strong>{{phrase}}</p></a>' +
			'<div>{{address}}' +
			'<div class="cnt-general-starts">' +
			'<i class="xtra-small color-green material-icons">&#xE838;</i>' +
			'<i class="xtra-small color-green material-icons">&#xE838;</i>' +
			'<i class="xtra-small color-green material-icons">&#xE838;</i>' +
			'<i class="xtra-small color-green material-icons">&#xE839;</i>' +
			'<i class="xtra-small material-icons">&#xE83A;</i>' +
			'</div>' +
			'</div>';

		var maxImages = 9;
		var inputBuscar = $('#search').val();
		$.when(
			$.ajax({
				url: "/places?lugar=" + inputBuscar,
				type: "GET"
			}),
			$.ajax({
				url: 'https://randomuser.me/api?inc=picture&results=' + maxImages,
				dataType: 'json',
				type: "GET"
			})
		).then(function (lugares, data) {
			$.each(lugares[0], function (i, plac) {
				largo = lugares[0].length;
				console.log(largo);
				var contentStringResultado = contentString.replace("{{phrase}}", plac.phrase)
					.replace("{{address}}", plac.address)
					.replace("{{phone}}", plac.contact.phone)
					.replace("{{image}}", data[0].results[i % maxImages].picture.large);

				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
					contentStringResultado + '<br>' +
					place.formatted_address);

				infowindow.open(map, marker);
			});
		});


	});
}

var error = function (error) {
	console.log(error);
};