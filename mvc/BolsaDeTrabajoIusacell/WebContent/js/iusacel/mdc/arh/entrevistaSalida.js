var arr = new Array(3);

$(document).ready(function(){
	
	var nomEmpleado = $("input[name = 'nomEmpleado']").val();
	var numEmpleadoBaja = $("input[name = 'numEmpleadoBaja']").val();
	var puestoEmpleado = $("input[name = 'puestoEmpleado']").val();
	var nomJefeInmediato = $("input[name = 'nomJefeInmediato']").val();
	var folio = $("input[name = 'folio']").val();
	var capitalHumano = $("input[name = 'capitalHumano']").val();
	
	$("#nempleado").html(nomEmpleado);
	$("#num_emple").html(numEmpleadoBaja);
	$("#puesto").html(puestoEmpleado);
	$("#jefe_inmedito").html(nomJefeInmediato);
	
	waitingGral();
	$.get(getURLBolsa()+"/obtenerCuestionario", 
		{ folio: folio, nomEmpleado: nomEmpleado, numEmpleadoBaja: numEmpleadoBaja, 
		puestoEmpleado: puestoEmpleado, nomJefeInmediato: nomJefeInmediato, capitalHumano: capitalHumano },
		prepararRespuesta);
	
});

function waitingGral(){
	document.getElementById('cargaMod').style.height=screen.availHeight-100;
	document.getElementById('cargaMod').style.width=screen.availWidth+"px";
	document.getElementById('cargaMod').style.display=""; //hmm_12042012

}

function stopWaitingGral(){
	document.getElementById('cargaMod').style.display="none"; //yoc_25112013

}

function prepararRespuesta(data){
	
	var ta = screen.availWidth-70;
	var te = screen.availWidth-150;
	var alt = screen.availHeight-450;
	
	var respuesta = $(data).find("cuestionario").text();
	$("#divEntrevista").replaceWith(respuesta);
	stopWaitingGral();
	obtenerCuestionarioData();
	$('#entrevistaCalidad').show();
	$('#divEntrevista').css("width",te+"px");
	$('#divEntrevista').css("height",alt+"px");
	$('#entrevistaCalidad').css("width",ta+"px");
	$('#datosEmpleado').show();
	$('#mensajeEmpresa').show();

}
function mostrarResultadoExito(data){
	
	$('#datosEmpleado').hide();
	$('#mensajeEmpresa').hide();
	var respuesta = $(data).find("cuestionario").text();
	$("#divEntrevistaCont").replaceWith(respuesta);
	$('#entrevistaCalidad').css("padding-top","120px");
	$('#contenedor').css("margin-top","50px");
	$('#contenedor').css("height","180px");
	$('#contenedor').css("width","500px");
	$('#promocion').css("padding-top","50px");
	stopWaitingGral();
	//obtenerCuestionarioData();
	
}


function get_selected_opc_preg1(){
	if(  $( "#select1" ).val() != 0 ){
		//var preg = 1;
		var txt = $( "#select1 option:selected" ).text();
		var resp = txt;
		$('#pregunta1').val( resp );
	}
}

