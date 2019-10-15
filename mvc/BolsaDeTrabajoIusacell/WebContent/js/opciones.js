$(document).ready(function(){
	
	traerDestacados();
	 
	 $("#palabra_bus_cla").Watermark("Palabra de búsqueda");
	 $("#localidad_bus").Watermark("Localidad");
	
	$("#dialog_eliminar").dialog({
  	    open: function(event, ui) {},
  	    close: function(event, ui) {},
  	    bgiframe: true,
  	    autoOpen: false,
  	    modal: true,
  	    height: 560,
  	    width: 800,
  	    resizable: false,
  	    draggable: false,
  	    show: "blind",
  		hide: "explode",
  	    position: 'center',
  	    buttons: {
  	        'Aceptar': function() {
  	        	eliminar_cuenta();
  	        	$(this).dialog('close');
  	        },'Cancelar':function(){
  	        	$(this).dialog('close');
  	        }
  	    }
  	 });

	$("#dialog_confirmar_eliminar").dialog({
  	    open: function(event, ui) {},
  	    close: function(event, ui) {document.location.href="/BolsaDeTrabajoIusacell/login";},
  	    bgiframe: true,
  	    autoOpen: false,
  	    modal: true,
  	    height: 560,
  	    width: 800,
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
	         'Cerrar': function() {
	               $(this).dialog('close');
	               mostrarAgain();
	                     
	         }
	     }
	  });
	
	
	$("#guardar").click(function(){
		
		var newemail=$("#imail").val();
		var newpass=$("#password").val();
		var confirm=$("#passwordConfirm").val();

		cambiar_datos(newemail,newpass,confirm);
		
		
		
	});
	
	
	$("#Baja").click(function(){
		
		abrir_dialog_baja();
		
	});
	
	
	$("#password").blur(function(){
		pass=$(this).val();
		passreg=/^(?=.*[a-zA-Z])(?=.*[\d]).{9,*}$/;
		if((!passreg.test(pass))&&(pass.length<9)){
			alertify.alert("Formato contraseña no v&aacute;lida, m&iacute;nimo debe tener 9 caracteres y al menos un n&uacute;mero.");
			$(this).val("");
		}
		
		
	});


	$("#imail").blur(function(){
		var imail=$(this).val();
		verificarCorreo(imail);
	});

	
});

function abrir_dialog_baja(){
	$( "#dialog_eliminar" ).dialog( "open");
}

function cambiar_datos(newemail,newpass,confirm){

	   if(newemail=="")newemail="sin cambios";
	   
	   if(newpass=="")newpass="sin cambios";
	   
	   if(confirm=="")confirm="sin cambios";
	   
	   if(newpass!=confirm){
		   
		   alertify.alert("<b>Las contraseñas ingresadas no corresponden, verifique.</b>"); 
		   
	   }else{
		   
		   if(newpass=="sin cambios" && newemail=="sin cambios" && confirm=="sin cambios"){
			   
			   alertify.alert("<b>Los campos est&aacute;n vac&iacute;os, verifique.</b>");
			   
		   }
		   else if(newemail!="sin cambios" && ValidaEmail(newemail) == false) {
			   
			   alertify.alert("<b>El correo electrónico introducido no es correcto.</b>");
			   
	       }else{
	    	   
	    	   if(newpass!="sin cambios" && tiene_numeros(newpass)==0){
	    		   
				   alertify.alert("<b>La contraseña debe contener un campo num&eacute;rico por lo menos.</b>");
				   
			   }else{
				   
	$.post("/BolsaDeTrabajoIusacell/json/ModificarCuentaDatos", {
		newemail:newemail,
	    newpass:newpass
	},function(jsonData){
		
		$("input[type=checkbox]").prop('disabled', false);
		
		$("input[type=checkbox]").prop('checked', false);
		
		$("#showMail").hide();
		
		$("#showPass").hide();
		
		$("#showDel").hide();
		
		$("#guardar").hide();
		
		$("#imail").val("");
		
		$("#password").val("");
		
		$("#passwordConfirm").val("");
		
		if(newpass!="sin cambios"){
			
			alertify.alert("Datos actualizados con &eacute;xito!<br/>Su nueva contraseña es:<b>"+newpass+".</b>");
		
		}else if(newemail!="sin cambios"){
			
			alertify.alert("Datos actualizados con &eacute;xito!<br/>Su nuevo correo es:<b>"+newemail+".</b>");
		}
	  });
			   }
	       }
	   }
}

var numeros="0123456789";

function tiene_numeros(texto){
   for(var i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}

function ValidaEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
	}


function eliminar_cuenta(){
	$.post("/BolsaDeTrabajoIusacell/json/EliminarCuenta", {},
			  function(jsonData) {
		      $("#dialog_confirmar_eliminar").dialog( "open");
	  });
	
	
}


function verificarCorreo(mail){

	$.post("/BolsaDeTrabajoIusacell/json/jsonCorreo", { mail:mail },
			  function(jsonData) {
				 var correo=jsonData.items[0].usuario_nombre;
				 if(correo!=null||correo!=""){
					 alertify.alert("Este correo ya ha sido utilizado por otra persona");
					 $("#imail").val("");
				 }
			  }
			 );
			 return false;

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
	