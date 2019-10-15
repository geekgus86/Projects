package com.iusa.clases.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.jmimemagic.Magic;
import net.sf.jmimemagic.MagicMatch;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.Foto;
import javax.activation.MimetypesFileTypeMap;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarFoto extends ActualizarDatos{
	 private HttpServletRequest servletRequest;
	    private File foto;
	    private String fotoContentType;
	    private String fotoFileName;
	    private String DBruta;
   public String execute(){
	   HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
		
		Transaction tr = session.beginTransaction();
		try{
		this.user=escapeChars((String) sesion.getAttribute("usuario"));
		String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
	    Query query = session.createSQLQuery(sql).setParameter("user",user);
	    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data = query.list();
	    for (Object object : data) {
	    	Map row = (Map) object;
	    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
	    	}
	    this.fotoFileName=idUsuario+".jpg";
	    this.DBruta="/uploads/photo/"+fotoFileName+"";
	    
	   
	    String sqlfoto = "SELECT \"foto\".\"id_foto\"FROM \"foto\" WHERE \"foto\".\"id_usuario\"=:idUsuario";
	    Query queryfoto = session.createSQLQuery(sqlfoto).setParameter("idUsuario",idUsuario);
	    queryfoto.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);


	    MagicMatch mimeType = Magic.getMagicMatch(foto, false);
        System.out.println(mimeType.getMimeType()) ;
	   
		if((mimeType.getMimeType().equals("image/jpeg"))||(mimeType.getMimeType().equals("image/png"))||(mimeType.getMimeType().equals("image/gif"))||(mimeType.getMimeType().equals("image/bmp"))){
			String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
			System.out.println(ruta);
		    String routa=ruta+"/uploads/photo";
		    System.out.println(routa);
		    byte[] bFile = new byte[(int) foto.length()];
		    
	        try {
		     FileInputStream fileInputStream = new FileInputStream(foto);
		     //convert file into array of bytes
		     fileInputStream.read(bFile);
		     fileInputStream.close();
	        } catch (Exception e) {
		     e.printStackTrace();
	        }
		//	File fileToCreate = new File(routa, this.fotoFileName);
         // FileUtils.copyFile(this.foto, fileToCreate);
		
    
         
        
          if(queryfoto.list().size()<1){
        	Foto fo=new Foto();
        	fo.setUrlFoto(DBruta);
  			fo.setIdUsuario(idUsuario);
  			fo.setFoto(bFile);
  			session.save(fo);
  			 tr.commit();
          }else{
        	  System.out.println("Archivo petru: "+bFile);
        	  String sql2 = "UPDATE \"foto\"  SET \"foto\".\"url_foto\"=:DBruta, \"foto\".\"foto\"=:foto WHERE \"foto\".\"id_usuario\"=:idUsuario";
              Query query2 = session.createSQLQuery(sql2).setParameter("DBruta",DBruta).setParameter("foto",bFile).setParameter("idUsuario",idUsuario);
              query2.executeUpdate();
              tr.commit();
         
          	
          	
          }
  	    
		}else{
			tr.commit();
		}
          
			
		}catch (NoClassDefFoundError e){
			tr.rollback();
			System.out.println("No entro");
			e.printStackTrace();
		}catch (Exception e){
			tr.rollback();
			e.printStackTrace();
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
   

   
   public File getFoto() {
		return foto;
	}

	public void setFoto(File foto) {
		this.foto = foto;
	}

	public String getFotoContentType() {
		return fotoContentType;
	}
	
	public void setFotoContentType(String fotoContentType) {
		this.fotoContentType=fotoContentType;
	}



	@Override
    public void setServletRequest(HttpServletRequest servletRequest) {
        this.servletRequest = servletRequest;
 
    }
   
}
