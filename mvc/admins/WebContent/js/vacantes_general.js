

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#nombreVacante").Watermark("Inserta Nombre Vacante a Buscar");
	
	JsonAndAjax(1);
	
	pinta();
	
	$(".emergente").click(function(){
		var num_folio = $(this).attr('id');
		$("#num_vac").text(num_folio);
		JsonAndAjaxDetalleVacante(num_folio);
		$( "#dialog_vacante" ).dialog( "open");
	});
	
	$("#dialog_vacante").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 560,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() {
	              $(this).dialog('close');
	              mostrarAgain();
	                    
	        }
	    }
	 });
	
	$("#dialog_exportar").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 360,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Cancelar': function() { $(this).dialog('close'); },
	        'Aceptar': function() {
	        	exportar();       
	        }
	    }
	 });
	
	
	
	
	$("#dialog_export_msj").dialog({
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
	        'Aceptar': function() {
	        	$(this).dialog('close');   
	        }
	    }
	 });
	
	
	
	
	
	$("#dialog_cambio_msj").dialog({
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
	        'Aceptar': function() {
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
	        'Eliminar': function() { eliminar_vac(); $(this).dialog('close'); },
	        'Dar de Baja': function() {baja_vac(); $(this).dialog('close'); }
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
	
	
	
	$("#dialog_busPalabra").dialog({
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
	
	
	
	$("#dialog_Desta").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {
	    	$("#cuarpoDesNa").html("");
			$("#cuarpoDesRegio").html("");
	    },
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 600,
	    width: 670,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Cerrar': function() { 
	        	$(this).dialog('close');
	        	$("#cuarpoDesNa").html("");
				$("#cuarpoDesRegio").html("");
	        	}
	       
	    }
	 });
	
	
	
	$(".destaBtn").click(function(){
		cargarDestaNacio();
		cargarDestaRegio();
		cargarNacionalesDiv();
		cargarRegionalesDiv();
		
		$( "#dialog_Desta" ).dialog( "open");
	  });
	
	
	$("tr.adminRowVac2").mouseover(function(){
		  $(this).css("background-color","#CA3B3B ");
		  $(this).css("color","white");
		  
	   });
	  
	  $("tr.adminRowVac2").mouseleave(function(){
		  pinta();
		  $(this).css("color","black");
	   });
	  
	  
	  $("#btnNuevo").click(function(){
			window.location.href="VacanteNueva";
	   });
	  
	  
	  $("#btnMod").click(function(){
		  	var id=$("#seleccion").val();
		  	
		  	if(id==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		$("#editar_vac").submit();
		  	}
	   });
	  
	  $("#btnDel").click(function(){
		  	var id=$("#seleccion").val();
		  	
		  	if(id==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		abrirElim(id);
		  	}
	   });
	  
	  
	  
	  $("#btnPostu").click(function(){
		  	var id_vac=$("#seleccion").val();
		  	$("#id_Vacante").val(id_vac);
		  	if(id_vac==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		$("#enviar_vac_postu").submit();
		  	}
	   });
	  
	  
	  
	  
	  
	  $("#cambiarEstado").click(function(){
		  	var id_vac=$("#seleccion").val();
		  	$("#id_Vacante").val(id_vac);
		  	if(id_vac==""){
		  		$( "#dialog_selecPostulante" ).dialog( "open");
		  	}else{
		  		
		  		$("#dialog_cambiaEstado").dialog( "open");
		  	}
	   });
	  
	 
	  
	  $("#lista-admins").change(function(){
		  var idAdmin = $(this).val();
		  JsonFiltroAdmin(idAdmin,"1");
	  });
	  
	  
	  $("#lista-tipos-geo").change(function(){
		  var idTipo = $(this).val();
		  JsonFiltroTipo(idTipo,"1");
	  });
	  
	  $("#verPorNombre").click(function(){
		  var nombreVacante = $("#nombreVacante").val();
		  if(nombreVacante=="Inserta Nombre Vacante a Buscar"){
			  $( "#dialog_busPalabra" ).dialog( "open");
		  }else{
			  JsonFiltroNombre(nombreVacante,"1");
		  }
	  });
	  
	  
	  $("#verTodo").click(function(){
		  JsonAndAjax();
	  });
	  
	  
	  $("#expo").click(function(){
		  exportar();
	  });
	  
	  
	  $("#lista-vacs-filtro-na").change(function(){
		  var idVac = $(this).val();
		  verificarDestaNa(idVac);
	  });
	  
	  $("#lista-vacs-filtro-re").change(function(){
		  var idVac = $(this).val();
		  verificarDestaRe(idVac);
	  });
	  
	  
	  
	  $("#BotonDesN").click(function(){
		  var idVac = $("#lista-vacs-filtro-na").val();
		  
		  if(idVac==0){
			  alertify.alert("Selecciona una vacante primero");
		  }else if($("#numeroRestantesNacio").text() == "Restantes: 0"){
			  alertify.alert("Has agotado tus Destacadas Nacionales");
		  }else{
			  agregarNacionalDes(idVac);
		  }
		  
		  
		  
		  
	  });
	  
	  $("#BotonDesR").click(function(){
		  var idVac = $("#lista-vacs-filtro-re").val();
		  if(idVac==0){
			  alertify.alert("Selecciona una vacante primero");
		  }else if($("#numeroRestantesRegio").text() == "Restantes: 0"){
			  alertify.alert("Has agotado tus Destacadas Regionales");
		  }else{
			  agregarRegionalDes(idVac);
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



function abrirExportar(){
	$( "#dialog_exportar" ).dialog( "open");
}




function eliminar_vac(){
	
	 var num_folio = $("#num_vac").text();
	 var idVacante=$("#seleccion").val();
	 $.post("/admins/VacanteEliminar", {idVacante:idVacante}, function(data) {
	      if(data){
	       
	    	
	    	  window.location.href="VacanteGeneral";
	    	  $("#"+num_folio).hide();
	       
	       
	      }
	     } );
}


function cambiar_estado(){
	 var num_folio = $("#num_vac").text();
	 var idVacante=$("#seleccion").val();
}

function baja_vac(){
	var idVacante=$("#seleccion").val();
	
	$.post("/admins/VacanteBaja", {idVacante:idVacante}, function(data) {
	      if(data){
	       
	    	
	    	  window.location.href="VacanteGeneral";
	    	  
	       
	       
	      }
	     } );
}


function restaValreg(val){
	var oper=val-22;
	if(oper==1 || oper<1){
		$("#contBloq").val("1");
		JsonAndAjax("1");
	}else{
		$("#contBloq").val(oper);
		JsonAndAjax(oper);
	}
}

function restaValregAdm(idAdmin,val){
	var oper=val-22;
	if(oper==1 || oper<1){
		$("#contBloq").val("1");
		JsonFiltroAdmin(idAdmin,"1");
	}else{
		$("#contBloq").val(oper);
		JsonFiltroAdmin(idAdmin,oper);
	}
}

function restaValregTip(idTipo,val){
	var oper=val-22;
	if(oper==1 || oper<1){
		$("#contBloq").val("1");
		JsonFiltroTipo(idTipo,"1");
	}else{
		$("#contBloq").val(oper);
		JsonFiltroTipo(idTipo,oper);
	}
}

function restaValregNom(nomVac,val){
	var oper=val-22;
	if(oper==1 || oper<1){
		$("#contBloq").val("1");
		JsonFiltroNombre(nomVac,"1");
	}else{
		$("#contBloq").val(oper);
		JsonFiltroNombre(nomVac,oper);
	}
}

function JsonAndAjax(valI) {
	 $.getJSON('json/giveMeJsonDataG',
	  function(jsonData) {
		  if(eval(jsonData)){
			  var vacante = eval(jsonData);
			  $("#ttt").html("");
			  
			  for(j=0;j<=(jsonData.items.length)-1;j++){
				  
				  pinta();
				  
				  var table = document.getElementById("ttt");
				  var row = table.insertRow(0);
				  row.id=""+jsonData.items[j].id_vacante+"";
				  row.className="adminRowVac2";
				  var cell1=row.insertCell(0);
				  cell1.id="jup";
				  cell1.className="adminDataVac";
				  var cell2=row.insertCell(1);
				  cell2.id="jup";
				  cell2.className="adminDataVac";
				  var cell3=row.insertCell(2);
				  cell3.id="jup";
				  cell3.className="adminDataVac";
				  var cell4=row.insertCell(3);
				  cell4.id="jup";
				  cell4.className="adminDataVac";
				  var cell5=row.insertCell(4);
				  cell5.id="jup";
				  cell5.className="adminDataVac";
				  var cell6=row.insertCell(5);
				  cell6.id="jup";
				  cell6.className="adminDataVac";
				  var cell7=row.insertCell(6);
				  cell7.id="jup";
				  cell7.className="adminDataVac";
				  var cell8=row.insertCell(7);
				  cell8.id="jup";
				  cell8.className="adminDataVac";
				  
				  
				  
				  cell1.innerHTML=""+jsonData.items[j].folio+"";
				  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
				  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
				  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
				  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
				  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
				  
				  
				  var jup="";
				  if(jsonData.items[j].destacado==1){
					  jup = "<div class='estrellaOro'></div>";
				  }else if(jsonData.items[j].destacado==2){
					  jup="<div class='estrellaPlata'></div>";
				  }else if(jsonData.items[j].destacado==3){
					  jup="<div class='estrellaRojo'></div>";
				  }else if(jsonData.items[j].destacado==0){
					  jup="<div class='estrellaNo'></div>";
				  }
				  
				  cell7.innerHTML =""+jup+""; 
				  
				  
				  var estaVac = "";
				  var id_ayuda = jsonData.items[j].id_vacante
				  
				  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
				  cell8.innerHTML = ""+estaVac+"";
				  
				  
			  }
			  
			  $(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
			  
			  $("tr.adminRowVac2").mouseover(function(){
				  $(this).css("background-color","#CA3B3B ");
				  $(this).css("color","white");
				  
				  	
			   });
			  
			  $("tr.adminRowVac2").mouseleave(function(){
				  pinta();
				  if($(this).attr("id")!=$("#seleccion").val())
					  $(this).css("color","black");
				  	 
				  
			   });
			  
			  $("tr.adminRowVac2").click(function(){
				  var id=$(this).attr("id");
				  $("#seleccion").val(id);
				  $("tr.adminRowVac2").css("color","black");
				  $("a.emergente").css("color","withe");
				  pinta();
			   });
			  
			  
			  var numeroVacantes = jsonData.numeroVacantes[0].num_vacantes;
			  
			  var total = numeroVacantes;
			  
			  var diPag = (total / 5);
			  
			  var numLinks = Math.ceil(diPag);
			  
			  var numLinksF = parseInt(numLinks);
			  
			  $("#paginacionContenedor").empty();
			  
			  var countPag=0;
			  var ultVal=0;
			  
			  if (valI!=1){
				  $("#paginacionContenedor").empty();
				  $("#paginacionContenedor").append("<a href='#' onclick='restaValreg($(\"#contBloq\").val());' style='cursor: pointer; float: left; font-size: 15px; font-weight: bold; height: 20px; margin-right: 5px; padding: 5px; width: 35px;'><img src='images/icono.flecha.izquierda.png' alt='Bloque Anterior' height='42' width='42'></a>"); 
			  }
			  for(t=valI;t<=numLinksF;t++){
				  
				  if(t==numLinksF){
					  ultVal=1; 
				  }
				  
				  
				  if(countPag==11){
					  
				  $("#contBloq").val(t);
				  countPag=0;
				  break;
				  
				  }
				  else
					  {
					  if(countPag==0){
						  limpiaClaseActiva();
						  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink activePaginacion'>"+t+"</a>");
							var numValor = t;
							
							var hasta = numValor * 5;
							
							var desde = (hasta - 5) + 1;
						
							resulPaginado(desde,hasta);
					  }else{
						  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink'>"+t+"</a>");
					  }
					  }
				  countPag++;
			  }
			  
			  if(ultVal!=1){
				  $("#paginacionContenedor").append("<a href='#' onclick='JsonAndAjax($(\"#contBloq\").val());'><img src='images/icono.flecha.derecha.png' alt='Siguiente Bloque' height='42' width='42'></a>");
			  }
			  
			  
			  $(".paginacionLink").click(function(){
				   
					var num_op = $(this).attr('id');
					
					var acClase = $("#"+num_op).attr('class');
					
					limpiaClaseActiva();
					
					$("#"+num_op).addClass("activePaginacion");
					
					
					
					var separa = num_op.split("opcio");
					
					var numValor = separa[1];
					
					var hasta = numValor * 5;
					
					var desde = (hasta - 5) + 1;
					
					
					
					resulPaginado(desde,hasta);
					
					
					
				});
			  
			  
		  }
	  }
	 );
	 return false;
}






function JsonAndAjaxDetalleVacante(num_folio) {
	 $.getJSON('json/giveMeJsonDataDetalleVac' ,
	  {num_folio: num_folio},
	  function(jsonData) {
		  
		  if(jsonData.items[0].nombre ==""){
			  $("#labelNom").hide();
			  $("#nom_vac").hide();
		  }else{
			  $("#nom_vac").text(jsonData.items[0].nombre);
		  }
		  
		  
		  
		  if(jsonData.items[0].texto =="" || jsonData.items[0].texto ==null){
			  $("#labelRes").hide();
			  $("#text_int").hide();
		  }else{
			  $("#text_int").text(jsonData.items[0].texto);
		  }
		  
		 
		  if(jsonData.items[0].escolaridad ==""){
			  $("#labelNiv").hide();
			  $("#esco").hide();
		  }else{
			  if(jsonData.items[0].escolaridad == 1){
				  $("#esco").text("Secundaria");
			  }else if(jsonData.items[0].escolaridad == 2){
				  $("#esco").text("Bachillerato");
			  }else if(jsonData.items[0].escolaridad == 3){
				  $("#esco").text("Tecnico");
			  }else if(jsonData.items[0].escolaridad == 4){
				  $("#esco").text("Estudios Superiores");
			  }else if(jsonData.items[0].escolaridad == 5){
				  $("#esco").text("Diplomado");
			  }else if(jsonData.items[0].escolaridad == 6){
				  $("#esco").text("Maestria");
			  }else if(jsonData.items[0].escolaridad == 7){
				  $("#esco").text("Doctorado");
			  }else if(jsonData.items[0].escolaridad == 8){
				  $("#esco").text("Otro");
			  }else{
				  $("#esco").text(jsonData.items[0].escolaridad);
			  }
		  }
		  
		  
		  
		  if(jsonData.items[0].conocimientos =="" || jsonData.items[0].conocimientos ==null){
			  $("#labelCon").hide();
			  $("#conocimient").hide();
		  }else{
			  $("#conocimient").text(jsonData.items[0].conocimientos);
		  }
		  
		  
		  if(jsonData.items[0].talentos =="" || jsonData.items[0].talentos ==null){
			  $("#labelTal").hide();
			  $("#talent").hide();
		  }else{
			  $("#talent").text(jsonData.items[0].talentos);
		  }
		  
		  
		  if(jsonData.items[0].ubicaciones =="" || jsonData.items[0].ubicaciones =="---" || jsonData.items[0].ubicaciones ==null ){
			  $("#labelUbi").hide();
			  $("#ubicati").hide();
		  }else{
			  $("#ubicati").text(jsonData.items[0].ubicaciones);
		  }
		  
		  
		  if(jsonData.items[0].area =="" || jsonData.items[0].area ==null){
			  $("#labelAre").hide();
			  $("#are_exp").hide();
		  }else{
			  $("#are_exp").text(jsonData.items[0].area);
		  }
		  
		  if(jsonData.items[0].funciones =="" || jsonData.items[0].funciones ==null){
			  $("#labelPrin").hide();
			  $("#prin_fun").hide();
		  }else{
			  $("#prin_fun").text(jsonData.items[0].funciones);
		  }
		  
		  
		  if(jsonData.items[0].sueldo == '0' || jsonData.items[0].sueldo ==null ){
			  $("#salario").text("A tratar en la Entrevista");
		  }else{
			  $("#salario").text("$"+jsonData.items[0].sueldo);
		  }
		  
		  if(jsonData.items[0].horario =="" || jsonData.items[0].horario ==null){
			  $("#labelHor").hide();
			  $("#horario").hide();
		  }else{
			  $("#horario").text(jsonData.items[0].horario);
		  }
		  
		  if(jsonData.items[0].edad =="" || jsonData.items[0].edad ==null){
			  $("#labelEda").hide();
			  $("#edad").hide();
		  }else{
			  $("#edad").text(jsonData.items[0].edad);
		  }
		  
		  if(jsonData.items[0].observaciones =="" || jsonData.items[0].observaciones =="Sin Observaciones" || jsonData.items[0].observaciones ==null){
			  $("#labelObs").hide();
			  $("#observaciones").hide();
		  }else{
			  $("#observaciones").text(jsonData.items[0].observaciones);
		  }
		  
		  
		  if(jsonData.items[0].fecha =="" || jsonData.items[0].fecha ==null){
			  $("#labelFec").hide();
			  $("#fecha").hide();
		  }else{
			  $("#fecha").text(jsonData.items[0].fecha);
		  }
		  
		  
		  
	  }
	 );
	 return false;
}




function JsonFiltroAdmin(idAdmin,valI){
	
	$.getJSON('json/giveMeJsonDataG',{idAdmin:idAdmin},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						
						  
						  var estaVac = "";
						  var id_ayuda = jsonData.items[j].id_vacante;
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						  
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	  
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					  
					  var numeroVacantes = jsonData.numeroVacantes[0].num_vacantes;
					  
					  var total = numeroVacantes;
					  
					  var diPag = (total / 5);
					  
					  var numLinks = Math.ceil(diPag);
					  
					  var numLinksF = parseInt(numLinks);
					  
					  $("#paginacionContenedor").empty();
					  
					  var countPag=0;
					  var ultVal=0;
					  
					  if (valI!=1){
						  $("#paginacionContenedor").empty();
						  $("#paginacionContenedor").append("<a href='#' onclick='restaValregAdm("+idAdmin+",$(\"#contBloq\").val());' style='cursor: pointer; float: left; font-size: 15px; font-weight: bold; height: 20px; margin-right: 5px; padding: 5px; width: 35px;'><img src='images/icono.flecha.izquierda.png' alt='Bloque Anterior' height='42' width='42'></a>"); 
					  }
					  for(t=valI;t<=numLinksF;t++){
						  
						  if(t==numLinksF){
							  ultVal=1; 
						  }
						  
						  
						  if(countPag==11){
							  
						  $("#contBloq").val(t);
						  countPag=0;
						  break;
						  
						  }
						  else
							  {
							  if(countPag==0){
								  limpiaClaseActiva();
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink activePaginacion'>"+t+"</a>");
									var numValor = t;
									
									var hasta = numValor * 5;
									
									var desde = (hasta - 5) + 1;
								
									resulPaginado(desde,hasta);
							  }else{
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink'>"+t+"</a>");
							  }
							  }
						  countPag++;
					  }
					  
					  if(ultVal!=1){
						  $("#paginacionContenedor").append("<a href='#' onclick='JsonFiltroAdmin("+idAdmin+",$(\"#contBloq\").val());'><img src='images/icono.flecha.derecha.png' alt='Siguiente Bloque' height='42' width='42'></a>");
					  }
					  
					  
					  $(".paginacionLink").click(function(){
							var num_op = $(this).attr('id');
							
							var separa = num_op.split("opcio");
							
							var numValor = separa[1];
							
							var hasta = numValor * 5;
							
							var desde = (hasta - 5) + 1;
							
							
							
							resulPaginadoIdAdmin(desde,hasta,idAdmin);
							
						});
					  
					  
					  
					  
					  
					  
					  
					  
					  
				  }
			  }
			 );
			 return false;
	
}

function JsonFiltroTipo(idTipo,valI){
	
	$.getJSON('json/giveMeJsonDataG',{idTipo:idTipo},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
				
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						 
						  
						  var estaVac = "";
						  var id_ayuda = jsonData.items[j].id_vacante
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						  
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	  
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					  
					  var numeroVacantes = jsonData.numeroVacantes[0].num_vacantes;
					  
					  var total = numeroVacantes;
					  
					  var diPag = (total / 5);
					  
					  var numLinks = Math.ceil(diPag);
					  
					  var numLinksF = parseInt(numLinks);
					  
					  $("#paginacionContenedor").empty();
					  
					  var countPag=0;
					  var ultVal=0;
					  
					  if (valI!=1){
						  $("#paginacionContenedor").empty();
						  $("#paginacionContenedor").append("<a href='#' onclick='restaValregTip("+idTipo+",$(\"#contBloq\").val());' style='cursor: pointer; float: left; font-size: 15px; font-weight: bold; height: 20px; margin-right: 5px; padding: 5px; width: 35px;'><img src='images/icono.flecha.izquierda.png' alt='Bloque Anterior' height='42' width='42'></a>"); 
					  }
					  for(t=valI;t<=numLinksF;t++){
						  
						  if(t==numLinksF){
							  ultVal=1; 
						  }
						  
						  
						  if(countPag==11){
							  
						  $("#contBloq").val(t);
						  countPag=0;
						  break;
						  
						  }
						  else
							  {
							  if(countPag==0){
								  limpiaClaseActiva();
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink activePaginacion'>"+t+"</a>");
									var numValor = t;
									
									var hasta = numValor * 5;
									
									var desde = (hasta - 5) + 1;
								
									resulPaginado(desde,hasta);
							  }else{
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink'>"+t+"</a>");
							  }
							  }
						  countPag++;
					  }
					  
					  if(ultVal!=1){
						  $("#paginacionContenedor").append("<a href='#' onclick='JsonFiltroTipo("+idTipo+",$(\"#contBloq\").val());'><img src='images/icono.flecha.derecha.png' alt='Siguiente Bloque' height='42' width='42'></a>");
					  }
					  
					  
					  $(".paginacionLink").click(function(){
							var num_op = $(this).attr('id');
							
							var separa = num_op.split("opcio");
							
							var numValor = separa[1];
							
							var hasta = numValor * 5;
							
							var desde = (hasta - 5) + 1;
							
							
							
							resulPaginadoIdTipo(desde,hasta,idTipo);
							
						});
					  
					  
					  
				  }
			  }
			 );
			 return false;
	
}


function JsonFiltroNombre(nombreVacante,valI){
	
	$.getJSON('json/giveMeJsonDataG',{nombreVacante:nombreVacante},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
						 
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						  
						  
						  var estaVac = "";
						  
						  var id_ayuda = jsonData.items[j].id_vacante
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						 
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	  
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					  
					  var numeroVacantes = jsonData.numeroVacantes[0].num_vacantes;
					  
					  var total = numeroVacantes;
					  
					  var diPag = (total / 5);
					  
					  var numLinks = Math.ceil(diPag);
					  
					  var numLinksF = parseInt(numLinks);
					  
					  $("#paginacionContenedor").empty();
					  
					  var countPag=0;
					  var ultVal=0;
					  
					  if (valI!=1){
						  $("#paginacionContenedor").empty();
						  $("#paginacionContenedor").append("<a href='#' onclick='restaValregNom(\""+nombreVacante+"\",$(\"#contBloq\").val());' style='cursor: pointer; float: left; font-size: 15px; font-weight: bold; height: 20px; margin-right: 5px; padding: 5px; width: 35px;'><img src='images/icono.flecha.izquierda.png' alt='Bloque Anterior' height='42' width='42'></a>"); 
					  }
					  for(t=valI;t<=numLinksF;t++){
						  
						  if(t==numLinksF){
							  ultVal=1; 
						  }
						  
						  
						  if(countPag==11){
							  
						  $("#contBloq").val(t);
						  countPag=0;
						  break;
						  
						  }
						  else
							  {
							  if(countPag==0){
								  limpiaClaseActiva();
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink activePaginacion'>"+t+"</a>");
									var numValor = t;
									
									var hasta = numValor * 5;
									
									var desde = (hasta - 5) + 1;
								
									resulPaginado(desde,hasta);
							  }else{
								  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink'>"+t+"</a>");
							  }
							  }
						  countPag++;
					  }
					  
					  if(ultVal!=1){
						  $("#paginacionContenedor").append("<a href='#' onclick='JsonFiltroNombre(\""+nombreVacante+"\",$(\"#contBloq\").val());'><img src='images/icono.flecha.derecha.png' alt='Siguiente Bloque' height='42' width='42'></a>");
					  }
					  
					  
					  
					  $(".paginacionLink").click(function(){
							var num_op = $(this).attr('id');
							
							var separa = num_op.split("opcio");
							
							var numValor = separa[1];
							
							var hasta = numValor * 5;
							
							var desde = (hasta - 5) + 1;
							
							
							
							resulPaginadoNombreVacante(desde,hasta,nombreVacante);
							
						});
					  
				  }
			  }
			 );
			 return false;
	
}






