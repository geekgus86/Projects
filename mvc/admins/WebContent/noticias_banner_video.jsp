<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<script type="text/javascript" src="js/noticias_banner_video_scripts.js"></script>
<script type="text/javascript" src="js/jquery/jquery.qtip-1.0.0.min.js"></script> 
<title>Noticias[Banner] y Videos</title>
</head>
<body>


<div id="content"> 
		<div id="content-adm">
		<span><a href="/admins/HomeAdmin">Men&uacute; Principal - </a> <a href="/admins/WebAdmin">Administraci&oacute;n de Red Profesional IUSACELL - </a> </span>
			<h1>Noticias[Banner] y Videos</h1>
			<div class="separacion1"></div>
			<div class="separacion2"></div><br/>
			<div class="instrucciones">Seleccione alguna de las dos Opciones:</div><br/>
			
			
			<div class="opcion" id="chowBanner">Cambiar los Banners</div>
			<div class="opcion" id="chowVideo">Cambiar los Videos</div>
			
			
			
			
			<br/>
			
			<div class="losBanners" id="banner1">
			
			
				 <s:iterator id="banners" value="listaIdBanner" status="idCan">
				 
				
					
					<div style="float:left; margin-left:50px; margin-top:50px;" class="contendorDiv">
					
					<img src="<s:property value="listaRutaBanner[#idCan.index]"/>" height="135" width="260" /> <br/><br/><br/>
					
					<label>IMAGEN ACTUAL: </label><input type="text" name="anteriorIMG" id="anteriorIMG" value="<s:property value="listaRutaBanner[#idCan.index]"/>" class="cajas" />
					
					<br/>
					<br/>
					
					
					<form  method="POST" enctype="multipart/form-data" id="frm<s:property value="listaIdBanner[#idCan.index]"/>">
 
 					
						<input type="file" name="url_banner" id="url_banner<s:property value="listaIdBanner[#idCan.index]"/>" label="Nueva Imagen" size="20" class="cajas" />
						 
						
						
						<input type="hidden" name="id_banner" id="id_banner" value="<s:property value="listaIdBanner[#idCan.index]"/>" />
					 
					</form>
					
					<button id="CambiaIMG<s:property value="listaIdBanner[#idCan.index]"/>" class="btn_log2" >Cambiar</button>
					
					
					
					
					
					
					
					</div>
					
				</s:iterator>
				
					
				
			</div>
			
			<div class="losVideos" id="videos1">
			
				<s:iterator id="videos"  value="listaIdVideo" status="idCan">
					
					<div style="float:left;float: left;padding: 50px 0 10px 25px;width: 97%;">
						<button id="SwitchVid-<s:property value="listaIdVideo[#idCan.index]"/>">Insertar  Video</button>
						<button id="SwitchLin-<s:property value="listaIdVideo[#idCan.index]"/>">Insertar Link</button>
					</div>
					
					<input type="hidden"  id="elLink<s:property value="listaIdVideo[#idCan.index]"/>" value="<s:property value="listaRutaVideo[#idCan.index]"/>" />
					
					
					<div  id="contieneVideo<s:property value="listaIdVideo[#idCan.index]"/>" style="float:left; margin-left:50px; margin-top:1px;" class="contendorDiv">
					
					<iframe id="AlcenIfram<s:property value="listaIdVideo[#idCan.index]"/>" width="310" height="170" src="<s:property value="listaRutaVideo[#idCan.index]"/>?rel=0" frameborder="0" allowfullscreen></iframe>
					
					<div class="vaAqui<s:property value="listaIdVideo[#idCan.index]"/>"></div>
					
					
					<br/>
					<br/>
					<br/>
					
					<label>VIDEO ACTUAL: </label><input type="text" name="anterior" id="anterior<s:property value="listaIdVideo[#idCan.index]"/>" value="<s:property value="listaRutaVideo[#idCan.index]"/>" class="cajasVideo" /><br/><br/>
					
					<label>NUEVO VIDEO: </label><input type="text" name="nuevo" id="nuevo<s:property value="listaIdVideo[#idCan.index]"/>" class="cajasVideo" />
					
					<button id="Cambia-<s:property value="listaIdVideo[#idCan.index]"/>" class="btn_log1">Cambiar</button>
					
					</div>
					
					
					<div  id="contieneWEB<s:property value="listaIdVideo[#idCan.index]"/>" style="float:left; margin-left:50px; margin-top:50px; margin-right: 50px;" class="contendorDiv">
					
					<div class="vaAqui<s:property value="listaIdVideo[#idCan.index]"/>"></div>
					
					
					<br/>
					<br/>
					<br/>
					
					<label>LINK ACTAUL: </label> <a target="_blank" class="anteLink" id="anteriorLink<s:property value="listaIdVideo[#idCan.index]"/>" href="<s:property value="listaRutaVideo[#idCan.index]"/>"><s:property value="listaRutaVideo[#idCan.index]"/></a><br/><br/>
					
					<label>NUEVO LINK: </label><input type="text" name="nuevo" id="nuevoL<s:property value="listaIdVideo[#idCan.index]"/>" class="cajasLink" />
					
					<button id="Cambiar-<s:property value="listaIdVideo[#idCan.index]"/>" class="btn_log2">Cambiar</button>
					
					</div>
					
					<br/><br/>
					
					
					
				</s:iterator>
				
			</div>
			
		</div>
	</div>



</body>
</html>