function obtenerCuestionarioData(){
	$('input[name=pregunta2]').on('change', function (e) {
		//var preg = 2;
		var txt = e.currentTarget.nextSibling.data;
		var resp = txt;
		$('#pregunta2').val( resp );
	});
	
	var i=0;
	//var arr = new Array(3);
	$('input[name=pregunta3]').on('change', function (e) {
		if(i < 3){
			if( this.checked ) {
				arr[i] = (this.nextSibling.data);
				$('#pregunta3').val( arr );
				i++;
			} else if( !this.checked ){
				var ppos = arr.indexOf(this.nextSibling.data);
				arr.splice(ppos, 1);
				$('#pregunta3').val( arr );
				i--;
			}
		} else if(i >= 3){
			if( !this.checked ){
				var ppos = arr.indexOf(this.nextSibling.data);
				arr.splice(ppos, 1);
				$('#pregunta3').val( arr );
				i--;
			} else {
				this.checked = false;
			}
		} 
	});
	
	$('input[name=pregunta4]').on('change', function (e) {
		var id = e.currentTarget.attributes[1].nodeValue;
		var txt = e.currentTarget.nextSibling.data;
		var input="";
		if(id == 1 ){
			input = $('#opc_preg4').find('input[type=text]').val();
			if( input != "" ){
				var resp = txt+","+input;
				$('#pregunta4').val( resp );
			} else {
				//agregar estilo para indicar que no se ha capturado ningun valor
				var men = prompt(txt,"");
				if(men==null || men == ""){
					$(this).prop('checked', false);
					alert('El campo no puede quedar vacío');
				}else{
					var resp = txt+","+men;
					$('#opc_preg4').find('input[type=text]').val(men);
					$('#pregunta4').val( resp );
				}
				
			}
		} else {
			$('#opc_preg4').find('input[type=text]').val("");
			var resp = txt;
			$('#pregunta4').val( resp );
		}
	});
	
	$('input[name=pregunta5]').on('change', function (e) {
		var id = e.currentTarget.attributes[1].nodeValue;
		var txt = e.currentTarget.nextSibling.data;
		var input="";
		if(id == 1 ){
			input = $('#opc_preg5').find('input[type=text]').val();
			if( input != "" ){
				var resp = txt+","+input;
				$('#pregunta5').val( resp );
			} else {
				//agregar estilo para indicar que no se ha capturado ningun valor
				var men = prompt(txt,"");
				if(men==null || men == ""){
					$(this).prop('checked', false);
					alert('El campo no puede quedar vacío');
				}else{
					var resp = txt+","+men;
					$('#opc_preg5').find('input[type=text]').val(men);
					$('#pregunta5').val( resp );
				}
			}
		} else {
			$('#opc_preg5').find('input[type=text]').val("");
			var resp = txt;
			$('#pregunta5').val( resp );
		}
	});
	
	$('input[name=pregunta6]').on('change', function (e) {
		var id = e.currentTarget.attributes[1].nodeValue;
		var txt = e.currentTarget.nextSibling.data;
		var input="";
		if(id == 1 ){
			input = $('#opc_preg6').find('input[type=text]').val();
			if( input != "" ){
				var resp = txt+","+input;
				$('#pregunta6').val( resp );
			} else {
				//agregar estilo para indicar que no se ha capturado ningun valor
				var men = prompt(txt,"");
				if(men==null || men == ""){
					$(this).prop('checked', false);
					alert('El campo no puede quedar vacío');
				}else{
					var resp = txt+","+men;
					$('#opc_preg6').find('input[type=text]').val(men);
					$('#pregunta6').val( resp );
				}
			}
		} else {
			$('#opc_preg6').find('input[type=text]').val("");
			var resp = txt;
			$('#pregunta6').val( resp );
		}
	});
	
	$('input[name=pregunta7]').on('change', function (e) {
		var id = e.currentTarget.attributes[1].nodeValue;
		var txt = e.currentTarget.nextSibling.data;
		var input="";
		if(id == 0 ){
			input = $('#opc_preg7').find('input[type=text]').val();
			if( input != "" ){
				var resp = txt+","+input;
				$('#pregunta7').val( resp );
			} else {
				//agregar estilo para indicar que no se ha capturado ningun valor
				var men = prompt(txt,"");
				if(men==null || men == ""){
					$(this).prop('checked', false);
					alert('El campo no puede quedar vacío');
				}else{
					var resp = txt+","+men;
					$('#opc_preg7').find('input[type=text]').val(men);
					$('#pregunta7').val( resp );
				}
			}
		} else {
			$('#opc_preg7').find('input[type=text]').val("");
			var resp = txt;
			$('#pregunta7').val( resp );
		}
	});
	
	$('input[name=pregunta8]').on('change', function (e) {
		var id = e.currentTarget.attributes[1].nodeValue;
		var txt = e.currentTarget.nextSibling.data;
		var input="";
		if(id == 1 ){
			input = $('#opc_preg8').find('input[type=text]').val();
			if( input != "" ){
				var resp = txt+","+input;
				$('#pregunta8').val( resp );
			} else {
				//agregar estilo para indicar que no se ha capturado ningun valor
				var men = prompt(txt,"");
				if(men==null || men == ""){
					$(this).prop('checked', false);
					alert('El campo no puede quedar vacío');
				}else{
					var resp = txt+","+men;
					$('#opc_preg8').find('input[type=text]').val(men);
					$('#pregunta8').val( resp );
				}
			}
		} else {
			$('#opc_preg8').find('input[type=text]').val("");
			var resp = txt;
			$('#pregunta8').val( resp );
		}
	});
	
	$('input[name=pregunta9]').keyup(function(event) {
		var message =  $('#input_preg9').val();
		$('#pregunta9').val( message );
	});
	
}

