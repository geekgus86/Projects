package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

public class EliminarAdmin extends CrearAdmin{
	
	private String selecciona;
	
	public String message;
	
	
	private String nombreAdmin;
	private BigDecimal levelAdmin;
	private String emailAdmin;
	private String nivelAux = "";
	
	private  String corr="",p="";
	
	public String execute(){
		
		 String user;
	  		
	  		HttpServletRequest request = ServletActionContext.getRequest();
	  	    HttpSession sesion = request.getSession();
	  	    
	  	    user= escapeChars((String) sesion.getAttribute("usuario"));
		
		Transaction tr = session.beginTransaction();
		
		try{
			
			String secureSelecciona = escapeChars(selecciona);
			
			if(user!=null){
  				String sql_admin ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\", \"admins\".\"ubicacion\",\"admins\".\"region\" FROM \"admins\"  WHERE \"admins\".\"email\" = :user ";
  				
  				Query A = session.createSQLQuery(sql_admin);
  				
  				A.setParameter("user", user);
  				
  				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
  				List dA = A.list();

  				for (Object object : dA) {
  			         Map row = (Map) object;
  			        
  			         nombreAdmin = (String) row.get("nombre");
  			         emailAdmin = (String) row.get("email");
  			         levelAdmin = (BigDecimal) row.get("nivel");
  			        
  			         	
  			     }
  				
  				
  				
  				if(levelAdmin.intValueExact() == 1){
  					nivelAux = "Administrador DSI";
  				}else if(levelAdmin.intValueExact() == 2){
  					nivelAux = "Super Administrador";
  				}else if(levelAdmin.intValueExact() == 3){
  					nivelAux = "Administrador";
  				}else if(levelAdmin.intValueExact() == 4){
  					nivelAux = "Calificador";
  				}
  				
  				
  			}
			
			
        
	        String sql2="DELETE FROM \"admins\" WHERE \"admins\".\"id_admin\" = :selecciona ";
	        Query query2 = session.createSQLQuery(sql2);
	        query2.setParameter("selecciona", secureSelecciona);
	        query2.executeUpdate();
	        
	        
	        
	        String sqlmail = "SELECT \"correo_iusa\".\"cuenta\",\"correo_iusa\".\"password\" FROM \"correo_iusa\" WHERE \"correo_iusa\".\"id\"=:idm";
	        Query querymail = session.createSQLQuery(sqlmail).setParameter("idm", 1);
	        querymail.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data2 = querymail.list();
	        for (Object object : data2) {
	         Map row = (Map) object;
	         corr=(String)row.get("cuenta");
	         p=(String)row.get("password");
	         }
	        
	        
	        tr.commit();
		}catch(Exception e){
			
			tr.rollback();
		}
		
		 Calendar fechaInstancia = new GregorianCalendar();
	  		
	  		String dia2 = Integer.toString(fechaInstancia.get(Calendar.DATE));   
	  		String mes2 = Integer.toString(fechaInstancia.get(Calendar.MONTH)+1);  
	  		String annio2 = Integer.toString(fechaInstancia.get(Calendar.YEAR)); 
	  		
	  		String fechaCreacion = dia2+"-"+mes2+"-"+annio2;
	  		
	  		message="<p style='text-align:justify;'>El día <strong style='color:crimson;'>"+fechaCreacion+"</strong></p>  se elimino  un Usuario tipo Administador</p> <br/> <p style='text-align:justify;'>El usuario que realizo esta operacion tiene los sigueintes datos:</p> <p style='text-align:justify;'>Nombre de usuario:  <strong style='color:crimson;'>"+nombreAdmin+"</strong></p><p style='text-align:justify;'>E-mail: <strong style='color:crimson;'>"+emailAdmin+"</strong></p><p style='text-align:justify;'>Nivel administrativo: <strong style='color:crimson;'>"+nivelAux+"</strong></p>";
	  		System.out.print(message);
	  		MailConfirmacion m=new MailConfirmacion("cyaaltva@tvazteca.com",message,"Se ha Eliminado un Administrador -- Aplicativo BolsaIusacell",corr,p);
	  		m.sendMail();
		
		
  	  return "success";
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public String getSelecciona() {
		return selecciona;
	}
	public void setSelecciona(String selecciona) {
		this.selecciona = selecciona;
	}
	
	public String getNombreAdmin() {
		return nombreAdmin;
	}

	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}

	public BigDecimal getLevelAdmin() {
		return levelAdmin;
	}

	public void setLevelAdmin(BigDecimal levelAdmin) {
		this.levelAdmin = levelAdmin;
	}

	public String getEmailAdmin() {
		return emailAdmin;
	}

	public void setEmailAdmin(String emailAdmin) {
		this.emailAdmin = emailAdmin;
	}
}
