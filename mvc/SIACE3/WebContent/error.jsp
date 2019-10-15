<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"> -->
<link href="./css/bootstrap.min.css" rel="stylesheet">
<link href="./css/jasny-bootstrap.min.css" rel="stylesheet">
<title>Error</title>
<script type="text/javascript">
function back(){
 	location.href="/SIACE/Acceso";
}
</script>
</head>
<body style="background: #D5D5D5;">
<center>
	<h3>La carga del archivo no se pudo completar, por el siguiente error:</h3>
	<img alt="error" src="images/error-icon.png" />
	<h4><%= request.getAttribute("error") %></h4>
	<input type="button" value="Regresar" class="btn btn-primary" onclick="back()" />
</center>
<script src="./js/jquery-1.10.2.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/jasny-bootstrap.min.js"></script>
<script src="./js/docs.min.js"></script>
</body>
</html>