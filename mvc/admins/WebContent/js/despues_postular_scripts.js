
$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#nueva_busqueda").click(function(){
		window.location.href="/admins/Candidatos";
	});
	
	
	$("#ver_postulantes").click(function(){
		var id_vac=$("#seleccion").val();
		$("#id_Vacante").val(id_vac);
		
		$("#enviar_vac_postu").attr("action","MisPostulantes");
		$("#enviar_vac_postu").submit();
	
	});
	
	


});

function ver_postu_vac(id_vac){
	
	var id_Vacante = id_vac;
	
	$.post("/admins/MisPostulantes", {id_Vacante:id_Vacante}, function(data) {
	      if(data){
	       
	    	
	    	  window.location.href="/admins/MisPostulantes";
	    	  
	       
	      }
	      
	      });
	
}