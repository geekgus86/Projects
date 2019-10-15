var tipsEntre = new Array();
var tipsInfo = new Array();
var q=0;
var w=0;
var tamañoEntre = 0;
var tamañoInfogra = 0;
var sig1 = 0;
var ant1 = 0
var sig2=0;
var ant2 = 0;

$(document).ready(function(){
	
	
	
	$("#tip2").hide();
	$("#tip3").hide();
	
	
	traerImagenes();
	traerVideos();
	traerTips();
	traerDestacados();
	
	
	$("#dialog_contra").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 250,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	  'Enviar': function() {
  	        	CorreoRecover();
  	        	$(this).dialog('close');
  	        },'Cancelar':function(){
  	        	$(this).dialog('close');
  	        }
	    }
	 });
	

	$("#dialog_contra_confirmacion").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 250,
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

	
	
	
	$("#dialog_face").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    width: 600,
	    height: 250,
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
	         'Cerrar': function() { $(this).dialog('close');
	         mostrarAgain();
	         },
	         'Postularme' : function(){verificaSesion();}
	     }
	  });
	
	$('#fecha_bus_id').datepicker({dateFormat:'dd-mm-yy'});
	
	$("#dialog_video_iusa").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
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
	
	$("#dialog_video_unefon").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
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
	
	$("#dialog_video_enlace").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
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
	
	$("#dialog_video_total").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
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
	
	$("#dialog_video_capla").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
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
	         'Iniciar Sesion': function() {ir_login();  $("#error").text("");},
	         'Crear cuenta': function() {ir_cuenta();  $("#error").text("");},
	         
	     }
	  });
	 
	 $("#dialog_postulacion_error2").dialog({
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
	         'Mis Candidaturas': function() {ir_candidaturas();  $("#error").text("");}
	         
	     }
	  });
	 
	 
	 
	 $("#dialog_postulacion_exito").dialog({
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
	         'Cerrar': function() {$(this).dialog('close'); $("#exito").text("");},
	         
	     }
	  });
	
	
	$(".emergente").click(function(){
		var num_folio = $(this).attr('id');
		$("#num_vac").text(num_folio);
		JsonAndAjax(num_folio);
		$( "#dialog_vacante" ).dialog( "open");
	});
	
	
	//Agregando la Marca de agua 03/08/2012 10:24 p.m.
	
	$("#username").Watermark("ejemplo@tuEmail.com");
	$("#password").Watermark("**************");
	$("#palabra_bus_cla").Watermark("Palabra de búsqueda");
	$("#localidad_bus").Watermark("Localidad");
	
	$("#leyenda").hide();
	
	$("#iusalogo").click(function(){
		irlogin();
	});
	
	//JsonTags();
		
	
	$("#sigEnt").click(function(){
		sig_tip_entre();
	});
	
	$("#antEnt").click(function(){
		ant_tip_entre();
	});
	
	$("#sigInFog").click(function(){
		sig_tip_infografia();
	});
	
	$("#antInFog").click(function(){
		ant_tip_infografia();
	});
	 $("#boton_entrar").click(function(){
		window.location.href="/BolsaDeTrabajoIusacell/perfilVista"; 
	 });
	
	
});




function sig_tip(){
	
	if( $("#tip1").css("display", "block") ){
		
		$("#tip1").css("display", "none");
		$("#tip2").css("display", "block");
		$("#tip3").css("display", "none");
		
	}else if( $("#tip2").css("display", "block") ){
		
		$("#tip1").css("display", "none");
		$("#tip2").css("display", "none");
		$("#tip3").css("display", "block");
		
	}else if( $("#tip3").css("display", "block") ){
		
		$("#tip1").css("display", "block");
		$("#tip2").css("display", "none");
		$("#tip3").css("display", "none");
		
	}
	
	
	
	
}

function ant_tip(){
	
	
	if( $("#tip1").css("display", "block") ){
		
		$("#tip1").css("display", "none");
		$("#tip2").css("display", "none");
		$("#tip3").css("display", "block");
		
	}else if( $("#tip2").css("display", "block") ){
		
		$("#tip1").css("display", "block");
		$("#tip2").css("display", "none");
		$("#tip3").css("display", "none");
		
	}else if( $("#tip3").css("display", "block") ){
		
		$("#tip1").css("display", "none");
		$("#tip2").css("display", "block");
		$("#tip3").css("display", "none");
		
	}
	
	
	
	
}





