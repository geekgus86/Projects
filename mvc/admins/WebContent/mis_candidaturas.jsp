<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Mis Candidaturas</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/mis_vacantes.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
 
</head>
<body>

	<s:set name="webFramework" value="lvl"/>
	
	<div id="content"> 
		<div id="content-adm">
			<input type="hidden" value="" id="region" name="region">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/VacanteAdmin">Administaci&oacute;n de Vacantes - </a></span>
			<h1>Mis Vacantes</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione una vacante dando clic en ella y realize cualquiera de las opciones de la parte inferior</div><br/>
			
			<div class="filtros">
			
			<label style="float:left; margin-top: 20px;">Filtrar por:</label>
			
 			<div class="cobertura" style="float:left;" >
	 			<select id="lista-tipos-geo" name="tipos">
	 				<option value="0" selected="selected">Tipo Vacante</option>
	 					<s:iterator id="listadoTip" value="idTipoVac" status="it">
	 						<option value="<s:property value='idTipoVac[#it.index]'/>"><s:property value='ubicacionTipo[#it.index]'/></option>
	 					</s:iterator>
	 			</select>
 			</div><br/> 
 			
 			<label style="float:left;margin-left: 10px;margin-right: 10px;"> tambien por: </label>
 			
 			<input type="text" class="coberturaCaja" name="nombreVacante" id="nombreVacante" style="width:313px;margin-right: 10px;margin-top: -8px;" /><button name="verPorNombre" id="verPorNombre">Ver</button>
 			
 			<s:if test="%{#webFramework==2}">
 				<button name="verTodo" id="verTodo">Ver Todo</button>
 			</s:if>
 			
 			
 			<s:hidden name="subidoPor" id="subidoPor" value="%{idAdmin}"></s:hidden>
 			
 			<s:if test="%{#webFramework==2}">
 				<a  id="expo" style="cursor:pointer;width: 48px; height: 48px; float: right; margin-top: -14px;"><img src="images/xcel.png" title="Exportar a Excel" /></a>
 			</s:if>
 			
 			
 			
 			
			</div>
			
			<div id="simbologia" style="width:540px;">
		  	 		<div class="activa"></div> <div style="float:left;  margin-right: 20px; font-size:10px;">  Activa  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="activa2"></div> Inactiva  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="activa3"></div> En Revision de CV  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="activa4"></div> Cubierta  </div>
		  	 		<div style="float:left;  margin-right: 20px; font-size:10px;"> <div class="activa5"></div> En Entrevistas  </div>
		  	 </div>
			
			 <s:if test="%{#webFramework==2}">
 				<div class="linDes"style="float:right;"><a class="destaBtn" style="cursor:pointer;">Editar Destacados</a></div>
 			</s:if>
 			
 			 <s:if test="%{#webFramework==3}">
 				<div class="linDes" style="float:right;"><a class="destaBtn" style="cursor:pointer;">Editar Destacados</a></div>
 			</s:if>
			
			<div class="tabla_vacantes_general">
				<table id="tabla" >
							<thead>
								<tr class="adminHeaderVac">
									<td style=" width:100px;" class="adminRowVac">Folio</td>
									<td style=" width:251px;" class="adminRowVac">Nombre Vacante</td>
									<td style=" width:271px;" class="adminRowVac">Fecha Publicaci&oacute;n</td>
									<td style=" width:237px;" class="adminRowVac">Fecha Vigencia</td>
									<td style=" width:248px;" class="adminRowVac">Tipo de Vacante</td>
									<td style=" width:98px;"  class="adminRowVac">Destacada</td>
									<td style=" width:98px;"  class="adminRowVac">Estado</td>
									<td style=" width:98px;"  class="adminRowVac">Postulantes</td>
									<td style=" width:98px;"  class="adminRowVac">Subido Por</td>
								</tr>
								
							</thead>
							
							<tbody id ="ttt" class="cuerpo_tabla" >
								
							</tbody>
							
						</table>
			</div>
			
			<div id="paginacionContenedor" style="height: 32px;margin-bottom: 10px;margin-top: 10px;"></div>
			
			<div  class="campo_form3" style="height: 140px;">
			
			
				<s:if test="%{#webFramework==1}">  
					
					<div id="btnNuevo" class="btnAdmin">Nueva</div>	
				
				
					 <s:form id="editar_vac" theme="simple" action="VacanteEditar" method="POST">
					    <input type="hidden" id="seleccion" name="seleccion"/>
					    <div  id="btnMod"class="btnAdmin">Modificar</div>
	    			</s:form>
    			
    				<div id="btnDel" class="btnAdmin">Eliminar</div>
    			
	    			<s:form id="enviar_vac_postu" theme="simple" action="MisPostulantes" method="POST">
					    <input type="hidden" id="id_Vacante" name="id_Vacante"/>
					    
	    			</s:form>
				</s:if>
				
				
				<s:elseif test="%{#webFramework==2}">
    				
					<div id="btnNuevo" class="btnAdmin">Nueva</div>	
				
				
					 <s:form id="editar_vac" theme="simple" action="VacanteEditar" method="POST">
					    <input type="hidden" id="seleccion" name="seleccion"/>
					    <input type="hidden" id="vieneDe" name="vieneDe" value="MisCandidaturas"/>
					    <div  id="btnMod"class="btnAdmin">Modificar</div>
	    			</s:form>
    			
    				<div id="btnDel" class="btnAdmin">Eliminar</div>
    			
	    			<s:form id="enviar_vac_postu" theme="simple" action="MisPostulantes" method="POST">
					    <input type="hidden" id="id_Vacante" name="id_Vacante"/>
					    
	    			</s:form>
				
				</s:elseif>
				
				<s:elseif test="%{#webFramework==3}">
    				
	    			<div id="btnNuevo" class="btnAdmin">Nueva</div>	
				
				
					 <s:form id="editar_vac" theme="simple" action="VacanteEditar" method="POST">
					    <input type="hidden" id="seleccion" name="seleccion"/>
					    <input type="hidden" id="vieneDe" name="vieneDe" value="MisCandidaturas"/>
					    <div  id="btnMod"class="btnAdmin">Modificar</div>
	    			</s:form>
    			
    				<div id="btnDel" class="btnAdmin">Eliminar</div>
    			
	    			<s:form id="enviar_vac_postu" theme="simple" action="MisPostulantes" method="POST">
					    <input type="hidden" id="id_Vacante" name="id_Vacante"/>
					    
	    			</s:form>
				
				</s:elseif>
				
				
				
				<s:elseif test="%{#webFramework==4}">
    				
    				
    				<div id="btnNuevo" class="btnAdmin">Nueva</div>	
				
				
					 <s:form id="editar_vac" theme="simple" action="VacanteEditar" method="POST">
					    <input type="hidden" id="seleccion" name="seleccion"/>
					    <input type="hidden" id="vieneDe" name="vieneDe" value="MisCandidaturas"/>
					    <div  id="btnMod"class="btnAdmin">Modificar</div>
	    			</s:form>
    			
    				<div id="btnDel" class="btnAdmin">Eliminar</div>
    				
	    			<s:form id="enviar_vac_postu" theme="simple" action="MisPostulantes" method="POST">
					    <input type="hidden" id="id_Vacante" name="id_Vacante"/>
					   
	    			</s:form>
				
				</s:elseif>
    			
    			<div id="cambiarEstado" class="btnAdmin">Cambiar Estado</div>
    			
			</div>
			
			
			
		</div>
	</div>

	



