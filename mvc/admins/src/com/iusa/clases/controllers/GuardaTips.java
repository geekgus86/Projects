package com.iusa.clases.controllers;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.Vacante;
import com.opensymphony.xwork2.ActionSupport;
import com.iusa.clases.models.*;

public class GuardaTips extends ActionSupport {

	
	private String textoTip;
	private String tipoTip;
	
	
	
	Session session;
	
	public GuardaTips(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
   
	public String execute(){
		
		Transaction tr = session.beginTransaction();
		
		
		String secureTextoTip = escapeChars(textoTip);
		String secureTipoTip = escapeChars(tipoTip);
		
		try{
		    	
				Tips tip = new Tips();
				
					tip.setTipDescripcion(secureTextoTip);
					tip.setTipoTip(secureTipoTip);
		   	 	
		     	session.save(tip);
		     	
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
