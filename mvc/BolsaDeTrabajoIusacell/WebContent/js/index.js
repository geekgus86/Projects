$(document).ready(function(){
	
	
	var pathname = window.location.pathname;
	var sitio="";
	var patharray=pathname.split("/");
	
	for(var i=0;i<patharray.length;i++){
		var k=patharray[i];
		if(k=="perfil"||k=="perfilVista"||k=="Candidaturas"||k=="login"||k=="mejora_la_web"){
			sitio=k;
			break;
		}
	}
	
	
	if(sitio!="mejora_la_web"){
		version_explorer();
	}
	traerVideos();
	ObtenerPorcentaje();
	if((sitio=="perfil")||(sitio=="perfilVista")){
		  $("#MiInfografia").css('background-image','url("images/raya_gris.png")');
		  $("#MiInfografiaLink").css("color","black");
		 }else if(sitio=="Candidaturas"){
		  $("#MisCandidaturas").css('background-image','url("images/raya_gris.png")');
		  $("#MisCandidaturasLink").css("color","black");
		 }else{
		  $("#Bienvenido").css('background-image','url("images/raya_gris.png")');
		  $("#BienvenidoLink").css("color","black");
		 }
	
	
	$("div.sesionmenurow").mouseover(function(){
		
	$(this).css("background-color","");
		
		
	});
	
	$("div.sesionmenurow").mouseleave(function(){
		
		$(this).css("background-color","");
		   
		  if((sitio=="perfil")||(sitio=="perfilVista")){
		   $("#MiInfografia").css('background-image','url("images/raya_gris.png")');
		   $("#MiInfografiaLink").css("color","black");
		  }else if(sitio=="Candidaturas"){
		   $("#MisCandidaturas").css('background-image','url("images/raya_gris.png")');
		   $("#MisCandidaturasLink").css("color","black");
		  }else if(sitio=="login"||sitio=="doLogin"){
		   $("#Bienvenido").css('background-image','url(images/raya_gris.png)');
		   $("#BienvenidoLink").css("color","black");
		   
		  }
			
		});
	
	$("div.menurow").mouseover(function(){
		
		$(this).css("background-color","crimson");
			
			
		});
	
	$("div.opcionmenurow").mouseover(function(){
		$(this).css("background-color","crimson");
	});
	
	
	
	$("div.opcionmenurow").mouseleave(function(){
		$(this).css("background-color","gray");
	});
	
	
	$("div.menurow").mouseleave(function(){
		
		$(this).css("background-color","gray");
			
			
		});
	
	
	$("#dialog_video_iusa").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 450,
	     width: 650,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	         'Aceptar': function() {
	               $(this).dialog('close');
	                     
	         }
	     }
	  });
	 
	 $("#dialog_video_unefon").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 450,
	     width: 650,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	         'Aceptar': function() {
	               $(this).dialog('close');
	                     
	         }
	     }
	  });
	 
	 $("#dialog_video_enlace").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 450,
	     width: 650,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	         'Aceptar': function() {
	               $(this).dialog('close');
	                     
	         }
	     }
	  });
	 
	 $("#dialog_video_total").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 450,
	     width: 650,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	         'Aceptar': function() {
	               $(this).dialog('close');
	                     
	         }
	     }
	  });
	 
	 $("#dialog_video_capla").dialog({
	     open: function(event, ui) {},
	     close: function(event, ui) {},
	     bgiframe: true,
	     autoOpen: false,
	     modal: true,
	     height: 450,
	     width: 650,
	     resizable: false,
	     draggable: false,
	     show: "blind",
	  hide: "explode",
	     position: 'center',
	     buttons: {
	         'Aceptar': function() {
	               $(this).dialog('close');
	                     
	         }
	     }
	  });
	
	$("#dialog_terminos").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 250,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Aceptar': function() {
	              $(this).dialog('close');
	                    
	        }
	    }
	 });
	
	
	$("#dialog_condiciones").dialog({
	    open: function(event, ui) {},
	    close: function(event, ui) {},
	    bgiframe: true,
	    autoOpen: false,
	    modal: true,
	    height: 550,
	    width: 550,
	    resizable: false,
	    draggable: false,
	    show: "blind",
		hide: "explode",
	    position: 'center',
	    buttons: {
	        'Aceptar': function() {
	              $(this).dialog('close');
	                    
	        }
	    }
	 });

	$("input.textos").keyup(function(){
		var valor=$(this).val();
		valor=valor.toUpperCase();
		$(this).val(valor);
	});
	
	
	
	
	
});



