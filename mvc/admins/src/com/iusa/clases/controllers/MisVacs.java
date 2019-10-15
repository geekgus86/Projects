package com.iusa.clases.controllers;



import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class MisVacs extends ActionSupport {
	
	protected BigDecimal idAdmin;
	
	
	protected List<BigDecimal> idTipoVac;
	protected List<String> tipoVacante;
	protected List<String> ubicacionTipo;

	protected BigDecimal id;
	protected String usu;
	
	protected BigDecimal idT;
	protected String tipvac;
	protected String ubiVac;
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	private String ubicacion;
	
	
	private List<String> vacanteLista;
	private List<BigDecimal> vacanteListaId;
	
	
	
	private List<BigDecimal> idUbiClusList;
	private List<String> vnombreUbiClusList;
	
	private String vac;
	private BigDecimal vac_id;
	
	
	private BigDecimal idU;
	private String nombU;
	
	Session session;
	
	public MisVacs(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	public String execute() {
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
		
	    Transaction trans = session.beginTransaction();
	    
	    try{
		
			String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
			
			Query A = session.createSQLQuery(sql_admin);
			A.setParameter("user", user);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         this.idAdmin = (BigDecimal) row.get("id_admin");
		         	
		     }

			
			
			vacanteLista=new ArrayList<String>();
	        vacanteListaId = new ArrayList<BigDecimal>();
				
				 String sql ="SELECT * FROM (SELECT  ROWNUM AS FILAS, \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :id_Usuario  ORDER BY \"vacante\".\"nombre_vacante\" ASC ) where FILAS BETWEEN 0  AND 5 ";
			     Query query = session.createSQLQuery(sql);
			     query.setParameter("id_Usuario", idAdmin);
			     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			     List data = query.list();
			     for (Object object : data) {
			     	Map row3 = (Map) object;
			     	
			     	vac_id = (BigDecimal)row3.get("id_vacante");
			     	vac=(String)row3.get("nombre_vacante");
			     	
			     	vacanteListaId.add(vac_id);
			     	vacanteLista.add(vac);
			     	}
			
			
			     
			     vnombreUbiClusList=new ArrayList<String>();
				  	idUbiClusList = new ArrayList<BigDecimal>();
			     	
					 String sqlCLU = " SELECT \"estado\".\"nombre_estado\", \"estado\".\"id_estado\" FROM \"clusters_ubicacion\" ,\"estado\" WHERE \"clusters_ubicacion\".\"id_admin\" = :idAdmin AND \"clusters_ubicacion\".\"id_estado\" = \"estado\".\"id_estado\" ORDER BY \"estado\".\"nombre_estado\" ASC ";
				     Query queryCLU = session.createSQLQuery(sqlCLU);
				     queryCLU.setParameter("idAdmin", idAdmin);
				     queryCLU.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				     List dataCLU = queryCLU.list();
				     for (Object object : dataCLU) {
				     	Map row3CLU = (Map) object;
				     	
				     	idU = (BigDecimal)row3CLU.get("id_estado");
				     	nombU=(String)row3CLU.get("nombre_estado");
				     	
				     	idUbiClusList.add(idU);
				     	vnombreUbiClusList.add(nombU);
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
	     ubicacion = DA.getUbicacion();
		
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
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
	
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
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
	public List<BigDecimal> getIdUbiClusList() {
		return idUbiClusList;
	}
	public void setIdUbiClusList(List<BigDecimal> idUbiClusList) {
		this.idUbiClusList = idUbiClusList;
	}
	public List<String> getVnombreUbiClusList() {
		return vnombreUbiClusList;
	}
	public void setVnombreUbiClusList(List<String> vnombreUbiClusList) {
		this.vnombreUbiClusList = vnombreUbiClusList;
	}
	public BigDecimal getIdU() {
		return idU;
	}
	public void setIdU(BigDecimal idU) {
		this.idU = idU;
	}
	public String getNombU() {
		return nombU;
	}
	public void setNombU(String nombU) {
		this.nombU = nombU;
	}
	
}
