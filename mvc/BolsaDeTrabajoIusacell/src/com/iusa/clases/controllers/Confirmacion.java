package com.iusa.clases.controllers;



import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

import org.apache.struts2.ServletActionContext;
//import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import com.iusa.clases.models.DatosPersonales;
//import com.opensymphony.xwork2.ActionContext;
import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

public class Confirmacion extends ActionSupport {
	
	private String usuario;
	private BigDecimal idUsuario;
	private String nombre;
	
	

	
	protected List<String> VDG;
	protected List<String> VDG2;
	protected List<String> VDG3;
	
	
	
	
	protected List<String> VDR;
	protected List<String> VDR2;
	protected List<String> VDR3;
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String execute(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
 
		Transaction tr = session.beginTransaction();
		
        try{
        this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
        String sql = "SELECT \"usuario\".\"id_postulante\",\"usuario\".\"nombre\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
        Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	  this.nombre=(String)row.get("nombre");
        	    
        	}

        
        
        

		
		Destacados jup2 = new Destacados();
		
		jup2.execute();
		
		VDR = jup2.getVacantesDestacadosOro();
		VDR2 = jup2.getVacantesDestacadosOro2();
		VDR3 = jup2.getVacantesDestacadosOro3();
        
        String message="<p style='text-align:justify;'><strong style='color:crimson;'>Grupo Iusacell</strong> empresa líder en el ramo de Telecomunicaciones busca la excelencia y calidad en sus productos y servicios. Sabemos que nuestro Talento humano es punto clave para alcanzar el éxito,  por lo que buscamos personas emprendoras ,  con metas ambiciosas y mentalidad ganadora.</p><p style='text-align:justify;'>Agradecemos tu interés en formar parte de nuestro equipo de trabajo, haz iniciado  el proceso de selección, si cubres el perfil uno de nuestros ejecutivos  de Recursos Humanos se pondrá en contacto contigo para indicarte el siguiente paso.</p>";
        
        String corr="",p="";
        String sqlmail = "SELECT \"correo_iusa\".\"cuenta\",\"correo_iusa\".\"password\" from \"correo_iusa\" WHERE \"correo_iusa\".\"id\"=:idm";
        Query querymail = session.createSQLQuery(sqlmail).setParameter("idm", 1);
        querymail.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = querymail.list();
        for (Object object : data2) {
        	Map row = (Map) object;
        	corr=(String)row.get("cuenta");
        	p=(String)row.get("password");
        	}
        
        tr.commit();
        MailConfirmacion mc=new MailConfirmacion(usuario,message,"Bienvenido a la Red Profesional Iusacell",corr,p);
        mc.sendMail();
        }catch(MessagingException e){
        	return SUCCESS;
        }catch(Exception e){tr.rollback();}
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
	
	public String getNombre() {
		return nombre;
	}


	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	

	public List<String> getVDR() {
		return VDR;
	}
	public List<String> getVDR2() {
		return VDR2;
	}
	public List<String> getVDR3() {
		return VDR3;
	}
}
