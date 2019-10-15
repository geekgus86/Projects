package com.iusa.clases.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;


public class VerificarCorreoExistente {

	  public String mail;
	  Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	  private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	  private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String giveMe(){
		
		
		Transaction tr=session.beginTransaction();
		try{
		String sql = "SELECT \"usuario\".\"usuario_nombre\"FROM \"usuario\" WHERE \"usuario\".\"correo_electronico\"=:mail AND \"usuario\".\"usuario_nombre\"=:mail";
        Query query = session.createSQLQuery(sql).setParameter("mail", mail).setParameter("mail", mail);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
	         Map row = (Map) object;
	         
	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         
	         
	         itemMap.put("usuario_nombre", (String) row.get("usuario_nombre"));
	        
	         
	         
	         items.add(itemMap);
	        
	         }
		
        jsonData.put("items", items);
        tr.commit();
		}catch(Exception e){
			tr.rollback();
		}
		return "success";
	}
	
public void setMail(String mail){
	try{
	this.mail=escapeChars(mail);
	}catch(CaracterNoValidoException e ){
		e.printStackTrace();
	}
	}

public String getMail(){
	return mail;
}

public LinkedHashMap<String, Object> getJsonData() {
	return jsonData;
	}

public Set<Map<String, Object>> getItems() {
	return items;
	}

public String escapeChars(String cadena)throws CaracterNoValidoException{

	   	String escapedString="";
	  
	   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
	   		
	   		String reg = "[=;*|()%#!&?]";
	   		   
	       	escapedString= cadena.replaceAll(reg,"");
	   		
	   	}else{
	   		
	   		throw new CaracterNoValidoException();
	   		
	   	}
	   	
	   	
	   	return escapedString;
	   }

}
