package com.iusa.clases.controllers;


import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.Postulaciones; 

import java.math.BigDecimal;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;


public class Postularme extends ActionSupport  {
	

	private String num_folio;
	
	public String getNumFolio() {
		return num_folio;
		}
		public void setNumFolio(String num_folio) {
		this.num_folio = num_folio;
		}
		

	private LinkedHashMap<String, Object> jsonDataP = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public LinkedHashMap<String, Object> getJsonDataP() {
		return jsonDataP;
	}

	public void setJsonDataP(LinkedHashMap<String, Object> jsonDataP) {
		this.jsonDataP = jsonDataP;
	}
	
	public Set<Map<String, Object>> getitems() {
		return items;
	}

	public void setitems(Set<Map<String, Object>> items) {
		this.items = items;
	}
	
	
	
	private int idPostulanteAux;
	
	public int setIdPostulanteAux(){
		return idPostulanteAux;
	}
	
	public int getIdPostulanteAux(int idPostulanteAux){
		return this.idPostulanteAux = idPostulanteAux;
	}
	
	private BigDecimal idUsuario;
	
	public BigDecimal setIdUsuario(){
		return idUsuario;
	}
	
	public BigDecimal getIdUSuario(BigDecimal idUsuario){
		return this.idUsuario = idUsuario;
	}
	
	private BigDecimal idVacante;
	
	public BigDecimal setIdVacante(){
		return idVacante;
	}
	
	public BigDecimal getIdVacante(BigDecimal idVacante){
		return this.idVacante = idVacante;
	}
	

	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	
	
	public String giveMe() {
		
	
		
		String user="";
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        try{
        user=escapeChars((String) sesion.getAttribute("usuario"));
        }catch(CaracterNoValidoException e){
        	
        	
        }
        
        
        if(user=="" || user==null){
        	
        	HashMap<String, Object> itemMap = new HashMap<String, Object>();
        	
        	String mensaje1 = "NECESITAS ESTAR REGISTRADO PARA POSTULARTE";
        	itemMap.put("error1", mensaje1);
        	items.add(itemMap);
        	jsonDataP.put("items", items);
        	
       
        	return ERROR;

        }else{
        	
        	
        	Transaction tr = session.beginTransaction();
        	try{
            String sqlUsu = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
            Query query = session.createSQLQuery(sqlUsu).setParameter("user", user);
            query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List data = query.list();
            for (Object object : data) {
             Map row = (Map) object;
               this.idUsuario=(BigDecimal)row.get("id_postulante");
             }
            
           
            
            String usu=request.getParameter("num_folio");
            
            Query query2 = session.createSQLQuery("SELECT \"vacante\".\"id_vacante\" FROM \"vacante\" WHERE \"vacante\".\"folio\" =:usu");
            		query2.setParameter("usu",usu);
            query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List data2 = query2.list();
            for (Object object : data2) {
             Map row2 = (Map) object;
               this.idVacante=(BigDecimal)row2.get("id_vacante");
             }
            
            
           
     
            String sqlPostu = "SELECT \"postulaciones\".\"id_postulante_aux\" FROM \"postulaciones\" WHERE\"postulaciones\".\"id_vacante\" = :idVacante AND \"postulaciones\".\"id_usuario\" =:idUsuario";
            Query query3 = session.createSQLQuery(sqlPostu).setParameter("idVacante", idVacante).setParameter("idUsuario", idUsuario);
            if (query3.list().size()==0) {
           
            	
            	
            	
            	 Postulaciones postulacion = new Postulaciones();
              		postulacion.setIdUsuario(idUsuario);
              		postulacion.setIdVacante(idVacante);
              	session.save(postulacion);
            	
             	
              	tr.commit();
              	
              	HashMap<String, Object> itemMap = new HashMap<String, Object>();
              	
              	String mensaje3 = "TU POSTULACION SE HA GUARDADO CORRECTAMENTE, PUEDES REVISARLA EN MIS CANDIDATURAS";
            	itemMap.put("error1", mensaje3);
            	items.add(itemMap);
            	jsonDataP.put("items", items);
            
            	 
            	
            	return SUCCESS;
            	
            }else{
            	
            	HashMap<String, Object> itemMap = new HashMap<String, Object>();
            	
            	String mensaje2 = "YA ESTAS POSTULADO PARA ESTA VACANTE, LA ENCONTRARAS EN LA SECCION DE \"MIS CANDIDATURAS\" ";
            	itemMap.put("error1", mensaje2);
            	items.add(itemMap);
            	jsonDataP.put("items", items);
            
            	return ERROR;

            	
            }
            
        }catch(Exception e){
        	tr.rollback();
        	return ERROR;
        }
        	
        }
        
       
		
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
