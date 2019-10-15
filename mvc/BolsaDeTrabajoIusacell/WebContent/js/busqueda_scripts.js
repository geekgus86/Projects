var porcentaje = 0;
$(document).ready(function(){
	
	traerPorcentaje();
	traerDestacados();
	traerDestacadosUbi();
	
	/**  PARA LA TABLA DE 3 PESOS  **/
	//$("#accordion").accordion({ active: false });
	
	/**  PARA LOS TABS REGIONALES **/
	$("#regionalesT").click(function () {  
       
        $(".active").removeClass("active");  
        
        $(this).addClass("active");  
        
        $("#nacionales").slideUp();  
         
        var content_show = $(this).attr("title");  
        $("#"+content_show).slideDown();  
    });  
	
	
	/**  PARA LOS TABS NACIONALES **/
	$("#nacionalesT").click(function () {  
         
        $(".active").removeClass("active");  
         
        $(this).addClass("active");  
        
        $("#regionales").slideUp();  
          
        var content_show = $(this).attr("title");  
        $("#"+content_show).slideDown();  
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
	    	'Postularme' : function(){evaluaPorcentaje2();},
	         'Cerrar': function() {$(this).dialog('close');
	         mostrarAgain();  
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
	
	
	
	
	$(".scroll-pane").scrollbar({orientation: 'vertical'});
	
	$('#fecha_bus').datepicker({dateFormat:'dd-mm-yy'});
	
	$(".emergente").click(function(){
		var num_folio = $(this).attr('id');
		$("#num_vac").text(num_folio);
		JsonAndAjax(num_folio);
		$( "#dialog_vacante" ).dialog( "open");
		
		
		
	});

	$("#palabra_bus_cla").Watermark("Palabra de búsqueda");
	$("#localidad_bus").Watermark("Localidad");
	
	
	
	/* POSTUALACION RAPIDA*/
	
	$(".posquick").click(function(){
		var num_folios = $(this).attr('id');
		evaluaPorcentaje(num_folios);
		
	});
	
	
	$(".retrae").click(function(){
		
		var cambio =  $(this).attr("id");
		
		
		if(  $(this).next("div").is (':visible') ){
			
			 $(this).next("div").slideUp(); 
			 $(this).next("div").addClass("active");

			$("#Fle"+cambio).removeClass("fAbj");
			$("#Fle"+cambio).addClass("fIqd");
			
		}else{
			
			$(this).next("div").slideDown();
			$(this).next("div").removeClass("active");
			$("#Fle"+cambio).removeClass("fIqd");
			$("#Fle"+cambio).addClass("fAbj");
			
			if( $(this).next(".divDesple").next("h3").length == 0 ){
			    $("#contieneAcordion").animate({ scrollTop: $("#contieneAcordion").height() }, "slow");
			   }
			
			 
		}
	});
	
	
});

/*  FUNCION PARA PONER A DOS COLORES LA TABLA*/
function pinta(){
	cual=document.getElementById("tabla").rows;
	var a;
	for(a=0;a<cual.length;a++){
		color(a);
	}
}
function color(b){
	if(b%2==0)
		cual[b].style.backgroundColor="";
	else
		cual[b].style.backgroundColor="#d3d2d2";
}


/* FUNCION PARA EL CUADRO DE DIALOGO*/

function vacante_detalle(num){
	
		//$( "#dialog_vacante" ).dialog( "open");
	
}


/* FUNCION DE RETORNO DEL JSON  DE DETALLE DE LAS VACANTES*/

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


/*  FUNCION DE JSON PARA POSTULACIONES CON SU RESPECTIVO MENSAJE DE POSTULACIO O NO POSUTLACION */
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


/* FUNCIONES PARA LOS CUADROS DE DIALOGO DE LOS ERRORES Y EXITOS DE LA POSTULACION */

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



function traerPorcentaje(){
	
	$.getJSON('json/ObtenerPorcentaje',
			  function(jsonData) {

			porcentaje = jsonData.items[0].porcentaje;

			  }
			 );
			 return false;

}


function evaluaPorcentaje(num_folios){
	var num_foliox = num_folios;
	var parsePorcentaje = parseInt(porcentaje);
	if(parsePorcentaje >= 80){
		JsonAndAjaxPostulaciones(num_foliox);
	}else{
		alert("DEBES COMPLETAR EL 80% DE TU PERFIL PARA POSTULARTE");
	}
}


function evaluaPorcentaje2(){
	
	var parsePorcentaje = parseInt(porcentaje);
	if(parsePorcentaje >= 80){
		JsonAndAjaxPostulaciones2();
	}else{
		alert("DEBES COMPLETAR EL 80% DE TU PERFIL PARA POSTULARTE");
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

function traerDestacadosUbi(){
	 $.getJSON('json/DestacadosUbi',
	     function(jsonDataUbi) {
	  
	    if(jsonDataUbi.items.length>=1){
	     
	     for(j=0;j<=(jsonDataUbi.items.length)-1;j++){
	      
	    	 if(jsonDataUbi.items[j].nombreG.length > 20){
	    	        
	             $("#contieneDestacadosUbi").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataUbi.items[j].folioG+"' class='emergente' title='"+jsonDataUbi.items[j].nombreG+"'>"+jsonDataUbi.items[j].nombreG.slice(0,20)+"..."+"</a><p>"+jsonDataUbi.items[j].ubicacionG+"</p></li>");
	            }else{
	            
	             $("#contieneDestacadosUbi").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataUbi.items[j].folioG+"' class='emergente' title='"+jsonDataUbi.items[j].nombreG+"'>"+jsonDataUbi.items[j].nombreG+"</a><p>"+jsonDataUbi.items[j].ubicacionG+"</p></li>");
	            }
	        
	        /* $("#contieneDestacadosUbi").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataUbi.items[j].folioG+"' class='emergente'>"+jsonDataUbi.items[j].areaG+"</a><p>"+jsonDataUbi.items[j].ubicacionG+"</p></li>"); */  	      
	     }
	     
	    }else{
	     $("#contieneDestacadosUbi").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='' class='emergente'>No existen Destacados Reginales</a><p></p></li>");
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
