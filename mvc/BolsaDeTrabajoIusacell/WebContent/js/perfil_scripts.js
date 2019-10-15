var cargando=0;
$(document).ready(function(){
	
	$("#botonArriba").hide();
	$("#idLateralText").hide();
	$("#area_especialidad").hide();
	$("#label_especialidad").hide();
	$("#content").css("height","1330");
	$('#infografia').svg();
	$('#talentos').svg();
	$('#talentGraph').svg();
	var jobColor=0;
	  var svg = $('#infografia').svg('get'); 
	  var svgt=$('#talentos').svg('get');
	  var svgc=$('#talentGraph').svg('get');
	  var g0=svg.group(svg);
	  var g1 = svg.group(g0);
	  var g2=svg.group(g1,"father");
	   
	
	  
	 
	  $("#deportes_container").hide();
	  $("#artes_container").hide();
	  $("#entretenimientos_container").hide();
	  $("#rendimiento_container").hide();
	  $("#juegos_container").hide();
	  $("#aficiones_container").hide();
	  $("#pasatiempos_container").hide();
	  $("#volver_talento").hide();
	  $("#datos_personalesD").hide();
	  
	  
	  /* DIALOGOS */
  	
  	$("#dialog_datos_personales").dialog({
  	    open: function(event, ui) {},
  	    close: function(event, ui) {},
  	    bgiframe: true,
  	    autoOpen: false,
  	    modal: true,
  	    height: 470,
  	    width: 615,
  	    resizable: false,
  	    draggable: false,
  	    show: "blind",
  		hide: "explode",
  	    position: 'center',
  	    buttons: {
  	        'Guardar': function() {
  	        	JsonAndAjaxPersonal(svg,g2,g1);
  	        },'Cancelar':function(){
  	        	$(this).dialog('close');
  	        }
  	    }
  	 });
  	
  	$("#dialog_datos_ubicacion").dialog({
  	    open: function(event, ui) {},
  	    close: function(event, ui) {},
  	    bgiframe: true,
  	    autoOpen: false,
  	    modal: true,
  	    height: 450,
  	    width: 623,
  	    resizable: false,
  	    draggable: false,
  	    show: "blind",
  		hide: "explode",
  	    position: 'center',
  	    buttons: {
  	        'Guardar': function() {
  	        	JsonAndAjaxUbicacion();
  	        },'Cancelar':function(){
  	        	$(this).dialog('close');
  	        }
  	    }
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
	    	 'Agregar': function() {
	    		 jsonAndAjaxEscolaridad(svg,g1,g2);
 	        },'Cancelar':function(){
 	        	$(this).dialog('close');
 	        }
	    }
	 });
  	
  	$("#dialog_modificar_escolaridad").dialog({
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
	    		 modificarEducacion("modificar");
	    		 $(this).dialog('close');
 	        },'Eliminar': function() {
 	        	modificarEducacion("eliminar");
	    		 $(this).dialog('close');
 	        },'Cancelar':function(){
 	        	  $(this).dialog('close');
 	              estudioActualM=document.getElementById("estudioActualM");
 	              estudioActualM.checked = false;
 	             $("#afaml").show();
 				  $("#mesFinFM").show();
 				  $("#anioFinFM").show(); 
 				  $("#mesFinContainerFM").show();
 				  $("#anioFinContainerFM").show();
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
	    	'Agregar': function() {
	    		jsonAndAjaxExperiencia(svg,g1,g2);
  	    		//$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_modificar_experiencia").dialog({
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
	    		modificarExperiencia("modificar");
  	    		$(this).dialog('close');
   	        },'Eliminar': function() {
   	        	modificarExperiencia("eliminar");
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
                trabajoActualM=document.getElementById("trabajoActualM");
                trabajoActualM.checked = false;
                  $("#aexpml").show();
				  $("#mesFinEM").show();
				  $("#anioFinEM").show(); 
				  $("#mesFinContainerEM").show();
				  $("#anioFinContainerEM").show();
				  
   	        }
	    }
	 });
  	
  	
  	$("#dialog_foto").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 230,
	    width: 623,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	

  	$("#dialog_identidad").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 620,
	    width: 750,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Agregar': function() {
	    		guardarPersonalidad();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_impacto").dialog({
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
	    	'Agregar': function() {
	    		ajaxImpacto();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_interrelacion").dialog({
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
	    	'Agregar': function() {
	    		ajaxInterrelacion();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_laboral").dialog({
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
	    	'Agregar': function() {
	    		ajaxLaboral();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_empuje").dialog({
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
	    	'Agregar': function() {
	    		ajaxEmpuje();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_pensamiento").dialog({
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
	    	'Agregar': function() {
	    		ajaxPensamiento();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_agregar_idioma").dialog({
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
	    	'Agregar': function() {
	    		guardarIdiomas();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_modificar_idioma").dialog({
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
	    	'Modificar': function() {
	    		modificarIdiomas();
  	    		$(this).dialog('close');
   	        },'Eliminar': function() {
	    		eliminarIdiomas();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("#dialog_eliminar_idioma").dialog({
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
	    	'Eliminar': function() {
	    		eliminarIdiomas();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_agregar_software").dialog({
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
	    	'Agregar': function() {
	    		guardarSoftware();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_modificar_software").dialog({
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
	    	'Modificar': function() {
	    		modificarSoftware();
  	    		$(this).dialog('close');
   	        },'Eliminar': function() {
   	        	eliminarSoftware();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	//$("#softwareList").hide();
  	//$("#dominioSw").hide();
  	
  	$("div.swList").hide();
  	$("#swCategoriaList").change(function(){
  		var categoria=$(this).val();
  		$("#softwareList").html("");
  		obtenerListaSoftware(categoria);
  		
  	});
  	
  	$("#swCategoriaListM").change(function(){
  		var categoria=$(this).val();
  		$("#softwareListM").html("");
  		obtenerListaSoftwareM(categoria);
  		
  	});
  	
  	
  	$("#softwareList").change(function(){
  		$("#dominioSw").show();
  		
  	});
  	
  	$("div.catContainer").each(function(){
  		var idAux=$(this).attr("id");
  		var idArr=idAux.split("_");
  		var idCat=idArr[0];
  		softwareCat(idCat);
  		
  	});
  	
  	$("div.swShowList").click(function(){
  		var aux=$(this).attr("id");
  		var arr=aux.split("_");
  		var id=arr[0];
  	    var status=$("#"+id+"_listStat").val();
  	    if(status=="closed"){
  	    	$("#"+id+"_list").show();
  	    	$("#"+id+"_listStat").val("open");
  	    	$("#"+id+"_showList").html("ocultar");
  	    	
  	    }else if(status=="open"){
  	    	$("#"+id+"_list").hide();
  	    	$("#"+id+"_listStat").val("closed");
  	    	$("#"+id+"_showList").html("Mostrar");
  	    }
  		
  	});
  	/*
  	$("input.caja_input").blur(function(){
  		
  		reg=$(this).val();
		regcheck=/^[0-9a-zA-Z·ÈÌÛ˙¡…Õ”⁄Ò—!°ø?\\s\\$\\%\"#.:,_@-]/;
		if(!(regcheck.test(reg))){
			alert("Caracter no valido, solo se admiten !°ø?$%#@ -_ como caracteres especiales");
			$(this).val("");
		}
		
  		
  		
  	});
  
  	*/
  	$("#dialog_agregar_hobbie").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height:620,
	    width: 795,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Agregar': function() {
	    		guardar_hobbie();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	$("div.hobbie_container").click(function(){
  		
		var auxId=$(this).attr("id");
		var arrId=auxId.split("_");
		var hob=arrId[2];
		
		
		var seleccionado=$("#hobbie_seleccionado").val();
		var valor=hob;
		if(seleccionado!="ninguno"){
			$("#hobbie_row_"+seleccionado).css("background-color","#D3D3D3");
		}
		$("#hobbie_row_"+valor).css("background-color","crimson");
		$("#hobbie_seleccionado").val(valor);
		
		
	});
  	
  
  	
  
  	$("#dialog_agregar_talento").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 450,
	    width: 800,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		guardarTalentos(svgt);
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
  	
  	$("#dialog_sueldo").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 200,
	    width: 270,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		guardarSalario();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	    
  	$("#dialog_horario").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 200,
	    width: 262,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		guardarHorario();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
	$("#dialog_disposicion").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 225,
	    width: 400,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		guardarDisposicion();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
	
	$("#dialog_area_interes").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 270,
	    width: 358,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		guardarAreaDeInteres();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });

	$("#dialog_habilidad").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 300,
	    width: 400,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	    	'Guardar': function() {
	    		 guardarHabilidad();
  	    		$(this).dialog('close');
   	        },'Cancelar':function(){
   	        	$(this).dialog('close');
   	        }
	    }
	 });
  	
	$(document).scroll(function(){
		
		var sstop=$(document).scrollTop();
		
		if(sstop>100){
			$("#botonGuardar").css("margin-left","734px");
			$("#botonArriba").show();
		}else{
			$("#botonArriba").hide();
			$("#botonGuardar").css("margin-left","872px");
			
		}
		
	});
	
  	///////////////openers//////////////////////////
  	$("#addEdu").click(function(){
		abrir_escolaridad();
		
	});
	
	$("#editarPersonales").click(function(){
		var fechaN=$("#nac_span").text();
		var birth=fechaN.split("/");
		var bday=birth[0];
		var bmonth=birth[1];
		var byear=parseInt(birth[2]);
		$("#dia").val(bday);
		$("#mes").val(bmonth);
		$("#anio").val(byear);
		
		abrir_personales();
	});
	$("#addWork").click(function(){
		abrir_experiencia();
		
	});
	
	$("#editarDireccion").click(function(){
		abrir_ubicacion();
		
	});
	
	$("div.identidad_head").click(function(){
		abrir_impacto();		
	});
	
	$("div.interrelacion").click(function(){
		abrir_interrelacion();		
	});
	
	$("div.laboral").click(function(){
		abrir_laboral();		
	});
	
	$("div.empuje").click(function(){
		abrir_empuje();		
	});
	
	$("div.pensamiento").click(function(){
		abrir_pensamiento();		
	});
	
	$("#editar_idiomas").click(function(){
		$("#parametro_idioma").val("crear");
		$("#id_idioma").val("");
		abrir_idioma();		
	});
	
	$("div.idioma_info").click(function(){
		//$("#parametro_idioma").val("modificar");
		var idIdioma=$(this).attr("id");
		$("#id_idiomaM").val(idIdioma);
		 abrir_modificar_idioma();		
	});
	
	$("div.eliminar_idiomas").click(function(){
		var auxIdioma=$(this).attr("id");
		var arrIdioma=auxIdioma.split("_");
		var idIdioma=arrIdioma[0];
		$("#id_idioma").val(idIdioma);
		abrir_eliminar_idioma();			
	});
	
	$("#editar_software").click(function(){
		$("#sw_parametro").val("crear");
		abrir_software();			
	});
	
	$("div.swrow").click(function(){
		var auxId=$(this).attr("id");
		var arrId=auxId.split("_");
		var idSw=arrId[0];
		$("#id_swM").val(idSw);
		$("#sw_parametroM").val("modificar");
		abrir_modificar_software();		
	});
	
	

	$("div.hobbie_grid").click(function(){
		var auxId=$(this).attr("id");
		var arrId=auxId.split("_");
		var cell=arrId[1];
		$("#number_hobbie_cell").val(cell);
		abrir_hobbie();
	});
	
	$("#red_skill").click(function(){
		$("#tColor").val("red");
		abrir_talento();
	});
	
	$("#blue_skill").click(function(){
		$("#tColor").val("blue");
		abrir_talento();
	});
	$("#yellow_skill").click(function(){
		$("#tColor").val("yellow");
		abrir_talento();
	});
	$("#gold_skill").click(function(){
		$("#tColor").val("gold");
		abrir_talento();
	});
	
	$("div.sal_header").click(function(){
		abrir_salario();
	});
	
	
	$("div.hora_header").click(function(){
		abrir_horario();
	});
	
	$("div.dispo_header").click(function(){
		abrir_disposicion();
	});
	
	$("#editar_skill").click(function(){
		abrir_skill();
	});
	
	$("#foto_usr").click(function(){
		abrir_foto();
	});
	
	$("#inter_container").click(function(){
   	 abrir_area_interes();
   });
	
	$("#editarArea").click(function(){
	   	 abrir_area_interes();
	   });
	
	
	$("#botonGuardar").click(function(){
		document.location.href="/BolsaDeTrabajoIusacell/perfilVista";
	});
	
	$("rect.jobgraph").click(function(){
		var aidi=$(this).attr("id");
		var aidiarr=aidi.split("_");
		var id=aidiarr[0];
		$("#idExp").val(id);
		abrir_modificar_experiencia();
	});
	
	$("rect.schoolgraph").click(function(){
		var aidi=$(this).attr("id");
		var aidiarr=aidi.split("_");
		var id=aidiarr[0];
		$("#idForm").val(id);
		abrir_modificar_educacion();
	});
	

	
	$("#exp").val('0');
	$("#edu").val('0');
	
	
	
	
	 
	  dibujarGraficaTalentos(svgt);
	  dibujarTalentConf(svgc);
	  obtenerTalentos(svgt);
	  
	
	  $("div.impactoCheck").click(function(){
		   var iden=$(this).attr("id");
		    identidadImpacto(iden);
		});
	  
	  $("div.interrelacionCheck").click(function(){
		   var iden=$(this).attr("id");
		    identidadInterrelacion(iden);
		});
	  
	  $("div.laboralCheck").click(function(){
		   var iden=$(this).attr("id");
		    identidadLaboral(iden);
		});
	  
	  $("div.empujeCheck").click(function(){
		   var iden=$(this).attr("id");
		   identidadEmpuje(iden);
		});
	  
	  $("div.pensamientoCheck").click(function(){
		   var iden=$(this).attr("id");
		   identidadPensamiento(iden);
		});
	  
	 
	 
	  
	  
	 
	  
	 
	  
	  
	  
	  $("#entretenimiento_button").click(function(){
		  $("#deportes_container").hide();
		  $("#deportes_select").css('background-color','#FFFFFF');
		  $("#artes_container").hide();
		  $("#artes_select").css('background-color','#FFFFFF');
		  $("#pasatiempos_container").hide();
		  $("#pasatiempos_select").css('background-color','#FFFFFF');
		  $("#entretenimientos_container").show();
		  $("#entretenimiento_select").css('background-color','#D3D3D3');
		  //$("#hobbie_selector").hide();
		  $("#volver_talento").show();
	  });
	  
      $("#deportes_button").click(function(){
    	  $("#entretenimientos_container").hide();
    	  $("#entretenimiento_select").css('background-color','#FFFFFF');
		  $("#artes_container").hide();
		  $("#artes_select").css('background-color','#FFFFFF');
		  $("#pasatiempos_container").hide();
		  $("#pasatiempos_select").css('background-color','#FFFFFF');
    	  $("#deportes_container").show();
    	  $("#deportes_select").css('background-color','#D3D3D3');
    	  //$("#hobbie_selector").hide();
    	  $("#volver_talento").show();
	  });

     $("#artes_button").click(function(){
    	  $("#entretenimientos_container").hide();
    	  $("#entretenimiento_select").css('background-color','#FFFFFF');
		  $("#deportes_container").hide();
		  $("#deportes_select").css('background-color','#FFFFFF');
		  $("#pasatiempos_container").hide();
		  $("#pasatiempos_select").css('background-color','#FFFFFF');
    	 $("#artes_container").show();
    	 $("#artes_select").css('background-color','#D3D3D3');
    	// $("#hobbie_selector").hide();
    	 $("#volver_talento").show();
     });

     $("#rendimiento_button").click(function(){
	  
    	 $("#rendimiento_container").show();
    	 $("#hobbie_selector").hide();
    	 $("#volver_talento").show();
     });

    $("#juegos_button").click(function(){
    	 $("#juegos_container").show();
    	 $("#hobbie_selector").hide();
    	 $("#volver_talento").show();
	  
    });

    $("#aficiones_button").click(function(){
    	$("#aficiones_container").show();
    	$("#hobbie_selector").hide();
    	$("#volver_talento").show();
    });

    $("#pasatiempos_button").click(function(){
    	  $("#entretenimientos_container").hide();
    	  $("#entretenimiento_select").css('background-color','#FFFFFF');
		  $("#deportes_container").hide();
		  $("#deportes_select").css('background-color','#FFFFFF');
		  $("#artes_container").hide();
		  $("#artes_select").css('background-color','#FFFFFF');
    	  $("#pasatiempos_container").show();
    	  $("#pasatiempos_select").css('background-color','#D3D3D3');
    	// $("#hobbie_selector").hide();
    	 $("#volver_talento").show();
    });
    $("#volver_talento").click(function(){
    	 $("#deportes_container").hide();
   	  $("#artes_container").hide();
   	  $("#entretenimientos_container").hide();
   	  $("#rendimiento_container").hide();
   	  $("#juegos_container").hide();
   	  $("#aficiones_container").hide();
   	  $("#pasatiempos_container").hide();
   	  $(this).hide();
   	 $("#hobbie_selector").show();
   	  
    });
    
    $("#nacionalidad").change(function(){
    	var pais=$(this).val();
    	if(pais == "MÈxico" || pais == "MEXICO" || pais == "mexico" || pais=="Mexico"){	
    		$("#cambiovarest").hide();
    		$("#cambiovarmun").hide();
    		$("#estadoPais").show();
    		$("#municipioDelegacion").show();
    		$("#estadoPais").change(function(){
            	var estado=$(this).val();
            	$("#municipioDelegacion").html("");
            	obtenerMunicipio(estado);
            });
    	}
    	else{
    		$("#estadoPais").hide();
    		$("#municipioDelegacion").hide();
    		$("#cambiovarest").html("<s:select id='cambiovarest' name='cambiovarest'/>");
    		$("#cambiovarmun").html("<s:select id='cambiovarmun' name='cambiovarmun' />");
    		var optionext="<option value='EXTRANJERO'>EXTRANJERO</option>";
    		$("#cambiovarest").append(optionext);
	    	   $("#cambiovarmun").append(optionext);
	    	   $("#cambiovarest").show();
	    		$("#cambiovarmun").show(); 
    	}
    });


    
    
    
    $("div.skill_delete").click(function(){
    	var aidi=$(this).attr("id");
        var arraidi=aidi.split("_");
        var id=arraidi[1];
       
    	eliminarHabilidad(id);
    });
    
    $("#guardar_foto").click(function(){
    	var verificar = $("#foto").val();
    	  
    	  if (verificar == '')
    	        {
    	   alert('DEBES SELECCIONAR UN ARCHIVO'); 
    	        }else{
    	         $("#foto_upload").submit();
    	      
    	        } 
    	
    	
    });
    
	 
   $("#botonArriba").click(function(){
	   
	   $('html, body').animate({scrollTop:0}, 'slow');

	   
   }); 
   
	  obtenerEmpleo(svg,g1,g2);
	  obtenerEducacion(svg,g1,g2);
	  obtenerHobbies();
	  dibujar_recta(svg,g2,g1);
	  obtenerMunicipio($("#estadoPais").val());
	  obtenerHabilidad();
	  
	  var total_letrasP = 250;

	  $('textarea.area_input').keyup(function() {
	      var longitud = $(this).val().length;
	      var resto = total_letrasP - longitud;
	      if(resto <= 0){
	          $(this).attr("maxlength", 800);
	      }
	  });
	  
	  
	  $("input.sueldo").change(function(){
		  
		  var sue = parseFloat($(this).val());
		  var permitidos=/[^0-9.]/;
		   if(permitidos.test(sue)){
		      alert("Solo se puedeingresar numeros");
		      $(this).css("background-color","red");
		      $(this).val("");
		      $(this).focus();

		   }else{
		    $(this).css("background-color","white");
		   }
		  
	  });
	  
	  $("#estudioActualM").click(function(){	 
		  var id=$(this).attr('id');	
		  if(document.getElementById(id).checked==true){
			  $("#afaml").hide();
			  $("#mesFinFM").hide();
			  $("#anioFinFM").hide();
			  $("#mesFinContainerFM").hide();
			  $("#anioFinContainerFM").hide();
			  
		  }else{
			  $("#afaml").show();
			  $("#mesFinFM").show();
			  $("#anioFinFM").show(); 
			  $("#mesFinContainerFM").show();
			  $("#anioFinContainerFM").show();
			  
		  }
		  
		  
	  });
	  
	  $("#estudioActual").click(function(){
	        var id=$(this).attr('id');		  
			  if(document.getElementById(id).checked==true){
				  $("#afal").hide();
				  $("#mesFinF").hide();
				  $("#anioFinF").hide();
				  $("#mesFinContainerF").hide();
				  $("#anioFinContainerF").hide();
				  
			  }else{
				  $("#afal").show();
				  $("#mesFinF").show();
				  $("#anioFinF").show(); 
				  $("#mesFinContainerF").show();
				  $("#anioFinContainerF").show();
				  
			  }
			  
			  
		  });
	  
	  $("#trabajoActual").click(function(){
		  var id=$(this).attr('id');		  
		  if(document.getElementById(id).checked==true){
			  $("#aexpl").hide();
			  $("#mesFinE").hide();
			  $("#anioFinE").hide();
			  $("#mesFinContainerE").hide();
			  $("#anioFinContainerE").hide();
			  
		  }else{
			  $("#aexpl").show();
			  $("#mesFinE").show();
			  $("#anioFinE").show(); 
			  $("#mesFinContainerE").show();
			  $("#anioFinContainerE").show();
			  
		  }
		  
		  
		  });
	  
	  $("#trabajoActualM").click(function(){
	        var id=$(this).attr('id');		  
			  if(document.getElementById(id).checked==true){
				  $("#aexpml").hide();
				  $("#mesFinEM").hide();
				  $("#anioFinEM").hide();
				  $("#mesFinContainerEM").hide();
				  $("#anioFinContainerEM").hide();
				  
			  }else{
				  $("#aexpml").show();
				  $("#mesFinEM").show();
				  $("#anioFinEM").show(); 
				  $("#mesFinContainerEM").show();
				  $("#anioFinContainerEM").show();
				  
			  }
			  
			  
		  });
	  
	  
	  ObtenerPorcentaje();
	  ObtenerFoto();
	  
	  
	  $("#talentoRed").change(function(){
		  var red=$(this).val();
		  var blue=$("#talentoBlue").val();
		  var yellow=$("#talentoYellow").val();
		  var gold=$("#talentoGold").val();
		  if(red==blue||red==yellow||red==gold){
			  alert("Ya ha seleccionado un Talento similar");
			  $(this).val("Selecciona");
		  }
	  });
      $("#talentoBlue").change(function(){
    	  var red=$("#talentoRed").val();
		  var blue=$(this).val();
		  var yellow=$("#talentoYellow").val();
		  var gold=$("#talentoGold").val();
		  if(blue==red||blue==yellow||blue==gold){
			  alert("Ya ha seleccionado un Talento similar");
			  $(this).val("Selecciona");
		  }
	  });
	  
      $("#talentoYellow").change(function(){
    	  var red=$("#talentoRed").val();
		  var blue=$("#talentoBlue").val();
		  var yellow=$(this).val();
		  var gold=$("#talentoGold").val();
		  if(yellow==red||yellow==blue||yellow==gold){
			  alert("Ya ha seleccionado un Talento similar");
			  $(this).val("Selecciona");
		  }
	  });
      $("#talentoGold").change(function(){
    	  var red=$("#talentoRed").val();
		  var blue=$("#talentoBlue").val();
		  var yellow=$("#talentoYellow").val();
		  var gold=$(this).val();
		  if(gold==red||gold==blue||gold==yellow){
			  alert("Ya ha seleccionado un Talento similar");
			  $(this).val("Selecciona");
		  }
		  
	  });
	  
	  
	  $("#editarLateral").mouseover(function(){
		     
		     $("#idLateralText").show('slide', {direction: 'right'}, 50);
		   });
		   
		   $("#editarLateral").mouseleave(function(){
		     
		     $("#idLateralText").hide('slide', {direction: 'right'}, 50);
		   });
		   
		   $("#nivelAcademico").change(function(){
			   var valor=$(this).val();
			   if(valor>3){
				   $("#area_especialidad").show();
				   $("#label_especialidad").show();
			   }else{
				   $("#area_especialidad").hide();
				   $("#label_especialidad").hide();
			   }
			   
		   });
		   
	  
});


function abrir_personales(){
	$( "#dialog_datos_personales" ).dialog( "open");
}
function abrir_escolaridad(){
	$( "#dialog_escolaridad" ).dialog( "open");
}

function abrir_experiencia(){
	$( "#dialog_experiencia" ).dialog( "open");
}

function abrir_ubicacion(){
	$( "#dialog_datos_ubicacion").dialog( "open");
}

function abrir_impacto(){
	$( "#dialog_identidad").dialog( "open");
	checaper();
	checaconst();
	checapego();
	checaempu();
}

function abrir_interrelacion(){
	$( "#dialog_interrelacion").dialog( "open");
}

function abrir_laboral(){
	$( "#dialog_laboral").dialog( "open");
}

function abrir_empuje(){
	$( "#dialog_empuje").dialog( "open");
}

function abrir_pensamiento(){
	$( "#dialog_pensamiento").dialog( "open");
}

function abrir_idioma(){
	$( "#dialog_agregar_idioma").dialog( "open");
	
}

function abrir_modificar_idioma(){
	$( "#dialog_modificar_idioma").dialog( "open");
	
}

function abrir_eliminar_idioma(){
	$( "#dialog_eliminar_idioma").dialog( "open");
	
}

function abrir_software(){
	obtenerListaSoftware(1);
	$( "#dialog_agregar_software").dialog( "open");
	
}

function abrir_modificar_software(){
	obtenerListaSoftwareM(1);
	$( "#dialog_modificar_software").dialog( "open");
	
}


function abrir_talento(){
	$( "#dialog_agregar_talento").dialog( "open");
	
}

function abrir_hobbie(){
	$("#dialog_agregar_hobbie").dialog( "open");
	
}

function abrir_foto(){$("#dialog_foto").dialog( "open");}

function abrir_salario(){
	
	$("#dialog_sueldo").dialog( "open");
}

function abrir_horario(){
	$("#dialog_horario").dialog("open");
}

function abrir_disposicion(){
	$("#dialog_disposicion").dialog("open");
	
}

function abrir_skill(){
	$("#dialog_habilidad").dialog("open");
}

function abrir_modificar_experiencia(){
	$( "#dialog_modificar_experiencia" ).dialog( "open");
}

function abrir_modificar_educacion(){
	$( "#dialog_modificar_escolaridad" ).dialog( "open");
	
}

function abrir_area_interes(){
	$("#dialog_area_interes").dialog("open");
}

//////////////////////svg////////////////////////////
function dibujar_recta(svg,g2,g1){
	var fechaN=$("#nac_span").text();
	var birth=fechaN.split("/");
	var bday=birth[0];
	var bmonth=birth[1]-1;
	var byear=parseInt(birth[2])+12;
	var birthDay=new Date(byear,bmonth,bday);
	var today=new Date();
	var yearb=birthDay.getFullYear();
	var yeart=today.getFullYear();
	var numyear=parseInt(yeart-yearb);
	var width=$("#infografia").width();
	var pix=parseInt(width/(numyear+1));
	var middlepix=pix/2;
	var j=0;
	var y=parseInt(byear);
	var firstY=byear.toString().substring(2,4);
	var year="";
	var anio=""+firstY;
	for(var i=1;i<=(numyear+1);i++){
		svg.rect(g1,j,200,pix,25,{id:y,fill:'black',stroke:'dimgray',strokeWidth:5});
		svg.text(g1,j+(middlepix-8), 215, anio,{font:"arial",fontSize:10,fill:'white'});
		j+=pix;
		y=parseInt(y+1);
		yA=y.toString();
		year=yA.substring(2,4);
		anio=""+year;
	}
	
	
}

function addJob(svg,g1,g2,anio,mes,aniof,mesf,empresa,puesto,trabajoActual,idExp){

	var g3=svg.group(g2,"lineas");
    var yw=$("#"+anio).attr("width");
    var mw=parseInt(yw/12);
    var miw=parseInt(mw*mes);
    var xi=parseInt($("#"+anio).attr("x"));
    var x=parseInt(xi+miw);
    var xfi=parseInt($("#"+aniof).attr("x"));
    var mwf=parseInt(mesf*mw);
    var xf=parseInt(xfi+mwf);
    var nexp=$("#exp").val();
    var empalme=0;
    var last=$("#last").val();
    if(last!="primero"){
       empalme=findJobOver(x,xf);
 
    }
    var idexp=idExp+"_exp";
    var colorfill=job_colors(nexp);
    var y=170-(empalme*20);
    if(trabajoActual=="si"){
    	 width=2000;
    }else if(mes==mesf && anio==aniof){
    	width=10;
    }else{
    	width=parseInt(xf-x);
    }
    var height=50+(empalme*20);
    
    var today=new Date();
    var anioHoy=today.getFullYear();
    var fechaN=$("#nac_span").text();
	var birth=fechaN.split("/");
	var byear=parseInt(birth[2])+10;
    
	var difYear=anioHoy-byear;
	var middleYear=parseInt(anioHoy-(difYear/2));
    var textoX=parseInt(x)+parseInt(20);
	var textoY1=y-20;
	var textoY2=y-10;
	var lineaId=idexp+"_linea";
	empresa=empresa.toUpperCase();
    puesto=puesto.toUpperCase();
    svg.rect(g2,x,y,width,height,10,10,{id:idexp,fill:colorfill,class:"jobgraph",stroke:'Silver',strokeWidth:2});
    
    /*pa acomodar los textos y las rayas                                            */
    
    if(nexp<=0){
    	//alert("condicion 0");
    	var extension_empresa_actual=parseInt(textoX)+parseInt(empresa.length)*8;
		var extension_puesto_actual=parseInt(textoX)+parseInt(puesto.length)*7;
		var circleX=textoX-5;
		
		if((extension_empresa_actual>1010)||(extension_puesto_actual>1010)){
			
			if(extension_empresa_actual>extension_puesto_actual){textoX=textoX-(parseInt(empresa.length)*7.5);
			}else {
				textoX=textoX-(parseInt(puesto.length)*5.5);
			}
			
		}
    	 svg.text(g1,textoX,textoY1,empresa,{id:nexp+"_empresa",class:"empresa_titulo",font:"arial",fontSize:11,fill:'Black',fontWeight:'bold'});
    	 svg.text(g1,textoX,textoY2,puesto,{id:nexp+"_puesto",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
    	 svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idexp+"_circle"});
    	 svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    	 
    }else{
    	
    	var extension_empresa_actual=parseInt(textoX)+parseInt(empresa.length)*8;
		var extension_puesto_actual=parseInt(textoX)+parseInt(puesto.length)*7;
		var circleX=textoX-5;
		
		if((extension_empresa_actual>1010)||(extension_puesto_actual>1010)){
			textoX=textoX-(parseInt(empresa.length)*7.5);
		}
    	
    	for(var ind=0;ind<nexp;ind++){
    		var cadena_empresa=$("#"+ind+"_empresa").text();
    		var cadena_puesto=$("#"+ind+"_puesto").text();
    		var xempresa=$("#"+ind+"_empresa").attr("x");
    		var yempresa=$("#"+ind+"_empresa").attr("y");
    		var xpuesto=$("#"+ind+"_puesto").attr("x");
    		var ypuesto=$("#"+ind+"_puesto").attr("y");
    		var altura=parseInt(yempresa)+30;
    		var extension_empresa=parseInt(xempresa)+parseInt(cadena_empresa.length)*8;
    		var extension_puesto=parseInt(xpuesto)+parseInt(cadena_puesto.length)*7;
    		
    		
    		
    		if(((textoX>=xempresa)&&(textoX<=extension_empresa)||(textoX>=xpuesto)&&(textoX<=extension_puesto))&&((textoY1>=yempresa)&&(textoY1<=altura))){
    			//alert("condicion 1");
    			if(extension_empresa>width){
    				textoY1=textoY1-20;
    				textoY2=textoY2-20;
    			}else{
    				if(extension_empresa>=extension_puesto){textoX=parseInt(textoX)+parseInt(extension_empresa)+parseInt(5);}
    				else {textoX=parseInt(textoX)+parseInt(extension_puesto)+parseInt(5);}
    				
    			}
    			
    			
    		}else if(((extension_empresa_actual>=xempresa)||(extension_puesto_actual>=xpuesto)&&(extension_puesto_actual<=extension_puesto))&&((textoY1>=yempresa)&&(textoY1<=altura))){
    			//alert("condicion 2");
    			textoY1=textoY1-20;
				textoY2=textoY2-20;
    		}
    	}
       
    	svg.text(g1,textoX,textoY1 ,empresa,{id:nexp+"_empresa",class:"empresa_titulo",font:"arial",fontSize:11,fill:'Black',fontWeight:'bold'});
        svg.text(g1,textoX ,textoY2,puesto,{id:nexp+"_puesto",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
        svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idexp+"_circle"});
        svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
      
    var e=$("#"+idexp).attr("id");
    var primero=document.getElementById(e);
    var segundo=document.getElementById(last);
    var h=$("#"+last).attr("height");
    if(last!="primero"){
    	
    		g2.insertBefore(primero,segundo);
    	
    }
    
    var numexp=parseInt(nexp);
    var exp=parseInt(numexp+1);
    $("#exp").val(exp);
    $("#last").val(idexp);
    
}

function findJobOver(x,xf){
	var empalme=0;
	$("rect.jobgraph").each(function(){
		var xgi=parseInt($(this).attr("x"));
		var width=parseInt($(this).attr("width"));
		var xgf=parseInt(xgi+width);
		if(((x<=xgi)&&(xf<=xgi))||((x>=xgf)&&(xf>=xgf))){
			empalme=empalme+0;
		}else{
			
			empalme=empalme+1;
		}
		
	});
	return empalme;
}

function insertar_titulo(){
	
	
	
}

function graphOrdering(svg,g1,g2){
	
}

function findSchoolOver(x,xf){
	var empalme=0;
	$("rect.schoolgraph").each(function(){
		var xgi=parseInt($(this).attr("x"));
		var width=parseInt($(this).attr("width"));
		var xgf=parseInt(xgi+width);
		if(((x<xgi)&&(xf<=xgi))||((x>xgi)&&(xf>xgf))){
			empalme=0;
		}else{
			empalme=empalme+1;
		}
	});
	return empalme;
}




function job_colors(i){
	var colors=["crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey","crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey"];
	return colors[i];
}

function school_colors(i){
	var colors=["DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey","crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey"];
	return colors[i];
	
}

function addSchool(svg,g1,g2,anio,mes,aniof,mesf,nivelAcademico,instituto,estudioActual,idFor){
	var g3=svg.group(g2,"lineas");
    var yw=$("#"+anio).attr("width");
    var mw=parseInt(yw/12);
    var miw=parseInt(mw*mes);
  
    var xi=parseInt($("#"+anio).attr("x"));
    var x=parseInt(xi+miw);
    
    var xfi=parseInt($("#"+aniof).attr("x"));
    var mwf=parseInt(mesf*mw);
    var xf=parseInt(xfi+mwf);
    
    if(estudioActual=="si"){
   	 width=2000;
   }else{
   	width=parseInt(xf-x);
   }
    
    var nedu=$("#edu").val();
    var empalme=0;
    var last=$("#lastskull").val();
    if(last!="primero"){
       empalme=findSchoolOver(x,xf);
    }
    var xlinea=parseInt(x+(empalme*20));
    var lineaId=nedu+"_linea";
   
    var idedu=idFor+"_edu";
    var colorfill=school_colors(nedu);
    var y=200;
    var height=50+(empalme*20);
    
    var textoX=parseInt(x)+parseInt(20);
	var textoY1=(y+20)+parseInt(height);
	var textoY2=(y+10)+parseInt(height);
	var lineaId=idedu+"_linea";
    
    svg.rect(g2,x,y,width,height,10,10,{id:idedu,fill:colorfill,class:"schoolgraph",stroke:'Silver',strokeWidth:2});
    
 /*pa acomodar los textos y las rayas                                            */
    
    if(nedu<=0){
    	
    	var extension_instituto_actual=parseInt(textoX)+parseInt(instituto.length)*7.5;
		var extension_nivel_actual=parseInt(textoX)+parseInt(nivelAcademico.length)*6;
		var circleX=textoX-5;
		
		
		if((extension_instituto_actual>1110)||(extension_nivel_actual>1110)){
		    
			textoX=textoX-(parseInt(instituto.length)*7.5);
			
		}
    	
    	 svg.text(g1,textoX,textoY1,instituto,{id:nedu+"_instituto",class:"empresa_titulo",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
    	 svg.text(g1,textoX,textoY2,nivelAcademico,{id:nedu+"_nivelAcademico",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
    	 svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idedu+"_circle"});
         svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    	 
    }else{
    	
    	var extension_instituto_actual=parseInt(textoX)+parseInt(instituto.length)*7.5;
		var extension_nivel_actual=parseInt(textoX)+parseInt(nivelAcademico.length)*6;
		var circleX=textoX-5;
		
		if((extension_instituto_actual>1110)||(extension_nivel_actual>1110)){
		   
			textoX=textoX-(parseInt(instituto.length)*7.5);
			
		}
		
    	
    	
    	for(var ind=0;ind<nedu;ind++){
    		var cadena_instituto=$("#"+ind+"_instituto").text();
    		var cadena_nivelAcademico=$("#"+ind+"_nivelAcademico").text();
    		var xinstituto=$("#"+ind+"_instituto").attr("x");
    		var yinstituto=$("#"+ind+"_nivelAcademico").attr("y");
    		var xnivelAcademico=$("#"+ind+"_puesto").attr("x");
    		var ynivelAcademico=$("#"+ind+"_puesto").attr("y");
    		var altura=parseInt(yinstituto)+30;
    		var extension_instituto=parseInt(xinstituto)+parseInt(cadena_instituto.length)*7.5;
    		var extension_nivel=parseInt(xnivelAcademico)+parseInt(cadena_nivelAcademico.length)*6;
    		
    		
    		if(((textoX>xinstituto)&&(textoX<extension_instituto)||(textoX>xnivelAcademico)&&(textoX<extension_nivel))&&((textoY1>=ynivelAcademico)&&(textoY1<=altura))){
    			if(extension_instituto>width){
    				textoY1=parseInt(textoY1)+parseInt(20);
    				textoY2=parseInt(textoY2)+parseInt(20);
    			}else{
    				if(extension_instituto>extension_nivel){textoX=parseInt(textoX)+parseInt(extension_instituto)+parseInt(5);}
    				else {textoX=parseInt(textoX)+parseInt(extension_instituto)+parseInt(5);}
    				
    			}
    			
    			
    		}else if(((extension_instituto_actual>xinstituto)||(extension_nivel_actual>xnivelAcademico)&&(extension_nivel_actual<extension_nivel))&&((textoY1>=yinstituto)&&(textoY1<=altura))){
    			textoY1=parseInt(textoY1)+parseInt(20);
				textoY2=parseInt(textoY2)+parseInt(20);
    		}
    	}

    	svg.text(g1,textoX,textoY1 ,instituto,{id:nedu+"_instituto",class:"empresa_titulo",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
        svg.text(g1,textoX ,textoY2,nivelAcademico,{id:nedu+"_nivelAcademico",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
        
        svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idedu+"_circle"});
        svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    

    var e=$("#"+idedu).attr("id");
    var primero=document.getElementById(e);
    var segundo=document.getElementById(last);
    if(last!="primero"){
    	g2.insertBefore(primero,segundo);
    }
    var numedu=parseInt(nedu);
    var edu=parseInt(numedu+1);
    $("#edu").val(edu);
    $("#lastskull").val(idedu);
	
}
////////////////////////////post datos///////////////////////////////////////////////////////////////////////////////////////////////
function JsonAndAjaxPersonal(svg,g2,g1){
        
	    var idUsuario=$("#id_usuario").val();
		var sexo=$("#sexo").val();
		var estadoCivil=$("#estadoCivil").val();
		var apellidoMaterno=$("#apellidoMaterno").val();
		var apellidoPaterno=$("#apellidoPaterno").val();
		var nombre=$("#nombre").val();

		var dia=$("#dia").val();
		var mes=$("#mes").val();
		var anio=$("#anio").val();
		
		if(dia=="Dia"||mes=="Mes"||anio=="AÒo"){
        var fechaN=$("#nac_span").text();
    	var birth=fechaN.split("/");
    	dia=birth[0];
    	mes=birth[1];
    	anio=parseInt(birth[2]);
    	var fechaNac=dia+"/"+mes+"/"+anio;
        }else{
        	var fechaNac=dia+"/"+mes+"/"+anio;	
        	
        }
		
		var rfc=$("#rfc").val();
		var homoclave=$("#homoclave").val();
        var curp=$("#curp").val();
		
        dibujar_recta(svg,g2,g1);
		if(sexo==""||estadoCivil==""||apellidoMaterno==""||apellidoPaterno==""||nombre==""||rfc==""||estadoCivil==""){
			alert("Por favor llena todos los campos de este apartado");
		}else if (verificar_caracteres(nombre)||verificar_caracteres(apellidoPaterno)||verificar_caracteres(apellidoMaterno)||verificar_caracteres(rfc)||verificar_caracteres(curp)){
			alert("Caracter no valido, solo se admiten !°ø?#@ -_ como caracteres especiales");
	
		}else{
			
			if(homoclave=="" || homoclave==null){
			$.post("/BolsaDeTrabajoIusacell/json/ActualizarDatosPersonales", { idUsuario:idUsuario,sexo:sexo,estadoCivil:estadoCivil,apellidoPaterno:apellidoPaterno,apellidoMaterno:apellidoMaterno,nombre:nombre,dia:dia,mes:mes,anio:anio,rfc:rfc,homoclave:homoclave,curp:curp},
					  function(jsonData) {
				//ObtenerPorcentaje();
				document.location.href="/BolsaDeTrabajoIusacell/perfil";
					  }
					 );
			}else if(verificar_caracteres(homoclave)){
				alert("Caracter no valido, solo se admiten !°ø?#@ -_ como caracteres especiales");
			}
			else{
				$.post("/BolsaDeTrabajoIusacell/json/ActualizarDatosPersonales", { idUsuario:idUsuario,sexo:sexo,estadoCivil:estadoCivil,apellidoPaterno:apellidoPaterno,apellidoMaterno:apellidoMaterno,nombre:nombre,dia:dia,mes:mes,anio:anio,rfc:rfc,homoclave:homoclave,curp:curp},
						  function(jsonData) {
					//ObtenerPorcentaje();
					document.location.href="/BolsaDeTrabajoIusacell/perfil";
						  }
						 );
			}
		}
}

function JsonAndAjaxUbicacion(){
	var idUsuario=$("#id_usuario").val();
	var calleYNumero=$("#calleNumero").val();
    var colonia=$("#colonia").val();
    var ciudadPoblado=$("#ciudadPoblado").val();
    var nacionalidad=$("#nacionalidad").val();	
    var municipioODelegacion=$("#municipioDelegacion").val();
    var estadoPais=$("#estadoPais").val();
    var cp=$("#cp").val();
    var telefono=$("#telefono").val();
    var telefono_extra=$("#telefono_extra").val();
    $("#calle_span").html(calleYNumero);
    $("#col_span").html(colonia);
    $("#ciudad_span").html(ciudadPoblado);
    $("#municipio_span").html(municipioODelegacion);
    $("#cp_span").html(cp);
    
    
    
    if(nacionalidad == "MÈxico" || nacionalidad == "MEXICO" || nacionalidad == "mexico" || nacionalidad=="Mexico"){
    	 if(calleYNumero==""||colonia==""||ciudadPoblado==""||municipioODelegacion==""||estadoPais==""||nacionalidad==""||cp==""||telefono==""){
    			alert("Por favor llena todos los campos de este apartado");
    		}else if(verificar_caracteres(calleYNumero)||verificar_caracteres(colonia)||verificar_caracteres(cp)||verificar_caracteres(telefono)){
    			
    			alert("Caracter no valido, solo se admiten !°ø?#@ -_ como caracteres especiales");
    			$("#calleNumero").val("");
    			$("#colonia").val("");
    			$("#cp").val("");

    		}else{
    			
    			$.post("/BolsaDeTrabajoIusacell/json/ActualizarUbicacion", { idUsuario:idUsuario,calleYNumero:calleYNumero,colonia:colonia,ciudadPoblado:ciudadPoblado,municipioODelegacion:municipioODelegacion,estadoPais:estadoPais,nacionalidad:nacionalidad,cp:cp,telefono:telefono,telefono_extra:telefono_extra},
    					  function(jsonData) {
    				//ObtenerPorcentaje();
    				document.location.href="/BolsaDeTrabajoIusacell/perfil";
    					  }
    					 );
    			
    		}
    	}else{
    		
    		municipioODelegacion="EXTRANJERO";
    		estadoPais="EXTRANJERO";
    		 if(calleYNumero==""||colonia==""||ciudadPoblado==""||municipioODelegacion==""||estadoPais==""||nacionalidad==""||cp==""||telefono==""){
     			alert("Por favor llena todos los campos de este apartado");
     		}else if(verificar_caracteres(calleYNumero)||verificar_caracteres(colonia)||verificar_caracteres(cp)||verificar_caracteres(telefono)){
     			
     			alert("Caracter no valido, solo se admiten !°ø?#@ -_ como caracteres especiales");
     			$("#calleNumero").val("");
     			$("#colonia").val("");
     			$("#cp").val("");

     		}else{
     			
     			$.post("/BolsaDeTrabajoIusacell/json/ActualizarUbicacion", { idUsuario:idUsuario,calleYNumero:calleYNumero,colonia:colonia,ciudadPoblado:ciudadPoblado,municipioODelegacion:municipioODelegacion,estadoPais:estadoPais,nacionalidad:nacionalidad,cp:cp,telefono:telefono,telefono_extra:telefono_extra},
     					  function(jsonData) {
     				//ObtenerPorcentaje();
     				document.location.href="/BolsaDeTrabajoIusacell/perfil";
     					  }
     					 );
     			
     		}
    	}
    
   
    
}
/////////////////////json graficas//////////////////////////////////////////////////
function jsonAndAjaxExperiencia(svg,g1,g2){
	  var parametro="guardar";
	  var fechaN=$("#nac_span").text();
	  var birth=fechaN.split("/");
	  var bday=birth[0];
	  var bmonth=birth[1];
	  var byear=parseInt(birth[2])+parseInt(10);
	  var nombreEmpresa=$("#nombreEmpresa").val();
	  var puesto=$("#puesto").val();
	  var diaInicioE="1";
	  var mesInicioE=$("#mesInicioE").val();
	  var anioInicioE=$("#anioInicioE").val();
	  var fechaInicio=diaInicioE+"/"+mesInicioE+"/"+anioInicioE;
	  var diaFinE="1";
	  var mesFinE=$("#mesFinE").val();
	  var anioFinE=$("#anioFinE").val();
	  var fechaFin=diaFinE+"/"+mesFinE+"/"+anioFinE;
	  var sueldoEmpresa=$("#sueldoEmpresa").val();
	  var funcionesEmpresa=$("#funcionesEmpresa").val();
	  var trabajoActual="no";
	  if(document.getElementById("trabajoActual").checked == true){
		  trabajoActual="si";
		  fechaFin="12/12/9999";
	  }else{
		  trabajoActual="no";
	  }
	  
	  if(anioFinE<anioInicioE){
		  alert("La fecha final no puede ser menor a la inicial");
	  }else if(nombreEmpresa==""||puesto==""||sueldoEmpresa==""||funcionesEmpresa==""){
		  alert("faltan datos por llenar en este apartado");
	  }else if(byear>anioInicioE){
		  alert("No puedes ingresar datos antes de su fecha de Nacimiento o del rango de la grafica");
		  
	  }else if( verificar_caracteres(nombreEmpresa)||verificar_caracteres(puesto)){
		  alert("Caracter no valido, solo se admiten !°ø?-_ como caracteres especiales");
		  $("#nombreEmpresa").val("");
		  $("#puesto").val("");
	  }else{

	$.getJSON('json/ActualizarExperiencia' ,
			  {    
		         parametro:parametro,
		         nombreEmpresa:nombreEmpresa,
		         puesto:puesto,
		         fechaInicio:fechaInicio,
		         fechaFin:fechaFin,
		         sueldoEmpresa:sueldoEmpresa,
		         funcionesEmpresa:funcionesEmpresa,
		         trabajoActual:trabajoActual
			  },
			  function() {
					//ObtenerPorcentaje();
				    $("#dialog_experiencia").dialog("close");
					document.location.href="/BolsaDeTrabajoIusacell/perfil";
				 
			  }
			 );}
	
}

function modificarExperiencia(parametro){
	  var id_exp=$("#idExp").val();
	  if(parametro=="modificar"){
		  var fechaN=$("#nac_span").text();
		  var birth=fechaN.split("/");
		  var bday=birth[0];
		  var bmonth=birth[1];
		  var byear=parseInt(birth[2])+parseInt(10);
		  var nombreEmpresa=$("#nombreEmpresaM").val();
		  var puesto=$("#puestoM").val();
		  var diaInicioE="1";
		  var mesInicioE=$("#mesInicioEM").val();
		  var anioInicioE=$("#anioInicioEM").val();
		  var fechaInicio=diaInicioE+"/"+mesInicioE+"/"+anioInicioE;
		  var diaFinE="1";
		  var mesFinE=$("#mesFinEM").val();
		  var anioFinE=$("#anioFinEM").val();
		  var fechaFin=diaFinE+"/"+mesFinE+"/"+anioFinE;
		  var sueldoEmpresa=$("#sueldoEmpresaM").val();
		  var funcionesEmpresa=$("#funcionesEmpresaM").val();
		  var trabajoActual="no";
		  if(document.getElementById("trabajoActualM").checked == true){
			  trabajoActual="si";
			  fechaFin="12/12/9999";
		  }else{
			  trabajoActual="no";
		  }
		  
		  if(anioFinE<anioInicioE){
			  alert("La fecha final no puede ser menor a la inicial");
		  }else if(nombreEmpresa==""||puesto==""||sueldoEmpresa==""||funcionesEmpresa==""){
			  alert("faltan datos por llenar en este apartado");
		  }else if(byear>anioInicioE){
			  alert("No puedes ingresar datos antes de su fecha de Nacimiento o del rango de la grafica");
			  
		  }else if( verificar_caracteres(nombreEmpresa)||verificar_caracteres(puesto)){
			  alert("Caracter no valido, solo se admiten !°ø?-_ como caracteres especiales");
			  $("#nombreEmpresa").val("");
			  $("#puesto").val("");
		  }else{
		
		
		$.getJSON('json/ActualizarExperiencia' ,
				  {    
			         parametro:parametro,
			         id_exp:id_exp,
			         nombreEmpresa:nombreEmpresa,
			         puesto:puesto,
			         fechaInicio:fechaInicio,
			         fechaFin:fechaFin,
			         sueldoEmpresa:sueldoEmpresa,
			         funcionesEmpresa:funcionesEmpresa,
			         trabajoActual:trabajoActual
				  },
				  function() {
						//ObtenerPorcentaje();
						document.location.href="/BolsaDeTrabajoIusacell/perfil";
					 
				  }
				 );}
		  
		  
	  }else{
		  var nombreEmpresa="";
		  var puesto="";
		  var fechaInicio="12/12/9999";
		  var fechaFin="12/12/9999";
		  var sueldoEmpresa="99999";
		  var funcionesEmpresa="asdfg";
		  var trabajoActual="no";
		  if(document.getElementById("trabajoActualM").checked == true){
			  trabajoActual="si";
			  fechaFin="12/12/9999";
		  }else{
			  trabajoActual="no";
		  }
		  if(anioFinE<anioInicioE){
			  alert("La fecha final no puede ser menor a la inicial");
		  }else{
		  

		$.getJSON('json/ActualizarExperiencia' ,
				  {    
			         parametro:parametro,
			         id_exp:id_exp,
			         nombreEmpresa:nombreEmpresa,
			         puesto:puesto,
			         fechaInicio:fechaInicio,
			         fechaFin:fechaFin,
			         sueldoEmpresa:sueldoEmpresa,
			         funcionesEmpresa:funcionesEmpresa,
			         trabajoActual:trabajoActual
				  },
				  function() {
						//ObtenerPorcentaje();
						document.location.href="/BolsaDeTrabajoIusacell/perfil";
					 
				  }
				 );}
		  
	  }
	
	
}

function jsonAndAjaxEscolaridad(svg,g1,g2){
      var parametro="guardar";
      var fechaN=$("#nac_span").text();
	  var birth=fechaN.split("/");
	  var bday=birth[0];
	  var bmonth=birth[1];
	  var byear=parseInt(birth[2])+parseInt(10);
	  var nivelAcademico=$("#nivelAcademico").val();
	  var areaEspecialidad;
	  
	  if((parseInt(nivelAcademico))>3){
		  areaEspecialidad=$("#area_especialidad").val();
		  
	  }else{
		  areaEspecialidad="No";
	  }
	  var institucion=$("#institucion").val();
	  var pais=$("#paisInstituto").val();
	  var estado=$("#estadoInstituto").val();
	  var diaInicioF="1";
	  var mesInicioF=$("#mesInicioF").val();
	  var anioInicioF=$("#anioInicioF").val();
	  var lapsoInicio=diaInicioF+"/"+mesInicioF+"/"+anioInicioF;
	  var diaFinF="1";
	  var mesFinF=$("#mesFinF").val();
	  var anioFinF=$("#anioFinF").val();
	  var lapsoFin=diaFinF+"/"+mesFinF+"/"+anioFinF;
	  var status=$("#status_edu").val();
	  var estudioActual="no";
	  if(document.getElementById("estudioActual").checked == true){
		  estudioActual="si";
		  lapsoFin="12/12/9999";
	  }else{
		  estudioActual="no";
	  }
	  
	  
	  if(anioFinF<anioInicioF){
		  alert("La fecha final no puede ser menor a la inicial");
	  }else if(institucion==""||estado==""){
		  alert("faltan datos por llenar en este apartado");
	  }else if(byear>anioInicioF){
		  alert("No puedes ingresar datos antes de su fecha de Nacimiento o del rango de la grafica");
		  
	  }else if(verificar_caracteres(institucion)){
		  alert("Caracter no valido, solo se admiten !°ø?-_ como caracteres especiales");
		  $("#institucion").val("");
		  
	  }else{
		  
		  $.getJSON('json/ActualizarFormacionAcademica' ,
				  {  parametro:parametro,  
			         nivelAcademico:nivelAcademico,
			         institucion:institucion,
			         pais:pais,
			         estado:estado,
			         lapsoInicio:lapsoInicio,
			         lapsoFin:lapsoFin,
			         status:status,
			         estudioActual:estudioActual,
			         areaEspecialidad:areaEspecialidad
				  },
				  function() {
						//ObtenerPorcentaje();
					  $("#dialog_escolaridad").dialog('close');
					  document.location.href="/BolsaDeTrabajoIusacell/perfil";
					 
				  }
				  );
		  
		  
	  }
	  
	  
			 
	
}

function modificarEducacion(parametro){
	  var  idFormacion=$("#idForm").val();
	  
	  if(parametro=="modificar"){
		  var fechaN=$("#nac_span").text();
		  var birth=fechaN.split("/");
		  var bday=birth[0];
		  var bmonth=birth[1];
		  var byear=parseInt(birth[2])+parseInt(10);
		  var nivelAcademico=$("#nivelAcademicoM").val();
		  var institucion=$("#institucionM").val();
		  var areaEspecialidad;
		  if(nivelAcademico>3){
			  
			  areaEspecialidad=$("#area_especialidad").val();
			  
		  }else{
			  areaEspecialidad="No";
		  }
		  var pais=$("#paisInstitutoM").val();
		  var estado=$("#estadoInstitutoM").val();
		  var diaInicioF="1";
		  var mesInicioF=$("#mesInicioFM").val();
		  var anioInicioF=$("#anioInicioFM").val();
		  var lapsoInicio=diaInicioF+"/"+mesInicioF+"/"+anioInicioF;
		  var diaFinF="1";
		  var mesFinF=$("#mesFinFM").val();
		  var anioFinF=$("#anioFinFM").val();
		  var lapsoFin=diaFinF+"/"+mesFinF+"/"+anioFinF;
		  var status=$("#statusM").val();
		  var estudioActual="no";
		  if(document.getElementById("estudioActualM").checked == true){
			  estudioActual="si";
			  lapsoFin="12/12/9999";
		  }else{
			  estudioActual="no";
		  }
	  
		  if(anioFinF<anioInicioF){
			  alert("La fecha final no puede ser menor a la inicial");
		  }else if(institucion==""||estado==""){
			  alert("faltan datos por llenar en este apartado");
		  }else if(byear>anioInicioF){
			  alert("No puedes ingresar datos antes de su fecha de Nacimiento o del rango de la grafica");
			  
		  }else if(verificar_caracteres(institucion)){
			  alert("Caracter no valido, solo se admiten !°ø?-_ como caracteres especiales");
			  $("#institucion").val("");
			  
		  }else{
			  
			  $.getJSON('json/ActualizarFormacionAcademica' ,
					  {  idFormacion:idFormacion,  
				         parametro:parametro,
				         nivelAcademico:nivelAcademico,
				         institucion:institucion,
				         pais:pais,
				         estado:estado,
				         lapsoInicio:lapsoInicio,
				         lapsoFin:lapsoFin,
				         status:status,
				         estudioActual:estudioActual,
				         areaEspecialidad:areaEspecialidad
					  },
					  function() {
							//ObtenerPorcentaje();
						  $("#dialog_escolaridad").dialog('close');
						  document.location.href="/BolsaDeTrabajoIusacell/perfil";
						 
					  }
					  ); 
			  
		  }
		  
		  
	  }else{
		  
		  var nivelAcademico="";
		  var institucion="";
		  var pais="";
		  var estado="";
		  var lapsoInicio="9/9/9999";
		  var lapsoFin="9/9/9999";
		  var status=$("#statusM").val();
		  var estudioActual="no";
		  if(document.getElementById("estudioActualM").checked == true){
			  estudioActual="si";
			  
		  }else{
			  estudioActual="no";
		  }
		
		  $.getJSON('json/ActualizarFormacionAcademica' ,
				  {  idFormacion:idFormacion,  
			         parametro:parametro,
			         nivelAcademico:nivelAcademico,
			         institucion:institucion,
			         pais:pais,
			         estado:estado,
			         lapsoInicio:lapsoInicio,
			         lapsoFin:lapsoFin,
			         status:status,
			         estudioActual:estudioActual
				  },
				  function() {
						//ObtenerPorcentaje();
					  $("#dialog_escolaridad").dialog('close');
					  document.location.href="/BolsaDeTrabajoIusacell/perfil";
					 
				  }
				  );
		  
		  
	  }
	  
	  
	 
	
	
}



function identidadImpacto(iden){
	var seleccionado=$("#id_impacto_seleccionado").val();
	var valor=$("#"+iden+"_check").val();
	if(seleccionado!="ninguno"){
		$("#"+seleccionado).html("");
	}
	$("#"+iden).html("X");
	$("#id_impacto_seleccionado").val(iden);
	$("#id_impacto_valor").val(valor);
}

function ajaxImpacto(){
	var impacto=$("#id_impacto_valor").val();
	var categoria="Persuasion";
	if(impacto!="ninguno"){guardarIdentidad(impacto,categoria);
	}else{
		alert("Por Favor Seleccione una identidad");
	}

	
}

function identidadInterrelacion(iden){
	var seleccionado=$("#id_interrelacion_seleccionado").val();
	var valor=$("#"+iden+"_check").val();
	if(seleccionado!="ninguno"){
		$("#"+seleccionado).html("");
	}
	$("#"+iden).html("X");
	$("#id_interrelacion_seleccionado").val(iden);
	$("#id_interrelacion_valor").val(valor);
	
}
 

function ajaxInterrelacion(){
	var interrelacion=$("#id_interrelacion_valor").val();
	var categoria="Constancia";
	if(interrelacion!="ninguno"){guardarIdentidad(interrelacion,categoria);
	}else{
		alert("Por Favor Seleccione una identidad");
	}

}


function identidadLaboral(iden){
	var seleccionado=$("#id_laboral_seleccionado").val();
	var valor=$("#"+iden+"_check").val();
	if(seleccionado!="ninguno"){
		$("#"+seleccionado).html("");
	}
	$("#"+iden).html("X");
	$("#id_laboral_seleccionado").val(iden);
	$("#id_laboral_valor").val(valor);
	
}

function ajaxLaboral(){
	var laboral=$("#id_laboral_valor").val();
	var categoria="Apego";
	if(interrelacion!="ninguno"){guardarIdentidad(laboral,categoria);
	}else{
		alert("Por Favor Seleccione una identidad");
	}

}



function identidadEmpuje(iden){
	var seleccionado=$("#id_empuje_seleccionado").val();
	var valor=$("#"+iden+"_check").val();
	if(seleccionado!="ninguno"){
		$("#"+seleccionado).html("");
	}
	$("#"+iden).html("X");
	$("#id_empuje_seleccionado").val(iden);
	$("#id_empuje_valor").val(valor);
	
}

function ajaxEmpuje(){
	var empuje=$("#id_empuje_valor").val();
	var categoria="Empuje";
	var listo;
	if(interrelacion!="ninguno"){listo=guardarIdentidad(empuje,categoria);
	}else{
		alert("Por Favor Seleccione una identidad");
	}
	return listo;
}


function identidadPensamiento(iden){
	var seleccionado=$("#id_pensamiento_seleccionado").val();
	var valor=$("#"+iden+"_check").val();
	if(seleccionado!="ninguno"){
		$("#"+seleccionado).html("");
	}
	$("#"+iden).html("X");
	$("#id_pensamiento_seleccionado").val(iden);
	$("#id_pensamiento_valor").val(valor);
	
}

function ajaxPensamiento(){
	var pensamiento=$("#id_pensamiento_valor").val();
	var categoria="Pensamiento";
	if(interrelacion!="ninguno"){guardarIdentidad(pensamiento,categoria);
	}else{
		alert("Por Favor Seleccione una identidad");
	}
	
}

function guardarPersonalidad(){
	
	ajaxImpacto();
    ajaxInterrelacion();
	ajaxLaboral();
    ajaxEmpuje();
	
	
}


function guardarIdentidad(identidad,categoria){
	$.post("/BolsaDeTrabajoIusacell/json/GuardarIdentidad", {identidad:identidad,categoria:categoria},
			  function() {
		obtenerPersonalidad(categoria);
	
			  });

	
}


function guardarIdiomas(){
	var parametro=$("#parametro_idioma").val();
	var idioma=$("#idioma").val();
	var idIdioma=$("#id_idioma").val();
	var dominio=$("#dominio").val();
	
	
	$.post("/BolsaDeTrabajoIusacell/json/NumeroIdiomas", {},
			  function(jsonData) {
		       
		       var numeroIdiomas=jsonData.items[0].cuenta;
		       
		       if(numeroIdiomas<5){

		    	   $.post("/BolsaDeTrabajoIusacell/json/IdiomaRepetido", {idioma:idioma},
		    				  function(jsonData) {
		    		   var result=jsonData.items[0].resultado;
		 			  if(result=="repetido"){
		 				  alert("Ya se ha seleccionado este idioma");
		 			  }else{
		 				  
		 				 $.post("/BolsaDeTrabajoIusacell/json/ActualizarIdiomas", {parametro:parametro,idioma:idioma,dominio:dominio,idIdioma:idIdioma},
			    				  function(jsonData) {
			    			        document.location.href="/BolsaDeTrabajoIusacell/perfil";      
			    				  });
		 				  
		 				  
		 			  }      
		    				  });  
		    	   
		    	   
		       }else{
		    	   alert("Solo puedes guardar 5 idiomas maximo, si quieres agregar mas idiomas elimina uno o modifica algun existente");
		    	   
		       }
		
		
		
		
		
		
			  });
	
	
	
	
	
	
	
}

function modificarIdiomas(){
	
	var parametro="modificar";
	var idioma=$("#idiomaM").val();
	var idIdioma=$("#id_idiomaM").val();
	var dominio=$("#dominioM").val();
	
	
	$.post("/BolsaDeTrabajoIusacell/json/NumeroIdiomas", {},
			  function(jsonData) {
		       
		       var numeroIdiomas=jsonData.items[0].cuenta;
		       
		     //  if(numeroIdiomas<5){
		       $.post("/BolsaDeTrabajoIusacell/json/IdiomaRepetido", {idioma:idioma},
	    				  function(jsonData) {
	    		   var result=jsonData.items[0].resultado;
	 			  if(result=="repetido"){
	 				  alert("Ya se ha seleccionado este idioma");
	 			  }else{
		    	   $.post("/BolsaDeTrabajoIusacell/json/ActualizarIdiomas", {parametro:parametro,idioma:idioma,dominio:dominio,idIdioma:idIdioma},
		    				  function(jsonData) {
		    			        document.location.href="/BolsaDeTrabajoIusacell/perfil";      
		    				  });
		    	   
		    	   
	 			 }      
				  });  
		      // }else{
		    	//   alert("Solo puedes guardar 5 idiomas maximo, si quieres agregar mas idiomas elimina uno o modifica algun existente");
		    	   
		    //   }
		
		
		
		
		
		
			  });
	
	
	
	
	
	
	
}

function eliminarIdiomas(){
	var parametro="eliminar";
	var idioma=$("#idiomaM").val();
	var idIdioma=$("#id_idiomaM").val();
	var dominio=$("#dominioM").val();
	
	$("#"+idIdioma+"_row").hide();
	
	$.post("/BolsaDeTrabajoIusacell/json/ActualizarIdiomas", {parametro:parametro,idioma:idioma,dominio:dominio,idIdioma:idIdioma},
			  function(jsonData) {
		ObtenerPorcentaje();
			  });
	
}



function obtenerListaSoftware(categoria){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerSoftware", {categoria:categoria},
			  function(jsonData) {
				var i=0;
				
		       for(i=0;i<jsonData.items.length;i++){
		    	   var option="<option value='"+jsonData.items[i].id_software+"'>"+jsonData.items[i].nombre+"</option>";
		    	   $("#softwareList").append(option);
		       }
		   	$("#softwareList").show();
			  });
	
}

function obtenerListaSoftwareM(categoria){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerSoftware", {categoria:categoria},
			  function(jsonData) {
				var i=0;
				
		       for(i=0;i<jsonData.items.length;i++){
		    	   var option="<option value='"+jsonData.items[i].id_software+"'>"+jsonData.items[i].nombre+"</option>";
		    	   $("#softwareListM").append(option);
		       }
		   	//$("#softwareList").show();
			  });
	
}


function guardarSoftware(){
	var idAux;
	var parametro=$("#sw_parametro").val();
	var idSoftware=$("#softwareList").val();
	var dominio=$("#dominioSw").val();
	
	if(parametro=="crear"){
		idAux=0;
	}else{
		idAux=$("#id_sw").val();
	}
	
	if($("div#swBody > div.swrow").length<10){
	
	$.post("/BolsaDeTrabajoIusacell/json/SoftwareRepetido", {idSoftware:idSoftware},
			  function(jsonData) {

			  var result=jsonData.items[0].resultado;
			  if(result=="repetido"){
				  alert("Ya se ha seleccionado este software");
			  }else{
				
				$.post("/BolsaDeTrabajoIusacell/json/ActualizarSoftware", {idSoftware:idSoftware,dominio:dominio,parametro:parametro,idAux:idAux},
				  function(jsonData) {
		
			     	//ObtenerPorcentaje();
			     	document.location.href="/BolsaDeTrabajoIusacell/perfil";  
			
					
				  });    
		
		
			  }
				
			  });
	
	}else{
		alert("El numero de software permitido no debe exceder de 10");
		
	}
	

	
}

function modificarSoftware(){
	
	
	var idAux;
	var parametro="modificar";
	var idSoftware=$("#softwareListM").val();
	var dominio=$("#dominioSwM").val();
	
	idAux=$("#id_swM").val();
	
	
	$.post("/BolsaDeTrabajoIusacell/json/ActualizarSoftware", {idSoftware:idSoftware,dominio:dominio,parametro:parametro,idAux:idAux},
			  function(jsonData) {
	
		     	//ObtenerPorcentaje();
		     	document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		
				
			  });
	
	
}

function eliminarSoftware(){
	
	var idAux;
	var parametro="eliminar";
	var idSoftware=$("#softwareListM").val();
	var dominio=$("#dominioSwM").val();
	
	idAux=$("#id_swM").val();
	
	
	$.post("/BolsaDeTrabajoIusacell/json/ActualizarSoftware", {idSoftware:idSoftware,dominio:dominio,parametro:parametro,idAux:idAux},
			  function(jsonData) {
	
		     	//ObtenerPorcentaje();
		     	document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		
				
			  });
	
}

function softwareCat(cat){
	var categoria=cat;
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerCatSoftware", {categoria:categoria},
			  function(jsonData) {
		       var i=0;
		       var height=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	 var lista="<div id='"+jsonData.items[i].idSoftware+"'class='swItem modifSw'>"+jsonData.items[i].nombre+"</div><div class='swDomain modifSw'>"+jsonData.items[i].dominio+"</div>";
	    	 height+=25;
	    	 $("#"+categoria+"_list").append(lista);
	    	 $("#"+categoria+"_list").css("height",height+"px");
	       }
			  
	       $("div.modifSw").click(function(){
	   		var auxId=$(this).attr("id");
	   		var arrId=auxId.split("_");
	   		var idSw=arrId[0];
	   		$("#id_sw").val(idSw);
	   		$("#sw_parametro").val("modificar");
	   		abrir_software();			
	   	});
	       
	});
	
	
	
}



///////////////////obtener datos///////////////////////////////////////////////////////////
function obtenerEmpleo(svg,g1,g2){ 
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEmpleo", {},
			  function(jsonData) {
		        var i=0;
		        for(i=0;i<jsonData.items.length;i++){
		        	  var idExp=jsonData.items[i].id_exp
		    		  var empresa=jsonData.items[i].empresa;
		    		  var puesto=jsonData.items[i].puesto;
		    		  var fechaInicio=jsonData.items[i].fecha_inicio;
		    		  var fechaFin=jsonData.items[i].fecha_fin;
		    		  var sueldo=jsonData.items[i].sueldo;
		    		  var funciones=jsonData.items[i].funciones;
		    		  var trabajoActual=jsonData.items[i].trabajo_actual;
		    		  
		    		  var auxi=fechaInicio.split("/");
		    		  var imonth=auxi[1];
		    		  var iyear=auxi[2];
		    		  
		    		  var auxf=fechaFin.split("/");
		    		  var fmonth=auxf[1];
		    		  var fyear=auxf[2];
		    		  addJob(svg,g1,g2,iyear,imonth,fyear,fmonth,empresa,puesto,trabajoActual,idExp);
		    		 
		    		  
		        }
		        $("rect.jobgraph").click(function(){
		        	var aidi=$(this).attr("id");
		    		var aidiarr=aidi.split("_");
		    		var id=aidiarr[0];
		    		$("#idExp").val(id);
		    		obtenerEmpleoInfo(id);
		    		abrir_modificar_experiencia();
		    		
		    	});
		        
		        cargando=parseFloat(cargando)+parseFloat(12.5);
		        if(cargando>=100){
		        	$("#loadLayer").hide();
		        	$("#progressload").hide();
		        	
		        }else{
		        	var width=$("#barraLoadProgress").css("width");
		        	var newwidth=parseFloat(width)+parseFloat(65);
		        	$("#barraLoadProgress").css("width",newwidth);
		        }
		        
			  });
	
	 graphOrdering(svg,g1,g2);
	
}

function obtenerEmpleoInfo(id){
	var idExp=id;
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEmpleoInfo", {
		idExp:idExp
	},
			  function(jsonData) {
		      
		    		  var empresa=jsonData.items[0].empresa;
		    		  var puesto=jsonData.items[0].puesto;
		    		  var fechaInicio=jsonData.items[0].fecha_inicio;
		    		  var fechaFin=jsonData.items[0].fecha_fin;
		    		  var sueldo=jsonData.items[0].sueldo;
		    		  var funciones=jsonData.items[0].funciones;
		    		  var trabajoActual=jsonData.items[0].trabajo_actual;
		    		 
		    		  
		    		  
		    	
		    		  var auxi=fechaInicio.split("/");
		    		  var imonth=auxi[1];
		    		  var iyear=auxi[2];
		    		  
		    		  var auxf=fechaFin.split("/");
		    		  var fmonth=auxf[1];
		    		  var fyear=auxf[2];
		    		  var mesi=parseInt(imonth,10);
		    		  var mesf=parseInt(fmonth,10);
		    	      
		    		  $("#nombreEmpresaM").val(empresa);
		    		  $("#puestoM").val(puesto);
		    		  $("#mesInicioEM").val(mesi);
		    		  $("#anioInicioEM").val(iyear);
		    		  if(trabajoActual=="no"){
		    			  $("#mesFinEM").val(mesf);
			    		  $("#anioFinEM").val(fyear);
		    			  		    		  }else{
		    			  trabajoActualCheckM=document.getElementById("trabajoActualM");
		    			  trabajoActualCheckM.checked = true;
		    			  $("#aexpml").hide();
						  $("#mesFinEM").hide();
						  $("#anioFinEM").hide();
						  $("#mesFinContainerEM").hide();
						  $("#anioFinContainerEM").hide();
		    			  		    			  
		    			  		    		  }
		    		  		    		  
		    		  $("#sueldoEmpresaM").val(sueldo);
		    		  $("#funcionesEmpresaM").val(funciones);
		    		  
		    
		       
			  });
	

	
}

function obtenerEducacion(svg,g1,g2){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEducacion", {},
			  function(jsonData) {
		        var i=0;
		        for(i=0;i<jsonData.items.length;i++){
		        	  var idFor=jsonData.items[i].id_formacion;
		        	  var nivel_academico=jsonData.items[i].nivel_academico;
		    		  var instituto=jsonData.items[i].instituto;
		    		  var fechaInicio=jsonData.items[i].fecha_inicio;
		    		  var fechaFin=jsonData.items[i].fecha_fin;
		    		  var pais_insituto=jsonData.items[i].pais_insituto;
		    		  var estado_instituto=jsonData.items[i].estado_instituto;
		    		  var status=jsonData.items[i].status;
		    		  var estudio_actual=jsonData.items[i].estudio_actual;
		    		  
		    		  var auxi=fechaInicio.split("/");
		    		  var imonth=auxi[1];
		    		  var iyear=auxi[2];
		    		  
		    		  var auxf=fechaFin.split("/");
		    		  var fmonth=auxf[1];
		    		  var fyear=auxf[2];
		    		  addSchool(svg,g1,g2,iyear,imonth,fyear,fmonth,nivel_academico,instituto,estudio_actual,idFor);
		    
		    		 
		    		 
		    		  
		        }
		        
		        $("rect.schoolgraph").click(function(){
		    		var aidi=$(this).attr("id");
		    		var aidiarr=aidi.split("_");
		    		var id=aidiarr[0];
		    		$("#idForm").val(id);
		    		 obtenerEducacionInfo(id);
		    		abrir_modificar_educacion();
		    	});
		        
		        cargando=parseFloat(cargando)+parseFloat(12.5);
		        if(cargando>=100){
		        	$("#loadLayer").hide();
		        	$("#progressload").hide();
		        }else{
		        	var width=$("#barraLoadProgress").css("width");
		        	var newwidth=parseFloat(width)+parseFloat(65);
		        	$("#barraLoadProgress").css("width",newwidth);
		        }
		        
			  });
	
}	

function obtenerEducacionInfo(id){
	var idEdu=id;
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEducacionInfo", {
		idEdu:idEdu
	},
			  function(jsonData) {
		       
		        var idFor=jsonData.items[0].id_formacion;
  	            var nivel_academico=jsonData.items[0].nivel_academico;
  	            var nivel_estudios=jsonData.items[0].nivel_estudios;
  	            var instituto=jsonData.items[0].instituto;
  	            var fechaInicio=jsonData.items[0].fecha_inicio;
  	            var fechaFin=jsonData.items[0].fecha_fin;
  	            var pais_instituto=jsonData.items[0].pais_instituto;
  	            var estado_instituto=jsonData.items[0].estado_instituto;
  	            var status=jsonData.items[0].status;
  	            var estudio_actual=jsonData.items[0].estudio_actual;
		        var areaEspecialidad=jsonData.items[0].area_especialidad;
  	            var auxi=fechaInicio.split("/");
  	            var imonth=auxi[1];
  	            var iyear=auxi[2];
		  
  	            var auxf=fechaFin.split("/");
  	            var fmonth=auxf[1];
  	            var fyear=auxf[2];
  	            
  	            var mesi=parseInt(imonth,10);
    		    var mesf=parseInt(fmonth,10);
		  
  	          $("#nivelAcademicoM").val(nivel_estudios);
    		  $("#institucionM").val(instituto);
    		  $("#paisInstitutoM").val(pais_instituto);
    		  $("#estadoInstitutoM").val(estado_instituto);
    		  $("#mesInicioFM").val(mesi);
    		  $("#anioInicioFM").val(iyear);
    		  if(estudio_actual=="no"){
    			  $("#mesFinFM").val(mesf);
	    		  $("#anioFinFM").val(fyear);
    			  		    		  }else{
    			  estudioActualCheckM=document.getElementById("estudioActualM");
    			  estudioActualCheckM.checked = true;
    			  $("#afaml").hide();
    			  $("#mesFinFM").hide();
    			  $("#anioFinFM").hide();
    			  $("#mesFinContainerFM").hide();
				  $("#anioFinContainerFM").hide();
    			  		    		  }
    		  $("#statusM").val(status);
    		  if(nivel_estudios>3){
    			  $("#area_especialidadM").val(areaEspecialidad); 
    			  $("#area_especialidadM").show();
    			  $("#label_especialidadM").show();
    		  }else{
    			  $("#area_especialidadM").hide();
    			  $("#label_especialidadM").hide();
    			  
    		  }
		     
		       
			  });
	

	
}





function hobbie(){


	
}

function guardar_hobbie(){
	var casilla=$("#number_hobbie_cell").val();
	var hobbie=$("#hobbie_seleccionado").val();
	
	$.post("/BolsaDeTrabajoIusacell/json/HobbieRepetido", {hobbie:hobbie},
			  function(jsonData) {
	           var result=jsonData.items[0].resultado;
	           if(result=="repetido"){
	        	   alert("Ya se ha seleccionado este hobbie");
	           }else{
	        	   
	        	   $.post("/BolsaDeTrabajoIusacell/json/ActualizarHobbie", {casilla:casilla,hobbie:hobbie},
	     				  function(jsonData) {
	     			obtenerHobbies();
	     			ObtenerPorcentaje();
	     			obtenerHobbies();
	     			//document.location.href="/BolsaDeTrabajoIusacell/perfil";  
	     				  });
	        	   
	           }
		
		
		
			  });
	
	
	
	

}

function obtenerHobbies(){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerHobbies", {},
			function(jsonData) {
		var i=0;
    for(i=0;i<jsonData.items.length;i++){
    	var idHobbie=jsonData.items[i].id_hobbie;
    	var casilla=jsonData.items[i].casilla;
    	var hobbie=jsonData.items[i].hobbie;
    	var clases="hobbie_cell hobbie_grid ";
    	clases=clases+" hobbie_"+idHobbie;
    	$("#hobbie_"+casilla).attr("class",clases);
    	$("#hobbie_name_"+casilla).html(hobbie);
    	
    }
    cargando=parseFloat(cargando)+parseFloat(12.5);
    if(cargando>=100){
    	$("#loadLayer").hide();
    	$("#progressload").hide();
    }else{
    	var width=$("#barraLoadProgress").css("width");
    	var newwidth=parseFloat(width)+parseFloat(65);
    	$("#barraLoadProgress").css("width",newwidth);
    }
		  
});
	
}

