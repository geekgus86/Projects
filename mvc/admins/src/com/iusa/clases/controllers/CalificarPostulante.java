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

import com.iusa.clases.models.CalificacionAux;
import com.opensymphony.xwork2.ActionSupport;

public class CalificarPostulante extends ActionSupport{

	
	private BigDecimal calificacion;
	private BigDecimal id_vac;
	private BigDecimal id_postu;
	private String comentarios;
	
	private String comentarios2;
	
	private BigDecimal id_admin;
	
	
	private BigDecimal id_Usuario;
	private BigDecimal id_Vacante;
	private BigDecimal califi;
	
	private BigDecimal existe;
	
	private LinkedHashMap<String, Object> jsonDataCP = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	
	Session session;
	
	public CalificarPostulante(){
		
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user=(String) sesion.getAttribute("usuario");
        
        Transaction tienCalif = session.beginTransaction();
        
        try{
        
        String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" =:user  ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        query1.setParameter("user", user);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
         Map row1 = (Map) object;
         id_admin = (BigDecimal)row1.get("id_admin");
         }
        
       
        
       
        
	        String sql_tiene_calif = " SELECT Count(\"calificacion_aux\".\"id_usuario\") AS EXISTE FROM \"calificacion_aux\" WHERE \"calificacion_aux\".\"id_usuario\" = :id_postu  AND \"calificacion_aux\".\"id_vacante\" = :id_vac  ";
	        
	        Query query3 = session.createSQLQuery(sql_tiene_calif);
	        query3.setParameter("id_postu", id_postu).setParameter("id_vac", id_vac);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data3 = query3.list();
	        for (Object object : data3) {
	         Map row3 = (Map) object;
	         existe = (BigDecimal)row3.get("EXISTE");
	         }
	        
	  
        
        if((existe.intValueExact()) == 0){
        			
        			
        		
		        Transaction tr = session.beginTransaction();
		        
		        
			        CalificacionAux calif = new CalificacionAux();
			        
			        	calif.setComentarios_calif(comentarios2);
			        	calif.setId_admin_acalifico(id_admin);
			        	calif.setId_calificacion(calificacion);
			        	calif.setId_vacante(id_vac);
			        	calif.setId_usuario(id_postu);
			        
			        session.save(calif);
			        tr.commit();
		       
		     	
		     	if((calificacion.intValueExact()) == 6){
		     		
		     		
		            	
			            String sql2="UPDATE \"vacante\" SET \"vacante\".\"estado_vacante\" = 'Ocupada' WHERE \"vacante\".\"id_vacante\" = :id_vac ";
			            Query query2 = session.createSQLQuery(sql2);
			            query2.setParameter("id_vac", id_vac);
			            query2.executeUpdate();
			            
			        
		           
		           
		           HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        	
		        	String mensaje1 = "HAS CALIFICADO COMO CONTRATADO PROMOCIONADO";
		        	itemMap.put("error1", mensaje1);
		        	items.add(itemMap);
		        	jsonDataCP.put("Mensajes", items);
		           
		           
		           
		     	}else{
		     		
		     		
		     		
		     		
		     		HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        	
		        	String mensaje1 = "HAS CALIFICADO A ESTE USUARIO";
		        	itemMap.put("error1", mensaje1);
		        	items.add(itemMap);
		        	jsonDataCP.put("Mensajes", items);
		     		
		     	}
        }else{
        	
        	
        	
        	
            
	            String sql2="UPDATE \"calificacion_aux\" SET \"calificacion_aux\".\"id_calificacion\" = :calificacion  WHERE \"calificacion_aux\".\"id_vacante\" = :id_vac  AND \"calificacion_aux\".\"id_usuario\" = :id_postu  AND  \"calificacion_aux\".\"id_admin_acalifico\" = :id_admin  ";
	            Query query2 = session.createSQLQuery(sql2);
	            query2.setParameter("calificacion", calificacion).setParameter("id_vac", id_vac).setParameter("id_postu", id_postu).setParameter("id_admin", id_admin);
	            query2.executeUpdate();
	            
	         
        	
        	
        	HashMap<String, Object> itemMap = new HashMap<String, Object>();
        	
        	String mensaje1 = "LA CALIFICACION DEL USUARIO SE HA ACTUALIZADO";
        	itemMap.put("error1", mensaje1);
        	items.add(itemMap);
        	jsonDataCP.put("Mensajes", items);
        	
        }
        
        
        
        tienCalif.commit();
        }catch(Exception e){
        	
        	tienCalif.rollback();
        }
   	
		
		
		return SUCCESS;
	}

	public BigDecimal getId_Usuario() {
		return id_Usuario;
	}

	public void setId_Usuario(BigDecimal id_Usuario) {
		this.id_Usuario = id_Usuario;
	}

	public BigDecimal getId_Vacante() {
		return id_Vacante;
	}

	public void setId_Vacante(BigDecimal id_Vacante) {
		this.id_Vacante = id_Vacante;
	}

	public BigDecimal getCalifi() {
		return califi;
	}

	public void setCalifi(BigDecimal califi) {
		this.califi = califi;
	}

	public LinkedHashMap<String, Object> getJsonDataCP() {
		return jsonDataCP;
	}

	public void setJsonDataCP(LinkedHashMap<String, Object> jsonDataCP) {
		this.jsonDataCP = jsonDataCP;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public BigDecimal getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(BigDecimal calificacion) {
		this.calificacion = calificacion;
	}

	public BigDecimal getId_vac() {
		return id_vac;
	}

	public void setId_vac(BigDecimal id_vac) {
		this.id_vac = id_vac;
	}

	public BigDecimal getId_postu() {
		return id_postu;
	}

	public void setId_postu(BigDecimal id_postu) {
		this.id_postu = id_postu;
	}

	public BigDecimal getExiste() {
		return existe;
	}

	public void setExiste(BigDecimal existe) {
		this.existe = existe;
	}

	public String getComentarios2() {
		return comentarios2;
	}

	public void setComentarios2(String comentarios2) {
		this.comentarios2 = comentarios2;
	}
	
	
}
