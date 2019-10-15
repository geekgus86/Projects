package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.SoftwareAux;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class ActualizarSoftware extends ActualizarDatos {
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	public BigDecimal idSoftware;
	public BigDecimal dominio;
	public String parametro;
	private BigDecimal idAux;
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
	    
	    
	    
	    
	    if(parametro.equals("crear")){
	    SoftwareAux sw=new SoftwareAux();
	    sw.setIdUsuario(idUsuario);
	    sw.setIdSoftware(idSoftware);
	    sw.setDominio(dominio);
	    session.save(sw);
	 
	    }else if(parametro.equals("modificar")){
	    	
	    	String sql2 = "UPDATE \"software_aux\" SET \"software_aux\".\"id_software\"=:idSoftware,\"software_aux\".\"dominio\"=:dominio WHERE \"software_aux\".\"id_aux\"=:idAux AND \"software_aux\".\"id_usuario\"=:idUsuario";
            Query query2 = session.createSQLQuery(sql2).setParameter("idSoftware", idSoftware).setParameter("dominio", dominio).setParameter("idAux", idAux).setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
            
	    }else if(parametro.equals("eliminar")){
	    	
	    	String sql2 = "DELETE FROM \"software_aux\" WHERE \"software_aux\".\"id_aux\"=:idAux AND \"software_aux\".\"id_usuario\"=:idUsuario";
            Query query2 = session.createSQLQuery(sql2).setParameter("idAux", idAux).setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
	    	
	    }
	    
	    
	    String sqlSw = "SELECT \"categoria_software\".\"id_categoria\",\"categoria_software\".\"categoria\",\"software\".\"nombre\",\"software\".\"id_software\",\"software_aux\".\"dominio\" FROM \"categoria_software\",\"software\",\"software_aux\" WHERE \"software_aux\".\"id_usuario\"=:idUsuario  AND  \"software_aux\".\"id_software\"=:idSoftware AND \"software\".\"id_software\"=\"software_aux\".\"id_software\" AND \"software\".\"categoria\"=\"categoria_software\".\"id_categoria\"";
	     Query querySw = session.createSQLQuery(sqlSw).setParameter("idUsuario", idUsuario).setParameter("idSoftware", idSoftware);
	     querySw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataSw = querySw.list();
	     for (Object object : dataSw) {
	     	Map rowSw = (Map) object;

	          HashMap<String, Object> itemMap = new HashMap<String, Object>();   
	            
	             itemMap.put("id_categoria", (BigDecimal) rowSw.get("id_categoria"));
	 	         itemMap.put("categoria", (String) rowSw.get("categoria"));
	 	        itemMap.put("id_software", (BigDecimal) rowSw.get("id_software"));
	 	         itemMap.put("dominio", (BigDecimal) rowSw.get("dominio"));
	 	        itemMap.put("nombre", (String) rowSw.get("nombre"));
	 	         
	 	        items.add(itemMap);
         	     
         	     
    	}
    
    jsonData.put("items", items);
    tr.commit();
    }catch(HibernateException e){
    	
		}catch(Exception e){
			tr.rollback();
		}
		return "success";
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
	
	
	public void SetIdSoftware(BigDecimal idSoftware){
		
		try{
			this.idSoftware = validateInts(idSoftware);
			}catch(CaracterNoValidoException e){}
	}
	
	public BigDecimal getIdSoftware(){
		return idSoftware;
	}
	
	public void SetDominio(BigDecimal dominio){
		
		try{
			this.dominio = validateInts(dominio);
			}catch(CaracterNoValidoException e){}
		
	}
	
	public BigDecimal getDominio(){
		return dominio;
	}
	
	public void setParametro(String parametro){
		try{
			this.parametro =validateInputs(parametro); 
	        }catch(CaracterNoValidoException e){
				
			}
	}
	
	public String getParametro(){
		return parametro;
	}

	public BigDecimal getIdAux() {
		return idAux;
	}

	public void setIdAux(BigDecimal idAux) {
		try{
			this.idAux= validateInts(idAux);
			}catch(CaracterNoValidoException e){}
	}
	
	 public LinkedHashMap<String, Object> getJsonData() {
			return jsonData;
			}
		
		public Set<Map<String, Object>> getItems() {
			return items;
			}
}
