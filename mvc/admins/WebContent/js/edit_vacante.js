

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#otroSueldo").hide();
	$("#otroEdad").hide();
	$("#otroHorario").hide();
	
	
	SeleccionarEstado();
	
	var fechaPubli = $("#fechaPublicacionE").val();
	var fechaVigen = $("#fechaVigenciaE").val();
	
	var tipoVacantes = $("#tipVac").val();
	$("#tipoVacante").val(tipoVacantes);
	
	var generoVacantes = $("genVac").val();
	$("#genero_preferencia").val(generoVacantes);
	
	var estadoVacantes= $("#estatVac").val();
	$("#estadoVacante").val(estadoVacantes);
	$("#vacante_esta_en").val(estadoVacantes);
	
	var eadVacantes = $("#edaVac").val();
	$("#seleccionEdad").val(eadVacantes);
	$("#edad").val(eadVacantes);
	
	var nivelVacantes = $("#niveVac").val();
	$("#escolaridad").val(nivelVacantes);
	
	var areaExpVacantes = $("#areVac").val();
	$("#areaExperiencia").val(areaExpVacantes);
	
	var horarioVacantes = $("#horaVac").val();
	$("#seleccionHorario").val(horarioVacantes);
	$("#horario").val(horarioVacantes);
	
	var sueldoVacantes = $("#sueladoVac").val();
	$("#seleccionSueldo").val(sueldoVacantes);
	$("#sueldoVacante").val(sueldoVacantes);
	
	
	$("#warningMsj").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 160,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Aceptar': function() {
	        	$(this).dialog('close');  
	        	$("#mensajeWarning").text(" ");
	        }
	    }
	 });
	
	$( "#fechaPublicacionE" ).datepicker({
		changeMonth: true,
		changeYear: true,
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		         		 'Jul','Ago','Sep','Oct','Nov','Dic'],
 		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
 		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
 		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
 		dateFormat: 'dd/mm/yy',
 		minDate: fechaPubli
	});
	
	$( "#fechaVigenciaE" ).datepicker({
		changeMonth: true,
		changeYear: true,
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		         		 'Jul','Ago','Sep','Oct','Nov','Dic'],
 		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
 		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
 		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
 		dateFormat: 'dd/mm/yy',
 		minDate: fechaVigen
	});
	
	$("#btn_save").click(function(){
		
		
	var nombre_vac=$("#nombreVacante").val();
		
		var folio_vac=$("#folio").val();
		
		var fechaP_vac=$("#fechaPublicacionE").val();
		
		var fechaV_vac=$("#fechaVigenciaE").val();
		
		var aniosE_vac=$("#aniosExperiencia").val();
		
		var tipo_vac=$("#tipoVacante").val();
		
		var estado_vac=$("#estadoVacante").val();
		
		var ubi_vac=$("#ubicacion").val();
		
		var suel_vac=$("#sueldoVacante").val();
		
		var areaE_vac=$("#areaExperiencia").val();
		
		var desta_vac=$("#destacado").val();
		
		var text_vac=$("#textoIntroductorio").val();
		
		var esco_vac=$("#escolaridad").val();
		
		var conoci_vac=$("#conocimientos").val();
		
		var talen_vac=$("#talentos").val();
		
		var prinF_vac=$("#prinFuncionesVacante").val();
		
		var edad_vac=$("#edad").val();
		
		var hora_vac=$("#horario").val();
		
		var obser_vac=$("#observaciones").val();
		
		var subido_por_vac=$("#subidoPor").val();
		
		var otro_edad = $("#otroEdad").val();
		
		var otro_horario = $("#otroHorario").val();
		
		var otro_sueldo = $("#otroSueldo").val();
		
		var estado=  $("#estadoi option:selected").val();
		var muni=  $("#municipio").val();
		 $("#estadosr").val(estado);
		 $("#munisr").val(muni);

		var tamañoObservaciones = $("#observaciones").val().length;
		var tamañoFunciones = $("#prinFuncionesVacante").val().length;
		var tamañoUbicacion = $("#ubicacion").val().length;
		var tamañoConocimientos = $("#conocimientos").val().length;
		var tamañoIntroductorio = $("#textoIntroductorio").val().length;
		
		if(tamañoObservaciones > 1000){
			var mensaje = "Sobrepasaste los caracteres permitidos en observaciones";
			openWarninMsj(mensaje);
		  	$("#observaciones").css("background-color","red");
		  	$("#observaciones").css("color","white");
		  	$("#observaciones").focus();
		}else if(tamañoFunciones > 1000){
			var mensaje = "Sobrepasaste los caracteres permitidos en observaciones";
			openWarninMsj(mensaje);
		  	$("#prinFuncionesVacante").css("background-color","red");
		  	$("#prinFuncionesVacante").css("color","white");
		  	$("#prinFuncionesVacante").focus();
		}else if(tamañoUbicacion > 100){
			var mensaje = "Sobrepasaste los caracteres permitidos en observaciones";
			openWarninMsj(mensaje);
		  	$("#ubicacion").css("background-color","red");
		  	$("#ubicacion").css("color","white");
		  	$("#ubicacion").focus();
		}else if(tamañoConocimientos > 1000){
			var mensaje = "Sobrepasaste los caracteres permitidos en observaciones";
			openWarninMsj(mensaje);
		  	$("#conocimientos").css("background-color","red");
		  	$("#conocimientos").css("color","white");
		  	$("#conocimientos").focus();
		}else if(tamañoIntroductorio > 1000){
			var mensaje = "Sobrepasaste los caracteres permitidos en observaciones";
			openWarninMsj(mensaje);
		  	$("#textoIntroductorio").css("background-color","red");
		  	$("#textoIntroductorio").css("color","white");
		  	$("#textoIntroductorio").focus();
		}else{
			
			
			
			
			
			if(nombre_vac==""){ $("#atencionDatoFV").css("display","block"); }else{ $("#atencionDatoFV").css("display","none"); }
			
			if(tipo_vac=="0"){ $("#atencionDatoTV").css("display","block"); }else{ $("#atencionDatoTV").css("display","none"); }
			
			if(fechaP_vac==""){ $("#atencionDatoFechV").css("display","block");}else{ $("#atencionDatoFechV").css("display","none"); }
			
			if(aniosE_vac==""){ $("#atencionDatoExP").css("display","block");}else{ $("#atencionDatoExP").css("display","none"); }
			
			if(ubi_vac==""){ $("#atencionDatoUV").css("display","block");}else{ $("#atencionDatoUV").css("display","none"); }
			
			
			
			
			
			if(otro_sueldo==""){ $("#atencionDatoSueldoV").css("display","block");}else{ $("#atencionDatoSueldoV").css("display","none"); }
			
			if(areaE_vac=="0"){ $("#atencionDatoAreaV").css("display","block");}else{ $("#atencionDatoAreaV").css("display","none"); }
			
			
			
			if(esco_vac=="0"){ $("#atencionDatoEscoV").css("display","block");}else{ $("#atencionDatoEscoV").css("display","none"); }
			
			
			
			if(prinF_vac==""){ $("#atencionDatoPrinFunV").css("display","block");}else{ $("#atencionDatoPrinFunV").css("display","none"); }
			
			if(edad_vac=="" || edad_vac=="Selecciona"){ $("#atencionDatoEdadV").css("display","block");}else{ $("#atencionDatoEdadV").css("display","none"); }
			
			
			
			
			
			
			
			if(fechaV_vac==""){ $("#atencionDatoFechV2").css("display","block");}else{ $("#atencionDatoFechV").css("display","none"); }
			
			
			
			
			
			
			
			var vapara = $("#vaPara").val();
			
			
			
			
			if(nombre_vac=="" || folio_vac=="" ||fechaP_vac==""|| fechaV_vac==""|| aniosE_vac==""|| tipo_vac=="0" ||  ubi_vac==""  || areaE_vac=="" || areaE_vac=="" || desta_vac=="" || esco_vac==""  || prinF_vac=="" || edad_vac=="Selecciona"   || subido_por_vac=="" ){
				var mensaje = "¡FALTAN DATOS!";
				openWarninMsj(mensaje);
			}else{
				
				var lvl = $("#aswlvl").val();
				
				if (lvl == 2 && vapara == "VacGenerales"){
					
					$("#form_vac_editar_save").attr("action","VacanteEditarSalvar");
				}else if (lvl == 2 && vapara == "MisCandidaturas"){
					
					$("#form_vac_editar_save").attr("action","VacanteEditarSalvar2");
				}else if (lvl >= 3){
					
					$("#form_vac_editar_save").attr("action","VacanteEditarSalvar2");
				}
				
				
				
				$("#form_vac_editar_save").submit();
			}
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
   });
	
	
	
	
	
	
	$("#destacadoO").click(function(){
		document.getElementById("destacadoP").checked = false;
		document.getElementById("destacadoR").checked = false;
		document.getElementById("destacadoN").checked = false;
	});

	$("#destacadoP").click(function(){
		document.getElementById("destacadoO").checked = false;
		document.getElementById("destacadoR").checked = false;
		document.getElementById("destacadoN").checked = false;
	});

	$("#destacadoR").click(function(){
		document.getElementById("destacadoP").checked = false;
		document.getElementById("destacadoO").checked = false;
		document.getElementById("destacadoN").checked = false;
	});
	
	$("#destacadoN").click(function(){
		document.getElementById("destacadoP").checked = false;
		document.getElementById("destacadoO").checked = false;
		document.getElementById("destacadoR").checked = false;
	});
	
	
	
	
	
	$("#platillaVac").change(function(){
		  
		  var tipo = $(this).val();
		  tipoPlantilla(tipo);
	  });
	
	
	
	$("#seleccionEdad").change(function(){
		 
		  var val = $(this).val();
		  otraEdad(val);
	  });
	
	$("#seleccionHorario").change(function(){
		  
		  var val = $(this).val();
		  otroHorario(val);
	  });
	
	$("#seleccionSueldo").change(function(){
		 
		  var val = $(this).val();
		  otroSalario(val);
	  });
	

	
	$("#otroEdad").blur(function (){
		var jup = $("#otroEdad").val();
		$("#edad").val(jup);
	});
	
	$("#otroSueldo").blur(function (){
		var jup = $("#otroSueldo").val();
		$("#sueldoVacante").val(jup);
	});
	
	$("#otroHorario").blur(function (){
		var jup = $("#otroHorario").val();
		$("#horario").val(jup);
	});
	
	
	
	
	$("#estadoi").change(function(){
		  
		  
		  var opcion_seleccionada = $("#estadoi option:selected").text();
		  
		  var verificando = $("#ubicacion").val();
		  
		  if(verificando == " "){
			  $("#ubicacion").val(opcion_seleccionada);
		  }else{
			  
			  $("#ubicacion").val("");
			  
			  $("#ubicacion").val(opcion_seleccionada+" ");
			  var id_estado = $(this).val();
			  traerMunicipio(id_estado);
		  }
	  });
	
	
		var id_estado = $("#estadoi option:selected").val();
		traerMunicipio(id_estado);
	

	
	
	$("#estadoi").change(function (){
		var id_estado = $(this).val(); 
		lipiaMunicipios();
		traerMunicipio(id_estado);
	});
	
	
	
	$("#municipio").change(function(){
		  
		  
		  var opcionSeleccionadaEstado = $("#estadoi option:selected").text();
		  var opcionSeleccionadaMunicipio = $("#municipio option:selected").text();
		 
		  var verificando2 = $("#ubicacion").val();
		  
		  if(verificando2 != " "){
			  
			  
			  $("#ubicacion").val("");
			  var concatenada2 = opcionSeleccionadaEstado + " " + opcionSeleccionadaMunicipio;
			  $("#ubicacion").val(concatenada2);
			
		  }else{
			  alertify.alert("Debes seleccionar un municipio y estado primero");
		  }
	  });
	
	
	
	
	
	
	
	$("#otroSueldo").change(function(){
		var factu = parseFloat($(this).val());
		var permitidos=/[^0-9.]/;
		 if(permitidos.test(factu)){
			 alertify.alert("Solo se puede ingresar numeros");
			  	$("#otroSueldo").css("background-color","red");
			  	$("#otroSueldo").focus();

		 }else{
			 $("#otroSueldo").css("background-color","white");
		 }
	});
	
	
	
	
	
	var total_letrasP = 1000;

	$('#prinFuncionesVacante').keyup(function() {
		$("#prinFuncionesVacante").css("background-color","white");
	  	$("#prinFuncionesVacante").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasP - longitud;
	    if(resto <= 0){
	        $('#prinFuncionesVacante').attr("maxlength", 1000);
	    }
	});
	
	
	
	var total_letrasU = 100;

	$('#ubicacion').keyup(function() {
		$("#ubicacion").css("background-color","white");
	  	$("#ubicacion").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasU - longitud;
	    if(resto <= 0){
	        $('#ubicacion').attr("maxlength", 100);
	    }
	});
	
	
	

	
	var total_letrasC = 1000;

	$('#conocimientos').keyup(function() {
		$("#conocimientos").css("background-color","white");
	  	$("#conocimientos").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasC - longitud;
	    if(resto <= 0){
	        $('#conocimientos').attr("maxlength", 1000);
	    }
	});
	
	

	
	
	var total_letrasT = 1000;

	$('#textoIntroductorio').keyup(function() {
		$("#textoIntroductorio").css("background-color","white");
	  	$("#textoIntroductorio").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasT - longitud;
	    if(resto <= 0){
	        $('#textoIntroductorio').attr("maxlength", 1000);
	    }
	});
	
	
	
	

	
	var total_letrasTL = 1000;

	$('#talentos').keyup(function() {
		$("#talentos").css("background-color","white");
	  	$("#talentos").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasTL - longitud;
	    if(resto <= 0){
	        $('#talentos').attr("maxlength", 1000);
	    }
	});
	
	
	
	
	
	var total_letrasO = 1000;

	$('#observaciones').keyup(function() {
		$("#observaciones").css("background-color","white");
	  	$("#observaciones").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasO - longitud;
	    if(resto <= 0){
	        $('#observaciones').attr("maxlength", 1000);
	    }
	});
	
	
	
	

	
	
	$("#selectDR").change(function(){
		  var valo = $(this).val();
		  $("#destacado").val(valo);
	  });
	
	$("#selectDN").change(function(){
		  var valos = $(this).val();
		  $("#destacado_nacional").val(valos);
	  });
	
	
	
	
	$("#atencionDatoFV").simpletip({
		content:'El nombre de la vacante no puede faltar',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoTV").simpletip({
		content:'Debes seleccionar el tipo de vacante',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoFechV").simpletip({
		content:'Debes seleccionar la fecha de la publicacion',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoFechV2").simpletip({
		content:'Debes seleccionar la fecha de la vigencia',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoEstatusV").simpletip({
		content:'Debes indicar el estado de la vacante',
		fixed: true, position: 'top' 
	});
	
	
	
	$("#atencionDatoExP").simpletip({
		content:'Debes introducir los años de experiencia necesarios',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoGenV").simpletip({
		content:'Debes seleccionar el genero',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoUV").simpletip({
		content:'Debes introducir la ubicacion, selecciona de los combos de estado y municipio',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoEdadV").simpletip({
		content:'Debes seleccionar la edad o selecciona otro y rellena con tu edad especifica',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoEscoV").simpletip({
		content:'Debes seleccionar el nivel de estudios',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoAreaV").simpletip({
		content:'Debes seleccionar el &aacute;rea de experiencia',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoConoV").simpletip({
		content:'Debes introducir los conocimientos',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoHoraV").simpletip({
		content:'Debes seleccionar el horario o selecciona otro y rellena con tu nuevo horario',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoSueldoV").simpletip({
		content:'Debes introducir el sueldo, recuerda solo usar numeros',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoIntroV").simpletip({
		content:'Debes introducir la reseña',
		fixed: true, position: 'top' 
	});
	
	
	
	$("#atencionDatoTalenV").simpletip({
		content:'Debes introducir los talentos',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoObsV").simpletip({
		content:'Debes introducir las observaciones',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoPrinFunV").simpletip({
		content:'Debes introducir las principales funciones',
		fixed: true, position: 'top' 
	});
	
	
	
	
	
	
	
	
});




