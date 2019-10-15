package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.iusa.clases.models.DatosPersonales;
import com.iusa.clases.models.TalentoAux;
import com.iusa.clases.models.Usuario;
import com.iusa.clases.interceptor.CaracterNoValidoException;


public class ActualizarTalentos extends ActualizarDatos{
	
	public int porcentaje;
	public String color;
	public int talento;
	public int numero;
	
	
	
 public String execute(){
	 
	 HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
		
		Transaction tr = session.beginTransaction();
		try{
		this.user=escapeChars((String) sesion.getAttribute("usuario"));
		String sql = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
	    Query query = session.createSQLQuery(sql).setParameter("user", user);
	    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data = query.list();
	    for (Object object : data) {
	    	Map row = (Map) object;
	    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
	    	}
	 
	    
	    String sql1 = "SELECT \"talento_aux\".\"id_aux_talento\" FROM \"talento_aux\" WHERE \"talento_aux\".\"color\"=:color AND \"talento_aux\".\"id_usuario\"=:idUsuario";
	    Query query1 = session.createSQLQuery(sql1).setParameter("color", color).setParameter("idUsuario", idUsuario);
	    query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    
	   
	    if(query1.list().size()<1){
        	
		    TalentoAux t=new TalentoAux();
		    t.setIdTalento(talento);
		    t.setPorcentaje(porcentaje);
		    t.setColor(color);
		    t.setIdUsuario(idUsuario);
		    t.setNumcolor(numero);
		    session.save(t);
		    tr.commit();
        	
        }else if(query1.list().size()==1){
        	String sql2 = "UPDATE \"talento_aux\" SET \"porcentaje\"=:porcentaje,\"id_talento\"=:talento,\"grado\"=:numero WHERE \"id_usuario\"=:idUsuario AND \"color\"=:color";
            Query query2 = session.createSQLQuery(sql2).setParameter("porcentaje", porcentaje).setParameter("talento", talento).setParameter("numero", numero).setParameter("idUsuario", idUsuario).setParameter("color", color);
            query2.executeUpdate();
            tr.commit();
         
        	
        }
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
 
 public int getTalento() {
		return talento;
	}
	public void setTalento(int talento) {
		this.talento = talento;
	}
	public int getPorcentaje() {
		return porcentaje;
	}
	public void setPorcentaje(int porcentaje) {
		this.porcentaje = porcentaje;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	 public int getNumero() {
			return numero;
		}
		public void setNumero(int numero) {
			this.numero = numero;
		}
 
}