<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" >
        <div class="otroproceso">
        	<label id="labelFol">Folio:</label><div id="num_vac" class="detalle_dentro"></div>
        	<label id="labelNom">Nombre vacante:</label><div id="nom_vac" class="detalle_dentro"></div>
        	<label id="labelUbi">Ubicaci&oacute;n de la Vacante:</label><div id="ubicati" class="detalle_dentro"></div>
        	<label id="labelAre">&Aacute;rea de Experiencia:</label><div id="are_exp" class="detalle_dentro"></div>
        	<label id="labelSal">Salario:</label><div id="salario" class="detalle_dentro"></div>
        	<label id="labelHor">Horario:</label><div id="horario" class="detalle_dentro"></div>
       		<label id="labelEda">Edad:</label><div id="edad" class="detalle_dentro"></div>
        	<label id="labelFec">Fecha de Publici&oacute;n:</label><div id="fecha" class="detalle_dentro"></div>
	        <label id="labelRes">Rese&ntilde;a:</label><div id="text_int" class="detalle_dentro"></div>
	        <label id="labelNiv">Nivel de Esdudios:</label><br/><div id="esco" class="detalle_dentro"></div><br/>
	        <label id="labelCon">Conocimientos Necesarios:</label><br/><div id="conocimient" class="detalle_dentro"></div>
	        <label id="labelTal">Talentos Solicitados:</label><br/><div id="talent" class="detalle_dentro"></div>
	        <label id="labelPrin">Principales Funciones a Desempe&ntilde;ar:</label><br/><div id="prin_fun" class="detalle_dentro"></div>
	        <label id="labelObs">Observaciones:</label><br/><div id="observaciones" class="detalle_dentro"></div>
        </div>
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_vacante_elim" title="Advertencia" >
        <div class="otroproceso">
        	<label class="detalle_vac_tit">¿Estas Seguro de Eliminar?:</label><div id="folio_vac" class="detalle_dentro"></div><br/>
        	
        </div>
</div>


