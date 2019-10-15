<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<title>Grupo Iusacell</title>

<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/login_scripts.js"></script>  


</head>
<body>
	<div id="over">
		<div id="header">
			<div id="content-header">
				<div id="logo">
					<div class="log_img"></div>
					<div class="texto">Bolsa de Trabajo</div>
				</div>
				<div id="dato">
					<div class="textos_admin">Nombre: <s:property value='nombreAdmin'/> </div>
					<div class="textos_admin">E-mail: <s:property value='correo'/></div>
					<input type="hidden" value="<s:property value='nombreAdmin'/>" id="NAL">
					<input type="hidden" value="<s:property value='ubicacion'/>" id="ubbbb">
					<input type="hidden" value="<s:property value='region'/>" id="reeeee">
					<input type="hidden" value="<s:property value='lvl'/>" id="nivel">
				</div>
				<div id="acciones">
					<div class="lin"><a href="/admins/cerrar">Cerrar Sesi&oacute;n</a></div>
					<div class="separacion1"></div>
					<div class="separacion2"></div>
				</div>	
		</div>
			
		</div>
		
		<div id="content">
     		<tiles:insertAttribute name="content"/>
     	</div>
     	
	</div>
</body>
</html>