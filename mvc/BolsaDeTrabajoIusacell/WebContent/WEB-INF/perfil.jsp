<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "|-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" /> 
<link type="text/css" href="css/iusa.css" rel="Stylesheet" />
<script type="text/javascript" src="js/jquerySvg/jquery.svg.js"></script>
<script type="text/javascript" src="js/jquerySvg/jquery.svganim.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/perfil_scripts.js"></script>
<script type="text/javascript" src="js/datos_personales.js"></script>
<script type="text/javascript">
    window.history.forward();
    function noBack() { window.history.forward(); }
</script>
<title>Perfil Personal</title>
</head>
<body onload="noBack();"
    onpageshow="if (event.persisted) noBack();" onunload="">
<s:set name="viaje" value="viaje"/>
<s:set name="mudanza" value="mudanza"/>
<div id="loadLayer"></div>
<div class="container">
 
<div id="progressload">
	        <div id="cargandoload">
	          <div id="cargandoText">Cargando</div>
	        </div>
	        <div id="barraload">
	            <div id="barraLoadExt">
						 <div id="barraLoadInt">
							<div id="barraLoadProgress">
								        
	        
	        
	          		        </div>	
	          		  </div>
	            </div>
	        
	        
	        </div>
	        <div id="porcentajeload">
	        
	        </div>
	     </div>

<div id="barraGuardar">
    <div id="botonArriba" class="botonGuardar">
        <div id="iconoArriba" class="iconoGuardar"></div> 
	    <div class="textoGuardar">Arriba</div>												        
	</div>	
    <div id="botonGuardar" class="botonGuardar">
        <div id="iconoGuardar" class="iconoGuardar"></div> 
	    <div class="textoGuardar">GUARDAR</div>												        
	</div>									        
</div>	

