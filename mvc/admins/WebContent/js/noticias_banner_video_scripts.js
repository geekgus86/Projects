

$(document).ready(function(){

	/* CAMBIO DE PARA LAS URL Y LINKS FUCIONADOS */
	
	$("#contieneVideo1").hide();
	$("#contieneVideo2").hide();
	$("#contieneVideo5").hide();
	$("#contieneVideo4").hide();
	$("#contieneVideo5").hide();
	$("#contieneVideo6").hide();
	
	$("#contieneWEB1").hide();
	$("#contieneWEB2").hide();
	$("#contieneWEB3").hide();
	$("#contieneWEB4").hide();
	$("#contieneWEB5").hide();
	$("#contieneWEB6").hide();
	
	
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#banner1").hide();
	$("#videos1").hide();

	
	
	$("#chowBanner").click(function(){
		mostrarBanner();
	});
	
	$("#chowVideo").click(function(){
		mostrarVideos();
		
		$(".anteLink").attr("href","");
		$(".anteLink").html("");
		$(".cajasLink").val("");
		$("#AlcenIfram1").attr("src","");
		$(".cajasVideo").val("");
		
		var link1 = $("#elLink1").val();
		var link2 = $("#elLink2").val();
		var link3 = $("#elLink3").val();
		var link4 = $("#elLink4").val();
		var link5 = $("#elLink5").val();
		var link6 = $("#elLink6").val();
		
		var element1 = link1.split(" ");
		var element2 = link2.split(" ");
		var element3 = link3.split(" ");
		var element4 = link4.split(" ");
		var element5 = link5.split(" ");
		var element6 = link6.split(" ");
		
		var indentifica1 =  element1[0];
		var indentifica2 =  element2[0];
		var indentifica3 =  element3[0];
		var indentifica4 =  element4[0];
		var indentifica5 =  element5[0];
		var indentifica6 =  element6[0];
		
		if(indentifica1 == "Video"){
			$("#AlcenIfram1").attr("src",element1[1]);
			$("#anterior1").val("");
			$("#anterior1").val(element1[1]);
			$("#contieneVideo1").show();
			$("#contieneWEB1").hide();
			
			
			
			
		}else if(indentifica1 == "WEB"){
			
			
			$("#contieneVideo1").hide();
			$("#contieneWEB1").show();
			
			
			
			
			$("#anteriorLink1").attr("href",element1[1]);
			$("#anteriorLink1").html(element1[1]);
			
			
			
			
			
		}
		
		
		if(indentifica2 == "Video"){
			$("#AlcenIfram2").attr("src",element2[1]);
			$("#anterior2").val("");
			$("#anterior2").val(element2[1]);
			$("#contieneVideo2").show();
			$("#contieneWEB2").hide();
			
			
			
		}else if(indentifica2 == "WEB"){
			
			
			$("#contieneVideo2").hide();
			$("#contieneWEB2").show();
			
			
			
			
			
			$("#anteriorLink2").attr("href",element2[1]);
			$("#anteriorLink2").html(element2[1]);
		}
		
		if(indentifica3 == "Video"){
			$("#AlcenIfram3").attr("src",element3[1]);
			$("#anterior3").val("");
			$("#anterior3").val(element3[1]);
			$("#contieneVideo3").show();
			$("#contieneWEB3").hide();
			
			
			
		}else if(indentifica3 == "WEB"){
			
			
			
			$("#contieneVideo3").hide();
			$("#contieneWEB3").show();
			
			
			
			
			
			$("#anteriorLink3").attr("href",element3[1]);
			$("#anteriorLink3").html(element3[1]);
		}
		
		if(indentifica4 == "Video"){
			$("#AlcenIfram4").attr("src",element4[1]);
			$("#anterior4").val("");
			$("#anterior4").val(element4[1]);
			$("#contieneVideo4").show();
			$("#contieneWEB4").hide();
			
			
			
		}else if(indentifica4 == "WEB"){
			
			
			$("#contieneVideo4").hide();
			$("#contieneWEB4").show();
			
			
			
			$("#anteriorLink4").attr("href",element4[1]);
			$("#anteriorLink4").html(element4[1]);
		}
		
		if(indentifica5 == "Video"){
			$("#AlcenIfram5").attr("src",element5[1]);
			$("#anterior5").val("");
			$("#anterior5").val(element5[1]);
			$("#contieneVideo5").show();
			$("#contieneWEB5").hide();
			
			
			
		}else if(indentifica5 == "WEB"){
			
			
			$("#contieneVideo5").hide();
			$("#contieneWEB5").show();
			
			
			
			
			$("#anteriorLink5").attr("href",element5[1]);
			$("#anteriorLink5").html(element5[1]);
		}
		
		if(indentifica6 == "Video"){
			$("#AlcenIfram6").attr("src",element6[1]);
			$("#anterior6").val("");
			$("#anterior6").val(element6[1]);
			$("#contieneVideo6").show();
			$("#contieneWEB6").hide();
			
			
			
		}else if(indentifica6 == "WEB"){
			
			
			
			$("#AlcenIfram6").attr("src","");
			$(".cajasVideo").val("");
			
			$("#anteriorLink6").attr("href",element6[1]);
			$("#anteriorLink6").html(element6[1]);
		}
		
		
	});
	
	
	
	$("button.btn_log1").click(function(){
		var id_pro = $(this).attr("id");
		var provisional = id_pro.split("-");
		var id_video = provisional[1];
		var ruta_nueva = $("#nuevo"+id_video).val();
		var RegExPattern = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.([a-z]{2,4}|travel)(:\d{2,5})?(\/.*)?$/i;
		
		if(ruta_nueva == ""){
			alertify.alert("Debes Ingresar una Ruta");
		}else{
			if (RegExPattern.test(ruta_nueva)) {
			 	
				 CambiarVideo(id_video,ruta_nueva);
			    }else{
			    	alertify.alert("No es una ruta correcta");
			    	
			    }
			
		}
		 
		 

	});
	
	
	$("button.btn_log2").click(function(){
		var id_pro = $(this).attr("id");
		var provisional = id_pro.split("-");
		var id_video = provisional[1];
		var ruta_nueva = $("#nuevoL"+id_video).val();
		var RegExPattern = /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.([a-z]{2,4}|travel)(:\d{2,5})?(\/.*)?$/i;
		
		if(ruta_nueva == ""){
			alertify.alert("Debes Ingresar una Ruta");
		}else{
			if (RegExPattern.test(ruta_nueva)) {
			 	
				 CambiarVideo2(id_video,ruta_nueva);
			    }else{
			    	alertify.alert("No es una ruta correcta");
			    	
			    }
			
		}
		 
		 

	});
	
	
	
	
	$("#CambiaIMG1").click(function(){
		
		var verificar = $("#url_banner1").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm1").attr("action","json/cambiaRutasImagenes");
        	$("#frm1").submit();
      
        } 

	});
	
	$("#CambiaIMG2").click(function(){
		var verificar = $("#url_banner2").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm2").attr("action","json/cambiaRutasImagenes");
        	$("#frm2").submit();
      
        } 
	});
	
	$("#CambiaIMG3").click(function(){
		var verificar = $("#url_banner3").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm3").attr("action","json/cambiaRutasImagenes");
        	$("#frm3").submit();
      
        } 
	});
	
	$("#CambiaIMG4").click(function(){
		var verificar = $("#url_banner4").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm4").attr("action","json/cambiaRutasImagenes");
        	$("#frm4").submit();
      
        } 
	});
	
	$("#CambiaIMG5").click(function(){
		var verificar = $("#url_banner5").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm5").attr("action","json/cambiaRutasImagenes");
        	$("#frm5").submit();
      
        } 
		
	});
	
	
	$("#CambiaIMG6").click(function(){
		var verificar = $("#url_banner6").val();
		
		if (verificar == '')
        {
			alertify.alert('DEBES SELECCIONAR UN ARCHIVO');	
        }else{
        	
        	$("#frm6").attr("action","json/cambiaRutasImagenes");
        	$("#frm6").submit();
      
        } 
		
	});
	
	
	
	
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 1*/
	$("#SwitchVid-1").click(function(){
		$("#contieneVideo1").show();
	});
	
	$("#SwitchLin-1").click(function(){
		alertify.alert("No puedes Colocar un Link en esta seccion por razones de diseño");
	});
	
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 2*/
	$("#SwitchVid-2").click(function(){
		$("#contieneVideo2").show();
		$("#contieneWEB2").hide();
	});
	
	$("#SwitchLin-2").click(function(){
		$("#contieneVideo2").hide();
		$("#contieneWEB2").show();
	});
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 3*/
	$("#SwitchVid-3").click(function(){
		$("#contieneVideo3").show();
		$("#contieneWEB3").hide();
	});
	
	$("#SwitchLin-3").click(function(){
		$("#contieneVideo3").hide();
		$("#contieneWEB3").show();
	});
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 4*/
	$("#SwitchVid-4").click(function(){
		$("#contieneVideo4").show();
		$("#contieneWEB4").hide();
	});
	
	$("#SwitchLin-4").click(function(){
		$("#contieneVideo4").hide();
		$("#contieneWEB4").show();
	});
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 5*/
	$("#SwitchVid-5").click(function(){
		$("#contieneVideo5").show();
		$("#contieneWEB5").hide();
	});
	
	$("#SwitchLin-5").click(function(){
		$("#contieneVideo5").hide();
		$("#contieneWEB5").show();
	});
	
	/*  PARA CAMBIAR EN VIDEO O LINK  DE LA SECCION 6*/
	$("#SwitchVid-6").click(function(){
		$("#contieneVideo6").show();
		$("#contieneWEB6").hide();
	});
	
	$("#SwitchLin-6").click(function(){
		$("#contieneVideo6").hide();
		$("#contieneWEB6").show();
	});
	
	
	
	
	
	
});





