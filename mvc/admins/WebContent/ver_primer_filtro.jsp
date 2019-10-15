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
<title>Mi Primer Filtro</title>
</head>
<body>

	 <div id="content"> 
	 
	 		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a><a href="javascript:history.back(1);">Regresar - </a></span>
			<h1>Mi Filtro</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Selecciona a un Postulante de  la "Lista de Postulantes" y realiza una de las acciones de la parte de abajo</div><br/>
			
			   <s:actionerror cssClass="error_log"/>
			
			<div class="filtros">				
				<label style="float:left; margin-top: 20px;">Filtrar por:</label>
				<div class="cobertura" style="float:left;" >
					<select id="lista-vacs-filtro" name="admins">
		 				<option value="0" selected="selected">Vacante</option>
		 					<s:iterator id="listadoAdm" value="vacanteListaId" status="it">
		 						<option value="<s:property value='vacanteListaId[#it.index]'/>"><s:property value='vacanteLista[#it.index]'/></option>
		 					</s:iterator>
		 			</select>
	 			</div><br/>
	 			
	 			
	 			 
			</div>
			
			<div id="simbologia" style="margin-left: 32px;margin-top: 42px;">
		  	 		<div class="trabajando"></div> <div style="float:left;  margin-right: 20px; font-size:10px;">  Trabajando  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="noCubrePerfil"></div> No cubre el perfil  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="amenaza"></div> Amenaza  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="noAceptoSueldo"></div> No acepto el sueldo  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="noFueSeleccionado"></div> No fue seleccionado  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="contratadoPromo"></div> Contratado/promocionado  </div>
		  	</div>
			
			<div class="data_container2" style="margin-top: 15px;">
		
			<form id="jup" method="POST" action="" accept-charset="utf-8,iso-8859-1">
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				    <td class="adminRow" style="font-size:13px;">Nombre Postulado</td>
				    <td class="adminRow" style="font-size:13px;">Vacante</td>
				    <td class="adminRow" style="font-size:13px;">Tel&eacute;fono</td>
				    <td class="adminRow" style="font-size:13px;">Email</td>
				    <td class="adminRow" style="font-size:13px;">Otro Proceso</td>
				    <td class="adminRow" style="font-size:13px;">Calificaci&oacute;n</td>
				    <td class="adminRow" style="font-size:13px;">Observaciones</td>
				  </tr>
				</thead>
		        <tbody id ="ttt" class="cuerpo_tabla">
		        	
				    <s:iterator value="listaIdPostulante" status="idCan">
							 <tr class="adminRow" id="<s:property value="listaIdAux[#idCan.index]"/>EN<s:property value="listaIdVacante[#idCan.index]"/>CON<s:property value="listaIdPostulante[#idCan.index]"/>">
					           <td class="adminData"><s:property value="listaNombre[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaNombre_vacante[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaTelefono[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaCorreoElectronico[#idCan.index]"/></td>
					           <td class="adminData"><a id="<s:property value="listaIdPostulante[#idCan.index]"/>" class="otroProcesoLink" style="color:#000; cursor:pointer;">Otro Proceso</a></td>
					           <td class="adminData" id="comen<s:property value="listaIdAux[#idCan.index]"/>"><s:property value="listaObservaciones[#idCan.index]"/></td>
					           <td class="adminData" id="comen<s:property value="listaIdAux[#idCan.index]"/>"><s:property value="listaObservaciones[#idCan.index]"/></td>
							</tr>
					</s:iterator>
				
				</tbody>
		      </table>
		      
		     
		      
		      
		    </form>
		
			</div>
			
			<div class="campo_form3">
					<div id="observacionesBTN" class="btnCan2" style="font-size:14px; width: 248px;">Agregar&nbsp;&nbsp;Observaciones</div>
					<div id="ver_deta" class="btnCan" style="font-size:14px;">Ver Detalle</div>
					
					
				<form action="" id="masterForm">
					<input type="hidden" id="aux_filtro" name="aux_filtro"/>
					<input type="hidden" id="vac" name="vac"/>
					<input type="hidden" id="postu" name="postu"/>
				</form>
		</div>
	 
	 </div>





<div class="modal_adv detalle_vac_tit" id="dialog_otroProceso" title="Otro Proceso" class="otroproceso" >
        <div class="otroproceso">
        	<label>El usuario:</label><div id="usuArio" class="detalle_vac" style="display:none;"></div><div class="detalle_dentro" id="nombreUsuario"></div><br/>
        	<label>Tiene el siguiente numero de Postulaciones:</label><div id="postulaciones" class="detalle_dentro"></div><br/>
        	<label>En las siguientes Vacantes:</label><div class="contien_vacOtroProceso detalle_dentro"></div><br/>
        	
        	<label>Actualmente se Encuentra Interactuando con las Administradoras o Administradores:</label><div class="InteractuandoOtroProceso detalle_dentro"></div><br/>
        	
        </div>
        
</div>







<div class="modal_adv detalle_vac_tit" id="dialog_agregar_observaciones" title="Agregar Comentarios" class="otroproceso">
        <div class="otroproceso">
        		<input type="hidden" name="ayuda" id="ayuda" />
        	 <div class="otroproceso">
        		<label >Selecccione la Calificacion del Postulante Basado en la entrevista</label><br/><br/>
        		<label >Calificacion:</label> 
        					<select id="calificacion" name="calificacion" class="detalle_dentro">
				 				<option value="0" selected="selected">Selecciona</option>
				 				
 									<option value="1">Trabajando</option>
 									<option value="2">No cubre el perfil</option>
 									<option value="3">Amenaza</option>
 									<option value="4">No acepto el sueldo</option>
 									<option value="5">No fue seleccionado</option>
 									<option value="6">Contratado/promocinado</option>
 									
				 					
				 			</select><br/><br/>
				<label>Agrega el Texto pertinente (500 caracteres):</label><br/><br/><textarea id="comentarios" name="comentarios" class="detalle_dentro" rows="4" cols="65" style="resize:none"></textarea><br/>
        	</div>
        </div>
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label id="labelSelecPos">DEBES SELECCIONAR UN POSTULANTE PRIMERO</label><br/>
        </div>
        
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_observaciones"  class="otroproceso" >
        <div class="otroproceso">
        	<textarea id="comentariosRecibe" name="comentariosRecibe" class="detalle_dentro" rows="4" cols="65" style="resize:none"></textarea><br/>
        </div>
        
</div>

</body>
</html>