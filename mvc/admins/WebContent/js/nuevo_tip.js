

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	
	
	
	$("#btn_save").click(function(){
		
		var ubi_vac=$("#textoTip").val();
		var tipo_tip = $("#tipoTip").val();
		
		var tamañoTextoTip = $("#textoTip").val().length;
		
		
		if(tamañoTextoTip > 255){
			alertify.alert("Sobrepasaste los Caracteres Permitidos en Observaciones");
		  	$("#textoTip").css("background-color","red");
		  	$("#textoTip").css("color","white");
		  	$("#textoTip").focus();
		}else{
			if( ubi_vac=="" || tipo_tip=="" ){
				alertify.alert("¡FALTAN DATOS!");
			}else{
				
				$("#form_tip_nuevo").submit();
			}
		}
		
		
		
	});
	
	
	
	var total_letrasO = 255;
	
	$('#textoTip').keyup(function() {
		$("#textoTip").css("background-color","white");
	  	$("#textoTip").css("color","black");
	    var longitud = $(this).val().length;
	    var resto = total_letrasO - longitud;
	    if(resto <= 0){
	        $('#textoTip').attr("maxlength", 255);
	    }
	});
	
	
});