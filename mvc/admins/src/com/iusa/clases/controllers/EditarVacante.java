package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


public class EditarVacante extends GuardaVacante {
	
	private List<String> tipo_vac;
	private List<BigDecimal> id_tipo_vac;
	private List<String> ubicacion_tipo_vac;
	
	private String edo;
	private BigDecimal edo_id;
	
	private List<String> estadoi;
	private List<BigDecimal> estado_id;
	private String [] ubicaciones;
	private String tipo_vac_datoR;
	private BigDecimal id_vac_datoR;
	private String ubicacion_vac_datoR;

	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String ubicacionAdmin;
	
	private String genero;
	
	
	private BigDecimal NumeroDestacados;
	private int destacadosCompletos;
	
	private List<String> grado;
	private List<String> grado_id;
	
	private List<String> areaInteres;
	
	private String fechaVigen;
	
	private BigDecimal idAdmin;
	

	private BigDecimal numeroDN;
	private BigDecimal numeroDR;
	
	private int vacDN;
	private int vacDR;


	private BigDecimal sueldoVacante_na;
	
	
	
	private String seleccion;
	
	private String vaPara;
	
	
	

	Session session;
	
	public EditarVacante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		
		String user;
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
        
        String selec_id = escapeChars(request.getParameter("seleccion"));
        
        String vieneDe = escapeChars(request.getParameter("vieneDe"));
        
        HttpSession sesion = request.getSession();
	    
	    user = escapeChars((String) sesion.getAttribute("usuario"));
	    
