

var selec = 0;
var innn = 0;
var seleccionP = new Array();
var seleccionadas = new Array();
var indice = 0;

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
	
	$("#dialog_entrevistar").dialog({
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
		  
		  
		  $("#usu").val(dosPartes[0]);
		  $("#vac").val(dosPartes[1]);
		  $("tr.adminRow").css("color","black");
		  pinta();
	   });
	 
	
	$("input.genero").each(function(){
		var value = $(this).val();
		if(value == 'M'){
			$("td.conteGenero").html('<div class="masculino"></div>');
		}else if(value == 'F'){
			$("td.conteGenero").html('<div class="femenino"></div>');
		}
		
	});
	
	
	$("#meterPrimerFiltro").click(function(){
		
		var check = $("input[type='checkbox']:checked").length;
		
		if ( check == ""){
			$("#dialog_selecPostulante").dialog( "open");
		}else{
			$("#jup").attr("action","InFiltro");
			$("#jup").submit();
		}
		
	});
	
	
	
	$("#irPrimerFiltro").click(function(){
		$("#jup").attr("action","VerFiltro");
		$("#jup").submit();
	});
	
	$("#entrevistar").click(function(){
		var check = $("input[type='checkbox']:checked").length;
		
		var num_id = $("input[type='checkbox']:checked").val();
		
		
		if( check == 0 ){
			$("#labelSelecPos").text("DEBES SELECCIONAR UN POSTULANTE PRIMERO");
			$( "#dialog_selecPostulante" ).dialog( "open");
		}else if( check == 1){
			Entrevistar(num_id);
			$( "#dialog_entrevistar" ).dialog( "open");
		}else if(check > 1){
			$("#labelSelecPos").text("Solamente puedes ver los Datos para entrevistar postulante por postulante");
			$( "#dialog_selecPostulante" ).dialog( "open");
		}
		
		
		
		
	});
	

	$("#otroProceso").click(function(){
	 	var postulante = $("#usu").val();
	 	
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
	
	function arreglo_llenado(){
		$('input.checkCan').each(function(){
			var id = $(this).attr('id');
			
			if($("#"+id).is(':checked')){
				var value = $("#"+id).val();
				seleccionP[innn] = value;
				console.info(seleccionP[innn]);
				innn = innn + 1;
			}
			
		});
	}
	
	$("#borra_pos").click(function(){
		
		var check = $("input[type='checkbox']:checked").length;
		var namepos=$("#lista-vacs-filtro").val();
		if ( check == ""){
			$("#dialog_selecPostulante").dialog( "open");
		}else{
			var i=0;
			
			arreglo_llenado();
			var idPostuElim;
			for(i=0;i <= (check -1);i++){
				idPostuElim = seleccionP[i];
				 $.getJSON('json/EliminarMisCandidatos',
						 {idPostuElim: idPostuElim,namepos:namepos},
						  function(jsonData) {
							 alertify.alert("USUARIO ELIMINADO CORRECTAMENTE");
							  $("#"+seleccionP[i]).hide();
							} );
						 return false;
				
			}
			
			seleccionP.length = 0;
		}
		
		
		
	});


	
	$("#ver_deta").click(function(){
		
		var seleccionadas = new Array();
		var indice = 0;
		
		var check = $("input[type='checkbox']:checked").length;
		
		$('input.checkCan').each(function(){
			var id = $(this).attr('id');
			
			if($("#"+id).is(':checked')){
				var value = $("#"+id).val();
				seleccionadas[indice] = value;
				console.info(seleccionadas[indice]);
				indice = indice + 1;
			}
			
		});
		
		if ( check == ""){
			$("#dialog_selecPostulante").dialog( "open");
		}else{
			for(var j=0;j<=(check-1);j++){
				var idUsu = seleccionadas[j];
				url = "PerfilVista?idUsuario="+idUsu+"";
			    window.open(url, '_blank');
			}
			
			seleccionadas.length = 0;
			
			
			
		}
		
		
	});
	
	
	$("#lista-vacs-filtro").change(function(){
		  var idVac = $(this).val();
		  filtrarPorVac(idVac);
	  });
	
	
	 $("#verTodo").click(function(){
		 location.reload();
	  });
	
});


