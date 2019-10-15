<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Busqueda de Vacantes</title>

<link rel="stylesheet" type="text/css" href="css/global.css">


<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script> 


<script type="text/javascript" src="js/jquery/jquery.mousewheel.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.scrollbar.min.js"></script>


<script type="text/javascript" src="js/busqueda_scripts.js"></script>
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/jquery.tinyscrollbar.min.js"></script>
</head>
<body class="tundra" onload="pinta()">

	 <s:set name="webFramework" value="existe"/>
	 
	<div id="content" style="margin-top:-10px;"> 
	
	<br/>
	<div id="cuenta_izq_home_usu">
		
		<h1>Tu busqueda encontro los siguientes resultados: </h1>
		
		
		
			<input type="hidden" value="<s:property value="existe"/>" id="sess"/>
			
			
			
			<s:actionmessage  cssClass="success_bus"/>
			
			
			<s:actionerror  cssClass="error_bus"/>
		
		
		
			
			<div class="contenedor2">
		  		
		  	 	<div class="contenedor_encabezado2">
		  	 		
		  	 	</div>
		  	 	
		  	 	<div id="simbologiaB">
		  	 		<div class="pos"></div> <div style="float:left;  margin-right: 20px; font-size:10px;">  Postularme  </div>
		  	 		
		  	 	</div>
		  	 	
		  	 	
		  	 	<div id="contieneAcordion" style="height: 555px;">
		  	 		<div id="accordion" >
		  	 			<s:iterator id="listado" value="vacantes1" status="it">
		  	 			
 						  <h3 class="retrae" id="<s:property value='vacantes1[#it.index]'/>"> <span class="fIqd" id="Fle<s:property value='vacantes1[#it.index]'/>"></span> <a><s:property value='vacantes2[#it.index]'/></a></h3>
 						  
						  <div class="divDesple"> 
						  		<span id="<s:property value='vacantes1[#it.index]'/>" class="posquick"></span>
						  		<ul class="elementos1">
						  			<li><span>Ubicaci&oacute;n:&nbsp;&nbsp;</span><s:property value='vacantes3[#it.index]'/></li>
						  			<li><span>&Aacute;rea de Experiencia:&nbsp;&nbsp;</span><s:property value='vacantes4[#it.index]'/></li>
						  			<li><span>Fecha Publicaci&oacute;n:&nbsp;&nbsp;</span><s:property value='vacantes5[#it.index]'/></li>
						  		</ul>
						  		
						  		<ul class="elementos2">
						  			<li><span>Horario:</span><s:property value='listaHorarioVac[#it.index]'/></li>
						  			<li><span>Sueldo:&nbsp;&nbsp;$&nbsp;&nbsp;</span><s:property value='listaSueldo[#it.index]'/></li>
						  			<li><span>A&ntilde;os Experiencia:&nbsp;&nbsp;</span><s:property value='listaAnios[#it.index]'/></li>
						  		</ul> 
						  		 <a style ="margin-left:475px; cursor:pointer; color: #CC0000;" class='emergente' id="<s:property value='vacantes1[#it.index]'/>">Ver Detalles</a>
						  </div>

						 
						</s:iterator>
					</div>
		  	 	</div>
		  	 	
		  	 
		  	 	
		  	 	
		  	 	
		  	 	
		  	 	
		  	 	
		 
			
		</div>
	</div>
	
	<div id="cuenta_der">
		<div id="busqueda">
		
			<h1>Comienza aqu&iacute; tu b&uacute;squeda</h1>
			<div style="border-bottom: 1px solid #464646;height: 201px;margin-left: 10px;width: 201px;">
			<form  id="form_log" action="doSerch" method="POST" accept-charset="utf-8">
			
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
				<div class="destacados_log" id="destacadoslog">
						<h1 style="margin-top: 63px;">Destacados</h1>
				
				</div>
				
				
			</div>
			
			    <div id="tabbed_box_1" class="tabbed_box">  
			       
			        <div class="tabbed_area">  
			            <ul class="tabs">
			            	<s:if test="%{#webFramework==1}">  
			                	<li><a id="regionalesT"  title="regionales" class="tab active">Regionales</a></li>
			                </s:if>
			             		<li><a id="nacionalesT"  title="nacionales" class="tab ">Nacionales</a></li>
			            </ul>  
			            
			            <s:if test="%{#webFramework==1}">
			            <div id="regionales" class="contentT">
			            	<ul  id="contieneDestacadosUbi">
				            	<s:iterator id="listadoOro" value="VDG" status="it">
							  	<li>
									<a style="background-position: 0 -3px; cursor:pointer;" id="<s:property value='VDG[#it.index]'/>" class="emergente"><s:property value='VDG2[#it.index]'/></a>
									<p><s:property value='VDG3[#it.index]'/></p>
								</li>
								</s:iterator>
							</ul>
			            </div> 
			            </s:if>
			             
			            <div id="nacionales" class="contentT" style="">
			            	<ul id="contieneDestacados">
				            	<s:iterator id="listadoNacional" value="VDR" status="it">
							  	<li>
									<a style="background-position: 0 -25px; cursor:pointer;" id="<s:property value='VDR[#it.index]'/>" class="emergente"><s:property value='VDR2[#it.index]'/></a>
									<p><s:property value='VDR3[#it.index]'/></p>
								</li>
								</s:iterator>
							</ul>
			            </div>
			        </div>  
			    </div>
			
			
		</div>
		
				
	</div>
	

	
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" >
        <div class="otroproceso">
         <label id="labelFol">Folio:</label><div id="num_vac" class="detalle_dentro"></div>
         <label id="labelNom">Nombre Vacante:</label><div id="nom_vac" class="detalle_dentro"></div>
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


<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_error" title="Error" >
        <div id="error" class="detalle_vac"></div><br/>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_error2" title="Error" >
        <div id="error2" class="detalle_vac"></div><br/>
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_exito" title="Exito" > 
      <div id="exito" class="detalle_vac"><s:actionmessage  cssClass="success_bus"/></div><br/>  
</div>


</body>
</html>