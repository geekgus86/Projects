$(document).ready(function(){
	version_explorer();
	$("#botonArriba").hide();
	$("#textEditarLateral").hide();
	 $("#textImprimirLateral").hide();
	 $("#textExportarLateral").hide();
	
	 //alert(getInternetExplorerVersion());
	 
	$("#content").css("height","1330");
	$('#infografia').svg();
	$('#talentos').svg();
	
	  var svg = $('#infografia').svg('get'); 
	  var svgt=$('#talentos').svg('get');
	  var g0=svg.group('over1');
	  var g1 = svg.group(g0,"oversvg");
	  var g2=svg.group(g1,"father");
	  $("#exp").val('0');
		$("#edu").val('0');
		
		
		
	  ObtenerPorcentaje();
	  dibujarGraficaTalentos(svgt);
	  obtenerTalentos(svgt);
	  
	 obtenerEmpleo(svg,g1,g2);
	 obtenerEducacion(svg,g1,g2);
	  obtenerHobbies();
	  dibujar_recta(svg,g2,g1);
	 
	  $("#botonImprimir").click(function(){
		  
		
		  self.print();
		  
	  });

      $("#botonPDF").click(function(){
    	  generarPDF();
		  
	  });
	  
	  $("#botonEditar").click(function(){
			document.location.href="/BolsaDeTrabajoIusacell/perfil";
		});
	  $("#talentos").hide();
	  crear_vista_previa();
	  //crear_talentos_vista();
	  
	  
	  $("#vista_previa_dialog").dialog({
	      open: function(event, ui) {},
	      close: function(event, ui) {},
	      bgiframe: true,
	      autoOpen: false,
	      modal: true,
	      height: 200,
	      width: 623,
	      resizable: false,
	      draggable: false,
	      show: "blind",
	   hide: "explode",
	      position: 'center',
	      buttons: {
	       'Cerrar': function() { $(this).dialog('close'); },
	          
	      }
	   });
	  
	  
	  $("#editarLateral").mouseover(function(){
		     
		     $("#textEditarLateral").show('slide', {direction: 'right'}, 50);
		   });
		   
		   $("#editarLateral").mouseleave(function(){
		     
		     $("#textEditarLateral").hide('slide', {direction: 'right'}, 50);
		   });
		   
		   
		   $("#imprimirLateral").mouseover(function(){
		     
		     $("#textImprimirLateral").show('slide', {direction: 'right'}, 50);
		   });
		   
		   $("#imprimirLateral").mouseleave(function(){
		     
		     $("#textImprimirLateral").hide('slide', {direction: 'right'}, 50);
		   });
		   
		   
		   $("#exportarLateral").mouseover(function(){
		     
		     $("#textExportarLateral").show('slide', {direction: 'right'}, 50);
		   });
		   
		   $("#exportarLateral").mouseleave(function(){
		     
		     $("#textExportarLateral").hide('slide', {direction: 'right'}, 50);
		   });
	  
		   
		   $(document).scroll(function(){
				
				var sstop=$(document).scrollTop();
				
				if(sstop>100){
					//$("#botonGuardar").css("margin-left","734px");
					$("#botonArriba").show();
				}else{
					$("#botonArriba").hide();
				//	$("#botonGuardar").css("margin-left","872px");
					
				}
				
			});
	  
		   $("#botonArriba").click(function(){
			   
			   $('html, body').animate({scrollTop:0}, 'slow');

			   
		   }); 
	  
		   ObtenerFoto();	  

});

function abrirExportar(){
	$( "#vista_previa_dialog" ).dialog( "open");
}

function dibujar_recta(svg,g2,g1){
	var fechaN=$("#nac_span").text();
	var birth=fechaN.split("/");
	var bday=birth[0];
	var bmonth=birth[1]-1;
	var byear=parseInt(birth[2])+12;
	var birthDay=new Date(byear,bmonth,bday);
	var today=new Date();
	var yearb=birthDay.getFullYear();
	var yeart=today.getFullYear();
	var numyear=parseInt(yeart-yearb);
	var width=$("#infografia").width();
	var pix=parseInt(width/(numyear+1));
	var j=0;
	var y=parseInt(byear);
	var firstY=byear.toString().substring(2,4);
	var year="";
	var anio=""+firstY;
	for(var i=1;i<=(numyear+1);i++){
		svg.rect(g1,j,200,pix,25,{id:y,fill:'black',stroke:'dimgray',strokeWidth:5});
		svg.text(g1,j+5, 215, anio,{font:"arial",fontSize:10,fill:'white'});
		j+=pix;
		y=parseInt(y+1);
		yA=y.toString();
		year=yA.substring(2,4);
		anio=""+year;
	}
	
	
	
}

