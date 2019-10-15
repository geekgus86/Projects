package com.iusa.clases.controllers;

import iusacell.red_profesional.admins.form.vacantepredeform;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.*;
import com.opensymphony.xwork2.ActionSupport;

public class GuardaVacantePred extends ActionSupport {
	
	protected BigDecimal id_vacpre;
	protected BigDecimal id_vac;
	protected BigDecimal status;
    protected String puesto_ofre;
    protected String desc_emp;
    protected String edad;
    protected String escolaridad;
    protected String func_respo;
    protected String compe;
    protected String conoci;
   
    
    
    private BigDecimal secuencia;



	Session session;
	
	public GuardaVacantePred(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
    
	public String execute(){
		
		
		Transaction tran = session.beginTransaction();

		//String sql_sec ="select max("id_vacante") + 1 from BOLSAIUSACELL."vacante"";
		String sql_sec ="select max(id_vacpre) + 1 AS NUMSEC from Vacantes_Pre";
		
		Query AS = session.createSQLQuery(sql_sec);
		
		AS.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dAS = AS.list();
		
		
		
		for (Object object : dAS) {
	         Map rowS = (Map) object;
	         secuencia = (BigDecimal) rowS.get("NUMSEC");
	         	
	     }

		try{
			
	   	 	vacantepredeform vac = new vacantepredeform();
	   	 	
	   	 	vac.setId_vacpre(secuencia);
	   	 	vac.setDesc_emp(desc_emp);
	   	 	vac.setPuesto_ofre(puesto_ofre);
	   	 	vac.setEdad(edad);
	   	 	vac.setEscolaridad(escolaridad);
	     	vac.setFunc_respo(func_respo);
	     	vac.setCompe(compe);
	     	vac.setConoci(conoci);
	     	vac.setStatus(status);
	     	vac.setId_vac(id_vac);
	     	
	     	session.save(vac);

    	tran.commit();
		
		}catch(Exception e){
			
			tran.rollback();
		}
     	
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}


	public String getPuesto_ofre() {
		return puesto_ofre;
	}

	public void setPuesto_ofre(String puesto_ofre) {
		this.puesto_ofre = puesto_ofre;
	}

	public String getDesc_emp() {
		return desc_emp;
	}

	public void setDesc_emp(String desc_emp) {
		this.desc_emp = desc_emp;
	}

	public String getEdad() {
		return edad;
	}

	public void setEdad(String edad) {
		this.edad = edad;
	}

	public String getEscolaridad() {
		return escolaridad;
	}

	public void setEscolaridad(String escolaridad) {
		this.escolaridad = escolaridad;
	}

	public String getFunc_respo() {
		return func_respo;
	}

	public void setFunc_respo(String func_respo) {
		this.func_respo = func_respo;
	}

	public String getCompe() {
		return compe;
	}

	public void setCompe(String compe) {
		this.compe = compe;
	}

	public String getConoci() {
		return conoci;
	}

	public void setConoci(String conoci) {
		this.conoci = conoci;
	}

	public BigDecimal getSecuencia() {
		return secuencia;
	}

	public void setSecuencia(BigDecimal secuencia) {
		this.secuencia = secuencia;
	}

	public BigDecimal getId_vacpre() {
		return id_vacpre;
	}

	public void setId_vacpre(BigDecimal id_vacpre) {
		this.id_vacpre = id_vacpre;
	}

	public BigDecimal getId_vac() {
		return id_vac;
	}

	public void setId_vac(BigDecimal id_vac) {
		this.id_vac = id_vac;
	}

	public BigDecimal getStatus() {
		return status;
	}

	public void setStatus(BigDecimal status) {
		this.status = status;
	}

	
}
