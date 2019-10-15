package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class Reportes extends ActionSupport {
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	private BigDecimal levlAux;
	
	private BigDecimal id;
	private String usu;
	
	private List<BigDecimal> idAdmin;
	private List<String> UsuAdmin;
	
	
	
	Session session;
	
	public Reportes(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute() {
		
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user=escapeChars((String) sesion.getAttribute("usuario"));
		
		
		Transaction trans = session.beginTransaction();
		
		try{
			
			
			
			if(user!=null){
				
				
				
				String sql_admin ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\", \"admins\".\"ubicacion\",\"admins\".\"region\",\"admins\".\"id_admin\" FROM \"admins\"  WHERE \"admins\".\"email\" = :user  ";
				
				Query A = session.createSQLQuery(sql_admin);
				
				A.setParameter("user", user);
				
				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = A.list();
				
				
				
				for (Object object : dA) {
			         Map rowA = (Map) object;
			         
			         levlAux = (BigDecimal) rowA.get("id_admin");
			     }
				
				
			}
			
			
			
			
			
			
			
			
			
		
		String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\"";
		
		Query A = session.createSQLQuery(sql_admin);
		
		A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dA = A.list();
		
		idAdmin = new ArrayList<BigDecimal>();
		UsuAdmin = new ArrayList<String>();
		
		for (Object object : dA) {
	         Map row = (Map) object;
	         	id = (BigDecimal) row.get("id_admin");
	         	usu = (String) row.get("nombre");
	         	idAdmin.add(id);
	         	UsuAdmin.add(usu);
	     }
		
		trans.commit();
		}catch(Exception e){
			
			trans.rollback();
		}
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     setIdAdministrador(DA.getIdAdministrador());
	     setCorreo(DA.getCorreo());
	     setLvl(DA.getLvl());
	     setNombreAdmin(DA.getNombreAdmin());
		
		return SUCCESS;
	}
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	
	public List<BigDecimal> getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(List<BigDecimal> idAdmin) {
		this.idAdmin = idAdmin;
	}

	public List<String> getUsuAdmin() {
		return UsuAdmin;
	}

	public void setUsuAdmin(List<String> usuAdmin) {
		UsuAdmin = usuAdmin;
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

	public BigDecimal getLevlAux() {
		return levlAux;
	}

	public void setLevlAux(BigDecimal levlAux) {
		this.levlAux = levlAux;
	}

}