function mostrarBanner(){
	$("#banner1").show("slide", { direction: "left" });
	$("#videos1").hide();
}

function mostrarVideos(){
	$("#banner1").hide();
	$("#videos1").show("slide", { direction: "left" });
}

function CambiarVideo(id_video,ruta_nueva){
	
	var video_id = ruta_nueva.split('v=')[1];
	
	var tipo = "video";
	
	var ampersandPosition = video_id.indexOf('&');
	if(ampersandPosition != -1) {
	  video_id = video_id.substring(0, ampersandPosition);
	}
	
	var idVideoYouTube = video_id;
	
	
	
	 $.getJSON('json/cambiaRutasVideos' ,
	  {id_video: id_video,ruta_nueva:ruta_nueva,idVideoYouTube:idVideoYouTube,tipo:tipo},
	  function(jsonDataP) {
		  
		  window.location.href="Noticias";
		   
	  }
	 );
	 return false;
}



function CambiarVideo2(id_video,ruta_nueva){
	
	
	
	var tipo = "web";
	

	
	var idVideoYouTube = "nada";
	
	
	
	 $.getJSON('json/cambiaRutasVideos' ,
	  {id_video: id_video,ruta_nueva:ruta_nueva,idVideoYouTube:idVideoYouTube,tipo:tipo},
	  function(jsonDataP) {
		  
		  window.location.href="Noticias";
		   
	  }
	 );
	 return false;
}