function mensaje(){
	$( "#dialog_export_msj" ).dialog( "open");
}





function exportar() {
	
	  var tipoExportacion = $("#tipoExport").val();
	  
	  var nuevaCla = $("#tipoExport").val();
	  
	
	 
	
	 $.getJSON('json/exportarExcel' ,
	  {tipoExportacion: tipoExportacion,nuevaCla: nuevaCla},
	  function(jsonDataCAE) {
		  
		  
		  var error1 = jsonDataCAE.Mensajes[0].error1;
		  
		  if(error1=="Se ha Creado el Archivo Satisfactoriamente"){
		
			  var er1=jsonDataCAE.Mensajes[0].error1;
			  var er2=jsonDataCAE.Mensajes[0].ruta_nueva;
			  console.info(er1);
			  $("#mensaje").text(er1);
			  $("#lin_etsel").text("DESCARGAR ARCHIVO");
			  $("#lin_etsel").attr("href",er2);
			  mensaje();
		  }else if(error1=="No se ha creado el archivo Satisfactoriamente"){
			  var er1=jsonDataCAE.Mensajes[0].error1;
			  console.info(er1);
			  $("#mensaje").text(er1);
			  mensaje();
		  }
		  
		  
		  
		  
		 
	  }
	 );
	 return false;
	}