function olvidaste_contra(){
	$( "#dialog_contra" ).dialog( "open" );
	$("#correo_pass").val("");
}

function like_face(){
	$( "#dialog_face" ).dialog( "open" );
}

function video_iusa(){
	 
	 var element = $("#elemntLogoIusa").val();
	 
	 if(element == 0){
	  $( "#dialog_video_iusa" ).dialog( "open" );
	 }else{
	  window.open(""+element+"","_blank");
	 }
	 
	 
	 
	 
	}

	function video_unefon(){
	 
	 var element = $("#elemntLogoUne").val();
	 
	 if(element == 0){
	  $( "#dialog_video_unefon" ).dialog( "open" );
	 }else{
	  window.open(""+element+"","_blank");
	 }
	 
	}

	function video_enlace(){
	 
	 var element = $("#elemntLogoEnlace").val();
	 
	 if(element == 0){
	  $( "#dialog_video_enlace" ).dialog( "open" );
	 }else{
	  window.open(""+element+"","_blank");
	 }
	 
	 
	 
	}

	function video_tota(){
	 
	 var element = $("#elemntTotalLogo").val();
	 
	 if(element == 0){
	  $( "#dialog_video_total" ).dialog( "open" );
	 }else{
	  window.open(""+element+"","_blank");
	 }
	 
	 
	}

	function video_capla(){
	 
	 var element = $("#elemntCaptaLogo").val();
	 
	 if(element == 0){
	  $( "#dialog_video_capla" ).dialog( "open" );
	 }else{
	  window.open(""+element+"","_blank");
	 }
	 
	 
	}
function error_postu(){
	 $( "#dialog_postulacion_error" ).dialog( "open");
	}

	function error_postu2(){
	 $( "#dialog_postulacion_error2" ).dialog( "open");
	}

	function exito_postu(){
	 $( "#dialog_postulacion_exito" ).dialog( "open");
	}

	function ir_login(){
	 window.location.href="/BolsaDeTrabajoIusacell/login";
	}

	function ir_cuenta(){
	 window.location.href="/BolsaDeTrabajoIusacell/CuentaRapida";
	}

	function ir_candidaturas(){
	 window.location.href="/BolsaDeTrabajoIusacell/Candidaturas";
	}

	
	


