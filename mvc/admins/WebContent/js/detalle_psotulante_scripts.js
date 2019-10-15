
$(document).ready(function(){
	
	$('#infografia').svg();
	 var svg = $('#infografia').svg('get');
	 var g0=svg.group(svg);
	 var g1 = svg.group(g0);
	 var g2=svg.group(g1,"father");
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#exp").val('0');
	 $("#edu").val('0');
	
	pinta_lins();
	
	$("li.jup").mouseover(function(){
		  $(this).css("background-color","#CA3B3B ");
		  $(this).css("border","1px solid #FFFFFF");
		 
		  
		  
	   });
	  
	  $("li.jup").mouseleave(function(){
		  pinta_lins();
		  $(this).css("background-color","#FFFFFF ");
		  $(this).css("border","1px solid #D3D3D3");
		
	   });
	
	 $("#detalle").hide();
	 
	 
	 $("#infografia2").hide();
	 
	 $("li.jup").click(function(){
		 
		 limpiarTodo();
		 
		 if ($('#DivBlock').is (':visible')){
			 ocultar();
			 mostrar();
		 }else{
			 mostrar();
			 var num_id = $(this).attr('id');
			 DatosPostu(num_id);
			 $("#palaInfoID").val(num_id);
		 } 
	 });
	 
	 
	 $("#infografiaVer").click(function(){
		 mostrar_infografia(svg,g2,g1);
	 });
	 
	 $("#close").click(function(){
		 ocultar();
		 limpiarTodo();
	 });
	 
	 $("#close2").click(function(){
		 ocultar_infografia();
	 });
	
});

function pinta_lins(){
	$("a.jupA").css("color","#D3D3D3");
}


function mostrar() {
	$( "#detalle" ).show("slide", { direction: "left" });
	
	}  

function ocultar() {
	$("#detalle").hide("slide", { direction: "left" });
	}  



function mostrar_infografia(svg,g2,g1){
	$( "#infografia2" ).show("bounce", { times:3 }, 300);
	
	
	 
	$("rect.schoolgraph").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	
	
	
	
	$("rect.jobgraph").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	
	
	
	
	$("text.textos").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	

	
	
	$("line.jobline").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	

	
	
	$("rect.rectaN").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	

	
	
	$("circle.circleJ").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	
	
	

	
	dibujar_recta(svg,g2,g1);
	obtenerEmpleo(svg,g1,g2);
	obtenerEducacion(svg,g1,g2);
}

function ocultar_infografia(){
	$("#infografia2").hide("slide");
	$("#exp").val('0');
	 $("#edu").val('0');
	 
	
	 
	$("rect.schoolgraph").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	
	
	
	
	$("rect.jobgraph").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	
	
	
	
	$("text.textos").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});
	
	
	
	
	
	$("line.jobline").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	

	
	
	$("rect.rectaN").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	

	
	
	$("circle.circleJ").each(function(){
		
		var svg = $('#infografia').svg('get');
		
		var id_figuara = $(this).attr("id");
		var sup = document.getElementById(id_figuara);
		svg.remove(sup);
		
	});	
	
	
	
}



function DatosPostu(num_id){
	
	$.getJSON('json/datosPostulante' ,
			  {num_id: num_id},
			  function(jsonDataDP) {
				  
				  $("#nom_completo").text(jsonDataDP.items[0].nombre +" "+ jsonDataDP.items[0].apellidoP +" "+jsonDataDP.items[0].apellidoM);
				  $("#areaInteres").text(jsonDataDP.items[0].areaInteres);
				  $("#areaFormacion").text(jsonDataDP.items[0].areaFormacion);
				  $("#ultimaEmpresa").text(jsonDataDP.items[0].ultimaEmpresa);
				  $("#ultimoPuesto").text(jsonDataDP.items[0].ultimoPuesto);
				  $("#niveAcademico").text(jsonDataDP.items[0].niveAcademico);
				  
				  $("#palaInfo").val(jsonDataDP.items[0].fechaNac);
				  
				  $("<label>Telentos:</label><br/>").appendTo(".datillos_postu_talento");
				  for(j=0;j<=(jsonDataDP.talentos.length)-1;j++){
					 
					  
					  $("<div class='contiene_reporteD'>"+jsonDataDP.talentos[j].talento+"  :  "+jsonDataDP.talentos[j].porcentaje+" % </div>").appendTo(".datillos_postu_talento");
					  $("<div><br/></div>").appendTo(".datillos_postu_talento");
					  $("<div id='porcentaje"+jsonDataDP.talentos[j].porcentaje+"' class='barra_num_vacantesD'></div>").appendTo(".datillos_postu_talento");
					  
					  	var valor = jsonDataDP.talentos[j].porcentaje;
						var incremento = parseInt(valor);
						$("#porcentaje"+jsonDataDP.talentos[j].porcentaje).animate({width: incremento+"%"}, 1500 );
					  
					  
				  }
				  $("<label>Hobbies:</label><br/>").appendTo(".datillos_postu_hobits");
				  for(l=0;l<=(jsonDataDP.hobits.length)-1;l++){
					 
					  
					  
					  $("<div class='contiene_Hobit'>"+jsonDataDP.hobits[l].hobbie+"</div>").appendTo(".datillos_postu_hobits");
					  
					  
					  
					  
					  
				  }
				  
				  
				  
			  }
			 );
			 return false;
	
	
}


function limpiarTodo(){
	$("#jurpp").empty();
	$("#jurpp2").empty();
}



