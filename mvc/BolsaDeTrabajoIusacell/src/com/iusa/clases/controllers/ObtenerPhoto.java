package com.iusa.clases.controllers;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.sql.Blob;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;

import net.sf.jmimemagic.Magic;
import net.sf.jmimemagic.MagicMatch;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.Foto;
import javax.activation.MimetypesFileTypeMap;
import javax.imageio.ImageIO;

import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ObtenerPhoto extends ActualizarDatos implements ServletRequestAware{
	
	protected byte[]phBits; 
	protected Blob dimg;
    protected byte b[]=null;
    protected FileOutputStream fos;
    protected String urlFoto;
   
    private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession sesion = request.getSession();
	    
		 String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
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
		        System.out.println(ruta);
		    	String routa=ruta+File.separator+"uploads"+File.separator+"photo"+File.separator;
		       String sql3 = "SELECT \"foto\".\"foto\"FROM \"foto\" WHERE \"foto\".\"id_usuario\"=:idUsername";
		        Query query3 = session.createSQLQuery(sql3).setParameter("idUsername", idUsuario);
		        
		        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        List data3 = query3.list();
		        if(data3.isEmpty()){
		        	this.urlFoto=routa+File.separator+"images"+File.separator+"avatar.png";
		        }else{
		        for (Object object : data3) {
		        	Map row2 = (Map) object;
		        	
		               dimg=(Blob)row2.get("foto");
		                
		        	}
		       
		        InputStream byte_stream = dimg.getBinaryStream();
		        
		        String infochar=idUsuario+"_foto.jpg";
		        StringBuilder sbph = new StringBuilder();
		        sbph.append(routa);
		        sbph.append(infochar);
		        File fileToCreate = new File(sbph.toString());
		        BufferedImage bf=ImageIO.read(byte_stream);
		        ImageIO.write(bf , "jpg", fileToCreate);
		        bf.flush();

		   
		        this.urlFoto="uploads"+File.separator+"photo"+File.separator+infochar;
		        }
		        HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        itemMap.put("foto", urlFoto);
		        items.add(itemMap);
		        jsonData.put("items", items);
		        tr.commit();
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

}
