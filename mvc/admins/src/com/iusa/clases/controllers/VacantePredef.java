package com.iusa.clases.controllers;

import iusacell.red_profesional.admins.form.nuevavacanteform;

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

import com.ibm.ws.webservices.xml.wassysapp.systemApp;
import com.opensymphony.xwork2.ActionSupport;



public class VacantePredef extends ActionSupport {

	private List<String> tipo_vac;
	private List<BigDecimal> id_tipo_vac;
	private List<String> ubicacion_tipo_vac;
	private List<nuevavacanteform> lstcomp;
	private List<nuevavacanteform> lstvac;
	private List<nuevavacanteform> lstpre;

	private String edo;
	private BigDecimal edo_id;
	
	private List<String> estado;
	private List<BigDecimal> estado_id;
	
	private String tipo_vac_datoR;
	private BigDecimal id_vac_datoR;
	private String ubicacion_vac_datoR;
	
	protected List<BigDecimal> id_A;
	protected List<String> nom_U;
	
	private String ultimo_folio ;
	private BigDecimal idAdmin;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String ubicacionAdmin;
	
	private String ubicacion;
	private BigDecimal region;
	
	
	private BigDecimal NumeroDestacados;
	private int destacadosCompletos;
	

	private BigDecimal NumeroDestacadosN;
	private int destacadosCompletosN;
	
	private List<String> grado;
	private List<String> grado_id;
	
	private List<String> areaInteres;
	
	
	Session session;
	