function JsonAndAjax(num_folio) {
	 $.getJSON('json/giveMeJsonData' ,
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
	       
	       
	       if(jsonData.items[0].area =="" || jsonData.items[0].area ==null ){
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
	       
	       if(jsonData.items[0].observaciones =="" || jsonData.items[0].observaciones =="Sin Observaciones" || jsonData.items[0].observaciones ==null ){
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


function JsonTags(){
	
	
	$.getJSON('json/Autocompletar' ,
			  function(jsonDataAutoC) {
		
				  
				  
		
				  
				  
				  
				  var availableTags = [
				           			"ActionScript",
				           			"AppleScript",
				           			"Asp",
				           			"BASIC",
				           			"C",
				           			"C++",
				           			"Clojure",
				           			"COBOL",
				           			"ColdFusion",
				           			"Erlang",
				           			"Fortran",
				           			"Groovy",
				           			"Haskell",
				           			"Java",
				           			"JavaScript",
				           			"Lisp",
				           			"Perl",
				           			"PHP",
				           			"Python",
				           			"Ruby",
				           			"Scala",
				           			"Scheme"
				           		];
				  
				  $("#palabra_bus_cla").autocomplete({
			            source: availableTags,
			             });
				  
			  }
			 );
			 return false;
}


function mostrar() {
	$( "#leyenda" ).show("slide", { direction: "left" });
	
	}  

function ocultar() {
	$("#leyenda").hide("slide", { direction: "left" });
	}  

function irlogin(){
	window.location.href="login";
}


function CorreoRecover(){
	var mail=$("#correo_pass").val();
	 $.post("/BolsaDeTrabajoIusacell/CorreoPass", { mail:mail }, function(data) {
		   if(data){
			   $("#dialog_contra_confirmacion").show();
		   }else{
			   $("#dialog_contra_confirmacion_fail").show();
		   }
	   } );
	
}




function traerImagenes(){
	
	$.getJSON('json/TraerImagenes',
			  function(jsonDataTI) {
				  $("#slide-img-1").attr("src",jsonDataTI.items[0].ruta_imag);
				  $("#slide-img-2").attr("src",jsonDataTI.items[1].ruta_imag);
				  $("#slide-img-3").attr("src",jsonDataTI.items[2].ruta_imag);
				  $("#slide-img-4").attr("src",jsonDataTI.items[3].ruta_imag);
				  $("#slide-img-5").attr("src",jsonDataTI.items[4].ruta_imag);
				  $("#slide-img-6").attr("src",jsonDataTI.items[5].ruta_imag);
			  }
			 );
			 return false;
	
}


function traerVideos(){
	
	$.getJSON('json/TraerVideos',
			  function(jsonDataTV) {
				var donde
		
				
				
				
				
				
				for(j=0;j<=(jsonDataTV.items.length)-1;j++){
					
					 donde = jsonDataTV.items[j].donde_va;
				      
				     
				     
				     if(donde == 'login_principal'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#primerVidIusa").attr("src",element1[1]+ "?rel=0");
				      }
				      

				     }else if(donde == 'dialog_iusacell'){
				      
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroIusa").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoIusa").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroIusa").attr("src","");
				       $("#elemntLogoIusa").val(element1[1]);
				      }
				      
				      
				      
				      
				     }else if(donde == 'dialog_unefon'){
				      
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroUnefon").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoUne").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroUnefon").attr("src","");
				       $("#elemntLogoUne").val(element1[1]);
				      }
				      
				      
				      
				     }else if(donde == 'dialog_total'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroTota").attr("src",element1[1]+ "?rel=0");
				       $("#elemntTotalLogo").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroTota").attr("src","");
				       $("#elemntTotalLogo").val(element1[1]);
				      }
				      
				      
				      
				     }else if(donde == 'dialog_capla'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroCapla").attr("src",element1[1]+ "?rel=0");
				       $("#elemntCaptaLogo").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroCapla").attr("src","");
				       $("#elemntCaptaLogo").val(element1[1]);
				      }
				      
				      
				      
				      
				     }else if(donde == 'dialog_enlace'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroEnlace").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoEnlace").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroEnlace").attr("src","");
				       $("#elemntLogoEnlace").val(element1[1]);
				      }
				      
				         
				         
				         
				        }       
					
				}
				
				
			  }
			 );
			 return false;
	
}

function traerTips(){

	$.getJSON('json/TraerTips',
	  function(jsonDataTT) {
		
		tamañoEntre = (jsonDataTT.tipsEntrevista.length)-1;
		tamañoInfogra = (jsonDataTT.tipsInfografia.length)-1;
		
		$("#tipE").text(jsonDataTT.tipsEntrevista[0].tip_descripcion_Entre);
		$("#tipI").text(jsonDataTT.tipsInfografia[0].tip_descripcion_Info);
		
		for(j=0;j<=(jsonDataTT.tipsEntrevista.length)-1;j++){
			tipsEntre[j] = jsonDataTT.tipsEntrevista[j].tip_descripcion_Entre;
			
		}
		
		for(k=0;k<=(jsonDataTT.tipsInfografia.length)-1;k++){
			tipsInfo[k] = jsonDataTT.tipsInfografia[k].tip_descripcion_Info;
			
		}
		
			
				  
	  }
	 );
	 return false;
	
}



 




function sig_tip_entre(){ 
	if(sig1 > tamañoEntre){
		sig1 = 0;
		$("#tipE").text(tipsEntre[sig1]);
	}else{
		sig1 = sig1 + 1;
		$("#tipE").text(tipsEntre[sig1]);
		
	}
}

function ant_tip_entre(){
	if(ant1 < 0){
		ant1 = tamañoEntre;
		$("#tipE").text(tipsEntre[ant1]);
	}else{
		ant1 = ant1 - 1;
		$("#tipE").text(tipsEntre[ant1]);
		
	}
	
}




function sig_tip_infografia(){ 
	if(sig2 > tamañoInfogra){
		sig2 = 0;
		$("#tipI").text(tipsInfo[sig2]);
	}else{
		sig2 = sig2 + 1;
		$("#tipI").text(tipsInfo[sig2]);
		
	}
}

function ant_tip_infografia(){
	if(ant2 < 0){
		ant2 = tamañoInfogra;
		$("#tipI").text(tipsInfo[ant2]);
	}else{
		ant2 = ant2 - 1;
		$("#tipI").text(tipsInfo[ant2]);
		
	}
}




