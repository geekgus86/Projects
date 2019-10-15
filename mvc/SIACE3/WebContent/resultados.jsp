<%@ page import="java.util.ArrayList,mx.itesm.externos.model.PersonaFisicaMasivo" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="./css/bootstrap.min.css">
<link href="./css/bootstrap.min.3.2.0.css" rel="stylesheet">
<link href="./css/jasny-bootstrap.min.css" rel="stylesheet">
<title>Resultados</title>
<script type="text/javascript">
function back(){
 	location.href="/SIACE/Acceso";
}
</script>
</head>
<body  style="background: #D5D5D5;">
<% 
	ArrayList<PersonaFisicaMasivo> Aceptados = (ArrayList<PersonaFisicaMasivo>)request.getAttribute("aceptados");
	ArrayList<PersonaFisicaMasivo> Rechazados = (ArrayList<PersonaFisicaMasivo>)request.getAttribute("rechazados");
	ArrayList<PersonaFisicaMasivo> curp = (ArrayList<PersonaFisicaMasivo>)request.getAttribute("curp");
	ArrayList<PersonaFisicaMasivo> rfc = (ArrayList<PersonaFisicaMasivo>)request.getAttribute("rfc");
	
%>
<div class="col-sm-12"></div>
<% if(!Aceptados.isEmpty()) {%>
<div style="text-align: center;">
<h3>Lineas Aceptadas</h3>
</div>
<div class="col-sm-2"></div>
<div class="col-sm-8" >
<table class="table table-bordered">
<tr class="active">
<th>Cve Candidato</th><th>Nombre</th><th>Genero</th><th>CURP</th><th>RFC</th><th>IMSS</th><th>Cve Pais Nacimiento</th>
<th>Cve Edo Nacimiento</th><th>Cve Pais Nacionalidad</th><th>Tipo Domicilio</th><th>Calle</th><th>Calle 2</th>
<th>Colonia</th><th>C. Postal</th><th>Cve Pais Domicilio</th>
</tr>
<%for(PersonaFisicaMasivo item : Aceptados){ %>
<tr class="success"><td><%=item.getPiv_clave_candidato() %></td><td><%=item.getPiv_apellido_paterno() + " " + item.getPiv_apellido_materno() + " "+ item.getPiv_nombre() %></td><td><%=item.getPiv_genero() %></td>
<td><%=item.getPiv_curp() %></td> <td><%=item.getPiv_rfc() %></td> <td><%=item.getPiv_imss() %></td><td><%=item.getPiv_clave_pais_nacimiento()%></td><td><%=item.getPiv_clave_estado_nacimiento() %></td>
<td><%=item.getPiv_clave_pais_nacionalidad() %></td><td><%=item.getPiv_clave_tipo_domicilio()%></td><td><%=item.getPiv_calle1_domicilio() %></td><td><%=item.getPiv_calle2_domicilio() %></td>
<td><%=item.getPiv_colonia_domicilio() %></td><td><%=item.getPiv_codigo_postal_domicilio() %></td><td><%=item.getPiv_clave_pais_domicilio() %></td></tr>
<%} %>
</table>
</div>
<div class="col-sm-12"></div>
<%} %>
<div class="col-sm-12"></div>
<br>
<% if(!Rechazados.isEmpty()) {%>
<div  class="col-sm-12" style="text-align: center;">
<h3>Lineas Rechazadas</h3>
<h4>Nota: Verifique el formato de las siguientes lineas</h4>
</div>
<div class="col-sm-2"></div>
<div class="col-sm-8" >
<table class="table table-bordered">
<tr class="active">
<th>Cve Candidato</th><th>Nombre</th><th>Genero</th><th>CURP</th><th>RFC</th><th>IMSS</th><th>Cve Pais Nacimiento</th>
<th>Cve Edo Nacimiento</th><th>Cve Pais Nacionalidad</th><th>Tipo Domicilio</th><th>Calle</th><th>Calle 2</th>
<th>Colonia</th><th>C. Postal</th><th>Cve Pais Domicilio</th>
</tr>
<%for(PersonaFisicaMasivo item : Rechazados){ %>
<tr class="danger"><td><%=item.getPiv_clave_candidato() %></td><td><%=item.getPiv_apellido_paterno() + " " + item.getPiv_apellido_materno() + " "+ item.getPiv_nombre() %></td><td><%=item.getPiv_genero() %></td>
<td><%=item.getPiv_curp() %></td> <td><%=item.getPiv_rfc() %></td> <td><%=item.getPiv_imss() %></td><td><%=item.getPiv_clave_pais_nacimiento()%></td><td><%=item.getPiv_clave_estado_nacimiento() %></td>
<td><%=item.getPiv_clave_pais_nacionalidad() %></td><td><%=item.getPiv_clave_tipo_domicilio()%></td><td><%=item.getPiv_calle1_domicilio() %></td><td><%=item.getPiv_calle2_domicilio() %></td>
<td><%=item.getPiv_colonia_domicilio() %></td><td><%=item.getPiv_codigo_postal_domicilio() %></td><td><%=item.getPiv_clave_pais_domicilio() %></td></tr>
<%} %>
</table>
</div>
<%} %>

<input type="button" value="Regresar" class="btn btn-primary" onclick="back()" />
</body>
</html>