function pinta(){	
	 cual=document.getElementById("tabla").rows;
	 var a;
	 for(a=0;a<cual.length;a++){
	  color(a);
	 }
	 var usu=$("#usu").val();
	 pintaRojo();
}
function color(b){
	if(b%2==0)
		cual[b].style.backgroundColor="";
	else
		cual[b].style.backgroundColor="#d3d2d2";
}

function pintaRojo(){
	$("input.checkCan").each(function(){
		var id=$(this).attr("id");
		var row=$(this).val();
		if(document.getElementById(id).checked == true){
			$("#"+row+"").css("background-color","#CA3B3B ");
			$("#"+row+"").css("color","white ");
			$("#seleccion").val("1");
		}else{
			$("#seleccion").val("");
		}
		
	});
	
}

function Entrevistar(num_id) {
	 $.getJSON('json/datosPostulante' ,
	  {num_id: num_id},
	  function(jsonDataDP) {
		  
		  $("#nombreUsuario2").text(jsonDataDP.items[0].nombre +" "+ jsonDataDP.items[0].apellidoP +" "+ jsonDataDP.items[0].apellidoM );
		  $("#telefono").text(jsonDataDP.items[0].telefono);
		  $("#correo_electronico").text(jsonDataDP.items[0].correo_electronico);
		  
		  
	  }
	 );
	 return false;
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
		  
		  for(j=0;j<=(jsonDataOP.observaciones.length)-1;j++){
			  $("<div class='removible' id='"+jsonDataOP.observaciones[j].filtro_obs+"'><p>"+jsonDataOP.observaciones[j].filtro_obs+"</p></div>").appendTo(".observaciones_detalle");
		  }
		 
		  
		  
		  
	  }
	 );
	 return false;
}

	

function filtrarPorVac(idVac){
	var idVacante = idVac;
	
	$.getJSON('json/filtrarPorVacantePostulante',{idVacante:idVacante},
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
							  row.id=""+jsonData.items[j].idPOSTU+"";
							  row.className="adminRow";
							  var cell1=row.insertCell(0);
							  cell1.className="adminData";
							  var cell2=row.insertCell(1);
							  cell2.className="adminData";
							  var cell3=row.insertCell(2);
							  cell3.className="adminData";
							  var cell4=row.insertCell(3);
							  cell4.className="adminData";
							  var cell5=row.insertCell(4);
							  cell5.className="adminData";
							  var cell6=row.insertCell(5);
							  cell6.className="adminData conteGenero";
							  var cell7=row.insertCell(6);
							  cell7.className="adminData";
							 
							  
							  
							  cell1.innerHTML="<input type='checkbox' id='canid_"+jsonData.items[j].idPOSTU+"' name='arregloUsu' class='checkCan' value='"+jsonData.items[j].idPOSTU+"'/>";
							  cell2.innerHTML=""+jsonData.items[j].nombrePOSTU+"";
							  cell3.innerHTML="<input type ='hidden' class='arregloVac' name ='arregloVac' value='"+jsonData.items[j].idVAC+"'/>"+jsonData.items[j].nombreVAC+"";
							  cell4.innerHTML=""+jsonData.items[j].areaInteres+"";
							  cell5.innerHTML=""+jsonData.items[j].edad+"";
							  cell6.innerHTML="<div class='gene"+jsonData.items[j].sexo+"'></div>";
							  cell7.innerHTML="<a id='"+jsonData.items[j].idPOSTU+"' class='otroProcesoLink' style='color:#000; cursor:pointer;'>Ver</a>";
							  
							
							  
							 
							  
							  
						  }
						  
						  
						  
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
							  
							  
							  $("#usu").val(dosPartes[0]);
							  $("#vac").val(dosPartes[1]);
							  $("tr.adminRow").css("color","black");
							  pinta();
						   });
					  
					  
					  
					  
				  }
			  }
			 );
			 return false;
	
}