function guardarSalario(){
	var salario=$("#sueldoDeseado").val();
	$.post("/BolsaDeTrabajoIusacell/json/GuardarSalario", {salario:salario},
			function() {
  	document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		});
	
}

function guardarHorario(){
	var horario=$("#horarioDeseado").val();
	$.post("/BolsaDeTrabajoIusacell/json/GuardarHorario", {horario:horario},
			function() {
		
	    /*
	    	  var horario=jsonData.items[0].horario_preferido;
	    	  $("#hora_container").html(horario);
	    
	    		//ObtenerPorcentaje();*/
	    		document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		
		
		});
	
}

function guardarDisposicion(){
	
	
	
	var viajar=$("#dispoViajar").val();
	var mudanza=$("#dispoMudanza").val();
	$.post("/BolsaDeTrabajoIusacell/json/GuardarDisposicion", {viajar:viajar,mudanza:mudanza},
			function() {
		/*
	    
	    	  var viajar=jsonData.items[0].viajar;
	    	  var mudanza=jsonData.items[0].mudarse;
	    	  $("#travel_label").html(viajar);
	    	  $("#mobi_label").html(mudanza);
	    
	    		ObtenerPorcentaje();*/
	    		document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		
		
		});
	
}

function guardarHabilidad(){
	var habilidad=$("#otra_habilidad").val().slice(0,20);
	if(habilidad=="" || hanilidad==null){
		alert("Para poder guardar una habilidad, debe escribir algo primeramente");
	}
	else{
	$.post("/BolsaDeTrabajoIusacell/json/ActualizarHabilidad", {habilidad:habilidad},
			function(jsonData) {
            

	    	//var habilidad=jsonData.items[0].habilidad;
	    	//var idHabilidad=jsonData.items[0].id_habilidad;
	    	//var skillrow="<div id='skillRow_"+idHabilidad+"' class='skill_row'>"+habilidad+"</div>";
	    	//$("#skillbody").append(skillrow);
	    	//ObtenerPorcentaje();
	        document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		
		
		});
	}
}




