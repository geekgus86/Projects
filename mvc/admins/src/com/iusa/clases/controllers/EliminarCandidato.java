package com.iusa.clases.controllers;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class EliminarCandidato extends ActionSupport {

	
	
	
	private String idPostuElim;
	
	
	
	int i;
	

	Session session;
	
	public EliminarCandidato(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		
			String secureIdPostuElim = escapeChars(idPostuElim);
		
			
			 Transaction tr = session.beginTransaction();
			 
			 try{
	         
				String sql3 = "DELETE FROM \"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"= :idPostuElim ";
		        Query query3 = session.createSQLQuery(sql3);
		        query3.setParameter("idPostuElim", secureIdPostuElim);
		        query3.executeUpdate();
		        
		        String sql4 = "DELETE FROM \"calificacion_aux\" WHERE \"calificacion_aux\".\"id_usuario\"= :idPostuElim";
		        Query query4 = session.createSQLQuery(sql4);
		        query4.setParameter("idPostuElim", secureIdPostuElim);
		        query4.executeUpdate();  
		       
		        String sql5 = "DELETE FROM \"identidad_aux\" WHERE \"identidad_aux\".\"id_usuario\"= :idPostuElim";
		        Query query5 = session.createSQLQuery(sql5);
		        query5.setParameter("idPostuElim", secureIdPostuElim);
		        query5.executeUpdate();
		        
		        String sql6 = "DELETE FROM \"idioma_aux\" WHERE \"idioma_aux\".\"id_usuario\"= :idPostuElim";
		        Query query6 = session.createSQLQuery(sql6);
		        query6.setParameter("idPostuElim", secureIdPostuElim);
		        query6.executeUpdate();
		        

		        String sql7 = "DELETE FROM \"software_aux\" WHERE \"software_aux\".\"id_usuario\"= :idPostuElim";
		        Query query7 = session.createSQLQuery(sql7);
		        query7.setParameter("idPostuElim", secureIdPostuElim);
		        query7.executeUpdate();
		       
		        String sql8 = "DELETE FROM \"talento_aux\" WHERE \"talento_aux\".\"id_usuario\"= :idPostuElim";
		        Query query8 = session.createSQLQuery(sql8);
		        query8.setParameter("idPostuElim", secureIdPostuElim);
		        query8.executeUpdate();
		     
		        String sql9 = "DELETE FROM \"talento_aux\" WHERE \"talento_aux\".\"id_usuario\"= :idPostuElim";
		        Query query9 = session.createSQLQuery(sql9);
		        query9.setParameter("idPostuElim", secureIdPostuElim);
		        query9.executeUpdate();
		        
		        String sql10 = "DELETE FROM \"calificacion_aux\" WHERE \"calificacion_aux\".\"id_usuario\"= :idPostuElim";
		        Query query10 = session.createSQLQuery(sql10);
		        query10.setParameter("idPostuElim", secureIdPostuElim);
		        query10.executeUpdate();

		        String sql11 = "DELETE FROM \"datos_personales\" WHERE \"datos_personales\".\"id_usuario\"= :idPostuElim";
		        Query query11 = session.createSQLQuery(sql11);
		        query11.setParameter("idPostuElim", secureIdPostuElim);
		        query11.executeUpdate();
		        

		        String sql12 = "DELETE FROM \"disposicion\" WHERE \"disposicion\".\"id_usuario\"= :idPostuElim";
		        Query query12 = session.createSQLQuery(sql12);
		        query12.setParameter("idPostuElim", secureIdPostuElim);
		        query12.executeUpdate();

		        String sql13 = "DELETE FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"= :idPostuElim";
		        Query query13 = session.createSQLQuery(sql13);
		        query13.setParameter("idPostuElim", secureIdPostuElim);
		        query13.executeUpdate();

		        String sql14 = "DELETE FROM \"formacion_academica\" WHERE \"formacion_academica\".\"id_usuario\"= :idPostuElim";
		        Query query14 = session.createSQLQuery(sql14);
		        query14.setParameter("idPostuElim", secureIdPostuElim);
		        query14.executeUpdate();
			

		        String sql15 = "DELETE FROM \"filtro\" WHERE \"filtro\".\"id_usuario\"= :idPostuElim";
		        Query query15 = session.createSQLQuery(sql15);
		        query15.setParameter("idPostuElim", secureIdPostuElim);
		        query15.executeUpdate();
		        
		        String sql16 = "DELETE FROM \"experiencia\" WHERE \"experiencia\".\"id_usuario\"= :idPostuElim";
		        Query query16 = session.createSQLQuery(sql16);
		        query16.setParameter("idPostuElim", secureIdPostuElim);
		        query16.executeUpdate();
		        
		        String sql17 = "DELETE FROM \"foto\" WHERE \"foto\".\"id_usuario\"= :idPostuElim";
		        Query query17 = session.createSQLQuery(sql17);
		        query17.setParameter("idPostuElim", secureIdPostuElim);
		        query17.executeUpdate();

		        String sql18 = "DELETE FROM \"habilidad\" WHERE \"habilidad\".\"id_usuario\"= :idPostuElim";
		        Query query18 = session.createSQLQuery(sql18);
		        query18.setParameter("idPostuElim", secureIdPostuElim);
		        query18.executeUpdate();

		        String sql19 = "DELETE FROM \"horario_preferido\" WHERE \"horario_preferido\".\"id_usuario\"= :idPostuElim";
		        Query query19 = session.createSQLQuery(sql19);
		        query19.setParameter("idPostuElim", secureIdPostuElim);
		        query19.executeUpdate();

		        String sql20 = "DELETE FROM \"postulaciones\" WHERE \"postulaciones\".\"id_usuario\"= :idPostuElim";
		        Query query20 = session.createSQLQuery(sql20);
		        query20.setParameter("idPostuElim", secureIdPostuElim);
		        query20.executeUpdate();
		        
		        String sql21 = "DELETE FROM \"primer_filltro\" WHERE \"primer_filltro\".\"id_usuario\"= :idPostuElim";
		        Query query21 = session.createSQLQuery(sql21);
		        query21.setParameter("idPostuElim", secureIdPostuElim);
		        query21.executeUpdate();
		        
		        String sql22 = "DELETE FROM \"salario_deseado\" WHERE \"salario_deseado\".\"id_usuario\"= :idPostuElim";
		        Query query22 = session.createSQLQuery(sql22);
		        query22.setParameter("idPostuElim", secureIdPostuElim);
		        query22.executeUpdate();

		       

		        String sql24 = "DELETE FROM \"Ubicacion\" WHERE \"Ubicacion\".\"id_usuario\"= :idPostuElim";
		        Query query24 = session.createSQLQuery(sql24);
		        query24.setParameter("idPostuElim", secureIdPostuElim);
		        query24.executeUpdate();

		        String sql25 = "DELETE FROM \"usuario\" WHERE \"usuario\".\"id_postulante\"= :idPostuElim";
		        Query query25 = session.createSQLQuery(sql25);
		        query25.setParameter("idPostuElim", secureIdPostuElim);
		        query25.executeUpdate();
		        
		        String sql26 = "DELETE FROM \"mi_nuevo_filtro\" WHERE \"mi_nuevo_filtro\".\"id_usuario\"= :id_usuario";
		        Query query26 = session.createSQLQuery(sql26);
		        query26.setParameter("id_usuario", secureIdPostuElim);
		        query26.executeUpdate();
		        
		        tr.commit();
			 }catch(Exception e){
				 
				 tr.rollback();
			 }
		
		
		addActionError("Eliminacion Satisfactoria");
		     
		     return SUCCESS;
		 }
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}



	public String getIdPostuElim() {
		return idPostuElim;
	}



	public void setIdPostuElim(String idPostuElim) {
		
        this.idPostuElim = idPostuElim;
		
		
	}
	
	
}
