package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class EditarTips extends ActionSupport{

	
	
	
	private BigDecimal id_tip;
	private String descrip_tip;
	private String tipoTip;
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	Session session;
	
	public EditarTips(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
		
		String secureSeleccion = escapeChars(request.getParameter("seleccion"));
		
    	
		
		Transaction trans = session.beginTransaction();
		try{
		
			String sql_tip_editar = " SELECT \"tips\".\"id_tip\", \"tips\".\"tip_descripcion\", \"tips\".\"tipo_tip\" FROM \"tips\" WHERE  \"tips\".\"id_tip\" = :seleccion  ";
			
			Query q = session.createSQLQuery(sql_tip_editar);
			
			q.setParameter("seleccion", secureSeleccion);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
			
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         id_tip = (BigDecimal) row.get("id_tip");
		         descrip_tip = (String) row.get("tip_descripcion");
		         tipoTip = (String) row.get("tipo_tip");
		     	
		         }
			
			
			trans.commit();
		}catch(Exception e){
			
			trans.rollback();
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


	



	public BigDecimal getId_tip() {
		return id_tip;
	}



	public void setId_tip(BigDecimal id_tip) {
		this.id_tip = id_tip;
	}



	public String getDescrip_tip() {
		return descrip_tip;
	}



	public void setDescrip_tip(String descrip_tip) {
		this.descrip_tip = descrip_tip;
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



	public String getTipoTip() {
		return tipoTip;
	}



	public void setTipoTip(String tipoTip) {
		this.tipoTip = tipoTip;
	}
	
	
}
