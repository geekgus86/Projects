

var postulanteID;

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	
	
	
	paraVacantes();
	
	
	
	
	$( "div.jup" ).draggable({
		drag: function(event, ui){
			var id = $(this).attr('id');
			resiveID(id);
		},
		revert: "invalid"
	});
	
	$( "div.jupdrop" ).draggable({
		
		revert: "invalid"
	});
	
	
	$( "div.jupdrop" ).droppable({
		acept:"div.jup",
		drop: function( event, ui ) {
			
			var id_vacante = $(this).attr('id');
			
		
			$( this ).addClass( "ui-state-highlight" ).find( "p" ).html( "Postulacion Satisfactoria");
			
			
			alertify.alert("Pstulante: " + postulanteID +" A la Vacante:  "+id_vacante);
			
		}
	});
	
	
	
	
	
	
	
});

function resiveID(id){
	 postulanteID =id;
	
}

function paraVacantes(){
	var lvlup = $("#aswlvl").val();
	var idAdmin = lvlup;
	if (lvlup == 1){
		JsonAndAjax();
	}else{
		JsonAndAjaxMisVacantes(idAdmin);
	}
}



function JsonAndAjaxMisVacantes(idAdmin){
	 $.getJSON('json/giveMeMisVacantes',{idAdmin:idAdmin},
	  function(jsonDataMV) {
		  if(eval(jsonDataMV)){
			  var vacante = eval(jsonDataMV);
			  $("#ttt").html("");
			  
			  for(j=0;j<=(jsonDataMV.items.length)-1;j++){
				  
				 
				  
				  var table = document.getElementById("ttt");
				  var row = table.insertRow(0);
				  row.id=""+jsonDataMV.items[j].id_vacante+"";
				  row.className="adminRowVac2";
				  var cell1=row.insertCell(0);
				  cell1.id="jup";
				  cell1.className="adminDataVac";
				  var cell2=row.insertCell(1);
				  cell2.id="jup";
				  cell2.className="adminDataVac";
				  var cell3=row.insertCell(2);
				  cell3.id="jup";
				  cell3.className="adminDataVac";
				  var cell4=row.insertCell(3);
				  cell4.id="jup";
				  cell4.className="adminDataVac";
				  var cell5=row.insertCell(4);
				  cell5.id="jup";
				  cell5.className="adminDataVac";
				  var cell6=row.insertCell(5);
				  cell6.id="jup";
				  cell6.className="adminDataVac";
				  var cell7=row.insertCell(6);
				  cell7.id="jup";
				  cell7.className="adminDataVac";
				  
				  
				  cell1.innerHTML=""+jsonDataMV.items[j].folio+"";
				  cell2.innerHTML="<a class='emergente'  id='"+jsonDataMV.items[j].folio+"'>"+jsonDataMV.items[j].nombre+"</a>";
				  cell3.innerHTML=""+jsonDataMV.items[j].fechaP+"";
				  cell4.innerHTML=""+jsonDataMV.items[j].fechaV+"";
				  cell5.innerHTML=""+jsonDataMV.items[j].subido_por+"";
				  cell6.innerHTML=""+jsonDataMV.items[j].vac_ubi_vacante+"";
				  var jup="";
				  if(jsonDataMV.items[j].destacado==1){
					  jup = "<div class='estrellaOro'></div>";
				  }else if(jsonDataMV.items[j].destacado==2){
					  jup="<div class='estrellaPlata'></div>";
				  }else if(jsonDataMV.items[j].destacado==3){
					  jup="<div class='estrellaRojo'></div>";
				  }else if(jsonDataMV.items[j].destacado==0){
					  jup="<div class='estrellaNo'></div>";
				  }
				  
				  cell7.innerHTML=""+jup+"";
				  
				  
			  }
			  
			  $(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
			  
			  $("tr.adminRowVac2").mouseover(function(){
				  $(this).css("background-color","#CA3B3B ");
				  $(this).css("color","white");
				  
				  	
			   });
			  
			  $("tr.adminRowVac2").mouseleave(function(){
				  
				  if($(this).attr("id")!=$("#seleccion").val())
					  $(this).css("color","black");
				  	  $("a.emergente").css("color","red");
				  
			   });
			  
			  $("tr.adminRowVac2").click(function(){
				  var id=$(this).attr("id");
				  $("#seleccion").val(id);
				  $("tr.adminRowVac2").css("color","black");
				  $("a.emergente").css("color","withe");
				  
			   });
			  
		  }
	  }
	 );
	 return false;
}


function JsonAndAjax() {
	 $.getJSON('json/giveMeJsonData',
	  function(jsonData) {
		  if(eval(jsonData)){
			  var vacante = eval(jsonData);
			  $("#ttt").html("");
			  
			  for(j=0;j<=(jsonData.items.length)-1;j++){
				  
				  
				  
				  var table = document.getElementById("ttt");
				  var row = table.insertRow(0);
				  row.id=""+jsonData.items[j].id_vacante+"";
				  row.className="adminRowVac2";
				  var cell1=row.insertCell(0);
				  cell1.id="jup";
				  cell1.className="adminDataVac";
				  var cell2=row.insertCell(1);
				  cell2.id="jup";
				  cell2.className="adminDataVac";
				  var cell3=row.insertCell(2);
				  cell3.id="jup";
				  cell3.className="adminDataVac";
				  var cell4=row.insertCell(3);
				  cell4.id="jup";
				  cell4.className="adminDataVac";
				  var cell5=row.insertCell(4);
				  cell5.id="jup";
				  cell5.className="adminDataVac";
				  var cell6=row.insertCell(5);
				  cell6.id="jup";
				  cell6.className="adminDataVac";
				  var cell7=row.insertCell(6);
				  cell7.id="jup";
				  cell7.className="adminDataVac";
				  
				  
				  cell1.innerHTML=""+jsonData.items[j].folio+"";
				  cell2.innerHTML="<a class='emergente'  id='"+jsonData.items[j].folio+"'>"+jsonData.items[j].nombre+"</a>";
				  cell3.innerHTML=""+jsonData.items[j].fechaP+"";
				  cell4.innerHTML=""+jsonData.items[j].fechaV+"";
				  cell5.innerHTML=""+jsonData.items[j].subido_por+"";
				  cell6.innerHTML=""+jsonData.items[j].vac_ubi_vacante+"";
				  var jup="";
				  if(jsonData.items[j].destacado==1){
					  jup = "<div class='estrellaOro'></div>";
				  }else if(jsonData.items[j].destacado==2){
					  jup="<div class='estrellaPlata'></div>";
				  }else if(jsonData.items[j].destacado==3){
					  jup="<div class='estrellaRojo'></div>";
				  }else if(jsonData.items[j].destacado==0){
					  jup="<div class='estrellaNo'></div>";
				  }
				  
				  cell7.innerHTML=""+jup+"";
				  
				  
			  }
			  
			  $(".emergente").click(function(){
					var num_folio = $(this).attr('id');
					$("#num_vac").text(num_folio);
					JsonAndAjaxDetalleVacante(num_folio);
					$( "#dialog_vacante" ).dialog( "open");
				});
			  
			  $("tr.adminRowVac2").mouseover(function(){
				  $(this).css("background-color","#CA3B3B ");
				  $(this).css("color","white");
				  
				  	
			   });
			  
			  $("tr.adminRowVac2").mouseleave(function(){
				  
				  if($(this).attr("id")!=$("#seleccion").val())
					  $(this).css("color","black");
				  	  $("a.emergente").css("color","red");
				  
			   });
			  
			  $("tr.adminRowVac2").click(function(){
				  var id=$(this).attr("id");
				  $("#seleccion").val(id);
				  $("tr.adminRowVac2").css("color","black");
				  $("a.emergente").css("color","withe");
				  
			   });
			  
		  }
	  }
	 );
	 return false;
}