function traerDestacados(){
	 
	 $.getJSON('json/Destacados',
	     function(jsonDataDPS) {
	  
	    for(j=0;j<=(jsonDataDPS.items.length)-1;j++){
	     
	    	if(jsonDataDPS.items[j].nombreG.length > 20){
	    	       
	            $("#contieneDestacados").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataDPS.items[j].folioG+"' class='emergente' title='"+jsonDataDPS.items[j].nombreG+"'>"+jsonDataDPS.items[j].nombreG.slice(0,20)+"..."+"</a><p>"+jsonDataDPS.items[j].ubicacionG+"</p></li>");
	           }else{
	           
	            $("#contieneDestacados").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataDPS.items[j].folioG+"' class='emergente' title='"+jsonDataDPS.items[j].nombreG+"'>"+jsonDataDPS.items[j].nombreG+"</a><p>"+jsonDataDPS.items[j].ubicacionG+"</p></li>");
	           }
	     
	    }
	  
	    
	    $(".emergente").click(function(){
	     var num_folio = $(this).attr('id');
	     $("#num_vac").text(num_folio);
	     JsonAndAjax(num_folio);
	     $( "#dialog_vacante" ).dialog( "open");
	    });
	  
	     }
	    );
	    return false;
	 
	}



function JsonAndAjaxPostulaciones(num_foliox) {
	 
	 var num_folio = num_foliox;

	  $.getJSON('json/giveMeJsonDataPostulaciones' ,
	   {num_folio: num_folio},
	   function(jsonDataP) {
	    
	    var error1 = jsonDataP.items[0].error1;
	    
	    if(error1=="NECESITAS ESTAR REGISTRADO PARA POSTULARTE"){
	     //alert(jsonDataP.items[0].error1);
	     var er1=jsonDataP.items[0].error1;
	     console.info(er1);
	     $("#error").text(er1);
	     error_postu();
	    }else if(error1=="YA ESTAS POSTULADO PARA ESTA VACANTE, LA ENCONTRARAS EN LA SECCION DE \"MIS CANDIDATURAS\" "){
	     //alert(jsonDataP.items[0].error2);
	     var er2=jsonDataP.items[0].error1;
	     $("#error2").text(er2);
	     error_postu2();
	     }else if(error1=="TU POSTULACION SE HA GUARDADO CORRECTAMENTE, PUEDES REVISARLA EN MIS CANDIDATURAS"){
	      //alert(jsonDataP.items[0].bien);
	       var er3=jsonDataP.items[0].error1;
	      $("#exito").text(er3);
	      exito_postu();
	     }
	     
	   }
	  );
	  return false;
	}

	function JsonAndAjaxPostulaciones2() {
	 
	 num_folio = $("#num_vac").text();
	 console.info(num_folio);

	  $.getJSON('json/giveMeJsonDataPostulaciones' ,
	   {num_folio: num_folio},
	   function(jsonDataP) {
	    
	    var error1 = jsonDataP.items[0].error1;
	    
	    if(error1=="NECESITAS ESTAR REGISTRADO PARA POSTULARTE"){
	     //alert(jsonDataP.items[0].error1);
	     var er1=jsonDataP.items[0].error1;
	     console.info(er1);
	     $("#error").text(er1);
	     error_postu();
	    }else if(error1=="YA ESTAS POSTULADO PARA ESTA VACANTE, LA ENCONTRARAS EN LA SECCION DE \"MIS CANDIDATURAS\" "){
	     //alert(jsonDataP.items[0].error2);
	     var er2=jsonDataP.items[0].error1;
	     $("#error2").text(er2);
	     error_postu2();
	     }else if(error1=="TU POSTULACION SE HA GUARDADO CORRECTAMENTE, PUEDES REVISARLA EN MIS CANDIDATURAS"){
	      //alert(jsonDataP.items[0].bien);
	       var er3=jsonDataP.items[0].error1;
	      $("#exito").text(er3);
	      exito_postu();
	     }
	     
	   }
	  );
	  return false;
	}






	function verificaSesion(){
	 
	 var sess = $("#sess2").val();
	 
	 if(sess==1){
	  JsonAndAjaxPostulaciones2();
	 }else{
	   $("#error").text("NECESITAS ESTAR REGISTRADO PARA POSTULARTE");
	  error_postu();
	 }
	 
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

