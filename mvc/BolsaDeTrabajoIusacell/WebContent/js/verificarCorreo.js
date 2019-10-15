$(document).ready(function(){
	
	$("#imail").blur(function(){
		var imail=$(this).val();
		verificarCorreo(imail);
	});
	
});

function verificarCorreo(imail){
	 $.getJSON('json/jsonCorreo' ,
			  {num_folio: num_folio},
			  function(jsonData) {
				 var correo=jsonData.items[0].nombre;
				 if(correo==null||correo==""){
					 alert("Correo Valido");
				 }else{
					 alert("Correo no valido");
					 $("#imail").val("");
				 }
			  }
			 );
			 return false;

}