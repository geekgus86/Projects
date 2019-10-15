package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.Ubicacion;
import com.iusa.clases.models.Usuario;
import com.iusa.clases.interceptor.CaracterNoValidoException;

public class ActualizarUbicacion extends ActualizarDatos {
  
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
			
			
		String sql1 = "SELECT \"Ubicacion\".\"id_usuario\" FROM \"Ubicacion\" WHERE \"Ubicacion\".\"id_usuario\"=:idUsuario";
        Query query1 = session.createSQLQuery(sql1).setParameter("idUsuario", idUsuario);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        if(query1.list().size()<1){
        	
      		///insertar datos actualizados de usuario
      		 Ubicacion u=new Ubicacion();
      		 u.setIdUsuario(idUsuario);
      		 u.setCalleYNumero(calleYNumero);
      		 u.setCiudadPoblado(ciudadPoblado);
      		 u.setColonia(colonia);
      		 u.setCp(cp);
      		 u.setEstadoPais(estadoPais);
      		 u.setMunicipioODelegacion(municipioODelegacion);
      		 u.setNacionalidad(nacionalidad);
      		 session.save(u);
      		 
      		
      		
        	
        }else if(query1.list().size()==1){
        	
        	
            Query query2 = session.createSQLQuery("UPDATE \"Ubicacion\" SET \"Ubicacion\".\"calle_numero\"=:calleYNumero,\"Ubicacion\".\"colonia\"=:colonia,\"Ubicacion\".\"municipio_delegacion\"=:municipioODelegacion,\"Ubicacion\".\"cp\"=:cp,\"Ubicacion\".\"ciudad_poblado\"=:ciudadPoblado,\"Ubicacion\".\"estado\"=:estadoPais,\"Ubicacion\".\"nacionalidad\"=:nacionalidad WHERE \"Ubicacion\".\"id_usuario\"=:idUsuario");
            		query2.setParameter("calleYNumero", calleYNumero);
            		query2.setParameter("colonia", colonia);
            		query2.setParameter("municipioODelegacion", municipioODelegacion);
            		query2.setParameter("cp", cp);
            		query2.setParameter("ciudadPoblado", ciudadPoblado);
            		query2.setParameter("estadoPais", estadoPais);
            		query2.setParameter("nacionalidad", nacionalidad);
            		query2.setParameter("idUsuario", idUsuario);
            query2.executeUpdate();
            
    		Query query3 = session.createSQLQuery("UPDATE \"usuario\" SET \"usuario\".\"telefono\"=:telefono, \"usuario\".\"telefono_extra\"=:telefono_extra WHERE \"usuario\".\"id_postulante\"=:idUsuario");
    				query3.setParameter("telefono", telefono);
    				query3.setParameter("telefono_extra", telefono_extra);
    				query3.setParameter("idUsuario", idUsuario);
            query3.executeUpdate();
            
        	
        }
       
        tr.commit();
		}catch(Exception e){
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
	
	
}
