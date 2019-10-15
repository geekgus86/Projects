package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;



public class CambiarAdmin extends ListaAdmins{
    
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String estatus;
	
	
	
	private String seleccion;
    
    
	private String edo;
	private BigDecimal edo_id;
	
	private List<String> estado;
	private List<BigDecimal> estado_id;
    
    
	Session session;
	
	public CambiarAdmin(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		Transaction estadoCambioT = session.beginTransaction();
		
		try{
			
			String secureSeleccion = escapeChars(seleccion);
			
			
			String sql = "SELECT \"admins\".\"id_admin\",\"admins\".\"cec\",\"admins\".\"nombre\",\"admins\".\"email\",\"admins\".\"nivel\",\"admins\".\"ubicacion\",\"admins\".\"region\",\"admins\".\"estatus_admin\" FROM \"admins\" WHERE \"admins\".\"id_admin\" = :seleccion ";
		     Query query = session.createSQLQuery(sql);
		     query.setParameter("seleccion", secureSeleccion);
		     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		     List data = query.list();
		     for (Object object : data) {
		     	Map row = (Map) object;
		     	this.idAdmin=(BigDecimal)row.get("id_admin");
		     	this.nombre=(String)row.get("nombre");
		     	this.cec=(String)row.get("cec");
		     	this.email=(String)row.get("email");
		     	this.nivel=(BigDecimal)row.get("nivel");
		     	this.ubicacion = (String)row.get("ubicacion");
		     	this.region=(BigDecimal)row.get("region");
		     	this.estatus = (String)row.get("estatus_admin");
		     }
		
		
	    
			estado=new ArrayList<String>();
			estado_id = new ArrayList<BigDecimal>();
			 String sql2 = "SELECT \"estado\".\"id_estado\", \"estado\".\"nombre_estado\" FROM \"estado\" ORDER BY \"estado\".\"nombre_estado\" ";
		     Query query2 = session.createSQLQuery(sql2);
		     query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		     List data2 = query2.list();
		     for (Object object : data2) {
		     	Map row2 = (Map) object;
		     	
		     	edo_id = (BigDecimal)row2.get("id_estado");
		     	edo=(String)row2.get("nombre_estado");
		     	
		     	estado_id.add(edo_id);
		     	estado.add(edo);
		     }
	     estadoCambioT.commit();
			}catch(Exception e){
				
				estadoCambioT.rollback();
			} 
		 
		     DatosAdmin DA = new DatosAdmin();
		     DA.execute();
		     idAdministrador = DA.getIdAdministrador();
		     correo = DA.getCorreo();
		     lvl = DA.getLvl();
		     nombreAdmin = DA.getNombreAdmin(); 
		     
		
		return "success";
	}

	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public String getSeleccion() {
		return seleccion;
	}

	public void setSeleccion(String seleccion) {
		this.seleccion = seleccion;
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

	public List<String> getEstado() {
		return estado;
	}

	public void setEstado(List<String> estado) {
		this.estado = estado;
	}

	public List<BigDecimal> getEstado_id() {
		return estado_id;
	}

	public void setEstado_id(List<BigDecimal> estado_id) {
		this.estado_id = estado_id;
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


	public String getNombreAdmin() {
		return nombreAdmin;
	}

	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
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
	
	
	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public BigDecimal getRegion() {
		return region;
	}

	public void setRegion(BigDecimal region) {
		this.region = region;
	}

	public String getEstatus() {
		return estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	
}
