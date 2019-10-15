<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Nueva Vacante</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css">
<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="js/nueva_vacante_scripts.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.simpletip-1.3.1.js"></script>
<script type="text/javascript" src="js/jquery.numeric.js"></script>
<script type="text/javascript" src="js/jquery.alphanumeric.js"></script>
<script type="text/javascript" src="js/alertify.js"></script>
<script type="text/javascript" src="js/alertify.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/alertify.core.css">
<link rel="stylesheet" type="text/css" href="css/alertify.default.css">
<link rel="stylesheet" type="text/css" href="css/alertify.bootstrap.css">
<script type="text/javascript">
$(document).ready(function(){
    $('#aniosExperiencia').numeric();
    $("#otroSueldo").alphanumeric();
    $('#otroEdad').alphanumeric();

});
function validaCar(){
 var valE= $('#aniosExperiencia').val();
 if(valE=="." || valE=="-"){
 	alertify.alert("Este caracter "+valE+" no es permitido en este campo");
 	 $('#aniosExperiencia').val("");
 }
}
function changeCorp(valSel){
	if(valSel=='0'){
		var ult=$("#corpass").val();
		$("#"+ult).hide();
	}else{
	var ult=$("#corpass").val();
    $("#"+ult).hide();
	$("#"+valSel).show();
	$("#corpass").val(valSel);
	}
}