function dibujarGraficaTalentos(svg){
	
	 for(var i=0;i<45;i++){
		   svg.image(105, 11, 18, 63, 'images/color1.png',{id:i+"_graph",transform: 'rotate(-'+i+', 125,128)'});
		   }
	  
		   for(var i=46;i<90;i++){
		   svg.image(105, 11, 18, 63, 'images/color2.png',{id:i+"_graph",transform: 'rotate(-'+i+', 125,128)'});
		   }
		   
		    for(var i=91;i<135;i++){
		   svg.image(105, 11, 18, 63, 'images/color3.png',{id:i+"_graph",transform: 'rotate(-'+i+', 125,128)'});
		   }
		    for(var i=136;i<170;i++){
		   svg.image(105, 11, 18, 63, 'images/color4.png',{id:i+"_graph",transform: 'rotate(-'+i+', 125,128)'});
		   }
	
	svg.image(8, 10, 116, 236, 'images/brillo.png',{id:'fondo'});
	svg.rect(135,40,10,10,1,1,{id:"red_skill",fill:"crimson",onClick:"abrirTalento();",stroke:'black',strokeWidth:3});
	svg.rect(135,80,10,10,1,1,{id:"blue_skill",fill:"mediumAquaMarine",stroke:'black',strokeWidth:2});
	svg.rect(135,120,10,10,1,1,{id:"yellow_skill",fill:"yellow",stroke:'black',strokeWidth:2});
	svg.rect(135,160,10,10,1,1,{id:"gold_skill",fill:"gold",stroke:'black',strokeWidth:2});
	
	 svg.text(150, 50,"",{id:"talent_red",font:"arial",fontSize:11,fill:'Black'});
	 svg.text(150, 65,"%",{id:"porcentaje_red",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(150, 90,"",{id:"talent_blue",font:"arial",fontSize:11,fill:'Black'});
	 svg.text(150, 105,"%",{id:"porcentaje_blue",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(150, 130,"",{id:"talent_yellow",font:"arial",fontSize:11,fill:'Black'});
	 svg.text(150, 145,"%",{id:"porcentaje_yellow",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(150, 170,"",{id:"talent_gold",font:"arial",fontSize:11,fill:'Black'});
     svg.text(150, 185,"%",{id:"porcentaje_gold",font:"arial",fontSize:12,fill:'Black'});
	
	
	
	
	
	$("div.talentos_head").click(function(){
		abrir_talento();
	});
	
}

function dibujarTalentConf(svgc){
	    
	var circle="";
	   
	   var varr=$("#rred").val();
	   varr=parseInt((varr*180)/100);
	   
	   var varb=$("#rblue").val();
	   varb=parseInt((varb*180)/100);
	   varb = varr + varb;
	   
	   var vary=$("#ryellow").val();
	   vary=parseInt((vary*180)/100);
	   vary = varb + vary;
	   
	 
	   var varg=$("#rgold").val();
	   varg=parseInt((varg*180)/100);
	   varg = vary + varg;
		
	   
	   for(var i=0;i<=varr;i++){
		   svgc.image(155, 11, 18, 63, 'images/color1.png',{id:i+"_confg",transform: 'rotate(-'+i+', 176,128)'});
		   }
	   
		   for(var i=varr+1;i<=varb;i++){
		   svgc.image(155, 11, 18, 63, 'images/color2.png',{id:i+"_confg",transform: 'rotate(-'+i+', 176,128)'});
		   }
		   
		    for(var i=varb+1;i<=vary;i++){
		   svgc.image(155, 11, 18, 63, 'images/color3.png',{id:i+"_confg",transform: 'rotate(-'+i+', 176,128)'});
		   }
		    for(var i=vary+1;i<=varg;i++){
		   svgc.image(155, 11, 18, 63, 'images/color4.png',{id:i+"_confg",transform: 'rotate(-'+i+', 176,128)'});
		   }
		    
	    svgc.image(56, 10, 116, 236, 'images//brillo.png',{id:'fondo'});
	    svgc.image(165, -5, 13, 11, 'images/tri_r.png',{id:'redCircle',transform: 'rotate(-'+varr+', 176,128)'});
	    svgc.image(165, -5, 13, 11, 'images/tri_b.png',{id:'blueCircle',transform: 'rotate(-'+varb+', 176,128)'});
	    svgc.image(165, -5, 13, 11, 'images/tri_g.png',{id:'greenCircle',transform: 'rotate(-'+vary+', 176,128)'});
	    
		
		 $(document).mousemove(function(e){
			   var draw = document.getElementById('talentGraph');
		       var pos = getAbsoluteElementPosition(draw);
				 var mx=e.pageX;
		         var my=e.pageY;
		        var yi=(my-pos.top);
		        var xi=(mx-pos.left);
				
		        
				var x=126-xi;
				var y=128-yi;
				var pi=3.1415926535897932384626433832795;
				var l=parseInt(Math.pow(x,2)+Math.pow(y,2));
				var h=Math.sqrt(l);
				var g=0;
				var grado=0;
				if(x<y){
					g=Math.asin(x/h);
					var rad=g.toFixed(4);
					grad=(rad*180)/pi;
					grado=parseInt(grad);
				}else{
					var g=Math.asin(y/h);
					var rad=g.toFixed(4);
					gaux=(rad*180)/pi;
					grad=90-gaux;
					grado=parseInt(grad);
				}
				
				
				
				$("#coords").html(grado);
				var hold=$("#hold").val();
		        
				var circle=$("#circle").val();
		        if(hold=="down"){
					
		      //////////////////////////circulo rojo////////////////////////////////////////////
		        	
		        	if(circle=="redCircle"){
		        		var gradoActual=$("#gradoActualRed").val();
						 var gradoBlueCircle=$("#gradoActualBlue").val();
						
		        		
						if((grado<90)&&(grado>25)&&(grado<gradoBlueCircle-10)){
							$("#"+circle).attr('transform','rotate(-'+grado+', 176, 128)');
							 if(grado>gradoActual){
					 
					          for(i=0;i<grado;i++){$("#"+i+"_confg").attr("href","images/color1.png");}
					 }else{
						for(i=gradoBlueCircle;i>grado;i--){
					    $("#"+i+"_confg").attr("href","images/color2.png");}}
							 
							}
						
						
						
						if(grado<25){
							$("#gradoActualRed").val(25);
						} else if(grado>=gradoBlueCircle){
							var asdfg=gradoBlueCircle-11;
							$("#gradoActualRed").val(asdfg);
						}else if(grado>90){
							$("#gradoActualRed").val(90);
						}else{
							$("#gradoActualRed").val(grado);
						}
						calcularTalentoRed();
						calcularTalentoBlue();
				}
						
             //////////////////////////circulo azul////////////////////////////////////////////		
				if(circle=="blueCircle"){
					 var gradoActual=$("#gradoActualBlue").val();
					 var gradoActualRed=$("#gradoActualRed").val();
					 var gradoActualGreen=$("#gradoActualGreen").val();
					 var topLimit=parseInt(parseInt(gradoActualRed)+10);
						if((grado<135)&&(grado>45)&&(grado>topLimit)&&(grado<gradoActualGreen-10)){
							//$("#"+circle).animate({svgTransform: 'rotate(-'+grado+', 176, 128)'}, 1);
							$("#"+circle).attr('transform','rotate(-'+grado+', 176, 128)');
							 if(grado>gradoActual){
					 
					 
					 
					          for(i=gradoActualRed;i<grado;i++){
								  
								  $("#"+i+"_confg").attr("href","images/color2.png");}
					 }else{
						 for(i=gradoActualGreen;i>grado;i--){
					    $("#"+i+"_confg").attr("href","images/color3.png");
					 }
						 
						
						
						 }
							 
							}
						
						if(grado<45){
							$("#gradoActualBlue").val(45);
						} else if(grado<=gradoActualRed){
							var asdfg=parseInt(parseInt(gradoActualRed)+11);
							$("#gradoActualBlue").val(asdfg);
						}else if(grado>=gradoActualGreen){
							var asdfg=gradoActualGreen-11;
							$("#gradoActualBlue").val(asdfg);
						}else if(grado>130){
							$("#gradoActualBlue").val(130);
						}else{
							$("#gradoActualBlue").val(grado);
						}
						
						calcularTalentoBlue();
						calcularTalentoYellow();
				}
						
				
				
            //////////////////////////circulo verde////////////////////////////////////////////
				if(circle=="greenCircle"){
					
					 var gradoActual=$("#gradoActualGreen").val();
					 var gradoActualRed=$("#gradoActualRed").val();
					 var gradoActualBlue=$("#gradoActualBlue").val();
					 var topLimit=parseInt(parseInt(gradoActualBlue)+10);
					
						if((grado<155)&&(grado>90)&&(grado>topLimit)){
							
							
							$("#"+circle).attr('transform','rotate(-'+grado+', 176, 128)');
				             var gradoActual=$("#gradoActualGreen").val();
							 var gradoActualBlue=$("#gradoActualBlue").val();
							 if(grado>gradoActual){
					 
					 
					 
					          for(i=gradoActualBlue;i<=grado;i++){
								  
								  $("#"+i+"_confg").attr("href","images/color3.png");}
					 }else{
						 for(i=gradoActual;i>grado;i--){
					    $("#"+i+"_confg").attr("href","images/color4.png");
					 }
						
						
						 }
							 
							}
						
						
						if(grado>155){
							$("#gradoActualGreen").val(155);
						} else if(grado<90){
							$("#gradoActualGreen").val(91);
						}else if(grado<gradoActualBlue){
							var asdfg=parseInt(parseInt(gradoActualBlue)+11);
							$("#gradoActualGreen").val(asdfg);
						}else{
							$("#gradoActualGreen").val(grado);
						}
						
						calcularTalentoYellow();
						calcularTalentoGold();
				
				}
					
					
					
					
					
					
					
					
					
				
		        }
				
				
		        if(hold=="up"){
		        
		        }
				
		    });////mousemove fin
		    
		   //////////////eventos mouse//////////////////////
		 
		     $("#redCircle").mousedown(function(){
		    	
		        $("#circle").val("redCircle");
		         $("#hold").val("down");
		       
		        });
			 
			 
		        
		     $(document).mouseup(function(){
		         
		         $("#hold").val("up");
		       
		        });
			 
			 $("#blueCircle").mousedown(function(){
				
		         $("#circle").val("blueCircle");
		         $("#hold").val("down");
				 
		       
		        });
			 
			  $("#greenCircle").mousedown(function(){
		         $("#circle").val("greenCircle");
		         $("#hold").val("down");
				 
		       
		        });
			 
		        
		     $(document).mouseup(function(){
		         
		         $("#hold").val("up");
		       
		        });
		     
		     $("div.idListCheck").click(function(){
		    	 var idAux=$(this).attr("id");
		    	 var idArr=idAux.split("_");
		    	 var id=idArr[1];
		    	 talentoSel(id);
		     });
		
		////fin eventos mouse
		
	
		     

		
}



function talentoSel(id){
	var seleccionado=$("#talentoSeleccionado").val();
	if(seleccionado!="ninguno"){
		$("#tcheck_"+seleccionado).html("");
	}
	$("#tcheck_"+id).html("X");
	$("#talentoSeleccionado").val(id);
	
}

function calcularTalentoRed(){
	var gradoActualRed=$("#gradoActualRed").val();
	var porcentaje=parseInt((gradoActualRed*100)/180);
	if(porcentaje<0){porcentaje=0;}
	$("#porcentajeRed").val(porcentaje);
	$("#redPorc").text(porcentaje+"%");
	
}
function calcularTalentoBlue(){
	var gradoActualRed=$("#gradoActualRed").val();
	 var gradoActualBlue=$("#gradoActualBlue").val();
	 var dif=gradoActualBlue-gradoActualRed;
	 var porcentaje=parseInt((dif*100)/180);
	 if(porcentaje<0){porcentaje=0;}
	 $("#porcentajeBlue").val(porcentaje);
	 $("#bluePorc").text(porcentaje+"%");
	
}
function calcularTalentoYellow(){
	var gradoActualBlue=$("#gradoActualBlue").val();
	var gradoActualGreen=$("#gradoActualGreen").val();
	var dif=gradoActualGreen-gradoActualBlue;
	var porcentaje=parseInt((dif*100)/180);
	if(porcentaje<0){porcentaje=0;}
	$("#porcentajeYellow").val(porcentaje);
	$("#yellowPorc").text(porcentaje+"%");
}
function calcularTalentoGold(){
	var gradoActualGreen=$("#gradoActualGreen").val();
	var dif=175-gradoActualGreen;
	var porcentaje=parseInt((dif*100)/180);
	if(porcentaje<0){porcentaje=0;}
	$("#porcentajeGold").val(porcentaje);
	$("#goldPorc").text(porcentaje+"%");
}


function guardarTalentos(svgt){
	var talentoR=$("#talentoRed").val();
	var porcentajeR=$("#porcentajeRed").val();
	guardarTalento(talentoR,"red",porcentajeR,0);
	var talentoB=$("#talentoBlue").val();
	var porcentajeB=$("#porcentajeBlue").val();
	var gradoB=parseInt($("#gradoActualRed").val());
	guardarTalento(talentoB,"blue",porcentajeB,gradoB);
	
	var talentoY=$("#talentoYellow").val();
	var porcentajeY=$("#porcentajeYellow").val();
	var gradoY=parseInt($("#gradoActualBlue").val());
	guardarTalento(talentoY,"yellow",porcentajeY,gradoY);
	
	var talentoG=$("#talentoGold").val();
	var porcentajeG=$("#porcentajeGold").val();
	var gradoG=$("#gradoActualGreen").val();
	guardarTalento(talentoG,"gold",porcentajeG,gradoG);
	obtenerTalentos(svgt);
}


function guardarTalento(talento,color,porcentaje,numero){

	$.post("/BolsaDeTrabajoIusacell/json/ActualizarTalentos", {talento:talento,color:color,porcentaje:porcentaje,numero:numero},
			  function(jsonData) {
		//ObtenerPorcentaje();
		document.location.href="/BolsaDeTrabajoIusacell/perfil";  
			  });
	
	
	
};

function obtenerTalentos(svgt){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerTalentos", {},
			  function(jsonData) {
		var i=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	  var color=jsonData.items[i].color;
	    	  var talento=jsonData.items[i].talento;
	    	  var porcentaje=jsonData.items[i].porcentaje;
	    	  var grado=jsonData.items[i].grado;
			  
	if(color=="red"){
		fondo='images/color1.png';
	}else if(color=="blue"){
		fondo='images/color2.png';
	}else if(color=="yellow"){
		fondo='images/color3.png';
	}else if(color=="gold"){
		fondo='images/color4.png';
	}else {
		fondo="";
	}		  
			  
			  
			  
	          dibujarPorcentajeTalentos(svgt,color,talento,porcentaje,grado);
			  
	         
	       }
	       
	       cargando=parseFloat(cargando)+parseFloat(12.5);
	       if(cargando>=100){
	    	    $("#loadLayer").hide();
	        	$("#progressload").hide();
	       }else{
	       	var width=$("#barraLoadProgress").css("width");
	       	var newwidth=parseFloat(width)+parseFloat(65);
	       	$("#barraLoadProgress").css("width",newwidth);
	       }
	       
			  });
	
	
}


function dibujarPorcentajeTalentos(svgt,color,talento,porcentaje,gradoI){
	var grados=(porcentaje*180)/100;
	var limiteGrados=gradoI+grados;
	
	var fondo="";
	if(color=="red"){
		fondo='images/color1.png';
	}else if(color=="blue"){
		fondo='images/color2.png';
	}else if(color=="yellow"){
		fondo='images/color3.png';
	}else if(color=="gold"){
		fondo='images/color4.png';
	}else {
		fondo="";
	}
		 
	 for(var i=gradoI;i<=limiteGrados&&i<170;i++){
		 
		    $("#"+i+"_graph").attr("href",fondo);
		    $("#talent_"+color).text(talento);
		    $("#porcentaje_"+color).text(porcentaje+"%");
		    
	 }
	
}

function getAbsoluteElementPosition(element) {
	  if (typeof element == "string")
	    element = document.getElementById(element);
	    
	  if (!element) return { top:0,left:0 };
	  
	  var y = 0;
	  var x = 0;
	  while (element.offsetParent) {
	    x += element.offsetLeft;
	    y += element.offsetTop;
	    element = element.offsetParent;
	  }
	  return {top:y,left:x};
	}


function ObtenerPorcentaje(){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerPorcentaje", {},
			  function(jsonData) {
		        var porcentaje=jsonData.items[0].porcentaje;
		        var width=(parseInt(porcentaje)+parseInt(150))/100;
			       $("#userTotalProgress").animate({width: porcentaje+"%"}, 1500 );
		        $("#userprogress").text( porcentaje+"% Perfil Completado");
		       
	  });
	cargando=parseFloat(cargando)+parseFloat(12.5);
    if(cargando>=100){
    	$("#loadLayer").hide();
    	$("#progressload").hide();
    }else{
    	var width=$("#barraLoadProgress").css("width");
    	var newwidth=parseFloat(width)+parseFloat(65);
    	$("#barraLoadProgress").css("width",newwidth);
    }
	      
}

function obtenerMunicipio(estado){
	var  municipioOrdenado = new Array();
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerMunicipio", {estado:estado},
			  function(jsonData) {
		
		 for(var l=0;l<jsonData.items.length;l++){
			 municipioOrdenado [l] = jsonData.items[l].municipio;
		}
		 
		 municipioOrdenado.sort();
		 
		var i=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	   var option="<option value='"+municipioOrdenado[i]+"'>"+municipioOrdenado[i]+"</option>";
	    	   $("#municipioDelegacion").append(option);
	       }
	       var munActual=$("#munActual").val();
	       $("#municipioDelegacion").val(munActual);
	       cargando=parseFloat(cargando)+parseFloat(12.5);
	       if(cargando>=100){
	    	    $("#loadLayer").hide();
	        	$("#progressload").hide();
	       }else{
	       	var width=$("#barraLoadProgress").css("width");
	       	var newwidth=parseFloat(width)+parseFloat(65);
	       	$("#barraLoadProgress").css("width",newwidth);
	       }
	       
	  });
	
}

function obtenerHabilidad(){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerHabilidad", {},
			  function(jsonData) {
		var i=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	  var id_habilidad=jsonData.items[i].id_habilidad;
	    	  var skilldb=jsonData.items[i].habilidad;
	    	  var habilidad="";
	    	  if(skilldb.length>=15){
	    		  habilidad=skilldb.substring(0,15);
		    	  habilidad=habilidad+"...";  
	    		  
	    	  }else{
	    		  habilidad=skilldb;
	    	  }
	    	  
	    	  var skillrow='<div id="skillRow_'+id_habilidad+'" class="skill_row"><div class="skill_cont" title="'+skilldb+'">'+habilidad+'</div><div id="skilldelete_'+id_habilidad+'" class="skill_delete">eliminar</div></div>';
	    	  $("#skillbody").append(skillrow);
	       } 
	       
	       $("div.skill_delete").click(function(){
	       	var aidi=$(this).attr("id");
	           var arraidi=aidi.split("_");
	           var id=arraidi[1];
	       	eliminarHabilidad(id);
	       });
	       
	       cargando=parseFloat(cargando)+parseFloat(12.5);
	       if(cargando>=100){
	    	    $("#loadLayer").hide();
	        	$("#progressload").hide();
	       }else{
	       	var width=$("#barraLoadProgress").css("width");
	       	var newwidth=parseFloat(width)+parseFloat(65);
	       	$("#barraLoadProgress").css("width",newwidth);
	       }
		       
	  });
	
	
}

