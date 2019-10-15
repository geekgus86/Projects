package com.iusa.clases.controllers;

import java.math.BigDecimal;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class SaveEditarTip extends ActionSupport {
	
	private String idTip;
	private String textoTip;
	private String tipoTip;
	
	
	
	Session session;
	
	public SaveEditarTip(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
	 Transaction tr = session.beginTransaction();
	 
	 try{
        
		 
		 String secureIDtip = escapeChars(idTip);
		 
		 String secureTextoTip = escapeChars(textoTip);
		 
		 String secureTipoTip = escapeChars(tipoTip);
		 
		 
        String sql2="UPDATE \"tips\" SET \"tips\".\"tip_descripcion\" = :textoTip ,\"tips\".\"tipo_tip\" = :tipoTip   WHERE \"tips\".\"id_tip\" = :idTip  ";
        Query query2 = session.createSQLQuery(sql2);
        query2.setParameter("textoTip", secureTextoTip).setParameter("tipoTip", secureTipoTip).setParameter("idTip", secureIDtip);
        query2.executeUpdate();
        
       tr.commit();
	 }catch(Exception e){
		 
		 tr.rollback();
	 }
		
		return SUCCESS;
	}
	
	
	
public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public String getIdTip() {
		return idTip;
	}
	public void setIdTip(String idTip) {
		this.idTip = idTip;
	}
	

	public String getTextoTip() {
		return textoTip;
	}

	public void setTextoTip(String textoTip) {
		this.textoTip = textoTip;
	}





	public String getTipoTip() {
		return tipoTip;
	}





	public void setTipoTip(String tipoTip) {
		this.tipoTip = tipoTip;
	}

}