var p10="";
function seleccionarValor( field ){
	if(typeof field != 'undefined'){
		$(field).parent().parent().find('input[type=hidden]').val( $(field).val() );
		p10 += $(field).val();
		p10 += ",";
		var input_size = $(field).parent().parent().parent().find('input[type=hidden]').length;
		var resp="";
		
		for(var z=1; z<=input_size; z++){
			resp += $(field).parent().parent().parent().find('input[id='+z+']').val();
			if(z<input_size){
				resp += ",";				
			}
		}
		//console.log(resp);
		$('#pregunta10').val( resp );
	}
}


function guardaCuestionario(){
	var cuest_size = $('#contEntrevista > div').size();
	var cuest="";
	for(var i=1; i<=cuest_size; i++){
		if( i == 3 || i == 10 ){
			var arr3 = new Array();
			arr3 = $('#pregunta'+i).val().split(',');
			if(i==3){
				if(arr3.length < 3){
					alert( "Debes seleccionar tres opciones para la pregunta " + i );
				} else {
					for(var j=0;j<arr3.length;j++){
						if( arr3[j] == "" ){
							alert( "Debes seleccionar tres opciones para la pregunta " + i );
							return false;
						}
					}
				}
			}
			if(i==10){
				if(arr3.length < 10){
					alert( "Debes seleccionar tres opciones para la pregunta " + i );
				} else {
					for(var j=0;j<arr3.length;j++){
						if( arr3[j] == "" ){
							alert( "Debes seleccionar tres opciones para la pregunta " + i );
							return false;
						}
					}
				}
			}
			
		} else if( $('#pregunta'+i).val() == "" ){
			alert( "Selecciona ó captura una respuesta para la pregunta " + i );
			break;
		}
		cuest += $('#pregunta'+i).val();
		
		if( i < cuest_size ){
			cuest += ";";
		}
		
	}
	var arr_cuest = cuest.split(';');
	if(arr_cuest.length == cuest_size){
		
		//var nomEmpleado = $("input[name = 'nomEmpleado']").val();
		//var puestoEmpleado = $("input[name = 'puestoEmpleado']").val();
		//var nomJefeInmediato = $("input[name = 'nomJefeInmediato']").val();
		var numEmpleadoBaja = $("input[name = 'numEmpleadoBaja']").val();
		var folio = $("input[name = 'folio']").val();
		
		waitingGral();
		$.get(getURLBolsa()+"/botonGuardarCuestionarioResp",
				{cuest: cuest, folio: folio, numEmpleadoBaja: numEmpleadoBaja },
				mostrarResultadoExito);
	} else {
		alert('Por favor verifica el cuestionario.');
	}
	
}

/*
Alto de pantalla screen.height
Ancho de pantalla screen.width
Alto de área de documento document.body.clientHeight;
Ancho de área de documento document.body.clientWidth;
Alto disponible para ventana screen.availHeight
Ancho disponible para ventana screen.availWidth
Ancho total de documento document.body.offsetWidth;
Alto total de documento  document.body.offsetHeight;
*/
function pantalla(){
	
//	var restar =  navegador();
//	var altoTotal = screen.availHeight-restar;
//	var altoTotal = screen.availHeight-restar;
	var objPrincipal = document.getElementById('contenidoPrincipal');
	var ancho=screen.width-60;//-0;   //240;//los 67 hacen referencia a los laterales del body
	
	var izquierda = (ancho / 2)-300;
	var arriba = 128 + (774/2) - 300;
	
	objPrincipal.style.width = 600 + "px";
	objPrincipal.style.height= 600 + "px" ;
	objPrincipal.style.left = izquierda + "px";
	objPrincipal.style.top = arriba + "px";
	objPrincipal.style.background = "#DFDFDF";
	
	document.getElementById ( 'contenidoPrincipal'). style.paddingRight = '0px';
	
	var objLateralIzq = document.getElementById('barraLateralIzq');
	objLateralIzq.style.left = 0 + "px";
	objLateralIzq.style.top = 128 + "px";
	objLateralIzq.style.height=(774 + "px");

	var objLateralDer = document.getElementById('barraLateralDer');
	objLateralDer.style.left = screen.width - 30 + "px";
	objLateralDer.style.top = 128 + "px";
	objLateralDer.style.height=(774 + "px");
	
}

