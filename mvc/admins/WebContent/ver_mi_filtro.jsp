<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/ver_mi_filtro_scripts.js"></script>
<title>Mi Filtro</title>
</head>
<body>


<div id="content"> 
	 
	 		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a><a href="javascript:history.back(1);">Regresar - </a></span>
			<h1>Mi Filtro</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Selecciona a un Postulante de  la "Lista de Postulantes" y realiza una de las acciones de la parte de abajo</div><br/>
			
			
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
	 			
	 			<!--  <button class="coberturaCaja" name="verTodo" id="verTodo" style="float: right; width:79px; margin-top:0px">Ver Todo</button> -->
	 			 
			</div>   
			
			<div class="data_container2">
		
			<form id="jup" method="POST" action="">
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				    <td class="adminRow">Nombre Postulado</td>
				    <td class="adminRow">Telefono</td>
				    <td class="adminRow">Email</td>
				    <td class="adminRow">Edad</td>
				    <td class="adminRow">Genero</td>
				    <td class="adminRow">Otro Proceso</td>
				    <td class="adminRow">Comentarios 1er Entrevista</td>
				    <td class="adminRow">Aplica</td>
				  </tr>
				</thead>
		        <tbody>
		        	
				    <s:iterator value="listaIdPostulante" status="idCan">
							 <tr class="adminRow" id="<s:property value="listaIdAux[#idCan.index]"/>EN<s:property value="listaIdVacante[#idCan.index]"/>CON<s:property value="listaIdPostulante[#idCan.index]"/>">
					           <td class="adminData"><s:property value="listaNombre[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaTelefono[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaCorreoElectronico[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaEdad[#idCan.index]"/></td>
					    	   <td class="adminData conteGenero"><input type ="hidden" class="genero" value="<s:property value="listaSexo[#idCan.index]"/>"/> </td>
					    	   <td class="adminData"><a id="<s:property value="listaIdPostulante[#idCan.index]"/>" class="otroProcesoLink" style="color:#000; cursor:pointer;">Otro Proceso</a></td>
					           <td class="adminData" id="comen<s:property value="listaIdAux[#idCan.index]"/>"><s:property value="listaObservaciones[#idCan.index]"/></td>
					           <td class="adminData"><div id="jup<s:property value="listaIdAux[#idCan.index]"/>" class="calif_tipo<s:property value="calificacion[#idCan.index]"/>"></div></td>
							</tr>
					</s:iterator>
				
				</tbody>
		      </table>
		      
		     
		      
		      
		    </form>
		
			</div>
			
			<div class="campo_form3">
			    
			     	
					<div id="calificar" class="btnCan">Calificar</div>
					<div id="observacionesBTN" class="btnCan2">Observaciones</div>
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
        	<label>Tiene el siguiente numero de Postulaciones en la  seccion "Primer Filtro":</label><div id="primerFiltro" class="detalle_dentro"></div><br/>
        	<label>Actualmente se Encuentra Interactuando con el Administrador(a):</label><div class="InteractuandoOtroProceso detalle_dentro"></div><br/>
        	<label>Tiene el siguiente numero de Postulaciones en la seccion "Mi Filtro":</label><div id="postulacionesMiFiltro" class="detalle_dentro"></div><br/>
        </div>
        
</div>





<div class="modal_adv detalle_vac_tit" id="dialog_calificar" title="Calificar al usuario" class="otroproceso" >
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
 									
				 					
				 			</select><br/>
			<label>Agrega el Texto pertinente (500 caracteres):</label><br/><textarea id="comentarios" name="comentarios" class="detalle_dentro"></textarea><br/>
		
        </div>
        
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_error" title="Notificacion" >
        <div id="error" class="otroproceso"></div><br/>
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES SELECCIONAR UN POSTULANTE PRIMERO</label><br/>
        </div>
        
</div>

</body>
</html>