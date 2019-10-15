<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Crear Cuenta</title>


<link rel="stylesheet" type="text/css" href="css/iusa.css">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/alertfy_core.css">
<link rel="stylesheet" type="text/css" href="css/alertfy_default.css">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/cuentaRapida.js"></script>
<script type="text/javascript" src="js/alterfy.js"></script>
<script type="text/javascript">
$(document).ready(function() {
 $( "#dialog_terminos_condiciones" ).dialog( "open");
});
</script>
<style type="text/css">
.ui-icon-closethick {
  visibility: hidden;
}
.ui-dialog-titlebar-close{
 visibility: hidden;
} 
</style>
</head>

<body class="tundra">

<div id="contenedor_principal" style="margin-top:-10px;"> 

	<div class="middle_left">
		<div id="header_bienvenido" class="header_datos">
		    <h1>Crear Cuenta - Registro Express</h1>
			Al crear tu cuenta est&aacute;s siendo parte de la Red Profesional de Grupo Iusacell, con lo cual obtendr&aacute;s grandes beneficios. Completa tu registro y desc&uacute;brelos.
		</div>
		<s:form id="cuenta_rapida" theme="simple" action="crearCuenta" method="POST" autocomplete="off">
		<div id="data_container">
		
		<h1>Datos Personales</h1>
		
		<div class="label_crear"><label>Apellido Paterno</label></div>
				<s:textfield
					id="apellidoP" 
					name="apellidoP" 
					cssClass="caja_datos textos"
					maxlength="40"
					dojoType="dijit.form.ValidationTextBox" 
                    data-dojo-props="required:true, missingMessage:'Es necesario que agregues tu apellido paterno'"
				/><br><br>
		<div class="label_crear"><label>Apellido Materno</label></div>
				<s:textfield
					id="apellidoM"  
					name="apellidoM" 
					maxlength="40"
					cssClass="caja_datos textos"
					dojoType="dijit.form.ValidationTextBox" 
                    data-dojo-props="required:true, missingMessage:'Es Necesario que Agregues tu apellido Materno'"
				/><br><br>
		<div class="label_crear"><label>Nombre(s)</label></div>
				<s:textfield
					id="nom"  
					name="nom" 
					maxlength="40"
					cssClass="caja_datos textos"
					dojoType="dijit.form.ValidationTextBox" 
                    data-dojo-props="required:true, missingMessage:'Es Necesario que Agregues tu Nombre'"
				/><br><br>
		<div class="label_crear"><label>Correo Electr&oacute;nico</label></div>
				<s:textfield
					id="imail" 
					name="imail" 
					value=""
					maxlength="50"
					cssClass="caja_datos"
                    data-dojo-type="dijit.form.ValidationTextBox"
    				data-dojo-props="validator:dojox.validate.isEmailAddress,
        							invalidMessage:'Este no es un Correo Electronico Valido'"
				/><br><br>
				
		
	
				
		 <div class="label_crear"><label>Fecha de Nacimiento</label></div><div class="fec_container">  
		   <div class="cobertura1 combofechas1"><s:select id="diaNacimiento" name="diaNacimiento" list="dias"/> </div>
		   <div class="cobertura1 combofechas1"><s:select id="mesNacimiento" name="mesNacimiento" list="#{'01':'Enero','02':'Febrero','03':'Marzo','04':'Abril','05':'Mayo','06':'Junio','07':'Julio','08':'Agosto','09':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
		   <div class="cobertura1 combofechas1"><s:select id="anioNacimiento" name="anioNacimiento" list="anio"/></div>
		      
           
          
          </div><br/><br/>	
		
		<div class="comboseparator">
		
		<div class="label_crear"><label>&Aacute;rea de Inter&eacute;s principal</label></div>
		       <div class="cobertura1 combo_style"><s:select
					id="areaInteres" 
					name="areaInteres"  
					list="#{'Todas':'Todas','Administrativos':'Administrativos','Biologia':'Biologia','Comunicaciones':'Comunicaciones','Construccion':'Construccion','Contabilidad':'Contabilidad',
					'Creatividad, Productividad y Diseño Comercial':'Creatividad, Productividad y Diseño Comercial','Derecho y Leyes':'Derecho y Leyes','Educacion':'Educacion',
					'Ingenieria':'Ingenieria','Logistica, Transportacion y Distribucion':'Logistica, Transportacion y Distribucion','Manufactura, Produccion y Operacion':'Manufactura, Produccion y Operacion',
					'Mercadotecnia, Publicidad y Relaciones Publicas':'Mercadotecnia, Publicidad y Relaciones Publicas','Recursos Humanos':'Recursos Humanos','Salud y Belleza':'Salud y Belleza',
					'Sector Salud':'Sector Salud','Seguro y Reaseguro':'Seguro y Reaseguro','Tecnologias de la Informacion/Sistemas':'Tecnologias de la Informacion/Sistemas',
					'Turismo, Hospitalidad y Gastronomia':'Turismo, Hospitalidad y Gastronomia','Ventas':'Ventas','Veterinaria / Zoologia'}"
				/></div>
		
		</div>		
		<br/><br/>	
		<div class="comboseparator">
		
		<div class="label_crear"><label>&Aacute;rea de Inter&eacute;s alternativa</label></div>
		       <div class="cobertura1 combo_style"><s:select
					id="areaInteres2" 
					name="areaInteres2"  
					list="#{'Todas':'Todas','Administrativos':'Administrativos','Biologia':'Biologia','Comunicaciones':'Comunicaciones','Construccion':'Construccion','Contabilidad':'Contabilidad',
					'Creatividad, Productividad y Diseño Comercial':'Creatividad, Productividad y Diseño Comercial','Derecho y Leyes':'Derecho y Leyes','Educacion':'Educacion',
					'Ingenieria':'Ingenieria','Logistica, Transportacion y Distribucion':'Logistica, Transportacion y Distribucion','Manufactura, Produccion y Operacion':'Manufactura, Produccion y Operacion',
					'Mercadotecnia, Publicidad y Relaciones Publicas':'Mercadotecnia, Publicidad y Relaciones Publicas','Recursos Humanos':'Recursos Humanos','Salud y Belleza':'Salud y Belleza',
					'Sector Salud':'Sector Salud','Seguro y Reaseguro':'Seguro y Reaseguro','Tecnologias de la Informacion/Sistemas':'Tecnologias de la Informacion/Sistemas',
					'Turismo, Hospitalidad y Gastronomia &eacute;':'Turismo, Hospitalidad y Gastronomia','Ventas':'Ventas','Veterinaria / Zoologia'}"
				/></div>
		
		</div>
		
				<br><br>
		<div class="label_crear"><label>Tel&eacute;fono</label></div>
				<s:textfield
					id="telefono" 
					name="telefono" 
					maxlength="14"
					cssClass="caja_datos textos"
					dojoType="dijit.form.ValidationTextBox" 
                    data-dojo-props="required:true, missingMessage:'Es necesario que indiques un numero telefonico'"
				/><br><br>
				