function addJob(svg,g1,g2,anio,mes,aniof,mesf,empresa,puesto,trabajoActual,idExp){

	var g3=svg.group(g2,"lineas");
    var yw=$("#"+anio).attr("width");
    var mw=parseInt(yw/12);
    var miw=parseInt(mw*mes);
    var xi=parseInt($("#"+anio).attr("x"));
    var x=parseInt(xi+miw);
    var xfi=parseInt($("#"+aniof).attr("x"));
    var mwf=parseInt(mesf*mw);
    var xf=parseInt(xfi+mwf);
    var nexp=$("#exp").val();
    var empalme=0;
    var last=$("#last").val();
    if(last!="primero"){
       empalme=findJobOver(x,xf);
 
    }
    var idexp=idExp+"_exp";
    var colorfill=job_colors(nexp);
    var y=170-(empalme*20);
    if(trabajoActual=="si"){
    	 width=2000;
    }else{
    	width=parseInt(xf-x);
    }
    var height=50+(empalme*20);
    
    var today=new Date();
    var anioHoy=today.getFullYear();
    var fechaN=$("#nac_span").text();
	var birth=fechaN.split("/");
	var byear=parseInt(birth[2])+10;
    
	var difYear=anioHoy-byear;
	var middleYear=parseInt(anioHoy-(difYear/2));
    var textoX=parseInt(x)+parseInt(20);
	var textoY1=y-20;
	var textoY2=y-10;
	var lineaId=idexp+"_linea";
	empresa=empresa.toUpperCase();
    puesto=puesto.toUpperCase();
    svg.rect(g2,x,y,width,height,10,10,{id:idexp,fill:colorfill,class:"jobgraph",stroke:'Silver',strokeWidth:2});
    
    /*pa acomodar los textos y las rayas                                            */
    
    if(nexp<=0){
    	//alert("condicion 0");
    	var extension_empresa_actual=parseInt(textoX)+parseInt(empresa.length)*8;
		var extension_puesto_actual=parseInt(textoX)+parseInt(puesto.length)*7;
		var circleX=textoX-5;
		
		if((extension_empresa_actual>1010)||(extension_puesto_actual>1010)){
			
			if(extension_empresa_actual>extension_puesto_actual){textoX=textoX-(parseInt(empresa.length)*7.5);
			}else {
				textoX=textoX-(parseInt(puesto.length)*5.5);
			}
			
		}
    	 svg.text(g1,textoX,textoY1,empresa,{id:nexp+"_empresa",class:"empresa_titulo",font:"arial",fontSize:11,fill:'Black',fontWeight:'bold'});
    	 svg.text(g1,textoX,textoY2,puesto,{id:nexp+"_puesto",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
    	 svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idexp+"_circle"});
    	 svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    	 
    }else{
    	
    	var extension_empresa_actual=parseInt(textoX)+parseInt(empresa.length)*8;
		var extension_puesto_actual=parseInt(textoX)+parseInt(puesto.length)*7;
		var circleX=textoX-5;
		
		if((extension_empresa_actual>1010)||(extension_puesto_actual>1010)){
			textoX=textoX-(parseInt(empresa.length)*7.5);
		}
    	
    	for(var ind=0;ind<nexp;ind++){
    		var cadena_empresa=$("#"+ind+"_empresa").text();
    		var cadena_puesto=$("#"+ind+"_puesto").text();
    		var xempresa=$("#"+ind+"_empresa").attr("x");
    		var yempresa=$("#"+ind+"_empresa").attr("y");
    		var xpuesto=$("#"+ind+"_puesto").attr("x");
    		var ypuesto=$("#"+ind+"_puesto").attr("y");
    		var altura=parseInt(yempresa)+30;
    		var extension_empresa=parseInt(xempresa)+parseInt(cadena_empresa.length)*8;
    		var extension_puesto=parseInt(xpuesto)+parseInt(cadena_puesto.length)*7;
    		
    		
    		
    		if(((textoX>=xempresa)&&(textoX<=extension_empresa)||(textoX>=xpuesto)&&(textoX<=extension_puesto))&&((textoY1>=yempresa)&&(textoY1<=altura))){
    			//alert("condicion 1");
    			if(extension_empresa>width){
    				textoY1=textoY1-20;
    				textoY2=textoY2-20;
    			}else{
    				if(extension_empresa>=extension_puesto){textoX=parseInt(textoX)+parseInt(extension_empresa)+parseInt(5);}
    				else {textoX=parseInt(textoX)+parseInt(extension_puesto)+parseInt(5);}
    				
    			}
    			
    			
    		}else if(((extension_empresa_actual>=xempresa)||(extension_puesto_actual>=xpuesto)&&(extension_puesto_actual<=extension_puesto))&&((textoY1>=yempresa)&&(textoY1<=altura))){
    			//alert("condicion 2");
    			textoY1=textoY1-20;
				textoY2=textoY2-20;
    		}
    	}
       
    	svg.text(g1,textoX,textoY1 ,empresa,{id:nexp+"_empresa",class:"empresa_titulo",font:"arial",fontSize:11,fill:'Black',fontWeight:'bold'});
        svg.text(g1,textoX ,textoY2,puesto,{id:nexp+"_puesto",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
        svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idexp+"_circle"});
        svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
      
    var e=$("#"+idexp).attr("id");
    var primero=document.getElementById(e);
    var segundo=document.getElementById(last);
    var h=$("#"+last).attr("height");
    if(last!="primero"){
    	
    		g2.insertBefore(primero,segundo);
    	
    }
    
    var numexp=parseInt(nexp);
    var exp=parseInt(numexp+1);
    $("#exp").val(exp);
    $("#last").val(idexp);
}

function findJobOver(x,xf){
	var empalme=0;
	$("rect.jobgraph").each(function(){
		var xgi=parseInt($(this).attr("x"));
		var width=parseInt($(this).attr("width"));
		var xgf=parseInt(xgi+width);
		if(((x<=xgi)&&(xf<=xgi))||((x>=xgf)&&(xf>=xgf))){
			empalme=empalme+0;
		}else{
			
			empalme=empalme+1;
		}
		
	});
	return empalme;
}

function graphOrdering(svg,g1,g2){
	$("rect.jobgraph").each(function(){
		var id=$(this).attr("id");
		var height=$(this).attr("height");
		$("rect.jobgraph").each(function(){
			var id2=$(this).attr("id");
			var height2=$(this).attr("height");
			if(id!=id2){
				if(height<height2){
					var primero=document.getElementById(id);
				    var segundo=document.getElementById(id2);
				    g2.insertBefore(primero,segundo);
				}
				
			}
		});
		
	});
	
	
}

function findSchoolOver(x,xf){
	var empalme=0;
	$("rect.schoolgraph").each(function(){
		var xgi=parseInt($(this).attr("x"));
		var width=parseInt($(this).attr("width"));
		var xgf=parseInt(xgi+width);
		if(((x<xgi)&&(xf<=xgi))||((x>xgi)&&(xf>xgf))){
			empalme=0;
		}else{
			empalme=empalme+1;
		}
	});
	return empalme;
}




function job_colors(i){
	var colors=["crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey","crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey"];
	return colors[i];
}

function school_colors(i){
	var colors=["DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey","crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod","DarkCyan","CornflowerBlue","Aquamarine","DarkSlateBlue","DarkViolet","DodgerBlue","LightSeaGreen","LightSkyBlue","LimeGreen","MediumAquaMarine", "MediumSeaGreen","MediumTurquoise", 
	            "RoyalBlue", 
	            "SeaGreen", 
	            "Teal", 
	            "LightSteelBlue",
	            "DarkMagenta", 
	            "CadetBlue", 
	            "DarkSlateGrey"];
	return colors[i];
	
}

function addSchool(svg,g1,g2,anio,mes,aniof,mesf,nivelAcademico,instituto,estudioActual,idFor){
	var g3=svg.group(g2,"lineas");
    var yw=$("#"+anio).attr("width");
    var mw=parseInt(yw/12);
    var miw=parseInt(mw*mes);
  
    var xi=parseInt($("#"+anio).attr("x"));
    var x=parseInt(xi+miw);
    
    var xfi=parseInt($("#"+aniof).attr("x"));
    var mwf=parseInt(mesf*mw);
    var xf=parseInt(xfi+mwf);
    
    if(estudioActual=="si"){
   	 width=2000;
   }else{
   	width=parseInt(xf-x);
   }
    
    var nedu=$("#edu").val();
    var empalme=0;
    var last=$("#lastskull").val();
    if(last!="primero"){
       empalme=findSchoolOver(x,xf);
    }
    var xlinea=parseInt(x+(empalme*20));
    var lineaId=nedu+"_linea";
   
    var idedu=idFor+"_edu";
    var colorfill=school_colors(nedu);
    var y=200;
    var height=50+(empalme*20);
    
    var textoX=parseInt(x)+parseInt(20);
	var textoY1=(y+20)+parseInt(height);
	var textoY2=(y+10)+parseInt(height);
	var lineaId=idedu+"_linea";
    
    svg.rect(g2,x,y,width,height,10,10,{id:idedu,fill:colorfill,class:"schoolgraph",stroke:'Silver',strokeWidth:2});
    
 /*pa acomodar los textos y las rayas                                            */
    
    if(nedu<=0){
    	
    	var extension_instituto_actual=parseInt(textoX)+parseInt(instituto.length)*7.5;
		var extension_nivel_actual=parseInt(textoX)+parseInt(nivelAcademico.length)*6;
		var circleX=textoX-5;
		
		
		if((extension_instituto_actual>1110)||(extension_nivel_actual>1110)){
		   
			textoX=textoX-(parseInt(instituto.length)*7.5);
			
		}
    	
    	 svg.text(g1,textoX,textoY1,instituto,{id:nedu+"_instituto",class:"empresa_titulo",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
    	 svg.text(g1,textoX,textoY2,nivelAcademico,{id:nedu+"_nivelAcademico",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
    	 svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idedu+"_circle"});
         svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    	 
    }else{
    	
    	var extension_instituto_actual=parseInt(textoX)+parseInt(instituto.length)*7.5;
		var extension_nivel_actual=parseInt(textoX)+parseInt(nivelAcademico.length)*6;
		var circleX=textoX-5;
		
		if((extension_instituto_actual>1110)||(extension_nivel_actual>1110)){
		   
			textoX=textoX-(parseInt(instituto.length)*7.5);
			
		}
		
    	
    	
    	for(var ind=0;ind<nedu;ind++){
    		var cadena_instituto=$("#"+ind+"_instituto").text();
    		var cadena_nivelAcademico=$("#"+ind+"_nivelAcademico").text();
    		var xinstituto=$("#"+ind+"_instituto").attr("x");
    		var yinstituto=$("#"+ind+"_nivelAcademico").attr("y");
    		var xnivelAcademico=$("#"+ind+"_puesto").attr("x");
    		var ynivelAcademico=$("#"+ind+"_puesto").attr("y");
    		var altura=parseInt(yinstituto)+30;
    		var extension_instituto=parseInt(xinstituto)+parseInt(cadena_instituto.length)*7.5;
    		var extension_nivel=parseInt(xnivelAcademico)+parseInt(cadena_nivelAcademico.length)*6;
    		
    		
    		if(((textoX>xinstituto)&&(textoX<extension_instituto)||(textoX>xnivelAcademico)&&(textoX<extension_nivel))&&((textoY1>=ynivelAcademico)&&(textoY1<=altura))){
    			if(extension_instituto>width){
    				textoY1=parseInt(textoY1)+parseInt(20);
    				textoY2=parseInt(textoY2)+parseInt(20);
    			}else{
    				if(extension_instituto>extension_nivel){textoX=parseInt(textoX)+parseInt(extension_instituto)+parseInt(5);}
    				else {textoX=parseInt(textoX)+parseInt(extension_instituto)+parseInt(5);}
    				
    			}
    			
    			
    		}else if(((extension_instituto_actual>xinstituto)||(extension_nivel_actual>xnivelAcademico)&&(extension_nivel_actual<extension_nivel))&&((textoY1>=yinstituto)&&(textoY1<=altura))){
    			textoY1=parseInt(textoY1)+parseInt(20);
				textoY2=parseInt(textoY2)+parseInt(20);
    		}
    	}

    	svg.text(g1,textoX,textoY1 ,instituto,{id:nedu+"_instituto",class:"empresa_titulo",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
        svg.text(g1,textoX ,textoY2,nivelAcademico,{id:nedu+"_nivelAcademico",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
        
        svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idedu+"_circle"});
        svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    

    var e=$("#"+idedu).attr("id");
    var primero=document.getElementById(e);
    var segundo=document.getElementById(last);
    if(last!="primero"){
    	g2.insertBefore(primero,segundo);
    }
    var numedu=parseInt(nedu);
    var edu=parseInt(numedu+1);
    $("#edu").val(edu);
    $("#lastskull").val(idedu);
	
}


function softwareCat(cat){
	var categoria=cat;
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerCatSoftware", {categoria:categoria},
			  function(jsonData) {
		       var i=0;
		       var height=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	 var lista="<div id='"+jsonData.items[i].idSoftware+"'class='swItem modifSw'>"+jsonData.items[i].nombre+"</div><div class='swDomain modifSw'>"+jsonData.items[i].dominio+"</div>";
	    	 height+=25;
	    	 $("#"+categoria+"_list").append(lista);
	    	 $("#"+categoria+"_list").css("height",height+"px");
	       }
			  
	       $("div.modifSw").click(function(){
	   		var auxId=$(this).attr("id");
	   		var arrId=auxId.split("_");
	   		var idSw=arrId[0];
	   		$("#id_sw").val(idSw);
	   		$("#sw_parametro").val("modificar");
	   		abrir_software();			
	   	});
	       
	});
	
	
	
}



function obtenerListaSoftware(categoria){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerSoftware", {categoria:categoria},
			  function(jsonData) {
				var i=0;
				
		       for(i=0;i<jsonData.items.length;i++){
		    	   var option="<option value='"+jsonData.items[i].id_software+"'>"+jsonData.items[i].nombre+"</option>";
		    	   $("#softwareList").append(option);
		       }
		   	$("#softwareList").show();
			  });
	
}


///////////////////obtener datos de la grafica///////////////////////////////////////////////////////////
function obtenerEmpleo(svg,g1,g2){ 
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEmpleo", {},
			  function(jsonData) {
		        var i=0;
		        for(i=0;i<jsonData.items.length;i++){
		        	  var idExp=jsonData.items[i].id_exp;
		    		  var empresa=jsonData.items[i].empresa;
		    		  var puesto=jsonData.items[i].puesto;
		    		  var fechaInicio=jsonData.items[i].fecha_inicio;
		    		  var fechaFin=jsonData.items[i].fecha_fin;
		    		  var trabajoActual=jsonData.items[i].trabajo_actual;
		    		  
		    		  var auxi=fechaInicio.split("/");
		    		  var imonth=auxi[1];
		    		  var iyear=auxi[2];
		    		  
		    		  var auxf=fechaFin.split("/");
		    		  var fmonth=auxf[1];
		    		  var fyear=auxf[2];
		    		  addJob(svg,g1,g2,iyear,imonth,fyear,fmonth,empresa,puesto,trabajoActual,idExp);
		    		  crear_vista_previa();
		    		  
		        }
		        
		        
		        
		        $("rect.jobgraph").click(function(){
		        	var aidi=$(this).attr("id");
		    		var aidiarr=aidi.split("_");
		    		var id=aidiarr[0];
		    		$("#idExp").val(id);
		    		obtenerEmpleoInfo(id);
		    		abrir_modificar_experiencia();
		    	});
		     
			  });
	return true;
	 
	
}


function getNumAnios(){
	
	
}

function obtenerEducacion(svg,g1,g2){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerEducacion", {},
			  function(jsonData) {
		        var i=0;
		        for(i=0;i<jsonData.items.length;i++){
		        	  var idFor=jsonData.items[i].id_formacion;
		        	  var nivel_academico=jsonData.items[i].nivel_academico;
		    		  var instituto=jsonData.items[i].instituto;
		    		  var fechaInicio=jsonData.items[i].fecha_inicio;
		    		  var fechaFin=jsonData.items[i].fecha_fin;
		    		  var estudio_actual=jsonData.items[i].estudio_actual;
		    		  
		    		  var auxi=fechaInicio.split("/");
		    		  var imonth=auxi[1];
		    		  var iyear=auxi[2];
		    		  
		    		  var auxf=fechaFin.split("/");
		    		  var fmonth=auxf[1];
		    		  var fyear=auxf[2];
		    		  addSchool(svg,g1,g2,iyear,imonth,fyear,fmonth,nivel_academico,instituto,estudio_actual,idFor);
		    		  crear_vista_previa();
		    		 
		    		 
		    		  
		        }
		        
		        $("rect.schoolgraph").click(function(){
		    		var aidi=$(this).attr("id");
		    		var aidiarr=aidi.split("_");
		    		var id=aidiarr[0];
		    		$("#idForm").val(id);
		    		 obtenerEducacionInfo(id)
		    		abrir_modificar_educacion();
		    	});
		      
			  });
	return true;
}	

function obtenerHobbies(){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerHobbies", {},
			function(jsonData) {
		var i=0;
    for(i=0;i<jsonData.items.length;i++){
    	var idHobbie=jsonData.items[i].id_hobbie;
    	var casilla=jsonData.items[i].casilla;
    	var hobbie=jsonData.items[i].hobbie;
    	var clases=$("#hobbie_"+casilla).attr("class");
    	clases=clases+" hobbie_"+idHobbie;
    	$("#hobbie_"+casilla).attr("class",clases);
    	$("#hobbie_name_"+casilla).html(hobbie);
    	
    }
		  
});}