	    Transaction trans = session.beginTransaction();
	    
	    
	    try{
		
		String sql_vac_editar = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\",\"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"tipo_vacante\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"vacante\".\"subido_por\",\"vacante\".\"destacado_nacional\",\"vacante\".\"region\", \"vacante\".\"genero_preferencia\", \"vacante\".\"estado\", \"vacante\".\"muni\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :selec_id ";
		
		Query q = session.createSQLQuery(sql_vac_editar);
		
		q.setParameter("selec_id", selec_id);
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
		
		for (Object object : d) {
	         Map row = (Map) object;
	         
	         BigDecimal  AuxIdVac = ((BigDecimal) row.get("id_vacante"));
	         
	         idVacante = AuxIdVac.toString();
	         nombreVacante = (String) row.get("nombre_vacante");
	         folio = (String) row.get("folio");
	         
	         
	         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		        
	         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
	         
	         
	         fechaPublicacion = fechaxs;
	         fechaVigen = fechaxs2;
	         textoIntroductorio = (String) row.get("texto_introductorio");
	         escolaridad = (String) row.get("escolaridad");
	         sueldoVacante_na = (BigDecimal) row.get("sueldo_vacante");
	         
	         BigDecimal  AuxaniosExperiencia = ((BigDecimal) row.get("anios_experiencia"));
	         
	         aniosExperiencia = AuxaniosExperiencia.toString();
	         conocimientos = (String) row.get("conocimientos");
	         talentos = (String) row.get("talentos");
	         ubicacion = (String) row.get("ubicacion");
	 		 estadosp=(String) row.get("estado");
	 		 munisp=(String) row.get("muni");
	         estadoVacante = (String) row.get("estado_vacante");
	         
	         BigDecimal  AuxDestacado = ((BigDecimal) row.get("destacado"));
	         destacado = AuxDestacado.toString();
	         areaExperiencia = (String) row.get("area_experiencia");
	         prinFuncionesVacante = (String) row.get("principales_funciones");
	         
	         BigDecimal  AuxTipoVac = ((BigDecimal) row.get("tipo_vacante"));
	         tipoVacante = AuxTipoVac.toString();
	         genero = (String) row.get("genero_preferencia");
	         horario = (String) row.get("horario");
	         edad = (String) row.get("edad");
	         observaciones = (String) row.get("observaciones");
	         BigDecimal  AuxSubidoPor = ((BigDecimal) row.get("subido_por"));
	         subidoPor = AuxSubidoPor.toString();
	         
	         BigDecimal  AuxDesNa = ((BigDecimal) row.get("destacado_nacional"));
	         destacado_nacional = AuxDesNa.toString();
	         
	         BigDecimal  AuxRegion = ((BigDecimal) row.get("region"));
	         region = AuxRegion.toString();
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
		
		
		
		estadoi=new ArrayList<String>();
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
	     	estadoi.add(edo);
	     	}
		
	     
	     	
	     
	     	String sql_DN ="SELECT Count(\"vacante\".\"id_vacante\") AS DN FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :selec_id  AND \"vacante\".\"destacado_nacional\" = '1' ";
			
			Query DN = session.createSQLQuery(sql_DN);
			
			DN.setParameter("selec_id", selec_id);
			
			DN.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dN = DN.list();
			
			
			
			for (Object object : dN) {
		         Map rowDN = (Map) object;
		         	numeroDN = (BigDecimal) rowDN.get("DN");
		         	
		     }
			
			
			if(numeroDN.intValueExact() == 0){
				vacDN = 0;
			}else{
				vacDN = 1;
			}

	     	
			
			String sql_DR ="SELECT Count(\"vacante\".\"id_vacante\") AS DR FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :selec_id  AND \"vacante\".\"destacado\" = '1' ";
			
			Query DR = session.createSQLQuery(sql_DR);
			
			DR.setParameter("selec_id", selec_id);
			
			DR.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dR = DR.list();
			
			
			
			for (Object object : dR) {
		         Map rowDR = (Map) object;
		         	numeroDR = (BigDecimal) rowDR.get("DR");
		         	
		     }
			
			
			if(numeroDR.intValueExact() == 0){
				vacDR = 0;
			}else{
				vacDR = 1;
			}
			
		
			
			String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"email\" = :user  ";
			
			Query A = session.createSQLQuery(sql_admin);
			
			A.setParameter("user", user);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         	idAdmin = (BigDecimal) row.get("id_admin");
		         	
		     }
			
		
			trans.commit();
	    }catch(Exception e){
	    	trans.rollback();
	    }
			
	    
	    
	    if(vieneDe.equals("VacGenerales")){
	    	 this.vaPara = "VacGenerales";
	    }else if(vieneDe.equals("MisCandidaturas")){
	    	this.vaPara = "MisCandidaturas";
	    }
	    
	   
	    		
	    		
	    		
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
	     ubicacionAdmin = DA.getUbicacion();
	     
	     
	     llenarGrado();
			llenarArea();
	     
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	
	public void llenarGrado(){
		
		
		grado=new ArrayList<String>();
		grado_id = new ArrayList<String>();
		
		grado.add("Selecciona");
		grado.add("Secundaria");
		grado.add("Bachillerato");
		grado.add("Tecnico");
		grado.add("Estudios Superiores");
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

	public List<String> getTipo_vac() {
		return tipo_vac;
	}

	public void setTipo_vac(List<String> tipo_vac) {
		this.tipo_vac = tipo_vac;
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

	public List<String> getEstadoi() {
		return estadoi;
	}

	public void setEstadoi(List<String> estadoi) {
		this.estadoi = estadoi;
	}

	public String getTipo_vac_datoR() {
		return tipo_vac_datoR;
	}

	public void setTipo_vac_datoR(String tipo_vac_datoR) {
		this.tipo_vac_datoR = tipo_vac_datoR;
	}

	public BigDecimal getId_vac_datoR() {
		return id_vac_datoR;
	}

	public void setId_vac_datoR(BigDecimal id_vac_datoR) {
		this.id_vac_datoR = id_vac_datoR;
	}

	public String getUbicacion_vac_datoR() {
		return ubicacion_vac_datoR;
	}

	public void setUbicacion_vac_datoR(String ubicacion_vac_datoR) {
		this.ubicacion_vac_datoR = ubicacion_vac_datoR;
	}

	public BigDecimal getNumeroDestacados() {
		return NumeroDestacados;
	}

	public void setNumeroDestacados(BigDecimal numeroDestacados) {
		NumeroDestacados = numeroDestacados;
	}

	public int getDestacadosCompletos() {
		return destacadosCompletos;
	}

	public void setDestacadosCompletos(int destacadosCompletos) {
		this.destacadosCompletos = destacadosCompletos;
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

	public List<String> getAreaInteres() {
		return areaInteres;
	}

	public void setAreaInteres(List<String> areaInteres) {
		this.areaInteres = areaInteres;
	}

	public String getFechaVigen() {
		return fechaVigen;
	}

	public void setFechaVigen(String fechaVigen) {
		this.fechaVigen = fechaVigen;
	}

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
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

	public BigDecimal getNumeroDN() {
		return numeroDN;
	}

	public void setNumeroDN(BigDecimal numeroDN) {
		this.numeroDN = numeroDN;
	}

	public BigDecimal getNumeroDR() {
		return numeroDR;
	}

	public void setNumeroDR(BigDecimal numeroDR) {
		this.numeroDR = numeroDR;
	}

	

	public int getVacDN() {
		return vacDN;
	}

	public void setVacDN(int vacDN) {
		this.vacDN = vacDN;
	}

	public int getVacDR() {
		return vacDR;
	}

	public void setVacDR(int vacDR) {
		this.vacDR = vacDR;
	}

	
	public BigDecimal getSueldoVacante_na() {
		return sueldoVacante_na;
	}

	public void setSueldoVacante_na(BigDecimal sueldoVacante_na) {
		this.sueldoVacante_na = sueldoVacante_na;
	}
	
	public String getSeleccion() {
		return seleccion;
	}

	public void setSeleccion(String seleccion) {
		this.seleccion = seleccion;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public String getVaPara() {
		return vaPara;
	}

	public void setVaPara(String vaPara) {
		this.vaPara = vaPara;
	}

	public String getUbicacionAdmin() {
		return ubicacionAdmin;
	}

	public void setUbicacionAdmin(String ubicacionAdmin) {
		this.ubicacionAdmin = ubicacionAdmin;
	}

	public String[] getUbicaciones() {
		return ubicaciones;
	}

	public void setUbicaciones(String[] ubicaciones) {
		this.ubicaciones = ubicaciones;
	}

	
	
	
	
}
