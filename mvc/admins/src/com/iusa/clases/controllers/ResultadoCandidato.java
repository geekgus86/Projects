package com.iusa.clases.controllers;

import java.math.BigDecimal;

//import java.util.Date;

import java.util.*;
import java.lang.Exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


//import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

//import com.iusa.clases.models.DatosPersonales;
//import com.opensymphony.xwork2.ActionContext;

public class ResultadoCandidato {
	
	private BigDecimal idPostulante;
	private String nombre;
	private String ultimoPuesto;
	private String areaInteres;
	private String areaInteresAlterna;
	private String minEdad;
	private String maxEdad;
	private String sexo;
	private String minGrado;
	private String maxGrado;
	private String nivelDeEstudios;
	private String estado;
	private String ciudad;
	private int edad;
	private String sql;
	private String consulta;
	private int aux;
	private String municipio;
	
	private int edad_min;
	private int edad_max;
	
	protected List<BigDecimal> listaIdPostulante;
	protected List<String> listaNombre;
	protected List<String> listaUltimoPuesto;
	protected List<String> listaArea;
	protected List<Integer> listaEdad;
	protected List<String> listaSexo;
	protected List<String> listaNivelDeEstudios;
	

	
	private String sql_Vac;
	
	private String sql_Admis;
	
	
	
	private List<BigDecimal> listaIdVacante;
	private List<String> listaNombreVacante;
	
	private BigDecimal id_vacante;
	private String NombreVacante;
	
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	private BigDecimal id_admin;
	private String user;
	
	
	private String fecha_maxima;
	private String fecha_minima;
	
	private String fecha_maximaFin;
	private String fecha_maximaInicio;
	
	private String fecha_minimaInicio;
	private String fecha_minimaFin;
	
	
	/* PARA LAS SECCIONES DE LOS PARAMETROS DE BUSQUEDA */
	
	private String paCla;
	private String areaInte;
	private String areaInteAlte;
	private String gradoAca;
	private String genero;
	private String edadMin;
	private String edadMax;
	private String muniCi;
	private String esTado;
	
	private BigDecimal numCandidatosTot;
	
	Session session;
	
