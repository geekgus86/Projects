

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#usuarios_g").click(function(){
		window.location.href="Candidatos";
	});
	
	$("#admins").click(function(){
		window.location.href="Administradores";
	});
	
	$("#nuevo_admin").click(function(){
		window.location.href="NuevoAdmin";
	});
	
	$("#postulante").click(function(){
		window.location.href="MisPostulantes";
	});
	
	
	$("#postulante").click(function(){
		window.location.href="MisPostulantes";
	});
	
	
	$("#filtroS").click(function(){
		window.location.href="VerFiltro";
	});
	
	$("#admin_cuenta").click(function(){
		window.location.href="redirBsq";
	});
	
});