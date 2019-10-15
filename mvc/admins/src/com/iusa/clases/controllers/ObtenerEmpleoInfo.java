package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;




public class ObtenerEmpleoInfo extends ObtenerEmpleo{
	
	private String idExp;
	private String IdUsuario2;
	
	
   public String execute(){
	   
	   
	   
	   
	   
   		
		Transaction tr = session.beginTransaction();
		try{
		
      
       
			String secureIdExp =escapeChars(idExp) ;
			String secureIdUsuario2 = escapeChars(IdUsuario2);
   	
   	 
       String sql1 = "SELECT \"experiencia\".\"id_exp\",\"experiencia\".\"empresa\",\"experiencia\".\"puesto\",\"experiencia\".\"fecha_inicio\",\"experiencia\".\"fecha_fin\",\"experiencia\".\"sueldo\",\"experiencia\".\"funciones\",\"experiencia\".\"trabajo_actual\" FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\" = :idUsuario AND \"experiencia\".\"id_exp\" = :idExp ";
       Query query1 = session.createSQLQuery(sql1);
       query1.setParameter("idUsuario", secureIdUsuario2).setParameter("idExp", secureIdExp);
       query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
       List data1 = query1.list();
       for (Object object : data1) {
       	Map row1 = (Map) object;
         	String fechaInicio=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_inicio"));
         	String fechaFin=new SimpleDateFormat("dd/MM/yyyy").format(row1.get("fecha_fin"));
         	
         	 HashMap<String, Object> itemMap = new HashMap<String, Object>();    
         	 itemMap.put("id_exp", (BigDecimal) row1.get("id_exp"));
          	 itemMap.put("empresa", (String) row1.get("empresa"));
	         itemMap.put("puesto", (String) row1.get("puesto"));
	         itemMap.put("fecha_inicio", (String)fechaInicio);
	         itemMap.put("fecha_fin", (String) fechaFin);
	         itemMap.put("sueldo", (BigDecimal) row1.get("sueldo"));
	         itemMap.put("funciones", (String) row1.get("funciones"));
	         itemMap.put("trabajo_actual", (String) row1.get("trabajo_actual"));
	       
	         
	         items.add(itemMap);
          	     
          	     
       	}
       
       
 
	   tr.commit();
		}catch(Exception e){
			
			tr.rollback();
		}
		
		jsonData.put("items", items);
	   return "success";
   }



public String getIdExp() {
	return idExp;
}

public void setIdExp(String idExp) {
	this.idExp = idExp;
}

public String getIdUsuario2() {
	return IdUsuario2;
}

public void setIdUsuario2(String idUsuario2) {
	IdUsuario2 = idUsuario2;
}


}