/* FUNCIONES PARA LOS CUADRO DE DIALOGO CON LOS VIDEOS*/

function video_iusa(){
	$( "#dialog_video_iusa" ).dialog( "open" );
}

function video_unefon(){
	$( "#dialog_video_unefon" ).dialog( "open" );
}

function video_enlace(){
	$( "#dialog_video_enlace" ).dialog( "open" );
}

function video_tota(){
	$( "#dialog_video_total" ).dialog( "open" );
}

function video_capla(){
	$( "#dialog_video_capla" ).dialog( "open" );
}


function terminos(){
	$( "#dialog_terminos" ).dialog( "open" );
}


function condiciones(){
	$( "#dialog_condiciones" ).dialog( "open" );
}

function ObtenerPorcentaje(){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerPorcentaje", {},
			  function(jsonData) {
		        var porcentaje=jsonData.items[0].porcentaje;
		        var width=(parseInt(porcentaje)+parseInt(150))/100;
			       $("#userTotalProgress").animate({width: porcentaje+"%"}, 1500 );
		        $("#userprogress").text( porcentaje+"% Perfil Completado");
		       
	  });
		      
}


function traerVideos(){
	
	$.getJSON('json/TraerVideos',
			  function(jsonDataTV) {
				var donde
		
				
				
				
				
				
				for(j=0;j<=(jsonDataTV.items.length)-1;j++){
					
					 donde = jsonDataTV.items[j].donde_va;
				      
				     
				     
				     if(donde == 'login_principal'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#primerVidIusa").attr("src",element1[1]+ "?rel=0");
				      }
				      

				     }else if(donde == 'dialog_iusacell'){
				      
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroIusa").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoIusa").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroIusa").attr("src","");
				       $("#elemntLogoIusa").val(element1[1]);
				      }
				      
				      
				      
				      
				     }else if(donde == 'dialog_unefon'){
				      
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroUnefon").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoUne").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroUnefon").attr("src","");
				       $("#elemntLogoUne").val(element1[1]);
				      }
				      
				      
				      
				     }else if(donde == 'dialog_total'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroTota").attr("src",element1[1]+ "?rel=0");
				       $("#elemntTotalLogo").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroTota").attr("src","");
				       $("#elemntTotalLogo").val(element1[1]);
				      }
				      
				      
				      
				     }else if(donde == 'dialog_capla'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroCapla").attr("src",element1[1]+ "?rel=0");
				       $("#elemntCaptaLogo").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroCapla").attr("src","");
				       $("#elemntCaptaLogo").val(element1[1]);
				      }
				      
				      
				      
				      
				     }else if(donde == 'dialog_enlace'){
				      
				      var link1 = jsonDataTV.items[j].ruta_video;
				      
				      var element1 = link1.split(" ");
				      
				      var indentifica1 =  element1[0];
				      
				      if(indentifica1 == "Video"){
				       $("#otroEnlace").attr("src",element1[1]+ "?rel=0");
				       $("#elemntLogoEnlace").val(0);
				      }else if(indentifica1 == "WEB"){
				       $("#otroEnlace").attr("src","");
				       $("#elemntLogoEnlace").val(element1[1]);
				      }
				      
				         
				         
				         
				        }       
					
				}
				
				
			  }
			 );
			 return false;
	
}

function version_explorer(){
	var version =getInternetExplorerVersion();
	
	if((version>0)&&(version<9)){
		document.location.href="/BolsaDeTrabajoIusacell/mejora_la_web";  
	}
	
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1 for other browsers.
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    return rv;
}