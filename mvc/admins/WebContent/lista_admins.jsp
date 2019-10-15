<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/lista_admins.js"></script>
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<title>Administradores</title>
</head>
<body>
<div id="content"> 
    
		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Administradores</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Lista de Administradores</div><br/>
			
			   
			
			<div class="data_container2">
			
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				    
				    <td class="adminRow"> Nombre </td>
				    <td class="adminRow"> Correo Electronico </td>
				    <td class="adminRow"> Nivel </td>
				    <td class="adminRow"> Estatus </td>
				  </tr>
				</thead>
		        <tbody>
				
				<s:iterator value="listaIdAdmin" status="idAdmin">
						<tr class="adminRow" id="<s:property value="listaIdAdmin[#idAdmin.index]"/>">
						   
				           <td class="adminData"> <s:property value="listaNombre[#idAdmin.index]"/></td>
				           <td class="adminData"><s:property value="listaEmail[#idAdmin.index]"/> </td>
				           <td class="adminData"> <s:property value="listaNivel[#idAdmin.index]"/> </td>
				           <td class="adminData"> <s:property value="listaEstatus[#idAdmin.index]"/></td>
						</tr>
				</s:iterator>
				</tbody>
		      </table>
		    
			</div>
			
			<div class="campo_form3">
				<div id="btnNuevo" class="btnAdmin">Nuevo</div>
				 <s:form id="modificar" theme="simple" action="ModificarAdministradores" method="POST" enctype="multipart/form-data">
				   <input type="hidden" id="seleccion" name="seleccion"/>
				<div  id="btnMod"class="btnAdmin">Modificar</div>
				</s:form>
				<div id="btnDel" class="btnAdmin">Eliminar</div>
				<div id="btnEstad" class="btnAdmin">Cambiar Estado</div>
			</div>
		</div>
		
	</div>
	<div id="dialog_esta_seguro">
	<span>Esta seguro que desea eliminar a este Usuario</span>
	</div>
	
	<div class="modal_adv detalle_vac_tit" id="dialog_cambiaEstado" title="Cambiando Estado" class="otroproceso" >
        <div class="otroproceso">
        	<label>Selecciona el nuevo estado del Administrador </label><br/>
        	<p>Nota: Si el estado pasa de Bloqueado a Activo, la ultima Fecha de Logueo del Administrador sera la fecha de Hoy</p>
        					
				 				<select id="estadoAdmoin" name="estadoAdmoin" class="campo_text">
				 				<option value="Activo" selected="selected">Selecciona</option>
								 					<option value="Activo">Activo</option>
													<option value="Bloquedado">Bloquedado</option>
 									
				 			
				 			</select><br/>
        	<br/>
        </div>
        
	</div>
	
	
</body>
</html>