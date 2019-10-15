<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/detalle_psotulante_scripts.js"></script>
<script type="text/javascript" src="js/jquerySvg/jquery.svg.js"></script>
<title>Grupo Iusacell</title>
</head>
<body>

<div id="content"> 
		<div id="content-adm">
			<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a><a href="/admins/UsuariosAdmin">Administaci&oacute;n de Usuarios - </a></span>
			<h1>Detalle Candidatos</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione el nombre del Candidato para ver sus Detalles</div><br/>
			
			<div class="listaCandidatos">
				<ul>
					<s:iterator id="listadoTip" value="idPsotulantes" status="it">
						<li class="jup" id="<s:property value='idPsotulantes[#it.index]'/>">
							<span id="<s:property value='idPsotulantes[#it.index]'/>"><s:property value='nombresPostulantes[#it.index]'/></span><br/>
						</li>
					</s:iterator>
				</ul>
			
			</div>
			
			<div class="listaCandidatos_detalle" id="detalle">
				<div class="listaCandidatos_detalle_up"><div class="headerDatillos">Datos del Postulante</div><div class="cerrar" id="close"></div></div>
				<div class="listaCandidatos_detalle_middle">
					
					<div class="datillos_del_candidato">
					
						<label>Nombre:</label><div id="nom_completo" class="detalle_dentro_datos"></div><br/>
						<label>Area de interes</label><div id="areaInteres" class="detalle_dentro_datos"></div><br/>
						<label>Nivel Academico</label><div id="niveAcademico" class="detalle_dentro_datos"></div><br/>
						
						
					</div>
					
					<div class="datillos_postu_talento" id="jurpp">
						
					</div>
					
					
					<div class="datillos_postu_hobits" id="jurpp2">
						
					</div>
					
				
				</div>
				<div class="listaCandidatos_detalle_bottom">
					
					<div id="infografiaVer" class="btn_log1">Ver infografia</div>
					<input type="hidden" id="palaInfo"> 
					<input type="hidden" id="palaInfoID"> 
				</div>
			</div>
			
			<div class="candidatoInfografia" id="infografia2">
				<div class="listaCandidatos_detalle_up"><div class="cerrar2" id="close2"></div></div>
				
				<div class="listaCandidatos_detalle_bottom">
					<input id="last" type="hidden" value="primero"/>
					<input id="lastskull" type="hidden" value="primero"/>
					<input id="exp" type="hidden" value="0"/>
					<input id="edu" type="hidden" value="0"/>
					
					<div id="infografia"></div>
					
				</div>
			</div>
			
			
		</div>
</div>


</body>
</html>