package com.iusa.clases.controllers;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.FlushMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class Login extends ActionSupport implements SessionAware{
	
	private String username;
	private String password;
	private String resultado;

	private String fecha;
	private String estado;
	private BigDecimal idAdm;
	
	private Date fecha2;
	
	private Map<String,Object> s2session;
	@Override
	public void setSession(Map<String,Object> s2session) {
	  this.s2session = s2session;
	}

	Session session;
	
	public Login(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
		
	}

	@SuppressWarnings("unchecked")
	public String execute() {

		Transaction log = session.beginTransaction();
		
		
		
		try{
		
			String secureUsername = escapeChars(this.username);
			String securePassword = escapeChars(this.password);
			
			Query forlogin = session.createSQLQuery("SELECT \"admins\".\"nombre\", \"admins\".\"id_admin\", \"admins\".\"ultima_fecha\",\"admins\".\"estatus_admin\" FROM \"admins\" WHERE \"admins\".\"email\" = :username   AND \"admins\".\"cec\" =:password  ");
		
			forlogin.setParameter("username", secureUsername).setParameter("password", securePassword);
			
			if (forlogin.list().size()==1) {
				

				HttpServletRequest request = ServletActionContext.getRequest();
				HttpSession sesion = request.getSession();
				sesion.setAttribute("usuario", secureUsername);
				 		    
				
				forlogin.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = forlogin.list();
				
				
				
				for (Object object : dA) {
			         Map row = (Map) object;
			         this.fecha2 = (Date) row.get("ultima_fecha");
			         this.estado = (String) row.get("estatus_admin");
			         this.idAdm = (BigDecimal) row.get("id_admin");
			     }
				
				
				
				
				if( fecha2==null && estado.equals("Activo") ){
					
					
					
					Calendar c3 = Calendar.getInstance();
		    		String dia3 = Integer.toString(c3.get(Calendar.DATE));   
		    		String mes3 = Integer.toString(c3.get(Calendar.MONTH)+1);  
		    		String annio3 = Integer.toString(c3.get(Calendar.YEAR)); 
		    		
		    		String fechaNueva = dia3+"-"+mes3+"-"+annio3; 
					
					String sql2=" UPDATE \"admins\" SET \"admins\".\"ultima_fecha\"= :fechaNueva WHERE \"admins\".\"id_admin\"= :idAdm ";
			        Query query2 = session.createSQLQuery(sql2);
			        query2.setParameter("fechaNueva", fechaNueva).setParameter("idAdm", idAdm);
			        query2.executeUpdate();
					
					
					
					this.resultado = "success";
					
				}else if( fecha2 != null && estado.equals("Bloqueado") ){
					addActionError("Este usuario esta bloqueado por Inactividad Contactar con DSI o Cyaal para reactivar");
					this.resultado = "error";
				
				}else if( fecha2 != null && estado.equals("Activo") ){
					

					Calendar c3 = Calendar.getInstance();
		    		String dia3 = Integer.toString(c3.get(Calendar.DATE));   
		    		String mes3 = Integer.toString(c3.get(Calendar.MONTH)+1);  
		    		String annio3 = Integer.toString(c3.get(Calendar.YEAR)); 
		    		
		    		String fecha_maxima = dia3+"-"+mes3+"-"+annio3; 
		    		
		    		
		    		SimpleDateFormat dateFormat2 = new SimpleDateFormat("dd-MM-yyyy");
					Date parsedDate2 = dateFormat2.parse(fecha_maxima);
					
					
					 long lon = 2592000000L;
					
					
					if( ( parsedDate2.getTime() - fecha2.getTime() ) > lon ){
						
						
						String estado = "Bloqueado";
						String sql2="UPDATE \"admins\" SET \"admins\".\"estatus_admin\"= :estado WHERE \"admins\".\"id_admin\"=:idAdm ";
				        Query query2 = session.createSQLQuery(sql2);
				        query2.setParameter("estado", estado).setParameter("idAdm", idAdm);
				        query2.executeUpdate();
						
						
						addActionError("Este usuario esta bloqueado por Inactividad Contactar con DSI o Cyaal para reactivar");
						this.resultado = "error";
					}else{
						
						
						Calendar c2 = Calendar.getInstance();
			    		String dia2 = Integer.toString(c2.get(Calendar.DATE));   
			    		String mes2 = Integer.toString(c2.get(Calendar.MONTH)+1);  
			    		String annio2 = Integer.toString(c2.get(Calendar.YEAR)); 
			    		
			    		String fechaNueva = dia2+"-"+mes2+"-"+annio2; 
						
						String sql2="UPDATE \"admins\" SET \"admins\".\"ultima_fecha\" = :fechaNueva WHERE \"admins\".\"id_admin\"= :idAdm ";
				        Query query2 = session.createSQLQuery(sql2);
				        query2.setParameter("fechaNueva", fechaNueva).setParameter("idAdm", idAdm);
				        query2.executeUpdate();

				        this.resultado = "success";
					}
				
				}else if( fecha2 == null && estado.equals("Bloqueado") ){
					addActionError("Este usuario esta bloqueado por Inactividad Contactar con DSI o Cyaal para reactivar");
					this.resultado = "error";
				}
				
				
				
				
				
			} else {
				
				addActionError("Datos Incorrectos");
				this.resultado = "error";
				
			}
			
			log.commit();
			
			
			
		}catch(CaracterNoValidoException e){
			
			addActionError("Caracter no valido");
			this.resultado = "error";
			
		}catch(Exception e){
			e.printStackTrace();
			log.rollback(); 
			addActionError("Datos Incorrectos");
			this.resultado = "error";
		}
			

			
		return this.resultado;
		
		
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
	
	
	
		public String getUsername() {
		return username;
		}
		
		public void setUsername(String username) {
			
			
			this.username = username;
		}
		
		public String getPassword() {
		return password;
		}
		
		
		public void setPassword(String password) {
			
			
			this.password = password;
			
		}

		public String getResultado() {
			return resultado;
		}

		

		public String getFecha() {
			return fecha;
		}

		

		public String getEstado() {
			return estado;
		}

		

		public BigDecimal getIdAdm() {
			return idAdm;
		}

		

		public Date getFecha2() {
			return fecha2;
		}

		

}
