package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.iusa.clases.models.*;


import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class ModificarAdmin extends CrearAdmin {
	
	private String idAdmin;
	
	public String message;
	
	
	private String nombreAdmin;
	private BigDecimal levelAdmin;
	private String emailAdmin;
	private String nivelAux = "";
	private String estatus;
	
	private  String corr="",p="";
	
      public String execute(){
    	  
    	  String user;
  		
	  		HttpServletRequest request = ServletActionContext.getRequest();
	  	    HttpSession sesion = request.getSession();
	  	    
	  	    user=escapeChars((String) sesion.getAttribute("usuario"));
	  	    
	  	    
	  	    
	  	    String secureNombre = escapeChars(nombre);
		    String secureCec = escapeChars(cec);
		    String secureEmail = escapeChars(email);
		    String secureNivelAdmin = escapeChars(nivelAdmin);
		    String secureUbicacion = escapeChars(ubicacion);
		    String secureregion = escapeChars(region);
		    String secureEsatus = escapeChars(estatus);
		    String secureAdmin = escapeChars(idAdmin);
		    
		    BigDecimal AuxIdAmin = new BigDecimal(secureAdmin);
		    
    	  
    	  Transaction tr = session.beginTransaction();
    	  
    	  try{
    		  
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
    		  
    		  
    		  
    		  
    		  
    		  
          
	          String sql2="UPDATE \"admins\" SET \"admins\".\"nombre\" = :nombre ,\"admins\".\"cec\" = :cec ,\"admins\".\"email\" = :email ,\"admins\".\"nivel\" = :nivelAdmin ,\"admins\".\"ubicacion\" = :ubicacion ,\"admins\".\"region\" = :region ,\"admins\".\"estatus_admin\" = :estatus WHERE \"admins\".\"id_admin\" = :idAdmin ";
	          Query query2 = session.createSQLQuery(sql2);
	          query2.setParameter("nombre", secureNombre).setParameter("cec", secureCec).setParameter("email", secureEmail).setParameter("nivelAdmin", secureNivelAdmin).setParameter("ubicacion", secureUbicacion).setParameter("region", secureregion).setParameter("estatus", secureEsatus).setParameter("idAdmin", AuxIdAmin);
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
  		
  		message="<p style='text-align:justify;'>El día <strong style='color:DarkGoldenRod;'>"+fechaCreacion+"</strong></p>  se realizo la modificación de un Usuario tipo Administador con los sigueintes Datos:</p> <p>Nombre Administrador: "+nombre+" </p> <p>Nivel: "+nivelAdmin+"</p> <p>E-mail: "+email+"</p><br/> <p></p><br/> <p style='text-align:justify;'>El usuario que realizo esta operacion tiene los sigueintes datos:</p> <p style='text-align:justify;'>Nombre de usuario:  <strong style='color:crimson;'>"+nombreAdmin+"</strong></p><p style='text-align:justify;'>E-mail: <strong style='color:crimson;'>"+emailAdmin+"</strong></p><p style='text-align:justify;'>Nivel administrativo: <strong style='color:crimson;'>"+nivelAux+"</strong></p>";
  		System.out.print(message);
  		MailConfirmacion m=new MailConfirmacion("cyaaltva@tvazteca.com",message,"Se ha Modificado un Administrador -- Aplicativo BolsaIusacell",corr,p);
  		m.sendMail();
    	  
    	  
    	  
    	  
    	  
    	  return "success";
      }

	public String getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(String idAdmin) {
		this.idAdmin = idAdmin;
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
	
	
	public String getEstatus() {
		return estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	
	
}