	public ResultadoCandidato(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user = escapeChars((String) sesion.getAttribute("usuario"));
		
		
		consulta = " ";
		
		
		
		String securepareaInteres = escapeChars(areaInteres);
		
		String securepareaInteresAlterna = escapeChars(areaInteresAlterna);
		
		String securepminGrado = escapeChars(minGrado);
		
		String securepsexo = escapeChars(sexo);
		
		String securepminEdad = escapeChars(minEdad);
		
		String securepmaxEdad = escapeChars(maxEdad);
		
		String securepestado = escapeChars(estado);
		
		String securepmunicipio = escapeChars(municipio);
		
		

		this.areaInte = this.areaInteres;
		this.areaInteAlte = this.areaInteresAlterna;
		this.gradoAca = this.minGrado;
		this.genero = this.sexo;
		this.edadMin = this.minEdad;
		this.edadMax = this.maxEdad;
		this.muniCi = this.municipio;
		this.esTado = this.estado;
		
		
		if( !(securepareaInteres.equals("Selecciona")) ){
			consulta = consulta + "  AND \"usuario\".\"area_de_interes\" LIKE :areaInteres ";
		}
		
		
		if( !(securepareaInteresAlterna.equals("Selecciona")) ){
			consulta = consulta + "  AND \"usuario\".\"area_de_interes_alterna\" LIKE :areaInteresA ";
		}
		
		if( !(securepminGrado.equals("Selecciona")) ){
			consulta = consulta + "  AND \"usuario\".\"nivel_de_estudios\"  = :minGrado  ";
		}
		
		if( !(securepsexo.equals("Selecciona")) ){
			
			
			String consultaGenero = " ";
			
			
			if(sexo.equals("I")){
				
				
				 consultaGenero = "  ";
				
			}else if(sexo.equals("F")){
				
				consultaGenero = " AND \"datos_personales\".\"sexo\" = 'F' ";
				
			}else if(sexo.equals("M")){
				
				
				consultaGenero = " AND \"datos_personales\".\"sexo\" = 'M' ";

			}
			
			consulta = consulta + "  "+consultaGenero+" ";
		}
			
			
		if( !(securepminEdad.equals("0")) && !(securepmaxEdad.equals("0"))  ){
			
			
			edad_min = Integer.parseInt(minEdad);
			
			Calendar c2 = Calendar.getInstance();
    		c2.add(Calendar.YEAR, - edad_min );
    		String dia2 = Integer.toString(c2.get(Calendar.DATE));  
    		String mes2 = Integer.toString(c2.get(Calendar.MONTH)+1); 
    		String annio2 = Integer.toString(c2.get(Calendar.YEAR)); 
    		
    		this.fecha_minima = dia2+"-"+mes2+"-"+annio2; 
    		
    		
    		
    		edad_max = Integer.parseInt(maxEdad);
			
			Calendar c3 = Calendar.getInstance();
    		c3.add(Calendar.YEAR, - edad_max );
    		String dia3 = Integer.toString(c3.get(Calendar.DATE));   
    		String mes3 = Integer.toString(c3.get(Calendar.MONTH)+1);  
    		String annio3 = Integer.toString(c3.get(Calendar.YEAR)); 
    		
    		this.fecha_maxima = dia3+"-"+mes3+"-"+annio3; 
		
    		
    		consulta = consulta + "   AND  \"usuario\".\"fecha_nacimiento\" BETWEEN :fecha_maxima  AND  :fecha_minima ";
			
		}else if(  !(securepminEdad.equals("0")) && securepmaxEdad.equals("0")  ){
			
			
    
			edad_max = Integer.parseInt(minEdad);
			
			Calendar c3 = Calendar.getInstance();
    		c3.add(Calendar.YEAR, - edad_max );
    		String dia3 = "31";
    		String mes3 = "12";
    		String annio3 = Integer.toString(c3.get(Calendar.YEAR));
    		
    		this.fecha_maximaFin = dia3+"-"+mes3+"-"+annio3;
			
    		
    		
    		int auxEdad = 70;
    		
    		Calendar c4 = Calendar.getInstance();
    		c4.add(Calendar.YEAR, - auxEdad );
    		String dia4 = "01";
    		String mes4 = "01";
    		String annio4 = Integer.toString(c4.get(Calendar.YEAR)); 
    		
    		this.fecha_maximaInicio = dia4+"-"+mes4+"-"+annio4; 
    		
			consulta = consulta + "  AND \"usuario\".\"fecha_nacimiento\" BETWEEN :fecha_maximaInicio  AND  :fecha_maximaFin  ";
			
		}else if(   securepminEdad.equals("0") && !(securepmaxEdad.equals("0")) ){
			
			edad_min = Integer.parseInt(maxEdad);
			
			Calendar c2 = Calendar.getInstance();
    		c2.add(Calendar.YEAR, - edad_min );
    		String dia2 = "01";
    		String mes2 = "01";
    		String annio2 = Integer.toString(c2.get(Calendar.YEAR)); 
    		
    		this.fecha_minimaInicio = dia2+"-"+mes2+"-"+annio2; 
    		
    		
    		
    		int auxEdad = 15;
    		
    		Calendar c3 = Calendar.getInstance();
    		c3.add(Calendar.YEAR, - auxEdad );
    		String dia3 = "31";
    		String mes3 = "12";
    		String annio3 = Integer.toString(c3.get(Calendar.YEAR)); 
    		
    		this.fecha_minimaFin = dia3+"-"+mes3+"-"+annio3; 
    	
			consulta = consulta + "  AND \"usuario\".\"fecha_nacimiento\" BETWEEN :fecha_minimaInicio  AND :fecha_minimaFin ";
		}
		
		
		
		if( !(securepestado.equals("Selecciona")) ){
			
			
			
		
			consulta = consulta + "  AND \"Ubicacion\".\"estado\" LIKE :estado ";
		}
		
		if( !(securepmunicipio.equals("Selecciona")) ){
			consulta = consulta + "  AND \"Ubicacion\".\"municipio_delegacion\" LIKE :municipio  ";
		}
		
		
		sql=" SELECT * FROM (SELECT  ROWNUM AS FILAS, \"usuario\".\"id_postulante\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\", \"usuario\".\"nombre\", \"usuario\".\"nivel_de_estudios\", \"usuario\".\"area_formacion\", \"usuario\".\"fecha_nacimiento\", \"datos_personales\".\"sexo\", \"usuario\".\"area_de_interes\" FROM \"usuario\" , \"datos_personales\" , \"Ubicacion\" WHERE \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"Ubicacion\".\"id_usuario\" = \"usuario\".\"id_postulante\"    "+consulta+"  ) WHERE FILAS BETWEEN 0  AND 5    ";
		
		
		aux=0;
		
		
		
				
			
			
		sql_Admis = 	" ";

			
		String sqlNumeroCandidatos = " SELECT Count(\"usuario\".\"id_postulante\") AS CANDINUM FROM  \"usuario\" , \"datos_personales\" , \"Ubicacion\" WHERE \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"Ubicacion\".\"id_usuario\" = \"usuario\".\"id_postulante\"  "+consulta+"  ";
		
		
		
		
		
		
		
		listaIdPostulante=new ArrayList<BigDecimal>();
		listaNombre=new ArrayList<String>();
		listaArea=new ArrayList<String>();
		listaEdad=new ArrayList<Integer>();
		listaSexo=new ArrayList<String>();
		listaNivelDeEstudios=new ArrayList<String>();
		
		Transaction busquedaCandidato = session.beginTransaction();
		
		try{
			
		/* SELECT */
        Query query = session.createSQLQuery(sql);
        
        

        
        if( !(securepareaInteres.equals("Selecciona")) ){query.setParameter("areaInteres", '%' + securepareaInteres + '%');}
        
        if( !(securepareaInteresAlterna.equals("Selecciona")) ){query.setParameter("areaInteresA", '%' + securepareaInteresAlterna + '%');}
        
        if( !(securepminGrado.equals("Selecciona")) ){ query.setParameter("minGrado",securepminGrado); }
        
		
			
			
		
        
        
        if( !(securepminEdad.equals("0")) && !(securepmaxEdad.equals("0"))  ){
        	query.setParameter("fecha_maxima", fecha_maxima).setParameter("fecha_minima", fecha_minima);
		}else if(  !(securepminEdad.equals("0")) && securepmaxEdad.equals("0")  ){
			query.setParameter("fecha_maximaInicio", fecha_maximaInicio).setParameter("fecha_maximaFin", fecha_maximaFin);
		}else if(   securepminEdad.equals("0") && !(securepmaxEdad.equals("0")) ){ 
			query.setParameter("fecha_minimaInicio", fecha_minimaInicio).setParameter("fecha_minimaFin", fecha_minimaFin);
		}
        
        if( !(securepestado.equals("Selecciona")) ){ query.setParameter("estado", '%' + securepestado +'%');}
        
        if( !(securepmunicipio.equals("Selecciona")) ){query.setParameter("municipio", '%' + securepmunicipio + '%'); }
        
        
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	    this.idPostulante=(BigDecimal)row.get("id_postulante");
        	    String nombreAux=(String)row.get("nombre");
        	    String apellidoPaterno=(String)row.get("apellido_paterno");
        	    String apellidoMaterno=(String)row.get("apellido_materno");
        	    this.nombre=nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
        	    this.areaInteres=(String)row.get("area_de_interes");
        	    this.sexo=(String)row.get("sexo");
        	    Date fechaNac=(Date)row.get("fecha_nacimiento");
        	    this.edad=calcularEdad(fechaNac);
        	    BigDecimal lvlEstudios = (BigDecimal)row.get("nivel_de_estudios");
        	    
        	    
        	    
        	    if(lvlEstudios.intValueExact() == 1){
        			
        	    	this.nivelDeEstudios =  "Secundaria";
        			
        		}else if(lvlEstudios.intValueExact() == 2){
        			
        			this.nivelDeEstudios = "Bachillerato";
        			
        		}else if(lvlEstudios.intValueExact() == 2){
        			
        			this.nivelDeEstudios = "Tecnico";
        			
        		}else if(lvlEstudios.intValueExact() == 4){
        			
        			this.nivelDeEstudios = "Estudios Superiores";
        			
        		}else if(lvlEstudios.intValueExact() == 5){
        			
        			this.nivelDeEstudios = "Diplomado";
        			
        		}else if(lvlEstudios.intValueExact() == 6){
        			
        			this.nivelDeEstudios = "Maestria";
        			
        		}else if(lvlEstudios.intValueExact() == 7){
        			
        			this.nivelDeEstudios = "Doctorado";
        			
        		}else if(lvlEstudios.intValueExact() == 8){
        			
        			this.nivelDeEstudios = "Otro";
        			
        		}
        	    
        	    
        	    
        	    
        	    listaIdPostulante.add(idPostulante);
        	    listaNombre.add(nombre);
        	    listaArea.add(areaInteres);
        	    listaEdad.add(edad);
        	    listaSexo.add(sexo);
        	    listaNivelDeEstudios.add(nivelDeEstudios);
        	    
        	    
        	}
        
        executeVacante(sql_Admis);
        
        
        
        
        /* NUMERO DE PAGINAS BASADO EN LA SELECCION DE LA BUSQUEDA */
        
        Query query2 = session.createSQLQuery(sqlNumeroCandidatos);
        
        if( !(securepareaInteres.equals("Selecciona")) ){query2.setParameter("areaInteres", '%' + securepareaInteres + '%');}
        
        if( !(securepareaInteresAlterna.equals("Selecciona")) ){query2.setParameter("areaInteresA", '%' + securepareaInteresAlterna + '%');}
        
        if( !(securepminGrado.equals("Selecciona")) ){ query2.setParameter("minGrado",securepminGrado); }
        
		
        if( !(securepminEdad.equals("0")) && !(securepmaxEdad.equals("0"))  ){
        	query2.setParameter("fecha_maxima", fecha_maxima).setParameter("fecha_minima", fecha_minima);
		}else if(  !(securepminEdad.equals("0")) && securepmaxEdad.equals("0")  ){
			query2.setParameter("fecha_maximaInicio", fecha_maximaInicio).setParameter("fecha_maximaFin", fecha_maximaFin);
		}else if(   securepminEdad.equals("0") && !(securepmaxEdad.equals("0")) ){ 
			query2.setParameter("fecha_minimaInicio", fecha_minimaInicio).setParameter("fecha_minimaFin", fecha_minimaFin);
		}
        
        if( !(securepestado.equals("Selecciona")) ){ query2.setParameter("estado", '%' + securepestado +'%');}
        
        if( !(securepmunicipio.equals("Selecciona")) ){query2.setParameter("municipio", '%' + securepmunicipio + '%');}
        
        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = query2.list();
        
        for (Object object : data2) {
        	Map row24 = (Map) object;
        	this. numCandidatosTot = (BigDecimal) row24.get("CANDINUM");
        }
        
       
        
        busquedaCandidato.commit();
		}catch(Exception e){
			
			busquedaCandidato.rollback();
		}
        
        DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
		
	     
	    
	     	
	    
		
		
		return "success";
		
		
	}

	
	
	
public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	public int calcularEdad(Date fechaNac){
		try {
			
			Calendar birth = new GregorianCalendar();
			Calendar today = new GregorianCalendar();
			int age=0;
			int factor=0;
			Date birthDate=fechaNac;
			Date currentDate=new Date();
			birth.setTime(birthDate);
			today.setTime(currentDate);
			if (today.get(Calendar.MONTH) <= birth.get(Calendar.MONTH)) {
			if (today.get(Calendar.MONTH) == birth.get(Calendar.MONTH)) {
			if (today.get(Calendar.DATE) > birth.get(Calendar.DATE)) {
			factor = -1; 
			}
			} else {
			factor = -1; 
			}
			}
			age=(today.get(Calendar.YEAR)-birth.get(Calendar.YEAR))+factor;
			
			return age;
			
		}catch(Exception e){
		    return -1;
		}
	}
	
	
	
	public Date calcularFechaNacimiento(int edad){
		
		return null;
		
	}
	
	public void executeQuery(String sql){
		
		

		
		
	}
	
	
	public void executeVacante(String sql_Admis){
		
		
		String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" = :user  ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        
        query1.setParameter("user", user);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
         Map row1 = (Map) object;
         id_admin = (BigDecimal)row1.get("id_admin");
         }
		
		
		
		
		 listaIdVacante = new ArrayList<BigDecimal>();
		 listaNombreVacante = new ArrayList<String>();
		 
		 sql_Vac = " SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :idAdmin  ORDER BY \"vacante\".\"nombre_vacante\" ASC  ";
		 
		 	Query query2 = session.createSQLQuery(sql_Vac);
		 	query2.setParameter("idAdmin", id_admin);
	        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data2 = query2.list();
	        for (Object object : data2) {
	        	Map row2 = (Map) object;
	        	
	        		this.id_vacante = (BigDecimal)row2.get("id_vacante");
	        		this.NombreVacante = (String)row2.get("nombre_vacante");
	        	    
	        	    
	        		listaIdVacante.add(id_vacante);
	        		listaNombreVacante.add(NombreVacante);
	        	   
	        	    
	        	    
	        	}
	        
	      
		
		 
		
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre){
		this.nombre = nombre;
	}

	public String getUltimoPuesto() {
		return ultimoPuesto;
	}
	
	public void setUltimoPuesto(String ultimoPuesto) {
		this.ultimoPuesto = ultimoPuesto;
	}

	public String getAreaInteres() {
		return areaInteres;
	}
	
	public void setAreaInteres(String areaInteres){
		this.areaInteres = areaInteres;
	}

	public int getEdad() {
		return edad;
	}
	
	public void setEdad(int edad){
		this.edad = edad;
	}


	public String getSexo() {
		return sexo;
	}
	
	public void setSexo(String sexo){
		this.sexo = sexo;
	}
	

	public String getNivelDeEstudios() {
		return nivelDeEstudios;
	}
	
	public void setNivelDeEstudios(String nivelDeEstudios){
		this.nivelDeEstudios = nivelDeEstudios;
	}

     public List<String> getListaNombre(){
    	 
    	 return listaNombre;
     }
     
     public void setListaNombre(List<String> listaNombre){
    	 this.listaNombre = listaNombre;
     }
     
     public List<String> getListaUltimoPuesto(){
    	 
    	 return listaUltimoPuesto;
     }
     
     public void setListaUltimoPuesto(List<String> listaUltimoPuesto){
    	 this.listaUltimoPuesto = listaUltimoPuesto;
     }
     
     public List<String> getListaArea(){
    	 
    	 return listaArea;
     }
     
     public void setListaArea(List<String> listaArea){
    	 this.listaArea = listaArea;
     }
 
     public List<Integer> getListaEdad(){
	 
	 return listaEdad;
     }
     
     public void setListaEdad(List<Integer> listaEdad){
    	 this.listaEdad = listaEdad;
     }
 
     public List<String> getListaNivelDeEstudios(){
	 
	 return listaNivelDeEstudios;
     }
     
     public void setListaNivelDeEstudios(List<String> listaNivelDeEstudios){
    	 this.listaNivelDeEstudios = listaNivelDeEstudios;
     }
     
     public List<String> getListaSexo(){
    	 
    	 return listaSexo;
     }
     
     public void setListaSexo(List<String> listaSexo){
    	 this.listaSexo = listaSexo;
     }

	public BigDecimal getIdPostulante() {
		return idPostulante;
	}
	
	public void setIdPostulante(BigDecimal idPostulante){
		this.idPostulante = idPostulante;
	}
	
	public List<BigDecimal> getListaIdPostulante(){
   	 
   	 return listaIdPostulante;
        }
	
	public void setListaPostulante(List<BigDecimal> listaIdPostulante){
		this.listaIdPostulante = listaIdPostulante;
	}

	public String getMinEdad() {
		return minEdad;
	}

	public void setMinEdad(String minEdad) {
		this.minEdad = minEdad;
	}

	public String getMaxEdad() {
		return maxEdad;
	}

	public void setMaxEdad(String maxEdad) {
		this.maxEdad = maxEdad;
	}

	public String getMinGrado() {
		return minGrado;
	}

	public void setMinGrado(String minGrado) {
		this.minGrado = minGrado;
	}

	public String getMaxGrado() {
		return maxGrado;
	}

	public void setMaxGrado(String maxGrado) {
		this.maxGrado = maxGrado;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
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

	public List<BigDecimal> getListaIdVacante() {
		return listaIdVacante;
	}

	public void setListaIdVacante(List<BigDecimal> listaIdVacante) {
		this.listaIdVacante = listaIdVacante;
	}

	public List<String> getListaNombreVacante() {
		return listaNombreVacante;
	}

	public void setListaNombreVacante(List<String> listaNombreVacante) {
		this.listaNombreVacante = listaNombreVacante;
	}

	public BigDecimal getId_vacante() {
		return id_vacante;
	}

	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}

	public String getNombreVacante() {
		return NombreVacante;
	}

	public void setNombreVacante(String nombreVacante) {
		NombreVacante = nombreVacante;
	}

	public int getEdad_min() {
		return edad_min;
	}

	public void setEdad_min(int edad_min) {
		this.edad_min = edad_min;
	}

	public int getEdad_max() {
		return edad_max;
	}

	public void setEdad_max(int edad_max) {
		this.edad_max = edad_max;
	}

	public String getMunicipio() {
		return municipio;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
	}

	public String getConsulta() {
		return consulta;
	}

	public void setConsulta(String consulta) {
		this.consulta = consulta;
	}

	public BigDecimal getId_admin() {
		return id_admin;
	}

	public void setId_admin(BigDecimal id_admin) {
		this.id_admin = id_admin;
	}

	public String getSql_Admis() {
		return sql_Admis;
	}

	public void setSql_Admis(String sql_Admis) {
		this.sql_Admis = sql_Admis;
	}

	public String getFecha_maxima() {
		return fecha_maxima;
	}

	public void setFecha_maxima(String fecha_maxima) {
		this.fecha_maxima = fecha_maxima;
	}

	public String getFecha_minima() {
		return fecha_minima;
	}

	public void setFecha_minima(String fecha_minima) {
		this.fecha_minima = fecha_minima;
	}

	public String getFecha_maximaFin() {
		return fecha_maximaFin;
	}

	public void setFecha_maximaFin(String fecha_maximaFin) {
		this.fecha_maximaFin = fecha_maximaFin;
	}

	public String getFecha_maximaInicio() {
		return fecha_maximaInicio;
	}

	public void setFecha_maximaInicio(String fecha_maximaInicio) {
		this.fecha_maximaInicio = fecha_maximaInicio;
	}

	public String getFecha_minimaInicio() {
		return fecha_minimaInicio;
	}

	public void setFecha_minimaInicio(String fecha_minimaInicio) {
		this.fecha_minimaInicio = fecha_minimaInicio;
	}

	public String getFecha_minimaFin() {
		return fecha_minimaFin;
	}

	public void setFecha_minimaFin(String fecha_minimaFin) {
		this.fecha_minimaFin = fecha_minimaFin;
	}

	public String getAreaInteresAlterna() {
		return areaInteresAlterna;
	}

	public void setAreaInteresAlterna(String areaInteresAlterna) {
		this.areaInteresAlterna = areaInteresAlterna;
	}

	public String getPaCla() {
		return paCla;
	}

	public void setPaCla(String paCla) {
		this.paCla = paCla;
	}

	public String getAreaInte() {
		return areaInte;
	}

	public void setAreaInte(String areaInte) {
		this.areaInte = areaInte;
	}

	public String getAreaInteAlte() {
		return areaInteAlte;
	}

	public void setAreaInteAlte(String areaInteAlte) {
		this.areaInteAlte = areaInteAlte;
	}

	public String getGradoAca() {
		return gradoAca;
	}

	public void setGradoAca(String gradoAca) {
		this.gradoAca = gradoAca;
	}

	public String getGenero() {
		return genero;
	}

	public void setGenero(String genero) {
		this.genero = genero;
	}

	public String getEdadMin() {
		return edadMin;
	}

	public void setEdadMin(String edadMin) {
		this.edadMin = edadMin;
	}

	public String getEdadMax() {
		return edadMax;
	}

	public void setEdadMax(String edadMax) {
		this.edadMax = edadMax;
	}

	public String getMuniCi() {
		return muniCi;
	}

	public void setMuniCi(String muniCi) {
		this.muniCi = muniCi;
	}

	public String getEsTado() {
		return esTado;
	}

	public void setEsTado(String esTado) {
		this.esTado = esTado;
	}

	public BigDecimal getNumCandidatosTot() {
		return numCandidatosTot;
	}

	public void setNumCandidatosTot(BigDecimal numCandidatosTot) {
		this.numCandidatosTot = numCandidatosTot;
	}


}
