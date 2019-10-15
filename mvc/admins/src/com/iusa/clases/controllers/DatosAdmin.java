package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.eclipse.jem.util.logger.proxy.Logger;
import org.hibernate.Criteria;
import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import com.opensymphony.xwork2.ActionSupport;



public class DatosAdmin extends ActionSupport {
	
	protected BigDecimal idAdministrador;
	protected String ceC;
	protected String eMail;
	protected String correo;
	protected BigDecimal lvl;
	protected String nombreAdmin;
	protected String ubicacion;
	protected BigDecimal region;
	
	
	private String edo;
	private BigDecimal edo_id;
	
	private List<String> estado;
	private List<BigDecimal> estado_id;
	
	

	
	Session session;
	
	public DatosAdmin(){
		
		session=HibernateUtil.getSessionFactory().getCurrentSession();
		
		
		
	}
	
	public String execute(){
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
	    
	    Transaction selectAdmin = session.beginTransaction();
	    try{
		
		if(user!=null){
			
		
			
			String sql_admin ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\", \"admins\".\"ubicacion\",\"admins\".\"region\" FROM \"admins\"  WHERE \"admins\".\"email\" = :user  ";
			
			Query A = session.createSQLQuery(sql_admin);
			
			A.setParameter("user", user);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         idAdministrador = (BigDecimal) row.get("id_admin");
		         nombreAdmin = (String) row.get("nombre");
		         correo = (String) row.get("email");
		         lvl = (BigDecimal) row.get("nivel");
		         ubicacion = (String) row.get("ubicacion");
		         region = (BigDecimal) row.get("region");
		         	
		     }
			
			
		}
		
		estado=new ArrayList<String>();
		estado_id = new ArrayList<BigDecimal>();
		 String sql = "SELECT \"estado\".\"id_estado\", \"estado\".\"nombre_estado\" FROM \"estado\" ORDER BY \"estado\".\"nombre_estado\" ";
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
		
		
	     
	    
	     selectAdmin.commit();
	    }catch(Exception e){
	    	selectAdmin.rollback();
	    	
	    }
	    
	    
	    //log.logInfo(nombreAdmin);
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	

	public BigDecimal getIdAdministrador() {
		return idAdministrador;
	}

	

	public String getCeC() {
		return ceC;
	}

	

	public String geteMail() {
		return eMail;
	}

	

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	

	public String getCorreo() {
		return correo;
	}

	

	public BigDecimal getLvl() {
		return lvl;
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

	public String getUbicacion() {
		return ubicacion;
	}

	

	public BigDecimal getRegion() {
		return region;
	}

	

}
