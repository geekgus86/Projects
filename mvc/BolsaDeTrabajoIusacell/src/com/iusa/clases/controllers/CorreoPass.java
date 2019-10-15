package com.iusa.clases.controllers;

import java.util.Properties;

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
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;

public class CorreoPass{
    
	public String mail;
	public String message;
	public String password;
	public String correo_electronico;
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String execute(){
		
		Transaction tr = session.beginTransaction();
		try{
		
		String sql = "SELECT \"usuario\".\"password\",\"usuario\".\"correo_electronico\" FROM \"usuario\" WHERE \"usuario\".\"correo_electronico\"=:mail AND \"usuario\".\"usuario_nombre\"=:mail";
        Query query = session.createSQLQuery(sql).setParameter("mail", mail).setParameter("mail", mail);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        
        
        if(!data.isEmpty()){
        for (Object object : data) {
        	Map row = (Map) object;
        	this.password=(String)row.get("password");
        	this.correo_electronico=(String)row.get("correo_electronico");
        	}

        message="<p style='text-align:center;'>Bienvenido a la Red Profesional de <strong style='color:crimson;'>Grupo Iusacell</strong>.  Tus datos de ingreso son los siguientes:</p><p style='font-weight:bold; text-align:center; '>Usuario:"+correo_electronico+"</p><p style='font-weight:bold; text-align:center;'>Contraseña:"+password+"</p>";

        String corr="",p="";
        String sqlmail = "SELECT \"correo_iusa\".\"cuenta\",\"correo_iusa\".\"password\" FROM \"correo_iusa\" WHERE \"correo_iusa\".\"id\"=:idm";
        Query querymail = session.createSQLQuery(sqlmail).setParameter("idm", 1);
        querymail.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = querymail.list();
        for (Object object : data2) {
        	Map row = (Map) object;
        	corr=(String)row.get("cuenta");
        	p=(String)row.get("password");
        	}
        

		MailConfirmacion m=new MailConfirmacion(mail,message,"Recuperacion Password",corr,p);
		m.sendMail();
        }
		tr.commit();
		}catch(Exception e){

			tr.rollback();
		}
	  return "success";
  }
	
	


	
	public void setMail(String mail){

		this.mail=mail;
	}
	
	public String getMail(){
		return mail;
	}
		
}
