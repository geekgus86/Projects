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
<title>File Upload</title>
<script type="text/javascript">
$("#fileUP").change(function() {

    var val = $(this).val();

    switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
        case 'txt': 
            alert("an image");
            break;
        default:
            $(this).val('');
            // error message here
            alert("not an image");
            break;
    }
});
</script>
</head>
<body style="background: #D5D5D5;">
<center>
	<h1>Carga de Archivo</h1>
	<form method="post" action="UploadController" enctype="multipart/form-data">
		<div class="col-sm-4"></div>
		<div class="col-sm-4" >
		<div class="fileinput fileinput-new input-group" data-provides="fileinput" >
  			<div class="form-control" data-trigger="fileinput"><i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div>
  			<span class="input-group-addon btn btn-default btn-file"><span class="fileinput-new">Seleccione Archivo</span><span class="fileinput-exists">Cambiar</span><input type="file" name="file" size="60"></span>
  			<a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Eliminar</a>
		</div>
		<!-- Seleccione Archivo: <input type="file" name="file" size="60" class="file" /><br /> -->
		<br /> <input type="submit" value="Procesar" class="btn btn-primary" />
		</div>
	</form>
</center>
<script src="./js/jquery-1.10.2.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script src="./js/jasny-bootstrap.min.js"></script>
<script src="./js/docs.min.js"></script>
</body>
</html>