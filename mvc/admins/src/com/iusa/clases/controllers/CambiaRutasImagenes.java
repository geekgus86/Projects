package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.jmimemagic.Magic;
import net.sf.jmimemagic.MagicMatch;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class CambiaRutasImagenes extends ActionSupport implements ServletRequestAware {
	
	private String id_banner;
	private File url_banner;
    private String url_bannerContentType;
    private String url_bannerFileName;
    
    private HttpServletRequest servletRequest;
    
    private LinkedHashMap<String, Object> jsonDataRI = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
    
	private String nombreAdmin;
	
	
    Session session;
    
    public CambiaRutasImagenes(){
    	session=HibernateUtil.getSessionFactory().getCurrentSession();
    }
	
	public String giveMe() {
		
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user = escapeChars((String) sesion.getAttribute("usuario"));
        
        String secureBannerID = escapeChars(id_banner);
		 
        Transaction selectAdmin = session.beginTransaction();
        
        try{
		
			String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"email\" = :user  ";
			
			Query A = session.createSQLQuery(sql_admin);
			
			A.setParameter("user", user);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         this.nombreAdmin = (String) row.get("nombre");
		         	
		     }
			
		
		
		int seleccionado = (int) Math.round((Math.random()*1000)); 
		
		String ran = String.valueOf(seleccionado);
	
		String sSubNombreAdmin = nombreAdmin.substring(0,1) + ran +".jpg";
	     
	     try {
	    	 
	     
	    	 
	    	    MagicMatch mimeType = Magic.getMagicMatch(url_banner, false);
	            System.out.println(mimeType.getMimeType()) ;
	        
	            if((mimeType.getMimeType().equals("image/jpeg"))||(mimeType.getMimeType().equals("image/png"))||(mimeType.getMimeType().equals("image/gif"))||(mimeType.getMimeType().equals("image/bmp")))
	            {
	            	String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
	        	    
	    	        String routa=ruta+"/images/anuncios";

	    	        
	    	        url_bannerFileName = sSubNombreAdmin;
	    	        
	    	        String DBruta="images/anuncios/"+url_bannerFileName+"";
	    	        
	    	        
	    	        
	    	        File fileToCreate = new File(routa, url_bannerFileName);
	    	        FileUtils.copyFile(this.url_banner, fileToCreate);
	    	        
	      
	            
	             
	            
	    	        String sql2="UPDATE \"img_banner\" SET \"img_banner\".\"url_banner\" = :DBruta  WHERE \"img_banner\".\"id_banner\" = :id_banner ";
	    	        Query query2 = session.createSQLQuery(sql2);
	    	        query2.setParameter("DBruta", DBruta).setParameter("id_banner", secureBannerID);
	    	        query2.executeUpdate();
	    	        
	    	     
	    	        
	    	        
	    	        String ruta2 = "10.189.64.28/BolsaDeTrabajoIusacell/images/anuncios";
	    	        String routa2=ruta2+"/images/anuncios";    
	    	        
	    	        
	    	        
	    	        File fileToCreate2 = new File(ruta2, url_bannerFileName);
	    	        FileUtils.copyFile(this.url_banner, fileToCreate2);
	    	            
	    	       
	    	       
	    	       HashMap<String, Object> itemMap = new HashMap<String, Object>();
	    	    	
	    	    	String mensaje1 = DBruta;
	    	    	BigDecimal mensaje2 = new BigDecimal(secureBannerID);
	    	    	itemMap.put("ruta_nueva", mensaje1);
	    	    	itemMap.put("video_id", mensaje2);
	    	    	items.add(itemMap);
	    	    	jsonDataRI.put("Mensajes", items);
	           
	            }else{
	            	selectAdmin.commit();
	            }
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	 
	    	
	        
	      
	        
	       
	     
	     
	    } catch (IOException e) {
	     e.printStackTrace();
	    }
	     
	 	selectAdmin.commit();
        }catch(Exception e){
        	
        	selectAdmin.rollback();
        }
	     
	   return SUCCESS;
	     
    }

	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	
	public String getId_banner() {
		return id_banner;
	}

	public void setId_banner(String id_banner) {
		this.id_banner = id_banner;
	}

	public File getUrl_banner() {
		return url_banner;
	}

	public void setUrl_banner(File url_banner) {
		this.url_banner = url_banner;
	}

	public String getUrl_bannerContentType() {
		return url_bannerContentType;
	}

	public void setUrl_bannerContentType(String url_bannerContentType) {
		this.url_bannerContentType = url_bannerContentType;
	}

	public String getUrl_bannerFileName() {
		return url_bannerFileName;
	}

	
	
	 @Override
	    public void setServletRequest(HttpServletRequest servletRequest) {
	        this.servletRequest = servletRequest;
	 
	    }

	public LinkedHashMap<String, Object> getJsonDataRI() {
		return jsonDataRI;
	}

	public void setJsonDataRI(LinkedHashMap<String, Object> jsonDataRI) {
		this.jsonDataRI = jsonDataRI;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	

}
