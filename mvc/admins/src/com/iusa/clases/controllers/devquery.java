package com.iusa.clases.controllers;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class devquery {
	
Session session;
String queryfactory;

	public String getQueryfactory() {
	return queryfactory;
}

public void setQueryfactory(String queryfactory) {
	this.queryfactory = queryfactory;
}

	public devquery(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
public String execute(){
	
	 Transaction tr = session.beginTransaction();
     
     try{
	        String sql2=queryfactory;
	        Query query2 = session.createSQLQuery(sql2);
	        query2.executeUpdate();
	        tr.commit();
	        return "success";
     }catch(Exception e){
  	  
  	   	tr.rollback();
  	   	return "error";
     }
}

}
