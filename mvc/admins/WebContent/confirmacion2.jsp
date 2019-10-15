<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Confirmacion Vacante Nueva</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/confirmacion.js"></script>
</head>
<body>



	<div id="content"> 
		<div id="content-adm">
		
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a> <a href="/admins/VacanteAdmin">Administaci&oacute;n de Vacantes - </a> </span>
			
			
			
			<div id="agra" class="agradecimiento" style="width:850px; height:281px">
			<h3>Vacante Ingresada con Exito</h3>
			
			<p>La vacante se Ingreso con los Siguientes Datos, dar clic en el folio para desplegar toda la Informacion</p>
			<p><div class="textos_admin">Vacante: <s:property value='nombreVacante'/> </div></p>
			<p><div class="textos_admin">Folio Vacante: <a class='emergente' style="cursor:pointer;" id='<s:property value='folioVacante'/>'><s:property value='folioVacante'/></a>  </div></p>
			
			<div class="lin" style="float:left; width:200px;"><a href="/admins/VacanteNueva">Ingresar otra Vacante</a></div>
			<div class="lin" style="float:left; width:262px;"><a href="/admins/VacanteAdmin">Ir Administraci&oacute;n de Vacantes</a></div>
			
			
		</div>
			
			
			
			
			
		</div>
	</div>
	
	
<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" >
        <div class="otroproceso">
        	<label id="labelFol">Folio:</label><div id="num_vac" class="detalle_dentro"></div><br/>
        	<label id="labelNom">Nombre vacante:</label><div id="nom_vac" class="detalle_dentro"></div><br/>
        	<label id="labelUbi">Ubicaci&oacute;n de la Vacante:</label><div id="ubicati" class="detalle_dentro"></div><br/>
        	<label id="labelAre">&Aacute;rea de Experiencia:</label><div id="are_exp" class="detalle_dentro"></div><br/>
        	<label id="labelSal">Salario:</label><div id="salario" class="detalle_dentro"></div><br/>
        	<label id="labelHor">Horario:</label><div id="horario" class="detalle_dentro"></div><br/>
       		<label id="labelEda">Edad:</label><div id="edad" class="detalle_dentro"></div><br/>
        	<label id="labelFec">Fecha de Publici&oacute;n:</label><div id="fecha" class="detalle_dentro"></div><br/>
        	
        	<br/>
	        <label id="labelRes">Rese&ntilde;a:</label><br/><div id="text_int" class="detalle_dentro"></div><br/>
	        <label id="labelNiv">Nivel de Esdudios:</label><br/><div id="esco" class="detalle_dentro"></div><br/>
	        <label id="labelCon">Conocimientos Necesarios:</label><br/><div id="conocimient" class="detalle_dentro"></div><br/>
	        <label id="labelTal">Talentos Solicitados:</label><br/><div id="talent" class="detalle_dentro"></div><br/>
	        <label id="labelPrin">Principales Funciones a Desempe&ntilde;ar:</label><br/><div id="prin_fun" class="detalle_dentro"></div><br/>
	        <label id="labelObs">Observaciones:</label><br/><div id="observaciones" class="detalle_dentro"></div><br/>
        	
        </div>        
</div>


</body>
</html>