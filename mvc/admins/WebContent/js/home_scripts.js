

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#vac_btn").click(function(){
		window.location.href="VacanteAdmin";
	});
	
	
	$("#adm_btn").click(function(){
		window.location.href="UsuariosAdmin";
	});
	
	
	
	$("#adm_web").click(function(){
		window.location.href="WebAdmin";
	});
	
	
	$("#reportes").click(function(){
		window.location.href="Reportes2";
		
	});
	
	
	$("#admins").click(function(){
		window.location.href="Administradores";
	});
	
	$("#nuevo_admin").click(function(){
		window.location.href="NuevoAdmin";
	});
	
	
	$("#adm_clus").click(function(){
		window.location.href="clusterHome";
	});
	
	$("#dev_query").click(function(){
		window.location.href="dev_zone.jsp";
	});

});