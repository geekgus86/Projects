<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/global.css">
<link rel="stylesheet" type="text/css" href="css/iusa.css">
<link rel="stylesheet" type="text/css" href="css/alertify.core.css">
<link rel="stylesheet" type="text/css" href="css/alertify.default.css">
<link rel="stylesheet" type="text/css" href="css/alertify.bootstrap.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/alertify.js"></script>
<script type="text/javascript" src="js/alertify.min.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript">
function confirmSal(){
// confirm dialog
alertify.set({ buttonReverse: true });
alertify.confirm("<img  border='0' src='images/disc_red_ius.png' width='100' height='100' style='display:block;margin:0 auto 0 auto;''>Usted est&aacute; a punto de cerrar sesi&oacute;n.<br/><b>Nota:</b> Verifique que haya guardado todos los cambios antes de finalizar.", function (e) {
    if (e) {
        // user clicked "ok"
        window.location.assign("/BolsaDeTrabajoIusacell/cerrar");
    } else {
        // user clicked "cancel"
        alertify.set({ delay: 5000 });
        alertify.error("<b>Ha cancelado la operaci&oacute;n</b>");
    }
});
}
</script>


<title>Grupo IUSACELL</title>
</head>
<body>


<s:set name="session" value="existe"/>


	 <div class="wrapper">

     <div id="topbar" class="non-printable">
     		
       		
       		<input type="hidden" value="<s:property value="existe"/>" id="sess"/>
       	
       
       	<s:if test="%{#session==0}">
		  
		  <div class="contenedor_logos">
        		<div id="iusalogo">
        			<img  border="0" src="images/logo_nuevo.jpg">
        		</div>
        		
		        <div id="negocios">
		          		<div id="logoiusa" onClick="video_iusa();">
			             <input type="hidden" value="" id="elemntLogoIusa" /> 
			            </div>
			            
			            <div id="unelogo" onClick="video_unefon();">
			             <input type="hidden" value="" id="elemntLogoUne" /> 
			            </div>
			            
			            <div id="enlacelogo" onClick="video_enlace();">
			             <input type="hidden" value="" id="elemntLogoEnlace" /> 
			            </div>
			            
			            <div id="totalogo" onClick="video_tota();">
			             <input type="hidden" value="" id="elemntTotalLogo" /> 
			            </div>
			            
			            <div id="logo_capta" onClick="video_capla();">
			             <input type="hidden" value="" id="elemntCaptaLogo" /> 
			            </div>
		          
		       </div>
       
		       <div id="social">
		       		<div id="social_t"><a target="_blank" href=" https://twitter.com/GrupoIusacell" style="height: 24px;position: absolute;width: 24px;"></a></div><div id="social_f"><a target="_blank" href=" https://www.facebook.com/TalentoGrupoIusacell" style="height: 24px;position: absolute;width: 24px;"></a></div>
		       </div>
       		</div>
		  
		   	<div id="mainmenu" class="mainmenu" style="width: 100%;">
		   		<div id="contieneOpciones" class="conteOpciones">
		     		
	     			<div id="Bienvenido" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="BienvenidoLink" class="colorLink" href="/BolsaDeTrabajoIusacell/login">Bienvenido</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
        			<div id="MiInfografia" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="MiInfografiaLink" class="colorLink" href="/BolsaDeTrabajoIusacell/perfilVista">Mi Infograf&iacutea</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
         			<div id="MisCandidaturas" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="MisCandidaturasLink" class="colorLink" href="/BolsaDeTrabajoIusacell/Candidaturas">Mis Candidaturas</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
	      			<div id="AvisoPriv" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="AvisoPrivLink" class="colorLink" onclick="condiciones()">Aviso de Privacidad</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
	      			
		     	
		     	</div>
	     	</div>
		</s:if>
		<s:else>
		
		<div class="contenedor_logos">
        		<div id="iusalogo">
        			<img  border="0" src="images/logo_nuevo.jpg">
        		</div>
        		
		        <div id="negocios">
		          <div id="logoiusa" onClick="video_iusa();"></div>
		          <div id="unelogo" onClick="video_unefon();"></div>
		          <div id="totalogo" onClick="video_tota();"></div>
		          <div id="logo_capta" onClick="video_capla();"></div>
		          <div id="enlacelogo" onClick="video_enlace();"></div>
		       </div>
       
		       <div id="social">
		       		<div id="social_t"><a target="_blank" href="https://twitter.com/IUSACELL" style="height: 24px;position: absolute;width: 24px;"></a></div><div id="social_f"><a target="_blank" href="https://www.facebook.com/iusacell" style="height: 24px;position: absolute;width: 24px;"></a></div>
		       </div>
		       <div id="cerrar_sesion"><a style="color: #464646;" href="javascript:confirmSal()">Cerrar Sesi&oacute;n<img class="pefi" border="0" src="images/cerrar_sesion.png" width="24" height="24"></a></div>
       		</div>
		
			
	     <div id="sesionmainmenu" class="mainmenu" style="width: 100%;">
	     	<div id="contieneOpciones" class="conteOpciones">
	     		<div id="Bienvenido" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="BienvenidoLink" class="colorLink" href="/BolsaDeTrabajoIusacell/login">Bienvenido</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
        		 <div id="MiInfografia" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="MiInfografiaLink" class="colorLink" href="/BolsaDeTrabajoIusacell/perfilVista">Mi Infograf&iacutea</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
        		 <div id="MisCandidaturas" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="MisCandidaturasLink" class="colorLink" href="/BolsaDeTrabajoIusacell/Candidaturas">Mis Candidaturas</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
        		 <div id="AvisoPriv" class="sesionmenurow"><div class="sesionmenulabel" style="height: 25px;"><a id="AvisoPrivLink" class="colorLink" onclick="condiciones()">Aviso de Privacidad</a><img src="images/raya_rara.png" width="158" height="2" style="float: left;margin-left: 30px;margin-top: 3px;"></div></div>
        		 <div id="Progreso" class="progressrow"><div id="userProgress" class="userProgress"><div id="userTotalProgress" class="userProgress"></div></div><div id="userprogress" class="sesionprogresslabel"> </div></div>
	      		<div id="Opciones" class="opcionmenurow" onclick="document.location.href='/BolsaDeTrabajoIusacell/opciones';"><div class="engrane"></div></div>
	      	</div>
	     </div>
		</s:else>
       	
       	 
       	
       	
       
     </div>
    
    
    
     <div id="content">
     <tiles:insertAttribute name="content"/>
     </div>
     
     
     <div class="push"></div>
     
     </div>
     
     
     

