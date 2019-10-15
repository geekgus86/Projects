dojo.require("dojox.validate"); 				/*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO*/
dojo.require("dijit.form.ValidationTextBox");	/*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO PARA CAJAS DE TEXTO*/
dojo.require("dijit.form.DateTextBox");			/*SOLICITANDO LAS ACCIONES Y COMPLEMENTOS DE DATEPICKER [COMBO BOX DE LA FECHA]*/
dojo.require("dojox.validate.web");				/*SOLICITANDO LAS ACCIONES DE VALIDACION DE DOJO PARA WEB'S Y CORREOS ELECTRONICOS*/


function evaluar(){
	var apellido_p    = dojo.byId( "nom" ).value;
	var apellido_m    = dojo.byId( "apellido_m" ).value;
	var nom 	      = dojo.byId( "nom" ).value;
	var imail         = dojo.byId( "imail" ).value;
	var usr           = dojo.byId( "usr" ).value;
	var contra        = dojo.byId( "contra" ).value;
	var contra_again  = dojo.byId( "contra_again" ).value;
	var como_seEntero = dojo.byId( "como_seEntero" ).value;
	
	if(apellido_p=="" || apellido_m=="" || nom=="" || imail=="" || usr=="" || contra=="" || contra_again=="" || como_seEntero=="00"){
		alert("Rellene todo los datos con *");
	}else{
		alert("Todo Bien");
	}
	
}


