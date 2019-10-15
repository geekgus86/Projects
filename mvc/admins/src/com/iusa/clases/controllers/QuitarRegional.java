package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class QuitarRegional  extends ActionSupport {
	
	private String idVacante;
	private BigDecimal idAdmin;
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public QuitarRegional(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String giveMe() {
		
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
		
		Transaction tr = session.beginTransaction();
		  
		  try{
			  
			  String secureIdVac = escapeChars(idVacante);
			  
			  
			  String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
				
				Query A = session.createSQLQuery(sql_admin);
				A.setParameter("user", user);
				
				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = A.list();

				for (Object object : dA) {
			         Map row = (Map) object;
			         this.idAdmin = (BigDecimal) row.get("id_admin");
			     }
			  
			  
			  
				String verifiOwner = " SELECT \"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :secureIdVac AND \"vacante\".\"subido_por\" = :idAdmin ";
			  
			  
				Query B = session.createSQLQuery(verifiOwner);
				B.setParameter("secureIdVac", secureIdVac).setParameter("idAdmin",idAdmin);
			  
			  
				B.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dBT = B.list();
				
				if(dBT.size() == 0){
					
					

				    String sql2="UPDATE \"vacante\" SET  \"vacante\".\"destacado\" = '0'  WHERE \"vacante\".\"id_vacante\" = :idVacante ";
			        Query query2 = session.createSQLQuery(sql2);
			        query2.setParameter("idVacante", secureIdVac);
			        query2.executeUpdate();
			        
			        
			        
			        HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        	
		        	String mensaje1 = "Se ha quitado de Destacados";
		        	itemMap.put("mensajes", mensaje1);
		        	items.add(itemMap);
					
					
					
				}else{
					
					
					
					  HashMap<String, Object> itemMap = new HashMap<String, Object>();
			        	
			        	String mensaje1 = "No Puedes Destacar esta Vacante";
			        	itemMap.put("mensajes", mensaje1);
			        	items.add(itemMap);
					
					
				}
				
				
				
			  
			  
			  
			
		        
		        
		        
		       tr.commit();
		  }catch(Exception e){
			  
			  tr.rollback();
		  }
		  
		  jsonData.put("Mensajes", items);
		
		
		return SUCCESS;
	}

	
public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
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
	
	
	public String getIdVacante() {
		return idVacante;
	}


	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}


	public BigDecimal getIdAdmin() {
		return idAdmin;
	}


	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
	}

}
