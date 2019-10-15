<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css">
<script type="text/javascript" src="js/postular_candidato_scripts.js"></script>
<title>Insert title here</title>
</head>
<body>

<div id="content-adm">
		
		
		
		
		<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a></span>
			<h1>Candidatos Postulados</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Lista de Postulantes</div><br/>


		
		
		
		
		
		<div class="areaTrabajoIzquierda">
		
			<s:iterator id="listadoTip" value="idPsotulantes" status="it">
				<div id="<s:property value='idPsotulantes[#it.index]'/>" class="ui-widget-content jup">
					<p id="<s:property value='idPsotulantes[#it.index]'/>"><s:property value='nombresPostulantes[#it.index]'/></p>
				</div>
			</s:iterator>
			
			
			
		
		</div>
		
		
		<div class="areaTrabajoCentro" id="areaTrabajoCentro">
		jup
		</div>
		
		
		<div class="areaTrabajoDerecha">
		
			<div id="1" class="ui-widget-header jupdrop">
				<p>Soltar Aqui al Postulante</p>
				<div class="texto_vacante_drop">Vacante 1</div>
			</div>
		
			<div id="2" class="ui-widget-header jupdrop">
				<p>Soltar Aqui al Postulante</p>
				<div class="texto_vacante_drop">Vacante 2</div>
			</div>
		
		</div>
		
		
		
</div>

</body>
</html>