
$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	$("#tabla").hide();
	
	
	
	$("#lista-admins").change(function(){
		  var idAdmin = $(this).val();
		  
		  ReporteAdmin(idAdmin);

	  });
	
	$("#verTodo").click(function (){
		var aux = $("#FRH").val();
		var idAdmin = aux;
		
		  ReporteAdmin(idAdmin);
	});
	
	
	$("#num_vacantes_barra").css("width","0");
	
	$("#num_vacantes_activas").css("width","0");
	
	$("#num_vacantes_inactivas").css("width","0");
	
	$("#num_vacantes_cubiertas").css("width","0");
	
	$("#num_postulantes_PF").css("width","0");
	
	$("#num_postulantes_MF").css("width","0");
	
	$("#num_vacantes_rev").css("width","0");
	
	$("#num_vacantes_entrevis").css("width","0");
	
	$("div.removible").click(function(){
		var id =  $(this).attr("id");
		
	});
	
	
	$('table').visualize({type: 'pie', height: '300px', width: '420px'});
	
	
});

function crecebarraNumVac(porcentajeVT){
	var valor = porcentajeVT;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_barra").animate({width: incremento+"%"}, 1500 );

}

function crecebarraNumVacAc(porcentajeVA){
	var valor = porcentajeVA;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_activas").animate({width: incremento+"%"}, 1500 );

}

function crecebarraNumVacInac(porcentajeVI){
	var valor = porcentajeVI;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_inactivas").animate({width: incremento+"%"}, 1500 );

}


function crecebarraNumVacCV(porcentajeVCV){
	var valor = porcentajeVCV;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_rev").animate({width: incremento+"%"}, 1500 );

}


function crecebarraNumVacET(porcentajeET){
	var valor = porcentajeET;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_entrevis").animate({width: incremento+"%"}, 1500 );

}



function crecebarraNumVacCu(porcentajeVC){
	var valor = porcentajeVC;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_vacantes_cubiertas").animate({width: incremento+"%"}, 1500 );

}

function crecebarraNumPostuPF(porcentajePPF){
	var valor = porcentajePPF;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_postulantes_PF").animate({width: incremento+"%"}, 1500 );

}

function crecebarraNumPostuMF(porcentajePMF){
	var valor = porcentajePMF;
	var incremento = parseInt(valor);
	
	if(incremento == 100){incremento = incremento + 5;}
	
	$("#num_postulantes_MF").animate({width: incremento+"%"}, 1500 );

}




