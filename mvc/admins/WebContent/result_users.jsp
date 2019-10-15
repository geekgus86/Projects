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
<title>Insert title here</title>
</head>
<body>
<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a>-<a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a>-<a href="/admins/redirBsq">Busqueda de Usuarios - </a></span>
			<h1>Resultado de la Busqueda</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Para modificar alguna informacion solo reemplace los valores por los nuevos valores, y de click al boton modificar</div><br/>
	<form action="modUser" method="post" name="datos">
		<s:iterator value="recibeInfo">
		<s:textfield id="nombre" name="nombre" label="Nombre" value="%{nombre}" /><br/><br/>
		<s:textfield id="a_p" name="a_p" label="Apellido Paterno" value="%{a_p}" /><br/><br/>
		<s:textfield id="a_m" name="a_m" label="Apellido Materno" value="%{a_m}" /><br/><br/>
		<s:textfield id="password" name="password" label="Password" value="%{password}" /><br/><br/>
		<s:textfield id="tel" name="tel" label="Telefono" value="%{tel}" /><br/><br/>
		<s:hidden id="mail" name="mail" value="%{mail}" /><br/><br/>
		</s:iterator>
		<s:submit id="modif" name="modif" value="Modificar" />
	</form>
	</div>
</body>
</html>