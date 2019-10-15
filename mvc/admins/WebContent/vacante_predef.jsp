<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Vacante Preedefinida</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/datepicker.css">
<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="js/vacante_predef_scripts.js"></script>
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
function changeTip(valCast){
	  tipoPlantilla(valCast);
}
function changeCorp(valSel){
	  var opcion_sel = $("#platillaVac option:selected").text();
	  if(opcion_sel=='Nueva'){
		  $("#imgCorp_new").append("<img src='images/"+valSel+".png' />");
		  $("#nueva_pre").show();
		  $("#platillaVac").prop('disabled', 'disabled');
		$("#platillaCompa").prop('disabled', 'disabled');
	  }
	  else{
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
}

function muestraVac(muestra){
	if(muestra=='0'){
		var ult=$("#vacpass").val();
		$("#"+ult).hide();
		$("#platillaVac").prop('disabled', 'disabled');
		$("#platillaCompa").prop('disabled', 'disabled');
	}else{
	var ult=$("#vacpass").val();
    $("#"+ult).hide();
    var nam=$("#corpass").val();
    var img=$("#image"+nam).val();
    $("#imgCorp"+muestra).append("<img src='images/"+img+"' />");
    $("#img"+muestra).val(img);
	$("#"+muestra).show();
	$("#vacpass").val(muestra);
	$("#"+nam).prop('disabled', 'disabled');
	$("#platillaVac").prop('disabled', 'disabled');
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
	var id_vacpre=$("#id_vacpre"+obtnForm[1]).val();
	var puesto_ofre=$("#puesto_ofre"+obtnForm[1]).val();
	var desc_emp=$("#desc_emp"+obtnForm[1]).val();
	var edad=$("#edad"+obtnForm[1]).val();
	var escolaridad=$("#escolaridad"+obtnForm[1]).val();
	var func_respo=$("#func_respo"+obtnForm[1]).val();
	var conoci=$("#conoci"+obtnForm[1]).val();
	var compe=$("#compe"+obtnForm[1]).val();
	var status=$("#sta"+obtnForm[1]).val();
	var id_vac=$("#id_vac"+obtnForm[1]).val();
	
	$("#varChan_"+obtnForm[1]).html("<input type='hidden' name='id_vacpre' id='id_vacpre' value='"+id_vacpre+"' /><input type='hidden' name='puesto_ofre' id='puesto_ofre' value='"+puesto_ofre+"' /><input type='hidden' name='desc_emp' id='desc_emp' value='"+desc_emp+"' /><input type='hidden' name='edad' id='edad' value='"+edad+"' /><input type='hidden' name='escolaridad' id='escolaridad' value='"+escolaridad+"' /><input type='hidden' name='func_respo' id='func_respo' value='"+func_respo+"' /><input type='hidden' name='conoci' id='conoci' value='"+conoci+"' /><input type='hidden' name='compe' id='compe' value='"+compe+"' /><input type='hidden' name='status' id='status' value='"+status+"' /><input type='hidden' name='id_vac' id='id_vac' value='"+id_vac+"' />");
			
			$("#form_vac_modif"+obtnForm[1]).attr("action","VacanteGuardarPre");

			$("#form_vac_modif"+obtnForm[1]).submit();
			
}

function clickSaveNew(id){
	alert(id);
	var obtnForm=id.split("_");
	var puesto_ofre=$("#puesto_ofre_"+obtnForm[1]).val();
	var desc_emp=$("#desc_emp_"+obtnForm[1]).val();
	var edad=$("#edad_"+obtnForm[1]).val();
	var escolaridad=$("#escolaridad_"+obtnForm[1]).val();
	var func_respo=$("#func_respo_"+obtnForm[1]).val();
	var conoci=$("#conoci_"+obtnForm[1]).val();
	var compe=$("#compe_"+obtnForm[1]).val();
	var status="1";
	var id_vac=$("#escojePre_"+obtnForm[1]).val();
	
	$("#varChan_"+obtnForm[1]).html("<input type='hidden' name='puesto_ofre' id='puesto_ofre' value='"+puesto_ofre+"' /><input type='hidden' name='desc_emp' id='desc_emp' value='"+desc_emp+"' /><input type='hidden' name='edad' id='edad' value='"+edad+"' /><input type='hidden' name='escolaridad' id='escolaridad' value='"+escolaridad+"' /><input type='hidden' name='func_respo' id='func_respo' value='"+func_respo+"' /><input type='hidden' name='conoci' id='conoci' value='"+conoci+"' /><input type='hidden' name='compe' id='compe' value='"+compe+"' /><input type='hidden' name='status' id='status' value='"+status+"' /><input type='hidden' name='id_vac' id='id_vac' value='"+id_vac+"' />");
			
			$("#form_vac_"+obtnForm[1]).attr("action","VacanteGuardarPre");

			$("#form_vac_"+obtnForm[1]).submit();
			
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
     $("#infdina").html("<table><tr><td><label><b>Nombre de la Vacante</b></label></td><td><p>"+puesto_ofre+"</p></td></tr><tr><td><label><b>Requisistos</b></label></td><td><label>Edad:</label><p>"+edad+"</p><br/><label>Escolaridad:</label><p>"+escolaridad+"</p></td></tr><tr><td><label><b>Funciones y Responsabilidades</b></label></td><td><p>"+func_respo+"</p></td></tr><tr><td><label><b>Competencias</b></label></td><td><p>"+conoci+"</p></td></tr><tr><td><label><b>Conocimientos</b></label></td><td><p>"+compe+"</p></td></tr></table>"); 
}     
function cancelOper(){
	window.location.href = 'VacantePred';
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
			<h1>Vacante Predefinida</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Complete los siguientes datos para crear la vacante</div><br/><br/>
			
			<div class="instrucciones" style="width:200px; float:left; margin-top: 19px;">Selecciona el tipo de vacante:</div>

			<select id="platillaVac" name="platillaVac" class="campo_text" onchange="changeTip(this.value)">
 				<option value="Selecciona" selected="selected">Selecciona</option>
 				
 					<option value="nueva">Nueva</option>
					<option value="modificar">Modificar</option>
					<option value="eliminar">Eliminar</option>
					
			</select>
			
			<select id="platillaCompa" name="platillaCompa" class="campo_text" onchange="changeCorp(this.value)" style="display: none;">
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
			
			
			<div id="nueva_pre" style="display: none;">

				<div class="campo_form1_pre">
						
						<div class="instrucciones_new_vac">Informaci&oacute;n General - Nueva Vacante Preedefinida</div>
						<div class="nuev_vac_izq">
							<div style=" background-color: white;">
							<div id="imgCorp_new" style="text-align:center;"></div>
							<input type="hidden" value="" id="img_new"/>

							<input type="hidden" value="<s:property value='nombreAdmin'/>" id="nom_admin"/>
							<table>
							<tr>
							<td>
							<label><b>Descripcion de la Vacante</b></label></td><td><textarea  class="area_text" id="desc_emp_new"></textarea><br/>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Nombre de la Vacante</b></label></td><td><input type="text" value="" id="puesto_ofre_new"/>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Requisistos</b></label>
							</td>
							<td>
							<label><b>Edad</b></label><input type="text" value="" id="edad_new"/>
							<br/><br/>
							<label><b>Escolaridad</b></label><input type="text" value="" id="escolaridad_new"/>
							</td>
							</tr>	
							<tr>
							<td>
							<label><b>Vacante Preedefinida</b></label>
							<select id="escojePre_new" name="escojePre_new" class="campo_text">
 							<option value="0" selected="selected">Selecciona</option>
 							<option value="N" selected="selected">Nueva</option>
 							<s:iterator value="lstvac">
 							<s:set id="valVac" value="id_comp"></s:set>
 							<option value="<s:property value="id_vac"/>"><s:property value="desc_vac"/></option>
							</s:iterator>	
							</select>
							</td>
							</tr>	
							</table>
							</div>
						</div>
						<div class="nuev_vac_der">
							<div style=" background-color: white;">
							<table>
							<tr>
							<td>
							<label><b>Funciones y Responsabilidades</b></label></td><td><textarea  class="area_text" id="func_respo_new"/></textarea>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Competencias</b></label></td><td><textarea  class="area_text" id="compe_new"/></textarea>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Conocimientos</b></label></td><td><textarea class="area_text" id="conoci_new"></textarea>
							</td>
							</tr>
							</table>
							</div>
						</div>

						<div  style="color:#D11919; text-align:center;">Aseg&uacute;rese de que todos los datos ingresados anteriormente son correctos antes de guardar</div>
						<br/>
						<div style="text-align:center;">
						<div id="btn_new" class="btn_save" onclick="clickSaveNew(this.id)"></div>
						<div id="btnV_new" class="btn_vista" onclick="loadPopupBox(this.id)"></div>
						<div id="btnC_new" class="btn_cancel" onclick="cancelOper()"></div>
						</div>
						</div>
							
				</div>

		
			<s:iterator value="lstpre">
			<div id="<s:property value="id_vac"/>" style="display: none;">

				<div class="campo_form1_pre">
						
						<div class="instrucciones_new_vac">Informaci&oacute;n General - Nueva Vacante <s:property value="puesto_ofre"/></div>
						<div class="nuev_vac_izq">
							<div style=" background-color: white;">
							<div id="imgCorp<s:property value="id_vac"/>" style="text-align:center;"></div>
							<input type="hidden" value="" id="id_vac<s:property value="id_vac"/>"/>
							<input type="hidden" value="" id="img<s:property value="id_vac"/>"/>
							<input type="hidden" value="" id="idmod<s:property value="id_vacpre"/>"/>
							<input type="hidden" value="<s:property value='nombreAdmin'/>" id="nom_admin"/>
							<table>
							<tr>
							<td>
							<label><b>Descripcion de la Vacante</b></label></td><td><textarea  class="area_text" id="desc_emp<s:property value="id_vac"/>"><s:property value='desc_emp'/></textarea>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Nombre de la Vacante</b></label></td><td><input type="text" value="<s:property value='puesto_ofre'/>" id="puesto_ofre<s:property value="id_vac"/>"/></p>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Requisistos</b></label>
							</td>
							<td>
							<label><b>Edad</b></label><input type="text" value="<s:property value='edad'/>" id="edad<s:property value="id_vac"/>"/>
							<br/><br/>
							<label><b>Escolaridad</b></label><input type="text" value="<s:property value='escolaridad'/>" id="escolaridad<s:property value="id_vac"/>"/>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Status</b></label>
							<select id="sta<s:property value='id_vac'/>" name="sta<s:property value='id_vac'/>" class="campo_text">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				
				 					<option value="1">Activa</option>
									<option value="0">Inactiva</option>
	
							</select>
							</td>
							</tr>
							</table>
							</div>
						</div>
						<div class="nuev_vac_der">
							<table>
							<tr>
							<td>
							<label><b>Funciones y Responsabilidades</b></label></td><td><textarea class="area_text"  id="func_respo<s:property value="id_vac"/>"><s:property value='func_respo'/></textarea>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Competencias</b></label></td><td><textarea  class="area_text" id="compe<s:property value="id_vac"/>"><s:property value='compe'/></textarea>
							</td>
							</tr>
							<tr>
							<td>
							<label><b>Conocimientos</b></label></td><td><textarea class="area_text"  id="conoci<s:property value="id_vac"/>"><s:property value='conoci'/></textarea>
							</td>
							</tr>
							</table>
						</div>

						<div  style="color:#D11919; text-align:center;">Aseg&uacute;rese de que todos los datos ingresados anteriormente son correctos antes de guardar</div>
						<br/>
						<div style="text-align:center;">
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

	<form theme="simple" id="form_vac_new" action="VacanteGuardarPre" method="POST" accept-charset="utf-8">
					<div id="varChan_new">
					<input type="hidden"  name="puesto_ofre" id="puesto_ofre" value="" />
					<input type="hidden"  name="escolaridad" id="escolaridad" value="" />
					<input type="hidden"  name="desc_emp" id="desc_emp" value="" />
					<input type="hidden"  name="conoci" id="conoci" value="" />
					<input type="hidden"  name="func_respo" id="func_respo" value="" />
					<input type="hidden"  name="compe" id="compe" value="" />
					<input type="hidden"  name="status" id="status" value="1" />
					<input type="hidden" name="id_vac" id="id_vac" value="" />
					</div>
	</form>

	<s:iterator value="lstpre">
	<form theme="simple" id="form_vac_modif<s:property value="id_vac"/>" action="VacanteGuardarPre" method="POST" accept-charset="utf-8">
					<div id="varChan_<s:property value="id_vac"/>">
					<input type="hidden" name="id_vacpre" id="id_vacpre" value="<s:property value="id_vacpre"/>" />
					<input type="hidden"  name="puesto_ofre" id="puesto_ofre" value="<s:property value="puesto_ofre"/>" />
					<input type="hidden"  name="escolaridad" id="escolaridad" value="<s:property value="escolaridad"/>" />
					<input type="hidden"  name="desc_emp" id="desc_emp" value="<s:property value="desc_emp"/>" />
					<input type="hidden"  name="conoci" id="conoci" value="<s:property value="conoci"/>" />
					<input type="hidden"  name="func_respo" id="func_respo" value="<s:property value="func_respo"/>" />
					<input type="hidden"  name="compe" id="compe" value="<s:property value="compe"/>" />
					<input type="hidden"  name="status" id="status" value="<s:property value="status"/>" />
					<input type="hidden" name="id_vac" id="id_vac" value="<s:property value="id_vac"/>" />
					</div>
	</form>
	</s:iterator>
	
</body>
</html>