	public VacantePredef(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
		
	    Transaction trans = session.beginTransaction();
	    
	    try{
	    	String sql_company ="SELECT * from companias_Vac";
			
			Query company_query = session.createSQLQuery(sql_company);
			
			company_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List pS = company_query.list();
			
			lstcomp= new ArrayList<nuevavacanteform>();
			for (Object object : pS) {
				 Map row = (Map) object;
				 nuevavacanteform setInf = new nuevavacanteform();
				 BigDecimal  obtnId=(BigDecimal) row.get("ID_COMP");
				 String v=String.valueOf(obtnId);
				 String obtnDato=(String) row.get("DESC_COMP");
				 String obtnImage=(String) row.get("IMAGE");
				 setInf.setId_comp(Integer.parseInt(v));
				 setInf.setDesc_comp(obtnDato);
				 setInf.setImage(obtnImage);
				 lstcomp.add(setInf);
			}
			
			String sql_vac ="SELECT * from Vacantes_comp";
			
			Query vac_query = session.createSQLQuery(sql_vac);
			
			vac_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List vS = vac_query.list();
			
			lstvac= new ArrayList<nuevavacanteform>();
			for (Object object : vS) {
				 Map row = (Map) object;
				 nuevavacanteform setInf = new nuevavacanteform();
				 BigDecimal obtnId=(BigDecimal) row.get("ID_VAC");
				 String obtnDato=(String) row.get("DESC_VAC");
				 BigDecimal obtnIdcomp=(BigDecimal) row.get("ID_COMP");
				 String x = String.valueOf(obtnId);
				 String y = String.valueOf(obtnIdcomp);
				 setInf.setId_vac(Integer.parseInt(x));
				 setInf.setDesc_vac(obtnDato);
				 setInf.setId_comp(Integer.parseInt(y));
				 lstvac.add(setInf);
			}
			
			String sql_pre ="SELECT * from Vacantes_Pre";
			
			Query pre_query = session.createSQLQuery(sql_pre);
			
			pre_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List Pr = pre_query.list();
			
			lstpre= new ArrayList<nuevavacanteform>();
			for (Object object : Pr) {
				 Map row = (Map) object;
				 nuevavacanteform setInf = new nuevavacanteform();
				 BigDecimal obtnId=(BigDecimal) row.get("ID_VACPRE");
				 String obtnPues=(String) row.get("PUESTO_OFRE");
				 String obtnDescemp=(String) row.get("DESC_EMP");
				 String obtnEdad=(String) row.get("EDAD");
				 String obtnEsco=(String) row.get("ESCOLARIDAD");
				 String obtnUbi=(String) row.get("UBICACION");
				 String obtnSal=(String) row.get("SALARIO");
				 String obtnHor=(String) row.get("HORARIO");
				 String obtnFunc_res=(String) row.get("FUNC_RESPO");
				 String obtnCono=(String) row.get("CONOCI");
				 String obtnFec_pu=(String) row.get("FEC_PUBLI");
				 String obtnCorreo=(String) row.get("CORREO");
				 String obtnTel=(String) row.get("TEL");
				 BigDecimal obtnIdvac=(BigDecimal) row.get("ID_VAC");
				 BigDecimal obtnSta=(BigDecimal) row.get("STATUS");
				 String obtnCompe=(String) row.get("COMPE");
				 String x = String.valueOf(obtnId);
				 String y = String.valueOf(obtnIdvac);
				 String z= String.valueOf(obtnIdvac);
				 String a= String.valueOf(obtnSta);	 
				 setInf.setId_vacpre(Integer.parseInt(x));
				 setInf.setDesc_emp(obtnDescemp);
				 setInf.setPuesto_ofre(obtnPues);
				 setInf.setEdad(obtnEdad);
				 setInf.setEscolaridad(obtnEsco);
				 setInf.setUbicacion(obtnUbi);
				 setInf.setSalario(obtnSal);
				 setInf.setHorario(obtnHor);
				 setInf.setFunc_respo(obtnFunc_res);
				 setInf.setConoci(obtnCono);
				 setInf.setFec_publi(obtnFec_pu);
				 setInf.setCorreo(obtnCorreo);
				 setInf.setTel(obtnTel);
				 setInf.setId_vac(Integer.parseInt(z));
				 setInf.setStatus(Integer.parseInt(a));
				 setInf.setCompe(obtnCompe);
				 lstpre.add(setInf);
			}
	
	
	
		String sql_tipos_vac ="SELECT \"vacante_tipo\".\"id_tipo\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" FROM \"vacante_tipo\"";
		
		Query tipos_query = session.createSQLQuery(sql_tipos_vac);
		
		tipos_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List TQ = tipos_query.list();
		
		 tipo_vac = new ArrayList<String>();
		 id_tipo_vac = new ArrayList<BigDecimal>();
		 ubicacion_tipo_vac = new ArrayList<String>();
		for (Object object : TQ) {
	         Map row = (Map) object;
	         id_vac_datoR = (BigDecimal) row.get("id_tipo");
	         tipo_vac_datoR = (String) row.get("tipo_vacante");
	         ubicacion_vac_datoR	=(String) row.get("ubicacion");
	         	
	         
	         tipo_vac.add(tipo_vac_datoR);
	         id_tipo_vac.add(id_vac_datoR);
	     	 ubicacion_tipo_vac.add(ubicacion_vac_datoR);
	         	
	         	
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
	     
		
		
	
		
		String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
		
		Query A = session.createSQLQuery(sql_admin);
		
		A.setParameter("user", user);
		
		A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dA = A.list();
		
		
		
		for (Object object : dA) {
	         Map row = (Map) object;
	         	idAdmin = (BigDecimal) row.get("id_admin");
	         	
	     }
		
		
		
		
		
	     
	   
				
			
				String sql_num_destacados ="SELECT Count(\"vacante\".\"id_vacante\")AS numero FROM \"vacante\" WHERE \"vacante\".\"destacado\" != '0' AND \"vacante\".\"region\" = :region ";
				
				Query DV = session.createSQLQuery(sql_num_destacados);
				
				DV.setParameter("region", region);
				
				DV.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dDV = DV.list();
				
				
				
				for (Object object : dDV) {
			         Map row6 = (Map) object;
			         NumeroDestacados = (BigDecimal) row6.get("NUMERO");
			     }
		     
				
				if(NumeroDestacados.intValueExact() == 5){
					destacadosCompletos = 1;
				}else{
					destacadosCompletos = 0;
				}
				
				
				
				String sql_num_destacadosN ="SELECT Count(\"vacante\".\"id_vacante\")AS numero FROM \"vacante\" WHERE \"vacante\".\"destacado_nacional\" != '0' ";
				
				Query DVN = session.createSQLQuery(sql_num_destacadosN);
				
				DVN.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dDVN = DVN.list();
				
				
				
				for (Object object : dDVN) {
			         Map rowN = (Map) object;
			         NumeroDestacadosN = (BigDecimal) rowN.get("NUMERO");
			     }
		     
				
				if(NumeroDestacadosN.intValueExact() == 5){
					destacadosCompletosN = 1;
				}else{
					destacadosCompletosN = 0;
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
		     region = DA.getRegion();
		     ubicacionAdmin = DA.getUbicacion();
			
			llenarGrado();
			llenarArea();
		
		 
		return SUCCESS;
	}

	
	
	public List<nuevavacanteform> getLstpre() {
		return lstpre;
	}

	public void setLstpre(List<nuevavacanteform> lstpre) {
		this.lstpre = lstpre;
	}

	public List<nuevavacanteform> getLstvac() {
		return lstvac;
	}

	public void setLstvac(List<nuevavacanteform> lstvac) {
		this.lstvac = lstvac;
	}

	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public void llenarGrado(){
		
		
		grado=new ArrayList<String>();
		grado_id = new ArrayList<String>();
		
		grado.add("Secundaria");
		grado.add("Bachillerato");
		grado.add("Tecnico");
		grado.add("Licenciatura");
		grado.add("Licenciatura Trunca");
		grado.add("Diplomado");
		grado.add("Maestria");
		grado.add("Doctorado");
		grado.add("Otro");
		
		grado_id.add("0");
		grado_id.add("1");
		grado_id.add("2");
		grado_id.add("3");
		grado_id.add("4");
		grado_id.add("5");
		grado_id.add("6");
		grado_id.add("7");
		grado_id.add("8");
		grado_id.add("9");
		
		
	}
	
	public void llenarArea(){
		
		   areaInteres=new ArrayList<String>();
		   areaInteres.add("Administrativos");
		   areaInteres.add("Biologia");
		   areaInteres.add("Comunicaciones");
		   areaInteres.add("Construccion");
		   areaInteres.add("Contabilidad");
		   areaInteres.add("Creatividad, Productividad y Diseño Comrecial");
		   areaInteres.add("Derecho y Leyes");
		   areaInteres.add("Educacion");
		   areaInteres.add("Ingenieria");
		   areaInteres.add("Logistica, Transportacion y Distribucion");
		   areaInteres.add("Manufactura, Produccion y Operacion");
		   areaInteres.add("Mercadotecnia, Publicidad y Relaciones Publicas");
		   areaInteres.add("Recursos Humanos");
		   areaInteres.add("Salud y Belleza");
		   areaInteres.add("Sector Salud");
		   areaInteres.add("Seguro y Reaseguro");
		   areaInteres.add("Tecnologias de la Informacion");
		   areaInteres.add("Turismo, Hospitalidad y Gastronomia");
		   areaInteres.add("Ventas");
		   areaInteres.add("Veterinaria / Zoologia");

		
		}
	
	
	public List<String> getTipo_vac() {
		return tipo_vac;
	}

	public void setTipo_vac(List<String> tipo_vac) {
		this.tipo_vac = tipo_vac;
	}

	public String getUltimo_folio() {
		return ultimo_folio;
	}

	public void setUltimo_folio(String ultimo_folio) {
		this.ultimo_folio = ultimo_folio;
	}

	public List<BigDecimal> getId_tipo_vac() {
		return id_tipo_vac;
	}

	public void setId_tipo_vac(List<BigDecimal> id_tipo_vac) {
		this.id_tipo_vac = id_tipo_vac;
	}

	public List<String> getUbicacion_tipo_vac() {
		return ubicacion_tipo_vac;
	}

	public void setUbicacion_tipo_vac(List<String> ubicacion_tipo_vac) {
		this.ubicacion_tipo_vac = ubicacion_tipo_vac;
	}
	
	
	public List<BigDecimal> getIdA() {
		return id_A;
	}

	public void setIdA(List<BigDecimal> id_A) {
		this.id_A = id_A;
	}
		
	
	
	
	public List<String> getNom_U() {
		return nom_U;
	}

	
	public void setNOM_U(List<String> nom_U) {
		this.nom_U = nom_U;
	}

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
	}
	
	public List<String> getEstado(){
		return estado;
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

	public BigDecimal getNumeroDestacados() {
		return NumeroDestacados;
	}

	public void setNumeroDestacados(BigDecimal numeroDestacados) {
		NumeroDestacados = numeroDestacados;
	}




	public List<String> getGrado() {
		return grado;
	}




	public void setGrado(List<String> grado) {
		this.grado = grado;
	}




	public List<String> getGrado_id() {
		return grado_id;
	}




	public void setGrado_id(List<String> grado_id) {
		this.grado_id = grado_id;
	}




	public int getDestacadosCompletos() {
		return destacadosCompletos;
	}




	public void setDestacadosCompletos(int destacadosCompletos) {
		this.destacadosCompletos = destacadosCompletos;
	}




	public List<String> getAreaInteres() {
		return areaInteres;
	}




	public void setAreaInteres(List<String> areaInteres) {
		this.areaInteres = areaInteres;
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




	public String getUbicacion() {
		return ubicacion;
	}




	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}




	public BigDecimal getRegion() {
		return region;
	}




	public void setRegion(BigDecimal region) {
		this.region = region;
	}




	public BigDecimal getNumeroDestacadosN() {
		return NumeroDestacadosN;
	}




	public void setNumeroDestacadosN(BigDecimal numeroDestacadosN) {
		NumeroDestacadosN = numeroDestacadosN;
	}




	public int getDestacadosCompletosN() {
		return destacadosCompletosN;
	}




	public void setDestacadosCompletosN(int destacadosCompletosN) {
		this.destacadosCompletosN = destacadosCompletosN;
	}

	public String getUbicacionAdmin() {
		return ubicacionAdmin;
	}

	public void setUbicacionAdmin(String ubicacionAdmin) {
		this.ubicacionAdmin = ubicacionAdmin;
	}

	public List<nuevavacanteform> getLstcomp() {
		return lstcomp;
	}

	public void setLstcomp(List<nuevavacanteform> lstcomp) {
		this.lstcomp = lstcomp;
	}

	
}
