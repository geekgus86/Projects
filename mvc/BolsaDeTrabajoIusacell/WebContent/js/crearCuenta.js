dojo.require("dojox.validate");     /*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO*/
dojo.require("dijit.form.ValidationTextBox"); /*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO PARA CAJAS DE TEXTO*/
dojo.require("dijit.form.DateTextBox");   /*SOLICITANDO LAS ACCIONES Y COMPLEMENTOS DE DATEPICKER [COMBO BOX DE LA FECHA]*/
dojo.require("dojox.validate.web");    /*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO PARA WEB'S Y CORREOS ELECTRONICOS*/
dojo.require("dojo/dom-class");
dojo.require("dijit.form.Select");
require(["dojo/ready", "dojo/parser", "dijit/registry", "dijit/Dialog"], function(ready, parser, registry){
     ready(function(){
    	 dojo.style(dojo.byId('dataContainer'), "display", "none");
    	 dojo.style(dojo.byId('exp'), "display", "none");
    	 dojo.style(dojo.byId('talentosDiv'), "display", "none");
    	 dojo.style(dojo.byId('botonAtras'), "display", "none");
    	 dojo.style(dojo.byId('uploads'), "display", "none");
    	 dojo.style(dojo.byId('bara1'), "display", "none");
    	 dojo.style(dojo.byId('barb1'), "display", "none");
    	 dojo.style(dojo.byId('barc1'), "display", "none");
    	 dojo.style(dojo.byId('bard1'), "display", "none");
    	 dojo.style(dojo.byId('qtr_izquierda1'), "display", "none");
    	 dojo.style(dojo.byId('qtr_izquierda2'), "display", "none");
    	 dojo.style(dojo.byId('mitad_derecha'), "display", "none");
    	 $("#fechaNacimiento").change(function(){
    			calcularRFC();
    		});
    	 $('#fechaNacimiento').datepicker({dateFormat:'dd/mm/y'});
    	 $("#salinasYN2").hide();
    	 $("#noEmpleadoDiv").hide();
    	 
    	 $("#dia").change(function(){
    		 var valor=$(this).val();
    		 if(valor!="dia"){
    			 calcularRFC();
    		 }
    	 });
    	 
    	 $("#mes").change(function(){
    		 var valor=$(this).val();
    		 if(valor!="mes"){
    			 calcularRFC();
    		 }
    	 });
    	 
    	 $("#anio").change(function(){
    		 var valor=$(this).val();
    		 if(valor!="anio"){
    			 calcularRFC();
    		 }
    	 });
    	 
    	 $("input.checktalent").click(function(){
    		 var box=$(this).attr("id");
    		 if(document.getElementById(box).checked == true){
    			 talent_counter(box);
    		 }else if(document.getElementById(box).checked == false){
    			 talent_discounter();
    		 }
    		 
    	 });
    		
    	 
    	 
     });
});



