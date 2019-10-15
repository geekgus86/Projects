package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.GregorianCalendar;
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

import com.opensymphony.xwork2.ActionSupport;

public class CambioEstatusAdmin extends ActionSupport {
	
	
	
	
	public String message;
	
	private String nombreAdmin;
	private BigDecimal levelAdmin;
	private String emailAdmin;
	private String nivelAux = "";
	private String estatus;
	
	private  String corr="",p="";
	
	
	private String nombreAdminAusx ;
	private   String emailAdminAusx ;
	private  BigDecimal levelAdminAusx ;
	
	
	private LinkedHashMap<String, Object> jsonDataCED = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	Session session;
	
	
	public CambioEstatusAdmin(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	
	public String giveMe() {
		
		
  	   
		
  		
  		 HttpServletRequest request = ServletActionContext.getRequest();
  		
  		 HttpSession sesion = request.getSession();
  		 
 		 String user = escapeChars((String) sesion.getAttribute("usuario"));
  	   
 		 String secureAdminSen = escapeChars(request.getParameter("idAdminSen"));
 		 
 		 String secureEstadoNuevo = escapeChars(request.getParameter("estadoNuevo"));
  	    
  	  
  	  
		
		 
		  
		 Calendar c3 = Calendar.getInstance();
 		String dia3 = Integer.toString(c3.get(Calendar.DATE));   
 		String mes3 = Integer.toString(c3.get(Calendar.MONTH)+1);  
 		String annio3 = Integer.toString(c3.get(Calendar.YEAR)); 
 		
 		String fechaNueva = dia3+"-"+mes3+"-"+annio3; 
			
			
	        
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
			  
			  
			  
			  
			  
			  
			  String sql2="UPDATE \"admins\" SET  \"admins\".\"estatus_admin\" = :estadoNuevo, \"admins\".\"ultima_fecha\"= :fechaNueva  WHERE \"admins\".\"id_admin\" = :idAdminSen ";
		        Query query2 = session.createSQLQuery(sql2);
		        query2.setParameter("estadoNuevo", secureEstadoNuevo).setParameter("fechaNueva", fechaNueva).setParameter("idAdminSen", secureAdminSen);
		        query2.executeUpdate();
		        
		        
		        String sql_admin2 ="SELECT \"admins\".\"cec\", \"admins\".\"nombre\", \"admins\".\"email\",\"admins\".\"nivel\", \"admins\".\"ubicacion\",\"admins\".\"region\" FROM \"admins\"  WHERE \"admins\".\"id_admin\" = :idAdmin ";
  				
  				Query A2 = session.createSQLQuery(sql_admin2);
  				
  				A2.setParameter("idAdmin", secureAdminSen);
  				
  				A2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
  				List dA2 = A2.list();

  				for (Object object : dA2) {
  			         Map row2 = (Map) object;
  			        
  			       this.nombreAdminAusx = (String) row2.get("nombre");
  			      this.emailAdminAusx = (String) row2.get("email");
  			      this.levelAdminAusx = (BigDecimal) row2.get("nivel");
  			        
  			         	
  			     }
		        
		        
		        
		        
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
	        
	       
		  
		  HashMap<String, Object> itemMap = new HashMap<String, Object>();
      	
      	String mensaje1 = "HAS CAMBIADO EL ESTADO DEL ADMINISTRADOR";
      	itemMap.put("error1", mensaje1);
      	items.add(itemMap);
      	jsonDataCED.put("Mensajes", items);
	       
         
      	Calendar fechaInstancia = new GregorianCalendar();
  		
  		String dia2 = Integer.toString(fechaInstancia.get(Calendar.DATE));   
  		String mes2 = Integer.toString(fechaInstancia.get(Calendar.MONTH)+1);  
  		String annio2 = Integer.toString(fechaInstancia.get(Calendar.YEAR)); 
  		
  		String fechaCreacion = dia2+"-"+mes2+"-"+annio2;
  		
  		message="<p style='text-align:justify;'>El día <strong style='color:DarkGoldenRod;'>"+fechaCreacion+"</strong></p>  se realizo el cambio de estado de un Usuario tipo Administador con los sigueintes Datos:</p> <p>Nombre Administrador: "+nombreAdminAusx+" </p> <p>Nivel: "+levelAdminAusx+"</p> <p>E-mail: "+emailAdminAusx+"</p> <p>Su estado cambio a: "+secureEstadoNuevo+"</p><br/> <p></p><br/> <p style='text-align:justify;'>El usuario que realizo esta operacion tiene los sigueintes datos:</p> <p style='text-align:justify;'>Nombre de usuario:  <strong style='color:crimson;'>"+nombreAdmin+"</strong></p><p style='text-align:justify;'>E-mail: <strong style='color:crimson;'>"+emailAdmin+"</strong></p><p style='text-align:justify;'>Nivel administrativo: <strong style='color:crimson;'>"+nivelAux+"</strong></p>";
  		System.out.print(message);
  		MailConfirmacion m=new MailConfirmacion("cyaaltva@tvazteca.com",message,"Se ha Modificado un Administrador -- Aplicativo BolsaIusacell",corr,p);
  		m.sendMail();
		
		return SUCCESS;
	}


	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
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



	public String getNivelAux() {
		return nivelAux;
	}



	public void setNivelAux(String nivelAux) {
		this.nivelAux = nivelAux;
	}



	public String getEstatus() {
		return estatus;
	}



	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}



	public String getCorr() {
		return corr;
	}



	public void setCorr(String corr) {
		this.corr = corr;
	}



	public String getP() {
		return p;
	}



	public void setP(String p) {
		this.p = p;
	}



	public String getNombreAdminAusx() {
		return nombreAdminAusx;
	}



	public void setNombreAdminAusx(String nombreAdminAusx) {
		this.nombreAdminAusx = nombreAdminAusx;
	}



	public String getEmailAdminAusx() {
		return emailAdminAusx;
	}



	public void setEmailAdminAusx(String emailAdminAusx) {
		this.emailAdminAusx = emailAdminAusx;
	}



	public BigDecimal getLevelAdminAusx() {
		return levelAdminAusx;
	}



	public void setLevelAdminAusx(BigDecimal levelAdminAusx) {
		this.levelAdminAusx = levelAdminAusx;
	}



	

}