function traerMunicipio(id_estado){
	
	var  municipioOrdenado = new Array();
	
	
	 $.getJSON('json/verMunicipio',{id_estado: id_estado},
			  function(jsonDataMNP) {
		 	  
		 for(l=0;l<=(jsonDataMNP.items.length)-1;l++){
			 municipioOrdenado [l] = jsonDataMNP.items[l].municipio;
			 
		}
		 
		// municipioOrdenado.sort();
		 var selecmun=$("#muni_gen").val();

 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
 			if(selecmun==municipioOrdenado[j]){
 				$("#municipio").append('<option value="'+ jsonDataMNP.items[j].id_municipio+'" selected="selected">'+municipioOrdenado[j]+'</option>');
 			}else{
 				$("#municipio").append('<option value="'+ jsonDataMNP.items[j].id_municipio+'">'+municipioOrdenado[j]+'</option>');
 			}
 		}
		 
			  

	 		 });
	return false;
	
}


function lipiaMunicipios(){
	document.getElementById("municipio").options.length = 1;
};



function otraEdad(val){
	var valE = val;
	
	if(valE == 'Otro'){
		
		$("#otroEdad").show();
		
	}else{
		$("#otroEdad").hide();
		$("#edad").val(valE);
	}
}


function otroSalario(val){
	var valE = val;
	
	if(valE == 'Otro'){
		
		$("#otroSueldo").show();
		
	}else{
		$("#otroSueldo").hide();
		$("#sueldoVacante").val(valE);
		
	}
}

function otroHorario(val){
	
	var valE = val;
	
	if(valE == 'Otro'){
		
		$("#otroHorario").show();
		
	}else{
		$("#otroHorario").hide();
		$("#horario").val(valE);
	}
}




function openWarninMsj(mensaje){
	
	var msj = mensaje;
		
		$("#mensajeWarning").text(msj);

	$( "#warningMsj" ).dialog( "open");
	
}



function SeleccionarEstado(){
	
	var EstadoLogueo = $("#ub").val();

	$("#estado option:contains("+EstadoLogueo+") ").attr("selected",true);
	
	var valorSelect = $("#estado option:contains("+EstadoLogueo+") ").val();
	
	lipiaMunicipios();
	
	traerMunicipio(valorSelect);
}
