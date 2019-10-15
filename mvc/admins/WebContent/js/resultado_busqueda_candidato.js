
var seleccionP = new Array();
var innn = 0;

var seleccionadas = new Array();
var indice = 0;


$(document).ready(function(){
	
	
	verificandoParametrosBus(1);
	
	
	$("#dato").show();
	$("#acciones").show();
	
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
	
	$("input.checkCan").click(function(){
		
		var id=$(this).val();
		$("#"+id+"").css("background-color","#CA3B3B ");
		$("#"+id+"").css("color","white ");
		
		
		var checkeado = $(this).attr("checked");
		
		if(checkeado){
			$("#conteneDorSelected").append("<input type='hidden' class='arregloSelecteds' name='arreglo' id='Creado"+id+"' value="+id+" />");
		}else{
			$("#Creado"+id).remove();
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
		pinta();
		
	});

	
	$("#nueva_busqueda").click(function(){
		window.location.href="/admins/Candidatos";
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
	
	$("#postular").click(function(){
		var check = $("input[type='checkbox']:checked").length;
		if( check == 0 ){
			$( "#dialog_selecPostulante" ).dialog( "open");
		}else if( check == 1){
			AbrirDialog();
		}else if(check > 1){
			AbrirDialog();
		}
	
});
	
	
$("#baja").click(function(){
		
	var check = $("input[type='checkbox']:checked").length;
	
	
	if ( check == ""){
		$("#dialog_selecPostulante").dialog( "open");
	}else{
		var i=0;
		
		arreglo_llenado();
		var idPostuElim;
		for(i=0;i <= (check -1);i++){
			idPostuElim = seleccionP[i];
			 $.getJSON('json/EliminarCandidatoD',
					 {idPostuElim: idPostuElim},
					  function(jsonData) {
						 alertify.alert("USUARIO ELIMINADO CORRECTAMENTE");
						  $("#"+seleccionP[i]).hide()
						} );
					 return false;
			
		}
		
		seleccionP.length = 0;
	}
	
	
	
});
	
	
	
	$("#dialog_vacante").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 250,
	    width: 350,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Aceptar': function() {postuFunction();},
	        'Cancelar': function() {$(this).dialog('close');}
	    }
	 });
	
	
	
	
	$("#listavacantes").change(function(){
		  
		  var idAdmin = $(this).val();
		  $("#idVacante").val(idAdmin);
	  });
	
	pinta();
	cambiar();
	
	
	
	$("input.genero").each(function(){
		var value = $(this).val();
		if(value == 'M'){
			$("td.conteGenero").html('<div class="masculino"></div>');
		}else if(value == 'F'){
			$("td.conteGenero").html('<div class="femenino"></div>');
		}
		
	});
	
});


function restaValreg(val){
	var oper=val-22;
	if(oper==1 || oper<1){
		$("#contBloq").val("1");
		verificandoParametrosBus("1");
	}else{
		$("#contBloq").val(oper);
		verificandoParametrosBus(oper);
	}
}	