function cambiar_estado(){
	 var calificacionVac = $("#estadoVacante").val();
	 var idVacante=$("#seleccion").val();
	 
	 
	 $.getJSON('json/cambiarEstadoAjax',
			 {calificacionVac: calificacionVac,idVacante:idVacante},
			  function(jsonDataCED) {
				  
					  
					  var error1 = jsonDataCED.Mensajes[0].error1;
					  
					  if(error1=="HAS CAMBIADO EL ESTADO DE LA VACANTE"){
						  
						  
						  var id_ayuda = $("#seleccion").val();
						  
						  
						  $("#lala"+id_ayuda).attr('class','estaVac'+calificacionVac);

						  $("#mensaje2").text(error1);
						  
						  mensaje2();
						  
					  }else if(error1=="NO SE HA PODIDO MODIFICAR EL ESTADO DE LA VACANTE, DEBES INGRESAR UNA CALIFICACION"){
						  
						  $("#mensaje2").text(error1);
						  
						  mensaje2();
						  
					  }
					  
					  
				} );
			 return false;
	 
	 
}



function mensaje2(){
	$( "#dialog_cambio_msj" ).dialog( "open");
}



function resulPaginado(desde,hasta){
	var desdePag = desde;
	var hastaPag = hasta;
	
	
	$.getJSON('json/giveMeJsonDataG',{desdePag:desdePag,hastaPag:hastaPag},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML =""+jup+""; 
						  
						  
						  var estaVac = "";
						  var id_ayuda = jsonData.items[j].id_vacante
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						  
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	 
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					 
					  
					  
				  }
			  });
			 return false;
	
	
	
	
}