function obtenerPersonalidad(categoria_identidad){
	
	$.post("/BolsaDeTrabajoIusacell/json/TraerIdentidad", {
		categoria_identidad:categoria_identidad
	},function(jsonData) {
		        var categoria=jsonData.items[0].categoria;
		        var identidad=jsonData.items[0].identidad;
		        $("#"+categoria+"_content").text(identidad);
	  });
	
}


function eliminarHabilidad(id){
	var id_habilidad=id;
	$.post("/BolsaDeTrabajoIusacell/json/EliminarHabilidad", {
		id_habilidad:id_habilidad
	},function(jsonData) {
		document.location.href="/BolsaDeTrabajoIusacell/perfil";  
	});
	
}

function guardarAreaDeInteres(){
	var areaDeInteres=$("#areaInteres").val();
	var areaDeInteresAlterna=$("#areaInteres2").val();
	if(areaDeInteres=="Selecciona"||areaDeInteresAlterna=="Selecciona"){
		alert("Por favor Selecciona una opcion");
	}else{
		$.post("/BolsaDeTrabajoIusacell/json/ModificarAreaDeInteres", {
			areaDeInteres:areaDeInteres,
			areaDeInteresAlterna:areaDeInteresAlterna
		},function(jsonData) {
			document.location.href="/BolsaDeTrabajoIusacell/perfil";  
		});		
		
	}

	
}

function ObtenerFoto(){
	
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerPhoto", {
	},function(jsonData) {
		  var foto=jsonData.items[0].foto;
		  $("#foto_user").attr("src",foto);
	});
	
}

function verificar_caracteres(cadena){
	
        var check;
  		
  		var reg=cadena;
		var regcheck=/^[0-9a-zA-Z·ÈÌÛ˙¡…Õ”⁄Ò—!&°ø?\s\"\\.:(),_@-]+$/;
		if(!(regcheck.test(reg))){
			check=true;
		}else{
			check=false;
		}
		return check;
  		

	
}
function checaper()
{
var seleccionado=$("#checadoper").val();
identidadImpacto(seleccionado);
}
function checaconst()
{
var seleccionado=$("#checadoconst").val();
identidadInterrelacion(seleccionado);
}
function checapego()
{
var seleccionado=$("#checadoapego").val();
identidadLaboral(seleccionado);
}
function checaempu()
{
var seleccionado=$("#checadoempu").val();
identidadEmpuje(seleccionado);
}



