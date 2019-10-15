<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LOGIN ADMINISTRACI&Oacute;N</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body>
	<div id="content"> 
		<div id="content-login">
			<div class="cont_form">
				<div class="lab_text">
					<s:form theme="simple" id="form_log" action="doLogin" accept-charset="utf-8,iso-8859-1" autocomplete="off">
						<label>Usuario</label><s:textfield cssClass="campo_text" name="username" id="username"></s:textfield><br/>
						<label>Contraseña</label><s:password cssClass="campo_text" name="password" id="password" ></s:password>
						<s:submit cssClass="btn_log1" value="Ingresar"></s:submit>
					</s:form>
				</div>
				<s:actionerror cssClass="error_log"/>
			</div>
			<div class="candado"></div>
		</div>
	</div>
</body>
</html>