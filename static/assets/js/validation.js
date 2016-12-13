$(function(){
	$("#form1").validate({
		rules: {
			email: {
				required:true,
				email:true,
			},
			password: {
				required:true,
			}
		},
		messages: {
			email: {
				required:"Debes ingresar un correo electronico",
				email:"Ingrese un correo valido",	
			},
			password: {
				required:"Contraseña Obligatoria"
			}
		}
	});
});