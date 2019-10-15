$(document).ready(function(){
	$("div.agregar_otra").click(function(){
		
		agregar_estudio();
		
	});
	
$("div.quitar_anterior").click(function(){
		
		quitar_estudio();
		
	});

$("#guardar").click(function(){
	
	guardar();
	
});
	
});

function agregar_estudio(){
     var nestudio=parseInt($("#nestudio").val());
     var nuevoes=nestudio+1;
 	 var new_estudio='<br><div id="formacion_'+nuevoes+'"><div class="label_crear"><label>*Nivel Academico</label></div> <select id="nivelAcademico_'+nuevoes+'" name="nivelAcademico" class="select_input"><option value="1">Secundaria</option><option value="2">Bachillerato</option><option value="3">Tecnico</option><option value="4">Estudios Superiores</option><option value="5">Diplomado</option><option value="6">Maestria</option><option value="7">Doctorado</option><option value="8">Otro</option></select><br><div class="label_crear"><label>*Institucion Escolar</label></div><input type="text" id="institucion_'+nuevoes+'" name="institucion" class="caja_input  validar"/><br><div class="label_crear"><label>*Pais</label></div><input type="text" id="pais_'+nuevoes+'" name="pais" class="caja_small  validar"/><label>Edo.</label><input type="text"id="estado_'+nuevoes+'" name="estado" class="caja_small  validar"/><br><div class="label_crear"><label>*Lapso de</label></div><div class="fec_container"><select id="diaInicioF_'+nuevoes+'" name="diaInicioF" class="combofechas">'+dias()+'</select><select id="mesInicioF_'+nuevoes+'" name="mesInicioF" class="combofechas">'+meses()+'</select><select id="anioInicioF_'+nuevoes+'" name="anioInicioF" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label id="a">a</label></div><div class="fec_container"><select id="diaFinF_'+nuevoes+'" name="diaFinF" class="combofechas">'+dias()+'</select><select id="mesFinF_'+nuevoes+'" name="mesFinF" class="combofechas">'+meses()+'</select><select id="anioFinF_'+nuevoes+'" name="anioFinF" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label>*Estatus</label></div><select id="status_'+nuevoes+'" name="status" class="caja_input"><option value="Trunco">Trunco</option><option value="Cursando">Cursando</option><option value="Titulado">Titutlado</option><option value="Diplomado">Diplomado</option><option value="Pasante">Pasante</option></select><br></div>';
     $("#estudios").append(new_estudio);
     nestudio=nestudio+1;
     $("#nestudio").val(nestudio);
     
     $("select.combofechas").each(function(){
 		var value=$(this).val();
 		if(value=="Año"||value=="Dia"||value=="Mes"){
 			option=1;
 			 
 		}else{
 			option=0;
 			
 		}
 		
 	});	
      
}

function quitar_estudio(){
	var nestudio=parseInt($("#nestudio").val());
	$("#nivelAcademico_"+nestudio).attr("name","invalid");
	$("#institucion_"+nestudio).attr("name","invalid");
	$("#pais_"+nestudio).attr("name","invalid");
	$("#estado_"+nestudio).attr("name","invalid");
	$("#diaInicioF_"+nestudio).attr("name","invalid");
	$("#mesInicioF_"+nestudio).attr("name","invalid");
	$("#anioInicioF_"+nestudio).attr("name","invalid");
	$("#diaFinF_"+nestudio).attr("name","invalid");
	$("#mesFinF_"+nestudio).attr("name","invalid");
	$("#mesFinF_"+nestudio).attr("name","invalid");
	$("#diaFinF_"+nestudio).attr("name","invalid");
	$("#status_"+nestudio).attr("name","invalid");
	$("#formacion_"+nestudio).hide();
	
	
}

function dias(){
	  var cadena_dias="<option>Dia</option>";
	  var i=0;
	  for(i=1;i<=31;i++){
		  cadena_dias=cadena_dias+"<option>"+i+"</option>";
	  }
		return cadena_dias;
	}	

	function meses(){
	     var cadena_mes="<option>Mes</option>";
		 var i=0;
		 for(i=1;i<=12;i++){
			  cadena_mes=cadena_mes+"<option>"+i+"</option>";
		  }
			return cadena_mes;
		
	}

	function anios(){
		var cadena_anio="<option>Año</option>";
		var i=0;
		for(i=2012;i>=1900;i--){
			var cadena_anio=cadena_anio+"<option>"+i+"</option>";
	    }
			return cadena_anio;
	}
	
function guardar(){
	var option=verificar_fechas();
	
	
	
	
	if(option==1){
		alert("faltan datos por definir");
	}else{
		validar_inputs();
		$("#formacion_guardar").submit();
	}
	
}	

function validar_inputs(){
	$("input.validar").each(function(){
		var validar=$(this).val();
		if(validar==""||validar==null){
			$(this).val("No especificado");	 
		}
	});
}

function verificar_fechas(){
	var option=0;
	$("select.combofechas").each(function(){
		var value=$(this).val();
		if(value=="Año"||value=="Dia"||value=="Mes"){
			option=1;
			 
		}else{
			option=0;
			
		}
		
	});	
	return option;
}