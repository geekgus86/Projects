<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Crear Cuenta</title>

<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">


<script type="text/javascript" src="js/homeusu_scripts.js"></script>

  
  

<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>




</head>
<body class="tundra">
<div id="content"> 
	<div id="middletop" class=middletop>
	   <div id="middletop_right" class="middle_right middletop"></div>
	</div>
	
	<div id="blackbar">
	  <h1>Ofertas Laborales</h1>
	  <div id="btn_perfil" class="btn_perfil"><a href="#"><img class="pefi" border="0" src="images/edit_perfil.png">Perfil >></a></div>
	  <div id="btn_candidaturas" class="btn_candidaturas"><a href="/BolsaDeTrabajoIusacell/Candidaturas"><img class="candi" border="0" src="images/mis_candidaturas.png">Mis Candidaturas >></a></div>
	</div>
	<br/>
	<div id="cuenta_izq_home_usu">
	
	 
	 
		
		<div id="encabezado" class="encabezado_datos_P">
			<div class="avatar">
			<img src="<s:property value="urlFoto"/>"  width="123px" height="125px"/>
			</div>
			<div class="datos">
			   <h1>Datos Personales</h1>
				<s:hidden id="id_usuario" value="%{usuario}"></s:hidden>
			   <div class="datos1">
			    <div><label>e-mail:</label><span><s:property value="usuario"/></span></div>
				<div><div class="labelnom"><label>Nombre:</label></div><div class="nompila"><span id="nombre_span"><s:property value="nombre"/>&nbsp;<s:property value="apellidoPaterno"/>&nbsp;<s:property value="apellidoMaterno"/></span></div></div><br/>
				<div><label>RFC:</label><span id="rfc_span"><s:property value="rfc"/></span></div>
				<div><label>Fecha de Nacimiento:</label><span id="nac_span"><s:property value="fechaNacimiento"/></span></div>
				<div><label>Sexo:</label><span id="sex_span"><s:property value="sexo"/></span></div>
				<div><label>CURP:</label><span id="curp_span"><s:property value="curp"/></span></div>
			   </div>
			   <div class="datos1">
			   <div><div class="labelnom"><label>Calle y Numero</label></div><div class="dirpila"><span id="calle_span"><s:property value="calleNumero"/></span></div></div><br/>
				<div><label>Colonia:</label><span id="col_span"><s:property value="colonia"/></span></div>
				<div><label>Ciudad/Poblado:</label><span id="ciudad_span"><s:property value="ciudadPoblado"/></span></div>
				<div><label>Municipio/Delegacion:</label><span id="municipio_span"><s:property value="municipioDelegacion"/></span></div>
				<div><label>Codigo Postal:</label><span id="cp_span"><s:property value="cp"/></span></div>
				<div><label>Telefono Casa</label></div>
				<div><label>Telefono Celular</label></div>
			   </div>
				
			</div><br/>
			<div class="lins_encabezado">
				<a href="/BolsaDeTrabajoIusacell/DatosPersonales">Editar</a>
			</div>
		</div>
	
	<div class="scroll_contiene_todo" style="overflow-y: scroll;height: 425px; margin-top:10px;">
		
		<div id="cuerpo" class="cuerpo_datos_P">
		  <div class="contenedor">
		  		
		  	 	<div class="contenedor_encabezado">
		  	 		<h1 onClick="window.location.href='/BolsaDeTrabajoIusacell/FormacionAcademica'">Escolaridad  </h1>
		  	 	</div>
		  	 	
		  	 		
					 <div id="accordion" class="contenedor_cuerpo">
						<s:iterator value="listaNivel" status="edu">
						<h3><a href="#"><s:property value="listaNivel[#edu.index]"/></a></h3>
						<div class="detalle">
							    <div class="lins_encabezado link_formacion">
				                   <a class="linkEsc" href="#" value="<s:property value="listaIdFormacion[#edu.index]"/>">Editar</a>
			                    </div>
								<span>Nivel Escolar:</span><label><s:property value="listaNivel[#edu.index]"/></label><br/>
								<span>Instituto:</span><s:property value="listaInstituto[#edu.index]"/><br/>
								<span>País:</span><label><s:property value="listaPais[#edu.index]"/></label><br/>
								<span>Estado:</span><label><s:property value="listaEstado[#edu.index]"/></label><br/>
								<span>Fecha Inicio:</span><label><s:property value="listaInicio[#edu.index]"/></label><br/>
								<span>Fecha Termino:</span><label><s:property value="listaFin[#edu.index]"/></label><br/>
								<span>Status:</span><label><s:property value="listaStatus[#edu.index]"/></label><br/>
							    
							
						</div>
					  </s:iterator>
			
					</div>
		  	 	
		  	 	
		  </div>
		  
		</div>
	
		<div id="cuerpo" class="cuerpo_datos_P">
		  <div class="contenedor">
		  		
		  	 	<div class="contenedor_encabezado">
		  	 		<h1>Idiomas</h1>
		  	 	</div>
		  	 	
		  	 		
					 <div id="accordion2" class="contenedor_cuerpo">
						<s:iterator value="listaIdioma" status="idiom">
						<h3><a href="#"><s:property value="listaIdioma[#idiom.index]"/></a></h3>
						<div class="detalle">
							    <div class="lins_encabezado link_formacion">
				                   <a class="linkIdiom" href="#" value="<s:property value="listaIdIdioma[#idiom.index]"/>">Editar</a>
			                    </div>
								<span>Nivel Escrito:</span><label><s:property  value="listaEscrito[#idiom.index]"/>%</label><br/>
								<span>Nivel Hablado:</span><label><s:property value="listaHablado[#idiom.index]"/>%</label><br/>
								<span>Nivel Escuchado:</span><label><s:property  value="listaEscuchado[#idiom.index]"/>%</label><br/>
								
								
							
						</div>
					    </s:iterator>	
					</div>
		  	 	
		  	 	
		  </div>
		  
		</div>
		
		<div id="cuerpo" class="cuerpo_datos_P">
		  <div class="contenedor">
		  		
		  	 	<div class="contenedor_encabezado">
		  	 		<h1>Experiencia</h1>
		  	 	</div>
		  	 	
		  	 		
					 <div id="accordion4" class="contenedor_cuerpo">
						<s:iterator value="listaEmpresa" status="ex">
						<h3><a href="#"><s:property value="listaEmpresa[#ex.index]"/></a></h3>
						<div class="detalle">
							     <div class="lins_encabezado link_formacion">
				                   <a class="linkExp" href="#" value="<s:property value="listaIdExperiencia[#ex.index]"/>">Editar</a>
			                    </div>
			                    
								<span>Empresa:</span><label><s:property value="listaEmpresa[#ex.index]"/></label><br/>
								<span>Puesto:</span><label><s:property value="listaPuesto[#ex.index]"/></label><br/>
								<span>Periodo de:</span><label><s:property value="listaExpInicio[#ex.index]"/></label><br/>
								<span>a:</span><label><s:property value="listaExpFin[#ex.index]"/></label><br/>
								<span>Sueldo:</span><label><s:property value="listaSueldo[#ex.index]"/></label><br/>
								<span>Funciones:</span><label><s:property value="listaFunciones[#ex.index]"/></label><br/>
								<span>Motido de Salida:</span><label><s:property value="listaMotivos[#ex.index]"/></label><br/>
								
							
						</div>
						</s:iterator>
						
					</div>
		  	 	
		  	 	
		  </div>
		  
		</div>
		
		<div id="cuerpo" class="cuerpo_datos_P">
		  <div class="contenedor">
		  		
		  	 	<div class="contenedor_encabezado">
		  	 		<h1>Conocimiento</h1>
		  	 		<a href="#" onClick="abrir_conocimientos();">Editar</a>
		  	 	</div>
		  	 	
		  	 		
					 <div id="accordion3" class="contenedor_cuerpo">
						<s:iterator value="listaConocimiento" status="con">
						<h3><a href="#"><s:property value="listaConocimiento[#con.index]"/></a></h3>
						<div class="detalle">
							    <div class="lins_encabezado link_formacion">
				                   <a class="linkCon" href="#" value="<s:property value="listaIdConocimiento[#con.index]"/>">Editar</a>
			                    </div>
								<span>Conocimiento:</span><label><s:property value="listaConocimiento[#con.index]"/></label><br/>
								<span>Descripcion:</span><label><s:property value="listaEspecificar[#con.index]"/></label><br/>
								<span>Nivel:</span><label><s:property value="listaNivelConocimiento[#con.index]"/></label><br/>
								<span>Ultima uso:</span><label><s:property value="listaUso[#con.index]"/></label><br/>
		                     
						</div>
					</s:iterator>
					</div>
		  	 	
		  	 	
		  </div>
		  
		</div>
		
		
	 </div> 
		
	</div>
	
	<div id="cuenta_der">
		<div id="busqueda_cuenta_home">
				
					<h1>Comienza aquí tu búsqueda</h1>
					
					<s:form theme="simple" id="form_log" action="doSerch" method="POST">
			
						<s:textfield cssClass="caja_bus" name="palabra_bus" />
						
						
						
						
						
						<s:select cssClass="styled-select" list="#{'0':'Seleccione', '1':'Ayer', '2':'Hace 2 dias', '3':'Hace 3 dias', '4':'Hace 4 dias', '5':'Hace 5 dias', '6':'Hace 6 dias', '7':'Hace 7 dias', '14':'Hace 14 dias', '30':'Hace 30 dias', '60':'Hace 60 dias'}" name="fecha_bus" id="fecha_bus_id" /><br/><!-- PARAMETRO DE BUSQUEDA DE DIAS PARA LAS VACANTES -->
						
						<s:select cssClass="styled-select" list="#{'Categoria':'Categoria', 'Juridico':'Juridico', 'Ventas':'Ventas', 'Mercadotecnia':'Mercadotecnia', 'Sistemas':'Sistemas', 'Gobierno':'Gobierno', 'Diseño':'Diseño'}" name="cate_bus" id="cate_bus" /><br/><!-- PARAMETRO DE BUSQUEDA CATEGORIA VACANTE -->
						
						
						
						<s:select cssClass="styled-select" list="#{'Ciudad/Eatado':'Ciudad/Eatado', 'Monterrey':'Monterrey', 'D.F.':'D.F.', 'Hidalgo':'Hidalgo'}" name="ciudad_bus" id="ciudad_bus"/><br/><!-- PARAMETRO DE BUSQUEDA CIUDAD O ESTADO DE LA VACANTE -->
						
						<s:select cssClass="styled-select" list="#{'Localidad':'Localidad', 'Montes Urales':'Montes Urales', 'Periferico Sur':'Periferico Sur', 'Relox':'Relox', 'Pachuca':'Pachuca'}" name="localidad_bus" id="localidad_bus"/><br/><!-- PARAMETRO DE BUSQUEDA LOCALIDAD DE LA VACANTE -->
						
						<s:submit cssClass="btn_log1" value=""></s:submit>
				
					</s:form>
						
						
						
					
					
					
					
				</div>
					
				<div  id="destacadoscuenta">
					<div class="destacados_c">
						<h1>Destacados</h1>
						<ul>
						<s:iterator id="listadoOro" value="VDG" status="it">
						  	<li>
								<a style="background-position: 0 -3px; cursor:pointer;" id="<s:property value='VDG[#it.index]'/>" class="emergente"><s:property value='VDG2[#it.index]'/></a>
								<p><s:property value='VDG3[#it.index]'/></p>
							</li>
							</s:iterator>
						  
						  
						  	<s:iterator id="listadoPlata" value="VDP" status="it">
						  	<li>
								<a style="background-position: 0 -47px; cursor:pointer;" id="<s:property value='VDP[#it.index]'/>" class="emergente"><s:property value='VDP2[#it.index]'/></a>
								<p><s:property value='VDP3[#it.index]'/></p>
							</li>
							</s:iterator>
							
							<s:iterator id="listadoPlata" value="VDR" status="it">
						  	<li>
								<a style="background-position: 0 -26px; cursor:pointer;" id="<s:property value='VDR[#it.index]'/>" class="emergente"><s:property value='VDR2[#it.index]'/></a>
								<p><s:property value='VDR3[#it.index]'/></p>
							</li>
							</s:iterator>
						</ul>
					</div>
				</div>
				
	</div>
	
</div>




<div class="modal_adv detalle_vac_tit" id="dialog_vacante" title="VACANTE" >
        <div class="detalle_seccion_importante">
        	<label class="detalle_vac_tit">Folio:</label><div id="num_vac" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">Nombre vacante:</label><div id="nom_vac" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">Ubicaci&oacute;n de la Vacante:</label><div id="ubicati" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">&Aacute;rea de Experiencia:</label><div id="are_exp" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">Salario:</label><div id="salario" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">Horario:</label><div id="horario" class="detalle_vac"></div><br/>
       		<label class="detalle_vac_tit">Edad:</label><div id="edad" class="detalle_vac"></div><br/>
        	<label class="detalle_vac_tit">Fecha de Publici&oacute;n:</label><div id="fecha" class="detalle_vac"></div><br/>
        </div>
        
        <br/>
        <label class="detalle_vac_tit">Rese&ntilde;a:</label><br/><div id="text_int" class="detalle_vac"></div><br/>
        <label class="detalle_vac_tit">Nivel de Esdudios:</label><br/><div id="esco" class="detalle_vac"></div><br/>
        <label class="detalle_vac_tit">Conocimientos Necesarios:</label><br/><div id="conocimient" class="detalle_vac"></div><br/>
        <label class="detalle_vac_tit">Talentos Solicitados:</label><br/><div id="talent" class="detalle_vac"></div><br/>
        <label class="detalle_vac_tit">Principales Funciones a Desempe&ntilde;ar:</label><br/><div id="prin_fun" class="detalle_vac"></div><br/>
        <label class="detalle_vac_tit">Observaciones:</label><br/><div id="observaciones" class="detalle_vac"></div><br/>
        
</div>




     <div class="modal_adv detalle_vac_tit" id="dialog_datos_personales" title="Datos Personales" >
             
    <div class="label_crear"><label>*Apellido Paterno</label></div>
    <s:textfield id="apellidoPaterno"  name="apellidoPaterno" cssClass="caja_input" value="%{apellidoPaterno}"/><br>
    <div class="label_crear"><label>*Apellido Materno</label></div>
     <s:textfield id="apellidoMaterno"name="apellidoMaterno" cssClass="caja_input" value="%{apellidoMaterno}"/><br>
    <div class="label_crear"><label>*Nombre</label></div> 
    <s:textfield id="nombre"name="nombre" cssClass="caja_input" value="%{nombre}"/><br>
    <div class="label_crear"><label>RFC</label></div><s:textfield id="rfc"name="rfc" cssClass="caja_input" value="%{rfc}"/><br>
    <div class="label_crear"><label>curp</label></div><s:textfield id="curp"name="curp" cssClass="caja_input" value="%{curp}"/><br>
    <div class="label_crear"><label>*Fecha de Nacimiento</label></div>
    <div class="fec_container">
    <s:select name="dia" cssClass="combofechas" list="dias"></s:select>
    <s:select name="mes" cssClass="combofechas" list="mes"/>
     <s:select name="anio" cssClass="combofechas" list="anio"/>
     </div><br/>
     <div class="label_crear"><label>Calle y numero</label></div><s:textfield id="calleNumero"name="calleNumero" cssClass="caja_input" value="%{calleNumero}"/><br>
     <div class="label_crear"><label>Colonia</label></div><s:textfield id="colonia"name="colonia" cssClass="caja_input" value="%{colonia}"/><br>
     <div class="label_crear"><label>Ciudad o poblado</label></div><s:textfield id="ciudadPoblado"name="ciudadPoblado" cssClass="caja_input" value="%{ciudadPoblado}"/><br>
     <div class="label_crear"><label>Municipio o Delegacion</label></div><s:textfield id="municipioDelegacion"name="municipioDelegacion" cssClass="caja_input" value="%{municipioDelegacion}"/><br>
     <div class="label_crear"><label>Codigo Postal</label></div><s:textfield id="cp"name="cp" cssClass="caja_input" value="%{cp}"/><br>
     <div class="label_crear"><label>Nacionalidad</label></div><s:textfield id="nacionalidad"name="nacionalidad" cssClass="caja_input" value="%{nacionalidad}"/><br>
     <div class="label_crear"><label>Estado Civil</label></div><s:select name="estadoCivil" cssClass="combofechas" list="#{'s':'soltero','c':'casado' }"/><br>
     <div class="label_crear"><label>Sexo</label></div><s:select name="sexo" cssClass="combofechas" list="#{'F':'femenino','M':'masculino' }"/><br>
     
    </div>
    
        
        
	
     
	
	

	
	<div class="modal_adv detalle_vac_tit" id="dialog_escolaridad" title="Escolaridad" >
	          <input id="idForm" name="idForm" type="hidden"/>
	         <div class="label_crear"><label>*Nivel Academico</label></div> <s:select id="nivelAcademico" name="nivelAcademico" cssClass="select_input" list="#{'Primaria':'Primaria','Secundaria':'Secundaria'}"/><br>
             <div class="label_crear"><label>*Institucion Escolar</label></div><s:textfield id="institucion" name="institucion" cssClass="caja_input"/><br>
             <div class="label_crear"><label>*Pais</label></div><s:textfield id="paisInstituto" name="paisInstituto" cssClass="caja_small"/>
      		<label>Edo.</label><s:textfield id="estadoInstituto" name="estadoInstituto" cssClass="caja_small"/><br>
      		<div class="label_crear"><label>*Lapso de</label></div><div class="fec_container">
         		  <s:select id="diaInicioF" name="diaInicioF" cssClass="combofechas" list="dias"/>
          			 <s:select id="mesInicioF" name="mesInicioF" cssClass="combofechas" list="mes"/>
         			  <s:select id="anioInicioF" name="anioInicioF" cssClass="combofechas" list="anio"/>
   			 </div><br>
     		 <div class="label_crear"><label>*a</label></div><div class="fec_container">
             <s:select id="diaFinF" name="diaFinF" cssClass="combofechas" list="dias"/>
             <s:select id="mesFinF" name="mesFinF" cssClass="combofechas" list="mes"/>
             <s:select id="anioFinF" name="anioFinF" cssClass="combofechas" list="anio"/>
    		</div><br>
      	<div class="label_crear"><label>*Estatus</label></div><s:textfield id="status" name="status" cssClass="caja_input"/><br>
	
	
	
	
        
	</div>
	

	
	<div class="modal_adv detalle_vac_tit" id="dialog_idiomas" title="Idiomas" >
	         <input type="hidden" id="idIdioma" name="idIdioma"/>
	         <div class="label_crear"><label>Idioma</label></div> <s:select id="idiom" name="idiom" cssClass="select_input" 
            list="#{'1':'Español','2':'Ingles','3':'Aleman','4':'Italiano','5':'Frances','6':'Nahuatl','7':'Otomi','8':'Chino','9':'Japones','10':'Koreano'}"/>
            <div class="label_crear"><label>Hablado</label></div>
             <s:select id="speak" name="speak" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/><br>
            <div class="label_crear"><label>Escuchado</label></div> 
            <s:select id="listen" name="listen" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/><br>
            <div class="label_crear"><label>Escrito</label></div>
             <s:select id="write" name="write" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/><br>
	
	
        
	</div>
	

	
	<div class="modal_adv detalle_vac_tit" id="dialog_conocimientos" title="Conocimientos" >
           <input type="hidden" id="idConocimiento" name="idConocimiento"/>
           <div class="label_crear"><label>Conocimiento</label></div><s:textfield id="conocimiento" name="conocimiento" cssClass="caja_input"/><br>
           <div class="label_crear"><label>Especificar</label></div><s:textfield id="especificar" name="especificar" cssClass="caja_input"/><br>
           <div class="label_crear"><label>Nivel</label></div><s:select id="nivel" name="nivel" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/><br>
           <div class="label_crear"><label>Ultima uso</label></div><s:select id="fechaUso" name="fechaUso" cssClass="select_input" list="#{'0':'menos de 1 año','1':'1 año','2':'2 años','3':'3 años','4':'4 años','5':'5 años' }"/><br>
         
        
	</div>
	

	
	<div class="modal_adv detalle_vac_tit" id="dialog_experiencia" title="Experiencia" >
        <input type="hidden" id="idExp" name="idExp"/>
        <div class="label_crear"><label>*Empresa</label></div><s:textfield name="nombreEmpresa" cssClass="caja_input"/><br>
        <div class="label_crear"><label>*Puesto</label></div><s:textfield name="puesto" cssClass="caja_input"/><br>
        <div class="label_crear"><label>*Periodo de</label></div><div class="fec_container">
           <s:select name="diaInicioE" cssClass="combofechas" list="dias"/>
           <s:select name="mesInicioE" cssClass="combofechas" list="mes"/>
           <s:select name="anioInicioE" cssClass="combofechas" list="anio"/>
    </div><br>
        <div class="label_crear"><label>*a</label></div><div class="fec_container">
           <s:select name="diaFinE" cssClass="combofechas" list="dias"/>
           <s:select name="mesFinE" cssClass="combofechas" list="mes"/>
           <s:select name="anioFinE" cssClass="combofechas" list="anio"/>
    </div><br>
        <div class="label_crear"><label>*Sueldo</label></div><s:textfield name="sueldoEmpresa" cssClass="caja_input"/><br>
        <div ><label>Detalle brevemente sus funciones</label></div>
         <s:textarea name="funcionesEmpresa" cols="40" rows="3" cssClass="area_input"></s:textarea>
         <div ><label>Mencione los motivos de su salida</label></div>
         <s:textarea name="motivosSalida" cols="40" rows="3" cssClass="area_input"></s:textarea>
        
        
	</div>



 
</body>
</html>