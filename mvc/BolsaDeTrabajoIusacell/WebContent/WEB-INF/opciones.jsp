<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Opciones</title>
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/opciones.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
$("#showMail").hide();
$("#showPass").hide();
$("#showDel").hide();
$("#guardar").hide();
$("#infins").hide();
});
function valCheck(value,name){
	var check=$("input[type=checkbox][name="+name+"]").is(':checked');
	if(value=='mail'){
		if(check==true){
			$("input[type=checkbox]").prop('disabled', true);
			$("input[type=checkbox][name="+name+"]").prop('disabled', false);
			$("#showMail").show();
			$("#guardar").show();
			$("#infins").show();
		}else{
			$("input[type=checkbox]").prop('disabled', false);
			$("#showMail").hide();
			$("#guardar").hide();
			$("#infins").hide();
		}
	}else if(value=='pass'){
		if(check==true){
			$("input[type=checkbox]").prop('disabled', true);
			$("input[type=checkbox][name="+name+"]").prop('disabled', false);
			$("#showPass").show();
			$("#guardar").show();
			$("#infins").show();
		}else{
			$("input[type=checkbox]").prop('disabled', false);
			$("#showPass").hide();
			$("#guardar").hide();
			$("#infins").hide();
		}
	}else if(value=='delete'){
		if(check==true){
			$("input[type=checkbox]").prop('disabled', true);
			$("input[type=checkbox][name="+name+"]").prop('disabled', false);
			$("#showDel").show();
			$("#infins").show();
		}else{
			$("input[type=checkbox]").prop('disabled', false);
			$("#showDel").hide();
			$("#infins").hide();
		}
	}
}
</script>
</head>
<body>
   
   <div id="contenedor_principal" style="margin-top:-10px;"> 
	
	<br/>
	<div class="middle_left">
		<div id="header_bienvenido" class="header_datos">
		    <h1>Opciones de Cuenta</h1>
		    <b>Seleccione la opci&oacute;n que desee modificar:</b>
		    <br/>
		    <input type="checkbox" name="mod_mail" value="mail" onclick="valCheck(this.value,this.name)">Correo Electr&oacute;nico</input>
		    <input type="checkbox" name="mod_pass" value="pass" onclick="valCheck(this.value,this.name)">Contraseña</input>
		    <input type="checkbox" name="mod_count" value="delete" onclick="valCheck(this.value,this.name)">Eliminaci&oacute;n de la Cuenta</input>
			<div id="infins" style="font-size:8pt"><b>Nota: Vuelva a dar clic en la opción para poder elegir otra.</b></div>
		</div>
		<br/>
		<div id="data_container">
		
		<div id="showMail">
		<div class="label_crear"><label>Nuevo Correo Electr&oacute;nico</label></div>
				<s:textfield
					id="imail" 
					name="imail" 
					maxlength="50"
					cssClass="caja_datos"
				/><br><br>
		</div>
		
		<div id="showPass">
		<div class="label_crear"><label>Nueva Contraseña</label></div>
				<s:password
					id="password" 
					name="password" 
					maxlength="50"
					cssClass="caja_datos"
				/><br><br>
		
				
		<div class="label_crear"><label>*Confirmar Nueva Contraseña</label></div>
				<s:password
					id="passwordConfirm" 
					name="passwordConfirm" 
					maxlength="50"
					cssClass="caja_datos"
				/><br><br>		
		
		</div>
		
		<div id="guardar" name="guardar" class="btnDelante">Guardar</div>
		<br/><br><br/><br>
		
		<div id="showDel">
		<div class="label_crear"><label>Para continuar d&eacute; clic en el siguiente bot&oacute;n:</label></div>
		<div id="Baja" name="Baja" class="btnDelante">Dar de Baja</div>
		</div>		 
		<br/>
		</div>
		
		
		
		<div class="dato_informativo">*Campos indispensables</div>
		
	</div> 
	<div class="middle_separator">
	<div class="middle_separator_top"></div>
	<div class="middle_separator_middle"></div>
	<div class="middle_separator_bottom"></div>
	</div>
	<div class="middle_right">
		<div id="busqueda">
		
			<h1>Comienza aqu&iacute; tu b&uacute;squeda</h1>
			<div style="border-bottom: 1px solid #464646;height: 201px;margin-left: 10px;width: 201px;">
			<form theme="simple" id="form_log" action="doSerch" method="POST" accept-charset="utf-8">
			
				<s:textfield cssClass="caja_bus" name="palabra_bus" id="palabra_bus_cla" />
				
				
				
				<div class="cobertura">
     <s:select  list="#{'0':'Desde', '1':'Ayer', '2':'Hace 2 dias', '3':'Hace 3 dias', '4':'Hace 4 dias', '5':'Hace 5 dias', '6':'Hace 6 dias', '7':'Hace 7 dias', '14':'Hace 14 dias', '30':'Hace 30 dias', '60':'Hace 60 dias'}" name="fecha_bus" id="fecha_bus_id" /><br/>
    </div>
   
    
    <div class="cobertura">
    <s:select  list="#{'Categoria':'Categoria', 'Administrativos':'Administrativos','Comunicaciones':'Comunicaciones','Contabilidad':'Contabilidad','Derecho':'Derecho','Educacion':'Educacion',
     'Ingenieria':'Ingenieria','Logistica y Distribucion':'Logistica y Distribucion','Manufactura':'Manufactura','Mercadotecnia':'Mercadotecnia','Recursos Humanos':'Recursos Humanos'
     ,'Tecnologias de la Informacion':'Tecnologias de la Informacion','Salud':'Salud','Ventas':'Ventas','Finanzas':'Finanzas'}" name="cate_bus" id="cate_bus" /><br/>
    </div>
    
    
    <div class="cobertura">
    <s:select 
     
     list="#{'Ciudad/Estado':'Ciudad/Estado', 
       'Aguascalientes':'Aguascalientes', 
       'Baja California':'Baja California', 
       'Baja California Sur':'Baja California Sur', 
       'Campeche':'Campeche', 
       'Chiapas':'Chiapas', 
       'Chihuahua':'Chihuahua', 
       'Coahuila de Zaragoza':'Coahuila de Zaragoza', 
       'Colima':'Colima',
       'Distrito Federal':'Distrito Federal', 
       'Durango':'Durango', 
       'Guanajuato':'Guanajuato', 
       'Guerrero':'Guerrero', 
       'Hidalgo':'Hidalgo', 
       'Jalisco':'Jalisco', 
       'México':'México', 
       'Michoacán de Ocampo':'Michoacán de Ocampo', 
       'Morelos':'Morelos', 
       'Nayarit':'Nayarit', 
       'Monterrey':'Monterrey',
       'Nuevo Leon':'Nuevo Leon', 
       'Oaxaca':'Oaxaca', 
       'Puebla':'Puebla', 
       'Queretaro':'Queretaro', 
       'Quintana Roo':'Quintana Roo', 
       'San Luis Potosi':'San Luis Potosi', 
       'Sinaloa':'Sinaloa', 
       'Sonora':'Sonora', 
       'Tabasco':'Tabasco', 
       'Tamaulipas':'Tamaulipas', 
       'Tlaxcala':'Tlaxcala', 
       'Veracruz':'Veracruz', 
       'Yucatan':'Yucatan', 
       'Zacatecas':'Zacatecas'}"
     name="ciudad_bus" 
     id="ciudad_bus"/>
     </div>
				
				
				
				
				
				
				<s:submit cssClass="btn_log1" value="" onmouseover="" onmouseout="" value="Buscar"></s:submit>
				
			</form>
		
			</div>
			
			
			
			<div class="destacados">
				<div class="destacados_log" id="destacadoslog" style="margin-top:-51px;">
						<h1>Destacados</h1>
						<ul id="contieneDestacados">
						  
						  	<s:iterator id="listadoOro" value="vacantesDestacadosOro" status="it">
						  	<li>
								<a style="background-position: 0 -26px; cursor:pointer;" id="<s:property value='vacantesDestacadosOro[#it.index]'/>" class="emergente"><s:property value='vacantesDestacadosOro2[#it.index]'/></a>
								<p><s:property value='vacantesDestacadosOro3[#it.index]'/></p>
							</li>
							</s:iterator>
						  
						</ul>
					</div>
			</div>
			
			
		</div>
					
				
				
	</div>
	
