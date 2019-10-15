<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Vacantes General</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/vacantes_general.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
 
</head>
<body>

	<s:set name="webFramework" value="lvl"/>
	
	<div id="content"> 
		<div id="content-adm">
			<input type="hidden" value="<s:property value='region'/>" id="region" name="region">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/VacanteAdmin">Administaci&oacute;n de Vacantes - </a></span>
			<h1>Vacantes Generales</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione una Vacante y Realize alguna de las acciones del la parte Inferior</div><br/>
			
			<div class="filtros">
			<label style="float:left; margin-top: 20px;">Filtrar por:</label>
			<div class="cobertura" style="float:left;" >
				<select id="lista-admins" name="admins">
	 				<option value="0" selected="selected">Administrador</option>
	 					<s:iterator id="listadoAdm" value="idAdmin" status="it">
	 						<option value="<s:property value='idAdmin[#it.index]'/>"><s:property value='UsuAdmin[#it.index]'/></option>
	 					</s:iterator>
	 			</select>
 			</div><br/> 
 			
 			<label style="float:left;margin-left: 10px;margin-right: 10px;"> o por: </label>
 			
 			<div class="cobertura" style="float:left; margin-top: -5px;" >
 			<select id="lista-tipos-geo" name="tipos">
 				<option value="0" selected="selected">Tipo Vacante</option>
 					
 					<s:iterator id="listadoTip" value="idTipoVac" status="it">
			 			<option value="<s:property value='idTipoVac[#it.index]'/>"><s:property value='ubicacionTipo[#it.index]'/></option>
			 		</s:iterator>	
 			</select>
 			</div>
 			<button class="coberturaCaja" name="verTodo" id="verTodo" style="float: right; width:79px; margin-top:0px">Ver Todo</button>
 			
 			<br/>
 			<br/>
 			<br/>
 			
 			Tambien por:<input class="coberturaCaja"  type="text" name="nombreVacante" id="nombreVacante" style="width:313px;margin-left: 15px;margin-right: 15px;" />
 			<button class="coberturaCaja"  name="verPorNombre" id="verPorNombre" style="width:44px;">Ver</button>
 			
 			
 			
 			<s:if test="%{#webFramework==2}">
 				<a  id="expo" style="cursor:pointer;  width: 48px; height: 48px; float: right; margin-top: -14px;"><img src="images/xcel.png" title="Exportar a Excel" /></a>
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
									<td style=" width:161px;" class="adminRowVac">Subido por:</td>
									<td style=" width:248px;" class="adminRowVac">Tipo de Vacante</td>
									<td style=" width:98px;"  class="adminRowVac">Destacada</td>
									<td style=" width:98px;"  class="adminRowVac">Estado</td>
								</tr>
								
							</thead>
							
							<tbody id ="ttt" class="cuerpo_tabla" >
								
							</tbody>
							
						</table>
						
						
						
			</div>
			<input type="hidden" id="contBloq" name="contBloq" value=""/>
			<br/>
			<div id="paginacionContenedor" style="height: 32px;margin-bottom: 10px;margin-top: 10px;" aligne="center"></div>
			
			
			<div  class="campo_form3" style="height: 75px;">
				<div id="btnNuevo" class="btnAdmin">Nueva</div>	
				
				
				 <s:form id="editar_vac" theme="simple" action="VacanteEditar" method="POST">
				    <input type="hidden" id="seleccion" name="seleccion"/>
				    <input type="hidden" id="vieneDe" name="vieneDe" value="VacGenerales"/>
				    <div  id="btnMod" class="btnAdmin">Modificar</div>
    			</s:form>
    			
    			<div id="btnDel" class="btnAdmin">Eliminar</div>
    			
    			
    			
    			<s:form id="enviar_vac_postu" theme="simple" action="MisPostulantes" method="POST">
				    <input type="hidden" id="id_Vacante" name="id_Vacante"/>
				   <!--   <div id="btnPostu" class="btnAdmin">Ver Postulantes</div> -->
    			</s:form>
    			
    			
    			
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
	        <label id="labelRes">Rese&ntilde;a:</label><br/><div id="text_int" class="detalle_dentro"></div>
	        <label id="labelNiv">Nivel de Esdudios:</label><br/><div id="esco" class="detalle_dentro"></div>
	        <label id="labelCon">Conocimientos Necesarios:</label><br/><div id="conocimient" class="detalle_dentro"></div>
	        <label id="labelTal">Talentos Solicitados:</label><br/><div id="talent" class="detalle_dentro"></div>
	        <label id="labelPrin">Principales Funciones a Desempe&ntilde;ar:</label><br/><div id="prin_fun" class="detalle_dentro"></div>
	        <label id="labelObs">Observaciones:</label><br/><div id="observaciones" class="detalle_dentro"></div>
        </div>
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_vacante_elim" title="Advertencia" >
        <div class="otroproceso">
        	<label>¿Estas Seguro de Eliminar?:</label><div id="folio_vac" class="detalle_dentro"></div><br/>
        	
        </div>
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_exportar" title="Exportar" >
        <div class="otroproceso">
        	<label>Escribe el Nombre de tu Archivo</label><input type="text" id="nom_export" class="detalle_dentro" /><br/>
        	<input type="hidden" value="1" id="tipoExport" />
        </div>
</div>


<!-- CUADRO DE DIALOGO PARA MENSAJES DE EXPORTACION -->

<div class="modal_adv detalle_vac_tit" id="dialog_export_msj" title="Mensaje" >
        <div class="otroproceso">
        	<label>Resultado</label><div id="mensaje" class="detalle_dentro" ></div>
        	<label>LINK</label><div id="lin"><a id="lin_etsel"></a></div>
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
 						
 						<!--  <div class="destaBoton">Asesor de Ventas <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Asesor de Ventas <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Asesor de Ventas <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Asesor de Ventas <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Asesor de Ventas <div class="deletDesImg"></div></div> -->
 						
 						
 						
 						
 					</div>
 					
 					
 					
 					
 					
 				</div>
 		</s:if>
        		
        		
        		
        		<div class="contieneDestaRegio">
        		
        		
        			<div class="arribaDes">
 						<div class="titDes">Destacadas Regionales</div>
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
 						<div class="numeroRestantes" id="numeroRestantesRegio">
 							
 						</div>
 					</div>
 					<br/>
 					<div class="cuerpoDes" id="cuarpoDesRegio">
 						
 						<!--  <div class="destaBoton">Demovendedor <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Demovendedor <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Demovendedor <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Demovendedor <div class="deletDesImg"></div></div>
 						<div class="destaBoton">Demovendedor <div class="deletDesImg"></div></div> -->

 						
 					</div>
        		</div>
        		
        		
        		
        	
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




<div class="modal_adv detalle_vac_tit" id="dialog_cambio_msj" title="Mensaje" >
        <div class="otroproceso">
        	<label>Resultado</label><div id="mensaje2" class="detalle_dentro" ></div>
        	
        </div>
</div>


</body>
</html>