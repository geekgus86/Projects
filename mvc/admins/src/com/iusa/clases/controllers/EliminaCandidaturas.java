package com.iusa.clases.controllers;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class EliminaCandidaturas extends ActionSupport {

	
	
	
	private String idPostuElim;
	private String namepos;
	
	
	public String getNamepos() {
		return namepos;
	}

	public void setNamepos(String namepos) {
		this.namepos = namepos;
	}



	int i;
	

	Session session;
	
	public EliminaCandidaturas(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
			String secureIdNamVac = escapeChars(namepos);
			String secureIdPostuElim = escapeChars(idPostuElim);
		
			
			 Transaction tr = session.beginTransaction();
			 
			 try{

		        String sql20 = "DELETE FROM \"postulaciones\" WHERE \"postulaciones\".\"id_usuario\"= :idPostuElim and \"postulaciones\".\"id_vacante\"= :idnamvac";
		        Query query20 = session.createSQLQuery(sql20);
		        query20.setParameter("idPostuElim", secureIdPostuElim).setParameter("idnamvac", secureIdNamVac);
		        query20.executeUpdate();

		        tr.commit();
			 }catch(Exception e){
				 
				 tr.rollback();
			 }
		
		
		addActionError("Eliminacion Satisfactoria");
		     
		     return SUCCESS;
		 }
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}



	public String getIdPostuElim() {
		return idPostuElim;
	}



	public void setIdPostuElim(String idPostuElim) {
		
        this.idPostuElim = idPostuElim;
		
		
	}
	
	
}
