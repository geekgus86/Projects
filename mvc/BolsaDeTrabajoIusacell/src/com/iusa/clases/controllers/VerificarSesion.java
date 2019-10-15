package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class VerificarSesion extends ActionSupport {
	
	
	
	private BigDecimal idUsuario;
	private String nombre;
	private String nombreUsuario;

	
	private BigDecimal idUsuFoto;
	private String idFoto;
	private String urlFoto;
	
	private int exite;
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String execute(){
		Transaction tr=session.beginTransaction();
		try{
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user=escapeChars((String) sesion.getAttribute("usuario"));
	    
	    if(user!=null){
	    	
	    	
	    	
			
			String sql_usu ="SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"usuario_nombre\" FROM \"usuario\" WHERE \"usuario\".\"usuario_nombre\" = :user";
			
			Query A = session.createSQLQuery(sql_usu).setParameter("user", user);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         idUsuario = (BigDecimal) row.get("id_postulante");
		         nombre = (String) row.get("nombre");
		         nombreUsuario = (String) row.get("usuario_nombre");
		         
		         	
		     }
			
		
			
			String sql_foto_usu ="SELECT \"foto\".\"url_foto\", \"foto\".\"id_usuario\" FROM \"foto\" WHERE \"foto\".\"id_usuario\" = :idUsuario";
			
			Query F = session.createSQLQuery(sql_foto_usu).setParameter("idUsuario", idUsuario);
			
			F.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dF = F.list();
			
				if(F.list().size()==1){
					for (Object object : dF) {
				         Map row2 = (Map) object;
				         idUsuFoto = (BigDecimal) row2.get("id_usuario");
				         urlFoto = (String) row2.get("url_foto");
				         
				         	
				     }
				}else{
					urlFoto = "../images/avatar.png";
				}
			
				exite = 1;
			
				
	    	 
	    	
	    }else{
	    	
	    	exite = 0;
	    	
	    	
	    	
	    }
		}catch(Exception e){
			tr.rollback();
		}
	    return SUCCESS;
		
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
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getIdFoto() {
		return idFoto;
	}

	public void setIdFoto(String idFoto) {
		this.idFoto = idFoto;
	}

	public BigDecimal getIdUsuFoto() {
		return idUsuFoto;
	}

	public void setIdUsuFoto(BigDecimal idUsuFoto) {
		this.idUsuFoto = idUsuFoto;
	}

	public String getUrlFoto() {
		return urlFoto;
	}

	public void setUrlFoto(String urlFoto) {
		this.urlFoto = urlFoto;
	}


	public int getExite() {
		return exite;
	}


	public void setExite(int exite) {
		this.exite = exite;
	}

}
