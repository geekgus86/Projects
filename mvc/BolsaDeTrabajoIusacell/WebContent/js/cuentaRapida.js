$(document).ready(function(){
	traerDestacados();
	$("#guardar").click(function(){
		
		comprobar_datos();
	
	
		
	});
	
	$("#imail").blur(function(){
		var imail=$(this).val();
		verificarCorreo(imail);
	});
	
	$("#palabra_bus_cla").Watermark("Palabra de búsqueda");
	$("#localidad_bus").Watermark("Localidad");
	
	$("#contra").blur(function(){
		pass=$(this).val();
		passreg=/^(?=.*[a-zA-Z])(?=.*[\d]).{9,*}$/;
		if((!passreg.test(pass))&&(pass.length<9)){
			alert("Formato contraseña no valida, minimo debe tener 9 caracteres y al menos un numero");
			$(this).val("");
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
	         'Cerrar': function() {
	               $(this).dialog('close');
	               mostrarAgain();
	                     
	         }
	     }
	  });
	
	
	
	$("#dialog_terminos_condiciones").dialog({
		 closeOnEscape: false,
	     open: function(event, ui) {$(".ui-icon-closethick .ui-dialog-titlebar-close .ui-corner-all", ui.dialog || ui).hide();},
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
	    	 'Continuar': function() {
	    		 aceptarTerminos();
	             
	    	 }
	     }
	  });
	
	
	
	
});



function comprobar_datos(){
	var apePaterno=$("#apellidoP").val();
	var apeMaterno=$("#apellidoM").val();
	var nombre=$("#nom").val();
	var imail=$("#imail").val();
	var usr=imail;
	var password=$("#contra").val();
	var password2=$("#contra_again").val();
	var areaInteres=$("#areaInteres").val();
	var telefono=$("#telefono").val();
	var areaFormacion=$("#areaFormacion").val();
	var enterado=$("#comoSeEntero").val();
	var diaNacimiento=$("#diaNacimiento").val();
	var mesNacimiento=$("#mesNacimiento").val();
	var anioNacimiento=$("#anioNacimiento").val();
	var fechaNacimiento=diaNacimiento+"/"+mesNacimiento+"/"+anioNacimiento;
	//alert(apePaterno+"/"+apeMaterno+"/"+nombre+"/"+imail+"/"+usr+"/"+password+"/"+password2+"/"+areaInteres+"/"+telefono+"/"+nivelEstudios+"/"+areaFormacion+"/"+ultimaEmpresa+"/"+ultimoPuesto+"/"+giroEmpresa+"/"+experiencia+"/"+enterado);
	
	if(password!=password2){
		alert("La contraseña no coincide con el campo de verificacion");
	}else if(apePaterno==""||apeMaterno==""||nombre==""||imail==""||telefono==""||diaNacimiento=="Dia"||anioNacimiento=="Año"){
		alert("Aun faltan datos por definir");
	}else if(password=="" && password2==""){
		alert("Los campos de la contraseña y la verificacion de la misma no pueden ir vacios");
	}else{
		$("#cuenta_rapida").submit();
	}
	
}

function verificarCorreo(mail){

	$.post("/BolsaDeTrabajoIusacell/json/jsonCorreo", { imail:imail },
			  function(jsonData) {
				 var correo=jsonData.items[0].usuario_nombre;
				 if(correo!=null||correo!=""){
					 alert("Este correo ya ha sido utilizado por otra persona");
					 $("#imail").val("");
				 }
			  }
			 );
			 return false;

}

function enviar_email(imail){
	$.getJSON('json/sendData' ,
			  {
		apePaterno:apePaterno,
		apeMaterno:apeMaterno,
		nombre:nombre,
		imail:imail,
		usr:usr,
		password:password,
	    areaInteres:areaInteres,
		telefono:telefono,
		//telefono_extra:telefono_extra,
		nivelEstudios:nivelEstudios,
		areaFormacion:areaFormacion,
		ultimaEmpresa:ultimaEmpresa,
		ultimoPuesto:ultimoPuesto,
		giroEmpresa:giroEmpresa,
		experiencia:experiencia,
		enterado:enterado,
		diaNacimiento:diaNacimiento,
		mesNacimiento:mesNacimiento,
		aniodNacimiento:anioNacimiento
			  },
			  function(jsonData) {
				  var apePaterno=jsonData.items[0].apePaterno;
				  var apeMaterno=jsonData.items[0].apeMaterno;
				  var nombre=jsonData.items[0].nombre;
				  var imail=jsonData.items[0].imail;
				  alert(apePaterno);
				  if(nombre!=""||nombre!=null){
					  window.location.href="/BolsaDeTrabajoIusacell/crearCuenta";
				  }
				
				 
			  }
			 );
	
			 return 'true';
	
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
	
function aceptarTerminos(){
	var check = $("#aceptar_terminos[type='checkbox']:checked").length;
	  
	  if ( check == ""){
		  alertify.confirm("Si usted acepta los t&eacute;rminos antes mencionados, de clic en aceptar.",function (e) {
			    if (e) {
			        // user clicked "ok"
			    	 $("#dialog_terminos_condiciones").dialog('close');
			    } else {
			        // user clicked "cancel"
			    	location.href = "/BolsaDeTrabajoIusacell/login";
			    }
			});
	  }
	
	
	
}	