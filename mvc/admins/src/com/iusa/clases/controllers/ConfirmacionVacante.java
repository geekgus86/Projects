package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class ConfirmacionVacante extends ActionSupport{
	
	private String nombreVacante;
	private String folioVacante;
	private BigDecimal idVacante;
	private String subidoPor;

	
	Session session;
	
	
	public ConfirmacionVacante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	public String execute(){
		
		
		Transaction tran = session.beginTransaction();
		
		try{
			
			
			String sql_vacs =" SELECT \"vacante\".\"nombre_vacante\", \"vacante\".\"id_vacante\", \"vacante\".\"folio\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = (select max(\"vacante\".\"id_vacante\") from \"vacante\" where \"subido_por\"= :subidoPor)  ";
			
			Query A = session.createSQLQuery(sql_vacs);
			A.setParameter("subidoPor", subidoPor);
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         nombreVacante = (String) row.get("nombre_vacante");
		         folioVacante = (String) row.get("folio");
		         idVacante = (BigDecimal) row.get("id_vacante");
		         	
		     }
			
			
			
		tran.commit();
		
		}catch(Exception e){
			
			tran.rollback();
		}
		
		return SUCCESS;
	}


	public String getNombreVacante() {
		return nombreVacante;
	}


	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
	}


	public String getFolioVacante() {
		return folioVacante;
	}


	public void setFolioVacante(String folioVacante) {
		this.folioVacante = folioVacante;
	}


	public BigDecimal getIdVacante() {
		return idVacante;
	}


	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}


	public String getSubidoPor() {
		return subidoPor;
	}


	public void setSubidoPor(final String subidoPor) {
		this.subidoPor = subidoPor;
	}
	
}