<div class="modal_adv detalle_postulantes" id="dialog_postu" title="Postulantes" >
        <div id="contendorPostuyos" >
        	
        	
        </div>
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_exportar" title="Exportar" >
        <div class="otroproceso">
        	<label>Escribe el Nombre de tu Archivo</label><input type="text" id="nom_export" class="detalle_dentro" /><br/>
        	<input type="hidden" value="2" id="tipoExport" />
        </div>
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_export_msj" title="Mensaje" >
        <div class="otroproceso">
        	<label>Resultado</label><div id="mensaje" class="detalle_dentro" ></div>
        	<label>Ver lin</label><div id="lin"><a id="lin_etsel"></a></div>
        </div>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_selecPostulante" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES SELECCIONAR UNA VACANTE  PRIMERO</label><br/>
        </div>
        
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_busPalabra" title="Advertencia" class="otroproceso" >
        <div class="otroproceso">
        	<label>DEBES INSERTAR UNA PALABRA</label><br/>
        </div>
        
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_cambiaEstado" title="Cambiando Estado" class="otroproceso" >
        <div class="otroproceso">
        	<label>Selecciona el Estado de la Vacante: </label>
        					<select id="estadoVacante" name="estadoVacante" class="campo_text">
				 				<option value="Activa" selected="selected">Selecciona</option>
				 				
 									<option value="Activa">Activa</option>
 									<option value="Inactiva">Inactiva</option>
 									<option value="EnRevisionCV">En Revision CV</option>
 									<option value="EnEntrevistas">En Entrevistas</option>
				 					<option value="Cubierta">Cubierta</option>
				 					
				 			</select><br/>
        	<br/>
        </div>
        
</div>



<div class="modal_adv detalle_vac_tit" id="dialog_Desta" title="Vacantes Destacadas" class="otroproceso" >
        <div id="contendorPostuyos" >
        
        
        
         <s:if test="%{#webFramework==2}">
 				<div class="contieneDestaNacio">
 					<div class="arribaDes">
 						<div class="titDes">Destacadas Nacionales</div>
 						<div class="ComboDes">
 							<div class="cobertura" style="float:left;" >
								<select id="lista-vacs-filtro-na" name="admins">
					 				<option value="0" selected="selected">Vacante</option>
					 					<s:iterator id="listadoAdm" value="vacanteListaId" status="it">
					 						<option value="<s:property value='vacanteListaId[#it.index]'/>"><s:property value='vacanteLista[#it.index]'/></option>
					 					</s:iterator>
					 			</select>
				 			</div>
 						</div>
 						<div class="BotonDes" id="BotonDesN">Agregar <div class="addImg"></div></div>
 						<div class="numeroRestantes" id="numeroRestantesNacio">
 							
 						</div>
 					</div>
 					<br/>
 					<div class="cuerpoDes" id="cuarpoDesNa">
 						
 						
 						
 						
 						
 					</div>
 					
 					
 					
 					
 					
 				</div>
 		</s:if>
        		<div class="contieneDestaRegio" style="height:250px;">
        		
        		
        			<div class="arribaDes">
 						<div class="titDes">Destacadas Regionales</div>
 						
 						
 						<div class="ComboDes">
 							<div class="cobertura" style="float:left;" >
								<select id="comboUbicaciones" name="Ubicaciones">
					 				<option value="0" selected="selected">Ubicacion Cluster</option>
					 					<s:iterator id="idUbiClusList" value="idUbiClusList" status="it">
					 						<option value="<s:property value='idUbiClusList[#it.index]'/>"><s:property value='vnombreUbiClusList[#it.index]'/></option>
					 					</s:iterator>
					 			</select>
				 			</div>
 						</div>
 						
 						<br/><br/><br/>
 						
 						<div class="ComboDes">
 							<div class="cobertura" style="float:left;" >
								<select id="lista-vacs-filtro-re" name="admins">
					 				<option value="0" selected="selected">Vacante</option>
					 					<s:iterator id="listadoAdm" value="vacanteListaId" status="it">
					 						<option value="<s:property value='vacanteListaId[#it.index]'/>"><s:property value='vacanteLista[#it.index]'/></option>
					 					</s:iterator>
					 			</select>
				 			</div>
 						</div>
 						<div class="BotonDes" id="BotonDesR">Agregar <div class="addImg"></div></div>
 						<br/><br/>
 						<div class="numeroRestantes" id="numeroRestantesRegio">
 							
 						</div>
 					</div>
 					<br/>
 					<div class="cuerpoDes" id="cuarpoDesRegio">
 						
 						
 						
 						
 					</div>
 					
 					
        		
        		
        		</div>
        	
        </div>
        
        
       
        
        
        
        
       
        
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_cambio_msj" title="Mensaje" >
        <div class="otroproceso">
        	<label>Resultado</label><div id="mensaje2" class="detalle_dentro" ></div>
        	
        </div>
</div>



</body>
</html>