<div id="usuario_datos">
  <div id="datos_personales">
   
   <div class="userHeader">
     <div class="usr_row">
           <div class="usrhdr_container">
               <div class="hdrlbl">Datos Personales</div><div id="editarPersonales"class="edlbl dtlbl">editar</div>
           </div>
     </div>
     
     <div class="usr_row userright">
         <div class="usrhdr_container">
             <div class="hdrlbl">Datos de ubicaci&oacute;n</div><div id="editarDireccion" class="edlbl dtlbl">editar</div>
        </div>
     </div>
     
   </div>
   <div id="userBody">
       <div id="usrleft" class="usr_info">
        <div id="foto_usr"><img id="foto_user" src="<s:property value="urlFoto"/>"  width="123px" height="125px"/></div>
        <div id="usu_datos">
                <input type="hidden" id="id_usuario" value="<s:property value="idUsuario"/>"/>
                <div class="nompila"><span id="nombre_span"><s:property value="nombre"/>&nbsp;<s:property value="apellidoPaterno"/>&nbsp;<s:property value="apellidoMaterno"/></span></div><br/><br/>
                <div class="email_row"><label class="labelData">e-mail: &nbsp</label><s:property value="usuario"/></div>
				<div class="name_row"><label class="labelData">RFC: &nbsp</label><span id="rfc_span"><s:property value="rfc"/><s:property value="homoclave"/></span></div>
				<div class="name_row"><label class="labelData">Fecha de Nacimiento: &nbsp</label><span id="nac_span"><s:property value="fechaNacimiento"/></span></div>
				<div class="name_row"><label class="labelData">Sexo: &nbsp</label><span id="sex_span"><s:property value="sexo"/></span></div>
				<div class="name_row"><label class="labelData">CURP: &nbsp</label><span id="curp_span"><s:property value="curp"/></span></div>
				<div class="name_row"><label class="labelData">Estado Civil: &nbsp</label><span id="curp_span"><s:property value="estadoCivil"/></span></div>
        </div><!--  -->
       </div>
       <div id="usrright" class="usr_info userright">
             <div id="casa_usr"></div>
             <div id="infolocal">
                <div class="name_row"><div class="labelnom"><label class="labelData">Calle y Numero: &nbsp</label></div><div class="dirpila"><s:property value="calleNumero"/></div></div><br/>
                
				<div class="name_row"><label class="labelData">Colonia: &nbsp</label><span id="col_span"><s:property value="colonia"/></span></div>
				<div class="name_row"><label class="labelData">Estado: &nbsp</label><span id="col_span"><s:property value="estadoPais"/></span></div>
				<div class="name_row"><label class="labelData">Municipio/Delegacion: &nbsp</label><span id="municipio_span"><s:property value="municipioDelegacion"/></span></div>
				<div class="name_row"><label class="labelData">Codigo Postal: &nbsp</label><span id="cp_span"><s:property value="cp"/></span></div>
				<div class="name_row"><label class="labelData">Telefono Casa: &nbsp</label><span id="cp_span"><s:property value="telefono"/></span></div>
				<div class="name_row"><label class="labelData">Telefono Celular: &nbsp</label><span id="cp_span"><s:property value="telefono_extra"/></span></div>
            </div>
       </div>
   </div>
   
  </div>
  <div id="idiomas">
      <div id="idiomas_header">
          <div id="idiomas_h">Idiomas</div><div id="editar_idiomas">Agregar</div>
      </div>
      <div id="idiomas_body">
      <s:iterator value="listaIdioma" status="idioma">
         <div id="<s:property value="listaIdIdioma[#idioma.index]"/>_row" class="idioma_row">
           <div id="<s:property value="listaIdIdioma[#idioma.index]"/>" class="idioma_info">          
             <div class="idioma_flag  flag_<s:property value="listaNumIdioma[#idioma.index]"/>"></div>
             <div class="idioma_name"><s:property value="listaIdioma[#idioma.index]"/></div>
             <div class="idioma_dom"><s:property value="listaDominio[#idioma.index]"/>%</div>
            </div> 
         </div>
      </s:iterator>   
      </div>
  </div>
</div>
<div id="infoheader" class="infoheader"><div id="trayectoria">Trayectoria Laboral y de Educaci&oacute;n</div>
<div  id="addWork" class="addGraph">
<div id="job_icon"></div><div class="infolbl">Agregar Trabajo</div>
</div>
<div  id="addEdu" class="addGraph">
<div id="school_icon"></div><div class="infolbl">Agregar Educaci&oacute;n</div>
</div>
<input id="last" type="hidden" value="primero"/>
<input id="lastskull" type="hidden" value="primero"/>
<input id="exp" type="hidden" value="0"/>
<input id="edu" type="hidden" value="0"/>
</div>
<div id="infografia">

</div>
<div id="informacion">
   <div id="info_der">
        <div id="info_per">
           <div id="per_header" class="userHeader">
              <div id="talentos_head" class="per_head talentos_head"><div id="Tllbl">Talentos</div><div id="editarTalento" style="font:12px arial; color:gray; margin-left:230px; cursor:pointer;">editar</div></div>
              <div id="identidad_head" class="identidad_head per_head per_center"><div id="Hoblbl">Personalidad</div><div id="editarPerson" style="font:12px arial; color:gray; margin-left:190px; cursor:pointer;">editar</div></div>
              <div id="hobi_head" class="hobi_head per_head"><div id="Hoblbl">Hobbies</div></div>
           </div>
           <div id="per_body">
             <div id="talentos_body" class="per_body talentos_head">
             <div id="talentos"></div>
            
             </div>
              <div id="identidad_body" class="identidad_head per_body per_center">
                    <div class="id_container">
                      <div id="impacto"  class="id_title impacto"><div class="lblid">Persuasi&oacute;n</div></div>
                      <div id="Persuasion_content" class="id_content impacto"><s:property value="persuasion"/></div>
                      <input type="hidden" name="checadoper" id="checadoper" value="<s:property value="persuasion"/>"/>
                    </div>
                    <div class="id_container">
                      <div class="id_title interrelacion" id="interrelacion" ><div  class="lblid">Constancia</div></div>
                      <div id="Constancia_content" class="id_content interrelacion"><s:property value="constancia"/></div>
                      <input type="hidden" name="checadoconst" id="checadoconst" value="<s:property value="constancia"/>"/>                   
                    </div>
                    <div class="id_container">
                      <div class="id_title laboral" id="laboral"><div  class="lblid">Apego</div></div>
                      <div id="Apego_content" class="id_content laboral"><s:property value="apego"/></div>
                      <input type="hidden" name="checadoapego" id="checadoapego" value="<s:property value="apego"/>"/>
                    </div>
                    <div class="id_container">
                      <div class="id_title empuje" id="empuje"><div  class="lblid">Empuje</div></div>
                      <div id="Empuje_content" class="id_content empuje"><s:property value="empuje"/></div>
                   	<input type="hidden" name="checadoempu" id="checadoempu" value="<s:property value="empuje"/>"/>
                    </div>
              </div>
              <div id="hobi_body" class="hobi_head per_body">
                 <div id="hobbie_list" title="hobbies">
                    <div id="hobbie_container_1" class="hobbie_container">
                       <div id="hobbie_1" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_1" class="hobbie_name"></div>
                   </div>
                    <div id="hobbie_container_2" class="hobbie_container">
                       <div id="hobbie_2" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_2" class="hobbie_name"></div>
                   </div><br/>
                   
                   <div id="hobbie_container_3" class="hobbie_container">
                       <div id="hobbie_3" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_3" class="hobbie_name"></div>
                   </div>
                    <div id="hobbie_container_4" class="hobbie_container">
                       <div id="hobbie_4" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_4" class="hobbie_name"></div>
                   </div><br/>
                   
                   <div id="hobbie_container_5" class="hobbie_container">
                       <div id="hobbie_5" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_5" class="hobbie_name"></div>
                   </div>
                    <div id="hobbie_container_6" class="hobbie_container">
                       <div id="hobbie_6" class="hobbie_cell hobbie_grid"></div>
                       <div id="hobbie_name_6" class="hobbie_name"></div>
                   </div><br/>
                   
                   
                   
                   
                   
                   
                 </div>
              </div>
           </div>
        </div>
        <div id="info_eco">
             <div id="eco_header" class="userHeader">
               <div id="sal_header" class="sal_header eco_head"><div style="width:115px; float:left; ">Salario deseado</div><div id="editarSal" style="font:12px arial; color:gray; margin-left:135px; cursor:pointer;">editar</div></div>
               <div id="hora_header" class="hora_header eco_head per_center"><div style="width:100px; float:left; ">Horario Preferido</div><div id="editarHour" style="font:12px arial; color:gray; margin-left:100px; cursor:pointer;">editar</div></div>
               <div id="dispo_header" class="dispo_header eco_head per_center"><div style="width:115px; float:left; ">Disposici&oacute;n de</div><div id="editarDisp" style="font:12px arial; color:gray; margin-left:220px; cursor:pointer;">editar</div></div>
               <div id="inter_header" class="inter_header eco_head"><div style="width:115px; float:left; ">&Aacute;rea de Interes</div><div id="editarArea" style="font:12px arial; color:gray; margin-left:140px; cursor:pointer;">editar</div></div>
            
           </div>
           <div id="eco_body">
              <div  class="sal_header"><div id="sal_img" class="eco_img"></div><div id="sal_container" class="eco_container"><label>Mas de:</label><br/><label id="money_label">$<s:property value="sueldoDeseado"/></label><br/><label>Mensuales</label></div></div>
               <div  id="hora_container" class="hora_header eco_body per_center"><div id="hora_img" class="eco_img"></div><div id="time_container" class="eco_container"><s:property value="horarioDeseado"/></div></div>
               <div  class="dispo_header eco_body per_center">
               <div  id="viaje_dispo" class="inner_dispo">
                 <div id="viaje_img" class="dispo_img"></div><div id="viaje_container" class="dispo_container"><label>Viajar</label><br/>
                 
                 <s:if test="%{#viaje=='SI'}">
	               <label id="travel_label" style="color:#2E8B57;"><s:property value="viaje"/></label>
				</s:if>
                 <s:elseif test="%{#viaje=='NO'}">
                   <label id="travel_label" style="color:#DC143C;"><s:property value="viaje"/></label>
				</s:elseif>
                
                 
                 
                 </div>
               </div>
               <div  id="muda_dispo"  class="inner_dispo">
                <div  id="muda_img" class="dispo_img"></div><div id="muda_container" class="dispo_container"><label>Cambio de Residencia</label><br/>
                
                
               
                
                <s:if test="%{#mudanza=='SI'}">
	                <label id="mobi_label" style="color:#2E8B57;"><s:property value="mudanza"/></label>
				</s:if>
                 <s:elseif test="%{#mudanza=='NO'}">
                    <label id="mobi_label" style="color:#DC143C;"><s:property value="mudanza"/></label>
				</s:elseif>
				  
                
                </div>
               </div>
               
               </div>
               <div id="inter_container" class="inter_header eco_body">-<s:property value="areaDeInteres"/><br>-<s:property value="areaDeInteresAlterna"/></div>
           </div>
        </div>
   </div>
   <div id="skills">
       <div id="software">
         <div class="swHeader"><div id="sw_h">Software</div><div id="editar_software">Agregar</div></div>
         <div id="swBody" class="swBody">
      
           <s:iterator value="listaSoftwareUsuario" status="usuSoft">
             <div  id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swrow" class="swrow">
                <div id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swname" class="swname"><s:property value="listaSoftwareUsuario[#usuSoft.index]"/></div>
                <div id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swdom"  class="swdom"><s:property value="listaDominioSoftware[#usuSoft.index]"/>%</div>
             </div>
           </s:iterator>
           
           
         </div>
         
       </div>
       
       
       <div id="habilidades">
         <div class="swHeader"><div id="skill_h">Habilidades</div><div id="editar_skill" style="cursor:pointer;">Agregar</div></div>
         <div id="skillbody">
         
         </div>
       </div>
    </div>
    
    
   
	<div class="clear"></div>   
</div>





</div>



     <div class="modal_adv detalle_vac_tit" id="dialog_datos_personales" title="Datos Personales" >
      
        
     
    <div class="label_crear"><label>*Apellido Paterno</label></div>
    <s:textfield id="apellidoPaterno"  name="apellidoPaterno" cssClass="caja_input textos" maxlength="40" value="%{apellidoPaterno}"/><br/>
    <div class="label_crear"><label>*Apellido Materno</label></div>
     <s:textfield id="apellidoMaterno"name="apellidoMaterno" cssClass="caja_input textos" maxlength="40" value="%{apellidoMaterno}"/><br/>
    <div class="label_crear"><label>*Nombre</label></div> 
    <s:textfield id="nombre"name="nombre" cssClass="caja_input textos"  maxlength="40" value="%{nombre}"/><br/>
    <div class="label_crear"><label>*Fecha de Nacimiento</label></div>
    <div class="fec_container">
    <div class="cobertura combofechas1"><s:select name="dia"  list="dias"></s:select></div>
    <div class="cobertura combofechas1 combomes"><s:select name="mes"  list="#{'01':'Enero','02':'Febrero','03':'Marzo','04':'Abril','05':'Mayo','06':'Junio','07':'Julio','08':'Agosto','09':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
    <div class="cobertura combofechas1"><select id="anio" name="anio">
         <option value="0" selected="selected">Año</option>
         <s:iterator id="listadoTip" value="anio" status="it">
          <option value="<s:property value='anio[#it.index]'/>"><s:property value='anio[#it.index]'/></option>
         </s:iterator> 
          
        </select></div>
     <br/>
     </div><br/><br/>
     <div class="label_crear"><label>RFC</label></div><s:textfield id="rfc"name="rfc" maxlength="10"cssClass="caja_small1 textos" value="%{rfc}"/><label>Homoclave</label><s:textfield id="homoclave"name="homoclave" maxlength="3" cssClass="caja_small1 textos" value="%{homoclave}"/><br>      <div class="label_crear"><label>curp</label></div><s:textfield id="curp"name="curp" cssClass="caja_input" value="%{curp}" maxlength="18"/><br>
     <div class="label_crear"><label>Estado Civil</label></div><div class="cobertura combo_style"><s:select name="estadoCivil" list="#{'s':'soltero','c':'casado' }" value="%{edoCivil}"/></div><br>
     <div class="label_crear"><label>Sexo</label></div><div class="cobertura combo_style"><s:select name="sexo"  list="#{'F':'femenino','M':'masculino' }" value="%{sex}"/></div><br>
     
  
       
    </div>
 

    <div class="modal_adv detalle_vac_tit" id="dialog_datos_ubicacion" title="Datos Ubicacion" >
     <div id="ubicacionForm">        
    
     <div class="label_crear"><label>Calle y n&uacute;mero</label></div><s:textfield id="calleNumero"name="calleNumero" cssClass="caja_input textos"  maxlength="100" value="%{calleNumero}"/><br>
     <div class="label_crear"><label>Colonia</label></div><s:textfield id="colonia"name="colonia" cssClass="caja_input textos" maxlength="40" value="%{colonia}"/><br>
     <div class="label_crear"><label>Pais</label></div><div class="cobertura combo_style"><s:select id="nacionalidad" name="nacionalidad"  list="paises" value="%{nacionalidad}"/></div><br>
     <div class="label_crear"><label>Estado</label></div><div class="cobertura combo_style"><s:select id="estadoPais" name="estadoPais" list="estados"/><div id="cambiovarest"></div></div><br>
     <div class="label_crear"><label>Municipio o Delegaci&oacute;n</label></div><div class="cobertura combo_style"><s:select id="municipioDelegacion"name="municipioDelegacion" cssClass="select_input" list="#{}" /><div id="cambiovarmun"></div></div><input type="hidden" id="munActual" value="<s:property value="municipioDelegacion"/>"/><br>
     <div class="label_crear"><label>Codigo Postal</label></div><s:textfield id="cp"name="cp" cssClass="caja_input textos" maxlength="15" value="%{cp}"/><br>
     <div class="label_crear"><label>Tel&eacute;fono 1</label></div><s:textfield id="telefono"name="telefono" cssClass="caja_input" value="%{telefono}"/><br>
      <div class="label_crear"><label>Tel&eacute;fono 2</label></div><s:textfield id="telefono_extra"name="telefono_extra" cssClass="caja_input" value="%{telefono_extra}"/><br>
     </div>
    
     
    </div>

	 <script language="JavaScript">
    	 var pais=$("#nacionalidad").val();
    	 if(pais == "México" || pais == "MEXICO" || pais == "mexico" || pais=="Mexico"){	
     		$("#cambiovarest").hide();
     		$("#cambiovarmun").hide();
    	 }else{
	     $("#estadoPais").hide();
			$("#municipioDelegacion").hide();
			$("#cambiovarest").html("<label>Extranjero</label>");
    		$("#cambiovarmun").html("<label>Extranjero</label>");
	 	   $("#cambiovarest").show();
	 		$("#cambiovarmun").show();
    	 }
	     </script>
    

	
	<div class="modal_adv detalle_vac_tit" id="dialog_escolaridad" title="Escolaridad" >
	         <div class="label_crear"><label>*Nivel Acad&eacute;mico</label></div> <div class="cobertura combo_style"><s:select id="nivelAcademico" name="nivelAcademico" list="#{'1':'Secundaria','2':'Bachillerato / Preparatoria','3':'Tecnico','4':'Licenciatura / Ingenieria','5':'Diplomado','6':'Maestria','7':'Doctorado','8':'Otro'}"/></div><br>
             <div class="label_crear"><label>*Institucion Escolar</label></div><s:textfield id="institucion" name="institucion" maxlength="80" cssClass="caja_input textos"/><br>
             <div id="label_especialidad" class="label_crear"><label>*Area/Especialidad</label></div><s:textfield id="area_especialidad" name="area_especialidad" maxlength="79" cssClass="caja_input textos"/><br>
             <div class="label_crear"><label>*Pa&iacute;s</label></div><div class="cobertura combo_style"><s:select id="paisInstituto" name="paisInstituto" list="paises"/></div><br>
      		<div class="label_crear"><label>*Lapso de</label></div><div class="fec_container">
      		         <div class="cobertura combofechas"><s:select id="mesInicioF" name="mesInicioF" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
          			 <div class="cobertura combofechas"><s:select id="anioInicioF" name="anioInicioF"  list="anio"/></div>
         			  
   			 </div><br><br/><br/>
     		 <div class="label_crear"><label id="afal">*a</label></div><div class="fec_container">
     		 <div id="mesFinContainerF" class="cobertura combofechas"> <s:select id="mesFinF" name="mesFinF" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div> 
             <div id="anioFinContainerF" class="cobertura combofechas"><s:select id="anioFinF" name="anioFinF" list="anio"/></div>   
    		</div><br>
    	 <div class="label_crear"><label>Estudio aqu&iacute; actualmente</label><input type="checkbox" id="estudioActual" name="estudioActual" class="actualCheck" /></div><br/><br/><br/>
      	<div class="label_crear"><label>*Estatus</label></div><div class="cobertura combo_style"><s:select id="status_edu" name="status_edu" list="#{'Trunco':'Trunco','Cursando':'Cursando','Titulado':'Titulado','Diploma':'Diploma','Pasante':'Pasante','Certificado':'Certificado'}"/></div><br>
        
	</div>
	

	
	<div class="modal_adv detalle_vac_tit" id="dialog_modificar_escolaridad" title="Escolaridad" >
	          <input id="idForm" name="idForm" type="hidden"/>
	         <div class="label_crear"><label>*Nivel Acad&eacute;mico</label></div> <div class="cobertura combo_style"><s:select id="nivelAcademicoM" name="nivelAcademicoM"  list="#{'1':'Secundaria','2':'Bachillerato / Preparatoria','3':'Tecnico','4':'Licenciatura / Ingenieria','5':'Diplomado','6':'Maestria','7':'Doctorado','8':'Otro'}"/></div><br>
             <div class="label_crear"><label>*Institucion Escolar</label></div><s:textfield id="institucionM" name="institucionM" maxlength="40" cssClass="caja_input textos"/><br>
             <div id="label_especialidadM" class="label_crear"><label>*Area/Especialidad</label></div><s:textfield id="area_especialidadM" name="area_especialidadM" maxlength="79" cssClass="caja_input textos"/><br>
             <div class="label_crear"><label>*Pa&iacute;s</label></div><div class="cobertura combo_style"><s:select id="paisInstitutoM" name="paisInstitutoM"  list="paises"/></div><br>
      		<div class="label_crear"><label>*Lapso de</label></div><div class="fec_container">
      		         <div class="cobertura combofechas"> <s:select id="mesInicioFM" name="mesInicioFM" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
          			 <div class="cobertura combofechas"><s:select id="anioInicioFM" name="anioInicioFM"  list="anio"/></div>
         			  
   			 </div><br><br/><br/>
     		 <div class="label_crear"><label id="afaml">*a</label></div><div class="fec_container">
     		 <div id="mesFinContainerFM" class="cobertura combofechas"><s:select id="mesFinFM" name="mesFinFM" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
             <div id="anioFinContainerFM" class="cobertura combofechas"><s:select id="anioFinFM" name="anioFinFM" cssClass="combofechas" list="anio"/></div>
    		</div><br>
    	 <div class="label_crear"><label>Estudio aqu&iacute; actualmente</label><input type="checkbox" id="estudioActualM" name="estudioActualM" class="actualCheck" /></div><br/><br/><br/>
      	 <div class="label_crear"><label>*Estatus</label></div> <div class="cobertura combo_style"><s:select id="statusM" name="statusM"  list="#{'Trunco':'Trunco','Cursando':'Cursando','Titulado':'Titulado','Diploma':'Diploma','Pasante':'Pasante','Certificado':'Certificado'}"/></div><br>
	
	
	
	
        
	</div>
	
	
	
	
	<div class="modal_adv detalle_vac_tit" id="dialog_experiencia" title="Experiencia" >
        
        <div class="label_crear"><label>*Empresa</label></div><s:textfield name="nombreEmpresa" maxlength="60" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>*Puesto</label></div><s:textfield name="puesto" maxlength="50" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>*Periodo de</label></div><div class="fec_container">
        <div class="cobertura combofechas"><s:select name="mesInicioE" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
        <div class="cobertura combofechas"><s:select name="anioInicioE"  list="anio"/></div>
           
    </div><br>
        <div class="label_crear"><label id="aexpl">*a</label></div><div class="fec_container">   
        <div id="mesFinContainerE" class="cobertura combofechas"><s:select name="mesFinE"  list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
        <div id="anioFinContainerE" class="cobertura combofechas"><s:select name="anioFinE" list="anio"/></div>
    </div><br/><br/>
        <div class="labelt"><label>Trabajo aqu&iacute; actualmente</label><input type="checkbox" id="trabajoActual" name="trabajoActual" class="actualCheck" /></div><br/><br/>
        <div class="label_crear"><label>*Sueldo Mensual</label></div> <div class="cobertura combo_style"><s:select name="sueldoEmpresa" list="#{'5000':'$5,000','7000':'$7,000','9000':'$9,000','11000':'$11,000','13000':'$13,000','15000':'$15,000','17000':'$17,000','19000':'$19,000','22000':'$22,000','25000':'$25,000','30000':'$30,000','40000':'$40,000','50000':'$50,000','60000':'$60,000','70000':'$70,000','80000':'$80,000','90000':'$90,000','100000':'$100,000','110000':'Mas de $100,000'}"/></div><br>
        <div ><label>Detalle brevemente sus funciones</label></div>
         <s:textarea name="funcionesEmpresa" cols="69" rows="6" cssClass="area_input"></s:textarea>
        
	</div>
	

	
		<div class="modal_adv detalle_vac_tit" id="dialog_modificar_experiencia" title="Experiencia" >
        <input type="hidden" id="idExp" name="idExp"/>
        <div class="label_crear"><label>*Empresa</label></div><s:textfield name="nombreEmpresaM" maxlength="60" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>*Puesto</label></div><s:textfield name="puestoM" maxlength="50" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>*Periodo de</label></div><div class="fec_container">
            <div class="cobertura combofechas"><s:select name="mesInicioEM" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div>
        	<div class="cobertura combofechas"> <s:select name="anioInicioEM" list="anio"/></div>

    </div><br>
        <div class="label_crear"><label id="aexpml">*a</label></div><div class="fec_container">  
           <div id="mesFinContainerEM" class="cobertura combofechas"><s:select name="mesFinEM" list="#{'1':'Enero','2':'Febrero','3':'Marzo','4':'Abril','5':'Mayo','6':'Junio','7':'Julio','8':'Agosto','9':'Septiembre','10':'Octubre','11':'Noviembre','12':'Diciembre' }"/></div> 
           <div id="anioFinContainerEM" class="cobertura combofechas"> <s:select name="anioFinEM" list="anio"/></div>
    </div><br/><br/>
        <div class="labelt"><label>Trabajo aqu&iacute; actualmente</label><input type="checkbox" id="trabajoActualM" name="trabajoActualM" class="actualCheck" /></div><br/><br/>
        <div class="label_crear"><label>*Sueldo Mensual</label></div><div class="cobertura combo_style"><s:select name="sueldoEmpresaM" list="#{'5000':'$5,000','7000':'$7,000','9000':'$9,000','11000':'$11,000','13000':'$13,000','15000':'$15,000','17000':'$17,000','19000':'$19,000','22000':'$22,000','25000':'$25,000','30000':'$30,000','40000':'$40,000','50000':'$50,000','60000':'$60,000','70000':'$70,000','80000':'$80,000','90000':'$90,000','100000':'$100,000','110000':'Mas de $100,000'}"/></div><br>
        <div ><label>Detalle brevemente sus funciones</label></div>
         <s:textarea name="funcionesEmpresaM" cols="69" rows="6" cssClass="area_input"></s:textarea>
        
	</div>
	
	<!--  -->
	
	<div class="modal_adv detalle_vac_tit" id="dialog_identidad" title="Personalidad">
               
               <div id="titulo_personalidad">Elige las 4 características con las que m&aacute;s te identifiques. Elige una de cada dimensi&oacute;n</div>
               
               <div id="impactoContainer" class="identidadContainer">
               <div class="idListContainer">
                  <div id="impactoListHeader" class="idListHeader"><div class="identitle">Persuasi&oacute;n</div></div>
                  <div class="idListBody">
                 <s:iterator value="listaPersuasion" status="im">
                    <div class="idListRow">
                     <div class="idListName"><s:property value="listaPersuasion[#im.index]"/></div>
                     
                     <div id="<s:property value="listaPersuasion[#im.index]"/>" class="idListCheck impactoCheck"></div>
                     <input type="hidden" id="Personalidad<s:property value="listaIdPersuasion[#im.index]"/>_check" value="<s:property value="listaIdPersuasion[#im.index]"/>"/>
                    </div>
                  </s:iterator>
               
                  </div>
                  
               </div>
                 
                 <input type="hidden" id="id_impacto_seleccionado" value="ninguno"/>
                  <input type="hidden" id="id_impacto_valor" value="ninguno"/>
               </div>
               
               <div id="constanciaContainer" class="identidadContainer">
               
               <div class="idListContainer">
                  <div id="interrelacionListHeader" class="idListHeader"><div class="identitle">Constancia</div></div>
                  <div class="idListBody">
                 <s:iterator value="listaConstancia" status="inter">
                    <div class="idListRow">
                     <div class="idListName"><s:property value="listaConstancia[#inter.index]"/></div>
                     <div id="<s:property value="listaConstancia[#inter.index]"/>" class="idListCheck interrelacionCheck"></div>
                     <input type="hidden" id="<s:property value="listaConstancia[#inter.index]"/>_check" value="<s:property value="listaIdConstancia[#inter.index]"/>"/>

                    </div>
                  </s:iterator>
                  
                  </div>
                  
               </div>
                 
                 <input type="hidden" id="id_interrelacion_seleccionado" value="ninguno"/>
                  <input type="hidden" id="id_interrelacion_valor" value="ninguno"/>
                  
               </div>
               
               <div id="apegoContainer" class="identidadContainer">
                 <div class="idListContainer">
                  <div id="laboralListHeader" class="idListHeader"><div class="identitle">Apego</div></div>
                  <div class="idListBody">
                 <s:iterator value="listaApego" status="labo">
                    <div class="idListRow">
                     <div class="idListName"><s:property value="listaApego[#labo.index]"/></div>
                     <div id="<s:property value="listaApego[#labo.index]"/>" class="idListCheck laboralCheck"></div>
                     <input type="hidden" id="<s:property value="listaApego[#labo.index]"/>_check" value="<s:property value="listaIdApego[#labo.index]"/>"/>
                    </div>
                  </s:iterator>
                  
                  </div>
                  
               </div>
                 
                 <input type="hidden" id="id_laboral_seleccionado" value="ninguno"/>
                  <input type="hidden" id="id_laboral_valor" value="ninguno"/>
               </div>
               <div id="empujeContainer" class="identidadContainer">
               <div class="idListContainer">
                  <div id="empujeListHeader" class="idListHeader"><div class="identitle">Empuje</div></div>
                  <div class="idListBody">
                 <s:iterator value="listaEmpuje" status="empuje">
                    <div class="idListRow">
                     <div class="idListName"><s:property value="listaEmpuje[#empuje.index]"/></div>
                     <div id="<s:property value="listaEmpuje[#empuje.index]"/>" class="idListCheck empujeCheck"></div>
                     <input type="hidden" id="<s:property value="listaEmpuje[#empuje.index]"/>_check" value="<s:property value="listaIdEmpuje[#empuje.index]"/>"/>
                    </div>
                  </s:iterator>
                  
                  </div>
                  
               </div>
                 
                 <input type="hidden" id="id_empuje_seleccionado" value="ninguno"/>
                  <input type="hidden" id="id_empuje_valor" value="ninguno"/>
               
               </div>
               
        
	 </div>
<!-- 
          
        
        -->
        
        
       

         <div class="modal_adv detalle_vac_tit" id="dialog_agregar_idioma" title="Agregar idioma" >
         
             <div class="label_crear"><label>Idioma</label></div> <div class="cobertura combo_style"><s:select id="idioma" name="idiom" cssClass="select_input" 
            list="#{'1':'Español','2':'Ingles','3':'Aleman','4':'Italiano','5':'Frances','6':'Chino','7':'Japones','8':'Portugues'}"/></div>
            <div class="label_crear"><label>Dominio</label></div>
            <div class="cobertura combo_style"> <s:select id="dominio" name="dominio" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/></div>
            <br>
             <input type="hidden" id="parametro_idioma" value=""/>
             <input type="hidden" id="id_idioma" value=""/>
	     </div>

 		<div class="modal_adv detalle_vac_tit" id="dialog_modificar_idioma" title="Modificar idioma" >
               <div class="label_crear"><label>Idioma</label></div> <s:select id="idiomaM" name="idiomM" cssClass="select_input" 
            list="#{'1':'Español','2':'Ingles','3':'Aleman','4':'Italiano','5':'Frances','6':'Chino','7':'Japones','8':'Portugues'}"/>
            <div class="label_crear"><label>Dominio</label></div>
             <s:select id="dominioM" name="dominioM" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/><br>
             <input type="hidden" id="parametro_idiomaM" value=""/>
             <input type="hidden" id="id_idiomaM" value=""/>
	     </div>


	      <div class="modal_adv detalle_vac_tit" id="dialog_eliminar_idioma" title="eliminar idioma" >
               <h1>Esta seguro que desea eliminar este idioma</h1>
               <input type="hidden" id="id_del_idioma" value=""/>
	     </div>
        

        <div class="modal_adv detalle_vac_tit" id="dialog_agregar_software" title="Agregar Software" >
      
               <div class="label_crear"><label>Categoria de Software</label></div> <div class="cobertura combo_style"><select id="swCategoriaList">
             <s:iterator value="listaCategoriaSoftware" status="catSoft">
             <option value="<s:property value="listaIdCategoriaSoftware[#catSoft.index]"/>"><s:property value="listaCategoriaSoftware[#catSoft.index]"/></option>
             </s:iterator>
             </select></div><br>
            <div class="label_crear"><label>Nombre Software</label></div>
            <div class="cobertura combo_style"><select id="softwareList">
             
             </select></div>
             <br>
            <div class="label_crear"><label>Dominio</label></div>
            <div class="cobertura combo_style"><s:select id="dominioSw" name="dominioSw" cssClass="select_input" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/></div>
             <br>
             <input type="hidden" id="sw_parametro" value="" />
             <input type="hidden" id="id_sw" value="" />
	     </div>
	     
	     
	     <div class="modal_adv detalle_vac_tit" id="dialog_modificar_software" title="Modificar Software" >
               <div class="label_crear"><label>Categoria de Software</label></div>
               <div class="cobertura combo_style"><select id="swCategoriaListM">
             <s:iterator value="listaCategoriaSoftware" status="catSoft">
             <option value="<s:property value="listaIdCategoriaSoftware[#catSoft.index]"/>"><s:property value="listaCategoriaSoftware[#catSoft.index]"/></option>
             </s:iterator>
             </select></div>
               <br>
            <div class="label_crear"><label>Nombre Software</label></div>
            <div class="cobertura combo_style"><select id="softwareListM">
             
             </select></div>
             <br>
            <div class="label_crear"><label>Dominio</label></div>
            <div class="cobertura combo_style"><s:select id="dominioSwM" name="dominioSwM" list="#{'10':'10%','20':'20%','30':'30%','40':'40%','50':'50%','60':'60%','70':'70%','80':'80%','90':'90%','100':'100%'}"/></div>
             <br>
             <input type="hidden" id="sw_parametroM" value="" />
             <input type="hidden" id="id_swM" value="" />
	     </div>

	     
	     <div class="modal_adv detalle_vac_tit" id="dialog_agregar_hobbie" title="Hobbies" >
  
  
  <!-- 
          
        
        -->
  
               <div id="hobbie_selector" class="hobbie_selector">
                    
                    <div id="entretenimiento_select" class="selector_container">
               		  <div id="entretenimiento_selector" class="selector"></div>
               		  <div id="entretenimiento_button" class="selector_button">Entretenimiento</div>
               		</div>
                     <div id="deportes_select" class="selector_container">
               		  <div id="deportes_selector" class="selector"></div>
               		  <div id="deportes_button" class="selector_button">Deportes</div>
               		</div>
                     <div id="artes_select" class="selector_container" >
               		  <div id="artes_selector" class="selector"></div>
               		  <div id="artes_button" class="selector_button">Artes</div>
               		</div>
               		
               	
               		
                   <div id="pasatiempos_select" class="selector_container">
               		  <div id="pasatiempos_selector" class="selector"></div>
               		  <div id="pasatiempos_button" class="selector_button">Pasatiempos</div>
               		</div>
               		
               		
               </div>
               
               <div id="deportes_container"class="hobbies_deportes">
                <!-- <div id="deporte_header" class="deporte_header">Deportes</div> -->
                <div id="lista_deportes" class="deporte_lista">
                      <s:iterator value="listaDeportes" status="deporteindex">
                        <div id="hobbie_row_<s:property value="listaIdDeportes[#deporteindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdDeportes[#deporteindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdDeportes[#deporteindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdDeportes[#deporteindex.index]"/>" class="hobbie_name"><s:property value="listaDeportes[#deporteindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
             
            
                
                <div id="artes_container"class="hobbies_block">
               
                 <div id="lista_artes" class="artes_lista">
                      <s:iterator value="listaArtesPlasticas" status="artesindex">
                        <div id="hobbie_row_<s:property value="listaIdArtesPlasticas[#artesindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdArtesPlasticas[#artesindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdArtesPlasticas[#artesindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdArtesPlasticas[#artesindex.index]"/>" class="hobbie_name"><s:property value="listaArtesPlasticas[#artesindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
             
                
                 <div id="entretenimientos_container"class="hobbies_block">
                 
                  <div id="lista_entretenimientos" class="entretenimientos_lista">
                      <s:iterator value="listaEntretenimientos" status="entretenimientosindex">
                        <div id="hobbie_row_<s:property value="listaIdEntretenimientos[#entretenimientosindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdEntretenimientos[#entretenimientosindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdEntretenimientos[#entretenimientosindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdEntretenimientos[#entretenimientosindex.index]"/>" class="hobbie_name"><s:property value="listaEntretenimientos[#entretenimientosindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
                
                <div id="rendimiento_container"class="hobbies_block">
                 <div id="rendimiento_header" class="hobbie_header">Rendimiento</div>
                 <div id="lista_rendimiento" class="rendimiento_lista">
                      <s:iterator value="listaRendimiento" status="rendimientoindex">
                        <div id="hobbie_row_<s:property value="listaIdRendimiento[#rendimientoindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdRendimiento[#rendimientoindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdRendimiento[#rendimientoindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdRendimiento[#rendimientoindex.index]"/>" class="hobbie_name"><s:property value="listaRendimiento[#rendimientoindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
              
                
                 <div id="juegos_container"class="hobbies_block">
                 <div id="juegos_header" class="hobbie_header">Juegos de Mesa</div>
                 <div id="lista_juegos" class="juegos_lista">
                      <s:iterator value="listaJuegosDeMesa" status="juegosindex">
                        <div id="hobbie_row_<s:property value="listaIdJuegosDeMesa[#juegosindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdJuegosDeMesa[#juegosindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdJuegosDeMesa[#juegosindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdJuegosDeMesa[#juegosindex.index]"/>" class="hobbie_name"><s:property value="listaJuegosDeMesa[#juegosindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
                
                <div id="aficiones_container"class="hobbies_block">
                 <div id="aficiones_header" class="hobbie_header">Aficiones</div>
                 <div id="lista_aficiones" class="aficiones_lista">
                      <s:iterator value="listaAficiones" status="aficionesindex">
                        <div id="hobbie_row_<s:property value="listaIdAficiones[#aficionesindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdAficiones[#aficionesindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdAficiones[#aficionesindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdAficiones[#aficionesindex.index]"/>" class="hobbie_name"><s:property value="listaAficiones[#aficionesindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
            
                
                 <div id="pasatiempos_container"class="hobbies_block ">
                 
                 <div id="lista_pasatiempos" class="pasatiempos_lista">
                      <s:iterator value="listaPasatiempos" status="pasatiemposindex">
                        <div id="hobbie_row_<s:property value="listaIdPasatiempos[#pasatiemposindex.index]"/>" class="hobbie_container">
                            <div id="hobbiecasilla_<s:property value="listaIdPasatiempos[#pasatiemposindex.index]"/>" class="hobbie_cell hobbie_<s:property value="listaIdPasatiempos[#pasatiemposindex.index]"/>"></div>
                            <div id="hobbie_name_<s:property value="listaIdPasatiempos[#pasatiemposindex.index]"/>" class="hobbie_name"><s:property value="listaPasatiempos[#pasatiemposindex.index]"/></div>
                        </div>
                      </s:iterator>
                 </div>
                </div>
               
                
                
                
               <br/> <br/>
                
               
               <input type="hidden" id="number_hobbie_cell" value="" />
               <input type="hidden" id="hobbie_seleccionado" value="ninguno" />
	     </div>
	     
	    
	     <div class="modal_adv detalle_vac_tit" id="dialog_agregar_talento" title="Talentos" >
	     
	         <div id="talentConf">
	           <div id="talentGraph"></div>
	           <div class="idTalentContainer">
               <INPUT TYPE="HIDDEN" id="rred" value="<s:property value="%{porred}"/>"/>
               <INPUT TYPE="HIDDEN" id="rblue" value="<s:property value="%{porblue}"/>"/>
               <INPUT TYPE="HIDDEN" id="ryellow" value="<s:property value="%{poryellow}"/>"/>
               <INPUT TYPE="HIDDEN" id="rgold" value="<s:property value="%{porgold}"/>"/>
	           <div id="redPorc" class="porc_display"><s:label name="porred" value="%{porred}"/>%</div><div id="red_box" class="talent_box"></div><div class="cobertura combo_style"><select id="talentoRed" >
	           <s:set name="chred" value="%{red}"/>
	           <s:if test="%{#chred=='' || #chred==null}">
	           <option>Seleccione</option>
	           </s:if>
               <s:iterator value="listaTalentos" status="talentos">
               <s:set name="quired" value="listaTalentos[#talentos.index]"/>
	           <s:if test="%{#quired==#chred}">
	           <option selected="selected" value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
	           </s:if>
	           <s:else>
               <option value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
               </s:else>
               </s:iterator>
               </select></div><br>
               <div id="bluePorc" class="porc_display"><s:label name="porblue" value="%{porblue}"/>%</div><div id="blue_box" class="talent_box"></div><div class="cobertura combo_style"><select id="talentoBlue" class="select_input">
              	 <s:set name="chblue" value="%{blue}"/>
               <s:if test="%{#chblue=='' || #chblue==null}">
	           <option>Seleccione</option>
	           </s:if>
               <s:iterator value="listaTalentos" status="talentos">
               <s:set name="quiblue" value="listaTalentos[#talentos.index]"/>
	           <s:if test="%{#quiblue==#chblue}">
	           <option selected="selected" value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
	           </s:if>
	           <s:else>
               <option value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
               </s:else>
               </s:iterator>
               </select></div><br>
               <div id="yellowPorc" class="porc_display"><s:label name="poryellow" value="%{poryellow}"/>%</div><div id="yellow_box" class="talent_box"></div><div class="cobertura combo_style"><select id="talentoYellow" class="select_input">
               	 <s:set name="chyellow" value="%{yellow}"/>
               <s:if test="%{#chyellow=='' || #chyellow==null}">
	           <option>Seleccione</option>
	           </s:if>
               <s:iterator value="listaTalentos" status="talentos">
               <s:set name="quiyellow" value="listaTalentos[#talentos.index]"/>
	           <s:if test="%{#quiyellow==#chyellow}">
	           <option selected="selected" value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
	           </s:if>
	           <s:else>
               <option value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
               </s:else>
               </s:iterator>
               </select></div><br>
               <div id="goldPorc" class="porc_display"><s:label name="porgold" value="%{porgold}"/>%</div><div id="gold_box" class="talent_box"></div><div class="cobertura combo_style"><select id="talentoGold" class="select_input">
               	 <s:set name="chgold" value="%{gold}"/>
               <s:if test="%{#chgold=='' || #chgold==null}">
	           <option>Seleccione</option>
	           </s:if>
               <s:iterator value="listaTalentos" status="talentos">
               <s:set name="quigold" value="listaTalentos[#talentos.index]"/>
	           <s:if test="%{#quigold==#chgold}">
	           <option selected="selected" value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
	           </s:if>
	           <s:else>
               <option value="<s:property value="listaIdTalentos[#talentos.index]"/>"><s:property value="listaTalentos[#talentos.index]"/></option>
               </s:else>
               </s:iterator>
               </select></div><br>
	           <div id="descripcion_talento">Selecciona los 4 talentos que m&aacute;s te definen y arrastra los tri&aacute;ngulos en la gr&aacute;fica el porcentaje de cada uno.</div>
	           
	          
                  
               </div>
               <input type="hidden" id="tColor" value=""/>
               <input type="hidden" id="hold" value="up"/>
               <input type="hidden" id="circle" value=""/>
               <input type="hidden" id="gradoActualRed" value="60"/>
               <input type="hidden" id="gradoActualBlue" value="90"/>
               <input type="hidden" id="gradoActualGreen" value="135"/>

               <s:if test="%{#rred==''}">
               <input type="hidden" id="porcentajeRed" value="25"/>
               </s:if>
               <s:else>
                <input type="hidden" id="porcentajeRed" value="<s:property value="%{porred}"/>"/>
               </s:else>
               <s:if test="%{#rblue==''}">
               <input type="hidden" id="porcentajeBlue" value="25"/>
               </s:if>
               <s:else>
               <input type="hidden" id="porcentajeBlue" value="<s:property value="%{porblue}"/>"/>
               </s:else>
                <s:if test="%{#ryellow==''}">
               <input type="hidden" id="porcentajeYellow" value="25"/>
               </s:if>
               <s:else>
               <input type="hidden" id="porcentajeYellow" value="<s:property value="%{poryellow}"/>"/>
               </s:else>
                <s:if test="%{#rgold==''}">
               <input type="hidden" id="porcentajeGold" value="25"/>
               </s:if>
               <s:else>
               <input type="hidden" id="porcentajeGold" value="<s:property value="%{porgold}"/>"/>
               </s:else>
               <input type="hidden" id="talentoSeleccionado" value="ninguno"/>
               
	         </div>
                
	     </div>

         <div class="modal_adv detalle_vac_tit" id="dialog_sueldo" title="Sueldo Deseado" >
	       <div class="fec_container">
	       <div class="cobertura combo_style2"><s:select name="sueldoDeseado"  list="#{'5000':'$5,000','7000':'$7,000','9000':'$9,000','11000':'$11,000','13000':'$13,000','15000':'$15,000','17000':'$17,000','19000':'$19,000','22000':'$22,000','25000':'$25,000','30000':'$30,000','40000':'$40,000','50000':'$50,000','60000':'$60,000','70000':'$70,000','80000':'$80,000','90000':'$90,000','100000':'$100,000'}"/></div>
           </div><br>
	       
	       
	     </div>

       
          <div class="modal_adv detalle_vac_tit" id="dialog_horario" title="Horario Preferido" >
	       <div class="fec_container"><div class="cobertura combo_style2"> <s:select name="horarioDeseado"  list="#{'Cualquiera':'Cualquiera','Tiempo Completo':'Tiempo Completo','Medio Tiempo':'Medio Tiempo','Por Horas':'Por Horas','Desde Casa':'Desde Casa'}"/></div>
          
           </div><br>
	   
	       
	   
	       
	       
	     </div>
        

        
        <div class="modal_adv detalle_vac_tit" id="dialog_disposicion" title="Disposici&oacute;n de" >
        
	        <div class="label_crear"><label>Disposici&oacute;n de Viajar</label></div><s:select id="dispoViajar" name="dispoViajar" cssClass="combofechas" list="#{'SI':'Si','NO':'No' }"/><br>
            <div class="label_crear"><label>Disposici&oacute;n de Mudanza</label></div><s:select id="dispoMudanza" name="dispoMudanza" cssClass="combofechas" list="#{'SI':'Si','NO':'No'}"/><br>
	   
	    </div>
        
  
        
        <div class="modal_adv detalle_vac_tit" id="dialog_habilidad" title="Habilidades" >
        
	        <div ><label>Describa brevemente alguna habilidad</label></div>
           <textarea id="otra_habilidad" rows="5" cols="40" ></textarea>
	   
	    </div>
        
   
        <div class="modal_adv detalle_vac_tit" id="dialog_area_interes" title="Area de Interes" >
           <label>Principal</label>
            <div class="cobertura combo_style"><s:select
					id="areaInteres" 
					name="areaInteres"
					list="#{'Selecciona':'Selecciona','Todas':'Todas','Administrativos':'Administrativos','Biologia':'Biologia','Comunicaciones':'Comunicaciones','Construccion':'Construccion','Contabilidad':'Contabilidad',
					'Creatividad, Productividad y Diseño Comrecial':'Creatividad, Productividad y Diseño Comrecial','Derecho y Leyes':'Derecho y Leyes','Educacion':'Educacion',
					'Ingenieria':'Ingenieria','Logistica, Transportacion y Distribucion':'Logistica, Transportacion y Distribucion','Manufactura, Produccion y Operacion':'Manufactura, Produccion y Operacion',
					'Mercadotecnia, Publicidad y Relaciones Publicas':'Mercadotecnia, Publicidad y Relaciones Publicas','Recursos Humanos':'Recursos Humanos','Salud y Belleza':'Salud y Belleza',
					'Sector Salud':'Sector Salud','Seguro y Reaseguro':'Seguro y Reaseguro','Tecnologias de la Informacion/Sistemas':'Tecnologias de la Informacion/Sistemas',
					'Turismo, Hospitalidad y Gastronomia':'Turismo, Hospitalidad y Gastronomia','Ventas':'Ventas','Veterinaria / Zoologia'}"
				/></div>
				<br>
			<label>Alternativa</label>
            <div class="cobertura combo_style"><s:select
					id="areaInteres2" 
					name="areaInteres2"
					list="#{'Selecciona':'Selecciona','Todas':'Todas','Administrativos':'Administrativos','Biologia':'Biologia','Comunicaciones':'Comunicaciones','Construccion':'Construccion','Contabilidad':'Contabilidad',
					'Creatividad, Productividad y Diseño Comrecial':'Creatividad, Productividad y Diseño Comrecial','Derecho y Leyes':'Derecho y Leyes','Educacion':'Educacion',
					'Ingenieria':'Ingenieria','Logistica, Transportacion y Distribucion':'Logistica, Transportacion y Distribucion','Manufactura, Produccion y Operacion':'Manufactura, Produccion y Operacion',
					'Mercadotecnia, Publicidad y Relaciones Publicas':'Mercadotecnia, Publicidad y Relaciones Publicas','Recursos Humanos':'Recursos Humanos','Salud y Belleza':'Salud y Belleza',
					'Sector Salud':'Sector Salud','Seguro y Reaseguro':'Seguro y Reaseguro','Tecnologias de la Informacion/Sistemas':'Tecnologias de la Informacion/Sistemas',
					'Turismo, Hospitalidad y Gastronomia':'Turismo, Hospitalidad y Gastronomia','Ventas':'Ventas','Veterinaria / Zoologia'}"
				/></div>
				
	     </div>
        

        <div class="modal_adv detalle_vac_tit" id="dialog_foto" title="Agregar Foto" >
	       <s:form id="foto_upload" theme="simple" action="ActualizarFoto" method="POST" enctype="multipart/form-data">
	         <div id="fotoCont">
	           <s:file id="foto" name="foto"></s:file>
	         </div>
           </s:form>
           <s:submit id="guardar_foto" name="guardar_foto" cssClass="guardarBtn" value="Guardar"></s:submit>
	     </div>
	     
	     
	     
</body>
</html>