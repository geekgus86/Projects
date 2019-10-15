$(document).ready(function(){
	mostrar_foto();
	
	$("#dialog_personales").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 500,
	     width: 500,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	      'Modificar' : function(){},
	         'Cancelar': function() {$(this).dialog('close');}
	         
	     }
	  });
	
	
	
});

function mostrar_foto(){
	var foto=$("#foto_hidden").val();
	$('#foto_perfil').css("background-image", "url("+foto+")");  	
}

function abrir_cuadro(){
	$( "#dialog_personales" ).dialog( "open");
	
}