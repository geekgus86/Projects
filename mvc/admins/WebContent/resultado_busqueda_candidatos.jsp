<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">

<script type="text/javascript" src="js/resultado_busqueda_candidato.js"></script>
<script type="text/javascript">
$(document).ready(function(){
$("#dialog_vacante").hide();
});
</script>
<title>Resultado de la busqueda</title>
</head>
<body>
     <div id="content"> 
    
		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a><a href="/admins/Candidatos">Candidatos - </a></span>
			<h1>Resultado Busqueda</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Lista de Postulantes</div><br/>
			
			<div class="instrucciones">Parametros de busqueda seleccionados: </div> 
			
			<div class="parametrosSeleccionados">
				
				<div class="seleccionBusIzq">
					<div>&Aacute;rea de Inter&eacute;s: </div><p id="arInte"><s:property value='areaInte'/></p>
					<div>&Aacute;rea de Inter&eacute;s Alterna: </div><p id="arInteA"><s:property value='areaInteAlte'/></p>
					<div>Grado Minimo: </div><p id="mGra"><s:property value='gradoAca'/></p>
					<div>Genero: </div><p id="seX"><s:property value='genero'/></p>
				</div>
				<div class="seleccionBusDer">
					<div>Edad Minima: </div><p id="mEd"><s:property value='edadMin'/></p>
					<div>Edad Maxima: </div><p id="maEd"><s:property value='edadMax'/></p>
					<div>Estado: </div><p id="esT"><s:property value='esTado'/></p>
					<div>Municipio: </div><p id="munI"><s:property value='muniCi'/></p>
				</div>
				
				<input type="hidden" name="numeroCandiPag" id="numeroCandiPag" value="<s:property value='numCandidatosTot'/>" />
				
				
				
				<input type="hidden"  id="areaInte" value="<s:property value='areaInte'/>" />
				<input type="hidden"  id="areaInteAl" value="<s:property value='areaInteAlte'/>" />
				<input type="hidden"  id="grAcade" value="<s:property value='gradoAca'/>" />
				<input type="hidden"  id="genErooo" value="<s:property value='genero'/>" />
				<input type="hidden"  id="eMin" value="<s:property value='edadMin'/>" />
				<input type="hidden"  id="eMax" value="<s:property value='edadMax'/>" />
				<input type="hidden"  id="esTADO" value="<s:property value='esTado'/>" />
				<input type="hidden"  id="muniCipio" value="<s:property value='muniCi'/>" />
				
				
			</div>
			
			
			
			
			<div class="data_container2">
		
			<form id="jup" method="POST" action="" accept-charset="utf-8">
				<table id="tabla">
				<thead>
				  <tr class="adminHeader">
				    <td class="adminRow">Seleccion</td>
				    <td class="adminRow">Nombre del Candidato</td>
				    <td class="adminRow">Area de Interes </td>
				    <td class="adminRow">Grado Academico </td>
				    <td class="adminRow">Edad </td>
				      <td class="adminRow">Genero</td>
				  </tr>
				</thead>
		        <tbody id="ttt">
		        	
				    <s:iterator value="listaNombre" status="idCan">
							   <tr class="adminRow" id="<s:property value="listaIdPostulante[#idCan.index]"/>">
							   <td class="adminData"><input type="checkbox" id="canid_<s:property value="listaIdPostulante[#idCan.index]"/>"  class="checkCan" value="<s:property value="listaIdPostulante[#idCan.index]"/>"/></td>
							   <td class="adminData"><s:property value="listaNombre[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaArea[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaNivelDeEstudios[#idCan.index]"/></td>
					           <td class="adminData"><s:property value="listaEdad[#idCan.index]"/> </td>
					           <td class="adminData"><div class="gene<s:property value="listaSexo[#idCan.index]"/>"></div></td>
							</tr>
					</s:iterator>
				
				</tbody>
		      </table>
		      
		      <s:hidden name="idVacante" id="idVacante"></s:hidden>
		      
		      <div id="conteneDorSelected"></div>
		      
		    </form>
			<input type="hidden" id="contBloq" name="contBloq" value=""/>
			</div>
			
			<div id="paginacionContenedor" style="height: 32px;margin-bottom: 10px;margin-top: 10px;"></div>
			
			
			<div class="campo_form3">
			    <div id="nueva_busqueda" class="btnCan">Nueva Busqueda</div>
			     <div  id="ver_deta" class="btnCan">Ver Detalle</div>
			     
			     
					<div   id="postular" class="btnCan">Postular</div>
			
				
				
				
				
				<input type="hidden" id="seleccion" name="seleccion"/>
				<input type="hidden" id="seleccion2" name="seleccion"/>
				<div id = "baja" class="btnCan">Dar de Baja</div>
				
		</div>
		
	</div>

	</div>
	
<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" class="otroproceso" >
        <div class="otroproceso">
        	
        	<label class="detalle_vac_tit">Nombre vacante:</label><div id="nom_vac" class="detalle_dentro"></div><br/>
        	
        	<div class="coberturaBC" >
        	<select id="listavacantes" name="listavacantes"  style="width:250px;">
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="listadoTip" value="listaIdVacante" status="it">
 									<option value="<s:property value='listaIdVacante[#it.index]'/>"><s:property value='listaNombreVacante[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select><br/>
        	</div>
        </div>
        
   
        
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES SELECCIONAR UN POSTULANTE PRIMERO</label><br/>
        </div>
        
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_busPalabra" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES SELECCIONAR UNA VACANTE PARA POSTULAR</label><br/>
        </div>
        
</div>

</body>
</html>