function pinta(){
	cual=document.getElementById("tabla").rows;
	var a;
	for(a=0;a<cual.length;a++){
		color(a);
	}
	pintaRojo();
	
}
function color(b){
	if(b%2==0){
		cual[b].style.backgroundColor="";
	 }
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


function AbrirDialog(){
	$( "#dialog_vacante" ).dialog( "open");
}


function postuFunction(){
	
	var listavacantes = $("#listavacantes").val();
	
	if( listavacantes == "0"){
		$("#dialog_busPalabra").dialog( "open");
	}else{
		$("#jup").attr("action","PostularCandidato2");
		$("#jup").submit();
		$("#dialog_vacante").dialog('close');
	}
	
	
}

function cambiar(){
	
}



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



function llenarArrayChecks(){
	
	
	
	
	
	
}


function verificandoParametrosBus(valI){
	
	var p = $("#palabCla").html();
	var a1 = $("#arInte").html();
	var a2 = $("#arInteA").html();
	var mG = $("#mGra").html();
	var sE = $("#seX").html();
	var mE = $("#mEd").html();
	var mxE = $("#maEd").html();
	var esT = $("#esT").html();
	var munI = $("#munI").html();
	
	
	if(p == "Palabra Clave"){
		$("#palabCla").html("");
		$("#palabCla").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	if(a1 == "Selecciona"){
		$("#arInte").html("");
		$("#arInte").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	
	if(a2 == "Selecciona"){
		$("#arInteA").html("");
		$("#arInteA").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	if(mG == "Selecciona"){
		$("#mGra").html("");
		$("#mGra").html("No fue seleccionada esta Opci&oacute;n");
	}else if(mG == "1"){
		$("#mGra").html("");
		$("#mGra").html("Secundaria");
	}else if(mG == "2"){
		$("#mGra").html("");
		$("#mGra").html("Bachillerato");
	}else if(mG == "3"){
		$("#mGra").html("");
		$("#mGra").html("Tecnico");
	}else if(mG == "4"){
		$("#mGra").html("");
		$("#mGra").html("Estudios Superiores");
	}else if(mG == "5"){
		$("#mGra").html("");
		$("#mGra").html("Diplomado");
	}else if(mG == "6"){
		$("#mGra").html("");
		$("#mGra").html("Maestria");
	}else if(mG == "7"){
		$("#mGra").html("");
		$("#mGra").html("Doctorado");
	}else if(mG == "8"){
		$("#mGra").html("");
		$("#mGra").html("Otro");
	}
	
	
	
	
	if(sE == "Selecciona"){
		$("#seX").html("");
		$("#seX").html("No fue seleccionada esta Opci&oacute;n");
	}else if(sE == "F"){
		$("#seX").html("");
		$("#seX").html("Femenino");
	}else if(sE == "M"){
		$("#seX").html("");
		$("#seX").html("Masculino");
	}else if(sE == "I"){
		$("#seX").html("");
		$("#seX").html("Indistinto");
	}
	
	if(mE == "0"){
		$("#mEd").html("");
		$("#mEd").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	if(mxE == "0"){
		$("#maEd").html("");
		$("#maEd").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	if(esT == "Selecciona"){
		$("#esT").html("");
		$("#esT").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	if(munI == "Selecciona"){
		$("#munI").html("");
		$("#munI").html("No fue seleccionada esta Opci&oacute;n");
	}
	
	
	
	
	/* COLOCANDO EL PAGINADO  */
	
	 var numeroVacantes = $("#numeroCandiPag").val();
	  
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
				
					BuspaginadaPaginadoIdAdmin(desde,hasta);
			  }else{
				  $("#paginacionContenedor").append("<a id='opcio"+t+"' class='paginacionLink'>"+t+"</a>");
			  }
			  }
		  countPag++;
	  }
	  
	  if(ultVal!=1){
		  $("#paginacionContenedor").append("<a href='#' onclick='verificandoParametrosBus($(\"#contBloq\").val());'><img src='images/icono.flecha.derecha.png' alt='Siguiente Bloque' height='42' width='42'></a>");
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

			BuspaginadaPaginadoIdAdmin(desde,hasta);
			
			verificaElementosSeleccionados();
			
			
		});
	  
	
	
}


function BuspaginadaPaginadoIdAdmin(desde,hasta){

	var desdePag = desde;
	var hastaPag = hasta;
	var palabraClave = $("#paraCla").val();
	var areaInteres = $("#areaInte").val();
	var areaInteresAlterna = $("#areaInteAl").val();
	var minGrado = $("#grAcade").val();
	var sexo = $("#genErooo").val();
	var minEdad = $("#eMin").val();
	var maxEdad = $("#eMax").val();
	var estado = $("#esTADO").val();
	var municipio = $("#muniCipio").val();
	
	$.getJSON('json/busquedaCandiPag',{desdePag:desdePag,hastaPag:hastaPag,palabraClave:palabraClave,areaInteres:areaInteres,areaInteresAlterna:areaInteresAlterna,minGrado:minGrado,sexo:sexo,minEdad:minEdad,maxEdad:maxEdad,estado:estado,municipio:municipio},
		function(jsonData) {
		  if(eval(jsonData)){
			  
			  $("#ttt").html("");
			  
			  for(j=0;j<=(jsonData.items.length)-1;j++){
				  
				  pinta();
				  
				  
				  var table = document.getElementById("ttt");
				  var row = table.insertRow(0);
				  row.id=""+jsonData.items[j].idPostulante+"";
				  row.className="adminRow";
				  var cell1=row.insertCell(0);
				  cell1.id="";
				  cell1.className="adminData";
				  var cell2=row.insertCell(1);
				  cell2.id="";
				  cell2.className="adminData";
				  var cell3=row.insertCell(2);
				  cell3.id="";
				  cell3.className="adminData";
				  var cell4=row.insertCell(3);
				  cell4.id="";
				  cell4.className="adminData";
				  var cell5=row.insertCell(4);
				  cell5.id="";
				  cell5.className="adminData";
				  var cell6=row.insertCell(5);
				  cell6.id="";
				  cell6.className="adminData";
				  var cell7=row.insertCell(6);
				  cell7.id="";
				  cell7.className="adminData";
				  
				  
				  cell1.innerHTML="<input id='canid_"+jsonData.items[j].idPostulante+"' class='checkCan' type='checkbox' value='"+jsonData.items[j].idPostulante+"' name='arreglo'>";
				  cell2.innerHTML=""+jsonData.items[j].nombre+"";
				  cell3.innerHTML=""+jsonData.items[j].areaInteres+"";
				  cell4.innerHTML=""+jsonData.items[j].nivelDeEstudios+"";
				  
				  cell5.innerHTML=""+jsonData.items[j].edad+"";
				  cell6.innerHTML="<div class='gene"+jsonData.items[j].sexo+"'></div>";
				  
				  verificaElementosSeleccionados();
				  
				
			  }
			  
			  $("input.checkCan").click(function(){
					var id=$(this).val();
					$("#"+id+"").css("background-color","#CA3B3B ");
					$("#"+id+"").css("color","white ");
					
					var checkeado = $(this).attr("checked");
					
					if(checkeado){
						$("#conteneDorSelected").append("<input type='hidden' class='arregloSelecteds' name='arreglo' id='Creado"+id+"' value="+id+" />");
					}else{
						$("#Creado"+id).remove();
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
					pinta();
					
				});
			  
			  
			  
			  
			  
		  }
	
	});
	
}



function limpiaClaseActiva(){
	$(".paginacionLink").each(function(){
		
		var num_op = $(this).attr('id');
		
		$("#"+num_op).removeClass("activePaginacion");

		
	});
}


function verificaElementosSeleccionados(){
	
	$(".arregloSelecteds").each(function(){
		
		
		
		var idSelec = $(this).val();
		

			
		$("#canid_"+idSelec).attr('checked','checked');
			
			

		
	});
	
	
	
	
	
	
}


