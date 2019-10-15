<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Home Administradores</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/home_scripts.js"></script>
</head>
<body>

<s:set name="webFramework" value="lvl"/>

	<div id="content"> 
		<div id="content-adm">
		
			<s:if test="%{#webFramework==1}">
				<h1>Men&uacute; principal DSI</h1>
			</s:if>
			
			<s:if test="%{#webFramework==2}">
				<h1>Men&uacute; principal Super Administrador</h1>
			</s:if>
			
			
			<s:if test="%{#webFramework==3}">
				<h1>Men&uacute; principal Administrador</h1>
			</s:if>
			
			<s:if test="%{#webFramework==4}">
				<h1>Men&uacute; principal Calificador</h1>
			</s:if>
			
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione alguna de las Siguientes Opciones</div><br/>
			
			<s:if test="%{#webFramework==1}">
			
					<div class="btn_big" id="admins">
						<div class="img_mis_adm"></div>
						<div class="text_usu2" style="margin-left: 58px;margin-top: 8px;">ADMINS</div>
					</div>
					
					
					<div class="btn_big" id="nuevo_admin">
						<div class="img_new_adm"></div>
						<div class="text_rep2" style="margin-left: 39px;">NUEVO ADMIN</div>
					</div>
			
			</s:if>
			
			
			<s:elseif test="%{#webFramework==2}">
    			
				<div class="btn_big" id="vac_btn">
					<div class="img_vac"></div>
					<div class="text_vac">VACANTES</div>
				</div>
				<div class="btn_big" id="adm_btn">
					<div class="img_usu"></div>
					<div class="text_usu">USUARIOS</div>
				</div>
				<div class="btn_big" id="reportes">
					<div class="img_rep"></div>
					<div class="text_rep">REPORTES</div>
				</div>
				
				<div class="btn_big" id="adm_web">
					<div class="img_web"></div>
					<div class="text_rep">ADM WEB</div>
				</div>
				
				<div class="btn_big" id="adm_clus">
					<div class="img_clus"></div>
					<div class="text_clus">ADM CLUSTER</div>
				</div>
				
			</s:elseif>
			
			<s:elseif test="%{#webFramework==3}">
    			
				<div class="btn_big" id="vac_btn">
					<div class="img_vac"></div>
					<div class="text_vac">VACANTES</div>
				</div>
				
				<div class="btn_big" id="adm_btn">
					<div class="img_usu"></div>
					<div class="text_usu">USUARIOS</div>
				</div>
				
				<div class="btn_big" id="reportes">
					<div class="img_rep"></div>
					<div class="text_rep">REPORTES</div>
				</div>
			
	
			</s:elseif>
			
			<s:elseif test="%{#webFramework==4}">
    			
				<div class="btn_big" id="vac_btn">
				<div class="img_vac"></div>
				<div class="text_vac">VACANTES</div>
				</div>
				<div class="btn_big" id="adm_btn">
					<div class="img_usu"></div>
					<div class="text_usu">USUARIOS</div>
				</div>
			
				<div class="btn_big" id="reportes">
					<div class="img_rep"></div>
					<div class="text_rep">REPORTES</div>
				</div>
	
			</s:elseif>
			
			
		</div>
	</div>
</body>
</html>