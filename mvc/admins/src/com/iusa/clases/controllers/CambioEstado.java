package com.iusa.clases.controllers;

import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class CambioEstado extends ActionSupport {

	
	
	
	Session session;
	
	public CambioEstado(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
        
        String selec_id = escapeChars(request.getParameter("idVacante")) ;
		
       Transaction tr = session.beginTransaction();
       
       try{
        
	        String sql2="UPDATE \"vacante\" SET  \"vacante\".\"estado_vacante\" = 'Inactiva' WHERE \"vacante\".\"id_vacante\" = :selec_id ";
	        Query query2 = session.createSQLQuery(sql2);
	        query2.setParameter("selec_id", selec_id);
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

	
	
	
}
