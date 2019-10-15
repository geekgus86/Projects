package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class ResultadoBusCandiPag {

	
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
	private String palabraClave;
	private String estado;
	private String ciudad;
	private int edad;
	private String sql;
	private String consulta;
	private int aux;
	private String municipio;
	private String user;
	
	private int edad_min;
	private int edad_max;
	
	
	private String fecha_maxima;
	private String fecha_minima;
	
	private String fecha_maximaFin;
	private String fecha_maximaInicio;
	
	private String fecha_minimaInicio;
	private String fecha_minimaFin;

	
	private String desdePag;
	private String hastaPag;
	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
Session session;
	
	public ResultadoBusCandiPag(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String giveMe() {
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user = escapeChars((String) sesion.getAttribute("usuario"));
		
		
		consulta = " ";
		
		String securepalabraClave = escapeChars(palabraClave);
		
		String securepareaInteres = escapeChars(areaInteres);
		
		String securepareaInteresAlterna = escapeChars(areaInteresAlterna);
		
		String securepminGrado = escapeChars(minGrado);
		
		String securepsexo = escapeChars(sexo);
		
		String securepminEdad = escapeChars(minEdad);
		
		String securepmaxEdad = escapeChars(maxEdad);
		
		String securepestado = escapeChars(estado);
		
		String securepmunicipio = escapeChars(municipio);
		
		
		if( !(securepalabraClave.equals("Palabra Clave")) ){
			consulta = consulta + " AND \"usuario\".\"nombre\" IN ( SELECT \"usuario\".\"nombre\" FROM  \"usuario\" , \"datos_personales\" , \"Ubicacion\" WHERE \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"Ubicacion\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"usuario\".\"id_postulante\" = \"datos_personales\".\"id_usuario\" AND \"usuario\".\"id_postulante\" = \"Ubicacion\".\"id_usuario\" AND REGEXP_LIKE (\"usuario\".\"usuario_nombre\", :palabraClave, 'i') OR REGEXP_LIKE (\"usuario\".\"apellido_materno\", :palabraClave, 'i') OR REGEXP_LIKE (\"usuario\".\"apellido_paterno\", :palabraClave, 'i') OR REGEXP_LIKE (\"usuario\".\"area_de_interes\", :palabraClave, 'i') OR REGEXP_LIKE (\"usuario\".\"area_formacion\", :palabraClave, 'i') )";
		}
		
		if( !(securepareaInteres.equals("Selecciona")) ){
			consulta = consulta + "  AND upper(\"usuario\".\"area_de_interes\") LIKE '%'|| upper( :areaInteres ) ||'%'";
		}
		
		
		if( !(securepareaInteresAlterna.equals("Selecciona")) ){
			consulta = consulta + "  AND upper(\"usuario\".\"area_de_interes_alterna\") LIKE '%'|| upper( :areaInteresAupper )  ||'%' ";
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
			
			
			
		
			consulta = consulta + "  AND upper(\"Ubicacion\".\"estado\") LIKE '%'|| upper( :estado ) ||'%' ";
		}
		
		if( !(securepmunicipio.equals("Selecciona")) ){
			consulta = consulta + "  AND upper(\"Ubicacion\".\"municipio_delegacion\") LIKE '%'|| upper( :municipio ) ||'%'  ";
		}
		
		
		sql=" SELECT * FROM (SELECT  ROWNUM AS FILAS, \"usuario\".\"id_postulante\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\", \"usuario\".\"nombre\", \"usuario\".\"nivel_de_estudios\", \"usuario\".\"area_formacion\", \"usuario\".\"fecha_nacimiento\", \"datos_personales\".\"sexo\", \"usuario\".\"area_de_interes\" FROM \"usuario\" , \"datos_personales\" , \"Ubicacion\" WHERE \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"Ubicacion\".\"id_usuario\" = \"usuario\".\"id_postulante\"    "+consulta+"  ) WHERE FILAS BETWEEN :desdePag  AND :hastaPag    ";
		
		
		
		
		Transaction busquedaCandidato = session.beginTransaction();
		
		try{
			
		/* SELECT */
        Query query = session.createSQLQuery(sql);
        
        
        if( !(securepalabraClave.equals("Palabra Clave")) ){query.setParameter("palabraClave", securepalabraClave);}
        
        if( !(securepareaInteres.equals("Selecciona")) ){query.setParameter("areaInteres",  securepareaInteres);}
        
        if( !(securepareaInteresAlterna.equals("Selecciona")) ){query.setParameter("areaInteresA",securepareaInteresAlterna );}
        
        if( !(securepminGrado.equals("Selecciona")) ){ query.setParameter("minGrado",securepminGrado); }
        
		
			
			
		
        
        
        if( !(securepminEdad.equals("0")) && !(securepmaxEdad.equals("0"))  ){
        	query.setParameter("fecha_maxima", fecha_maxima).setParameter("fecha_minima", fecha_minima);
		}else if(  !(securepminEdad.equals("0")) && securepmaxEdad.equals("0")  ){
			query.setParameter("fecha_maximaInicio", fecha_maximaInicio).setParameter("fecha_maximaFin", fecha_maximaFin);
		}else if(   securepminEdad.equals("0") && !(securepmaxEdad.equals("0")) ){ 
			query.setParameter("fecha_minimaInicio", fecha_minimaInicio).setParameter("fecha_minimaFin", fecha_minimaFin);
		}
        
        if( !(securepestado.equals("Selecciona")) ){ query.setParameter("estado", securepestado);}
        
        if( !(securepmunicipio.equals("Selecciona")) ){query.setParameter("municipio", securepmunicipio ); }
        
        
        if(desdePag == null || desdePag.equals("")){desdePag="0";}
        if(hastaPag == null || desdePag.equals("")){hastaPag="0";}
        
        query.setParameter("desdePag", desdePag).setParameter("hastaPag", hastaPag);
        
        
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	
        	
        	 HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         
	        
        	
        	
        	
        	
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
        	    
        	    
        	 itemMap.put("idPostulante", this.idPostulante);
   	         itemMap.put("nombre", this.nombre);
   	         itemMap.put("areaInteres", this.areaInteres);
   	         itemMap.put("sexo", this.sexo);
   	         itemMap.put("fechaNac", fechaNac);
   	         itemMap.put("edad", this.edad);   
   	         itemMap.put("nivelDeEstudios", this.nivelDeEstudios); 
        	    
   	         
   	         items.add(itemMap);
        	    
        	}
        
        
      
        
    	jsonData.put("items", items);
        
        
      
       
        
        busquedaCandidato.commit();
		}catch(Exception e){
			
			busquedaCandidato.rollback();
		}
        
		
		
		
		
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
	
	
	
	
	
	
	public BigDecimal getIdPostulante() {
		return idPostulante;
	}

	public void setIdPostulante(BigDecimal idPostulante) {
		this.idPostulante = idPostulante;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
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

	public void setAreaInteres(String areaInteres) {
		this.areaInteres = areaInteres;
	}

	public String getAreaInteresAlterna() {
		return areaInteresAlterna;
	}

	public void setAreaInteresAlterna(String areaInteresAlterna) {
		this.areaInteresAlterna = areaInteresAlterna;
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

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
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

	public String getNivelDeEstudios() {
		return nivelDeEstudios;
	}

	public void setNivelDeEstudios(String nivelDeEstudios) {
		this.nivelDeEstudios = nivelDeEstudios;
	}

	public String getPalabraClave() {
		return palabraClave;
	}

	public void setPalabraClave(String palabraClave) {
		this.palabraClave = palabraClave;
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

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public String getConsulta() {
		return consulta;
	}

	public void setConsulta(String consulta) {
		this.consulta = consulta;
	}

	public int getAux() {
		return aux;
	}

	public void setAux(int aux) {
		this.aux = aux;
	}

	public String getMunicipio() {
		return municipio;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
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

	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
	}

	public void setJsonData(LinkedHashMap<String, Object> jsonData) {
		this.jsonData = jsonData;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
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

	public String getDesdePag() {
		return desdePag;
	}

	public void setDesdePag(String desdePag) {
		this.desdePag = desdePag;
	}

	public String getHastaPag() {
		return hastaPag;
	}

	public void setHastaPag(String hastaPag) {
		this.hastaPag = hastaPag;
	}
	
}
