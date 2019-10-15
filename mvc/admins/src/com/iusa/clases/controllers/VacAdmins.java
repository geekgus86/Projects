package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class VacAdmins extends ActionSupport {
	
	protected List<BigDecimal> idAdmin;
	protected List<String> UsuAdmin;
	
	protected List<BigDecimal> idTipoVac;
	protected List<String> tipoVacante;
	protected List<String> ubicacionTipo;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	private BigDecimal region;
	
	protected BigDecimal id;
	protected String usu;
	
	protected BigDecimal idT;
	protected String tipvac;
	protected String ubiVac;
	
	private String ubicacion;
	
	
	private BigDecimal id_Usuario;
	
	private String vac;
	private BigDecimal vac_id;
	
	private List<String> vacanteLista;
	private List<BigDecimal> vacanteListaId;
	
	
	
	Session session;
	
	public VacAdmins(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute() {
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user =  escapeChars((String) sesion.getAttribute("usuario"));
		
		Transaction trans = session.beginTransaction();
		
		try{
			
			
			
			
				
			
			 String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
		        
		        Query query1 = session.createSQLQuery(sql_admin_id);
		        query1.setParameter("user", user);
		        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		        List data1 = query1.list();
		        for (Object object : data1) {
		         Map row15 = (Map) object;
		           this.id_Usuario = (BigDecimal)row15.get("id_admin");
		           this.lvl = (BigDecimal)row15.get("nivel");
		         }
		        
		        String nivel=String.valueOf(lvl);
		        if(nivel.equals("2")){
		        vacanteLista=new ArrayList<String>();
		        vacanteListaId = new ArrayList<BigDecimal>();
				 String sql = "  SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" ORDER BY \"vacante\".\"nombre_vacante\" ASC ";
			     Query query = session.createSQLQuery(sql);
			     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			     List data = query.list();
			     for (Object object : data) {
			     	Map row3 = (Map) object;
			     	
			     	vac_id = (BigDecimal)row3.get("id_vacante");
			     	vac=(String)row3.get("nombre_vacante");
			     	
			     	vacanteListaId.add(vac_id);
			     	vacanteLista.add(vac);
			     	}
		        }else{
		        	vacanteLista=new ArrayList<String>();
			        vacanteListaId = new ArrayList<BigDecimal>();
					 String sql = "  SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :id_Usuario ORDER BY \"vacante\".\"nombre_vacante\" ASC ";
				     Query query = session.createSQLQuery(sql);
				     query.setParameter("id_Usuario", id_Usuario);
				     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				     List data = query.list();
				     for (Object object : data) {
				     	Map row3 = (Map) object;
				     	
				     	vac_id = (BigDecimal)row3.get("id_vacante");
				     	vac=(String)row3.get("nombre_vacante");
				     	
				     	vacanteListaId.add(vac_id);
				     	vacanteLista.add(vac);
				     	}
		        }
			     
		
		String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\"";
		
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
		
		
		
		String sql_tip ="SELECT \"vacante_tipo\".\"id_tipo\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" FROM \"vacante_tipo\"";
		
		Query T = session.createSQLQuery(sql_tip);
		
		T.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dT = T.list();
		
		idTipoVac = new ArrayList<BigDecimal>();
		tipoVacante = new ArrayList<String>();
		ubicacionTipo = new ArrayList<String>();
		
		for (Object object : dT) {
	         Map row2 = (Map) object;
	         idT = (BigDecimal) row2.get("id_tipo");
	         tipvac = (String) row2.get("tipo_vacante");
	         ubiVac = (String) row2.get("ubicacion");
	         idTipoVac.add(idT);
	         tipoVacante.add(tipvac);
	         ubicacionTipo.add(ubiVac);
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
	     region = DA.getRegion();
	     
	     ubicacion = DA.getUbicacion();
	     
	     
		return SUCCESS;
	}

	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
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
	
	public List<BigDecimal> getIdTipoVac() {
		return idTipoVac;
	}

	public void setIdTipoVac(List<BigDecimal> idTipoVac) {
		this.idTipoVac = idTipoVac;
	}

	public List<String> getTipoVacante() {
		return tipoVacante;
	}

	public void setTipoVacante(List<String> tipoVacante) {
		this.tipoVacante = tipoVacante;
	}

	public List<String> getUbicacionTipo() {
		return ubicacionTipo;
	}

	public void setUbicacionTipo(List<String> ubicacionTipo) {
		this.ubicacionTipo = ubicacionTipo;
	}

	public BigDecimal getIdAdministrador() {
		return idAdministrador;
	}

	public void setIdAdministrador(BigDecimal idAdministrador) {
		this.idAdministrador = idAdministrador;
	}

	public String getCeC() {
		return ceC;
	}

	public void setCeC(String ceC) {
		this.ceC = ceC;
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

	public BigDecimal getId_Usuario() {
		return id_Usuario;
	}

	

	public String getVac() {
		return vac;
	}

	public void setVac(String vac) {
		this.vac = vac;
	}

	public BigDecimal getVac_id() {
		return vac_id;
	}

	public void setVac_id(BigDecimal vac_id) {
		this.vac_id = vac_id;
	}

	public List<String> getVacanteLista() {
		return vacanteLista;
	}

	public void setVacanteLista(List<String> vacanteLista) {
		this.vacanteLista = vacanteLista;
	}

	public List<BigDecimal> getVacanteListaId() {
		return vacanteListaId;
	}

	public void setVacanteListaId(List<BigDecimal> vacanteListaId) {
		this.vacanteListaId = vacanteListaId;
	}

	public BigDecimal getRegion() {
		return region;
	}

	public void setRegion(BigDecimal region) {
		this.region = region;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

}
