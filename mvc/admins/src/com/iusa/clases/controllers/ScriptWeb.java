package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class ScriptWeb {
	
	private String resultado;
	private int i;

	
	private List<String> listaVideos;
	
	Session session;
	
	public ScriptWeb(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String execute(){
		
		String cadenaVideo = "Video http://www.youtube.com/embed/JuINmCG8Ka8";
		
		listaVideos=new ArrayList<String>();
		
		 Transaction tr = session.beginTransaction();
		  
		  try{ 
			  
			  
			 for(i=1;i<=6;i++){
				  String sql2="UPDATE \"videos\" SET \"videos\".\"url_video\" = :cadenaVideo  WHERE \"videos\".\"id_video\" = :i ";
			        Query query2 = session.createSQLQuery(sql2);
			        query2.setParameter("cadenaVideo", cadenaVideo).setParameter("i",i);
			        query2.executeUpdate();
			 } 
			  
			 
			 String sql = " SELECT \"videos\".\"id_video\",\"videos\".\"url_video\",\"videos\".\"donde_va\" FROM \"videos\" ";
				
			 Query q = session.createSQLQuery(sql);
				
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List d = q.list();
			
				
				for (Object object : d) {
			         Map row = (Map) object;
			     	String jup = (String)row.get("url_video");
			     	
			     	listaVideos.add(jup);
			     	
			     }
			 
			 
			 
			 
			  
			  tr.commit();
		  }catch(Exception e){
			  tr.rollback();
		  }
		
		
		
		
		return "success";
	}

	public String getResultado() {
		return resultado;
	}

	public void setResultado(String resultado) {
		this.resultado = resultado;
	}


	public List<String> getListaVideos() {
		return listaVideos;
	}


	public void setListaVideos(List<String> listaVideos) {
		this.listaVideos = listaVideos;
	}
	
	
	

}
