<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/busqueda_candidatos.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/jquery/jquery.simpletip-1.3.1.js"></script>
<script type="text/javascript" src="js/alertify.js"></script>
<script type="text/javascript" src="js/alertify.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/alertify.core.css">
<link rel="stylesheet" type="text/css" href="css/alertify.default.css">
<link rel="stylesheet" type="text/css" href="css/alertify.bootstrap.css">
<script type="text/javascript">
$(document).ready(function(){
$("#btnSearch").click(function (){
	var estado=$("#estado2").val();
	if(estado!='Selecciona'){
	$("#busquedaCandidato").submit();
	}else{
		alertify.error("Debe seleccionar un estado para poder continuar");
	}
	
});
});
</script>
<title>Busqueda Candidato</title>
</head>
<body>
     <div id="content"> 
      
		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a></span>
			<h1>Candidatos</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Complete los siguentes parametros para realizar una busqueda</div><br/>
			
			<s:actionerror cssClass="error_log"/>
			
			<div class="searchBox" style="height: 550px;">
				<h1>Buscar Candidatos</h1>
				
				 <form id="busquedaCandidato" theme="simple" action="ResultadoCandidatos" method="POST" accept-charset="utf-8"">

				   <label>Estado</label>
					<div class="coberturaBC" > 		
							<select id="estado2" name="estado2" >
					 				<option value="Selecciona" selected="selected">Selecciona</option>
					 				
	 							<s:iterator id="listadoEstados" value="estado" status="it">
 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estado[#it.index]'/></option>
 								</s:iterator>
 										
				 					
				 			</select>
				 	</div>
				 			<input type="hidden" id="estado" name="estado" value="Selecciona" />
				 			
					
					<label>Municipio</label>
						<div class="coberturaBC" > 	
							<select id="municipio" name="municipio"  >
					 				<option value="Selecciona" selected="selected">Selecciona</option>	
				 			</select>
				 		</div>
				   
				   <label>Edad minima</label>
					<div class="coberturaBC" > 
							<select id="minEdad" name="minEdad" >
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="edad" value="edad" status="it">
 									<option value="<s:property value='edad[#it.index]'/>"><s:property value='edad[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select>
					</div>
					
					<label>Edad maxima</label>
					<div class="coberturaBC" > 
						<select id="maxEdad" name="maxEdad" >
				 				<option value="0" selected="selected">Selecciona</option>
				 				<s:iterator id="edad" value="edad" status="it">
 									<option value="<s:property value='edad[#it.index]'/>"><s:property value='edad[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select>
				 	</div>
					
				   <label>Grado Academico</label>
					<div class="coberturaBC" > 
							<select id="minGrado" name="minGrado">
				 				<option value="Selecciona" selected="selected">Selecciona</option>
				 				<s:iterator id="listadoTip" value="grado" status="it">
 									<option value="<s:property value='grado_id[#it.index]'/>"><s:property value='grado[#it.index]'/></option>
 								</s:iterator>	
				 					
				 			</select>
				 	</div>
				 	
					
					
					<label>Genero</label>
					<div class="coberturaBC" > 
						<s:select id="sexo" name="sexo"  list="#{'Selecciona':'Selecciona','I':'Indistinto','M':'Masculino','F':'Femenino'}" />
					</div>
					
					
				    <label>Area de Interes</label>
				    <div class="coberturaBC" >   
					    <select id="areaInteres" name="areaInteres">
					 				<option value="Selecciona" selected="selected">Selecciona</option>
					 				<s:iterator id="listadoTip" value="areaInteres" status="it">
	 									<option value="<s:property value='areaInteres[#it.index]'/>"><s:property value='areaInteres[#it.index]'/></option>
	 								</s:iterator>	
					 					
					 			</select>
					 </div>
					 
					 <label>Area de Interes Alterna</label>
				    <div class="coberturaBC" >   
					    <select id="areaInteresAlterna" name="areaInteresAlterna">
					 				<option value="Selecciona" selected="selected">Selecciona</option>
					 				<s:iterator id="listadoTip" value="areaInteres" status="it">
	 									<option value="<s:property value='areaInteres[#it.index]'/>"><s:property value='areaInteres[#it.index]'/></option>
	 								</s:iterator>	
					 					
					 			</select>
					 </div>
					 <div id="consejoAreaInteresAlterna" class="toolTipIcon" style="margin-top:-35px;"></div><br/>
					

					
					<div id="btnSearch" class="btnAdmin">Buscar</div>
				</form>	
				
				
			</div>
			
			
		</div>
	</div>
</body>
</html>