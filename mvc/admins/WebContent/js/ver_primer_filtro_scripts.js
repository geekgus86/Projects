

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();

	$("#dialog_agregar_observaciones").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 400,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cancelar': function() { $(this).dialog('close'); },
	        'Guardar': function() { JsonAndAjaxComentarios(); $(this).dialog('close'); }
	    }
	 });
	
	
	
	$("#dialog_observaciones").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 300,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() { $(this).dialog('close');  $("#comentariosRecibe").val(""); }
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
	        'Guardar': function() {JsonAndAjaxCalificacion(); $(this).dialog('close'); }
	    }
	 });
	
	
	
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
	 
	 $("#observacionesBTN").click(function(){
		  	var aux_filtro=$("#aux_filtro").val();
		  	
		  	if(aux_filtro==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		abrirComen(aux_filtro);
		  		
		  	}
	   });
	 
	 $("#miFiltro").click(function(){
		 
		 var aux_filtro = $("#aux_filtro").val();
		 var vac = $("#vac").val();
		 var postu = $("#postu").val();
			
			if(aux_filtro == "" || vac == "" || postu ==""){
				$( "#dialog_selecPostulante" ).dialog( "open");
			}else{
		 
		 	$("#masterForm").attr("action","InMiFiltro");
			$("#masterForm").submit();
			
			}
	   });
	 
	 
	 
	 $("#irMiFiltro").click(function(){
		 
		
				 $("#masterForm").attr("action","VerMiFiltro");
				 $("#masterForm").submit();
			
		 
		
		 
		 
	   });
	 
	 
	 
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
		
		
		$("#lista-vacs-filtro").change(function(){
			  var idVac = $(this).val();
			  filtrarPorVac(idVac);
			  $("#lista-vacs-filtro").val(0);
		 });
		
		
		$("#ver_deta").click(function(){
			var id = $("#postu").val();
			var url = "PerfilVista?idUsuario="+id+"";
		    window.open(url, '_blank');
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


function abrirComen(aux_filtro){
	$("#ayuda").val(aux_filtro);
	$( "#dialog_agregar_observaciones" ).dialog( "open");
}

function JsonAndAjaxComentarios() {
	var num_aux_filtro = $("#ayuda").val();
	var comentarios = $("#comentarios").val();
	var calificacion = $("#calificacion").val();
	if(comentarios == ""){
		alertify.alert("Debes Insertar un Comentario u Observacion")
	}else{
		$.getJSON('json/cambiarComentarios' ,
				  {num_aux_filtro: num_aux_filtro,comentarios:comentarios,calificacion:calificacion},
				  function(jsonDataDC) {
					  
					  
					  if(jsonDataDC.items[0].observacionesNuevas.length > 20){
						  
						  
						 
						  $("#comen"+num_aux_filtro).html(jsonDataDC.items[0].observacionesNuevas.slice(0,20)+"...<br/> <a id='"+num_aux_filtro+"' class='verObs'>Ver Mas</a> ");
						  
						 
			    	     }else{
			    	    	 
			    	    	 $("#comen"+num_aux_filtro).html(jsonDataDC.items[0].observacionesNuevas);
			    	     }
					  
					  
					  var id_ayuda = $("#aux_filtro").val();
					  $("#jup"+id_ayuda).attr('class','calif_tipo'+jsonDataDC.items[0].valorCalif);
					  
					  
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
					  
					  
					  $(".verObs").click(function(){
						 	var postulante = $(this).attr("id");
						 	
						 	if(postulante == ""){
						 		$( "#dialog_selecPostulante" ).dialog( "open");
						 	}else{
						 		verPostuObs(postulante);
						 		$("#dialog_observaciones").dialog( "open");
						 	}

					   });
					  
					 
				  }
				 );
				 return false;
	}
	
	 
}


function otroPoceso(postulante) {
	 $.getJSON('json/otroProceso' ,
	  {postulante: postulante},
	  function(jsonDataOP) {
		  
		  $("#dialog_otroProceso").dialog('option', 'title', "Otro Poceso de "+jsonDataOP.nombre[0].nombre+" ");
			 
		  $("#nombreUsuario").text(jsonDataOP.nombre[0].nombre);
		  
		  
		  
		  
		  $("#postulaciones").text(jsonDataOP.listaVacantes.length);
		  
		  
		  for(j=0;j<=(jsonDataOP.listaVacantes.length)-1;j++){
			  $("<div class='removible' id='"+jsonDataOP.listaVacantes[j].lasVacantes+"'><p>"+jsonDataOP.listaVacantes[j].lasVacantes+"</p></div>").appendTo(".contien_vacOtroProceso");
		  }
		  
		 
		  
		  
		  for(j=0;j<=(jsonDataOP.interactuandoPrimerFiltro.length)-1;j++){
			  $("<div class='removible' id='"+jsonDataOP.interactuandoPrimerFiltro[j].interactuando+"'><p>"+jsonDataOP.interactuandoPrimerFiltro[j].interactuando+"</p></div>").appendTo(".InteractuandoOtroProceso");
		  }
		  
		  
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
		  
		  
		  $(".verObs").click(function(){
			 	var postulante = $(this).attr("id");
			 	
			 	if(postulante == ""){
			 		$( "#dialog_selecPostulante" ).dialog( "open");
			 	}else{
			 		verPostuObs(postulante);
			 		$("#dialog_observaciones").dialog( "open");
			 	}

		   });
		  
		  
	  }
	 );
	 return false;
}




function filtrarPorVac(idVac){
	var idVacante = idVac;
	
	$.getJSON('json/filtrarPorVacanteMiFiltro',{idVacante:idVacante},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  
					  if(jsonData.items.length == 0){
						  
						  $("#labelSelecPos").text("Esta Vacante no tiene Postulantes, selecciona otra");
						  $( "#dialog_selecPostulante" ).dialog( "open");
						  
					  }else{
						  
						  
						  for(j=0;j<=(jsonData.items.length)-1;j++){
							  
							  pinta();
							  
							  
							  var table = document.getElementById("ttt");
							  var row = table.insertRow(0);
							  row.id=""+jsonData.items[j].id_mi_nuevo_filtro+"EN"+jsonData.items[j].idVAC+"CON"+jsonData.items[j].idPOSTU+"";
							  row.className="adminRow";
							  var cell1=row.insertCell(0);
							  cell1.className="adminData";
							  cell1.id="name"+jsonData.items[j].id_mi_nuevo_filtro+"";
							  var cell2=row.insertCell(1);
							  cell2.className="adminData";
							  var cell3=row.insertCell(2);
							  cell3.className="adminData";
							  var cell4=row.insertCell(3);
							  cell4.className="adminData";
							  var cell5=row.insertCell(4);
							  cell5.className="adminData";
							  var cell6=row.insertCell(5);
							  cell6.className="adminData";
							  var cell7=row.insertCell(6);
							  cell7.id="comen"+jsonData.items[j].id_mi_nuevo_filtro+"";
							  cell7.className="adminData";
							 
							  
							  
							  cell1.innerHTML=""+jsonData.items[j].nombrePOSTU+"";
							  cell2.innerHTML=""+jsonData.items[j].nombreVAC+"";
							  cell3.innerHTML=""+jsonData.items[j].tel+"";
							  cell4.innerHTML=""+jsonData.items[j].mail+"";
							  cell5.innerHTML="<a id='"+jsonData.items[j].idPOSTU+"' class='otroProcesoLink' style='color:#000; cursor:pointer;'>Ver</a>";
							  cell6.innerHTML="<div id='jup"+jsonData.items[j].id_mi_nuevo_filtro+"' class='calif_tipo"+jsonData.items[j].calif+"' style='margin-left:50px;'></div>";
							  var observ = jsonData.items[j].observaciones;
							  if( observ == null){
								  observ = "No se tiene observaciones";
							  }else{
								  
								  
								  if(jsonData.items[j].observaciones.length > 20){
									  
									  observ = jsonData.items[j].observaciones.slice(0,20)+"...<br/> <a id='"+jsonData.items[j].id_mi_nuevo_filtro+"' class='verObs'>Ver Mas</a> ";
									  
						    	      
						    	     }else{
						    	      observ = jsonData.items[j].observaciones;
						    	     }
								 
							  }
							  cell7.innerHTML=""+observ+"";
							  
							  
						  }
						  
						  
						  
					  }
					  
					  
					  
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
					  
					  
					  $(".verObs").click(function(){
						 	var postulante = $(this).attr("id");
						 	
						 	if(postulante == ""){
						 		$( "#dialog_selecPostulante" ).dialog( "open");
						 	}else{
						 		verPostuObs(postulante);
						 		$("#dialog_observaciones").dialog( "open");
						 	}

					   });
					  
					  
					  
					  
					  
					  
					  
				  }
			  });
			 return false;
	
}


function verPostuObs(postulante){
	var id_postu = postulante;
	
	
	 $.getJSON('json/verComentarios' ,
			  {id_postu: id_postu},
			  function(jsonData) {
				  
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  var nombre = $("#name"+id_postu).html();
						  
						  $("#dialog_observaciones").dialog('option', 'title', "Comentarios de "+nombre+" ");
						  
						  
						  
						  $("#comentariosRecibe").val(jsonData.items[j].observacionesNuevas);
					  }
					  
				  }
				  
				 
				  
				  
			  }
			 );
			 return false;
	
	
}