function resulPaginadoIdAdmin(desde,hasta,idAdmin){
	var desdePag = desde;
	var hastaPag = hasta;
	
	$.getJSON('json/giveMeJsonDataG',{idAdmin:idAdmin,desdePag:desdePag,hastaPag:hastaPag},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						
						  
						  var estaVac = "";
						  var id_ayuda = jsonData.items[j].id_vacante;
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						  
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	  
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					  
					
					  
					  
					  
				  }
			  }
			 );
			 return false;
	
	
	
}


function resulPaginadoIdTipo(desde,hasta,idTipo){
	
	var desdePag = desde;
	var hastaPag = hasta;
	
	$.getJSON('json/giveMeJsonDataG',{idTipo:idTipo,desdePag:desdePag,hastaPag:hastaPag},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
				
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						 
						  
						  var estaVac = "";
						  var id_ayuda = jsonData.items[j].id_vacante
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						  
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	 
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					 
					  
					  
					  
				  }
			  }
			 );
			 return false;
	
}


function resulPaginadoNombreVacante(desde,hasta,nombreVacante){
	
	var desdePag = desde;
	var hastaPag = hasta;
	
	$.getJSON('json/giveMeJsonDataG',{nombreVacante:nombreVacante,desdePag:desdePag,hastaPag:hastaPag},
			  function(jsonData) {
				  if(eval(jsonData)){
					  var vacante = eval(jsonData);
					  $("#ttt").html("");
					  
					  for(j=0;j<=(jsonData.items.length)-1;j++){
						  
						  pinta();
						  
						  var table = document.getElementById("ttt");
						  var row = table.insertRow(0);
						  row.id=""+jsonData.items[j].id_vacante+"";
						  row.className="adminRowVac2";
						  var cell1=row.insertCell(0);
						  cell1.id="jup";
						  cell1.className="adminDataVac";
						  var cell2=row.insertCell(1);
						  cell2.id="jup";
						  cell2.className="adminDataVac";
						  var cell3=row.insertCell(2);
						  cell3.id="jup";
						  cell3.className="adminDataVac";
						  var cell4=row.insertCell(3);
						  cell4.id="jup";
						  cell4.className="adminDataVac";
						  var cell5=row.insertCell(4);
						  cell5.id="jup";
						  cell5.className="adminDataVac";
						  var cell6=row.insertCell(5);
						  cell6.id="jup";
						  cell6.className="adminDataVac";
						  var cell7=row.insertCell(6);
						  cell7.id="jup";
						  cell7.className="adminDataVac";
						  var cell8=row.insertCell(7);
						  cell8.id="jup";
						  cell8.className="adminDataVac";
						  
						  
						  cell1.innerHTML=""+jsonData.items[j].folio+"";
						  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
						  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
						  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
						  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
						  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
						  
						  
						 
						  
						  var jup="";
						  if(jsonData.items[j].destacado==1){
							  jup = "<div class='estrellaOro'></div>";
						  }else if(jsonData.items[j].destacado==2){
							  jup="<div class='estrellaPlata'></div>";
						  }else if(jsonData.items[j].destacado==3){
							  jup="<div class='estrellaRojo'></div>";
						  }else if(jsonData.items[j].destacado==0){
							  jup="<div class='estrellaNo'></div>";
						  }
						  
						  cell7.innerHTML=""+jup+"";
						  
						  
						  
						  var estaVac = "";
						  
						  var id_ayuda = jsonData.items[j].id_vacante
						  
						  estaVac = "<div  id='lala"+id_ayuda+"' class='estaVac"+jsonData.items[j].estado+"'></div>";
						  cell8.innerHTML = ""+estaVac+"";
						  
						 
					  }
					  
					  $(".emergente").click(function(){
							var num_folio = $(this).attr('id');
							$("#num_vac").text(num_folio);
							JsonAndAjaxDetalleVacante(num_folio);
							$( "#dialog_vacante" ).dialog( "open");
						});
					  
					  $("tr.adminRowVac2").mouseover(function(){
						  $(this).css("background-color","#CA3B3B ");
						  $(this).css("color","white");
						  
						  	
					   });
					  
					  $("tr.adminRowVac2").mouseleave(function(){
						  pinta();
						  if($(this).attr("id")!=$("#seleccion").val())
							  $(this).css("color","black");
						  	
						  
					   });
					  
					  $("tr.adminRowVac2").click(function(){
						  var id=$(this).attr("id");
						  $("#seleccion").val(id);
						  $("tr.adminRowVac2").css("color","black");
						  $("a.emergente").css("color","withe");
						  pinta();
					   });
					  
					  
					  
					 
					  
				  }
			  }
			 );
			 return false;
	
	
}



