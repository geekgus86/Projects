package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.*;


import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;


public class Candidatos {

	private List<String> edad;
	private List<String> grado;
	private List<String> grado_id;
	private List<String> areaInteres;
	private List<String> estado;
	
	private List<BigDecimal> estado_id;
	
	private String edo;

	private BigDecimal edo_id;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	Session session;
	
	public Candidatos(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		llenarArea();
		llenarEdad();
		llenarGrado();
		llenarEstado();
		
		return "success";
	}
	
	public void llenarEdad(){
		edad=new ArrayList<String>();
		
		
		for(int i=15;i<=70;i++){
			String anio=Integer.toString(i);
			edad.add(anio);
		}
		
	}
	
	public void llenarGrado(){
		
		grado=new ArrayList<String>();
		grado_id = new ArrayList<String>();
		
		
		grado.add("Secundaria");
		grado.add("Bachillerato");
		grado.add("Tecnico");
		grado.add("Estudios Superiores");
		grado.add("Diplomado");
		grado.add("Maestria");
		grado.add("Doctorado");
		grado.add("Otro");
		
		grado_id.add("1");
		grado_id.add("2");
		grado_id.add("3");
		grado_id.add("4");
		grado_id.add("5");
		grado_id.add("6");
		grado_id.add("7");
		grado_id.add("8");
		
		
		
	}
	
public void llenarArea(){
		
	   areaInteres=new ArrayList<String>();
	   areaInteres.add("Administrativos");
	   areaInteres.add("Biologia");
	   areaInteres.add("Comunicaciones");
	   areaInteres.add("Construccion");
	   areaInteres.add("Contabilidad");
	   areaInteres.add("Creatividad, Productividad y Diseño Comrecial");
	   areaInteres.add("Derecho y Leyes");
	   areaInteres.add("Educacion");
	   areaInteres.add("Ingenieria");
	   areaInteres.add("Logistica, Transportacion y Distribucion");
	   areaInteres.add("Manufactura, Produccion y Operacion'");
	   areaInteres.add("Mercadotecnia, Publicidad y Relaciones Publicas");
	   areaInteres.add("Recursos Humanos");
	   areaInteres.add("Salud y Belleza");
	   areaInteres.add("Sector Salud");
	   areaInteres.add("Seguro y Reaseguro");
	   areaInteres.add("Tecnologias de la Informacion");
	   areaInteres.add("Turismo, Hospitalidad y Gastronomia");
	   areaInteres.add("Ventas");
	   areaInteres.add("Veterinaria / Zoologia");
	
	}

public void llenarEstado(){
	
     Transaction selectEstado = session.beginTransaction();
	 
     try{
		estado=new ArrayList<String>();
		estado_id = new ArrayList<BigDecimal>();
		 String sql = "SELECT \"estado\".\"id_estado\", \"estado\".\"nombre_estado\" FROM \"estado\"  ORDER BY \"estado\".\"nombre_estado\"";
	     Query query = session.createSQLQuery(sql);
	     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List data = query.list();
	     for (Object object : data) {
	     	Map row = (Map) object;
	     	
	     	edo_id = (BigDecimal)row.get("id_estado");
	     	edo=(String)row.get("nombre_estado");
	     	
	     	estado_id.add(edo_id);
	     	estado.add(edo);
	     	}
	     
	     selectEstado.commit();
     }catch(Exception e){
    	 selectEstado.rollback();
     }
     
     DatosAdmin DA = new DatosAdmin();
     DA.execute();
     idAdministrador = DA.getIdAdministrador();
     correo = DA.getCorreo();
     lvl = DA.getLvl();
     nombreAdmin = DA.getNombreAdmin();
     
     
}

public List<String> getEdad(){
	return edad;
}

public List<String> getGrado(){
	return grado;
}

public List<String> getAreaInteres(){
	return areaInteres;
}

public List<String> getEstado(){
	return estado;
}

public BigDecimal getIdAdministrador() {
	return idAdministrador;
}

public void setIdAdministrador(BigDecimal idAdministrador) {
	this.idAdministrador = idAdministrador;
}

public String getCeC() {
	return ceC;
}

public void setCeC(String ceC) {
	this.ceC = ceC;
}

public String getCorreo() {
	return correo;
}

public void setCorreo(String correo) {
	this.correo = correo;
}

public BigDecimal getLvl() {
	return lvl;
}

public void setLvl(BigDecimal lvl) {
	this.lvl = lvl;
}

public String getNombreAdmin() {
	return nombreAdmin;
}

public void setNombreAdmin(String nombreAdmin) {
	this.nombreAdmin = nombreAdmin;
}

public List<String> getGrado_id() {
	return grado_id;
}

public void setGrado_id(List<String> grado_id) {
	this.grado_id = grado_id;
}

public List<BigDecimal> getEstado_id() {
	return estado_id;
}

public void setEstado_id(List<BigDecimal> estado_id) {
	this.estado_id = estado_id;
}

public String getEdo() {
	return edo;
}

public void setEdo(String edo) {
	this.edo = edo;
}

public BigDecimal getEdo_id() {
	return edo_id;
}

public void setEdo_id(BigDecimal edo_id) {
	this.edo_id = edo_id;
}

}
