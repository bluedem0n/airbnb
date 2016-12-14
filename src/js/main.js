var cargarPagina = function () {
	// Initialize collapse button
	$('.button-collapse').sideNav({
		menuWidth: 380, // Default is 240
		edge: 'left', // Choose the horizontal origin
		closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true // Choose whether you can drag to open on touch screens
	});
	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
}
$(document).ready(cargarPagina);

