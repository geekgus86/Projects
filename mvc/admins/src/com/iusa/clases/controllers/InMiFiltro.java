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

import com.iusa.clases.models.CalificacionAux;
import com.iusa.clases.models.MiFiltro;
import com.opensymphony.xwork2.ActionSupport;

public class InMiFiltro extends ActionSupport  {

	private BigDecimal postu;
	private BigDecimal vac;
	
	private BigDecimal id_Usuario;
	private BigDecimal id_Vacante;
	
	private BigDecimal idAdmin;
	
	
	private BigDecimal existe;
	
	
	Session session;

	public InMiFiltro(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user = escapeChars((String) sesion.getAttribute("usuario"));
        String postu2 = escapeChars( request.getParameter("postu") );
		String vac2 = escapeChars( request.getParameter("vac") );
      
        Transaction trans = session.beginTransaction();
        
        try{
        
	        String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
	        
	        Query query1 = session.createSQLQuery(sql_admin_id);
	        query1.setParameter("user", user);
	        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data1 = query1.list();
	        for (Object object : data1) {
	         Map row1 = (Map) object;
	           this.idAdmin = (BigDecimal)row1.get("id_admin");
	         }
			
	      
	        
	        String sql_tiene_calif = " SELECT Count(\"filtro\".\"id_aux\") AS EXISTE FROM \"filtro\" WHERE \"filtro\".\"id_usuario\" = :postu2  AND \"filtro\".\"id_admin\" = :idAdmin  AND \"filtro\".\"id_vacante\" = :vac2  ";
	        
	        Query query3 = session.createSQLQuery(sql_tiene_calif);
	        query3.setParameter("postu2", postu2).setParameter("idAdmin", idAdmin).setParameter("vac2", vac2);
	        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data3 = query3.list();
	        for (Object object : data3) {
	         Map row3 = (Map) object;
	         this.existe = (BigDecimal)row3.get("EXISTE");
	         }
	        
	        this.postu = new BigDecimal(postu2);
	        this.vac  = new BigDecimal(vac2);
        
        if((existe.intValueExact()) == 0){
        	 
        		MiFiltro miFiltro = new MiFiltro();
        			miFiltro.setId_usuario(postu);
        			miFiltro.setId_vacante(vac);
        			miFiltro.setId_admin(idAdmin);
        			session.save(miFiltro);
        	
          
          	
          	String comentarios2 = "";
          	BigDecimal calificacion = new BigDecimal(0); 
          	
             CalificacionAux calif = new CalificacionAux();
             
             	calif.setComentarios_calif(comentarios2);
             	calif.setId_admin_acalifico(idAdmin);
             	calif.setId_calificacion(calificacion);
             	calif.setId_vacante(vac);
             	calif.setId_usuario(postu);
             
             session.save(calif);
             
             
             String sql2="  DELETE FROM \"primer_filltro\" WHERE \"primer_filltro\".\"id_usuario\" = :vac2  AND \"primer_filltro\".\"id_vacante\" = :postu2 ";
 	        Query query2 = session.createSQLQuery(sql2);
 	        query2.setParameter("vac2", vac2).setParameter("postu2", postu2);
 	        query2.executeUpdate();
             
             
            
        }else{
        	addActionError("EL USUARIO QUE SELECCIONASTE YA SE ENCUENTRA EN TU FILTRO");
        }
        
       
     	
        trans.commit();
        }catch(Exception e){
        	e.printStackTrace();
        	trans.rollback();
        }
     	
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	

	public BigDecimal getPostu() {
		return postu;
	}

	

	public BigDecimal getVac() {
		return vac;
	}

	

	public BigDecimal getId_Usuario() {
		return id_Usuario;
	}

	public void setId_Usuario(BigDecimal id_Usuario) {
		this.id_Usuario = id_Usuario;
	}

	public BigDecimal getId_Vacante() {
		return id_Vacante;
	}

	public void setId_Vacante(BigDecimal id_Vacante) {
		this.id_Vacante = id_Vacante;
	}

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	


	public BigDecimal getExiste() {
		return existe;
	}


	
	
}