function siguiente(){
	
	if(dojo.style(dojo.byId('datosPersonalesDiv'), "display") == "block"){
		
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "block");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
     	dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	    dojo.style(dojo.byId('indicador'), "left", "755px");
   	    dojo.replaceClass("circleb", "circle1");
   	 dojo.style(dojo.byId('bara1'), "display", "block");
   	dojo.byId("progreso").innerHTML="25%";
   	dojo.byId("title_mod").innerHTML="2.- Formacion Academica";
   	dojo.style(dojo.byId('mitad_derecha'), "display", "block");
   	dojo.style(dojo.byId('mitad_derecha'), "height", "26px");
    } else if(dojo.style(dojo.byId('dataContainer'), "display") == "block"){
    	
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "block");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	    dojo.style(dojo.byId('indicador'), "left", "832px");
   	    dojo.style(dojo.byId('barb1'), "display", "block");
   	    dojo.replaceClass("circlec", "circle1");
   	 dojo.byId("progreso").innerHTML="50%";
   	dojo.byId("title_mod").innerHTML="3.- Experiencia Laboral";
	dojo.style(dojo.byId('mitad_derecha'), "display", "block");
   	dojo.style(dojo.byId('mitad_derecha'), "height", "55px");
   	
    } else if(dojo.style(dojo.byId('exp'), "display") == "block"){
    	
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "block");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	    dojo.style(dojo.byId('indicador'), "left", "908px");
   	    dojo.style(dojo.byId('barc1'), "display", "block");
   	 dojo.byId("progreso").innerHTML="75%";
   	dojo.byId("title_mod").innerHTML="4.- Talentos";
   	dojo.style(dojo.byId('qtr_izquierda1'), "display", "block");
   	    dojo.replaceClass("circled", "circle1");
    } else if(dojo.style(dojo.byId('talentosDiv'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "block");
   	    dojo.style(dojo.byId('botonDelante'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	    dojo.style(dojo.byId('indicador'), "left", "985px");
   	    dojo.style(dojo.byId('bard1'), "display", "block");
   	 dojo.byId("title_mod").innerHTML="5.- Archivos Adjuntos";
   	 dojo.byId("progreso").innerHTML="90%";
   	dojo.style(dojo.byId('qtr_izquierda2'), "display", "block");
   	dojo.style(dojo.byId('ind_progreso'), "left", "15px");
   	    dojo.replaceClass("circlee", "circle1");
    }
	
}
function atras(){
	

	if(dojo.style(dojo.byId('datosPersonalesDiv'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "none");
    } else if(dojo.style(dojo.byId('dataContainer'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "block");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "none");
   	 dojo.style(dojo.byId('bara1'), "display", "none");
   	 dojo.style(dojo.byId('indicador'), "left", "683px");
   	dojo.replaceClass("circleb", "circle0");
   	dojo.byId("progreso").innerHTML="0%";
   	dojo.style(dojo.byId('mitad_derecha'), "display", "none");
    dojo.byId("title_mod").innerHTML="1.- Datos Personales";
    } else if(dojo.style(dojo.byId('exp'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "block");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	 dojo.style(dojo.byId('barb1'), "display", "none");
   	 dojo.style(dojo.byId('indicador'), "left", "755px");
   	dojo.replaceClass("circlec", "circle0");
   	dojo.byId("progreso").innerHTML="25%";
    dojo.byId("title_mod").innerHTML="2.- Formacion Academica";
    dojo.style(dojo.byId('mitad_derecha'), "display", "block");
   	dojo.style(dojo.byId('mitad_derecha'), "height", "26px");
    } else if(dojo.style(dojo.byId('talentosDiv'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "block");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "none");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	 dojo.style(dojo.byId('barc1'), "display", "none");
   	dojo.style(dojo.byId('indicador'), "left", "832px");
   	dojo.replaceClass("circled", "circle0");
   	dojo.byId("progreso").innerHTML="50%";
   	dojo.style(dojo.byId('qtr_izquierda1'), "display", "none");
   	dojo.byId("title_mod").innerHTML="3.- Experiencia Laboral";
    } else if(dojo.style(dojo.byId('uploads'), "display") == "block"){
		dojo.style(dojo.byId('datosPersonalesDiv'), "display", "none");
		dojo.style(dojo.byId('dataContainer'), "display", "none");
   	    dojo.style(dojo.byId('exp'), "display", "none");
   	    dojo.style(dojo.byId('talentosDiv'), "display", "block");
   	    dojo.style(dojo.byId('uploads'), "display", "none");
   	    dojo.style(dojo.byId('botonAtras'), "display", "block");
   	 dojo.style(dojo.byId('botonDelante'), "display", "block");
   	 dojo.style(dojo.byId('bard1'), "display", "none");
   	dojo.style(dojo.byId('indicador'), "left", "908px");
   	dojo.replaceClass("circlee", "circle0");
   	dojo.byId("progreso").innerHTML="75%";
   	dojo.style(dojo.byId('qtr_izquierda1'), "display", "block");
   	dojo.style(dojo.byId('qtr_izquierda2'), "display", "none");
   	dojo.style(dojo.byId('ind_progreso'), "left", "18px");
   	dojo.byId("title_mod").innerHTML="4.- Talentos";
    }
	
}
function agregar_estudio(){
	var nestudios=dojo.attr("nestudios","value");
	nestudios=parseInt(nestudios);
	var nuevoes=parseInt(nestudios+1);
	var new_estudio='<br><div id="formacion_'+nuevoes+'"><div class="label_crear"><label>*Nivel Academico</label></div> <select id="nivelAcademico_'+nuevoes+'" name="nivelAcademico" class="select_input"><option value="primaria">primaria</option><option value="secundaria">secundaria</option></select><br><div class="label_crear"><label>*Institucion Escolar</label></div><input type="text" id="institucion_'+nuevoes+'" name="institucion" class="caja_input"/><br><div class="label_crear"><label>*Pais</label></div><input type="text" id="pais_'+nuevoes+'" name="pais" class="caja_small"/><label>Edo.</label><input type="text"id="estado_'+nuevoes+'" name="estado" class="caja_small"/><br><div class="label_crear"><label>*Lapso de</label></div><div class="fec_container"><select name="diaInicioF" class="combofechas">'+dias()+'</select><select name="mesInicioF" class="combofechas">'+meses()+'</select><select name="anioInicioF" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label id="a">a</label></div><div class="fec_container"><select name="diaFinF" class="combofechas">'+dias()+'</select><select name="mesFinF" class="combofechas">'+meses()+'</select><select name="anioFinF" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label>*Estatus</label></div><input type="text" id="status_'+nuevoes+'" name="status" class="caja_input"/><br></div>';
	var oldestudio="formacion_"+nestudios;
	dojo.place(new_estudio,oldestudio,"after");
	dojo.attr("nestudios","value",nuevoes);

}
function agregar_idioma(){
	var nidiomas=dojo.attr("nidiomas","value");
	nidiomas=parseInt(nidiomas);
	var nuevoidiom=parseInt(nidiomas+1);
	idiomas="<option value=1>Español</option><option value=2>Ingles</option><option value=3>Aleman</option><option value=4>Italiano</option><option value=5>Frances</option><option value=6>Nahuatl</option><option value=7>Otomi</option><option value=8>Chino</option><option value=9>Japones</option><option value=10>Koreano</option>";
	var new_idioma='<br><div id="idioma_'+nuevoidiom+'"><div class="label_crear"><label>*Idioma</label></div> <select name="idiom" class="select_input">'+idiomas+'</select><br><div class="label_crear"><label>*Hablado</label></div><select name="speak" class="select_input"><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option></select><br><div class="label_crear"><label>*Escuchado</label></div><select name="listen" class="select_input"><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option></select><br><div class="label_crear"><label>*Escrito</label></div><select name="write" class="select_input"><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option></select></div><br></div>';
	var oldidioma="idioma_"+nidiomas;
	dojo.place(new_idioma,oldidioma,"after");
	dojo.attr("nidiomas","value",nuevoidiom);
}

function agregar_conocimiento(){
	var nconocimientos=dojo.attr("nconocimientos","value");
	nconocimientos=parseInt(nconocimientos);
	var nuevoconoc=parseInt(nconocimientos+1);
	var new_conocimiento='<br><div id="conocimiento_'+nuevoconoc+'"><div class="label_crear"><label>Otros conocimiento</label></div><input type="text" id="conocimiento_'+nuevoconoc+'" name="conocimiento" class="caja_input"/><br><div class="label_crear"><label>Especificar</label></div><input type="text" id="especificar_'+nuevoconoc+'" name="especificar" class="caja_input"/><br><div class="label_crear"><label>Nivel</label></div><select id="nivel_'+nuevoconoc+'" name="nivel" class="select_input"><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option></select><br><div class="label_crear"><label>Ultima fecha de uso</label></div><select id="fechaUso_'+nuevoconoc+'" name="fechaUso" class="select_input"><option value="0">Menos de un año</option><option value="1">1 año</option><option value="2">2 años</option><option value="3">3 años</option><option value="4">4 años</option><option value="5">5 años</option></select><br></div>';
	var oldconocimiento="conocimiento_"+nconocimientos;
	dojo.place(new_conocimiento,oldconocimiento,"after");
	dojo.attr("nconocimientos","value",nuevoconoc);
}
function agregar_empresa(){
	var nempresa=dojo.attr("nempresa","value");
	nempresa=parseInt(nempresa);
	var nuevaempresa=parseInt(nempresa+1);
	var new_empresa='<br><div id="experiencia_'+nuevaempresa+'"><div class="label_crear"><label>*Nombre</label></div><input type="text" id="nombreEmpresa_'+nuevaempresa+'" name="nombreEmpresa" class="caja_input"/><br><div class="label_crear"><label>*Puesto</label></div><input type="text" id="puesto_'+nuevaempresa+'" name="puesto" class="caja_input"/><br><div class="label_crear"><label>*Periodo de</label></div><div class="fec_container"><select name="diaInicioE" class="combofechas">'+dias()+'</select><select name="mesInicioE" class="combofechas">'+meses()+'</select><select name="anioInicioE" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label id="a">a</label></div><div class="fec_container"><select name="diaFinE" class="combofechas">'+dias()+'</select><select name="diaFinE" class="combofechas">'+meses()+'</select><select name="anioFinE" class="combofechas">'+anios()+'</select></div><br><div class="label_crear"><label>*Sueldo</label></div><input type="text" id="sueldoEmpresa_'+nuevaempresa+'" name="sueldoEmpresa" class="caja_input"/><br><div ><label>Detalle brevemente sus funciones</label></div><textarea id="funcionesEmpresa_'+nuevaempresa+'" name="funcionesEmpresa" cols="40" rows="3" class="area_input"></textarea><div ><label>Mencione los motivos de su salida</label></div><textarea id="motivosSalida_'+nuevaempresa+'" name="motivosSalida" cols="40" rows="3" class="area_input"></textarea></div>';
	var oldempresa="experiencia_"+nempresa;
	dojo.place(new_empresa,oldempresa,"after");
	dojo.attr("nempresa","value",nuevaempresa);
	
}
function ver_perfil(){
	document.location.href="/BolsaDeTrabajoIusacell/HomeUsuario";
}

function unchecky1(){document.getElementById("IUSACheckn").checked = false;mostrar_preguntas();}
function uncheckn1(){document.getElementById("IUSAChecky").checked = false;mostrar_preguntas();}
function unchecky2(){document.getElementById("IUSA2Checkn").checked = false;mostrar_preguntas();}
function uncheckn2(){document.getElementById("IUSA2Checky").checked = false;mostrar_preguntas();}


function mostrar_preguntas(){
	if(document.getElementById("IUSACheckn").checked == true){
		$("#salinasYN2").show();
	}else if(document.getElementById("IUSACheckn").checked == false){
		$("#salinasYN2").hide();
	}
	
	if(document.getElementById("IUSAChecky").checked == true || document.getElementById("IUSA2Checky").checked == true){
		$("#noEmpleadoDiv").show();
	}else if(document.getElementById("IUSAChecky").checked == false || document.getElementById("IUSA2Checky").checked == false){
		$("#noEmpleadoDiv").hide();
	}
	
}

function dias(){
  var cadena_dias="<option>dia</option>";
  var i=0;
  for(i=1;i<=31;i++){
	  cadena_dias=cadena_dias+"<option>"+i+"</option>";
  }
	return cadena_dias;
}	

function meses(){
     var cadena_mes="<option>mes</option>";
	 var i=0;
	 for(i=1;i<=12;i++){
		  cadena_mes=cadena_mes+"<option>"+i+"</option>";
	  }
		return cadena_mes;
	
}

function anios(){
	var cadena_anio="<option>año</option>";
	var i=0;
	for(i=2012;i>=1900;i--){
		var cadena_anio=cadena_anio+"<option>"+i+"</option>";
    }
		return cadena_anio;
}



	function calcularRFC(){
		//var fechaNacimiento=$("#fechaNacimiento").val();
		//var fechanacimientoAux=fechaNacimiento.split("/");
		
		var anioNacimiento=$("#anio").val();
		var digitos_anio=anioNacimiento.substring(2,4);
		var mesNacimiento=$("#mes").val();
		  if(mesNacimiento<10){
			   mesNacimiento="0"+mesNacimiento;
		   }
		var diaNacimiento=$("#dia").val();
		    if(diaNacimiento<10){
			      diaNacimiento="0"+diaNacimiento;
		     }
		
		var apellidoPaterno=$("#apellidoPaterno").val();
		var apellidoMaterno=$("#apellidoMaterno").val();
		var nombre=$("#nombre").val();
		var inicial=nombre.substring(0,1);
		var inicialApellidoP=apellidoPaterno.substring(0,1);
		var inicialApellidoM=apellidoMaterno.substring(0,1);
		var vocal="";
		var i=0;
		var apellidoPaternoAux=apellidoPaterno.split("");
		for(i=1;i<apellidoPaternoAux.length;i++){
			var aux=apellidoPaternoAux[i];
			//var buscar="/[^aeiou]/";
			if((aux=="a")||(aux=="e")||(aux=="i")||(aux=="o")||(aux=="u")){
				vocal=aux;
				break;
			}else{
				continue;
			}
			
		}
		inicialApellidoP=inicialApellidoP.toUpperCase();
		vocal=vocal.toUpperCase();
		inicialApellidoM=inicialApellidoM.toUpperCase();
		inicial=inicial.toUpperCase();
		var iniciales=palabra(inicialApellidoP,vocal,inicialApellidoM,inicial);
		iniciales=iniciales.toUpperCase();
		var rfcp=iniciales+""+digitos_anio+""+mesNacimiento+""+diaNacimiento;
		$("#rfc").val(rfcp);
	}
	
	function palabra(patIni,vocal,matIni,nomIni){
		var iniciales=patIni+""+vocal+""+matIni+""+nomIni;
		var altisonantes=["BACA","BAKA","BUEY","BUEI","CACA","CAGO","CAGA","CAGO","CAKA","CAKO","COGE","COGI","COJA","COJE","COJI","COJO","COLA","CULO","FALO","FETO","GETA","GUEY","GUEI","JETA","JOTO","KACA","KACO","KAGA","KAGO","KAKA","KAKO","KOGE","KOGI","KOJA","KOJE","KOJI","KOJO","KOLA","KULO","LILO","LOCA","LOCO","LOKA","LOKO","MAME","MAMO","MEAR","MEAS","MEON","MIAR","MION","MOCO","MOKO","MULA","MULO","NACA","NACO","PEDA","PEDO","PENE","PIPI","PITO","POPO","PUTA","PUTO","QULO","RATA","ROBA","ROBE","ROBO","RUIN","SENO","TETA","VACA","VAGO","VAGA","VACA","VUEI","VUEY","WUEI","WUEY"];
		
		for(var i=0;i<altisonantes.length;i++){
			var aux=altisonantes[i];
			if(iniciales==aux){
				vocal="X";
				iniciales=patIni+""+vocal+""+matIni+""+nomIni;
				break;
			}else{continue;}
		}
		return iniciales;
	}
	
	function talent_counter(box){
		var tcounter=parseInt($("#tcounter").val());
		if(tcounter<5){
			tcounter=parseInt(tcounter+1);
			$("#tcounter").val(tcounter);
		}else{
			alert("ya has marcado 5 talentos");
			document.getElementById(box).checked = false;
		}
	}
    function talent_discounter(){
    	var tcounter=parseInt($("#tcounter").val());
    	if(tcounter>0){
    	tcounter=parseInt(tcounter-1);
    	$("#tcounter").val(tcounter);
    	}
    }



     