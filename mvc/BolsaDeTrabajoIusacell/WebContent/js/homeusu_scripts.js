require(["dojo/ready"], function(ready, parser, registry){
    ready(function(){
    		
    	
    	
    	$( "#accordion" ).accordion();
    	$( "#accordion2" ).accordion();
    	$( "#accordion3" ).accordion();
    	$( "#accordion4" ).accordion();
    	
    	/* DIALOGOS */
    	
    	$("#dialog_datos_personales").dialog({
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
    	        'Modificar': function() {
    	        	JsonAndAjaxDatos();
    	        	$(this).dialog('close');
    	        },'Cancelar':function(){
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
    	        'Aceptar': function() {
    	              $(this).dialog('close');
    	                    
    	        }
    	    }
    	 });
    	
    	$(".emergente").click(function(){
    		var num_folio = $(this).attr('id');
    		$("#num_vac").text(num_folio);
    		JsonAndAjax(num_folio);
    		$( "#dialog_vacante" ).dialog( "open");
    	});
    	
    	
    	$("#dialog_escolaridad").dialog({
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
    	    	 'Modificar': function() {
    	    		 JsonAndAjaxEdu();    
    	    		 $(this).dialog('close');
     	        },'Cancelar':function(){
     	        	$(this).dialog('close');
     	        }
    	    }
    	 });
    	
    	$("#dialog_idiomas").dialog({
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
    	    	'Modificar': function() {
   	    		 JsonAndAjaxIdioma();
   	    		$(this).dialog('close');
    	        },'Cancelar':function(){
    	        	$(this).dialog('close');
    	        }
    	    }
    	 });
    	
    	$("#dialog_conocimientos").dialog({
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
    	    	'Modificar': function() {
     	    		 JsonAndAjaxConocimiento();   
     	    		$(this).dialog('close');
      	        },'Cancelar':function(){
      	        	$(this).dialog('close');
      	        }
    	    }
    	 });
    	
    	$("#dialog_experiencia").dialog({
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
    	    	'Modificar': function() {
      	    		 JsonAndAjaxExperiencia(); 
      	    		$(this).dialog('close');
       	        },'Cancelar':function(){
       	        	$(this).dialog('close');
       	        }
    	    }
    	 });


    	
    	////////openers///////////////////////////////////
    	$("a.linkEsc").click(function(){
    		var link=$(this).attr("value");
    		$("#idForm").val(link);
    		abrir_escolaridad();
    		
    	});
    	
    	$("a.linkIdiom").click(function(){
    		var link=$(this).attr("value");
    		$("#idIdioma").val(link);
    		abrir_idiomas();
    		
    	});
    	$("a.linkExp").click(function(){
    		var link=$(this).attr("value");
    		$("#idExp").val(link);
    		abrir_experiencia();
    		
    	});
    	
    	$("a.linkCon").click(function(){
    		var link=$(this).attr("value");
    		$("#idConocimiento").val(link);
    		abrir_conocimientos();
    		
    	});
    	///////////////////////////////////////////////////
    	
    	//////////operaciones/////////////////////////////
    	
    	
    	//////////////////////////////////////////////////
    	
    	
    	
    	
    });
});

/////////fin ready///////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
function abrir_personales(){
	$( "#dialog_datos_personales" ).dialog( "open");
}
function abrir_escolaridad(){
	$( "#dialog_escolaridad" ).dialog( "open");
}

function abrir_idiomas(){
	$( "#dialog_idiomas" ).dialog( "open");
}

function abrir_conocimientos(){
	$( "#dialog_conocimientos" ).dialog( "open");
}

function abrir_experiencia(){
	$( "#dialog_experiencia" ).dialog( "open");
}

function JsonAndAjaxDatos(){
	var nombre =$("#nombre").val();     
	var apellidoPaterno=$("#apellidoPaterno").val();
	var apellidoMaterno=$("#apellidoMaterno").val();
	var rfc=$("#rfc").val();
	var curp=$("#curp").val();
	var dia=$("#dia").val();
	var mes=$("#mes").val();
	var anio=$("#anio").val();
	var calleNumero=$("#calleNumero").val();
	var colonia=$("#colonia").val();
	var ciudadPoblado=$("#ciudadPoblado").val();
	var municipioDelegacion=$("#municipioDelegacion").val();
	var cp=$("#cp").val();
	var nacionalidad=$("#nacionalidad").val();
	var estadoCivil=$("#estadoCivil").val();
	var sexo=$("#sexo").val();
	var fechaNacimiento=dia+"/"+mes+"/"+anio;
	var nombreCompleto=nombre+" "+apellidoPaterno+" "+apellidoMaterno;
	var parametro="personales";
	
	
	$("#nombre_span").html(nombreCompleto);
	  $("#rfc_span").html(rfc);
	  $("#curp_span").html(curp);
	  $("#nombre_span").html(nombreCompleto);
	  $("#calle_span").html(calleNumero);
	  $("#col_span").html(calleNumero);
	  $("#ciudad_span").html(ciudadPoblado);
	  $("#municipio_span").html(municipioDelegacion);
	  $("#cp_span").html(cp);
	  $("#nac_span").html(nacionalidad);
	  $("#sex_span").html(sexo);
	
	$.getJSON('json/giveMeJsonPersonal' ,
			  {parametro:parametro,
		       nombre:nombre,
		       apellidoPaterno:apellidoPaterno,
		       apellidoMaterno:apellidoMaterno,
		       rfc:rfc,
		       curp:curp,
	           fechaNacimiento:fechaNacimiento,
	           calleNumero:calleNumero,
	           colonia:colonia,
	           ciudadPoblado:ciudadPoblado,
	           municipioDelegacion:municipioDelegacion,
	           cp:cp,
	           nacionalidad:nacionalidad,
	           estadoCivil:estadoCivil,
	           sexo:sexo
	      
			  },
			  function() {
				  
				  
			  }
			 );
			 return false;
	
}

