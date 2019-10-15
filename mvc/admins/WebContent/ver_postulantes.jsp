<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/ver_postulantes_scripts.js"></script>
<script type="text/javascript">
$(document).ready(function(){

});
</script>
<title>Mis Postulantes</title>
</head>
<body>


		 <div id="content"> 
    
		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a><a href="javascript:history.back(1);">Regresar - </a></span>
			<h1>Mis Postulantes</h1>
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
			
			<div class="data_container2" style="margin-top: 50px;">
		
			<form id="jup" method="POST" action="" accept-charset="utf-8">
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				  	<td class="adminRow">Seleccion</td>
				    <td class="adminRow">Nombre Postulado</td>
				    <td class="adminRow">Vacante</td>
				    <td class="adminRow">&Aacute;rea Interes</td>
				    <td class="adminRow">Edad</td>
				    <td class="adminRow">Genero</td>
				    <td class="adminRow">Otro Proceso</td>
				  </tr>
				</thead>
		        <tbody id ="ttt" class="cuerpo_tabla">
		        	
				    <s:iterator value="listaNombrePOSTU" status="idCan">
							 <tr class="adminRow" id="<s:property value="listaIdPOSTU[#idCan.index]"/>">
							   <td class="adminData"><input type="checkbox" id="canid_<s:property value="listaIdPOSTU[#idCan.index]"/>" name="arregloUsu" class="checkCan" value="<s:property value="listaIdPOSTU[#idCan.index]"/>"/></td>
					           <td class="adminData"><s:property value="listaNombrePOSTU[#idCan.index]"/></td>
					           <td class="adminData"><input type ="hidden" class="arregloVac" name ="arregloVac" value="<s:property value="listaIdVAC[#idCan.index]"/>"/><s:property value="listaNombreVAC[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaAreaInteres[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaEdad[#idCan.index]"/></td>
					           <td class="adminData conteGenero"><div class="gene<s:property value="listaSexo[#idCan.index]"/>"></div></td>
					           <td class="adminData"><a id="<s:property value="listaIdPOSTU[#idCan.index]"/>" class="otroProcesoLink" style="color:#000; cursor:pointer;">Otro Proceso</a></td>
							</tr>
					</s:iterator>
				
				</tbody>
		      </table>
		      
		     
		      
		      
		    </form>
		
			</div>
			
			<div class="campo_form3">
					<input type="hidden" id="seleccion" name="seleccion"/>
					<div id="ver_deta" class="btnCan" style="font-size:14px;">Ver Detalle</div>
					<div id="meterPrimerFiltro" class="btnCan" style="font-size:14px;">Insertar Mi Filtro</div>
					<div id="borra_pos" class="btnCan" style="font-size:14px;">Eliminar</div>
			    	<!--  <div id="entrevistar" class="btnCan" style="font-size:14px;">Entrevistar</div>-->
			     	<!-- <div id="otroProceso" class="btnCan">Otro Proceso</div> --> 
					<!--  <div id="irPrimerFiltro" class="btnCan" style="font-size:14px;">Ir 1er Filtro</div> -->
					
					<input type="hidden" id="seleccion" name="seleccion"/>
				
		</div>
		
	</div>



<div class="modal_adv detalle_vac_tit" id="dialog_otroProceso" title="Otro Proceso" class="otroproceso" >
        <div class="otroproceso">
        	<label>El usuario:</label><div id="usuArio" class="detalle_vac" style="display:none;"></div><div class="detalle_dentro" id="nombreUsuario"></div><br/>
        	<label>Tiene el siguiente numero de Postulaciones:</label><div id="postulaciones" class="detalle_dentro"></div><br/>
        	<label>En las siguientes Vacantes:</label><div class="contien_vacOtroProceso detalle_dentro"></div><br/>
        	<!--  <label>Tiene el siguiente numero de Postulaciones en la  seccion "Primer Filtro":</label><div id="primerFiltro" class="detalle_dentro"></div><br/>-->
        	<label>Actualmente se Encuentra Interactuando con las Administradoras o Administradores:</label><div class="InteractuandoOtroProceso detalle_dentro"></div><br/>
        	<!--  <label>Tiene el siguiente numero de Postulaciones en la seccion "Mi Filtro":</label><div id="postulacionesMiFiltro" class="detalle_dentro"></div><br/>-->
       		<label>Observaciones de otros administradores</label><div class="observaciones_detalle detalle_dentro"></div><br/>
        	
        </div>
        
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_entrevistar" title="Entrevistar" class="otroproceso" >
        <div class="otroproceso">
        	<label>El usuario:</label><div id="usuArio" class="detalle_vac" style="display:none;"></div><div class="detalle_dentro" id="nombreUsuario2"></div><br/>
        	<label>Telefono:</label><div id="telefono" class="detalle_dentro"></div><br/>
        	<label>Email:</label><div id="correo_electronico" class="detalle_dentro"></div><br/>
        </div>
        
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label id="labelSelecPos">DEBES SELECCIONAR UN POSTULANTE PRIMERO</label><br/>
        </div>
        
</div>


</body>
</html>