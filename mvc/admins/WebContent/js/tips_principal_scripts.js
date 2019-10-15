
$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	
	
	pinta();
	
	$("#dialog_vacante_elim").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 260,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cancelar': function() { $(this).dialog('close'); },
	        'Eliminar': function() { eliminar_vac(); $(this).dialog('close'); }
	    }
	 });
	
	$("#dialog_selecPostulante").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 200,
	    width: 370,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() { $(this).dialog('close'); }
	       
	    }
	 });
	
	$("tr.adminRow").mouseover(function(){
		  $(this).css("background-color","#CA3B3B ");
		  $(this).css("color","white");
		  
	   });
	  
	  $("tr.adminRow").mouseleave(function(){
		  pinta();
		  $(this).css("color","black");
	   });
	  
	  $("tr.adminRow").click(function(){
		  var id=$(this).attr("id");
		  $("#seleccion").val(id);
		  $("tr.adminRow").css("color","black");
		  pinta();
	   });
	  
	  
	  $("#nueva_tip").click(function(){
			window.location.href="TipsNuevos";
	   });
	  
	  
	  $("#editar_tip").click(function(){
		  	var id=$("#seleccion").val();
		  	
		  	if(id==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		
		  		
		  		$("#editTip").submit();
		  	}
	   });
	  
	  $("#borrar_tip").click(function(){
		  	var id=$("#seleccion").val();
		  	
		  	if(id==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		abrirElim(id);
		  	}
	   });
	  
	  
	 
	  
});


function pinta(){	
	 cual=document.getElementById("tabla").rows;
	 var a;
	 for(a=0;a<cual.length;a++){
	  color(a);
	 }
	 var ele=$("#seleccion").val();
	 if(ele!=""||ele!=null){
	 $("#"+ele+"").css("background-color","#CA3B3B ");
	 $("#"+ele+"").css("color","white");
	 }
}
function color(b){
	if(b%2==0)
		cual[b].style.backgroundColor="";
	else
		cual[b].style.backgroundColor="#d3d2d2";
}


function abrirElim(id){
	$("#folio_vac").text(id);
	$( "#dialog_vacante_elim" ).dialog( "open");
}


function eliminar_vac(){
	
	 var num_folio = $("#num_vac").text();
	 var seleccion=$("#seleccion").val();
	 $.post("/admins/TipsEliminar", {seleccion:seleccion}, function(data) {
	      if(data){
	       
	    	
	    	  window.location.href="Tips";
	    	  $("#"+num_folio).hide();
	       
	       
	      }
	     } );
}