</div>
   
   <div class="modal_adv detalle_vac_tit" id="dialog_eliminar" title="Eliminar Cuenta" >
        
	        <div ><label>Esta Seguro que desea realizar esta accion, tus datos seran eliminados permanentemente y no podras seguir disfrutando de los Beneficios de la Red Profesional IUSACELL.</label></div>
          
	    </div>
	    
	<div class="modal_adv detalle_vac_tit" id="dialog_confirmar_eliminar" title="Eliminar Cuenta" >
        
	        <div ><label>Su cuenta ha sido eliminada, sera redireccionado a la pantalla principal</label></div>
          
	    </div>    
	    
	    

<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" >
        <div class="otroproceso">
         <label id="labelFol">Folio:</label><div id="num_vac" class="detalle_dentro"></div>
         <label id="labelNom">Nombre vacante:</label><div id="nom_vac" class="detalle_dentro"></div>
         <label id="labelUbi">Ubicaci&oacute;n de la Vacante:</label><div id="ubicati" class="detalle_dentro"></div>
         <label id="labelAre">&Aacute;rea de Experiencia:</label><div id="are_exp" class="detalle_dentro"></div>
         <label id="labelSal">Salario:</label><div id="salario" class="detalle_dentro"></div>
         <label id="labelHor">Horario:</label><div id="horario" class="detalle_dentro"></div>
         <label id="labelEda">Edad:</label><div id="edad" class="detalle_dentro"></div>
         <label id="labelFec">Fecha de Publici&oacute;n:</label><div id="fecha" class="detalle_dentro"></div>
         <label id="labelRes">Rese&ntilde;a:</label><div id="text_int" class="detalle_dentro"></div>
         <label id="labelNiv">Nivel de Esdudios:</label><div id="esco" class="detalle_dentro"></div>
         <label id="labelCon">Conocimientos Necesarios:</label><div id="conocimient" class="detalle_dentro"></div>
         <label id="labelTal">Talentos Solicitados:</label><div id="talent" class="detalle_dentro"></div>
         <label id="labelPrin">Principales Funciones a Desempe&ntilde;ar:</label><div id="prin_fun" class="detalle_dentro"></div>
         <label id="labelObs">Observaciones:</label><div id="observaciones" class="detalle_dentro"></div>
        </div>
</div>
   
</body>
</html>