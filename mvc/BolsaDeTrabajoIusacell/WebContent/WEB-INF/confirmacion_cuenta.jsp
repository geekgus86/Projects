<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Crear Cuenta-Agradecimiento</title>

<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />   
<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>
<script type="text/javascript" src="js/ConfirmacionScripts.js"></script>
</head>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<body>

<div id="content"  style="margin-top:-10px;"> 
	<div id="bienvenida_container" class="middle_left">
		<div id="data_container" style="overflow-y:hidden;">
		<div id="agra" class="agradecimiento">
		   <br/>
		   <div id="innertextagra">
		   <h1>Felicidades, <span><s:property value="nombre"/></span></h1>
			<p>Definitivamente la carta de presentaci&oacute;n de un profesional es su <strong>Curriculum Vitae</strong>. Hoy las nuevas tendencias nos llevan a tener un documento m&aacute;s ilustrativo y de alto impacto</p>
		    <p>Como uno de los privilegios de pertenecer a la Red profesional de Grupo Iusacell te brindamos la oportunidad de crear tu <strong style="color:red;">INFOGRAFIA CURRICULAR</strong>(CV).</p>
		     <p>Es f&aacute;cil y r&aacute;pido.</p>
		     <p>Una vez m&aacute;s <strong>Bienvenido</strong></p>
		   </div>
		</div>
		
		<a id="mostrarEjemplo" name="mostrarEjemplo" class="btnConfirmar">Ver Infografia de Ejemplo</a>
		<a id="crearInfo" name="crearInfo" class="btnConfirmar" href="/BolsaDeTrabajoIusacell/perfil">Crear Infografia Personal</a>
		
		
		</div>
		
		
		
	</div>
	<div class="middle_separator">
	<div class="middle_separator_top"></div>
	<div class="middle_separator_middle"></div>
	<div class="middle_separator_bottom"></div>
	</div>
	<<div class="middle_right">
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
       'Durango':'Durango', 
       'Guanajuato':'Guanajuato', 
       'Guerrero':'Guerrero', 
       'Hidalgo':'Hidalgo', 
       'Jalisco':'Jalisco', 
       'México D.F.':'México D.F', 
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
						<h1 style="margin-top:66px;">Destacados</h1>
						<ul id="contieneDestacados">
						  
						  	<s:iterator id="listadoOro" value="vacantesDestacadosOro" status="it">
						  	<li>
								<a style="background-position: 0 -3px; cursor:pointer;" id="<s:property value='vacantesDestacadosOro[#it.index]'/>" class="emergente"><s:property value='vacantesDestacadosOro2[#it.index]'/></a>
								<p><s:property value='vacantesDestacadosOro3[#it.index]'/></p>
							</li>
							</s:iterator>
						  
						  
						  	<s:iterator id="listadoPlata" value="vacantesDestacadasPlata" status="it">
						  	<li>
								<a style="background-position: 0 -47px; cursor:pointer;" id="<s:property value='vacantesDestacadasPlata[#it.index]'/>" class="emergente"><s:property value='vacantesDestacadasPlata2[#it.index]'/></a>
								<p><s:property value='vacantesDestacadasPlata3[#it.index]'/></p>
							</li>
							</s:iterator>
							
							<s:iterator id="listadoPlata" value="vacantesDestacadasRojo" status="it">
						  	<li>
								<a style="background-position: 0 -26px; cursor:pointer;" id="<s:property value='vacantesDestacadasRojo[#it.index]'/>" class="emergente"><s:property value='vacantesDestacadasRojo2[#it.index]'/></a>
								<p><s:property value='vacantesDestacadasRojo3[#it.index]'/></p>
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

<div class="modal_adv detalle_vac_tit" id="dialog_ejemplo" title="Infografia de Ejemplo" >
        
        <div id="exampleOver">
        
         	<div id="exampleDesc">
                  <div id="exampleZoom">
        
                    	  <div id="exampleZoomImage">
        
                     
        
        		 		 </div>
        
        		  </div>
        		  <div id="exampleText">
        			
        			<p id="descText">En esta sección podrás dar de alta y editar tu información personal .</p>
                   
        
        		  </div>
        	</div>
        	<div id="exampleInfo">
        
        		<div id="personalesEjemplo" class="example"></div>
        		<div id="ubicacionEjemplo" class="example"></div>
        		<div id="idiomasEjemplo" class="example"></div>
        		<div id="empleoEjemplo" class="example"></div>
        		<div id="talentosEjemplo" class="example"></div>
        		<div id="personalidadEjemplo" class="example"></div>
        		<div id="hobbiesEjemplo" class="example"></div>
        		<div id="softwareEjemplo" class="example"></div>
        		<div id="habilidadesEjemplo" class="example"></div>
        		<div id="preferenciasEjemplo" class="example"></div>
        		<div id="disposicionEjemplo" class="example"></div>
        		<div id="areaEjemplo" class="example"></div>
        
        
        
        
        	</div>
        
        </div>
        
</div>

 
</body>


<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>



</html>