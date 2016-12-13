window.addEventListener("load", function () {
	window.fbAsyncInit = function () {
		FB.init({
			appId: '720051168148111',
			xfbml: true,
			version: 'v2.8'
		});
	};
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	document.getElementById("facebook").addEventListener('click', function () {
		FB.login(function (response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function (response) {
					var imagenCargada = document.getElementById('foto').innerHTML = '<img class="foto-perfil" src="https://graph.facebook.com/' + response.id + '/picture">';
					document.getElementById('btn-iniciar').className += ' ocultar';
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	});

});