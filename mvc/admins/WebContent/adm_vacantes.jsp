<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Administraci&oacute;n de Vacantes</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/adm_vacante_scripts.js"></script>
</head>
<body>

	<s:set name="webFramework" value="lvl"/>

	<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Administaci&oacute;n de Vacantes</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione alguna de las Siguientes Opciones</div><br/>
			
			<s:if test="%{#webFramework==1}">
				<div class="izq_vac_adm">
					<div class="btn_big" id="vac_general">
						<div class="img_vac"></div>
						<div class="text_vac2">VACANTES GENERAL</div>
					</div>
				
					
				
					<div class="btn_big" id="vac_mias">
						<div class="img_mis_vac"></div>
						<div class="text_usu2" style="margin-left: 42px;margin-top: 27px;">MIS VACANTES</div>
					</div>
					
					
					<div class="btn_big" id="nueva_vac">
						<div class="img_new_vac"></div>
						<div class="text_rep2">NUEVA VACANTE</div>
					</div>
					
				</div>
			
				
			</s:if>
			<s:elseif test="%{#webFramework==2}">
    			
				<div class="izq_vac_adm">
				
					<div class="btn_big" id="vac_general">
						<div class="img_vac"></div>
						<div class="text_vac2">VACANTES GENERAL</div>
					</div>
				
					<div class="btn_big" id="vac_mias">
						<div class="img_mis_vac"></div>
						<div class="text_usu2" style="margin-left: 35px;margin-top: 16px;">MIS VACANTES</div>
					</div>
					
					<div class="btn_big" id="nueva_vac">
						<div class="img_new_vac"></div>
						<div class="text_rep2">NUEVA VACANTE</div>
					</div>
					
					<div class="btn_big" id="vac_pred">
						<div class="vac_predef"></div>
						<div class="text_rep2">VACANTE PREDEFINIDA</div>
					</div>
					
				</div>
				
				
			</s:elseif>
			
			<s:elseif test="%{#webFramework==3}">
    			
				<div class="izq_vac_adm">
				
					<div class="btn_big" id="vac_mias">
						<div class="img_mis_vac"></div>
						<div class="text_usu2" style="margin-left: 42px;margin-top: 27px;">MIS VACANTES</div>
					</div>
					
					<div class="btn_big" id="nueva_vac">
						<div class="img_new_vac"></div>
						<div class="text_rep2">NUEVA VACANTE</div>
					</div>
					
				</div>
				
			</s:elseif>
			
			
			<s:elseif test="%{#webFramework==4}">
    			
				<div class="izq_vac_adm">
				
					<div class="btn_big" id="vac_mias">
						<div class="img_mis_vac"></div>
						<div class="text_usu2" style="margin-left: 42px;margin-top: 27px;">MIS VACANTES</div>
					</div>
					
					<div class="btn_big" id="nueva_vac">
						<div class="img_new_vac"></div>
						<div class="text_rep2">NUEVA VACANTE</div>
					</div>
					
				</div>
				
			</s:elseif>
			
			
			
			
				
		</div>
		
	</div>
	
</body>
</html>