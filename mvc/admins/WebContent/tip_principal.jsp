<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">

<script type="text/javascript" src="js/tips_principal_scripts.js"></script>
<title>Insert title here</title>
</head>
<body>

	<div id="content"> 
	<div id="content-adm">
	
		<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/WebAdmin">Administaci&oacute;n de Red Profesional IUSACELL - </a></span>
			<h1>Tips</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione un Tip, para Editarlo o Eliminarlo, para Agregar un Nuevo Tip, pulse el Boton Nuevo Tip</div><br/>
	
		<div class="tabla_tips">
		
			<form id="jup" method="POST" action="" accept-charset="utf-8,iso-8859-1">
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				    <td class="adminRow"> No. Tip</td>
				    <td class="adminRow"> Tip</td>
				  </tr>
				</thead>
		        <tbody>
		        	
				    <s:iterator value="DesTip" status="idCan">
							 <tr class="adminRow" id="<s:property value="idTip[#idCan.index]"/>">
							   <td class="adminData"><s:property value="idTip2[#idCan.index]"/></td>
							   <td class="adminData"><s:property value="DesTip[#idCan.index]"/></td>
							</tr>
					</s:iterator>
				
				</tbody>
		      </table>
		    </form>
		
			</div>
			
			<div class="campo_form3_tips">
			    <div id="nueva_tip" class="btnCan">Nuevo Tip</div>
			    <div id="editar_tip" class="btnCan">Editar Tip</div>
				<div id="borrar_tip" class="btnCan">Borrar Tip</div>
				
				<form action="TipsEditar" method="POST" id = "editTip">
					<input type="hidden" id="seleccion" name="seleccion"/>
				</form>
				
		</div>

	</div>
	</div>

<div class="modal_adv detalle_vac_tit" id="dialog_vacante_elim" title="Advertencia" >
        <div class="detalle_seccion_importante">
        	<label class="detalle_vac_tit">¿Estas Seguro de Eliminar?:</label><div id="folio_vac" class="detalle_vac"></div><br/>
        	
        </div>
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES SELECCIONAR TIP  PRIMERO</label><br/>
        </div>
        
</div>


</body>
</html>