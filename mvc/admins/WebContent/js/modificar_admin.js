$(document).ready(function(){
	
	$("#dato").show();
	$("#acciones").show();
	
	$("#estado").change(function(){
		var estad = $("#estado").val();
		cambiarEstado(estad);
	});
	
	var ubucac = $("#ubicacion").val();
	selectChange(ubucac);
	
	
	var regionH = $("#regionH").val();
	
	$("#region").val(regionH);
	
	var estatusH = $("#estatusH").val();
	
	$("#estatus").val(estatusH);
	
	

	   $("#btnModif").click(function(){
		   var nombre=$("#nombre").val();
		   var cec=$("#cec").val();
		   var email=$("#email").val();
		   var nivelAdmin=$("#nivelAdmin").val();
		   var ubicacion = $("#ubicacion").val();
		   var region  =  $("#region").val();
		   if(nombre==""||nombre==null||cec==""||cec==null||email==""||email==null || ubicacion=="" || region==""){
			   alertify.alert("Faltan datos por llenar");
		   }else{
			   $('#modificarAdmin').submit();
			   
			  
			   
			   
		   }
	   });
	
});


function selectChange(ubucac){
	var variable = ubucac;
	
	if (ubucac=="Aguascalientes"){
		$("#estado").val(1);
	}else if(ubucac=="Baja California"){
		$("#estado").val(2);
	}else if(ubucac=="Baja California Sur"){
		$("#estado").val(3);
	}else if(ubucac=="Campeche"){
		$("#estado").val(4);
	}else if(ubucac=="Chiapas"){
		$("#estado").val(5);
	}else if(ubucac=="Chihuahua"){
		$("#estado").val(6);
	}else if(ubucac=="Coahuila de Zaragoza"){
		$("#estado").val(7);
	}else if(ubucac=="Colima"){
		$("#estado").val(8);
	}else if(ubucac=="Durango"){
		$("#estado").val(9);
	}else if(ubucac=="Guanajuato"){
		$("#estado").val(10);
	}else if(ubucac=="Guerrero"){
		$("#estado").val(11);
	}else if(ubucac=="Hidalgo"){
		$("#estado").val(12);
	}else if(ubucac=="Jalisco"){
		$("#estado").val(13);
	}else if(ubucac=="México"){
		$("#estado").val(14);
	}else if(ubucac=="Michoacan de Ocampo"){
		$("#estado").val(15);
	}else if(ubucac=="Morelos"){
		$("#estado").val(16);
	}else if(ubucac=="Nayarit"){
		$("#estado").val(17);
	}else if(ubucac=="Nuevo Leon"){
		$("#estado").val(18);
	}else if(ubucac=="Oaxaca"){
		$("#estado").val(19);
	}else if(ubucac=="Puebla"){
		$("#estado").val(20);
	}else if(ubucac=="Queretaro"){
		$("#estado").val(21);
	}else if(ubucac=="Quintana Roo"){
		$("#estado").val(22);
	}else if(ubucac=="San Luis Potosi"){
		$("#estado").val(23);
	}else if(ubucac=="Sinaloa"){
		$("#estado").val(24);
	}else if(ubucac=="Sonora"){
		$("#estado").val(25);
	}else if(ubucac=="Tabasco"){
		$("#estado").val(26);
	}else if(ubucac=="Tamaulipas"){
		$("#estado").val(27);
	}else if(ubucac=="Tlaxcala"){
		$("#estado").val(28);
	}else if(ubucac=="Veracruz de Ignacio de la Llave"){
		$("#estado").val(29);
	}else if(ubucac=="Yucatán"){
		$("#estado").val(30);
	}else if(ubucac=="Zacatecas"){
		$("#estado").val(31);
	}else if(ubucac=="Distrito Federal"){
		$("#estado").val(32);
	}
}



function cambiarEstado(estad){
	var estado = estad;
	
	if(estado == 1){
		$("#ubicacion").val("");
		$("#ubicacion").val("Aguascalientes");
	}else if(estado == 2){
		$("#ubicacion").val("");
		$("#ubicacion").val("Baja California");
	}else if(estado == 3){
		$("#ubicacion").val("");
		$("#ubicacion").val("Baja California Sur");
	}else if(estado == 4){
		$("#ubicacion").val("");
		$("#ubicacion").val("Campeche");
	}else if(estado == 5){
		$("#ubicacion").val("");
		$("#ubicacion").val("Chiapas");
	}else if(estado == 6){
		$("#ubicacion").val("");
		$("#ubicacion").val("Chihuahua");
	}else if(estado == 7){
		$("#ubicacion").val("");
		$("#ubicacion").val("Coahuila de Zaragoza");
	}else if(estado == 8){
		$("#ubicacion").val("");
		$("#ubicacion").val("Colima");
	}else if(estado == 9){
		$("#ubicacion").val("");
		$("#ubicacion").val("Durango");
	}else if(estado == 10){
		$("#ubicacion").val("");
		$("#ubicacion").val("Guanajuato");
	}else if(estado == 11){
		$("#ubicacion").val("");
		$("#ubicacion").val("Guerrero");
	}else if(estado == 12){
		$("#ubicacion").val("");
		$("#ubicacion").val("Hidalgo");
	}else if(estado == 13){
		$("#ubicacion").val("");
		$("#ubicacion").val("Jalisco");
	}else if(estado == 14){
		$("#ubicacion").val("");
		$("#ubicacion").val("México");
	}else if(estado == 15){
		$("#ubicacion").val("");
		$("#ubicacion").val("Michoacan de Ocampo");
	}else if(estado == 16){
		$("#ubicacion").val("");
		$("#ubicacion").val("Morelos");
	}else if(estado == 17){
		$("#ubicacion").val("");
		$("#ubicacion").val("Nayarit");
	}else if(estado == 18){
		$("#ubicacion").val("");
		$("#ubicacion").val("Nuevo Leon");
	}else if(estado == 19){
		$("#ubicacion").val("");
		$("#ubicacion").val("Oaxaca");
	}else if(estado == 20){
		$("#ubicacion").val("");
		$("#ubicacion").val("Puebla");
	}else if(estado == 21){
		$("#ubicacion").val("");
		$("#ubicacion").val("Queretaro");
	}else if(estado == 22){
		$("#ubicacion").val("");
		$("#ubicacion").val("Quintana Roo");
	}else if(estado == 23){
		$("#ubicacion").val("");
		$("#ubicacion").val("San Luis Potosi");
	}else if(estado == 24){
		$("#ubicacion").val("");
		$("#ubicacion").val("Sinaloa");
	}else if(estado == 25){
		$("#ubicacion").val("");
		$("#ubicacion").val("Sonora");
	}else if(estado == 26){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tabasco");
	}else if(estado == 27){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tamaulipas");
	}else if(estado == 28){
		$("#ubicacion").val("");
		$("#ubicacion").val("Tlaxcala");
	}else if(estado == 29){
		$("#ubicacion").val("");
		$("#ubicacion").val("Veracruz de Ignacio de la Llave");
	}else if(estado == 30){
		$("#ubicacion").val("");
		$("#ubicacion").val("Yucatán");
	}else if(estado == 31){
		$("#ubicacion").val("");
		$("#ubicacion").val("Zacatecas");
	}else if(estado == 32){
		$("#ubicacion").val("");
		$("#ubicacion").val("Distrito Federal");
	}
}