function limpiaClaseActiva(){
	$(".paginacionLink").each(function(){
		
		var num_op = $(this).attr('id');
		
		$("#"+num_op).removeClass("activePaginacion");

		
	});
}


function mostrarAgain(){
	  $("#labelNom").show();
	  $("#nom_vac").show();
	  $("#nom_vac").text("");
	  $("#labelRes").show();
	  $("#text_int").show();
	  $("#text_int").text("");
	  $("#labelNiv").show();
	  $("#esco").show();
	  $("#esco").text("");
	  $("#labelCon").show();
	  $("#conocimient").show();
	  $("#conocimient").text("");
	  $("#labelTal").show();
	  $("#talent").show();
	  $("#talent").text("");
	  $("#labelUbi").show();
	  $("#ubicati").show();
	  $("#ubicati").text("");
	  $("#labelAre").show();
	  $("#are_exp").show();
	  $("#are_exp").text("");
	  $("#labelPrin").show();
	  $("#prin_fun").show();
	  $("#prin_fun").text("");
	  $("#labelHor").show();
	  $("#horario").show();
	  $("#horario").text("");
	  $("#labelEda").show();
	  $("#edad").show();
	  $("#edad").text("");
	  $("#labelObs").show();
	  $("#observaciones").show();
	  $("#observaciones").text("");
}



