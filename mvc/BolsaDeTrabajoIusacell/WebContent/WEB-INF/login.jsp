<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>LOGIN IUSACELL</title>


<link rel="stylesheet" type="text/css" href="css/global.css">

<script type="text/javascript" src="js/login_scripts.js"></script>

  <link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
  <script type="text/javascript">var _siteRoot='index.html',_root='index.html';</script>
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/scripts.js"></script>
  

<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>


<script type="text/javascript" src="js/jquery/jquery.watermarkinput.js"></script>





</head>



<body class="tundra">



<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


<div id="content"> 

	<div id="todo_izq">
	
		<div id="anuncios">
			<div id="header"><div class="wrap">
   <div id="slide-holder">
		<div id="slide-runner">
			
            <a href=""><img id="slide-img-1" src="" class="slide" alt="" /></a>
            <a href=""><img id="slide-img-2" src="" class="slide" alt="" /></a>
            <a href=""><img id="slide-img-3" src="" class="slide" alt="" /></a>
            <a href=""><img id="slide-img-4" src="" class="slide" alt="" /></a>
            <a href=""><img id="slide-img-5" src="" class="slide" alt="" /></a>
            <a href=""><img id="slide-img-6" src="" class="slide" alt="" /></a>
            
    	<div id="slide-controls">

     <p id="slide-nav"></p>
    </div>
</div>
	
	<!--content featured gallery here -->
   </div>
   <script type="text/javascript">
    if(!window.slider) var slider={};slider.data=[{"id":"slide-img-1","client":"nature beauty","desc":"nature beauty photography"},{"id":"slide-img-2","client":"nature beauty","desc":"add your description here"},{"id":"slide-img-3","client":"nature beauty","desc":"add your description here"},{"id":"slide-img-4","client":"nature beauty","desc":"add your description here"},{"id":"slide-img-5","client":"nature beauty","desc":"add your description here"},{"id":"slide-img-6","client":"nature beauty","desc":"add your description here"}];
   </script>
  </div></div>
		</div>
		<div id="blackbar_log"></div>
		<div id="anuncios_abajo">
		
			<div class="consejos2">
				<div class="" style="height: 36px;width: 250px;">
					<div style="margin-top: 3px; padding-top: 0px;">
						<p style="color:#FFF; font-size:12px; margin-left:5px;">Tips para una mejor</p>
						<h1 style="color:#FFF; font-size:16px; margin-left:5px;">ENTREVISTA</h1>
					</div>
				</div>
				<div class="controles2L" id="sigEnt"></div>
				<div class="controlesL" id="antEnt"></div>
				
				<div id="tipE" class="tips">
					
					
				</div>
				
				
				
			</div>
			
			<div class="consejos">
				<div id="log_video" style="margin-left:0px;"><iframe  width="250" height="220" src="http://www.youtube.com/embed/ZLuR7JjD-VA" frameborder="0" allowfullscreen></iframe></div>
			</div>
		
			
			<div id="log_video"><iframe id="primerVidIusa" width="250" height="220" src="" frameborder="0" allowfullscreen></iframe></div>
			
			
			
		</div>	
		
	</div>
	
	
	<div id="todo_dere">
	
		<div id="log"> 
		
		
			<s:set name="webFramework" value="existe"/> 
			<input type="hidden" value="<s:property value="existe"/>" id="sess2"/>
			<s:if test="%{#webFramework==1}">
			 	<input type="button" id="boton_entrar" class="btn_log3"  value="Entrar"/>
			</s:if>
			<s:else>
			
				<div class="candado"></div>
			
			<div class="pregunta">¿A&uacute;n no tienes tu cuenta?<a href="/BolsaDeTrabajoIusacell/CuentaRapida">¡Registrate aqu&iacute;!</a></div>
			
			
			<s:actionerror cssClass="error_log"/>
			
			
			<form theme="simple" id="form_log" action="doLogin" method="POST" accept-charset="utf-8" style="margin-top:17px;">
			
			
			
				<s:textfield 
					cssClass="caja_usu" 
					name="username" 
					id="username"
					dojoType="dijit.form.ValidationTextBox" 
                    data-dojo-props="required:true, missingMessage:'Es necesario que Introduscas tu ID Usuario'"
				/>
				
				<s:password 
						cssClass="caja_usu" 
						name="password"
						id="password"
						dojoType="dijit.form.ValidationTextBox" 
                    	data-dojo-props="required:true, missingMessage:'Es necesario que introduscas tu Password'"
						>
				</s:password><br/>
				
				<s:checkbox  cssClass="chek_caj" name="no_cerrar_sesion"  value="aBoolean" fieldValue="true"/>
				
				<label>No cerrar sesi&oacute;n</label>
				
				<s:submit cssClass="btn_log1" value="Entrar"></s:submit>
				
			</form>
			
			
			
			
			
			<div class="pregunta2">¿Olvidaste tu usuario o contrase&ntilde;a?<a style="cursor:pointer;" onClick="olvidaste_contra();">¡Recuperala aqu&iacute;!</a>
			
			
			
		</div>
			
			
			</s:else>
			
		
	</div>

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
				<div id="leyenda">Buscar</div>
				
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
	
	<div class="clear"></div>

</div>


<div class="modal_adv" id="dialog_contra" title="Olvidaste tu Contrase&ntilde;a?" >
        <p class="modal_advertencia" style="margin:10px 0 0 0; line-height:16px;">Introduce tu direcci&oacute;n de correo electr&oacute;nico</p>
        <input id="correo_pass" name="correo_pass" type="text"></input>
</div>

<div class="modal_adv" id="dialog_contra_confirmacion" title="Contrase&ntilde;a enviada" >
        <p class="modal_advertencia" style="margin:10px 0 0 0; line-height:16px;">Tu contraséña ha sido enviada a tu cuenta de correo</p>
        
</div>
<div class="modal_adv" id="dialog_contra_confirmacion_fail" title="Contrase&ntilde;a enviada" >
        <p class="modal_advertencia" style="margin:10px 0 0 0; line-height:16px;">La direcci&oacute;n de correo electr&oacute;nico no existe, verifique</p>
        
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



<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_error" title="Error" >
        <div id="error" class="detalle_vac"></div><br/>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_error2" title="Error" >
        <div id="error2" class="detalle_vac"></div><br/>
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_postulacion_exito" title="Exito" > 
      <div id="exito" class="detalle_vac"><s:actionmessage  cssClass="success_bus"/></div><br/>  
</div>





<div class="modal_adv" id="dialog_face" title="GRUPO IUSACELL" >
        <div class="fb-like" data-href="http://www.facebook.com/iusacellmx?sk=app_127890887255323#!/iusacellmx?sk=app_127890887255323" data-send="true" data-width="450" data-show-faces="true"></div>
</div>

 


</body>
</html>


