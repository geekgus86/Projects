$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	
	pinta();
	
	$("#contentUbCl").show();
	$("#contentAsiCl").hide();
	
	
	
	
	$("#tab1").click(function(){
		$("#contentUbCl").show();
		$("#contentAsiCl").hide();
	});
	
	$("#tab2").click(function(){
		$("#contentUbCl").hide();
		$("#contentAsiCl").show();
	});
	
	
	 $("#lista-admins").change(function(){
		  var idAd = $(this).val();
		  
		  $("#adminId").val(idAd);
		  
		  ubicacionesCLuster(idAd);
	  });
	 
	 
	 $("#lista-admins2").change(function(){
		  var idAd = $(this).val();
		  
		  $("#adminIdClus").val(idAd);
		  
		  Calificadores(idAd);
	  });
	 
	 
	 $("#lista-admins3").change(function(){
		  var idAd = $(this).val();
		  $("#adminIdCalifClus").val(idAd);
	  });
	
	
	 $("#estado").change(function(){
		 var idEst = $(this).val();
		  
		  $("#estadoId").val(idEst);
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
		        'Aceptar': function() {guardaUbicacion();},
		        'Cancelar': function() {$(this).dialog('close');}
		    }
		 });
	 
	 
	 $("#dialog_vacante2").dialog({
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
		        'Aceptar': function() {guardaCalificador();},
		        'Cancelar': function() {$(this).dialog('close');}
		    }
		 });
	 
	 
	 $("#btnNuevoUb").click(function(){
		 AbrirDialog();
	 });
	
	 
	 $("#btnNuevoQubi").click(function(){
		 var idQuitar = $("#ubicacionCambiarId").val();
		 quitarUbicaClus(idQuitar);
	 });
	 
	 
	$("#btnNuevoCalif").click(function(){
		 AbrirDialog2();
	});
	 
	$("#btnNuevoQcalif").click(function(){
		 var idQuitar = $("#quitarIdAdminClus").val();
		 quitarCalifClus(idQuitar);
	});
	 
	
	  $("tr.adminRowVac2").click(function(){
		  var id=$(this).attr("id");
		  $("#quitarIdAdminClus").val(id);
		  $("tr.adminRowVac2").css("color","black");
		  $(this).css("background-color","#CA3B3B ");
		  $(this).css("color","white");
	   });
	
	  $("tr.adminRowVac2").click(function(){
		  var id=$(this).attr("id");
		  $("#ubicacionCambiarId").val(id);
		  $("tr.adminRowVac2").css("color","black");
		  $(this).css("background-color","#CA3B3B ");
		  $(this).css("color","white");
		  
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
	  
	  
	
});



function AbrirDialog(){
	$( "#dialog_vacante" ).dialog( "open");
}


function AbrirDialog2(){
	$( "#dialog_vacante2" ).dialog( "open");
}


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



function ubicacionesCLuster(idAd){
	
	var idAdmin = idAd;
	
	$.getJSON('json/verUbicacionesCluster',{idAdmin:idAdmin},
			  function(jsonData) {
				
		 $("#ttt").html("");
		  
		  for(j=0;j<=(jsonData.items.length)-1;j++){
			  
			  
			  
			  var table = document.getElementById("ttt");
			  var row = table.insertRow(0);
			  row.id=""+jsonData.items[j].idCluster+"";
			  row.className="adminRowVac2";
			  var cell1=row.insertCell(0);
			  cell1.id="jup";
			  cell1.className="adminDataVac";
			  
			  cell1.innerHTML=""+jsonData.items[j].nombre_estado+"";
			  
			  
			  
		  }
		  
		  

		  
		  $("tr.adminRowVac2").click(function(){
			  var id=$(this).attr("id");
			  $("#ubicacionCambiarId").val(id);
			  $("tr.adminRowVac2").css("color","black");
			  $("tr.adminRowVac2").css("background-color","#E3E3E3");
			  $(this).css("background-color","#CA3B3B ");
			  $(this).css("color","white");
			
		   });
		  
		  
		  
		
	});
	
	
}




