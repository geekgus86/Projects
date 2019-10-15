package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class TipsPrincipal extends ActionSupport{

	private List<BigDecimal> idTip;
	private List<BigDecimal> idTip2;
	private List<String> DesTip;
	
	private BigDecimal tip_id;
	private BigDecimal tip_id2;
	private String tip_des;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	Session session;
	
	public TipsPrincipal(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
	Transaction trans = session.beginTransaction();
	
	try{
		
		String sql_tip ="SELECT  ROWNUM AS IDTIPNUEVO, \"tips\".\"id_tip\", \"tips\".\"tip_descripcion\" FROM \"tips\" ORDER BY \"tips\".\"id_tip\" ASC";
		
		Query A = session.createSQLQuery(sql_tip);
		
		A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dA = A.list();
		
		idTip = new ArrayList<BigDecimal>();
		idTip2 = new ArrayList<BigDecimal>();
		DesTip = new ArrayList<String>();
		
		for (Object object : dA) {
	         Map row = (Map) object;
	         tip_id = (BigDecimal) row.get("id_tip");
	         tip_id2 = (BigDecimal) row.get("IDTIPNUEVO");
	         tip_des = (String) row.get("tip_descripcion");
	         	idTip.add(tip_id);
	         	idTip2.add(tip_id2);
	         	DesTip.add(tip_des);
	     }
		
	
		trans.commit();
		
	}catch(Exception e){
		trans.rollback();
	}
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
	     
	     
		return SUCCESS;
	}
	
	
	public BigDecimal getIdAdministrador() {
		return idAdministrador;
	}
	public void setIdAdministrador(BigDecimal idAdministrador) {
		this.idAdministrador = idAdministrador;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getCeC() {
		return ceC;
	}
	public void setCeC(String ceC) {
		this.ceC = ceC;
	}
	public BigDecimal getLvl() {
		return lvl;
	}
	public void setLvl(BigDecimal lvl) {
		this.lvl = lvl;
	}
	public String getNombreAdmin() {
		return nombreAdmin;
	}
	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}


	public List<BigDecimal> getIdTip() {
		return idTip;
	}


	public void setIdTip(List<BigDecimal> idTip) {
		this.idTip = idTip;
	}


	public List<String> getDesTip() {
		return DesTip;
	}


	public void setDesTip(List<String> desTip) {
		DesTip = desTip;
	}


	public BigDecimal getTip_id() {
		return tip_id;
	}


	public void setTip_id(BigDecimal tip_id) {
		this.tip_id = tip_id;
	}


	public String getTip_des() {
		return tip_des;
	}


	public void setTip_des(String tip_des) {
		this.tip_des = tip_des;
	}

	public List<BigDecimal> getIdTip2() {
		return idTip2;
	}

	public void setIdTip2(List<BigDecimal> idTip2) {
		this.idTip2 = idTip2;
	}

	public BigDecimal getTip_id2() {
		return tip_id2;
	}

	public void setTip_id2(BigDecimal tip_id2) {
		this.tip_id2 = tip_id2;
	}
	
	
	
}
