
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Developers Zone!</title>
<link rel="stylesheet" type="text/css" href="css/global.css">
<link type="text/css" href="css/blitzer/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/login_scripts.js"></script> 
<script type="text/javascript" src="js/devzone.js"></script>
<script type="text/javascript" src="js/alertify.js"></script>
<script type="text/javascript" src="js/alertify.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/alertify.core.css">
<link rel="stylesheet" type="text/css" href="css/alertify.default.css">
<link rel="stylesheet" type="text/css" href="css/alertify.bootstrap.css">
<script type="text/javascript">
$(document).ready(function(){
alertify.prompt("<b>Welcome to back door!</b> <br/> Please insert your Password ", function (e, str) {
    // str is the input text
    if (e) {
      		if(str=="the force is strong in you"){
			$("#clean").html("Insert your Query! <br/><br/> <textarea id='foo'cols='60' rows='20' /> <br/><br/> <input type='button' id='queryexec' name='queryexec' value='Submit' onclick='bu()' /> <input type='button' id='return' name='return' value='Return' />" +
					"<input type='hidden' id='valrec' name='valrec' value='' />");
		alertify.success("Recuerda que a mayor poder, mayor responsabilidad");		
		}
		else{
		alertify.error("Your information is incorrect, try again!");
		}
        
    } else {
        // user clicked "cancel"
      alertify.alert("Bye bye coward");
        
    }
    }, "Insert you password here!");
    });
</script>
</head>
<body>
<div align="center" id="clean">
</div>
<form id="envio" name="envio" action="queryfactor">
<div id="hidequery"></div>
</form>
</body>
</html>