function  Calificadores(idAd){
	
	var idAdmin = idAd;
	
	
	$.getJSON('json/verCalificadores',{idAdmin:idAdmin},
			  function(jsonData) {
				
		 $("#tttCalif").html("");
		  
		  for(j=0;j<=(jsonData.items.length)-1;j++){
			  
			  
			  
			  var table = document.getElementById("tttCalif");
			  var row = table.insertRow(0);
			  row.id=""+jsonData.items[j].id_cluster+"";
			  row.className="adminRowVac2";
			  var cell1=row.insertCell(0);
			  cell1.id="Tiene"+jsonData.items[j].id_admin_calificador;
			  cell1.className="adminDataVac";
			  
			  cell1.innerHTML=""+jsonData.items[j].nombre+"";
			  
			  
			  
		  }
		  

		
		  $("tr.adminRowVac2").click(function(){
			  var id=$(this).attr("id");
			  $("#quitarIdAdminClus").val(id);
			  $("tr.adminRowVac2").css("color","black");
			  $("tr.adminRowVac2").css("background-color","#E3E3E3");
			  $(this).css("background-color","#CA3B3B ");
			  $(this).css("color","white");
			  
		   });
		  
		  
		
	});
	
	
}

function guardaUbicacion(){
	
	var idAdmin = $("#adminId").val();
	var idEstado = $("#estadoId").val();
	
	
	if(idAdmin == 0 || idEstado == 0){
		alert("Debes seleccionar un estado y un Administrador");
	}else{

		
		$.getJSON('json/guardaUbicacion',{idAdmin:idAdmin,idEstado:idEstado},
				  function(jsonDataSaveUbi) {
	
			 	var mensaje = jsonDataSaveUbi.Mensajes[0].mensaje;

					if(mensaje == "Se ha agregado Correctamente"){
						alert("Se ha agregado Correctamente");
						window.location.href="clusterHome";
					}else if(mensaje == "No se ha agregado, debido a que ya ha seleccionado esta Ubicacion"){
						alert("No se ha agregado, debido a que ya ha seleccionado esta Ubicacion");
					}
					
					
		});
		
		
	}
	
	
}


function guardaCalificador(){
	
	
	var idAdmin = $("#adminIdClus").val();
	var idCalificador = $("#adminIdCalifClus").val();
	
	
	

	if(idAdmin == 0 || idCalificador == 0){
		alert("Debes seleccionar un estado y un Administrador");
	}else{

		
		$.getJSON('json/guardaCalificador',{idAdmin:idAdmin,idCalificador:idCalificador},
				  function(jsonData) {
			
			
			 	var mensaje = jsonData.items[0].mensaje;
			  
			 	
					if(mensaje == "Se ha agregado Correctamente"){
						alert("Se ha agregado Correctamente");
						window.location.href="clusterHome";
					}else if(mensaje == "No se ha agregado, debido a que ya ha seleccionado esta Ubicacion"){
						alert("No se ha agregado, debido a que ya ha seleccionado esta Ubicacion");
					}
					
					
		});
		
		
	}
	
}



function quitarUbicaClus(idQuitar){
	
	var idUbicacionCLuster = idQuitar;
	
	
	
	$.getJSON('json/eliminarUbicacion',{idUbicacionCLuster:idUbicacionCLuster},
			  function(jsonData) {
		
		var mensaje = jsonData.items[0].mensaje;
		
		if(mensaje == "Se ha eliminado Correctamente"){
			window.location.href="clusterHome";
		}
		 
					
				
				
				
	});
	
	
	
}


function quitarCalifClus(idQuitar){
	
	var idUbicacionCLuster = idQuitar;
	
	
	
	$.getJSON('json/eliminarCalif',{idUbicacionCLuster:idUbicacionCLuster},
			  function(jsonData) {
		
		var mensaje = jsonData.items[0].mensaje;
		
		if(mensaje == "Se ha eliminado Correctamente"){
			window.location.href="clusterHome";
		}
		 
					
				
				
				
	});
	
	
	
}

