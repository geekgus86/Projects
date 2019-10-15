

$(document).ready(function(){
	
	SeleccionarEstado();
	
	
	var ubic = $("#ub").val();
	
	$("#ubicacionA").val(ubic);
	$("#ubicacionE").val(ubic);
	$("#ubicacionAS").val(ubic);
	
	$("#dato").show();
	$("#acciones").show();
	$("#otroSueldo").hide();
	
	var f = new Date();
	
	$("#fechaPublicacion2").val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
	$("#fechaPublicacion3").val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
	$("#fechaPublicacion4").val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
	
	$("#platillaCompa").hide();
	$("#vacante_normal").hide();
	$("#asesor_ventas").hide();
	$("#ejecutivo_ventas").hide();
	$("#asesor_servicio").hide();
	

	$("#otroSueldo").hide();
	$("#otroEdad").hide();
	$("#otroHorario").hide();
	
	
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
	
	
	var todai =  new Date();
	
	$( "#fechaPublicacion" ).datepicker({
		changeMonth: true,
		changeYear: true,
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		         		 'Jul','Ago','Sep','Oct','Nov','Dic'],
 		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
 		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
 		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
 		dateFormat: 'dd/mm/yy',
 		minDate: todai
	});
	
	
	
	$("#btn_save").click(function(){
		
		var nombre_vac=$("#nombreVacante").val();
		
		var folio_vac=$("#folio").val();
		
		var fechaP_vac=$("#fechaPublicacion").val();
		
		var fechaV_vac=$("#fechaVigencia").val();
		
		var aniosE_vac=$("#aniosExperiencia").val();
		
		var tipo_vac=$("#tipoVacante").val();
		
		var estado_vac=$("#estadoVacante").val();
		
		var ubi_vac=$("#ubicacion").val();
		
		var suel_vac=$("#seleccionSueldo").val();
		
		if(suel_vac=="otro"){
			suel_vac=$("#otroSueldo").val();	
		}
		
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
		
		var genero = $("genero_preferencia").val();
		
		var estado=  $("#estado option:selected").val();
		
		var muni=  $("#municipio").val();
		
		if(estado=='' && muni==''){
			 estado=  $("#estadoA option:selected").val();
			
			 muni=  $("#municipioA").val();
			 
			 if(estado=='' && muni==''){
				 estado=  $("#estadoE option:selected").val();
					
				 muni=  $("#municipioE").val();
				 
				 if(estado=='' && muni==''){
					 estado=  $("#estadoAS option:selected").val();
						
					 muni=  $("#municipioAS").val();
				 }
			 }
		}
		
		 $("#estadosr").val(estado);
		 $("#munisr").val(muni);
		
		var tamañoObservaciones = $("#observaciones").val().length;
		var tamañoFunciones = $("#prinFuncionesVacante").val().length;
		var tamañoUbicacion = $("#ubicacion").val().length;
		var tamañoConocimientos = $("#conocimientos").val().length;
		var tamañoIntroductorio = $("#textoIntroductorio").val().length;
		
		
		
		
		
		
		
		
		
		if(tamañoObservaciones > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#observaciones").css("background-color","red");
		  	$("#observaciones").css("color","white");
		  	$("#observaciones").focus();
		}else if(tamañoFunciones > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#prinFuncionesVacante").css("background-color","red");
		  	$("#prinFuncionesVacante").css("color","white");
		  	$("#prinFuncionesVacante").focus();
		}else if(tamañoUbicacion > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#ubicacion").css("background-color","red");
		  	$("#ubicacion").css("color","white");
		  	$("#ubicacion").focus();
		}else if(tamañoConocimientos > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#conocimientos").css("background-color","red");
		  	$("#conocimientos").css("color","white");
		  	$("#conocimientos").focus();
		}else if(tamañoIntroductorio > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
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
			
			if(genero=="Indistinto"){ $("#atencionDatoGenV").css("display","block");}else{ $("#atencionDatoGenV").css("display","none"); }
			
			
			
			
			
			if(areaE_vac=="0"){ $("#atencionDatoAreaV").css("display","block");}else{ $("#atencionDatoAreaV").css("display","none"); }
			
			
			
			if(esco_vac=="0"){ $("#atencionDatoEscoV").css("display","block");}else{ $("#atencionDatoEscoV").css("display","none"); }
			
			
			
			if(prinF_vac==""){ $("#atencionDatoPrinFunV").css("display","block");}else{ $("#atencionDatoPrinFunV").css("display","none"); }
			
			if(edad_vac=="" || edad_vac=="Selecciona"){ $("#atencionDatoEdadV").css("display","block");}else{ $("#atencionDatoEdadV").css("display","none"); }
			
			
			if(nombre_vac=="" ||fechaP_vac==""||  aniosE_vac==""|| tipo_vac=="0" ||  ubi_vac==""  || areaE_vac=="0" || areaE_vac=="0" || desta_vac==""  || esco_vac=="0"  || prinF_vac=="" || edad_vac=="Selecciona" || edad_vac==""   || subido_por_vac=="" ){
				var mensaje = "¡FALTAN DATOS!";
				
				
				
				openWarninMsj(mensaje);
			}else{
				
				var lvl = $("#aswlvl").val();
				
				if(text_vac==""){
					
					alertify.alert("Recuerda que la reseña es el texto introductorio de tu vacante, puedes omitirla pero los postulantes, no tendr&aacute;n texto de introducci&oacute;n a tu vacante");
					if (lvl == 2){
						$("#form_vac_nueva").attr("action","VacanteGuardar");
					}else if (lvl >=3 ){
						$("#form_vac_nueva").attr("action","VacanteGuardar2");
					}
					
					
				}else{
					
					if (lvl == 2){
						$("#form_vac_nueva").attr("action","VacanteGuardar");
					}else if (lvl >= 3){
						$("#form_vac_nueva").attr("action","VacanteGuardar2");
					}
					
				}
				
				
				
				
				
				$("#form_vac_nueva").submit();
			}
			
			
		}
		
		
		
		
		
		
		
		$( "#fechaPublicacion" ).datepicker({
			changeMonth: true,
			changeYear: true
		});

	});
	
	$("#platillaVac").change(function(){
		  
		  var tipo = $(this).val();
		  tipoPlantilla(tipo);
	  });
	


	

	$("#btn_save_ejecutivo").click(function(){
		

		
		
		var nAsesorV = $("#nombreVacanteEjecutivo").val();
		var asesorEdad = $("#edadE").val();
		var asesorGenero = $("#genero_preferenciaE").val();
		var asesorEscolaridad = $("#escolaridadE").val();
		var asesorTalentos = $("#talentosE").val();
		var asesorPFunciones = $("#prinFuncionesVacanteE").val();
		var asesorTextoIntro = $("#textoIntroductorioE").val();
		
		var tamañoTalentosE = $("#talentosE").val().length;
		var tamañoFuncionesVacanteE = $("#prinFuncionesVacanteE").val().length;
		var tamañoTextoIntroE = $("#textoIntroductorioE").val().length;
		var estado=  $("#estadoE option:selected").val();
		var muni=  $("#municipioE").val();
		 $("#estadose").val(estado);
		 $("#munise").val(muni);
		
		
		if(tamañoTalentosE > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#talentosE").css("background-color","red");
		  	$("#talentosE").css("color","white");
		  	$("#talentosE").focus();
		}else if(tamañoFuncionesVacanteE > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#prinFuncionesVacanteE").css("background-color","red");
		  	$("#prinFuncionesVacanteE").css("color","white");
		  	$("#prinFuncionesVacanteE").focus();
		}else if(tamañoTextoIntroE > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#textoIntroductorioE").css("background-color","red");
		  	$("#textoIntroductorioE").css("color","white");
		  	$("#textoIntroductorioE").focus();
		}else{
			
			if(nAsesorV==""){ $("#atencionDatoFV").css("display","block"); }else{ $("#atencionDatoFV").css("display","none"); }
			
			if(asesorEdad==""){ $("#atencionDatoEdadV").css("display","block");}else{ $("#atencionDatoEdadV").css("display","none"); }
			
			if(asesorEdad==""){ $("#atencionDatoGenV").css("display","block");}else{ $("#atencionDatoGenV").css("display","none"); }
			
			if(asesorEscolaridad=="0"){ $("#atencionDatoEscoV").css("display","block");}else{ $("#atencionDatoEscoV").css("display","none"); }
			
			if(asesorTalentos==""){ $("#atencionDatoTalenV").css("display","block");}else{ $("#atencionDatoTalenV").css("display","none"); }
			
			if(asesorPFunciones==""){ $("#atencionDatoPrinFunV").css("display","block");}else{ $("#atencionDatoPrinFunV").css("display","none"); }
			
			if(asesorTextoIntro==""){ $("#atencionDatoIntroV").css("display","block");}else{ $("#atencionDatoIntroV").css("display","none"); }
			
			
			if(nAsesorV == "" || asesorEdad == "" || asesorGenero == "" || asesorEscolaridad == "" || asesorTalentos == "" || asesorPFunciones == "" || asesorTextoIntro == "" ){
				var mensaje = "¡FALTAN DATOS!";
				openWarninMsj(mensaje);
			}else{
				
				
				var lvl = $("#aswlvl").val();
				
				if (lvl == 1){
					$("#form_vac_nueva_ejecutivo").attr("action","VacanteGuardar");
				}else if (lvl == 2){
					$("#form_vac_nueva_ejecutivo").attr("action","VacanteGuardar2");
				}
				
				$("#form_vac_nueva_ejecutivo").submit();
				
				
				
			}
			
		}
		

		
		
		$( "#fechaPublicacion" ).datepicker({
			changeMonth: true,
			changeYear: true
		});

	});

	$("#btn_save_servicio").click(function(){
		
		
		
		
		var nAsesorV = $("#nombreVacanteServicio").val();
		var asesorEdad = $("#edadS").val();
		var asesorGenero = $("#genero_preferenciaS").val();
		var asesorEscolaridad = $("#escolaridadS").val();
		var asesorTalentos = $("#talentosS").val();
		var asesorPFunciones = $("#prinFuncionesVacanteS").val();
		var asesorTextoIntro = $("#textoIntroductorioS").val();
		var estado=  $("#estadoAS option:selected").val();
		var muni=  $("#municipioAS").val();
		 $("#estadosas").val(estado);
		 $("#munisas").val(muni);
		
		
		var tamañoTalentosS = $("#talentosS").val().length;
		var tamañoFuncionesVacanteS = $("#prinFuncionesVacanteS").val().length;
		var tamañoTextoIntroS = $("#textoIntroductorioS").val().length;
		
		
		if(tamañoTalentosS > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#talentosS").css("background-color","red");
		  	$("#talentosS").css("color","white");
		  	$("#talentosS").focus();
		}else if(tamañoFuncionesVacanteS > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#prinFuncionesVacanteS").css("background-color","red");
		  	$("#prinFuncionesVacanteS").css("color","white");
		  	$("#prinFuncionesVacanteS").focus();
		}else if(tamañoTextoIntroS > 1000){
			var mensaje = "Sobrepasaste los Caracteres Permitidos en Observaciones";
			openWarninMsj(mensaje);
		  	$("#textoIntroductorioS").css("background-color","red");
		  	$("#textoIntroductorioS").css("color","white");
		  	$("#textoIntroductorioS").focus();
		}else{
			
			
			if(nAsesorV==""){ $("#atencionDatoFV").css("display","block"); }else{ $("#atencionDatoFV").css("display","none"); }
			
			if(asesorEdad==""){ $("#atencionDatoEdadV").css("display","block");}else{ $("#atencionDatoEdadV").css("display","none"); }
			
			if(asesorEdad==""){ $("#atencionDatoGenV").css("display","block");}else{ $("#atencionDatoGenV").css("display","none"); }
			
			if(asesorEscolaridad=="0"){ $("#atencionDatoEscoV").css("display","block");}else{ $("#atencionDatoEscoV").css("display","none"); }
			
			if(asesorTalentos==""){ $("#atencionDatoTalenV").css("display","block");}else{ $("#atencionDatoTalenV").css("display","none"); }
			
			if(asesorPFunciones==""){ $("#atencionDatoPrinFunV").css("display","block");}else{ $("#atencionDatoPrinFunV").css("display","none"); }
			
			if(asesorTextoIntro==""){ $("#atencionDatoIntroV").css("display","block");}else{ $("#atencionDatoIntroV").css("display","none"); }
			
			
			
			if(nAsesorV == "" || asesorEdad == "" || asesorGenero == "" || asesorEscolaridad == "" || asesorTalentos == "" || asesorPFunciones == "" || asesorTextoIntro == "" ){
				var mensaje = "¡FALTAN DATOS!";
				openWarninMsj(mensaje);
			}else{
				
				
				var lvl = $("#aswlvl").val();
				
				if (lvl == 1){
					$("#form_vac_nueva_servicio").attr("action","VacanteGuardar");
				}else if (lvl == 2){
					$("#form_vac_nueva_servicio").attr("action","VacanteGuardar2");
				}
				
				$("#form_vac_nueva_servicio").submit();
				
				
				
			}
		}
		
		
		
		
		$( "#fechaPublicacion" ).datepicker({
			changeMonth: true,
			changeYear: true
		});

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
	
	
	$("#nombreVacante").blur(function(){
		var nom_letra = $(this).val();
		var temp = nom_letra.substring(0,1);
		var temp2 = $("#folio").val();
		var nom_admin = $("#nom_admin").val();
		var temp3 = nom_admin.substring(0,1);
		$("#folio").val(temp2 + temp + temp3);
	});
	

	
	$("#platillaCompa").change(function(){
		 
		  var tipo = $(this).val();
		  tipoComp(tipo);
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
	
	
	
	$("#nombreVacanteAsesor").blur(function (){
		var jup = $("#nombreVacanteAsesor").val();
		$("#areaExperienciaAsesor").val(jup);
		
		var jup2 = $("#nombreVacanteAsesor").val();
		$("#conocimientosAsesor").val(jup2);
	});
	
	
	
	$("#nombreVacanteEjecutivo").blur(function (){
		var jup = $("#nombreVacanteEjecutivo").val();
		$("#areaExperienciaEjecutivo").val(jup);
		
		var jup2 = $("#nombreVacanteEjecutivo").val();
		$("#conocimientosEjecutivo").val(jup2);
	});
	
	
	$("#nombreVacanteServicio").blur(function (){
		var jup = $("#nombreVacanteServicio").val();
		$("#areaExperienciaServicio").val(jup);
		
		var jup2 = $("#nombreVacanteServicio").val();
		$("#conocimientosServicio").val(jup2);
	});
	
	
	
	

	$("#estado").change(function(){
		  
		  
		  var opcion_seleccionada = $("#estado option:selected").text();
		  
		  var verificando = $("#ubicacion").val();
		  
		  if(verificando == " "){
			  $("#ubicacion").val(opcion_seleccionada);
		  }else{
			  
			  $("#ubicacion").val("");
			  
			  $("#ubicacion").val(opcion_seleccionada+" ");
		  }
	  });
	
	
	
	

	
	$("#estado").change(function (){
		var id_estado = $(this).val(); 
		lipiaMunicipios();
		traerMunicipio(id_estado);
	});
	
	
	
	$("#municipio").change(function(){
		  
		  
		  var opcionSeleccionadaEstado = $("#estado option:selected").text();
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
	
	
	
	
	$("#estadoA").change(function(){
		  
		  
		  var opcion_seleccionada = $("#estadoA option:selected").text();
		  
		  var verificando = $("#ubicacionA").val();
		  
		  if(verificando == " "){
			  $("#ubicacionA").val(opcion_seleccionada);
		  }else{
			  
			  $("#ubicacionA").val("");
			  
			  $("#ubicacionA").val(opcion_seleccionada+" ");
		  }
	  });
	

	
	$("#estadoE").change(function(){
		  
		  
		  var opcion_seleccionada = $("#estadoE option:selected").text();
		  
		  var verificando = $("#ubicacionE").val();
		  
		  if(verificando == " "){
			  $("#ubicacionE").val(opcion_seleccionada);
		  }else{
			  
			  $("#ubicacionE").val("");
			  
			  $("#ubicacionE").val(opcion_seleccionada+" ");
		  }
	  });
	
	
	
	

	
	$("#estadoE").change(function (){
		var id_estado = $(this).val(); 
		lipiaMunicipios2();
		traerMunicipio2(id_estado);
	});
	
	
	
	$("#municipioE").change(function(){
		  
		  
		  var opcionSeleccionadaEstado = $("#estadoE option:selected").text();
		  var opcionSeleccionadaMunicipio = $("#municipioE option:selected").text();
		  var verificando2 = $("#ubicacionE").val();
		  if(verificando2 != " "){
			  
			  
			  $("#ubicacionE").val("");
			  var concatenada2 = opcionSeleccionadaEstado + " " + opcionSeleccionadaMunicipio;
			  $("#ubicacionE").val(concatenada2);

		  }else{
			  alertify.alert("Debes seleccionar un municipio y estado primero");
		  }
	  });
	
	
	
	
	
	
	$("#estadoAS").change(function(){
		  
		  
		  var opcion_seleccionada = $("#estadoAS option:selected").text();
		  
		  var verificando = $("#ubicacionAS").val();
		  
		  if(verificando == " "){
			  $("#ubicacionAS").val(opcion_seleccionada);
		  }else{
			  
			  $("#ubicacionAS").val("");
			  
			  $("#ubicacionAS").val(opcion_seleccionada+" ");
		  }
	  });
	
	
	
	

	
	$("#estadoAS").change(function (){
		var id_estado = $(this).val(); 
		lipiaMunicipios3();
		traerMunicipio3(id_estado);
	});
	
	
	
	$("#municipioAS").change(function(){
		  
		  
		  var opcionSeleccionadaEstado = $("#estadoAS option:selected").text();
		  var opcionSeleccionadaMunicipio = $("#municipioAS option:selected").text();
		  var verificando2 = $("#ubicacionAS").val();
		  if(verificando2 != " "){
			  
			  
			  $("#ubicacionAS").val("");
			  var concatenada2 = opcionSeleccionadaEstado + " " + opcionSeleccionadaMunicipio;
			  $("#ubicacionAS").val(concatenada2);

		  }else{
			  alertify.alert("Debes seleccionar un municipio y estado primero");
		  }
	  });
	
	
	
	
	
	
	

	
	$("#otroSueldo").change(function(){
		var factu = parseFloat($(this).val());
		var permitidos=/[^0-9.]/;
		 if(permitidos.test(factu)){
			 alertify.alert("Solo se pueden ingresar numeros");
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
	
	
	var total_letrasTA = 1000;

	$('#talentosA').keyup(function() {
		$("#talentosA").css("background-color","white");
	  	$("#talentosA").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasTA - longitud;
	    if(resto <= 0){
	        $('#talentosA').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasFA = 1000;

	$('#prinFuncionesVacanteA').keyup(function() {
		$("#prinFuncionesVacanteA").css("background-color","white");
	  	$("#prinFuncionesVacanteA").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasFA - longitud;
	    if(resto <= 0){
	        $('#prinFuncionesVacanteA').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasOA = 1000;

	$('#textoIntroductorioA').keyup(function() {
		$("#textoIntroductorioA").css("background-color","white");
	  	$("#textoIntroductorioA").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasOA - longitud;
	    if(resto <= 0){
	        $('#textoIntroductorioA').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasTE = 1000;

	$('#talentosE').keyup(function() {
		$("#talentosE").css("background-color","white");
	  	$("#talentosE").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasTE - longitud;
	    if(resto <= 0){
	        $('#talentosE').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasFE = 1000;

	$('#prinFuncionesVacanteE').keyup(function() {
		$("#prinFuncionesVacanteE").css("background-color","white");
	  	$("#prinFuncionesVacanteE").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasFE - longitud;
	    if(resto <= 0){
	        $('#prinFuncionesVacanteE').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasOE = 1000;

	$('#textoIntroductorioE').keyup(function() {
		$("#textoIntroductorioE").css("background-color","white");
	  	$("#textoIntroductorioE").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasOE - longitud;
	    if(resto <= 0){
	        $('#textoIntroductorioE').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasTS = 1000;

	$('#talentosS').keyup(function() {
		$("#talentosS").css("background-color","white");
	  	$("#talentosS").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasTS - longitud;
	    if(resto <= 0){
	        $('#talentosS').attr("maxlength", 1000);
	    }
	});
	
	
	var total_letrasFS = 1000;

	$('#prinFuncionesVacanteS').keyup(function() {
		$("#prinFuncionesVacanteS").css("background-color","white");
	  	$("#prinFuncionesVacanteS").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasFS - longitud;
	    if(resto <= 0){
	        $('#prinFuncionesVacanteS').attr("maxlength", 1000);
	    }
	});
	
	var total_letrasOS = 1000;

	$('#textoIntroductorioS').keyup(function() {
		$("#textoIntroductorioS").css("background-color","white");
	  	$("#textoIntroductorioS").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasOS - longitud;
	    if(resto <= 0){
	        $('#textoIntroductorioS').attr("maxlength", 1000);
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
		content:'El Nombre de la Vacante no Puede Faltar',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoTV").simpletip({
		content:'Debes Seleccionar el Tipo de Vacante',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoFechV").simpletip({
		content:'Debes Seleccionar La Fecha de la Vacante',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoExP").simpletip({
		content:'Debes Debes Introducir los Años de Experiencia Necesarios',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoGenV").simpletip({
		content:'Debes Seleccionar el Genero',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoUV").simpletip({
		content:'Debes Introducir La Ubicacion, Selecciona de los Combos de Estado y Municipio',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoEdadV").simpletip({
		content:'Debes Seleccionar la Edad o selecciona otro y rellena con tu Edad especifica',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoEscoV").simpletip({
		content:'Debes Seleccionar el Nivel de Estudios',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoAreaV").simpletip({
		content:'Debes Seleccionar el Área de experiencia',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoConoV").simpletip({
		content:'Debes Introducir los Conocimientos',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoHoraV").simpletip({
		content:'Debes Seleccionar el Horario o selecciona otro y rellena con tu Nuevo Horario',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoSueldoV").simpletip({
		content:'Debes Introducir el Sueldo',
		fixed: true, position: 'top' 
	});
	
	
	$("#atencionDatoIntroV").simpletip({
		content:'Debes Introducir La Reseña',
		fixed: true, position: 'top' 
	});
	
	
	
	$("#atencionDatoTalenV").simpletip({
		content:'Debes Introducir Los Talentos',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoObsV").simpletip({
		content:'Debes Introducir las Observaciones',
		fixed: true, position: 'top' 
	});
	
	$("#atencionDatoPrinFunV").simpletip({
		content:'Debes Introducir las Principales Funciones',
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
				 
				 
		
		 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
		 				$("#municipio").append('<option value="'+ jsonDataMNP.items[j].id_municipio+'">'+municipioOrdenado[j]+'</option>');
		 		}
		 
			  

	 		 });
	return false;
	
}


function lipiaMunicipios(){
	document.getElementById("municipio").options.length = 1;
};

function lipiaMunicipios1(id){
	document.getElementById("municipio"+id).options.length = 1;
};

function lipiaMunicipios2(){
	document.getElementById("municipioE").options.length = 1;
};

function lipiaMunicipios3(){
	document.getElementById("municipioAS").options.length = 1;
};


function traerMunicipio1(id_estado,id){
	
	var  municipioOrdenado = new Array();
	
	
	
	 $.getJSON('json/verMunicipio',{id_estado: id_estado},
			  function(jsonDataMNP) {
		 		
				 for(l=0;l<=(jsonDataMNP.items.length)-1;l++){
					 municipioOrdenado [l] = jsonDataMNP.items[l].municipio;
					
				}
				 
				 municipioOrdenado.sort();
				 
				 
		
		 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
		 				$("#municipio"+id).append('<option value="'+ jsonDataMNP.items[j].id_municipio+'">'+municipioOrdenado[j]+'</option>');
		 		}
		 
			  

	 		 });
	return false;
	
}


function traerMunicipio2(id_estado){
	
	var  municipioOrdenado = new Array();
	
	
	
	 $.getJSON('json/verMunicipio',{id_estado: id_estado},
			  function(jsonDataMNP) {
		 		
				 for(l=0;l<=(jsonDataMNP.items.length)-1;l++){
					 municipioOrdenado [l] = jsonDataMNP.items[l].municipio;
					
				}
				 
				 municipioOrdenado.sort();
				 
				 
		
		 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
		 				$("#municipioE").append('<option value="'+ jsonDataMNP.items[j].id_municipio+'">'+municipioOrdenado[j]+'</option>');
		 		}
		 
			  

	 		 });
	return false;
	
}


function traerMunicipio3(id_estado){
	
	var  municipioOrdenado = new Array();
	
	
	
	 $.getJSON('json/verMunicipio',{id_estado: id_estado},
			  function(jsonDataMNP) {
		 		
				 for(l=0;l<=(jsonDataMNP.items.length)-1;l++){
					 municipioOrdenado [l] = jsonDataMNP.items[l].municipio;
					
				}
				 
				 municipioOrdenado.sort();
				 
				 
		
		 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
		 				$("#municipioAS").append('<option value="'+ jsonDataMNP.items[j].id_municipio+'">'+municipioOrdenado[j]+'</option>');
		 		}
		 
			  

	 		 });
	return false;
	
}

function lipiaMunicipios(){
	document.getElementById("municipio").options.length = 1;
};





function tipoPlantilla(tipo){
	var tip = tipo;
	
	if(tip == "nueva"){

		$("#platillaCompa").show();
		
	}else if(tip == "modificar"){
		
		$("#platillaCompa").show();
		
	}else if(tip == "eliminar"){
		
		$("#platillaCompa").show();
		
	}
	else if(tip == "Selecciona"){

	}
}

	
function tipoPlantilla2(tipo){
var tip = tipo;	
$("#tipo_vac_nueas").val(tip);
if(tip == 'Asesor de Ventas'){
	$("#vacante_normal").hide();
	$("#asesor_ventas").show();
	$("#ejecutivo_ventas").hide();
	$("#asesor_servicio").hide();
	$("#tit_nue").hide();
	$("#ed_nue").hide();
	$("#nam_nue").hide();
	$("#gen_nue").hide();
	$("#esco_nue").hide();
	$("#tit_as").show();
	$("#ed_as").show();
	$("#nam_as").show();
	$("#gen_as").show();
	$("#esco_as").show();
	
	
	$("#nombreVacanteAsesor").val("Asesor de Ventas");
	$("#edadA").val("18 años en adelante");
	$("#genero_preferenciaA").val("Indistinto");
	$("#escolaridadA").val("Bachillerato trunco/ terminado");
	$("#talentosA").val("Facilidad de palabra, Atencion a clientes, Dinamico, Responsable, Gusto por la tecnologia y Gusto por las ventas ");
	$("#prinFuncionesVacanteA").val("Prospeccion y abordamiento de clientes, Promoveer equipos celulares, Activar líneas, Atencion a clientes");
	$("#textoIntroductorioA").val("Excelente plan de comisiones, Prestaciones de ley, Excelente ambiente de trabajo y Capcitación constante");
	
	var jup = $("#nombreVacanteAsesor").val();
	$("#areaExperienciaAsesor").val(jup);
	
	var jup2 = $("#nombreVacanteAsesor").val();
	$("#conocimientosAsesor").val(jup2);
	
}else if(tip == 'Ejecutivo de Ventas'){
	$("#vacante_normal").hide();
	$("#asesor_ventas").hide();
	$("#ejecutivo_ventas").show();
	$("#asesor_servicio").hide();
	
	var jup = $("#nombreVacanteEjecutivo").val();
	$("#areaExperienciaEjecutivo").val(jup);
	
	var jup2 = $("#nombreVacanteEjecutivo").val();
	$("#conocimientosEjecutivo").val(jup2);
	
}else if(tip == 'Asesor de Servicio'){
	$("#vacante_normal").hide();
	$("#asesor_ventas").hide();
	$("#ejecutivo_ventas").hide();
	$("#asesor_servicio").show();
	
	var jup = $("#nombreVacanteServicio").val();
	$("#areaExperienciaServicio").val(jup);
	
	var jup2 = $("#nombreVacanteServicio").val();
	$("#conocimientosServicio").val(jup2);
	
}else if(tip = "Nueva Vacante Geografica"){
	
	$("#vacante_normal").hide();
	$("#asesor_ventas").show();
	$("#ejecutivo_ventas").hide();
	$("#asesor_servicio").hide();
	$("#tit_as").hide();
	$("#ed_as").hide();
	$("#nam_as").hide();
	$("#gen_as").hide();
	$("#esco_as").hide();
	$("#tit_nue").show();
	$("#ed_nue").show();
	$("#nam_nue").show();
	$("#gen_nue").show();
	$("#esco_nue").show();
	
	$("#nombreVacanteAsesor").val(" ");
	$("#talentosA").val(" ");
	$("#prinFuncionesVacanteA").val(" ");
	$("#textoIntroductorioA").val(" ");
	
	
	
	
}
}

function otraEdad(val){
	var valE = val;
	
	if(valE == 'Otro'){
		
		$("#otroEdad").show();
		$("#otroEdad").alphanumeric();
		 
	}else{
		$("#otroEdad").hide();
		$("#edad").val(valE);
	}
}


function otroSalario(val){
	var valE = val;
	
	if(valE == 'otro'){
		
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