<div class="modal_adv" id="dialog_video_iusa" title="IUSACELL" >
        <iframe id="otroIusa" width="600" height="350" src="" frameborder="0" allowfullscreen></iframe>
</div>

<div class="modal_adv" id="dialog_video_unefon" title="UNEFON" >
        <iframe id="otroUnefon" width="600" height="350" src="" frameborder="0" allowfullscreen></iframe>
</div>


<div class="modal_adv" id="dialog_video_total" title="TOTAL PLAY" >
        <iframe id="otroTota" width="600" height="350" src="" frameborder="0" allowfullscreen></iframe>
</div>

<div class="modal_adv" id="dialog_video_capla" title="CAPLA" >
        <iframe  id="otroCapla" width="600" height="350" src="" frameborder="0" allowfullscreen></iframe>
</div>


<div class="modal_adv" id="dialog_video_enlace" title="ENLACE" >
        <iframe  id="otroEnlace" width="600" height="350" src="" frameborder="0" allowfullscreen></iframe>
</div>
     
     
     <div class="modal_adv" id="dialog_terminos" title="Terminos" >
        
	</div>
	
	<div class="modal_adv" id="dialog_condiciones" title="Politicas de Privacidad" >
	
    	 <img src="images/iusa_logo.png" width="158" height="60" style="display:block;margin:0 auto 0 auto;">
    	
    	<h1  style="text-align:center;">AVISO DE PRIVACIDAD</h1>
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
     
    <div id="bottom_bar2" class="non-printable footer">
    
    	<div id="bottom_bar">
     	<!-- <div class="cuadrito"></div> -->
     	<div class="texto_politicas"><a style="cursor:pointer;" onClick="condiciones();">T&eacute;rminos y condiciones</a> | <a style="cursor:pointer;" onClick="condiciones();">Pol&iacute;ticas de privacidad</a></div>
    </div>
    	
     </div> 

</body>
</html>