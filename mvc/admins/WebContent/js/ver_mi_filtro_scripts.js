
$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#dialog_otroProceso").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 500,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() { $(this).dialog('close'); }
	       
	    }
	 });
	
	$("#dialog_calificar").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 460,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cancelar': function() { $(this).dialog('close'); },
	        'Calificar': function() {JsonAndAjaxCalificacion(); $(this).dialog('close'); }
	    }
	 });
	
	$("#dialog_postulacion_error").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 200,
	    width: 500,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() {$(this).dialog('close');  $("#error").text("");},
	        
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
	
	
	
	
	
	pinta();
	
	$("tr.adminRow").mouseover(function(){
		$(this).css("background-color","#808080 ");
		$(this).css("color","white");
	});
	
	$("tr.adminRow").mouseleave(function(){
		pinta();
		if($(this).attr("id")!=$("#seleccion").val())
		$(this).css("color","black");
		pinta();
		
	});
	
	 $("tr.adminRow").click(function(){
		  var id=$(this).attr("id");
		  
		  var dosPartes=id.split("EN"); 
		  
		  
		  $("#aux_filtro").val(dosPartes[0]);
		  
		  var pre = dosPartes[1];
		  
		  var trepartes = pre.split("CON");
		  
		  $("#vac").val(trepartes[0]);
		  $("#postu").val(trepartes[1]);
		  
		  $("tr.adminRow").css("color","black");
		  pinta();
	   });
	 
	 
	 $("input.genero").each(function(){
			var value = $(this).val();
			if(value == 'M'){
				$("td.conteGenero").html('<div class="masculino" style="margin-left: 47px;"></div>');
			}else if(value == 'F'){
				$("td.conteGenero").html('<div class="femenino" style="margin-left: 47px;"></div>');
			}
			
		});
	 
	 /* PARA EL OTRO PROCESO */
	 
	 $("#otroProceso").click(function(){
		 	var postulante = $("#postu").val();
			
			
		 	
		 	if(postulante == ""){
		 		$( "#dialog_selecPostulante" ).dialog( "open");
		 	}else{
		 		$("#usuArio").text(postulante);
				  $(".removible").remove();
				otroPoceso(postulante);
				$( "#dialog_otroProceso" ).dialog( "open");
		 	}
			
	   });
	 
	 
	 /* PARA EL OTRO PROCESO DESDE UN EL LINK */
		
		$(".otroProcesoLink").click(function(){
		 	var postulante = $(this).attr("id");
		 	
		 	if(postulante == ""){
		 		$( "#dialog_selecPostulante" ).dialog( "open");
		 	}else{
		 		$("#usuArio").text(postulante);
				  $(".removible").remove();
				otroPoceso(postulante);
				$( "#dialog_otroProceso" ).dialog( "open");
		 	}

	   });
	 
	 
	 
	 
	 
	 $("#calificar").click(function(){
			
			var id_vac=$("#vac").val();
			var id_postu=$("#postu").val();
			
		  	
		  	if(id_vac == "" ||  id_postu==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		abrirComen();
		  		
		  	}
	   });
	 
	 
	 /** LIMITANDO LOS TEXT AREA 
		 *************************************************************/
		
		/* comentarios */
		
		var total_letrasP = 255;

		$('#comentarios').keyup(function() {
		    var longitud = $(this).val().length;
		    var resto = total_letrasP - longitud;
		    if(resto <= 0){
		        $('#comentarios').attr("maxlength", 255);
		    }
		});
	
});


function pinta(){	
	 cual=document.getElementById("tabla").rows;
	 var a;
	 for(a=0;a<cual.length;a++){
	  color(a);
	 }
	 var usu=$("#aux_filtro").val();
	 var vac=$("#vac").val();
	 var postu =$("#postu").val();
	 var ele = usu+"EN"+vac+"CON"+postu;
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



function otroPoceso(postulante) {
	 $.getJSON('json/otroProceso' ,
	  {postulante: postulante},
	  function(jsonDataOP) {
		  
		  /* PARA EL NOMBRE */
		  $("#nombreUsuario").text(jsonDataOP.nombre[0].nombre);
		  
		  /* PARA EL NUMERO DE  POSTULACIONES */
		  $("#postulaciones").text(jsonDataOP.postulaciones[0].num_postulaciones);
		  
		  /* PARA LAS VACANTES QUE A LAS QUE ESTA POSTULADO */
		  for(j=0;j<=(jsonDataOP.listaVacantes.length)-1;j++){
			  $("<div class='removible' id='"+jsonDataOP.listaVacantes[j].lasVacantes+"'><p>"+jsonDataOP.listaVacantes[j].lasVacantes+"</p></div>").appendTo(".contien_vacOtroProceso");
		  }
		  
		  /* PARA EL NUMERO DE VECES QEU ESTA EN EL PRIMER FILTRO */
		  $("#primerFiltro").text(jsonDataOP.primerFiltro[0].num_postulaciones_primer_filtro);
		  
		  /* PARA LOS ADMINS CON LOS QUE ESTA INTERACTUANDO  */
		  for(j=0;j<=(jsonDataOP.interactuandoPrimerFiltro.length)-1;j++){
			  $("<div class='removible' id='"+jsonDataOP.interactuandoPrimerFiltro[j].interactuando+"'><p>"+jsonDataOP.interactuandoPrimerFiltro[j].interactuando+"</p></div>").appendTo(".InteractuandoOtroProceso");
		  }
		  
		  /* PARA EL NUMERO DE VECES QEU ESTA EN MI FILTRO */
		  $("#postulacionesMiFiltro").text(jsonDataOP.miFiltro[0].num_postulaciones_mi_filtro);
		  
		  
	  }
	 );
	 return false;
	}




function abrirComen(id_vac,id_postu){
	$( "#dialog_calificar" ).dialog( "open");
}


function error_postu(){
	$( "#dialog_postulacion_error" ).dialog( "open");
}

function JsonAndAjaxCalificacion() {
	
	var calificacion = $("#calificacion").val();
	
	var id_vac=$("#vac").val();
	var id_postu=$("#postu").val();
	var comentarios2 = $("#comentarios").val();
	
	if(calificacion == "0" ||  id_vac == "" || id_postu==""){
		alertify.alert("Debes Seleccionar la Calificacion")
	}else{
		$.getJSON('json/calificar' ,
				  {calificacion: calificacion,id_vac:id_vac,id_postu:id_postu,comentarios2:comentarios2},
				  function(jsonDataCP) {
					  
					  var error1 = jsonDataCP.Mensajes[0].error1;
					  
					  if(error1=="HAS CALIFICADO COMO CONTRATADO PROMOCIONADO"){
						  //alert(jsonDataP.items[0].error1);
						  var er1=jsonDataCP.Mensajes[0].error1;
						  console.info(er1);
						  $("#error").text(er1);
						  error_postu();
					  }else if(error1=="HAS CALIFICADO A ESTE USUARIO"){
						  //alert(jsonDataP.items[0].error2);
						  var er2=jsonDataCP.Mensajes[0].error1;
						  $("#error").text(er2);
						  error_postu();
					  	}else if(error1=="LA CALIFICACION DEL USUARIO SE HA ACTUALIZADO"){
					  		
					  		var id_ayuda = $("#aux_filtro").val();
					  		
					  		 $("#jup"+id_ayuda).attr('class','calif_tipo'+calificacion);
					  		
					  		//alert(jsonDataP.items[0].bien);
					  		 var er3=jsonDataCP.Mensajes[0].error1;
							  $("#error").text(er3);
							  error_postu();
							 
					  	}
					 
				  }
				 );
				 return false;
	}
	
	 
}


