$(document).ready(function(){
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
	
	 
	 
});

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


