

$(document).ready(function(){
	
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
	
	
	
	
	$(".emergente").click(function(){
		var num_folio = $(this).attr('id');
		$("#num_vac").text(num_folio);
		JsonAndAjaxDetalleVacante(num_folio);
		$( "#dialog_vacante" ).dialog( "open");
	});
	
	
	
	
	
});



function JsonAndAjaxDetalleVacante(num_folio) {
	 $.getJSON('json/giveMeJsonDataDetalleVac' ,
	  {num_folio: num_folio},
	  function(jsonData) {
		  
		  if(jsonData.items[0].nombre ==""){
			  $("#labelNom").hide();
			  $("#nom_vac").hide();
		  }else{
			  $("#nom_vac").text(jsonData.items[0].nombre);
		  }
		  
		  
		  
		  if(jsonData.items[0].texto ==""){
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
		  
		  
		  
		  if(jsonData.items[0].conocimientos ==""){
			  $("#labelCon").hide();
			  $("#conocimient").hide();
		  }else{
			  $("#conocimient").text(jsonData.items[0].conocimientos);
		  }
		  
		  
		  if(jsonData.items[0].talentos ==""){
			  $("#labelTal").hide();
			  $("#talent").hide();
		  }else{
			  $("#talent").text(jsonData.items[0].talentos);
		  }
		  
		  
		  if(jsonData.items[0].ubicaciones =="" || jsonData.items[0].ubicaciones =="---"){
			  $("#labelUbi").hide();
			  $("#ubicati").hide();
		  }else{
			  $("#ubicati").text(jsonData.items[0].ubicaciones);
		  }
		  
		  
		  if(jsonData.items[0].area ==""){
			  $("#labelAre").hide();
			  $("#are_exp").hide();
		  }else{
			  $("#are_exp").text(jsonData.items[0].area);
		  }
		  
		  if(jsonData.items[0].funciones ==""){
			  $("#labelPrin").hide();
			  $("#prin_fun").hide();
		  }else{
			  $("#prin_fun").text(jsonData.items[0].funciones);
		  }
		  
		  
		  if(jsonData.items[0].sueldo == '0'){
			  $("#salario").text("A tratar en la Entrevista");
		  }else{
			  $("#salario").text("$"+jsonData.items[0].sueldo);
		  }
		  
		  if(jsonData.items[0].horario ==""){
			  $("#labelHor").hide();
			  $("#horario").hide();
		  }else{
			  $("#horario").text(jsonData.items[0].horario);
		  }
		  
		  if(jsonData.items[0].edad ==""){
			  $("#labelEda").hide();
			  $("#edad").hide();
		  }else{
			  $("#edad").text(jsonData.items[0].edad);
		  }
		  
		  if(jsonData.items[0].observaciones =="" || jsonData.items[0].observaciones =="Sin Observaciones"){
			  $("#labelObs").hide();
			  $("#observaciones").hide();
		  }else{
			  $("#observaciones").text(jsonData.items[0].observaciones);
		  }
		  
		  
		  if(jsonData.items[0].fecha ==""){
			  $("#labelFec").hide();
			  $("#fecha").hide();
		  }else{
			  $("#fecha").text(jsonData.items[0].fecha);
		  }
		  
		  
		  
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

