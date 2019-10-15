package com.iusa.clases.controllers;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class EliminarTip extends ActionSupport {
	
	private String seleccion;
	
	/**
	  * SESION CON HIBERNATE 
	 **/
	
	Session session;
	
	public EliminarTip(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		String secureSeleccion = escapeChars(seleccion);
		
		  Transaction tr = session.beginTransaction();
		  
		  try{
		        
		        String sql2="DELETE FROM \"tips\" WHERE \"tips\".\"id_tip\"= :seleccion ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("seleccion", secureSeleccion);
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

	public String getSeleccion() {
		return seleccion;
	}

	public void setSeleccion(String seleccion) {
		
		
		
        this.seleccion = seleccion;
		
		
	}

}
