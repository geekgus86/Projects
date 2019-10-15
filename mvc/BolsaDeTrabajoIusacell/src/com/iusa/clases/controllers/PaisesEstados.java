package com.iusa.clases.controllers;

import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class PaisesEstados {
	
	protected List<String> Pais;
	protected List<String> Pais_cla;
	
	protected List<String> Estado;
	
	public List<String> getPais() {
		return Pais;
	}
	
	public void setPais(List<String> Pais) {
		this.Pais = Pais;
	}
	
	public List<String> getPaisCla() {
		return Pais_cla;
	}
	
	public void setPaisCla(List<String> Pais_cla) {
		this.Pais_cla = Pais_cla;
	}
	
	public List<String> getEstado() {
		return Estado;
	}
	
	public void setEstado(List<String> Estado) {
		this.Estado = Estado;
	}
	
	
	
	protected String clave_pais;
	protected String nombre_pais;
	protected String estado_nombre;
	
	public void paisesEstados(){
		
	
    	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
    	
    	
    	Transaction tr = session.beginTransaction();
    	try{
    	String sql_pais ="SELECT \"pais\".\"cla_pais\", \"pais\".\"pais\" FROM \"pais\"";
    	
    	Query pais_query = session.createSQLQuery(sql_pais);
		
		pais_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List PQ = pais_query.list();
		
		
		
		Pais = new ArrayList<String>();
		Pais_cla = new ArrayList<String>();
		
		for (Object object : PQ) {
	         Map row = (Map) object;
	         	clave_pais = (String) row.get("cla_pais");
	         	nombre_pais = (String) row.get("pais");
	         	
	         	Pais_cla.add(clave_pais);
	         	Pais.add(nombre_pais);
	         	
	         }
    	
		
		
		String sql_estado ="SELECT \"estado\".\"nombre_estado\", \"estado\".\"id_pais\" FROM \"estado\" WHERE \"estado\".\"id_pais\" = 'MEX'";
		
		
		Query pais_estado = session.createSQLQuery(sql_estado);
		
		pais_estado.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List EQ = pais_estado.list();
		
		
		
		Estado = new ArrayList<String>();
		
		
		for (Object object : EQ) {
	         Map row2 = (Map) object;
	         	estado_nombre = (String) row2.get("nombre_estado");
	         	
	         	Estado.add(estado_nombre);
	         	
	         	
	         }
		
		tr.commit();
    	}catch(Exception e){
    		tr.rollback();
    	}

		
	}

}
