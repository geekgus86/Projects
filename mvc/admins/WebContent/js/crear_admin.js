$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();

	
	$("#estado").change(function(){
		var estad = $("#estado").val();
		cambiarEstado(estad);
	});
	
	   $("#enviarAdmin").click(function(){
		   var nombre=$("#nombre").val();
		   var cec=$("#cec").val();
		   var email=$("#email").val();
		   var nivelAdmin=$("#nivelAdmin").val();
		   var ubicacion = $("#ubicacion").val();
		   var region  =  $("#regionH").val();
		   var estatus = $("#estatus").val();
		   if(nombre==""||cec==""||email=="" || ubicacion=="" || region==""){
			   alertify.alert("Faltan datos por llenar");
		   }else{
			   
			   
			   
			   $.post("/admins/CrearAdmin", { nombre:nombre,cec:cec,email:email,nivelAdmin:nivelAdmin,ubicacion:ubicacion,region:region,estatus:estatus }, function(data) {
				   if(data){
					   window.location.href="/admins/Administradores";
				   }
			   });
			   
			   
		
		   }
	   });
	   
	   
	   $("#email").blur(function(){
		   var emailCaja = $(this).val();
		   veriExisAdmins(emailCaja);
	   });
	
});

function cambiarEstado(estad){
	var estado = estad;
	
	if(estado == 1){
		$("#ubicacion").val("");
		$("#ubicacion").val("Aguascalientes");
	}else if(estado == 2){
		$("#ubicacion").val("");
		$("#ubicacion").val("Baja California");
	}else if(estado == 3){
		$("#ubicacion").val("");
		$("#ubicacion").val("Baja California Sur");
	}else if(estado == 4){
		$("#ubicacion").val("");
		$("#ubicacion").val("Campeche");
	}else if(estado == 5){
		$("#ubicacion").val("");
		$("#ubicacion").val("Chiapas");
	}else if(estado == 6){
		$("#ubicacion").val("");
		$("#ubicacion").val("Chihuahua");
	}else if(estado == 7){
		$("#ubicacion").val("");
		$("#ubicacion").val("Coahuila de Zaragoza");
	}else if(estado == 8){
		$("#ubicacion").val("");
		$("#ubicacion").val("Colima");
	}else if(estado == 9){
		$("#ubicacion").val("");
		$("#ubicacion").val("Durango");
	}else if(estado == 10){
		$("#ubicacion").val("");
		$("#ubicacion").val("Guanajuato");
	}else if(estado == 11){
		$("#ubicacion").val("");
		$("#ubicacion").val("Guerrero");
	}else if(estado == 12){
		$("#ubicacion").val("");
		$("#ubicacion").val("Hidalgo");
	}else if(estado == 13){
		$("#ubicacion").val("");
		$("#ubicacion").val("Jalisco");
	}else if(estado == 14){
		$("#ubicacion").val("");
		$("#ubicacion").val("México");
	}else if(estado == 15){
		$("#ubicacion").val("");
		$("#ubicacion").val("Michoacan de Ocampo");
	}else if(estado == 16){
		$("#ubicacion").val("");
		$("#ubicacion").val("Morelos");
	}else if(estado == 17){
		$("#ubicacion").val("");
		$("#ubicacion").val("Nayarit");
	}else if(estado == 18){
		$("#ubicacion").val("");
		$("#ubicacion").val("Nuevo Leon");
	}else if(estado == 19){
		$("#ubicacion").val("");
		$("#ubicacion").val("Oaxaca");
	}else if(estado == 20){
		$("#ubicacion").val("");
		$("#ubicacion").val("Puebla");
	}else if(estado == 21){
		$("#ubicacion").val("");
		$("#ubicacion").val("Queretaro");
	}else if(estado == 22){
		$("#ubicacion").val("");
		$("#ubicacion").val("Quintana Roo");
	}else if(estado == 23){
		$("#ubicacion").val("");
		$("#ubicacion").val("San Luis Potosi");
	}else if(estado == 24){
		$("#ubicacion").val("");
		$("#ubicacion").val("Sinaloa");
	}else if(estado == 25){
		$("#ubicacion").val("");
		$("#ubicacion").val("Sonora");
	}else if(estado == 26){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tabasco");
	}else if(estado == 27){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tamaulipas");
	}else if(estado == 28){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tlaxcala");
	}else if(estado == 29){
		$("#ubicacion").val("");
		$("#ubicacion").val("Veracruz de Ignacio de la Llave");
	}else if(estado == 30){
		$("#ubicacion").val("");
		$("#ubicacion").val("Yucatán");
	}else if(estado == 31){
		$("#ubicacion").val("");
		$("#ubicacion").val("Zacatecas");
	}else if(estado == 32){
		$("#ubicacion").val("");
		$("#ubicacion").val("Distrito Federal");
	}
}



function  veriExisAdmins(emailCaja){
	var  email = emailCaja;
	 $.getJSON('json/verificarExisteAdmin',{email:email},
			  function(jsonDataVerifAd) {

		 	var mensaje = jsonDataVerifAd.Mensajes[0].mensaje;

				if(mensaje == "Ya existe el Administrador"){
					alertify.alert("Ya existe un Administrador registrado con este el sigueinte correo: "+email);
					$("#email").val("");
				}
				
				
	});
}

