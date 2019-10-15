<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Administraci&oacute;n de Vacantes</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/adm_usuarios_scripts.js"></script>
</head>
<body>

	<s:set name="webFramework" value="lvl"/>

	<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Administaci&oacute;n de Usuarios</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione alguna de las Siguientes Opciones</div><br/>
			
			<s:if test="%{#webFramework==1}">
				<div class="izq_vac_adm" style="margin-left:19px; width:1025px">
					<div class="btn_big" id="usuarios_g">
						<div class="img_usu"></div>
						<div class="text_vac2" style="margin-left: 43px;margin-top: 2px;width: 106px;">CANDIDATOS</div>
					</div>
				
					
				
					<div class="btn_big" id="admins">
						<div class="img_mis_adm"></div>
						<div class="text_usu2" style="margin-left: 71px;margin-top: 10px;">ADMINS</div>
					</div>
					
					
					<div class="btn_big" id="nuevo_admin">
						<div class="img_new_adm"></div>
						<div class="text_rep2" style="margin-left: 48px;">NUEVO ADMIN</div>
					</div>
					
					
					
					<div class="btn_big" id="postulante">
						<div class="img_postus"></div>
						<div class="text_rep2" style="margin-left: 41px;margin-top: -1px;">POSTULANTES</div>
					</div>
					
					
					
				</div>
			
			
			</s:if>
			
			<s:elseif test="%{#webFramework==2}">
			
				<div class="izq_vac_adm" style="margin-left:19px;">
					<div class="btn_big" id="usuarios_g">
						<div class="img_usu"></div>
						<div class="text_vac2" style="margin-left: 43px;margin-top: 2px;width: 106px;">CANDIDATOS</div>
					</div>
				
					
				
				
					<div class="btn_big" id="postulante">
						<div class="img_postus"></div>
						<div class="text_rep2" style="margin-left: 41px;margin-top: -1px;">POSTULANTES</div>
					</div>
					
					
					<div class="btn_big" id="filtroS">
						<div class="img_fil"></div>
						<div class="text_rep2" style="margin-left: 50px;">MI FILTRO</div>
					</div>
					
					<div class="btn_big" id="admin_cuenta">
						<div class="img_admin"></div>
						<div class="text_rep2" style="margin-left: 50px;">ADMIN. DE CUENTAS</div>
					</div>
					
					
				</div>
			
				
				
			
			</s:elseif>
			
			<s:else>
    			
				<div class="izq_vac_adm" style="margin-left:19px;">
					<div class="btn_big" id="usuarios_g">
						<div class="img_usu"></div>
						<div class="text_vac2" style="margin-left: 43px;margin-top: 2px;width: 106px;">CANDIDATOS</div>
					</div>
					
					<div class="btn_big" id="postulante">
						<div class="img_postus"></div>
						<div class="text_rep2" style="margin-left: 41px;margin-top: -1px;">POSTULANTES</div>
					</div>
					
					
					<div class="btn_big" id="filtroS">
						<div class="img_fil"></div>
						<div class="text_rep2" style="margin-left: 50px;">MI FILTRO</div>
					</div>
					
					<div class="btn_big" id="admin_cuenta">
						<div class="img_admin"></div>
						<div class="text_rep2" style="margin-left: 50px;">ADMIN. DE CUENTAS</div>
					</div>
					
				</div>
				
				
				
				
			</s:else>
			
			
			
			
				
		</div>
		
	</div>
	
</body>
</html>