function muestraVac(muestra){
	if(muestra=='0'){
		var ult=$("#vacpass").val();
		$("#"+ult).hide();
	}else{
	var ult=$("#vacpass").val();
    $("#"+ult).hide();
    var nam=$("#corpass").val();
    var img=$("#image"+nam).val();
    $("#imgCorp"+muestra).append("<img src='images/"+img+"' />");
    $("#img"+muestra).val(img);
	$("#"+muestra).show();
	$("#vacpass").val(muestra);
	$("#platillaVac").prop('disabled', 'disabled');
	$("#"+nam).prop('disabled', 'disabled');
	$("#platillaCompa").prop('disabled', 'disabled');
	$('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
	}
	
}

function cambiaEdo(id){
	var id_estado = $("#estado"+id).val(); 
	lipiaMunicipios1(id);
	traerMunicipio1(id_estado,id);
}

function clickSavePre(id){
	
	var obtnForm=id.split("_");
	
	var muni=$("#municipio"+obtnForm[1]+" option:selected").text();
	var hora=$("#horario"+obtnForm[1]).val();
	var fec=$("#fec_publi"+obtnForm[1]).val();
	var sueldo=$("#sueldo"+obtnForm[1]).val();
	var correo=$("#correo"+obtnForm[1]).val();
	var estado=$("#estado"+obtnForm[1]+" option:selected").text();
	var tel=$("#telefono"+obtnForm[1]).val()
	
	$("#varChan_"+obtnForm[1]).html("<input type='hidden' name='ubicacion' id='ubicacion' value='"+muni+"' /><input type='hidden' name='horario' id='horario' value='"+hora+"' /><input type='hidden' name='fechaPublicacion' id='fechaPublicacion' value='"+fec+"' /><input type='hidden' name='sueldoVacante' id='sueldoVacante' value='"+sueldo+"' /><input type='hidden' name='correo' id='correo' value='"+correo+"' /><input type='hidden' name='estadosa' id='estadosa' value='"+estado+"' /><input type='hidden' name='munisa' id='munisa' value='"+muni+"' /><input type='hidden' name='tel' id='tel' value='"+tel+"' />");
			
			$("#form_vac_nueva"+obtnForm[1]).attr("action","VacanteGuardar");

			$("#form_vac_nueva"+obtnForm[1]).submit();
			
}

function popupBoxClose() {           
    unloadPopupBox();
}


function unloadPopupBox() {  
    $('#popup_box').fadeOut("slow");
}   

function loadPopupBox(splitme) { 
	var id=splitme.split("_");
	$("#title_pop").html("");
	 $("#infoInt").html("");
	 $("#infdina").html("");
	 $("#imgpop").html("");
    $('#popup_box').fadeIn("slow");
    var img=$("#img"+id[1]).val();
    var desc_emp=$("#desc_emp"+id[1]).val();
    var puesto_ofre=$("#puesto_ofre"+id[1]).val();
    var edad=$("#edad"+id[1]).val();
    var escolaridad=$("#escolaridad"+id[1]).val();
    var func_respo=$("#func_respo"+id[1]).val();
    var conoci=$("#conoci"+id[1]).val();
    var compe=$("#compe"+id[1]).val();
    var estado=$("#estado"+id[1]+" option:selected").text();
    var municipio=$("#municipio"+id[1]+" option:selected").text();
    var salario=$("#salario"+id[1]+" option:selected").text();
    var horario=$("#horario"+id[1]+" option:selected").text();
    var fecha=$("#fec_publi"+id[1]).val();
    var correo=$("#correo"+id[1]).val();
    var tel=$("#telefono"+id[1]).val();
    $("#title_pop").html("<a style='font-family:Verdana; color: white; font-size: 20px; font-weight: bold;'>"+puesto_ofre+"</a>");
    $("#infoInt").html("<a style='font-family:Verdana; font-size: 12px;'>"+desc_emp+"</a>"); 
    $("#imgpop").html("<img src='images/popup/"+img+"' />");
     $("#infdina").html("<table><tr><td><label><b>Nombre de la Vacante</b></label></td><td><p>"+puesto_ofre+"</p></td></tr><tr><td><label><b>Requisistos</b></label></td><td><label>Edad:</label><p>"+edad+"</p><br/><label>Escolaridad:</label><p>"+escolaridad+"</p></td></tr><tr><td><label><b>Funciones y Responsabilidades</b></label></td><td><p>"+func_respo+"</p></td></tr><tr><td><label><b>Competencias</b></label></td><td><p>"+conoci+"</p></td></tr><tr><td><label><b>Conocimientos</b></label></td><td><p>"+compe+"</p></td></tr><tr><td><label><b>Estado</b></label></td><td><p>"+estado+"</p></td></tr><tr><td><label><b>Municipio</b></label></td><td><p>"+municipio+"</p></td></tr><tr><td><label><b>Salario</b></label></td><td><p>"+salario+"</p></td></tr><tr><td><label><b>Horario</b></label></td><td><p>"+horario+"</p></td></tr><tr><td><label><b>Fecha de publicaci&oacute;n</b></label></td><td><p>"+fecha+"</p></td></tr><tr><td><label><b>Correo</b></label></td><td><p>"+correo+"</p></td></tr><tr><td><label><b>Telefono</b></label></td><td><p>"+tel+"</p></td></tr></table>"); 
}     
function cancelOper(){
	window.location.href = 'VacanteNueva';
}
	
</script>
</head>
<body>

	
	<s:set name="webFramework" value="destacadosCompletos"/>
	
	<s:set name="webFramework3" value="destacadosCompletosN"/>
	
	<s:set name="webFramework2" value="lvl"/>
	
	<input type="hidden" id="corpass" name="corpass" value="" />
	
	<input type="hidden" id="vacpass" name="vacpass" value="0" />
	
	<div id="content"> 
		
		
		
		
		<div id="content-adm">
		<input type="hidden" value="<s:property value='ubicacionAdmin'/>" id="ub" name="ub">
		<s:hidden name="setRET" id="setRET" value="%{lvl}"></s:hidden>
		
		<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a> <a href="/admins/VacanteAdmin">Administaci&oacute;n de Vacantes - </a> </span>
			<h1>Nueva Vacante</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Complete los siguientes datos para crear la vacante</div><br/><br/>
			
			<div class="instrucciones" style="width:200px; float:left; margin-top: 19px;">Selecciona el tipo de vacante:</div>
			<select id="platillaVac" name="platillaVac" class="campo_text">
 				<option value="Selecciona" selected="selected">Selecciona</option>
 				
 					<option value="Corporativo">Corporativo</option>
					<option value="Geografica">Geografica</option>
					
			</select>
			
			<select id="platillaCompa" name="platillaCompa" class="campo_text" onchange="changeCorp(this.value)">
 				<option value="0" selected="selected">Selecciona</option>
 				<s:iterator value="lstcomp">
 					<option value="<s:property value="desc_comp"/>"><s:property value="desc_comp"/></option>
				</s:iterator>	
			</select>
			
			<s:iterator value="lstcomp">
 					<input type="hidden" id="image<s:property value="desc_comp"/>" name="image<s:property value="desc_comp"/>" value="<s:property value="image"/>" />
 				</s:iterator>
			
			<s:iterator value="lstcomp">
			<s:set id="valComp" value="id_comp"></s:set>
			<select id="<s:property value="desc_comp"/>" name="<s:property value="desc_comp"/>" class="campo_text" style="display: none; position: absolute; top: 273px; left: 630px;" onchange="muestraVac(this.value)">
 				<option value="0" selected="selected">Selecciona</option>
 				<s:iterator value="lstvac">
 					<s:set id="valVac" value="id_comp"></s:set>
 					<s:if test="%{#valComp==#valVac}">
 					<option value="<s:property value="id_vac"/>"><s:property value="desc_vac"/></option>
					</s:if>	
				</s:iterator>	
			</select><br/>
			</s:iterator>
			<br/>
			<br/>
			
			
			
			<div id="vacante_normal">
			
			<form theme="simple" id="form_vac_nueva" action="VacanteGuardar" method="POST" accept-charset="utf-8">
				<div class="campo_form1">
					<div class="instrucciones_new_vac">Informaci&oacute;n General - Nueva Vacante</div>
						<div class="nuev_vac_izq">
							<input type="hidden" value="<s:property value='nombreAdmin'/>" id="nom_admin"/>
							<input type="hidden" value="<s:property value='ultimo_folio'/>" id="consecutivo"/>
							<label>Nombre de la Vacante</label><s:textfield cssClass="campo_text" name="nombreVacante"  id="nombreVacante" maxlength="50"></s:textfield><div id="atencionDatoFV" class="toolTipIconWarning"></div><br/>
							
							<label>Fecha de Publicaci&oacute;n</label><s:textfield cssClass="campo_text" name="fechaPublicacion" id="fechaPublicacion" maxlength="7" readonly="true"></s:textfield><div id="atencionDatoFechV" class="toolTipIconWarning"></div><br/>
							
				 				
				 				<input type="hidden" id="tipoVacante" name="tipoVacante" value="2">
				 				
							<label>Experiencia (años)</label><s:textfield cssClass="campo_text" name="aniosExperiencia" id="aniosExperiencia" maxlength="2" onkeypress="validaCar()"></s:textfield><div id="atencionDatoExP" class="toolTipIconWarning"></div><br/>
							<label>Principales Funciones</label><s:textarea cssClass="area_text" name="prinFuncionesVacante" id="prinFuncionesVacante"></s:textarea><div id="atencionDatoPrinFunV" class="toolTipIconWarning"></div><br/>
							<label>Preferencia de G&eacute;nero</label>
							
								<select id="genero_preferencia" name="genero_preferencia" class="campo_text">
					 				<option value="Indistinto" selected="selected">Selecciona</option>
					 				
	 									<option value="Femenino">Femenino</option>
	 									<option value="Masculino">Masculino</option>
	 									<option value="Indistinto">Indistinto</option>
 										
				 					
				 				</select><div id="atencionDatoGenV" class="toolTipIconWarning"></div><br/>
							
							
							<s:hidden name="estadoVacante" id="estadoVacante" value="Activa"></s:hidden>
							<s:hidden name="vacante_esta_en" id="vacante_esta_en" value="Nueva Vacante"></s:hidden>
						</div>
						<div class="nuev_vac_der">
							
							<label>Estado</label>
							
							<select id="estado" name="estado" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>
					 				
	 							<s:iterator id="listadoEstados" value="estado" status="it">
 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estado[#it.index]'/></option>
 									
 								</s:iterator>
 										
				 					
				 			</select><br/>
							
							<s:hidden name="estadosr" id='estadosr' value=""></s:hidden>
							
							<label>Municipio</label>
							
							<select id="municipio" name="municipio" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>	
				 			</select><br/>
				 			
				 			<s:hidden name="munisr" id="munisr" value=""></s:hidden>
							
							<label>Ubicaci&oacute;n</label><s:textarea cssClass="area_text" name="ubicacion" id="ubicacion" readonly="true"></s:textarea><div id="atencionDatoUV" class="toolTipIconWarning"></div><br/>
							
							
							<label>Edad</label>
							<select id="seleccionEdad" name="seleccionEdad" class="campo_text">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				
				 					<option value="De 18 años en adelante">De 18 años en adelante</option>
									<option value="De 23 a 40 años">De 23 a 40 años</option>
									<option value="De 40 años en adelante">De 40 años en adelante</option>
									<option value="Otro">Otro</option>
									
							</select>
							<input type="text" id="otroEdad" maxlength="150"/>
							
							<s:hidden name="edad" id="edad" value="Selecciona"></s:hidden><div id="atencionDatoEdadV" class="toolTipIconWarning"></div><br/>
							<br/>
							
							
							
							
							<label>Nivel de Estudios</label>
							<select id="escolaridad" name="escolaridad" class="campo_text">
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="listadoTip" value="grado" status="it">
				 					<s:if test="grado[#it.index]!='Otro'">
 									<option value="<s:property value='grado_id[#it.index+1]'/>"><s:property value='grado[#it.index]'/></option>
 									</s:if>
 								</s:iterator>			
				 			</select>
				 			<div id="atencionDatoEscoV" class="toolTipIconWarning"></div><br/>
							<label>&Aacute;rea de Experiencia</label>
							
							<select id="areaExperiencia" name="areaExperiencia" class="campo_text">
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="listadoTip" value="areaInteres" status="it">
 									<option value="<s:property value='areaInteres[#it.index]'/>"><s:property value='areaInteres[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select><div id="atencionDatoAreaV" class="toolTipIconWarning"></div><br/>
								
								
								
								
							
						</div>
				</div>
				
				<div class="campo_form2" style="height: 550px;">
					<div class="instrucciones_new_vac">Informaci&oacute;n Espec&iacute;fica - Nueva Vacante</div>
					<div class="nuev_vac_izq">
						<label>Conocimientos</label><s:textarea cssClass="area_text" name="conocimientos" id="conocimientos"></s:textarea><div id="atencionDatoConoV" class="toolTipIconWarning"></div><br/>
						
						
						<label>Horario</label>
						<select id="seleccionHorario" name="seleccionHorario" class="campo_text">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				
				 					<option value="Medio Tiempo">Medio Tiempo</option>
									<option value="Tiempo Completo">Tiempo Completo</option>
									<option value="Turno Matutino">Turno Matutino</option>
									<option value="Turno Matutino">Turno Vespertino</option>
									<option value="Turno Nocturno">Turno Nocturno</option>
									<option value="Otro">Otro</option>
									
							</select>
							<input type="text" id="otroHorario" maxlength="150" />
						
						<s:hidden name="horario" id="horario" value="Selecciona"></s:hidden><div id="atencionDatoHoraV" class="toolTipIconWarning"></div><br/>
						
						
							<label>Sueldo</label>
							<select id="seleccionSueldo" name="seleccionSueldo" class="campo_text">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				
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
									<option value="otro">Otro</option>
							</select><s:textfield id="otroSueldo" name="otroSueldo"  value="" maxlength="8" ></s:textfield>
							<s:hidden name="sueldoVacante" id="sueldoVacante" value="0"></s:hidden><div id="atencionDatoSueldoV" class="toolTipIconWarning"></div>
						
						
						<br/>
						<label>Reseña</label><s:textarea cssClass="area_text" name="textoIntroductorio" id="textoIntroductorio"></s:textarea><div id="atencionDatoIntroV" class="toolTipIconWarning"></div><br/>
						
						
						
						
						
					</div>
					<div class="nuev_vac_der">
						
						<input type="hidden" value="<s:property value='region'/>" id="reeeee" name="region">
						<label>Talentos</label><s:textarea cssClass="area_text" name="talentos" id="talentos"></s:textarea><div id="atencionDatoTalenV" class="toolTipIconWarning"></div>
						<label>Observaciones</label><s:textarea cssClass="area_text" name="observaciones" id="observaciones"></s:textarea><div id="atencionDatoObsV" class="toolTipIconWarning"></div><br/>
						<s:hidden name="subidoPor" id="subidoPor" value="%{idAdmin}"></s:hidden>
						
								
									
							<s:hidden name="destacado" id="destacado" value="0"></s:hidden>
							<s:hidden name="destacado_nacional" id="destacado_nacional" value="0"></s:hidden>
						
						
						
					</div>
				</div>
			
			</form>
			
			
				<div class="campo_form3">
					<div class="instrucciones_new_vac3" style="color:#D11919;">Aseg&uacute;rese de que todos los datos ingresados anteriormente son correctos antes de guardar</div>
					<div id="btn_save" class="btn_save"></div>
					<div id="btnC_new" class="btn_cancel" onclick="cancelOper()"></div>
				</div>
			</div>
			
			
			
				
			<s:iterator value="lstpre">
			<div id="<s:property value="id_vac"/>" style="display: none;">

				<div class="campo_form1_pre">
						
						<div class="instrucciones_new_vac">Informaci&oacute;n General - Nueva Vacante <s:property value="puesto_ofre"/></div>
						<div class="nuev_vac_izq">
							<div style=" background-color: white;">
							<div id="imgCorp<s:property value="id_vac"/>" style="text-align:center;"></div>
							<a style="font-family:Verdana; font-size: 12px;"><s:property value="desc_emp"/></a>
							<input type="hidden" value="<s:property value='puesto_ofre'/>" id="puesto_ofre<s:property value="id_vac"/>"/>
							<input type="hidden" value="" id="img<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='desc_emp'/>" id="desc_emp<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='edad'/>" id="edad<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='escolaridad'/>" id="escolaridad<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='func_respo'/>" id="func_respo<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='conoci'/>" id="conoci<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='compe'/>" id="compe<s:property value="id_vac"/>"/>
							<input type="hidden" value="<s:property value='nombreAdmin'/>" id="nom_admin"/>
							<table>
							<tr>
							<td>
							<label><b>Nombre de la Vacante</b></label></td><td><p><s:property value="puesto_ofre"/></p>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Requisistos</b></label>
							</td>
							<td>
							<label><b>Edad</b></label><p><s:property value="edad"/></p>
							<br/>
							<label><b>Escolaridad</b></label><p><s:property value="escolaridad"/></p>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Funciones y Responsabilidades</b></label></td><td><p><s:property value="func_respo"/></p>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Competencias</b></label></td><td><p><s:property value="conoci"/></p>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Conocimientos</b></label></td><td><p><s:property value="compe"/></p>
							</td>
							</tr>
							</table>
							</div>
						</div>
						<div class="nuev_vac_der">

							<label><b>Estado</b></label>
							
							<select id="estado<s:property value="id_vac"/>" name="<s:property value="id_vac"/>" class="campo_text" onchange="cambiaEdo(this.name)">
					 				<option value="0" selected="selected">Selecciona</option>
					 				
	 							<s:iterator id="listadoEstados" value="estado" status="it">
 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estado[#it.index]'/></option>
 								</s:iterator>
 										
				 					
				 			</select><br/>

							
							<label><b>Municipio</b></label>
							
							<select id="municipio<s:property value="id_vac"/>" name="<s:property value="id_vac"/>" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>	
				 			</select><br/>

						
						
							
							<label><b>Salario</b></label>
							
							<select id="salario<s:property value="id_vac"/>" name="<s:property value="id_vac"/>" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>	
				 			</select><br/>

						
						
							<label><b>Horario</b></label>
							
							<select id="horario<s:property value="id_vac"/>" name="<s:property value="id_vac"/>" class="campo_text">
					 				<option value="0" selected="selected">Selecciona</option>	
				 			</select><br/><br/>

						
						
						<label><b>Fecha de publicaci&oacute;n</b></label><input type="text" class="datepicker" cssClass="campo_text"  name="fec_publi<s:property value="id_vac"/>"  id="fec_publi<s:property value="id_vac"/>" value="" readonly /><img src="images/calendar.png"  width="16" height="16" />
							
						<br/>
						<br/>
						
						<label><b>Correo</b></label><input type="text" cssClass="campo_text" name="correo<s:property value="id_vac"/>"  id="correo<s:property value="id_vac"/>" value="" />
						<br/><br/>
						<label><b>Telefono</b></label><input type="text" cssClass="campo_text" name="telefono<s:property value="id_vac"/>"  id="telefono<s:property value="id_vac"/>" value="" />
						<br/><br/>
						<div  style="color:#D11919; text-align:center;">Aseg&uacute;rese de que todos los datos ingresados anteriormente son correctos antes de guardar</div>
						<br/>
						<div id="btn_<s:property value="id_vac"/>" class="btn_save" onclick="clickSavePre(this.id)"></div>
						<div id="btnV_<s:property value="id_vac"/>" class="btn_vista" onclick="loadPopupBox(this.id)"></div>
						<div id="btnC_new" class="btn_cancel" onclick="cancelOper()"></div>
						</div>
							
				</div>

			</div>
			
			
			</s:iterator>
			
		</div>
	</div>
	

	<div id="popup_box" style="background-image: url('images/popup/back.png'); text-align:center;">
	<div id="top_pop"></div><div id="title_pop"></div><div id="close_pop" onclick="popupBoxClose()"></div>
	<br/><br/>
	<div id="imgpop" style="text-align:center;"></div>
	<div id="infoInt" style="text-align:center;"></div>
    <table CELLSPACING=2 CELLPADDING=1 >
    <tr>
    <th colspan="3">
    <img src="images/popup/linea.png" />
    </th>
    </tr>
    <tr style="height:240px;">
    <td >
    	<div id="infdina" style="font-family:Verdana; font-size:10px; margin-left:15px;width: 300px; height: 200px; overflow-y: scroll;"></div>
    	
    </td>
    <td>
    <img src='images/popup/persona10.png' />
    </td>
    </tr>
     <tr>
    <th colspan="3">
    <img src="images/popup/linea.png" />
    </th>
    </tr>
    <tr>
    <td><img src="images/popup/compartir.png" />&nbsp;&nbsp;<img src="images/popup/movil.png" /><img src="images/popup/contador.png" /></td>
    <td><img src="images/popup/boton.png" /></td>
    </tr>
    </table>
  
</div>	


	<s:iterator value="lstpre">
	<form theme="simple" id="form_vac_nueva<s:property value="id_vac"/>" action="VacanteGuardar" method="POST" accept-charset="utf-8">
					<input type="hidden" name="nombreVacante" id="nombreVacante" value="<s:property value="puesto_ofre"/>" />
					<input type="hidden"  name="edad" id="edad" value="<s:property value="edad"/>" />
					<input type="hidden"  name="escolaridad" id="escolaridad" value="<s:property value="escolaridad"/>" />
					<input type="hidden"  name="textoIntroductorio" id="textoIntroductorio" value="<s:property value="desc_emp"/>" />
					<input type="hidden"  name="conocimientos" id="conocimientos" value="<s:property value="conoci"/>" />
					<input type="hidden"  name="talentos" id="talentos" value="<s:property value="func_respo"/>" />
					<input type="hidden"  name="observaciones" id="observaciones" value="<s:property value="compe"/>" />
					
					<div id="varChan_<s:property value="id_vac"/>">	
						<input type="hidden"  name="ubicacion" id="ubicacion" value="" />
						<input type="hidden" name="horario" id="horario" value="" />
						<input type="hidden" name="fechaPublicacion" id="fechaPublicacion" value="" />
						<input type="hidden" name="sueldoVacante" id="sueldoVacante" value="" />
						<input type="hidden" name="correo" id="correo" value="" />
						<input type="hidden" name="estadosa" id="estadosa" value="" />
						<input type="hidden" name="munisa" id="munisa" value="" />
						<input type="hidden" name="tel" id="tel" value="" />
					</div>
					
						<s:hidden name="anios_experencia" id="anios_experencia" value="0"></s:hidden>
						<s:hidden name="estadoVacante" id="estadoVacante" value="Activa"></s:hidden>
						<s:hidden name="vacante_esta_en" id="vacante_esta_en" value="Nueva Vacante"></s:hidden>
						<s:hidden name="destacado" id="destacado" value="0"></s:hidden>
						<s:hidden name="tipoVacante" id="tipoVacante" value="1"></s:hidden>
						<s:hidden name="subidoPor" id="subidoPor" value="%{idAdmin}"></s:hidden>
						<input type="hidden" value="<s:property value='region'/>" id="reeeee" name="region">
						<s:hidden name="destacado_nacional" id="destacado_nacional" value="0"></s:hidden>
			</form>
	</s:iterator>
</body>
</html>