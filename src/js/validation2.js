$(function(){
	$("#form2").validate({
		rules: {
			email2: {
				required:true,
				email:true,
			},
			name: {
				required:true
			},
			lastname: {
				required:true
			},
			password2: {
				required:true
			},
			month :{
				required:true,
				minlength:1,
				maxlength:2,
				number:true
			},
			day: {
				required:true,
				minlength:1,
				maxlength:2,
				number:true
			},
			year: {
				required: true,
				minlength:4,
				maxlength:4,
				number:true
			}
		},
		messages: {
			email2: {
				required:"Debes ingresar un correo electrónico.",
				email:"Ingrese un correo valido",	
			},
			name: {
				required:"Nombre Obligatorio."
			},
			lastname: {
				required:"Apellido Obligatorio."
			},
			password2: {
				required:"Contraseña Obligatoria."
			},
			month: {
				required:"Selecciona tu fecha de nacimiento para continuar."
			}
		}
	});
});