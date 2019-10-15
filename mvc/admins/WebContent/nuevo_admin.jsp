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
<script type="text/javascript" src="js/crear_admin.js" ></script>
<title>Nuevo Administrador</title>
</head>
<body>
   <div id="content"> 
       <s:form theme="simple" action="CrearAdmin" method="POST" enctype="multipart/form-data" accept-charset="utf-8,iso-8859-1">
		<div id="content-adm">
		    <span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a></span>
			<h1>Nuevo Administrador</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Complete los siguientes Datos para dar de alta al Usuario</div><br/>
			
			<div class="data_container1" style="height: 360px;">
				<div class="instrucciones_new_vac">Informaci&oacute;n General</div>
				<div class="nuev_vac_izq">
					<label>Nombre</label><s:textfield id="nombre" name="nombre" cssClass="campo_text" value="%{nombre}" maxlength="100" style="background-color: #FFFFFF;border: 1px solid #C1C1C1;border-radius: 3px 3px 3px 3px;color: #666666;float: left;height: 18px;margin-bottom: 14px;margin-left: 2px;margin-right: 15px;padding: 5px 12px;width: 260px;"></s:textfield><br/>
					<label>Contraseña</label><s:password  id="cec" name="cec" cssClass="campo_text" value="%{cec}" maxlength="20" style="background-color: #FFFFFF;border: 1px solid #C1C1C1;border-radius: 3px 3px 3px 3px;color: #666666;float: left;height: 18px;margin-bottom: 14px;margin-left: 2px;margin-right: 15px;padding: 5px 12px;width: 260px;"></s:password><br/>
					<label>Correo Electronico</label><s:textfield id="email" name="email" cssClass="campo_text" value="%{email}" maxlength="70" style="background-color: #FFFFFF;border: 1px solid #C1C1C1;border-radius: 3px 3px 3px 3px;color: #666666;float: left;height: 18px;margin-bottom: 14px;margin-left: 2px;margin-right: 15px;padding: 5px 12px;width: 260px;"></s:textfield><br/>
					<label>Nivel</label>
					
					 <div class="coberturaBC" >   
					   	<s:select id="nivelAdmin" name="nivelAdmin"  list="#{'2':'Administrador [WEB]','3':'Administrador','4':'Administrador Regional - Calificador'}" />
					 </div>
					
					
					<!--  <label>Ubicacion</label>
					 <div class="coberturaBC" >
							<select id="estado" name="estado" >
	 							<option value="0" selected="selected">Selecciona</option>
	 				
		 							<s:iterator id="listadoEstados" value="estado" status="it">
	 									<option value="<s:property value='estado_id[#it.index]'/>"><s:property value='estado[#it.index]'/></option>
	 								</s:iterator>
	 								
								</select>
 					 </div>-->
 											
 											
					
					<s:hidden id="ubicacion" name="ubicacion" cssClass="campo_text"  maxlength="160" value="Hidalgo" style="width:290px;"></s:hidden>
					
					
					 
					 <s:hidden id="regionH" name="region" cssClass="campo_text"  maxlength="160" value="1" style="width:290px;"></s:hidden>
					 
					 
					 							
					<label>Estado Admin</label>
					
								<div class="coberturaBC" >
											<select id="estatus" name="estatus" >
 													<option value="Activo" selected="selected">Selecciona</option>
								 					<option value="Activo">Activo</option>
													<option value="Bloqueado">Bloqueado</option>
								
											</select>
								</div>
								
				</div>
			</div>
			
			<div class="campo_form3">
				<div class="instrucciones_new_vac3">Asegurese de que todos los datos ingresados anteriormente son correctos antes de Guardar</div>
				
				 <div id="enviarAdmin" class="btn_save"></div>
			</div>
		</div>
		</s:form>
	</div>
</body>
</html>