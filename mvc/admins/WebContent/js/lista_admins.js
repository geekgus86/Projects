
var idAdmin="";

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	pinta();
	$(btnNuevo).click(function(){
		
		document.location.href="/admins/NuevoAdmin";
	});
	
     $("#btnMod").click(function(){
    	 var sel=$("#seleccion").val();
    	 if(sel==""||sel==undefined||sel==null){
    		 alertify.alert("Por favor seleccione primero a un usuario de la lista");	
    	 }else{
    		 $('#modificar').submit(); 
    	 }
    	 
	});
	
	$("tr.adminRow").mouseover(function(){
		$(this).css("background-color","#808080 ");
		$(this).css("color","white");
	});
	
	$("tr.adminRow").mouseleave(function(){
		pinta();
		if($(this).attr("id")!=$("#seleccion").val())
		$(this).css("color","black");
		
	});
	$("tr.adminRow").click(function(){
		var id=$(this).attr("id");
		$("#seleccion").val(id);
		$("tr.adminRow").css("color","black");
		pinta();
		
	});
	
	$("#btnDel").click(function(){
		 var sel=$("#seleccion").val();
    	 if(sel==""||sel==undefined||sel==null){
    		 alertify.alert("Por favor seleccione primero a un usuario de la lista");	
    	 }else{
    		 $( "#dialog_esta_seguro" ).dialog( "open");
    	 }
		
	});
	
	
	
	

	$("#btnEstad").click(function(){
		 var sel=$("#seleccion").val();
    	 if(sel==""||sel==undefined||sel==null){
    		 alertify.alert("Por favor seleccione primero a un usuario de la lista");	
    	 }else{
    		 $( "#dialog_cambiaEstado" ).dialog( "open");
    	 }
		
	});
	
	
	$("#dialog_esta_seguro").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 200,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Confirmar': function() {
	        	eliminarAdmin();
	        	$(this).dialog('close');
	        },'Cancelar':function(){
	        	$(this).dialog('close');
	        }
	    }
	 });
	
	
	$("#dialog_cambiaEstado").dialog({
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
	        'Cambiar': function() { cambiar_estado(); $(this).dialog('close'); },
	        
	    }
	 });
	
	
	$(".cambiar").click(function(){
		
		idAdmin = $(this).attr("id");
		alertify.alert(idAdmin);
		$( "#dialog_cambiaEstado" ).dialog( "open");
		
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
	if(b%2==0){
		cual[b].style.backgroundColor="";
	 }
	else
		cual[b].style.backgroundColor="#d3d2d2";
}




function eliminarAdmin(){
	
	var selecciona=$("#seleccion").val();
	

		 $.post("/admins/EliminarAdmin", {selecciona:selecciona}, function(data) {
			   if(data){
				   $("#"+selecciona+"").hide();
				   alertify.alert("El usuario ha sido eliminado");
				   pinta();
			   }
		   } );

		
	
	
}



function cambiar_estado(){
	
	var idAdminSen = $("#seleccion").val();
	var estadoNuevo = $("#estadoAdmoin").val();
	
	
	 
	 $.getJSON('json/cambiarEstadoAjaxAdmin',
			 {idAdminSen: idAdminSen,estadoNuevo:estadoNuevo},
			  function(jsonDataCED) {
				  
					  
				 alertify.alert("HAS CAMBIADO EL ESTADO DEL ADMINISTRADOR");
				  
				  window.location.href="Administradores";
					  
					  
				} );
			 return false;
	 
	 
}


/* FUNCION PARA EL CUADRO DE DIALOGO*/