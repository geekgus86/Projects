package com.iusa.clases.controllers;

import java.math.*;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.iusa.clases.models.*;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class HobbieRepetido extends ActualizarDatos{
	
	    private String exito;
	    private BigDecimal hobbie;
	    
	    private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
		private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
		
		public String execute(){
			HttpServletRequest request = ServletActionContext.getRequest();
		    HttpSession sesion = request.getSession();
		    Transaction tr = session.beginTransaction();
			try{
				this.user=escapeChars((String) sesion.getAttribute("usuario"));
				String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
			    Query query = session.createSQLQuery(sql).setParameter("user", user);
			    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			    List data = query.list();
			    for (Object object : data) {
			    	Map row = (Map) object;
			    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
			    	}
			    
			    
			    String sql1 = "SELECT \"aux_hob\".\"id_hobbie\" FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario AND \"aux_hob\".\"id_hobbie\"=:id_hobbie";
		        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario).setParameter("id_hobbie", hobbie);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);    
		        List data1 = query1.list();
		        if(!data1.isEmpty()){
		        	HashMap<String, Object> itemMap = new HashMap<String, Object>();   
		        	itemMap.put("resultado","repetido");
		        	items.add(itemMap);
		        }else{
		        	HashMap<String, Object> itemMap = new HashMap<String, Object>();   
		        	itemMap.put("resultado","vacio");
		        	items.add(itemMap);
		        }
		        jsonData.put("items", items);
			}catch(Exception e){
				e.printStackTrace();
				tr.rollback();
			}
			return "success";
		}

		public LinkedHashMap<String, Object> getJsonData() {
			return jsonData;
		}

		public void setJsonData(LinkedHashMap<String, Object> jsonData) {
			this.jsonData = jsonData;
		}

		public Set<Map<String, Object>> getItems() {
			return items;
		}

		public void setItems(Set<Map<String, Object>> items) {
			this.items = items;
		}

		public BigDecimal getHobbie() {
			return hobbie;
		}

		public void setHobbie(BigDecimal hobbie) {
			this.hobbie = hobbie;
		}

		public String getExito() {
			return exito;
		}

		public void setExito(String exito) {
			this.exito = exito;
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
