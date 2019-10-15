package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class CambiaRutasVideos extends ActionSupport {
	
	private String id_video;
	private String ruta_nueva;
	
	private String idVideoYouTube;
	
	private String tipo;

	private LinkedHashMap<String, Object> jsonDataRR = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session;
	
	public CambiaRutasVideos(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		System.out.println("el valor del Tipo: "+this.tipo);
		
		if(this.tipo.equals("video")){
			
			System.out.println("Entrando a lo del video");
			
			String secureVideoID = escapeChars(id_video);
			
			String secureIdYouTube = escapeCharsYotubeID(idVideoYouTube);
			
			String rutaNuevaEmbeded = "Video http://www.youtube.com/embed/"+secureIdYouTube;
			
			Transaction tr2 = session.beginTransaction();
			
			try{
	        
		        String sql2="UPDATE \"videos\" SET \"videos\".\"url_video\" = :rutaNuevaEmbeded  WHERE \"videos\".\"id_video\" = :id_video ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("rutaNuevaEmbeded", rutaNuevaEmbeded).setParameter("id_video", secureVideoID);
		        query2.executeUpdate();
		        
		        tr2.commit();
			}catch(Exception e){
				
				tr2.rollback();
			}
	       
	       HashMap<String, Object> itemMap = new HashMap<String, Object>();
	    	
	    	String mensaje1 = rutaNuevaEmbeded;
	    	BigDecimal mensaje2 = new BigDecimal(secureVideoID);
	    	itemMap.put("ruta_nueva", mensaje1);
	    	itemMap.put("video_id", mensaje2);
	    	items.add(itemMap);
	    	jsonDataRR.put("Mensajes", items);
			
			
			
		}else if(this.tipo.equals("web")){
			
			System.out.println("Entrando a lo del link");
			
			String secureVideoID = escapeChars(id_video);
			
			String secureIdYouTube = escapeCharsYotubeID(idVideoYouTube);
			
			String rutaNuevaEmbeded = "WEB "+this.ruta_nueva;
			
			Transaction tr2 = session.beginTransaction();
			
			try{
	        
		        String sql2="UPDATE \"videos\" SET \"videos\".\"url_video\" = :rutaNuevaEmbeded  WHERE \"videos\".\"id_video\" = :id_video ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("rutaNuevaEmbeded", rutaNuevaEmbeded).setParameter("id_video", secureVideoID);
		        query2.executeUpdate();
		        
		        tr2.commit();
			}catch(Exception e){
				
				tr2.rollback();
			}
	       
	       HashMap<String, Object> itemMap = new HashMap<String, Object>();
	    	
	    	String mensaje1 = rutaNuevaEmbeded;
	    	BigDecimal mensaje2 = new BigDecimal(secureVideoID);
	    	itemMap.put("ruta_nueva", mensaje1);
	    	itemMap.put("video_id", mensaje2);
	    	items.add(itemMap);
	    	jsonDataRR.put("Mensajes", items);
			
			
			
			
		}
		
		
		
		
		
		
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public String escapeCharsYotubeID(String cadena){
	    
	    
	    String reg = "[;*|()%#!]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	

	public String getId_video() {
		return id_video;
	}

	public void setId_video(String id_video) {
		this.id_video = id_video;
	}

	public String getRuta_nueva() {
		return ruta_nueva;
	}

	public void setRuta_nueva(String ruta_nueva) {
		this.ruta_nueva = ruta_nueva;
	}

	public LinkedHashMap<String, Object> getJsonDataRR() {
		return jsonDataRR;
	}

	public void setJsonDataRR(LinkedHashMap<String, Object> jsonDataRR) {
		this.jsonDataRR = jsonDataRR;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getIdVideoYouTube() {
		return idVideoYouTube;
	}

	public void setIdVideoYouTube(String idVideoYouTube) {
		this.idVideoYouTube = idVideoYouTube;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
}