function  ReporteAdmin(idAdmin){
	var idAdmin = idAdmin;
	 $.getJSON('json/numeroVacantes' ,{idAdmin: idAdmin},
			  function(jsonDataRV) {
				  

		 			
		 			var vacantesTotales = parseInt(jsonDataRV.numeroVacantesTotales[0].numVacTotalesP);
		 			
		 			var usuariosTotales = parseInt(jsonDataRV.numeroUsuariosTotales[0].numUsuTotalesP);
		 			
		 			
		 			var vacAdmin = parseInt(jsonDataRV.numeroVacantes[0].num_vacantes);
		 			
		 			var porcentajeVT = parseInt( ((vacAdmin * 100)/vacantesTotales) );
		 			
		 			
		 		  $("#num_vacantesPZ").text(vacAdmin);
				  
				  $("#num_vacantesP").text(porcentajeVT+"%");
				  
				  crecebarraNumVac(porcentajeVT);
				  
				  
				  
				  var vacAdminActivas = parseInt(jsonDataRV.lasActivas[0].num_vacantes_activas);
				  
				  var porcentajeVA = parseInt( ((vacAdminActivas * 100)/vacantesTotales) );
				  
				  $("#num_vacantes_activas_PZ").text(vacAdminActivas);
				  
				  $("#num_vacantes_activas_P").text(porcentajeVA+"%");
				  
				  crecebarraNumVacAc(porcentajeVA);
				  
				  
				  
				  var vacAdminInactivas = parseInt(jsonDataRV.lasInactivas[0].num_vacantes_inactivas);
				  
				  var porcentajeVI = parseInt( ((vacAdminInactivas * 100)/vacantesTotales) );
				  
				  $("#num_vacantes_inactivas_PZ").text(vacAdminInactivas);
				  
				  $("#num_vacantes_inactivas_P").text(porcentajeVI+"%");
				  
				  crecebarraNumVacInac(porcentajeVI);
				  
				  
				  
				  
				  
				  
				  var vacAdminRevisionCV = parseInt(jsonDataRV.lasEnCV[0].num_vacantes_en_cv);
				  
				  var porcentajeVCV = parseInt( ((vacAdminRevisionCV * 100)/vacantesTotales) );
				  
				  $("#num_vacantes_rev_PZ").text(vacAdminRevisionCV);
				  
				  $("#num_vacantes_rev_P").text(porcentajeVCV+"%");
				  
				  crecebarraNumVacCV(porcentajeVCV);
				  
				  
				  
				  
				  var vacAdminEntrevis = parseInt(jsonDataRV.lasEnEntrevis[0].num_vacantes_en_entrevis);
				  
				  var porcentajeET = parseInt( ((vacAdminEntrevis * 100)/vacantesTotales) );
				  
				  $("#num_vacantes_entrevis_PZ").text(vacAdminEntrevis);
				  
				  $("#num_vacantes_entrevis_P").text(porcentajeET+"%");
				  
				  crecebarraNumVacET(porcentajeET);
				  
				  
				  
				  
				  
				  
				  
				  var vacAdminCubiertas = parseInt(jsonDataRV.lasCubiertas[0].num_vacantes_cubiertas);
				  
				  var porcentajeVC = parseInt( ((vacAdminCubiertas * 100)/vacantesTotales) );
				  
				  $("#num_vacantes_cubiertas_PZ").text(vacAdminCubiertas);
				  
				  $("#num_vacantes_cubiertas_P").text(porcentajeVC+"%");
				  
				  crecebarraNumVacCu(porcentajeVC);
				  
				  
				  
				  
				  var postulantesPF = parseInt(jsonDataRV.losPostuPF[0].num_postu_PF);
				  
				  var porcentajePPF = parseInt( ((postulantesPF * 100)/usuariosTotales) );
				  
				  
				  $("#num_postulantes_PF_PZ").text(postulantesPF);
				  
				  $("#num_postulantes_PF_P").text(porcentajePPF+"%");
				  
				  crecebarraNumPostuPF(porcentajePPF);
				  
				  
				  
				  var postulantesMF = parseInt(jsonDataRV.losPostuMF[0].num_postu_MF);
				  
				  var porcentajePMF = parseInt( ((postulantesMF * 100)/usuariosTotales) );
				  
				  $("#num_postulantes_MF_PZ").text(postulantesMF);
				  
				  $("#num_postulantes_MF_P").text(porcentajePMF+"%");
				  
				  crecebarraNumPostuMF(porcentajePMF);
				  
				  
				  
				  for(j=0;j<=(jsonDataRV.lasVacantes.length)-1;j++){
					  $("<div class='removible' id='"+jsonDataRV.lasVacantes[j].id_vacante+"'><p>"+jsonDataRV.lasVacantes[j].nombre_vacante+"</p></div>").appendTo(".contien_vac2");
				  }
				  
				  $("div.removible").click(function(){
						var id =  $(this).attr("id");
						verPostu(id);
					});
				 
				 
				  
			  }
	);
}




function verPostu(id){
	
	$.getJSON('json/verPostulantes' ,
			  {id: id},
			  function(jsonDataVPR) {
				 
				  
				  var  jup = jsonDataVPR.items.length;
				  
				 
				  
				  if( jup == 0){
					  $("<div class='removible2' id='nada'><p>0</p></div>").appendTo(".contien_vac3");
				  }else{
					  $("<div class='removible2' id='"+jsonDataVPR.items[0].id+"'><p>"+jsonDataVPR.items[0].id+"</p></div>").appendTo(".contien_vac3");
				  }
				  
				  
				  
				  
			  }
	);
	
}

