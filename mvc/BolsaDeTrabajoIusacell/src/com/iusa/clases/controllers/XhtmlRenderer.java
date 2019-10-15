package com.iusa.clases.controllers;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.DecoderException;
import  org.apache.commons.codec.binary.*;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.iusa.clases.interceptor.CaracterNoValidoException;





public class XhtmlRenderer extends ActualizarDatos implements ServletRequestAware {
	private String imageData;
	private String imageData2;
	private Object content;
	private String nombreArchivo;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
    public String execute(){
    	String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
    	String routa=ruta+File.separator+"uploads"+File.separator+"curriculums"+File.separator;
    	HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
		
		Transaction tr=session.beginTransaction();
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
	    

    	
    		
    		    Base64 b= new Base64();
    	        byte[] decodedBytes = Base64.decodeBase64(imageData);
    	        BufferedImage bfi = ImageIO.read(new ByteArrayInputStream(decodedBytes));
    	        String infochar=idUsuario+"infograma.png";
    	        StringBuilder abspath = new StringBuilder();
    	        abspath.append(routa);
    	        abspath.append(infochar);
    	        File outputfile = new File(abspath.toString());
    	        ImageIO.write(bfi , "png", outputfile);
    	        bfi.flush();
    		    
    	        byte[] decodedBytes2 = Base64.decodeBase64(imageData2);
    	        BufferedImage bfi2 = ImageIO.read(new ByteArrayInputStream(decodedBytes2));
    	        StringBuilder sbx = new StringBuilder();
    	        sbx.append(routa);
    	        sbx.append(File.separator);
    	        sbx.append(idUsuario);
    	        sbx.append("talentos.png");
    	        File outputfile2 = new File(sbx.toString());
    	        ImageIO.write(bfi2 , "png", outputfile2);
    	        bfi2.flush();
    	        
    	        CreandoPdf jup = new CreandoPdf(ruta);
    	        
    	      
    	        
    	        String rutJupPDF = jup.executePDF();
    	        
    	        HashMap<String, Object> itemMap = new HashMap<String, Object>();
    	     	
    	     	String mensaje1 = "Se ha Creado el Archivo Satisfactoriamente";
    	     	
    	     	String mensaje2 = rutJupPDF;
    	     	
    	     	itemMap.put("error1", mensaje1);
    	     	itemMap.put("ruta_nueva", mensaje2);
    	     	items.add(itemMap);
    	     	
    	     	jsonData.put("Mensajes", items);
    	     	
    	        
    	        tr.commit();
    	}catch(IOException e){
    		
    		HashMap<String, Object> itemMap = new HashMap<String, Object>();
			
			String mensaje1 = "No se ha creado el archivo Satisfactoriamente";

        	itemMap.put("error1", mensaje1);
        	items.add(itemMap);
        	
        	jsonData.put("Mensajes", items);
    		 e.printStackTrace();
    		 tr.rollback();
    	}catch(Exception e){
    		 e.printStackTrace();
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
    
public Object getContent() {
	return content;
}

public void setContent(Object content) {
	this.content = content;
}

@Override
public void setServletRequest(HttpServletRequest servletRequest) {
    this.servletRequest = servletRequest;

}

public String getImageData() {
	return imageData;
}

public void setImageData(String imageData) {
	this.imageData = imageData;
}

public String getImageData2() {
	return imageData2;
}

public void setImageData2(String imageData2) {
	this.imageData2 = imageData2;
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

public String escapeControlChars(String cadena){
	   
	   String reg = "[..\\],[../],[..]";
	   
	   	String escapedString= cadena.replaceAll(reg,"");
	   	
	   	return escapedString; 
}
}
