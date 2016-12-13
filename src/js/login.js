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

	FB.Event.subscribe('auth.statusChange', function (response) {
		if (response.authResponse) {
			FB.api('/me', function (me) {
				if (me.name) {
					document.getElementById('pict').innerHTML =
						'<img class="picture" src="https://graph.facebook.com/' + me.id + '/picture?type=normal">';
					document.getElementById("btn-iniciar").className = "ocultar";
				}
			})
		} else {
			window.location = "index.html";
		}
	});

	document.getElementById("facebook").addEventListener('click', function () {
		FB.login(function (response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function (response) {
					window.location = "perfil.html";
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	});
});