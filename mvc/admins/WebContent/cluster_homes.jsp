<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Clusters</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/cluster_scripts.js"></script>
</head>
<body>


<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Clusters</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione una de las Opciones Siguientes</div><br/>
		
		
			<div class="contieneTabs">
				
					<div id="tab1" class="tab1">
						Ubicaciones Clusters
					</div>
					<div id="tab2" class="tab2">
						Asignar Calificadores a Clusters
					</div>
			
			</div>
			
			<div class="contenidoClusters">
			
				<div id="contentUbCl" class="contentUbiCLus">
					
					
					<div class="cobertura" >
						<select id="lista-admins" name="admins">
			 				<option value="0" selected="selected">Selecciona</option>
			 					<s:iterator id="listadoAdm" value="idAdmin" status="it">
			 						<option value="<s:property value='idAdmin[#it.index]'/>"><s:property value='UsuAdmin[#it.index]'/></option>
			 					</s:iterator>
			 			</select>
	 				</div><br/>
	 				
	 				
	 				<div class="tabla_ubicaciones">
						<table id="tabla" >
							<thead>
								<tr class="adminHeaderVac">
									<td style=" width:500px;" class="adminRowVac">Lista de Ubicaciones</td>
								</tr>
								
							</thead>
							
							<tbody id ="ttt" class="cuerpo_tabla" >
								
							</tbody>

						</table>
					</div>
					
					<div class="accionesUbicacion">
					
						<div id="btnNuevoUb" class="btnAdmin" style="font-size:12px">Agregar Ubicacion</div><br/>	
						<div id="btnNuevoQubi" class="btnAdmin" style="font-size:12px">Quitar Ubicacion</div>	
					
						<input type="hidden" value="" id="adminId" />
						<input type="hidden" value="" id="estadoId" />
						<input type="hidden" value="" id="ubicacionCambiarId" />
					
					</div>
					
					
				</div>
				
				<div id="contentAsiCl" class="contentAsigCLus">
					
					<div class="cobertura" >
						<select id="lista-admins2" name="admins">
			 				<option value="0" selected="selected">Selecciona</option>
			 					<s:iterator id="listadoAdm2" value="idAdmin2" status="it">
			 						<option value="<s:property value='idAdmin2[#it.index]'/>"><s:property value='UsuAdmin2[#it.index]'/></option>
			 					</s:iterator>
			 			</select>
	 				</div><br/>
	 				
	 				
	 				<div class="tabla_ubicaciones">
						<table id="tablaCalif" >
							<thead>
								<tr class="adminHeaderVac">
									<td style=" width:500px;" class="adminRowVac">Lista de Calificadores</td>
								</tr>
								
							</thead>
							
							<tbody id ="tttCalif" class="cuerpo_tabla" >
								
							</tbody>

						</table>
					</div>
	 				
	 				
					<div class="accionesUbicacion">
					
						<div id="btnNuevoCalif" class="btnAdmin" style="font-size:12px">Agregar Calificador</div><br/>	
						<div id="btnNuevoQcalif" class="btnAdmin" style="font-size:12px">Quitar Calificador</div>	
					
						<input type="hidden" value="" id="adminIdClus" />
						<input type="hidden" value="" id="adminIdCalifClus" />
						<input type="hidden" value="" id="quitarIdAdminClus" />
					
					</div>
					
					
					
				</div>
			
			
			</div>
		
		
		
		
		
		
		
		
		</div>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="Ubicacion" class="otroproceso" >
        <div class="otroproceso">
        	
        	<label class="detalle_vac_tit">Selecciona Estado:</label><div id="nom_vac" class="detalle_dentro"></div><br/>
        	
        	<div class="coberturaBC" >
				 			<select id="estado" name="estado"  style="width:250px;">
					 				<option value="0" selected="selected">Selecciona</option>
	 							<s:iterator id="listadoEstados" value="estado" status="it">
 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estado[#it.index]'/></option>
 								</s:iterator>
				 			</select><br/>
        	</div>
        </div>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_vacante2" title="Calificadores" class="otroproceso" >
        <div class="otroproceso">
        	
        	<label class="detalle_vac_tit">Selecciona El Calificador:</label><div id="nom_vac" class="detalle_dentro"></div><br/>
        	
        	<div class="cobertura" >
						<select id="lista-admins3" name="admins">
			 				<option value="0" selected="selected">Selecciona</option>
			 					<s:iterator id="listadoAdm3" value="idAdmin3" status="it">
			 						<option value="<s:property value='idAdmin3[#it.index]'/>"><s:property value='UsuAdmin3[#it.index]'/></option>
			 					</s:iterator>
			 			</select>
	 				</div><br/>
        </div>
</div>



</body>
</html>