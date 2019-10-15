<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>IUSACELL :: CAPITAL HUMANO</title>


<link rel="stylesheet" type="text/css" href="css/iusacell/mdc/arh/contenedor.css">
<link rel="stylesheet" type="text/css" href="css/iusacell/mdc/arh/head.css">
<link rel="stylesheet" type="text/css" href="css/iusacell/mdc/arh/cambioLookFeel.css">

<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/iusacel/mdc/arh/entrevistaSalida.js"></script>
<script type="text/javascript" src="js/iusacel/mdc/arh/jquery-1.7.1.js"></script>

<script type="text/javascript">
function getURLBolsa(){
	return '<%=request.getContextPath() %>';
}
</script>

</head>

<body onload="pantalla();">
	<div>
		<table class="barra" width="100%"   border="0" cellpadding="0" cellspacing="0" >
			<tr height="86px" valign=down width="100%"  >
			  	<td class="barraIzq" id="home" valign=top style="min-width: 234px; height: 86px"></td>
				<td class="barraCentral" colspan="1" style="min-width: 790px; "></td>
				<td class="barraDer"  align="right" id="home" valign=top style="width: 500px; height: 86px"></td>
			</tr>
		    <tr  height="28px" valign=down>
			  <td class="barraUbicacion" colspan="3">
			  		<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="height: 40px; ">
			  			<tr>
			  				<td class="barraUbicacionIzq" width="30px"></td>
			  				<td>&nbsp;&nbsp;</td>
							<td class="barraUbicacionDer" align="right"  style="height: 28px; width: 30px; "></td>
			  			</tr>
			  		</table>
			  </td>
			</tr>
			<tr height="774px" valign=down width="100%"  >
				<td colspan="3" class="promociones">
					<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="height: 40px; ">
			  			<tr>
			  				<td class="barraLateralIzq" width="30px"></td>
							<td class="content2" style="vertical-align: top; " align="center" >
								<div id="general" align="center" style='overflow:auto; ' >
									<div id="entrevistaCalidad" class="fontPsycowin13ptBoldRojo" style="text-align: center; display: none; color: #AF0A0A; " > Entrevista Calidad </div>
										
									<div id="datosEmpleado" class="texto_9pt_gris" style="display: none; background-image: ; text-align: left; width: 85%" >
										<div id="nempleado" ></div>
										<div id="num_emple" ></div>
										<div id="puesto" ></div>
										<div id="jefe_inmedito" ></div>										
									</div>
									
									<div id="mensajeEmpresa" class="texto_10pt_gris" style="display: none; width: 650px" >
										<p style="font-weight: bold;color: black;" align="justify">
											Para la empresa, es importante conocer tu opinión sobre la experiencia que viviste 
											durante tu permanencia en la misma,... para dar continuidad a tu proceso de buen 
											término laboral con la compañía es importante respondas el siguiente cuestionario.
										</p>
									</div>
									
									<!-- Formulario preguntas -->
									<s:form id="cuestionarioForm" theme="simple" action="<%= request.getContextPath() %>/accesoDenegado.jsp" method="POST" autocomplete="off">
										<div id="divEntrevistaCont" >
											<div id="divEntrevista" ></div>
										</div>
										
										<s:textfield id="folio" name="folio" cssStyle="display: none;visibility:hidden; width: 10px;"/>
										<s:textfield id="nomEmpleado" name="nomEmpleado" cssStyle="display: none;visibility:hidden; width: 10px;"/>
										<s:textfield id="numEmpleadoBaja" name="numEmpleadoBaja" cssStyle="display: none;visibility:hidden; width: 10px;"/>
										<s:textfield id="puestoEmpleado" name="puestoEmpleado" cssStyle="display: none;visibility:hidden; width: 10px;"/>
										<s:textfield id="nomJefeInmediato" name="nomJefeInmediato" cssStyle="display: none;visibility:hidden; width: 10px;"/>
										<s:textfield id="capitalHumano" name="capitalHumano" cssStyle="display: none;visibility:hidden; width: 10px;"/>
									</s:form>	
										
								</div>
							</td>
							<td class="barraLateralDer" align="right"  style="width: 30px; height: 774px"></td>
			  			</tr>
			  		</table>
				</td>
			</tr>
			
		</table>
		
	</div>
	<!-- <div id="barraLateralIzq">&nbsp;</div>
	<div id="contenidoPrincipal" style="margin-top:-10px;"> 
	</div>
	 
	<div id="barraLateralDer">&nbsp;</div> -->
	<div  id="cargaMod" style="display: none; position:absolute; border:0px solid #666666; background-color:#ffffff; z-index:200; filter:alpha(opacity=65);
								    opacity: .65; -moz-opacity: .65; width: 100%; height: 100%; top:0px;" >
		<iframe style="position:absolute; width: 100%; height: 100%; border:0px; overflow: hidden; display: block;" src="<%= request.getContextPath() %>/RH/clock.htm"></iframe>
	 </div>
	</body>
</html>
