$(document).ready(function(){
	

	$("#palabra_bus_cla").Watermark("Palabra de búsqueda");
	$("#localidad_bus").Watermark("Localidad");
	traerDestacados();
	
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
		
		$("#dialog_ejemplo").dialog({
		    open: function(event, ui) {},
		    close: function(event, ui) {},
		    bgiframe: true,
		    autoOpen: false,
		    modal: true,
		    height: 680,
		    width: 1000,
		    resizable: false,
		    draggable: false,
		    show: "blind",
			hide: "explode",
		    position: 'center',
		    buttons: {
		        'Cerrar': function() {
		              $(this).dialog('close');
		                    
		        }
		    }
		 });
	 
	 $(".emergente").click(function(){
		var num_folio = $(this).attr('id');
		$("#num_vac").text(num_folio);
		JsonAndAjax(num_folio);
		$( "#dialog_vacante" ).dialog( "open");
	});
	 
	 $("#mostrarEjemplo").click(function(){
		 $("#dialog_ejemplo").dialog("open");
	 });
	 
	 
	 $("div.example").mouseover(function(){
		 quitar_bordes();
		 $(this).css("border","1px solid crimson");
		 var id=$(this).attr("id");
		 mostrarEjemplo(id);
	 });
	 
	 
	 
	
});


function quitar_bordes(){
	
	 $("div.example").each(function(){
		 
		 $(this).css("border","none");
		 
	 });
	
	
}

function mostrarEjemplo(id){
	
	if(id=="personalesEjemplo"){
		dibujarZoom("200px","382px","-143px","-20px","1030px");
		$("#descText").text("En esta sección podrás dar de alta y editar tu información personal .");
	}else if(id=="ubicacionEjemplo"){
		dibujarZoom("200px","382px","-143px","-425px","1030px");
		$("#descText").text("Aquí  se da de alta la información de contacto, así como tu dirección y datos que se piden para ubicarte.");
	}else if(id=="idiomasEjemplo"){
		dibujarZoom("200px","180px","-143px","-830px","1030px");
		$("#descText").text("En esta sección se da de alta los idiomas que domines y asígnales un porcentaje. ");
	}else if(id=="empleoEjemplo"){
		dibujarZoom("221px","500px","-229px","-4px","678px");
		$("#descText").text("La barra de tiempo que se muestra en color negro, es tu línea de tiempo en años;  en la parte superior estará tu experiencia laboral y en la parte inferior se encuentran tus estudios realizados. Da click en editar y luego da de alta tanto tu experiencia laboral como tu educación.");
	}else if(id=="talentosEjemplo"){
		dibujarZoom("228px","230px","-685px","-22px","861px");
		$("#descText").text("En esta gráfica podrás editar y dar de alta los principales talentos que tengas, asignarles un color y así manejar un porcentaje a cada talento, esto nos sirve para que nuestra área de recursos humanos pueda identificar mejor tus talentos.");
	}else if(id=="personalidadEjemplo"){
		dibujarZoom("220px","208px","-714px","-293px","900px");
		$("#descText").text("En esta sección podrás  dar de alta aptitudes en tu personalidad de una manera fácil e intuitiva.");
	}else if(id=="hobbiesEjemplo"){
		dibujarZoom("230px","164px","-637px","-448px","800px");
		$("#descText").text("En esta sección podrás seleccionar iconos representativos  de hobbies que tengas o practiques y darlos de alta.");
	}else if(id=="softwareEjemplo"){
		dibujarZoom("200px","220px","-815px","-792px","1030px");
		$("#descText").text("Da de alta el software que manejes, siempre es importante saber qué software dominas y tu nivel de experiencia en éste.");
	}else if(id=="habilidadesEjemplo"){
		dibujarZoom("115px","220px","-1020px","-792px","1030px");
		$("#descText").text("Da de alta los aspectos más importantes con respecto a las habilidades que tengas. ");
	}else if(id=="preferenciasEjemplo"){
		dibujarZoom("100px","343px","-1142px","-20px","1030px");
		$("#descText").text("En esta sección se indicará el salario deseado y el horario preferido que más comodidad brinde.");
	}else if(id=="disposicionEjemplo"){
		dibujarZoom("100px","412px","-1142px","-367px","1030px");
		$("#descText").text("Indícanos si estás dispuesto a viajar y a cambiar de residencia. ");
	}else if(id=="areaEjemplo"){
		dibujarZoom("99px","220px","-1142px","-792px","1030px");
		$("#descText").text("Indícanos en esta sección en qué área te gustaría desarrollarte según tus intereses.");
	}
	
}

function dibujarZoom(h,w,y,x,bg){
	$("#exampleZoomImage").css("height",h);
	$("#exampleZoomImage").css("width",w);
	$("#exampleZoomImage").css("background-position",""+x+" "+y+"");
	$("#exampleZoomImage").css("background-size",bg);
}


function JsonAndAjax(num_folio) {
	 $.getJSON('json/giveMeJsonData' ,
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

function traerDestacados(){
	 
	 $.getJSON('json/Destacados',
	     function(jsonDataDPS) {
	  
	    for(j=0;j<=(jsonDataDPS.items.length)-1;j++){
	     
	    	if(jsonDataDPS.items[j].areaG.length > 20){
	    	      $("#contieneDestacados").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataDPS.items[j].folioG+"' class='emergente' title='"+jsonDataDPS.items[j].nombreG+"'>"+jsonDataDPS.items[j].nombreG.slice(0,20)+"..."+"</a><p>"+jsonDataDPS.items[j].ubicacionG+"</p></li>");
	    	     }else{
	    	      $("#contieneDestacados").append("<li><a style='background-position: 0 -3px; cursor:pointer;' id='"+jsonDataDPS.items[j].folioG+"' class='emergente' title='"+jsonDataDPS.items[j].nombreG+"'>"+jsonDataDPS.items[j].nombreG+"</a><p>"+jsonDataDPS.items[j].ubicacionG+"</p></li>");
	    	     }
	     
	    }
	  
	    
	    $(".emergente").click(function(){
	     var num_folio = $(this).attr('id');
	     $("#num_vac").text(num_folio);
	     JsonAndAjax(num_folio);
	     $( "#dialog_vacante" ).dialog( "open");
	    });
	  
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
	