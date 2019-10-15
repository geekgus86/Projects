$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	
	
	
	$("#palabraClave").Watermark("Palabra Clave");
	$("#ciudad").Watermark("Ciudad");
	
	
	$("#estado2").change(function (){
		var id_estado = $(this).val(); 
		
		lipiaMunicipios();
		traerMunicipio(id_estado);
		
		
		var txtEstado = $("#estado2 option:selected").html();
		$("#estado").val("");
		$("#estado").val(txtEstado);
		
	});
	
	
	
	$("#consejoPalabraClave").simpletip({
		content:'Puedes Insertar en la Palabra Clave: Area Interes, Area de Formacion, Estado o Municipio ',
		fixed: true, position: 'top' 
	});
	
	$("#consejoAreaInteresAlterna").simpletip({
		content:'Seleccionar otra area de Interes para complementar tu Busqueda, todos los Postulantes poseen una Area de Interes alterna',
		fixed: true, position: 'top' 
	});
	
	
	
});



function traerMunicipio(id_estado){
	
	var  municipioOrdenado = new Array();
	
	
	
	 $.getJSON('json/verMunicipio',{id_estado: id_estado},
			  function(jsonDataMNP) {
		 		
				 for(l=0;l<=(jsonDataMNP.items.length)-1;l++){
					 municipioOrdenado [l] = jsonDataMNP.items[l].municipio;
					
				}
				 
				 municipioOrdenado.sort();
				 
				 
		
		 		for(j=0;j<=(jsonDataMNP.items.length)-1;j++){
		 				$("#municipio").append('<option value="'+ municipioOrdenado[j] +'">'+municipioOrdenado[j]+'</option>');
		 		}
		 
			  

	 		 });
	return false;
	
}


function lipiaMunicipios(){
	document.getElementById("municipio").options.length = 1;
};