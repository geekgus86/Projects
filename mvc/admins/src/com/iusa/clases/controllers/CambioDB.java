package com.iusa.clases.controllers;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.Admin;
import com.opensymphony.xwork2.ActionSupport;

public class CambioDB extends ActionSupport {
	
	private String resultado;
	
	Session session;
	
	public CambioDB(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		 	
	        
	        
	        Transaction tr = session.beginTransaction();
	        
	        try{
	        	
	        	String sql2="DELETE FROM \"admins\" ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.executeUpdate();
		        
		        
		        
		        Admin a=new Admin();
				a.setNombre("DSI");
				a.setCec("12345");
				a.setEmail("dsi@iusacell.com");
				a.setNivel(1);
				a.setEstatus("Activo");
				session.save(a);
				
				
				
				Admin ar=new Admin();
				ar.setNombre("Beatriz");
				ar.setCec("12345");
				ar.setEmail("bvazquez@iusacell.com");
				ar.setNivel(2);
				ar.setEstatus("Activo");
				session.save(ar);
		        
				
				 tr.commit();
				 addActionError("Se ejecuto correctamente");
				 return SUCCESS;
	        }catch(Exception e){
				e.printStackTrace();
				tr.rollback();
				
				addActionError("Se ejecuto incorrectamente");
				return ERROR;
			}
		
		
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}

}
