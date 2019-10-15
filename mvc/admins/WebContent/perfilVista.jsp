<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" /> 
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<script type="text/javascript" src="js/jquerySvg/jquery.svg.js"></script>
<script type="text/javascript" src="js/jquerySvg/jquery.svganim.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/vista_previa_scripts.js"></script>




<title>Perfil Personal</title>
</head>
<body>
<s:set name="viaje" value="viaje"/>
<s:set name="mudanza" value="mudanza"/>
<a style="cursor:pointer; color: #B3B3B3; font-size:14px; font-weight: bold; " onClick="cerrarVentana();">Cerrar Ventana</a>
<div id="vista_container" class="container printable">

<div id="usuario_datos">
     
  <div id="datos_personalesV">
   
   <div class="userHeaderV">
     <div class="usr_row">
           <div class="usrhdr_container">
               <div class="hdrlbl">Datos Personales</div>
           </div>
     </div>
     
     <div class="usr_row">
         <div class="usrhdr_container">
             <div class="hdrlbl">Datos de ubicaci&oacute;n</div>
        </div>
     </div>
     
   </div>
   <div id="userBody">
       <div id="usrleft" class="usr_info">
        
         <div id="foto_usr"><img id="foto_user" src="<s:property value="urlFoto"/>"  width="123px" height="125px"/></div>
        <div id="usu_datos">
                
                <div class="nompila"><span id="nombre_span"><s:property value="nombre"/>&nbsp;<s:property value="apellidoPaterno"/>&nbsp;<s:property value="apellidoMaterno"/></span></div>
                <div class="email_row"><label class="labelData">e-mail: &nbsp;</label><s:property value="correous"/></div>
				<div class="name_row"><label class="labelData">RFC: &nbsp;</label><span id="rfc_span"><s:property value="rfc"/></span></div>
				<div class="name_row"><label class="labelData">Fecha de Nacimiento: &nbsp;</label><span id="nac_span"><s:property value="fechaNacimiento"/></span></div>
				<div class="name_row"><label class="labelData">Sexo: &nbsp;</label><span id="sex_span"><s:property value="sexo"/></span></div>
				<div class="name_row"><label class="labelData">CURP: &nbsp;</label><span id="curp_span"><s:property value="curp"/></span></div>
        		<div class="name_row"><label class="labelData">Estado Civil: &nbsp</label><span id="curp_span"><s:property value="estadoCivil"/></span></div>
        </div><!--  -->
       </div>
       <div id="usrright" class="usr_info">
             <div id="casa_usr"></div>
             <div id="infolocal">
                <div class="name_row"><div class="labelnom"><label class="labelData">Calle y Numero: </label></div><div class="dirpila"><s:property value="calleNumero"/></div></div>
				<div class="name_row"><label class="labelData">Colonia: &nbsp;</label><span id="col_span"><s:property value="colonia"/></span></div>
				<div class="name_row"><label class="labelData">Estado: &nbsp;</label><span id="col_span"><s:property value="estado"/></span></div>
				<div class="name_row"><label class="labelData">Municipio/Delegacion: &nbsp;</label><span id="municipio_span"><s:property value="municipioDelegacion"/></span></div>
				<div class="name_row"><label class="labelData">Codigo Postal: &nbsp;</label><span id="cp_span"><s:property value="cp"/></span></div>
				<div class="name_row"><label class="labelData">Telefono Casa: &nbsp;</label><span id="cp_span"><s:property value="telefono"/></span></div>
            	<div class="name_row"><label class="labelData">Telefono Celular: &nbsp;</label><span id="cp_span"><s:property value="telefono_extra"/></span></div>
            </div>
       </div>
   </div>
   
  </div>
  
  <div id="idiomasV">
      <div id="idiomas_header">
          <div id="idiomas_h">Idiomas</div>
      </div>
      <div id="idiomas_body">
      <s:iterator value="listaIdioma" status="idioma">
         <div id="<s:property value="listaIdIdioma[#idioma.index]"/>_row" class="idioma_rowV">
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

<div id="personalInfoSeparator" class="BigVerticalSeparator"></div>

<div id="infoheader" class="infoheader">
 <div id="trayectoria">Trayectoria Laboral y de Educaci&oacute;n</div>

</div>

<div id="infografia">

</div>


<div class="BigVerticalSeparator"></div>
<div id="informacionV">
   <div id="info_der">
        <div id="info_perV">
           <div id="per_header" class="userHeaderV">
              <div id="talentos_head" class="per_head talentos_head"><div id="Tllbl">Talentos</div></div>
              <div id="identidad_head" class="identidad_head per_head">Personalidad</div>
              <div id="hobi_head" class="hobi_head per_head"><div id="Hoblbl">Hobbies</div></div>
              <div class="swHeaderV"><div id="sw_h">Software</div></div>
           </div>
           <div id="per_body">
             <div id="talentos_body" class="per_body talentos_head">
             
              <div id="talentos"></div>
            
             </div><!-- 
              <div  class="verticalSeparator"></div> -->
              <div id="identidad_body" class="identidad_head per_body">
                    <div class="id_container">
                      <div id="impacto"  class="id_title impacto"><div class="lblid">Persuasion</div></div>
                      <div id="Impacto_content" class="id_content impacto"><s:property value="persuasion"/></div>
                    </div>
                    <div class="id_container">
                      <div class="id_title interrelacion" id="interrelacion" ><div  class="lblid">Constancia</div></div>
                      <div id="Interrelacion_content" class="id_content interrelacion"><s:property value="constancia"/></div>
                    </div>
                    <div class="id_container">
                      <div class="id_title laboral" id="laboral"><div  class="lblid">Apego</div></div>
                      <div id="Laboral_content" class="id_content laboral"><s:property value="apego"/></div>
                    </div>
                    <div class="id_container">
                      <div class="id_title empuje" id="empuje"><div  class="lblid">Empuje</div></div>
                      <div id="Empuje_content" class="id_content empuje"><s:property value="empuje"/></div>
                    </div>
                    
              </div><!--  
               <div  class="verticalSeparator"></div>-->
              <div id="hobi_body" class="hobi_head per_body">
                 <div id="hobbie_list">
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
              <div id="softwareV">
         
         <div id="swBody" class="swBody">
          
           <s:iterator value="listaSoftwareUsuario" status="usuSoft">
             <div  id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swrow" class="swrow">
                <div id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swname" class="swname"><s:property value="listaSoftwareUsuario[#usuSoft.index]"/></div>
                <div id="<s:property value="listaIdSoftwareUsuario[#usuSoft.index]"/>_swdom"  class="swdom"><s:property value="listaDominioSoftware[#usuSoft.index]"/>%</div>
             </div>
           </s:iterator>
           
           
         </div>
          <div id="habilidadesV">
               <div id="skills_header"class="swHeaderV"><div id="skill_h">Habilidades</div></div>
                  <div id="skillbody">
                        <s:iterator value="listaSkill" status="skill">
                          <div id="skillRow_<s:property value="listaIdSkill[#skill.index]"/>" class="skill_rowV"><s:property value="listaSkill[#skill.index]"/></div>
                       </s:iterator>
                  </div>
          </div>
         
       </div>
              
              
           </div>
           
           
        </div>
        
        <div class="BigVerticalSeparator"></div>
        
        <div id="info_ecoV">
             <div id="eco_header" class="userHeaderV">
               <div id="sal_header" class="sal_header eco_head"><div></div>Salario deseado</div>
               <div id="hora_header" class="hora_header eco_head">Horario Preferido</div>
               <div id="dispo_header" class="dispo_header eco_head">Disposici&oacute;n de</div>
               <div id="inter_header" class="inter_header eco_head">&Aacute;rea de Interes</div>
               
            
           </div>
           <div id="eco_body">
              <div  id="saldeseado" class="sal_header"><div id="sal_img" class="eco_imgV"></div><div id="sal_container" class="eco_container"><label>Mas de:</label><br/><label id="money_label">$<s:property value="sueldoDeseado"/></label><br/><label>Mensuales</label></div></div>
               <div  id="hora_container" class="hora_header eco_body"><div id="hora_img" class="eco_imgV"></div><div id="time_container" class="eco_container"><s:property value="horarioDeseado"/></div></div>
               <div id="dispoBody" class="dispo_header eco_body">
               <div  id="viaje_dispoV" class="inner_dispo">
                 <div id="viaje_img" class="dispo_img"></div><div id="viaje_container" class="dispo_container"><label>Viajar</label><br/>   
                 <s:if test="%{#viaje=='SI'}">
	               <label id="travel_label" style="color:#2E8B57;"><s:property value="viaje"/></label>
				</s:if>
                 <s:elseif test="%{#viaje=='NO'}">
                   <label id="travel_label" style="color:#DC143C;"><s:property value="viaje"/></label>
				</s:elseif></div>
               </div>
               <div  id="muda_dispo"  class="inner_dispo">
                <div  id="muda_img" class="dispo_img"></div><div id="muda_container" class="dispo_container"><label>Cambio de Residencia</label><br/><s:if test="%{#mudanza=='SI'}">
	                <label id="mobi_label" style="color:#2E8B57;"><s:property value="mudanza"/></label>
				</s:if>
                 <s:elseif test="%{#mudanza=='NO'}">
                    <label id="mobi_label" style="color:#DC143C;"><s:property value="mudanza"/></label>
				</s:elseif></div>
               </div>
               
               </div>
               <div id="inter_container" class="inter_header eco_body"><s:property value="areaDeInteres"/></div>
              
              
           </div>
        </div>
   </div>
  
</div>


 <input id="last" type="hidden" value="primero"></input>
<input id="lastskull" type="hidden" value="primero"></input>
<input id="exp" type="hidden" value="0"></input>
<input id="edu" type="hidden" value="0"></input>
</div>



<div class="modal_adv detalle_vac_tit" id="vista_previa_dialog" title="Exportar a PDF" >
    <div class="otroproceso">
         <label style="font-size:17px;">Resultado</label><div id="mensaje" style="font-size:12px;"></div>
         <div id="lin"><a id="lin_etsel" target="_blank" style="color: crimson; font-size: 12px;"></a></div>
        </div>  
        
</div>


<div class="modal_adv detalle_vac_tit" id="dialog_modificar_escolaridad" title="Escolaridad" >
           <input id="idForm" name="idForm" type="hidden"/>
          <div class="label_crear"><label>Nivel Acad&eacute;mico</label></div> <div class="cobertura combo_style"><input id="nivelAcademicoM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 310px;background-color: #F3F3F3;" /></div><br>
             <div class="label_crear"><label>Institucion Escolar</label></div><s:textfield id="institucionM" name="institucionM" maxlength="40" cssClass="caja_input textos"/><br>
             <div class="label_crear"><label>Pa&iacute;s</label></div><div class="cobertura combo_style"><input id="paisInstitutoM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 310px;background-color: #F3F3F3;" /></div><br>
        <div class="label_crear"><label>Lapso de</label></div><div class="fec_container">
                 <div class="cobertura combofechas"><input id="mesInicioFM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;" /> </div>
              <div class="cobertura combofechas"><input id="anioInicioFM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;" /></div>
              
       </div><br><br/><br/>
        <div class="label_crear"><label id="afaml">a</label></div><div class="fec_container">
        <div id="mesFinContainerFM" class="cobertura combofechas"><input id="mesFinFM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;" /></div>
             <div id="anioFinContainerFM" class="cobertura combofechas"><input id="anioFinFM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;" /></div>
      </div><br>
      <div class="label_crear"><label>Estudio aqu&iacute; actualmente</label><input type="checkbox" id="estudioActualM" name="estudioActualM" class="actualCheck" /></div><br/><br/><br/>
        <div class="label_crear"><label>Estatus</label></div> <div class="cobertura combo_style"><input id="statusM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 310px;background-color: #F3F3F3;" /></div><br>
</div>

<div class="modal_adv detalle_vac_tit" id="dialog_modificar_experiencia" title="Experiencia" >
        <input type="hidden" id="idExp" name="idExp"/>
        <div class="label_crear"><label>Empresa</label></div><s:textfield readonly="readonly" name="nombreEmpresaM" maxlength="60" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>Puesto</label></div><s:textfield readonly="readonly" name="puestoM" maxlength="50" cssClass="caja_input textos"/><br>
        <div class="label_crear"><label>Periodo de</label></div><div class="fec_container">
            <div class="cobertura combofechas"><input id="mesInicioEM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;"  /></div>
         <div class="cobertura combofechas"><input id="anioInicioEM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;" /></div>

    </div><br>
        <div class="label_crear"><label id="aexpml">a</label></div><div class="fec_container">  
           <div id="mesFinContainerEM" class="cobertura combofechas"><input id="mesFinEM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;"  /></div> 
           <div id="anioFinContainerEM" class="cobertura combofechas"><input id="anioFinEM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;"  /></div>
    </div><br/><br/>
        <div class="labelt"><label>Trabajo aqu&iacute; actualmente</label><input type="checkbox" id="trabajoActualM" name="trabajoActualM" class="actualCheck" /></div><br/><br/>
        <div class="label_crear"><label>Sueldo Mensual</label></div><div class="cobertura combo_style"><input id="sueldoEmpresaM" readonly="readonly" style="border: medium none;margin-left: 10px;margin-top: 5px;width: 133px;background-color: #F3F3F3;"  /></div><br>
        <div ><label>Detalle brevemente sus funciones</label></div>
         <s:textarea name="funcionesEmpresaM" cols="65" rows="6" cssClass="area_input"></s:textarea>
        
 </div>

</body>
</html>