function dibujarGraficaTalentos(svg){
	var pathname = window.location.pathname;
	var patharray=pathname.split("/");
	var path=patharray[0]+"/"+patharray[1]+"/";
	var xmls='xlink="http://www.w3.org/1999/xlink"';
	for(var i=0;i<45;i++){
		   svg.image(110, 11, 18, 63, 'images/color1.png',{id:i+"_graph",transform: 'rotate(-'+i+', 130,128)'});
		   }
	  
		   for(var i=46;i<90;i++){
		   svg.image(110, 11, 18, 63, 'images/color2.png',{id:i+"_graph",transform: 'rotate(-'+i+', 130,128)'});
		   }
		   
		    for(var i=91;i<135;i++){
		   svg.image(110, 11, 18, 63, 'images/color3.png',{id:i+"_graph",transform: 'rotate(-'+i+', 130,128)'});
		   }
		    for(var i=136;i<170;i++){
		   svg.image(110, 11, 18, 63, 'images/color4.png',{id:i+"_graph",transform: 'rotate(-'+i+', 130,128)'});
		   }
	
	svg.image(15, 10, 116, 236, path+'images/brillo.png',{id:'fondo'});
	svg.rect(160,40,10,10,1,1,{id:"red_skill",fill:"crimson",stroke:'black',strokeWidth:2});
	svg.rect(160,80,10,10,1,1,{id:"blue_skill",fill:"mediumAquaMarine",stroke:'black',strokeWidth:2});
	svg.rect(160,120,10,10,1,1,{id:"yellow_skill",fill:"yellow",stroke:'black',strokeWidth:2});
	svg.rect(160,160,10,10,1,1,{id:"gold_skill",fill:"gold",stroke:'black',strokeWidth:2});
	
	 svg.text(180, 50,"asdfg",{id:"talent_red",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
	 svg.text(180, 65,"%",{id:"porcentaje_red",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(180, 90,"asdfg",{id:"talent_blue",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
	 svg.text(180, 105,"%",{id:"porcentaje_blue",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(180, 130,"asdfg",{id:"talent_yellow",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
	 svg.text(180, 145,"%",{id:"porcentaje_yellow",font:"arial",fontSize:12,fill:'Black'});
	 
	 svg.text(180, 170,"asdfg",{id:"talent_gold",font:"arial",fontSize:12,fill:'Black',fontWeight:'bold'});
    svg.text(180, 185,"%",{id:"porcentaje_gold",font:"arial",fontSize:12,fill:'Black'});
	
	
}

function obtenerTalentos(svgt){
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerTalentos", {},
			  function(jsonData) {
		var i=0;
	       for(i=0;i<jsonData.items.length;i++){
	    	  var color=jsonData.items[i].color;
	    	  var talento=jsonData.items[i].talento;
	    	  var porcentaje=jsonData.items[i].porcentaje;
	    	  var grado=jsonData.items[i].grado;
			  
	          dibujarPorcentajeTalentos(svgt,color,talento,porcentaje,grado);
	         
	       }
			  });
	
	
}


function dibujarPorcentajeTalentos(svgt,color,talento,porcentaje,gradoI){
	var grados=(porcentaje*180)/100;
	var limiteGrados=gradoI+grados;
	
	var pathname = window.location.pathname;
	var patharray=pathname.split("/");
	var path=patharray[0]+"/"+patharray[1]+"/";
	var fondo="";
	if(color=="red"){
		fondo='images/color1.png';
	}else if(color=="blue"){
		fondo='images/color2.png';
	}else if(color=="yellow"){
		fondo='images/color3.png';
	}else if(color=="gold"){
		fondo='images/color4.png';
	}else {
		fondo="";
	}
		 
	 for(var i=gradoI;i<=limiteGrados&&i<170;i++){
		 
		    $("#"+i+"_graph").attr("href",fondo);
		  
		    
	 }
	  $("#talent_"+color).text(talento);
	  $("#porcentaje_"+color).text(porcentaje+"%");
	 crear_talentos_vista();
	
}

function getAbsoluteElementPosition(element) {
	  if (typeof element == "string")
	    element = document.getElementById(element);
	    
	  if (!element) return { top:0,left:0 };
	  
	  var y = 0;
	  var x = 0;
	  while (element.offsetParent) {
	    x += element.offsetLeft;
	    y += element.offsetTop;
	    element = element.offsetParent;
	  }
	  return {top:y,left:x};
	}



function generarPDF(svg){

	 var canvas = document.getElementById("canvas");
	 var imageData    = canvas.toDataURL("image/png"); 
	    imageData=imageData.replace('data:image/png;base64,','');
	    
	    var canvas2= document.getElementById('canvas2');
	    var imageData2=canvas2.toDataURL("image/png"); 
	    imageData2=imageData2.replace('data:image/png;base64,','');

	 $.post("/BolsaDeTrabajoIusacell/json/HtmlRender", {

	  imageData:imageData,
	        imageData2:imageData2
	}, function(jsonData) {
	 
	  var error1 = jsonData.Mensajes[0].error1;
	   
	 
	   
	   if(error1=="Se ha Creado el Archivo Satisfactoriamente"){
	 
	    var er1=jsonData.Mensajes[0].error1;
	    var er2=jsonData.Mensajes[0].ruta_nueva;
	    //console.info(er1);
	    //console.info(er2);
	   
	    $("#mensaje").text(er1);
	    $("#lin_etsel").text("VER ARCHIVO PDF");
	    $("#lin_etsel").attr("href","uploads/curriculums/"+er2);
	    abrirExportar();
	   }else if(error1=="No se ha creado el archivo Satisfactoriamente"){
	    var er1=jsonData.Mensajes[0].error1;
	    //console.info(er1);
	    $("#mensaje").text(er1);
	    $("#lin_etsel").text("");
	    $("#lin_etsel").attr("href","#");
	    abrirExportar();
	    
	   }
	 
	 
	});
}
function crear_vista_previa(){
	
	var toCanvas=$("#infografia").html().replace(/>\s+/g, ">").replace(/\s+</g, "<");
	toCanvas=toCanvas.replace('<div id="infografia" class="hasSVG">',"");
    toCanvas=toCanvas.replace('</div>',"");
    toCanvas=toCanvas.replace('<svg version="1.1" width="1110" height="430">','<svg>');
    toCanvas=toCanvas.replace('</svg>','</svg>');
	 canvg('canvas', toCanvas);
	 $("#infografia").hide();
	 
}

function crear_talentos_vista(){
	
	
	   var talento_red=$("#talent_red").text();
	   var porcentaje_red=$("#porcentaje_red").text();
	   var talento_blue=$("#talent_blue").text();
	   var porcentaje_blue=$("#porcentaje_blue").text();
	   var talento_yellow=$("#talent_yellow").text();
	   var porcentaje_yellow=$("#porcentaje_yellow").text();
	   var talento_gold=$("#talent_gold").text();
	   var porcentaje_gold=$("#porcentaje_gold").text();
	
	
	var toCanvas='<svg> ';
	for(var i=0;i<170;i++){
		var transform=$("#"+i+"_graph").attr('transform');
		var acheref=$("#"+i+"_graph").attr('href');
		
		if((i!=45)&&(i!=90)&&(i!=135)){
			toCanvas=toCanvas+'<image x="110" y="11" width="18" height="63" id="'+i+'_graph" transform="'+transform+'" xlink:href="'+acheref+'" xmlns:xlink="http://www.w3.org/1999/xlink"></image>';
		}
		
	}
	
	toCanvas=toCanvas+'<rect x="160" y="40" width="10" height="10" rx="1" ry="1" id="red_skill" fill="crimson" stroke="black" stroke-width="2"></rect>';	
	toCanvas=toCanvas+'<rect x="160" y="80" width="10" height="10" rx="1" ry="1" id="blue_skill" fill="mediumAquaMarine" stroke="black" stroke-width="2"></rect>';	
	toCanvas=toCanvas+'<rect x="160" y="120" width="10" height="10" rx="1" ry="1" id="yellow_skill" fill="yellow" stroke="black" stroke-width="2"></rect>';	
	toCanvas=toCanvas+'<rect x="160" y="160" width="10" height="10" rx="1" ry="1" id="gold_skill" fill="gold" stroke="black" stroke-width="2"></rect>';	
	toCanvas=toCanvas+'<image x="15" y="10" width="116" height="236" id="fondo" xlink:href="images/brillo.png" xmlns:xlink="http://www.w3.org/1999/xlink"></image>';
	

       
		toCanvas=toCanvas+'<text x="180" y="50" id="talent_red" font="arial" font-size="12" fill="Black" font-weight="bold">'+talento_red+'</text>';
		toCanvas=toCanvas+'<text x="180" y="65" id="porcentaje_red" font="arial" font-size="12" fill="Black">'+porcentaje_red+'%</text>';

		toCanvas=toCanvas+'<text x="180" y="90" id="talent_blue" font="arial" font-size="12" fill="Black" font-weight="bold">'+talento_blue+'</text>';
		toCanvas=toCanvas+'<text x="180" y="105" id="porcentaje_blue" font="arial" font-size="12" fill="Black">'+porcentaje_blue+'%</text>';

		toCanvas=toCanvas+'<text x="180" y="130" id="talent_yellow" font="arial" font-size="12" fill="Black" font-weight="bold">'+talento_yellow+'</text>';
		toCanvas=toCanvas+'<text x="180" y="145" id="porcentaje_yellow" font="arial" font-size="12" fill="Black">'+porcentaje_yellow+'%</text>';

		toCanvas=toCanvas+'<text x="180" y="170" id="talent_gold" font="arial" font-size="12" fill="Black" font-weight="bold">'+talento_gold+'</text>';
		toCanvas=toCanvas+'<text x="180" y="184" id="porcentaje_gold" font="arial" font-size="12" fill="Black">'+porcentaje_gold+'%</text>';

	
	
	toCanvas=toCanvas+'</svg>';
	canvg('canvas2', toCanvas);
	
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


function version_explorer(){
	var version =getInternetExplorerVersion();
	if((version>0)&&(version<9)){
		document.location.href="/BolsaDeTrabajoIusacell/mejora_la_web";  
	}else{
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

function ObtenerFoto(){
	
	$.post("/BolsaDeTrabajoIusacell/json/ObtenerPhoto", {
	},function(jsonData) {
		  var foto=jsonData.items[0].foto;
		  $("#foto_user").attr("src",foto);
	});
	
}