<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Editar Vacante</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/edit_vacante.js"></script>
<script type="text/javascript" src="js/jquery/jquery.simpletip-1.3.1.js"></script>
</head>
<body>

	<s:set name="webFramework1" value="lvl"/>
	
	
	<s:set name="webFramework2" value="vacDN"/>
	
	
	<s:set name="webFramework3" value="vacDR"/>
	

	<div id="content"> 
		<div id="content-adm">
		<input type="hidden" value="<s:property value='ubicacionAdmin'/>" id="ub" name="ub">
		<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a> <a href="/admins/VacanteAdmin">Administaci&oacute;n de Vacantes - </a> </span>
			<h1>Editar Vacante</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Modifique los datos necesarios de su vancante</div><br/>
			<form theme="simple" id="form_vac_editar_save" action="VacanteEditarSalvar" method="POST" accept-charset="utf-8">
				<div class="campo_form1" style="height: 431px;">
					<div class="instrucciones_new_vac">Informaci&oacute;n General - Nueva Vacante</div>
						<div class="nuev_vac_izq" >
						
							<s:hidden name="vaPara" id="vaPara" value="%{vaPara}"></s:hidden>
	
							<s:hidden name="idVacante" id="idVacante" value="%{idVacante}"></s:hidden>
							
							<label>Nombre de la Vacante</label><s:textfield cssClass="campo_text" name="nombreVacante"  id="nombreVacante" value="%{nombreVacante}"  maxlength="50"></s:textfield><div id="atencionDatoFV" class="toolTipIconWarning"></div><br/>
							 <s:hidden name="folio" id="folioE" value="%{folio}"></s:hidden>
							<label>Publicada</label><s:textfield cssClass="campo_text" name="fechaPublicacion" id="fechaPublicacionE" value="%{fechaPublicacion}" maxlength="7"></s:textfield><div id="atencionDatoFechV" class="toolTipIconWarning"></div><br/>
							<label>Vigencia</label><s:textfield cssClass="campo_text" name="fechaVigenciaEditar" id="fechaVigenciaE" value="%{fechaVigen}" maxlength="7"></s:textfield><div id="atencionDatoFechV2" class="toolTipIconWarning"></div><br/>
							<label>Tipo Vacante</label>
							
							<s:hidden name="tip_vac" id="tipVac" value="%{tipoVacante}"></s:hidden>
							
								<select id="tipoVacante" name="tipoVacante" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>
					 				<s:iterator id="listadoTip" value="id_tipo_vac" status="it">
	 									<option value="<s:property value='id_tipo_vac[#it.index]'/>"><s:property value='ubicacion_tipo_vac[#it.index]'/></option>
 									</s:iterator>	
				 					
				 				</select><div id="atencionDatoTV" class="toolTipIconWarning"></div><br/>
							<label>Experiencia (años)</label><s:textfield cssClass="campo_text" name="aniosExperiencia" id="aniosExperiencia" value="%{aniosExperiencia}" maxlength="2"></s:textfield><div id="atencionDatoExP" class="toolTipIconWarning"></div><br/>
							<label>Principales Funciones</label><s:textarea cssClass="area_text" name="prinFuncionesVacante" id="prinFuncionesVacante" value="%{prinFuncionesVacante}"></s:textarea><div id="atencionDatoPrinFunV" class="toolTipIconWarning"></div><br/>
							<label>Preferencia de Genero</label>
							
							<s:set name="vac_gen" value="%{genero}" />
							<s:set name="gen_fem" value="Femenino" />
							<s:set name="gen_mas" value="Masculino" />
							<s:set name="gen_ind" value="Indistinto" />
								<select id="genero_preferencia" name="genero_preferencia" class="campo_text">
								<s:if test="%{#vac_gen==''}">
									<option value="Indistinto" selected="selected">Selecciona</option>
										<option value="Femenino">Femenino</option>
	 									<option value="Masculino">Masculino</option>
	 									<option value="Indistinto">Indistinto</option>
								</s:if>
								<s:elseif test="%{#vac_gen==#gen_fem}">
										<option value="Femenino" selected="selected">Femenino</option>
	 									<option value="Masculino">Masculino</option>
	 									<option value="Indistinto">Indistinto</option>
								</s:elseif>
					 			<s:elseif test="%{#vac_gen==#gen_mas}">
										<option value="Femenino">Femenino</option>
	 									<option value="Masculino" selected="selected">Masculino</option>
	 									<option value="Indistinto">Indistinto</option>
								</s:elseif>	
					 				<s:elseif test="%{#vac_gen==#gen_ind}">
										<option value="Femenino">Femenino</option>
	 									<option value="Masculino">Masculino</option>
	 									<option value="Indistinto" selected="selected">Indistinto</option>
								</s:elseif>	
 								<s:else>
 										<option value="Indistinto" selected="selected">Selecciona</option>
										<option value="Femenino">Femenino</option>
	 									<option value="Masculino">Masculino</option>
	 									<option value="Indistinto">Indistinto</option>
 								</s:else>		
				 					
				 				</select><div id="atencionDatoGenV" class="toolTipIconWarning"></div><br/>
							
							
							
							<label>Estado Vacante</label>
							<s:hidden name="esta_vac" id="estatVac" value="%{estadoVacante}"></s:hidden>
							
				 			<select id="estadoVacante" name="estadoVacante" class="campo_text">
				 				<option value="Activa" selected="selected">Selecciona</option>
				 				
 									<option value="Activa">Activa</option>
 									<option value="Inactiva">Inactiva</option>
				 					<option value="Cubierta">Cubierta</option>
				 					<option value="EnRevisionCV">En Revision CV</option>
				 					<option value="EnEntrevistas">En Entrevistas</option>
				 			</select><div id="atencionDatoEstatusV" class="toolTipIconWarning"></div><br/>
							<s:hidden name="vacante_esta_en" id="vacante_esta_en" ></s:hidden>
						</div>
						
						<div class="nuev_vac_der">
							<label>Estado</label>
							<s:set name="estad_gen" value="%{estadosp}" />
							<select id="estadoi" name="estadoi" class="campo_text">
							<s:if test="%{#estad_gen==''}">
					 				<option value="0" selected="selected">Selecciona</option>
					 			</s:if>
					 			<s:else>	
	 							<s:iterator id="listadoEstados" value="estadoi" status="it">
	 								<s:if test="%{#estad_gen==estadoi[#it.index]}">
 									<option value="<s:property value='estado_id[#it.index]'/>" selected="selected"><s:property value='estadoi[#it.index]'/></option>
 									</s:if>
 									<s:else>
 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estadoi[#it.index]'/></option>
 									</s:else>
 								</s:iterator>
 								</s:else>		
				 					
				 			</select><br/>
							
							<label>Municipio</label>
							<s:hidden id="muni_gen" name="muni_gen" value="%{munisp}" />
							
							<select id="municipio" name="municipio" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>	
				 			</select><br/>
							
							<label>Ubicaci&oacute;n</label><s:textarea cssClass="area_text" name="ubicacion" id="ubicacion" value="%{ubicacion}"></s:textarea><div id="atencionDatoUV" class="toolTipIconWarning"></div><br/>
							
							
							<label>Edad</label>
							
							<s:set name="ed_vac" value="%{edad}" />
							
							<select id="seleccionEdad" name="seleccionEdad" class="campo_text">
							<s:if test="%{#ed_vac==''}">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
				 			</s:if>
				 			<s:elseif test="%{#ed_vac=='De 18 años en adelante'}">
				 					<option value="De 18 años en adelante" selected="selected">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
				 			</s:elseif>
				 			<s:elseif test="%{#ed_vac=='De 23 a 40 años'}">
				 					<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años" selected="selected">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
				 			</s:elseif>
				 			<s:elseif test="%{#ed_vac=='De 40 años en adelante'}">
				 					<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante" selected="selected">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
				 			</s:elseif>
				 			<s:elseif test="%{#ed_vac=='Otro'}">
				 					<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro" selected="selected">Otro</option>
				 			</s:elseif>
							<s:else>
								<option value="Selecciona" selected="selected">Selecciona</option>
				 				<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
							</s:else>
									
							</select>
							<input type="text" id="otroEdad" maxlength="150"/>
							
							<s:hidden name="edad" id="edad" value="Selecciona"></s:hidden><div id="atencionDatoEdadV" class="toolTipIconWarning"></div><br/>
							<br/>
							
							
							
							
							<label>Nivel de Estudios</label>
							
							<s:hidden name="ni_vac" id="niveVac" value="%{escolaridad}"></s:hidden>
							
							<select id="escolaridad" name="escolaridad" class="campo_text">
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="listadoTip" value="grado" status="it">
 									<option value="<s:property value='grado_id[#it.index]'/>"><s:property value='grado[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select><div id="atencionDatoEscoV" class="toolTipIconWarning"></div><br/>
							<label>&Aacute;rea de Experiencia</label>
							
							<s:set name="ar_vac" value="%{areaExperiencia}" />
													
							<select id="areaExperiencia" name="areaExperiencia" class="campo_text">
								<s:if test="%{#ar_vac==''}">
								<option value="0" selected="selected">Selecciona</option>
								</s:if>
				 				<s:else>
				 				<s:iterator id="listadoTip" value="areaInteres" status="it">
				 				<s:if test="%{#ar_vac==areaInteres[#it.index]}">
 									<option value="<s:property value='areaInteres[#it.index]'/>" selected="selected"><s:property value='areaInteres[#it.index]'/></option>
 								</s:if>
 								<s:else>
 									<option value="<s:property value='areaInteres[#it.index]'/>"><s:property value='areaInteres[#it.index]'/></option>
 								</s:else>
 								</s:iterator>	
				 				</s:else>	
				 			</select><div id="atencionDatoAreaV" class="toolTipIconWarning"></div><br/>
						</div>
				</div>
				
				<div class="campo_form2">
					<div class="instrucciones_new_vac">Informaci&oacute;n Espec&iacute;fica - Nueva Vacante</div>
					<div class="nuev_vac_izq">
						<label>Conocimientos</label><s:textarea cssClass="area_text" name="conocimientos" id="conocimientos" value="%{conocimientos}"></s:textarea><div id="atencionDatoAreaV" class="toolTipIconWarning"></div><br/>
						
						
						<label>Horario</label>
						<s:hidden name="ho_vac" id="horaVac" value="%{horario}"></s:hidden>
						<select id="seleccionHorario" name="seleccionHorario" class="campo_text">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				
				 					<option value="Medio Tiempo">Medio Tiempo</option>
									<option value="Tiempo Completo">Tiempo Completo</option>
									<option value="Turno Matutino">Turno Matutino</option>
									<option value="Turno Matutino">Turno Vespertino</option>
									<option value="Turno Nocturno">Turno Nocturno</option>
									<option value="Otro">Otro</option>
									
							</select>
							<input type="text" id="otroHorario" maxlength="150"/>
						
						<s:hidden name="horario" id="horario" value="Selecciona"></s:hidden><div id="atencionDatoHoraV" class="toolTipIconWarning"></div><br/>
						
						
							<label>Sueldo</label>
							<s:hidden name="suel_vac" id="sueladoVac" value="%{sueldoVacante_na}"></s:hidden>
							<select id="seleccionSueldo" name="seleccionSueldo" class="campo_text">
				 				<option value="0" selected="selected">Selecciona</option>
				 				
				 					<option value="5000">$5,000</option>
									<option value="7000">$7,000</option>
									<option value="9000">$9,000</option>
									<option value="11000">$11,000</option>
									<option value="13000">$13,000</option>
									<option value="15000">$15,000</option>
									<option value="17000">$17,000</option>
									<option value="19000">$19,000</option>
									<option value="22000">$22,000</option>
									<option value="25000">$25,000'</option>
									<option value="30000">$30,000</option>
									<option value="40000">$40,000</option>
									<option value="50000">$50,000</option>
									<option value="60000">$60,000'</option>
									<option value="70000">$70,000</option>
									<option value="80000">$80,000</option>
									<option value="90000">$90,000'</option>
									<option value="100000">$100,000'</option>
									<option value="110000">Mas de $100,000</option>
									
							</select>
							<input type="text" id="otroSueldo" maxlength="16"  />
							
							<s:hidden name="sueldoVacante" id="sueldoVacante" value="0"></s:hidden><div id="atencionDatoSueldoV" class="toolTipIconWarning"></div>
						
						
						<br/>
						<label>Reseña</label><s:textarea cssClass="area_text" name="textoIntroductorio" id="textoIntroductorio" value="%{textoIntroductorio}"></s:textarea><div id="atencionDatoIntroV" class="toolTipIconWarning"></div><br/>
					</div>
					<div class="nuev_vac_der">
						
						<s:hidden name="region" id="reeeee" value="%{region}"></s:hidden>
						<label>Talentos</label><s:textarea cssClass="area_text" name="talentos" id="talentos" value="%{talentos}"></s:textarea><div id="atencionDatoTalenV" class="toolTipIconWarning"></div>
						<label>Observaciones</label><s:textarea cssClass="area_text" name="observaciones" id="observaciones" value="%{observaciones}"></s:textarea><div id="atencionDatoObsV" class="toolTipIconWarning"></div><br/>
						<s:hidden name="subidoPor" id="subidoPor" value="%{idAdmin}"></s:hidden>
						
								
									
									
									
								<s:hidden name="destacado" id="destacado" value="%{destacado}"></s:hidden>
								<s:hidden name="destacado_nacional" id="destacado" value="%{destacado_nacional}"></s:hidden>
								
					</div>
				</div>
			
			</form>
			
			
			<div class="campo_form3">
				<div class="instrucciones_new_vac3">Asegurese de que todos los datos ingresados anteriormente son correctos antes de Guardar</div>
				<div id="btn_save" class="btn_save"></div>
			</div>
			
			
			<div class="modal_adv detalle_vac_tit" id="warningMsj" title="Alerta" >
		        <div class="otroproceso">
		        	<div id="mensajeWarning" class="detalle_dentro" style="font-family: Verdana;font-size: 17px;text-align: center;" ></div>
		        </div>
			</div>
			
			
		</div>
	</div>
</body>
</html>