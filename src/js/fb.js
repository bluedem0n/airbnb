// cargamos el sdk de forma asincrónica
(function (d) {
    var js, id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
window.fbAsyncInit = function () {
    FB.init({
        appId: '720051168148111',
        status: true,
        cookie: true,
        xfbml: true,
        oauth: true
    });
    FB.Event.subscribe('auth.statusChange', function (response) {
        if (response.authResponse) {
            FB.api('/me', function (me) {
                if (me.name) {
                    document.getElementById('nombre').innerHTML = me.name;
                    document.getElementById('name').innerHTML = me.name;
                    document.getElementById('foto').innerHTML =
                        '<img src="https://graph.facebook.com/' + me.id + '/picture?type=large">';
                }
            })
        } else {
            window.location = "index.html";
        }
    });
}