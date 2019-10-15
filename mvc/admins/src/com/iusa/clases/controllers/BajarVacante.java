package com.iusa.clases.controllers;



import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class BajarVacante extends GuardaVacante {


	
	Session session;
	
	public BajarVacante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String execute(){
		
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
        
        String secureID = escapeChars(request.getParameter("idVacante"));
         
        Transaction tr = session.beginTransaction();
        
        try{
        
	         String sql2="UPDATE \"vacante\" SET \"vacante\".\"estado_vacante\" = 'Inactiva' WHERE \"vacante\".\"id_vacante\" = :idVacante ";
	         Query query2 = session.createSQLQuery(sql2);
	         query2.setParameter("idVacante", secureID);
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