<!-- 		<div class="label_crear"><label>Tel&eacute;fono 2</label></div> -->
<%-- 				<s:textfield --%>
<%-- 					id="telefono_extra"  --%>
<%-- 					name="telefono_extra"  --%>
<%-- 					maxlength="14" --%>
<%-- 					cssClass="caja_datos textos" --%>
<%-- 					dojoType="dijit.form.ValidationTextBox"  --%>
<%--                     data-dojo-props="required:true, missingMessage:'Es necesario que indiques un numero telefonico'" --%>
<%-- 				/><br><br> --%>
		
		<div class="label_crear"><label>M&aacute;ximo Nivel de Estudios</label></div>
		       <div class="cobertura1 combo_style"><s:select
					id="nivelDeEstudios" 
					name="nivelDeEstudios"
					list="#{'1':'Secundaria','2':'Bachillerato','3':'Tecnico','4':'Estudios Superiores','5':'Diplomado','6':'Maestria','7':'Doctorado'}"
				/></div>
				<br><br>
				
		<div class="comboseparator2">
		
		<div class="label_crear"><label>&Aacute;rea de Experiencia</label></div>
		      <div class="cobertura1 combo_style">
		      <s:select
					id="areaFormacion" 
					name="areaFormacion"
					list="#{'Todas':'Todas','Administrativos':'Administrativos','Biologia':'Biologia','Comunicaciones':'Comunicaciones','Construccion':'Construccion','Contabilidad':'Contabilidad',
					'Creatividad, Productividad y Diseño Comercial':'Creatividad, Productividad y Diseño Comercial','Derecho y Leyes':'Derecho y Leyes','Educacion':'Educacion',
					'Ingenieria':'Ingenieria','Logistica, Transportacion y Distribucion':'Logistica, Transportacion y Distribucion','Manufactura, Produccion y Operacion':'Manufactura, Produccion y Operacion',
					'Mercadotecnia, Publicidad y Relaciones Publicas':'Mercadotecnia, Publicidad y Relaciones Publicas','Recursos Humanos':'Recursos Humanos','Salud y Belleza':'Salud y Belleza',
					'Sector Salud':'Sector Salud','Seguro y Reaseguro':'Seguro y Reaseguro','Tecnologias de la Informacion/Sistemas':'Tecnologias de la Informacion/Sistemas',
					'Turismo, Hospitalidad y Gastronomia':'Turismo, Hospitalidad y Gastronomia','Ventas':'Ventas','Veterinaria / Zoologia'}"
				/></div>
		
		
		</div>
		
		
		
				<br>
				
				
				
																				
		
		<div class="label_crear"><label>Contrase&ntilde;a</label></div>
				<s:password
					id="contra" 
					name="contra"
					maxlength="50"
					cssClass="caja_datos"
				/><br><br>
		<div class="label_crear"><label>Repetir Contrase&ntilde;a</label></div>
				<s:password
					id="contra_again" 
					name="contra_again" 
					cssClass="caja_datos"
				/><br><br>
		</div>		 
		<br/>
		<!--<s:submit id="guardar" name="guardar" cssClass="btnDelante" value="Guardar"></s:submit>-->
		<div id="guardar" name="guardar" class="btnDelante">Guardar</div>
		
		</s:form>
		
		<div class="dato_informativo">Todos los campos son indispensables</div>
		
	</div> 
	<div class="middle_separator">
	<div class="middle_separator_top"></div>
	<div class="middle_separator_middle"></div>
	<div class="middle_separator_bottom"></div>
	</div>
	<div class="middle_right">
		<div id="busqueda">
			<h1>Comienza aqu&iacute; tu b&uacute;squeda</h1>
			<div style="border-bottom: 1px solid #464646;height: 201px;margin-left: 10px;width: 201px;">
			<form theme="simple" id="form_log" action="doSerch" method="POST" accept-charset="utf-8">
			
				<s:textfield cssClass="caja_bus" name="palabra_bus" id="palabra_bus_cla" />
				
				
				
				<div class="cobertura">
     <s:select  list="#{'0':'Desde', '1':'Ayer', '2':'Hace 2 dias', '3':'Hace 3 dias', '4':'Hace 4 dias', '5':'Hace 5 dias', '6':'Hace 6 dias', '7':'Hace 7 dias', '14':'Hace 14 dias', '30':'Hace 30 dias', '60':'Hace 60 dias'}" name="fecha_bus" id="fecha_bus_id" /><br/>
    </div>
   
    
    <div class="cobertura">
    <s:select  list="#{'Categoria':'Categoria', 'Administrativos':'Administrativos','Comunicaciones':'Comunicaciones','Contabilidad':'Contabilidad','Derecho':'Derecho','Educacion':'Educacion',
     'Ingenieria':'Ingenieria','Logistica y Distribucion':'Logistica y Distribucion','Manufactura':'Manufactura','Mercadotecnia':'Mercadotecnia','Recursos Humanos':'Recursos Humanos'
     ,'Tecnologias de la Informacion':'Tecnologias de la Informacion','Salud':'Salud','Ventas':'Ventas','Finanzas':'Finanzas'}" name="cate_bus" id="cate_bus" /><br/>
    </div>
   
    
    <div class="cobertura">
    <s:select 
     
     list="#{'Ciudad/Estado':'Ciudad/Estado', 
       'Aguascalientes':'Aguascalientes', 
       'Baja California':'Baja California', 
       'Baja California Sur':'Baja California Sur', 
       'Campeche':'Campeche', 
       'Chiapas':'Chiapas', 
       'Chihuahua':'Chihuahua', 
       'Coahuila de Zaragoza':'Coahuila de Zaragoza', 
       'Colima':'Colima',
       'Distrito Federal':'Distrito Federal', 
       'Durango':'Durango', 
       'Guanajuato':'Guanajuato', 
       'Guerrero':'Guerrero', 
       'Hidalgo':'Hidalgo', 
       'Jalisco':'Jalisco', 
       'México':'México', 
       'Michoacán de Ocampo':'Michoacán de Ocampo', 
       'Morelos':'Morelos', 
       'Nayarit':'Nayarit', 
       'Monterrey':'Monterrey',
       'Nuevo Leon':'Nuevo Leon', 
       'Oaxaca':'Oaxaca', 
       'Puebla':'Puebla', 
       'Queretaro':'Queretaro', 
       'Quintana Roo':'Quintana Roo', 
       'San Luis Potosi':'San Luis Potosi', 
       'Sinaloa':'Sinaloa', 
       'Sonora':'Sonora', 
       'Tabasco':'Tabasco', 
       'Tamaulipas':'Tamaulipas', 
       'Tlaxcala':'Tlaxcala', 
       'Veracruz':'Veracruz', 
       'Yucatan':'Yucatan', 
       'Zacatecas':'Zacatecas'}"
     name="ciudad_bus" 
     id="ciudad_bus"/>
     </div>
				
				
				
				
				
				
				<s:submit cssClass="btn_log1" value="" onmouseover="" onmouseout="" value="Buscar"></s:submit>
				
			</form>
		
			</div>
			
			
			
			<div class="destacados">
				<div class="destacados_log" id="destacadoslog" style="margin-top:-51px;">
						<h1>Destacados</h1>
						<ul id="contieneDestacados">
						  
						  	<s:iterator id="listadoOro" value="vacantesDestacadosOro" status="it">
						  	<li>
								<a style="background-position: 0 -26px; cursor:pointer;" id="<s:property value='vacantesDestacadosOro[#it.index]'/>" class="emergente"><s:property value='vacantesDestacadosOro2[#it.index]'/></a>
								<p><s:property value='vacantesDestacadosOro3[#it.index]'/></p>
							</li>
							</s:iterator>
						  
						</ul>
					</div>
			</div>
			
			
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
         <label id="labelNiv">Nivel de Esdudios:</label><div id="esco" class="detalle_dentro"></div>
         <label id="labelCon">Conocimientos Necesarios:</label><div id="conocimient" class="detalle_dentro"></div>
         <label id="labelTal">Talentos Solicitados:</label><div id="talent" class="detalle_dentro"></div>
         <label id="labelPrin">Principales Funciones a Desempe&ntilde;ar:</label><div id="prin_fun" class="detalle_dentro"></div>
         <label id="labelObs">Observaciones:</label><div id="observaciones" class="detalle_dentro"></div>
        </div>
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_terminos_condiciones" title="Terminos y condiciones" >
        <div id="terminos_text" style="text-align:justify;">
        
        <img src="images/iusa_logo.png" width="158" height="60" style="display:block;margin:0 auto 0 auto;">
        
        <h1 style="text-align:center;">AVISO DE PRIVACIDAD</h1>
    	<br/>
    	<p>Grupo Iusacell, S.A. de C.V., en lo sucesivo "la empresa", con domicilio en Montes Urales 460, Col. Lomas de Chapultepec, Delegación Miguel Hidalgo, C.P. 11000, en M&eacute;xico, Distrito Federal, es responsable de recabar sus datos personales, del uso que se le d&eacute; a los mismos y de la protecci&oacute;n de dichos datos, le invitamos a que lea este documento toda vez que la simple aportación que haga de sus datos personales constituye la aceptación de estos t&eacute;rminos y condiciones.</p>
		<br/>
		<p>Los datos personales que sean aportados por las personas f&iacute;sicas a quienes correspondan dichos datos, ser&aacute;n utilizados con la &uacute;nica finalidad de conformar una base de datos de candidatos que permita realizar de manera eficiente el proceso de reclutamiento y selección de personal y, en su caso, otorgarles oportunidades de crecimiento laboral y personal dentro de "la empresa" para s&iacute; o para cualquiera de las sociedades que sean sus controladoras, subsidiarias o filiales.</p> 
		<br/>
		<p>Los datos personales que sean aportados por Usted, tendr&aacute;n dicho car&oacute;cter siempre y cuando se encuentren en los supuestos establecidos en el artículo 3&#176; de la Ley Federal de Protecci&oacute;n de Datos Personales en Posesi&oacute;n de Particulares, en lo sucesivo "la Ley"; manifest&aacute;ndole que "la empresa" no solicita datos personales sensibles.</p>
		<br/>
		<p>Asimismo, se hace de su conocimiento que los datos que sean proporcionados por Usted como titular, tendr&aacute;n como finalidad de uso, de manera enunciativa mas no limitativa, los siguientes: i) identificarle, ii) ubicarle, iii) comunicarle, contactarle y iv) enviarle informaci&oacute;n relacionada con el proceso de reclutamiento y selecci&oacute;n de personal. El uso de los datos personales tendr&aacute; relaci&oacute;n directa &uacute;nicamente con el car&aacute;cter que Usted tiene de candidato. La temporalidad del manejo de los datos personales ser&aacute; indefinida a partir de la fecha en que Usted los proporcion&oacute; a la responsable, sin perjuicio de que Usted puede oponerse en cualquier momento que lo considere oportuno.</p>
		<br/>
		<p>Usted tiene derecho de acceder, rectificar y cancelar sus datos personales, as&iacute; como de oponerse al tratamiento de los mismos o revocar el consentimiento que para tal fin haya otorgado a trav&eacute;s de los procedimientos que se han implementado para tal efecto. Para conocer dichos procedimientos, los requisitos y plazos se puede poner en contacto con nuestro Departamento de Protección de Datos Personales, ubicado en Privada de Relox No. 16, Col. Chimalistac, Delegaci&oacute;n Alvaro Obreg&oacute;n, C.P. 01070, M&eacute;xico, Distrito Federal o al correo electr&oacute;nico: protecciondedatos@iusacell.com.mx.</p>
		<br/>
		<p>Es responsabilidad de Usted como titular de los datos personales, el garantizar que los datos facilitados a "la empresa" sean veraces y completos y es responsable de comunicar a "la empresa" cualquier modificaci&oacute;n en los mismos a efecto de que se pueda cumplir con la obligaci&oacute;n de mantener la informaci&oacute;n actualizada.</p>
		<br/>
		<p>Los datos personales ser&aacute;n tratados de conformidad a lo dispuesto en "la Ley" y su Reglamento. La confidencialidad de los datos est&aacute; garantizada y los mismos est&aacute;n protegidos por medidas de seguridad de la informaci&oacute;n, administrativas, t&eacute;cnicas y f&iacute;sicas, para evitar su daño, p&eacute;rdida, alteraci&oacute;n, destrucci&oacute;n, uso, acceso o divulgaci&oacute;n indebida. Unicamente las personas autorizadas tendr&aacute;n acceso a sus datos personales.</p>
		<br/>
		<p>Asimismo, le informamos que sus datos personales pueden ser transferidos y tratados dentro y fuera del pa&iacute;s por personas distintas a "la empresa". En ese sentido, su informaci&oacute;n puede ser compartida con empresas filiales, subsidiarias, afiliadas, controladoras y ajenas &uacute;nicamente con la finalidad de conformar una base de datos de candidatos que permita realizar de manera eficiente el proceso de reclutamiento y selección de personal.</p>
		<br/>
		<p>El tratamiento de los datos personales que Usted facilite a "la empresa" responsable bajo cualquier forma o circunstancia, podr&aacute; ser efectuado por la misma de conformidad con los presentes t&eacute;rminos y condiciones, por lo que desde este momento se entiende que Usted autoriza expresamente al responsable para tal efecto, hasta en tanto Usted manifieste su oposici&oacute;n mediante alguno de los medios que indica "la Ley".</p>
		<br/>
		<p>Si Usted no manifiesta su oposici&oacute;n para que sus datos personales sean transferidos o tratados se entender&aacute; que ha otorgado su consentimiento para ello.</p>
		<br/>
		<p>Fecha &uacute;ltima actualización 18 de julio de 2013..</p>
        
        </div>
       
        
</div>
 
</body>


</html>