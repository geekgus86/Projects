package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class DetallePostulante extends ActionSupport{
	
	private String arreglo[];
	
	private List<String> idPsotulantes;
	private List<String> nombresPostulantes;
	
	private String nombre;
	private String apellidoP;
	private String apellidoM;
	
	int i;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	Session session;
	
	public DetallePostulante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		idPsotulantes = new ArrayList<String>();
		nombresPostulantes = new ArrayList<String>();
		
		Transaction transact = session.beginTransaction();
		
		try{
			String sql_admin;
			String todo;
			
			String secureArreglo = "";
			
			for(i=0;i<arreglo.length;i++){
				
				secureArreglo = escapeChars(arreglo[i]);
				
				idPsotulantes.add(secureArreglo);
				
				sql_admin =" SELECT \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\" FROM \"usuario\" WHERE \"usuario\".\"id_postulante\" = :arreglo  ";
				
				Query A = session.createSQLQuery(sql_admin);
				
				A.setParameter("arreglo", secureArreglo);
				
				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = A.list();
				
				for (Object object : dA) {
			         Map row = (Map) object;
			         nombre = (String) row.get("nombre");
			         apellidoP = (String) row.get("apellido_paterno");
			         apellidoM = (String) row.get("apellido_materno");
			         
			         todo = nombre+" "+ apellidoP +" "+ apellidoM;
			         
			         nombresPostulantes.add(todo);
			     }
				
				secureArreglo = "";
				
			}
			
			transact.commit();
		}catch(Exception e){
			
			transact.rollback();
		}
		
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	

	public String[] getArreglo() {
		return arreglo;
	}

	public void setArreglo(String arreglo[]) {
		this.arreglo = arreglo;
	}

	public List<String> getIdPsotulantes() {
		return idPsotulantes;
	}

	public void setIdPsotulantes(List<String> idPsotulantes) {
		this.idPsotulantes = idPsotulantes;
	}

	public List<String> getNombresPostulantes() {
		return nombresPostulantes;
	}

	public void setNombresPostulantes(List<String> nombresPostulantes) {
		this.nombresPostulantes = nombresPostulantes;
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

}
