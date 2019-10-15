$(document).ready(function(){
	$("div.agregar_otra").click(function(){
		
		agregar_exp();
		
	});
	
$("div.quitar_anterior").click(function(){
		
		quitar_exp();
		
	});

$("#guardar").click(function(){
	
	guardar();
	
});
	
});

function agregar_exp(){
     var nexp=parseInt($("#nempresa").val());
     var nuevoexp=nexp+1;
 	 var new_empresa='<br><div id="experiencia_'+nuevoexp+'"><div class="label_crear"><label>*Nombre</label></div><input type="text" id="nombreEmpresa_'+nuevoexp+'" name="nombreEmpresa" class="caja_input validar"/><br><div class="label_crear"><label>*Puesto</label></div><input type="text" id="puesto_'+nuevoexp+'" name="puesto" class="caja_input validar"/><br><div class="label_crear"><label>*Periodo de</label></div><select id="anioInicioE_'+nuevoexp+'" name="anioInicioE" class="combofechas">'+anios()+'</select><br><div class="label_crear"><label id="a">a</label></div><select id="anioFinE_'+nuevoexp+'" name="anioFinE" class="combofechas">'+anioFin()+'</select><br><div class="label_crear"><label>*Sueldo</label></div><select id="sueldoEmpresa_'+nuevoexp+'" name="sueldoEmpresa" class="select_input">'+salarios()+'</select><br><div ><label>Detalle brevemente sus funciones</label></div><textarea id="funcionesEmpresa_'+nuevoexp+'" name="funcionesEmpresa" cols="40" rows="3" class="area_input  textval"></textarea><div ><label>Mencione los motivos de su salida</label></div><textarea id="motivosSalida_'+nuevoexp+'" name="motivosSalida" cols="40" rows="3" class="area_input  textval"></textarea></div>';
     $("#exp").append(new_empresa);
     nestudio=nestudio+1;
     $("#nempresa").val(nuevoexp);
     
     $("select.combofechas").each(function(){
 		var value=$(this).val();
 		if(value=="Año"||value=="Dia"||value=="Mes"){
 			option=1;
 			 
 		}else{
 			option=0;
 			
 		}
 		
 	});	
      
}

function quitar_exp(){
	var nexp=parseInt($("#nempresa").val());
	$("#nombreEmpresa_"+nexp).attr("name","invalid");
	$("#puesto_"+nexp).attr("name","invalid");
	$("#anioInicioE_"+nexp).attr("name","invalid");
	$("#anioFinE_"+nexp).attr("name","invalid");
	$("#sueldo_"+nexp).attr("name","invalid");
	$("#funcionesEmpresa_"+nexp).attr("name","invalid");
	$("#motivosSalida_"+nexp).attr("name","invalid");
	
	$("#experiencia_"+nestudio).hide();
	
	
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
	
	function anioFin(){
		var cadena_anio="<option>Año</option>";
		cadena_anio=cadena_anio+"<option>Trabajo Ahi Actualmente</option>";
		var i=0;
		for(i=2012;i>=1900;i--){
			var cadena_anio=cadena_anio+"<option>"+i+"</option>";
	    }
			return cadena_anio;
	}
	
	function salarios(){
		var cadena_salario="<option>Menos de 1500</option>"
			for(i=1500;i<=150000;i+=500){
				var cadena_salario=cadena_salario+"<option>"+i+"</option>";
		    }
				return cadena_salario;
	}
	
function guardar(){
	var option=verificar_fechas();
	option=validar_inputs(option);
	
	if(option==1){
		alert("faltan datos por definir");
	}else{
		validar_inputs();
		$("#formacion_guardar").submit();
	}
	
}	

function validar_inputs(option){
	
	$("input.validar").each(function(){
		var validar=$(this).val();
		if(validar==""||validar==null){
			option=1; 
		}
	});
	
	return option;
}

function validar_textos(){
	$("textarea.textval").each(function(){
		var validar=$(this).val();
		if(validar==""||validar==null){
			$(this).val("no especificado");	 
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