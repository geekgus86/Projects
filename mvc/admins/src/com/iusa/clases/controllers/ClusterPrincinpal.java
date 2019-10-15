package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class ClusterPrincinpal {
	
	
	/* PARA LOS DATOS DEL ADMINISTRADOR */
	private BigDecimal idAdministrador;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	/* PARA EL COMBO DE LOS ADMINS */
	
	private BigDecimal id;
	private String usu;
	
	private List<BigDecimal> idAdmin;
	private List<String> UsuAdmin;
	
	
	
	/* PARA LOS ADMINS QUE SEAN ADMINISTRADORES NORMALES*/
	
	private BigDecimal id2;
	private String usu2;
	
	private List<BigDecimal> idAdmin2;
	private List<String> UsuAdmin2;
	
	
	/* PARA LOS ADMIS QUE SEAN CALIFICADORES*/
	private BigDecimal id3;
	private String usu3;
	
	private List<BigDecimal> idAdmin3;
	private List<String> UsuAdmin3;
	
	
	
	private List<String> estado;
	private List<BigDecimal> estado_id;
	
	
	private String edo;
	private BigDecimal edo_id;
	
	Session session;
	
	public ClusterPrincinpal(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		

		Transaction trans = session.beginTransaction();
		
		try{
			
			
			String sql_admin =" SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"nivel\" != '1' AND \"admins\".\"nivel\" != '4' ";
			
			Query A = session.createSQLQuery(sql_admin);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			idAdmin = new ArrayList<BigDecimal>();
			UsuAdmin = new ArrayList<String>();
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         	id = (BigDecimal) row.get("id_admin");
		         	usu = (String) row.get("nombre");
		         	idAdmin.add(id);
		         	UsuAdmin.add(usu);
		     }
			
			
			
			
			String sql_admin2 =" SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"nivel\" != '1' AND \"admins\".\"nivel\" != '4' ";
			
			Query A2 = session.createSQLQuery(sql_admin2);
			
			A2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA2 = A2.list();
			
			idAdmin2 = new ArrayList<BigDecimal>();
			UsuAdmin2 = new ArrayList<String>();
			
			for (Object object : dA2) {
		         Map row2 = (Map) object;
		         	id2 = (BigDecimal) row2.get("id_admin");
		         	usu2 = (String) row2.get("nombre");
		         	idAdmin2.add(id2);
		         	UsuAdmin2.add(usu2);
		     }
			
			
			String sql_admin3 ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"nivel\" = '4'";
			
			Query A3 = session.createSQLQuery(sql_admin3);
			
			A3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA3 = A3.list();
			
			idAdmin3 = new ArrayList<BigDecimal>();
			UsuAdmin3 = new ArrayList<String>();
			
			for (Object object : dA3) {
		         Map row3 = (Map) object;
		         	id3 = (BigDecimal) row3.get("id_admin");
		         	usu3 = (String) row3.get("nombre");
		         	idAdmin3.add(id3);
		         	UsuAdmin3.add(usu3);
		     }
			
			
			
			
			estado=new ArrayList<String>();
			estado_id = new ArrayList<BigDecimal>();
			 String sql = "SELECT \"estado\".\"id_estado\", \"estado\".\"nombre_estado\" FROM \"estado\" ORDER BY \"estado\".\"nombre_estado\" ";
		     Query query = session.createSQLQuery(sql);
		     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		     List data = query.list();
		     for (Object object : data) {
		     	Map row = (Map) object;
		     	
		     	edo_id = (BigDecimal)row.get("id_estado");
		     	edo=(String)row.get("nombre_estado");
		     	
		     	estado_id.add(edo_id);
		     	estado.add(edo);
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
		
		return "success";
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



	public BigDecimal getId() {
		return id;
	}



	public void setId(BigDecimal id) {
		this.id = id;
	}



	public String getUsu() {
		return usu;
	}



	public void setUsu(String usu) {
		this.usu = usu;
	}



	public List<BigDecimal> getIdAdmin() {
		return idAdmin;
	}



	public void setIdAdmin(List<BigDecimal> idAdmin) {
		this.idAdmin = idAdmin;
	}



	public List<String> getUsuAdmin() {
		return UsuAdmin;
	}



	public void setUsuAdmin(List<String> usuAdmin) {
		UsuAdmin = usuAdmin;
	}

	public List<String> getEstado() {
		return estado;
	}

	public void setEstado(List<String> estado) {
		this.estado = estado;
	}

	public List<BigDecimal> getEstado_id() {
		return estado_id;
	}

	public void setEstado_id(List<BigDecimal> estado_id) {
		this.estado_id = estado_id;
	}

	public String getEdo() {
		return edo;
	}

	public void setEdo(String edo) {
		this.edo = edo;
	}

	public BigDecimal getEdo_id() {
		return edo_id;
	}

	public void setEdo_id(BigDecimal edo_id) {
		this.edo_id = edo_id;
	}

	public BigDecimal getId2() {
		return id2;
	}

	public void setId2(BigDecimal id2) {
		this.id2 = id2;
	}

	public String getUsu2() {
		return usu2;
	}

	public void setUsu2(String usu2) {
		this.usu2 = usu2;
	}

	public List<BigDecimal> getIdAdmin2() {
		return idAdmin2;
	}

	public void setIdAdmin2(List<BigDecimal> idAdmin2) {
		this.idAdmin2 = idAdmin2;
	}

	public List<String> getUsuAdmin2() {
		return UsuAdmin2;
	}

	public void setUsuAdmin2(List<String> usuAdmin2) {
		UsuAdmin2 = usuAdmin2;
	}

	public BigDecimal getId3() {
		return id3;
	}

	public void setId3(BigDecimal id3) {
		this.id3 = id3;
	}

	public String getUsu3() {
		return usu3;
	}

	public void setUsu3(String usu3) {
		this.usu3 = usu3;
	}

	public List<BigDecimal> getIdAdmin3() {
		return idAdmin3;
	}

	public void setIdAdmin3(List<BigDecimal> idAdmin3) {
		this.idAdmin3 = idAdmin3;
	}

	public List<String> getUsuAdmin3() {
		return UsuAdmin3;
	}

	public void setUsuAdmin3(List<String> usuAdmin3) {
		UsuAdmin3 = usuAdmin3;
	}

}
