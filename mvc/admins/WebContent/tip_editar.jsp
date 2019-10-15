<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/editar_tips.js"></script>
<title>Editar Tip</title>
</head>
<body>

		<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/WebAdmin">Administaci&oacute;n de Red Profesional IUSACELL - </a><a href="/admins/Tips">Tips - </a></span>
			<h1>Editar Tip</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Edite el Tip</div><br/>
			
			<div class="campo_form1_tip">
				<form theme="simple" id="form_tip_editar_save" action="TipsEditarSalvar" method="POST" accept-charset="utf-8">
					<label>Descripci&oacute;n del Tip (255 Caracteres):</label><s:textarea cssClass="area_text" name="textoTip" id="textoTip" value="%{descrip_tip}"></s:textarea><br/>
					<label>Tipo de Tip:</label><select id="tipoTipVal" name="tipoTipVal">
									 				<option value="Entrevista" selected="selected">Selecciona</option>
					 								<option value="Entrevista">Entrevista</option>
					 								<option value="Infografia">Infografia</option>
									 			</select><br/>
					<s:hidden name="tipoTip" id="tipoTipE" value="%{tipoTip}"></s:hidden>
					<s:hidden name="idTip" id="idTip" value="%{id_tip}"></s:hidden>
				</form>
			</div>
			
			
			<div class="campo_form3_tip">
				<div class="instrucciones_new_vac3">Asegurese de que todos los datos ingresados anteriormente son correctos antes de Guardar</div>
				<div id="btn_save" class="btn_save"></div>
			</div>
			
			
			
		</div>
		</div>
</body>
</html>