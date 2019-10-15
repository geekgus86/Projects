

$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#vac_general").click(function(){
		window.location.href="VacanteGeneral";
	});
	
	$("#vac_mias").click(function(){
		window.location.href="MisVacantes";
	});
	
	$("#nueva_vac").click(function(){
		window.location.href="VacanteNueva";
	});
	
	$("#vac_pred").click(function(){
		window.location.href="VacantePred";
	});
	
});