function dibujar_recta(svg,g2,g1){
	 var fechaN=$("#palaInfo").val();
	 var birth=fechaN.split("/");
	 var bday=birth[0];
	 var bmonth=birth[1];
	 var byear=birth[2];
	 var birthDay=new Date(byear,bmonth,bday);
	 var today=new Date();
	 var yearb=birthDay.getFullYear();
	 var yeart=today.getFullYear();
	 var numyear=parseInt(yeart-yearb);
	 var width=$("#infografia").width();
	 var pix=parseInt(width/(numyear+1));
	 var j=0;
	 var y=parseInt(byear);
	 var firstY=byear.substring(2,4);
	 var year="";
	 var anio=""+firstY;

	 for(var i=1;i<=(numyear+1);i++){
	  svg.rect(g1,j,200,pix,25,{id:y,fill:'black',stroke:'dimgray',strokeWidth:5,class:"rectaN"});
	  svg.text(g1,j+5, 215, anio,{id:y+'_text',font:"arial",fontSize:10,fill:'white',class:"textos"});
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
	    
	                                           
	    
	    if(nexp<=0){
	    
	     var extension_empresa_actual=parseInt(textoX)+parseInt(empresa.length)*8;
	  var extension_puesto_actual=parseInt(textoX)+parseInt(puesto.length)*7;
	  var circleX=textoX-5;
	  
	  if((extension_empresa_actual>1110)||(extension_puesto_actual>1110)){
	   
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
	  
	  if((extension_empresa_actual>1110)||(extension_puesto_actual>1110)){
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
	       
	       if(extension_empresa>width){
	        textoY1=textoY1-20;
	        textoY2=textoY2-20;
	       }else{
	        if(extension_empresa>=extension_puesto){textoX=parseInt(textoX)+parseInt(extension_empresa)+parseInt(5);}
	        else {textoX=parseInt(textoX)+parseInt(extension_puesto)+parseInt(5);}
	        
	       }
	       
	       
	      }else if(((extension_empresa_actual>=xempresa)||(extension_puesto_actual>=xpuesto)&&(extension_puesto_actual<=extension_puesto))&&((textoY1>=yempresa)&&(textoY1<=altura))){
	       
	       textoY1=textoY1-20;
	    textoY2=textoY2-20;
	      }
	     }
	       
	     svg.text(g1,textoX,textoY1 ,empresa,{id:nexp+"_empresa",class:"empresa_titulo",font:"arial",fontSize:11,fill:'Black',fontWeight:'bold'});
	        svg.text(g1,textoX ,textoY2,puesto,{id:nexp+"_puesto",class:"empresa_titulo",font:"arial",fontSize:10,fill:'Black'});
	        svg.circle(g2,circleX,textoY1,5,{fill:colorfill,id:idexp+"_circle"});
	        svg.line(g2,circleX,textoY1,circleX,y,{id:lineaId,fill:colorfill,class:"jobline",stroke:colorfill,strokeWidth:2});
	    }
	    
	    
	    
	    
	    
	    
	    
	      
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
	   empalme=0;
	  }else{
	   empalme=empalme+1;
	  }
	 });
	 return empalme;
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
		 var colors=["crimson","darkorange","goldenrod","hotpink","chocolate","brown","orange","orangeRed","PaleVioletRed","IndianRed","DarkSalmon","YellowGreen","ForestGreen","coral","yellow","MediumOrchid","LightCoral","FireBrick","DarkOliveGreen","DarkGoldenRod"];
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
		
		
		function obtenerEmpleo(svg,g1,g2){ 
			
				var idUsuario = $("#palaInfoID").val();
			 $.post("json/obtenerEmpleo", {idUsuario:idUsuario},
			     function(jsonData) {
			          var i=0;
			          for(i=0;i<jsonData.items.length;i++){
			             var idExp=jsonData.items[i].id_exp
			          var empresa=jsonData.items[i].empresa;
			          var puesto=jsonData.items[i].puesto;
			          var fechaInicio=jsonData.items[i].fecha_inicio;
			          var fechaFin=jsonData.items[i].fecha_fin;
			          var sueldo=jsonData.items[i].sueldo;
			          var funciones=jsonData.items[i].funciones;
			          var trabajoActual=jsonData.items[i].trabajo_actual;
			          
			          var auxi=fechaInicio.split("/");
			          var imonth=auxi[1];
			          var iyear=auxi[2];
			          
			          var auxf=fechaFin.split("/");
			          var fmonth=auxf[1];
			          var fyear=auxf[2];
			          addJob(svg,g1,g2,iyear,imonth,fyear,fmonth,empresa,puesto,trabajoActual,idExp);
			         
			          
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
			 
			  
			 
			}
		
		
		function obtenerEducacion(svg,g1,g2){
			var idUsuario = $("#palaInfoID").val();
			 $.post("json/obtenerEducacion", {idUsuario:idUsuario},
			     function(jsonData) {
			          var i=0;
			          for(i=0;i<jsonData.items.length;i++){
			             var idFor=jsonData.items[i].id_formacion;
			             var nivel_academico=jsonData.items[i].nivel_academico;
			          var instituto=jsonData.items[i].instituto;
			          var fechaInicio=jsonData.items[i].fecha_inicio;
			          var fechaFin=jsonData.items[i].fecha_fin;
			          var pais_insituto=jsonData.items[i].pais_insituto;
			          var estado_instituto=jsonData.items[i].estado_instituto;
			          var status=jsonData.items[i].status;
			          var estudio_actual=jsonData.items[i].estudio_actual;
			          
			          var auxi=fechaInicio.split("/");
			          var imonth=auxi[1];
			          var iyear=auxi[2];
			          
			          var auxf=fechaFin.split("/");
			          var fmonth=auxf[1];
			          var fyear=auxf[2];
			          addSchool(svg,g1,g2,iyear,imonth,fyear,fmonth,nivel_academico,instituto,estudio_actual,idFor);
			      
			         
			         
			          
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
			 
			}


