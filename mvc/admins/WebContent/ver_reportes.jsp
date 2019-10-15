<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<link rel="stylesheet" type="text/css" href="css/cssGraficas/visualize.css">
<link rel="stylesheet" type="text/css" href="css/cssGraficas/visualize-light.css">

<script type="text/javascript" src="js/ver_reportes_scripts.js"></script>
<script type="text/javascript" src="js/excanvas.js"></script>
<script type="text/javascript" src="js/visualize.jQuery.js"></script>
<title>Reportes</title>
</head>
<body>

<s:set name="webFramework" value="lvl"/>

<div id="content">
	<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Reportes</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>

			<s:if test="%{#webFramework==2}">
				<div class="instrucciones">Seleccione un Administrador</div><br/>
			
				<div class="filtros" style="width:125px; float:left; margin-top: 20px;">Ver Reportes Por:</div>
				
				<div class="cobertura" >
					<select id="lista-admins" name="admins">
		 				<option value="0" selected="selected">Selecciona</option>
		 					<s:iterator id="listadoAdm" value="idAdmin" status="it">
		 						<option value="<s:property value='idAdmin[#it.index]'/>"><s:property value='UsuAdmin[#it.index]'/></option>
		 					</s:iterator>
		 			</select>
	 			</div><br/>
	 			
	 			<s:hidden id="FRH" name="FRH"  value="%{levlAux}"></s:hidden><br/>
				<div class="instrucciones">Da clic en el Bot&oacute;n para ver tu Reporte</div><br/>
				<button class="coberturaCaja" name="verTodo" id="verTodo" style="height: 40px;margin-top: 0;text-align: center;width: 126px;">Ver mi Reporte</button>
	 			
	 			
			</s:if>
			<s:else>
				<s:hidden id="FRH" name="FRH"  value="%{levlAux}"></s:hidden><br/>
				<div class="instrucciones">Da clic en el Bot&oacute;n para ver tu Reporte</div><br/>
				<button class="coberturaCaja" name="verTodo" id="verTodo" style="height: 40px;margin-top: 0;text-align: center;width: 126px;">Ver mi Reporte</button>
			</s:else>


			
 			
 			<div class="contieneGrafica">
 				<div class="tituloGrafica">Vacantes Totales</div><div class="contieneBar"> <div id="num_vacantes_barra" class="BarVerde"></div></div><div id="num_vacantesP"  class="contienePercent2"></div>  <div id="num_vacantesPZ"  class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Vacantes Activas</div><div class="contieneBar"> <div id="num_vacantes_activas" class="BarRojo"></div></div><div id="num_vacantes_activas_P" class="contienePercent2"></div>  <div id="num_vacantes_activas_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Vacantes Inactivas</div><div class="contieneBar"><div id="num_vacantes_inactivas" class="BarAmarillo"></div></div><div id="num_vacantes_inactivas_P" class="contienePercent2"></div>  <div id="num_vacantes_inactivas_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Vacantes En Revision CV</div><div class="contieneBar"><div id="num_vacantes_rev" class="BarRosa"></div></div><div id="num_vacantes_rev_P" class="contienePercent2"></div>  <div id="num_vacantes_rev_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Vacantes En Entrevistas</div><div class="contieneBar"><div id="num_vacantes_entrevis" class="BarCafe"></div></div><div id="num_vacantes_entrevis_P" class="contienePercent2"></div>   <div id="num_vacantes_entrevis_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Vacantes Cubiertas</div><div class="contieneBar"><div id="num_vacantes_cubiertas" class="BarMorado"></div></div><div id="num_vacantes_cubiertas_P" class="contienePercent2"></div>   <div id="num_vacantes_cubiertas_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Personas En "Postulantes"</div><div class="contieneBar"><div id="num_postulantes_PF" class="BarAnaranjado"></div></div><div id="num_postulantes_PF_P" class="contienePercent2"></div>  <div id="num_postulantes_PF_PZ" class="contienePercent"></div><br/>
 				<div class="tituloGrafica">Personas En "Mi Filtro"</div><div class="contieneBar"><div id="num_postulantes_MF" class="BarGris"></div></div><div id="num_postulantes_MF_P" class="contienePercent2"></div>   <div id="num_postulantes_MF_PZ" class="contienePercent"></div><br/>
 			</div>
 			
 			
 			
			
		</div>
</div> 
		


	




</body>
</html>