function JsonAndAjaxEdu(){
	var parametro="formacion";
	var idFormacion=$("#idForm").val();
    var nivelEstudios=$("#nivelAcademico").val();
	var instituto=$("#institucion").val();
	var paisInstituto=$("#paisInstituto").val();
	var estado=$("#estadoInstituto").val();
	var inicioD=$("#diaInicioF").val();
	var inicioM=$("#mesInicioF").val();
	var inicioY=$("#anioInicioF").val();	
	var fechaInicio=inicioD+"/"+inicioM+"/"+inicioY;
	var finD=$("#diaFinF").val();
	var finM=$("#mesFinF").val();
	var finY=$("#anioFinF").val();	
	var fechaFin=finD+"/"+finM+"/"+finY;
	var status=$("#status").val();
	$.getJSON('json/giveMeJsonPersonal' ,
			  {parametro:parametro,
		       idFormacion:idFormacion,
		       nivelEstudios:nivelEstudios,
		       instituto:instituto,
		       paisInstituto:paisInstituto,
		       estado:estado,
		       fechaInicio:fechaInicio,
		       fechaFin:fechaFin,
		       status:status
		       
			  },
			  function() {
				 
			  }
			 );
			 return false;
	
}

function JsonAndAjaxIdioma(){
	  var parametro="idioma";
	  var idIdioma=$("#idIdioma").val();
	  var idioma=$("#idiom").val();
	  var speak=$("#speak").val();
	  var listen=$("#listen").val();
	  var write=$("#write").val();
	  
	$.getJSON('json/giveMeJsonPersonal' ,
			  {
		         parametro:parametro,
		         idIdioma:idIdioma,
		         idioma:idioma,
		         write:write,
		         speak:speak,
		         listen:listen
			  },
			  function() {
				 
			  }
			 );
			 return false;
	
}

function JsonAndAjaxExperiencia(){
	  var parametro="experiencia";
	  var idExp=$("#idExp").val();
	  alert(idExp);
	  var nombreEmpresa=$("#nombreEmpresa").val();
	  var puesto=$("#puesto").val();
	  var diaInicioE=$("#diaInicioE").val();
	  var mesInicioE=$("#mesInicioE").val();
	  var anioInicioE=$("#anioInicioE").val();
	  var fechaInicio=diaInicioE+"/"+mesInicioE+"/"+anioInicioE;
	  var diaFinE=$("#diaFinE").val();
	  var mesFinE=$("#mesFinE").val();
	  var anioFinE=$("#anioFinE").val();
	  var fechaFin=diaFinE+"/"+mesFinE+"/"+anioFinE;
	  var sueldoEmpresa=$("#sueldoEmpresa").val();
	  var funcionesEmpresa=$("#funcionesEmpresa").val();
	  var motivosSalida=$("#motivosSalida").val();
	  
	$.getJSON('json/giveMeJsonPersonal' ,
			  {
		         parametro:parametro,
		         idExp:idExp,     
		         nombreEmpresa:nombreEmpresa,
		         puesto:puesto,
		         fechaInicio:fechaInicio,
		         fechaFin:fechaFin,
		         sueldoEmpresa:sueldoEmpresa,
		         funcionesEmpresa:funcionesEmpresa,
		         motivosSalida:motivosSalida
		         
			  },
			  function() {
				  
				  
				 
			  }
			 );
			 return false;
	
}

function JsonAndAjaxConocimiento(){
	  var parametro="conocimiento";
	  var idConocimiento=$("#idConocimiento").val();;
	  var conocimiento=$("#conocimiento").val();
	  var especificar=$("#especificar").val();
	  var nivel=$("#nivel").val();
	  var fechaUso=$("#fechaUso").val();
	  
	  
	  
	$.getJSON('json/giveMeJsonPersonal' ,
			  {
		         parametro:parametro,
		         idConocimiento:idConocimiento,
		         conocimiento:conocimiento,
		         especificar:especificar,
		         nivel:nivel,
		         fechaUso:fechaUso
		         
			  },
			  function() {
				  
				  
				 
			  }
			 );
			 return false;
	
}

/* FUNCION DE RETORNO DEL JSON*/

function JsonAndAjax(num_folio) {
	 $.getJSON('json/giveMeJsonData' ,
	  {num_folio: num_folio},
	  function(jsonData) {
		  $("#nom_vac").text(jsonData.items[0].nombre);
		  $("#text_int").text(jsonData.items[0].texto);
		  $("#esco").text(jsonData.items[0].escolaridad);
		  $("#conocimient").text(jsonData.items[0].conocimientos);
		  $("#talent").text(jsonData.items[0].talentos);
		  $("#ubicati").text(jsonData.items[0].ubicaciones);
		  $("#are_exp").text(jsonData.items[0].area);
		  $("#prin_fun").text(jsonData.items[0].funciones);
		  $("#salario").text("$"+jsonData.items[0].sueldo);
		  $("#horario").text(jsonData.items[0].horario);
		  $("#edad").text(jsonData.items[0].edad);
		  $("#observaciones").text(jsonData.items[0].observaciones);
		  $("#fecha").text(jsonData.items[0].fecha);
	  }
	 );
	 return false;
	}
