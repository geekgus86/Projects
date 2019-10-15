<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/despues_postular_scripts.js"></script>
<title>Resultados Postulacion</title>
</head>
<body>
	
	<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a><a href="/admins/Candidatos">Candidatos - </a></span>
			<h1>Resultados Postulacion</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Selecciona alguna de las Opciones</div><br/>
			
			<s:iterator value="listaiDVAC" status="idCan">
				<input type="hidden" value="<s:property value="listaiDVAC[#idCan.index]"/>" name="seleccion" id="seleccion"/>
			</s:iterator>
			
			<div class="resultado"><s:property value="resultado"/></div>&nbsp;&nbsp;
			<s:iterator value="idPostu" status="idCan">
				<span><s:property value="nombrePostu[#idCan.index]"/></span><br/>
			</s:iterator>
			
			
			<div class="resultado" style="font-size: 17px;"><s:property value="resultado2"/></div>&nbsp;&nbsp;
			
			<s:iterator value="idPostu2" status="idCan">
			<div style="width:250px">
				<span><s:property value="nombrePostu2[#idCan.index]"/></span>
			</div>	<br/>
			</s:iterator>
			
			
			
			<div class="campo_form3">
			    <div id="nueva_busqueda" class="btnCan" style="color:#FFFFFF;font-size: 14px;">Nueva Busqueda</div>
			    <a href="javascript:history.back(1);" class="btnCan" style="color:#FFFFFF;font-size: 14px;">Busqueda Anterior</a>
			    <div id="ver_postulantes" class="btnCan" style="color:#FFFFFF;font-size: 14px;">Ver Postulantes</div>
			    
			    <form id="enviar_vac_postu" action="" method="POST">
			    	<input type="hidden" name="id_Vacante" id="id_Vacante"/>
			    </form>
			    
			    
			</div>
			
		</div>
	</div>
	


</body>
</html>