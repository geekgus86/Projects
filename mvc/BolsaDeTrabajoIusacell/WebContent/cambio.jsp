<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="/struts-tags" prefix="s"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Cambio</title>
</head>
<body>
<div>TABLAS</div>
<table>
<thead>
<tr>
  <td>ID</td>
  <td>Tabla</td>
  <td></td>
</tr>
</thead>
<tbody>
<s:iterator value="hobbie" status="hob">
<tr>
  <td><s:property value="id_hob[#hob.index]"/></td>
  <td><s:property value="hobbie[#hob.index]"/></td>
  <td><s:property value="categoria[#hob.index]"/></td>
</tr>
</s:iterator>
</tbody>
</table>

<div>CAMPOS</div>

<table>
<thead>
<tr>
  <td>table_name</td>
  <td>column_name</td>
  <td>data_type</td>
  <td>column_length</td>
  
</tr>
</thead>
<tbody>
<s:iterator value="table_name" status="tab">
<tr>
  <td><s:property value="table_name[#tab.index]"/></td>
  <td><s:property value="column_name[#tab.index]"/></td>
  <td><s:property value="data_type[#tab.index]"/></td>
  <td><s:property value="column_length[#tab.index]"/></td>
  
</tr>
</s:iterator>
</tbody>
</table>



</body>
</html>