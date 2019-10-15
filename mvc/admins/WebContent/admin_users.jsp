<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/ver_primer_filtro_scripts.js"></script>
<title>Administracion de Usuarios</title>
</head>
<body>
	<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a>-</a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a></span>
			<h1>Busqueda de Usuarios</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Ingrese el correo electronico del usuario a buscar</div><br/>
		<s:form action="busqUser" method="post">
		<s:textfield id="mail" name="mail" label="Correo Electronico" value="" />
		<s:submit id="buscar" name="buscar" value="Buscar" /><br/><br/>
		</s:form>
	</div>	
</body>
</html>