function cargarNacionalesDiv(){
	
	
	$.getJSON('json/verNacional' ,{},
			function(jsonData) {
		
				for(j=0;j<=(jsonData.items.length)-1;j++){
				
					
					if(jsonData.items[j].nombre.length > 20){
						$("#cuarpoDesNa").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre.slice(0,20)+"..."+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
					}else{
						$("#cuarpoDesNa").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
					}
					
					//$("#cuarpoDesNa").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
				
				}	
				
				
				
				$(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
				
				$(".deletDesImg").click(function(){
					var idVac2 = $(this).attr('id');
					quitarNacional(idVac2);
				});
		
				
			});
	
	return false;
	
}

function cargarRegionalesDiv(){
	var nivel= $("#nivel").val();
	
	$.getJSON('json/verRegional' ,{nivel:nivel},
			function(jsonData) {
		
					for(j=0;j<=(jsonData.items.length)-1;j++){
					
						
						if(jsonData.items[j].nombre.length > 20){
							$("#cuarpoDesRegio").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre.slice(0,20)+"..."+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
						}else{
							$("#cuarpoDesRegio").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
						}
						
						//$("#cuarpoDesRegio").append("<div id='Quit"+jsonData.items[j].idVac+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a><div class='deletDesImg' id='"+jsonData.items[j].idVac+"'></div></div>");
					
					}
				
				
				
				$(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
		
				$(".deletDesImg").click(function(){
					var idVac2 = $(this).attr('id');
					quitarRegional(idVac2);
				});
			});
	
	return false;
	
}



function cargarDestaNacio(){
	
	
	$.getJSON('json/verDestacadosNa',{},
			  function(jsonData) {
				  var mensaje = jsonData.Mensajes[0].error1;
				  
				  if(mensaje == "Restantes: 0"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 5");
				  }else if(mensaje == "Restantes: 1"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 4");
				  }else if(mensaje == "Restantes: 2"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 3");
				  }else if(mensaje == "Restantes: 3"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 2");
				  }else if(mensaje == "Restantes: 4"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 1");
				  }else if(mensaje == "Restantes: 5"){
					  $("#numeroRestantesNacio").text("");
					  $("#numeroRestantesNacio").text("Restantes: 0");
				  }
					  
				} );
			 return false;
	
}


function cargarDestaRegio(){
	
	var ubicacion = $("#ubbbb").val();
	
	$.getJSON('json/verDestacadosRe',{ubicacion:ubicacion},
			  function(jsonData) {
			
		var mensaje = jsonData.Mensajes[0].error1;
		  
					  if(mensaje == "Restantes: 0"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 5");
					  }else if(mensaje == "Restantes: 1"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 4");
					  }else if(mensaje == "Restantes: 2"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 3");
					  }else if(mensaje == "Restantes: 3"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 2");
					  }else if(mensaje == "Restantes: 4"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 1");
					  }else if(mensaje == "Restantes: 5"){
						  $("#numeroRestantesRegio").text("");
						  $("#numeroRestantesRegio").text("Restantes: 0");
					  }
					
					  
				} );
			 return false;
	
}


function verificarDestaNa(idVac){
	
	var idVac = idVac;
	
	var mensaje1;
	
	 var mensaje2;
	
	$.getJSON('json/yaEsDestacadaNa' ,{idVac: idVac},function(jsonData) { 
		
		mensaje1 = jsonData.Mensajes[0].YAESDESNACIO;
		
		if (mensaje1 == "1"){
			alertify.alert("Esta vacante ya se encuentra marcada como Destacada");
			$("#lista-vacs-filtro-na").val(0);
			$("#lista-vacs-filtro-re").val(0);
		}
		
		
		});
	
	
	$.getJSON('json/yaEsDestacadaRe' ,{idVac: idVac},function(jsonData) { 
		
		mensaje2 = jsonData.Mensajes[0].YAESDESNAREGIO; 
		
		if (mensaje2 == "1"){
			alertify.alert("Esta vacante ya se encuentra marcada como Destacada");
			$("#lista-vacs-filtro-na").val(0);
			$("#lista-vacs-filtro-re").val(0);
		}
		
		});
	
	
	
	
	
	
	return false;
	
	
}


function verificarDestaRe(idVac){
	
	var idVac = idVac;
	
	var mensaje1;
	
	 var mensaje2;
	
	 $.getJSON('json/yaEsDestacadaNa' ,{idVac: idVac},function(jsonData) { 
			
			mensaje1 = jsonData.Mensajes[0].YAESDESNACIO;
			
			if (mensaje1 == "1"){
				alertify.alert("Esta vacante ya se encuentra marcada como Destacada");
				$("#lista-vacs-filtro-na").val(0);
				$("#lista-vacs-filtro-re").val(0);
			}
			
			
			});
		
		
	$.getJSON('json/yaEsDestacadaRe' ,{idVac: idVac},function(jsonData) { 
			
			mensaje2 = jsonData.Mensajes[0].YAESDESNAREGIO; 
			
			if (mensaje2 == "1"){
				alertify.alert("Esta vacante ya se encuentra marcada como Destacada");
				$("#lista-vacs-filtro-na").val(0);
				$("#lista-vacs-filtro-re").val(0);
			}
			
			});
	
	
	
	
	
	
	return false;
	
	
}


function agregarNacionalDes(idVac){
	
	var idVacante = idVac;
	
	$.getJSON('json/agregarNacional' ,{idVacante: idVacante},
			function(jsonData) {
		
				var verificando = $("#numeroRestantesNacio").text();
				if( verificando == "Restantes: 0"){
					alertify.alert("No puedes agregar mas Destacados Nacionales, elimina uno e intente otra vez")
				}else{
					
					
					
					$("#cuarpoDesNa").append("<div id='Quit"+idVacante+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[0].folio+"'>"+jsonData.items[0].nombre+"</a><div class='deletDesImg' id='"+idVacante+"'></div></div>");
					
					
					var jup = $("#numeroRestantesNacio").text();
					
					if(jup == "Restantes: 5" ){$("#numeroRestantesNacio").text("Restantes: 4");}
					if(jup == "Restantes: 4" ){$("#numeroRestantesNacio").text("Restantes: 3");}
					if(jup == "Restantes: 3" ){$("#numeroRestantesNacio").text("Restantes: 2");}
					if(jup == "Restantes: 2" ){$("#numeroRestantesNacio").text("Restantes: 1");}
					if(jup == "Restantes: 1" ){$("#numeroRestantesNacio").text("Restantes: 0");}
				}
				
				
				$(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
				
				
				$(".deletDesImg").click(function(){
					var idVac2 = $(this).attr('id');
					alertify.alert(idVac2);
				});
		
				
			});
	
	return false;
	
}


function agregarRegionalDes(idVac){
	
	var idVacante = idVac;
	
	var region = $("#ubbbb").val();
	var nivel= $("#nivel").val();
	
	$.getJSON('json/agregarRegional' ,{idVacante: idVacante,region:region,nivel:nivel},
			function(jsonData) { 
		
				var verificando = $("#numeroRestantesRegio").text();
				if( verificando == "Restantes: 0"){
					alertify.alert("No puedes agregar mas Destacados Regionales, elimina uno e intente otra vez")
				}else{
					$("#cuarpoDesRegio").append("<div id='Quit"+idVacante+"' class='destaBoton'><a class='emergente' style='text-decoration:underline; cursor:pointer;'  id='"+jsonData.items[0].folio+"'>"+jsonData.items[0].nombre+"</a><div class='deletDesImg' id='"+idVacante+"'></div></div>");
					
					var jup = $("#numeroRestantesRegio").text();
					
					if(jup == "Restantes: 5" ){$("#numeroRestantesRegio").text("Restantes: 4");}
					if(jup == "Restantes: 4" ){$("#numeroRestantesRegio").text("Restantes: 3");}
					if(jup == "Restantes: 3" ){$("#numeroRestantesRegio").text("Restantes: 2");}
					if(jup == "Restantes: 2" ){$("#numeroRestantesRegio").text("Restantes: 1");}
					if(jup == "Restantes: 1" ){$("#numeroRestantesRegio").text("Restantes: 0");}
				}
				
				
				$(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
				
				$(".deletDesImg").click(function(){
					var idVac2 = $(this).attr('id');
					alertify.alert(idVac2);
				});
		
			});
	
	return false;
	
}


function quitarNacional(idVac2){
	var idVacante = idVac2;
	
	$.getJSON('json/quitarNacional' ,{idVacante: idVacante},
			function(jsonData) { 
		
					mensaje1 = jsonData.Mensajes[0].mensajes;
					
					if (mensaje1 == "Se ha quitado de Destacados"){
						
						
						
						$("#Quit"+idVacante).hide();
						
						
						var jup = $("#numeroRestantesRegio").text();
						
						if(jup == "Restantes: 0" ){$("#numeroRestantesRegio").text("Restantes: 1");}
						if(jup == "Restantes: 1" ){$("#numeroRestantesRegio").text("Restantes: 2");}
						if(jup == "Restantes: 2" ){$("#numeroRestantesRegio").text("Restantes: 3");}
						if(jup == "Restantes: 3" ){$("#numeroRestantesRegio").text("Restantes: 4");}
						if(jup == "Restantes: 4" ){$("#numeroRestantesRegio").text("Restantes: 5");}
						
					}
		
			});
	
	return false;
	
}


function quitarRegional(idVac2){
	var idVacante = idVac2;
	
	
	$.getJSON('json/quitarRegional' ,{idVacante: idVacante},
			function(jsonData) { 
				
					mensaje1 = jsonData.Mensajes[0].mensajes;
					
					if (mensaje1 == "Se ha quitado de Destacados"){
						
						
						$("#Quit"+idVacante).hide();
						
						
						var jup = $("#numeroRestantesRegio").text();
						
						if(jup == "Restantes: 0" ){$("#numeroRestantesRegio").text("Restantes: 1");}
						if(jup == "Restantes: 1" ){$("#numeroRestantesRegio").text("Restantes: 2");}
						if(jup == "Restantes: 2" ){$("#numeroRestantesRegio").text("Restantes: 3");}
						if(jup == "Restantes: 3" ){$("#numeroRestantesRegio").text("Restantes: 4");}
						if(jup == "Restantes: 4" ){$("#numeroRestantesRegio").text("Restantes: 5");}
					}else if(mensaje1 == "No Puedes Destacar esta Vacante"){
						alertify.alert("No Puedes Destacar esta Vacante");
					}
				
		
			});
	
	return false;
	
	
}





