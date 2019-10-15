package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.*;
import com.opensymphony.xwork2.ActionSupport;

public class GuardaVacante extends ActionSupport {
	
	protected String idVacante;
    protected String nombreVacante;
    protected String folio;
    protected String fechaPublicacion;
    protected Date fechaVigencia;
    protected String textoIntroductorio;
    protected String escolaridad;
    protected String sueldoVacante;
    protected String aniosExperiencia;
    protected String conocimientos;
    protected String talentos;
    protected String ubicacion;
    protected String estadosp;
    protected String munisp;
    protected String estadosr;
    protected String munisr;
    protected String estadosa;
    protected String munisa;
    protected String estadose;
    protected String munise;
    protected String estadosas;
    protected String munisas;
    protected String estadosf;
    protected String munisf;
    protected String estadoVacante;
    protected String destacado;
    protected String areaExperiencia;
    protected String prinFuncionesVacante;
    protected String tipoVacante;
    protected String horario;
    protected String edad;
    protected String observaciones;
    protected String subidoPor;
    private String nombreAdmin;
    private String correo;
    private String tel;
    
    
    private BigDecimal secuencia;
    private BigDecimal secuencia_actual;
    
    private BigDecimal secuenciaYa;
    
    private BigDecimal number_aux;
    
    private String fechapreVigencia;
    
    
    protected String genero_preferencia;
    protected String vacante_esta_en;
    
    protected String destacado_nacional;
    protected String region;
    
   
    
    private Date yaFinalDecha;

	Session session;
	
	public GuardaVacante(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
    
	public String execute(){
		
		
		Transaction tran = session.beginTransaction();
		
		try{
		
		if(fechaPublicacion == null){
			
			 fechapreVigencia = null;
			
		}else{
			
			SimpleDateFormat formatoDelTexto = new SimpleDateFormat("dd/MM/yyyy");
			
			Calendar fechaInstancia = new GregorianCalendar();
			Date fechaP = null;
			try {
				fechaP = formatoDelTexto.parse(fechaPublicacion);
			} catch (ParseException e) {
				
				e.printStackTrace();
			}
			
			fechaInstancia.setTime(fechaP);
			
			fechaInstancia.add(Calendar.DATE, 30);
			
			String dia2 = Integer.toString(fechaInstancia.get(Calendar.DATE));   
			String mes2 = Integer.toString(fechaInstancia.get(Calendar.MONTH)+1);  
			String annio2 = Integer.toString(fechaInstancia.get(Calendar.YEAR)); 
			
			 fechapreVigencia = dia2+"-"+mes2+"-"+annio2;
			
		}
		
		
			
			
			String sql_admin ="SELECT \"admins\".\"id_admin\", \"admins\".\"nombre\" FROM \"admins\" WHERE \"admins\".\"id_admin\" = :subidoPor ";
			
			Query A = session.createSQLQuery(sql_admin);
			
			A.setParameter("subidoPor", subidoPor);
			
			A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dA = A.list();
			
			
			for (Object object : dA) {
		         Map row = (Map) object;
		         nombreAdmin = (String) row.get("nombre");
		         	
		     }
			
			
		String sSubNombreVacante = nombreVacante.substring(0,1);
		String sSubNombreAdmin = nombreAdmin.substring(0,1);
		
		
		
		
		//String sql_sec ="select max("id_vacante") + 1 from BOLSAIUSACELL."vacante"";
		String sql_sec ="select max(\"id_vacante\") + 1 AS NUMSEC from \"vacante\"";
		
		Query AS = session.createSQLQuery(sql_sec);
		
		AS.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dAS = AS.list();
		
		
		
		for (Object object : dAS) {
	         Map rowS = (Map) object;
	         secuencia = (BigDecimal) rowS.get("NUMSEC");
	         	
	     }
		
		
		if(fechaPublicacion == null){
			
			String mesF = "Vac";
			String annioF = "Geo"; 
			
			
			
			folio = sSubNombreVacante + sSubNombreAdmin + mesF + annioF + secuencia;
			
		}else{
			
			SimpleDateFormat formatoDelTexto = new SimpleDateFormat("dd/MM/yyyy");
			
			Calendar fechaInstanciaF = new GregorianCalendar();
			Date fechaPF = null;
			try {
				fechaPF = formatoDelTexto.parse(fechaPublicacion);
			} catch (ParseException e) {
				
				e.printStackTrace();
			}
			
			fechaInstanciaF.setTime(fechaPF);
			
			String mesF = Integer.toString(fechaInstanciaF.get(Calendar.MONTH)+1);  
			String annioF = Integer.toString(fechaInstanciaF.get(Calendar.YEAR)); 
			
			
			
				
			folio = sSubNombreVacante + sSubNombreAdmin + mesF + annioF + secuencia;
			
		}
		
		SimpleDateFormat formatoDelTexto2 = new SimpleDateFormat("dd/MM/yyyy");
		
		try {
			yaFinalDecha = formatoDelTexto2.parse(fechaPublicacion);
		} catch (ParseException e) {
			
			e.printStackTrace();
		}

				if(estadosr==null && munisr==null || estadosr.equals("") && munisr.equals("")){
					if(estadosa==null && munisa==null || estadosa.equals("") && munisa.equals("")){
						if(estadose==null && munise==null || estadose.equals("") && munise.equals("")){
							if(estadosas==null && munisas==null || estadosas.equals("") && munisas.equals("")){
						estadosf="0";
						munisf="0";
					}else{
						estadosf=estadosas;
						munisf=munisas;
					}
				}else{
					estadosf=estadose;
					munisf=munise;
				}
			}else{
				estadosf=estadosa;
				munisf=munisa;
			}
		}else{
			estadosf=estadosr;
			munisf=munisr;
		}
		
		
		
		String sql_sec3 ="select \"nombre_estado\" from \"estado\" where \"id_estado\"= :ider ";
		
		Query AS3 = session.createSQLQuery(sql_sec3);
		AS3.setParameter("ider", estadosf);
		AS3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dAS3 = AS3.list();
		
		
		
		for (Object object : dAS3) {
	         Map rowS3 = (Map) object;
	         estadosp = (String) rowS3.get("nombre_estado");
	         	
	     }
		

		String sql_sec4 ="select \"municipio\" from \"municipios\" where \"id_municipio\"= :muni and \"id_estado\"= :ider ";
		
		Query AS4 = session.createSQLQuery(sql_sec4);
		AS4.setParameter("muni", munisf).setParameter("ider", estadosf);
		AS4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List dAS4 = AS4.list();
		
		
		
		for (Object object : dAS4) {
	         Map rowS4 = (Map) object;
	         munisp = (String) rowS4.get("municipio");
	         	
	     }
		
		 
	     String securenombreVacante = nombreVacante;
	     String securefolio = escapeChars(folio);
	     String securetextoIntroductorio = textoIntroductorio;
	     String secureescolaridad = escapeChars(escolaridad);
	     String securesueldoVacante = escapeChars(sueldoVacante);
	     String secureaniosExperiencia = escapeChars(aniosExperiencia);
	     String secureconocimientos = conocimientos;
	     String securetalentos = talentos;
	     String secureubicacion = escapeChars(ubicacion);
	     String secureestadoVacante = escapeChars(estadoVacante);
	     String securedestacado = escapeChars(destacado);
	     String secureareaExperiencia = escapeChars(areaExperiencia);
	     String secureprinFuncionesVacante = prinFuncionesVacante;
	     String securetipoVacante = escapeChars(tipoVacante);
	     String securehorario = escapeChars(horario);
	     String secureedad = escapeChars(edad);
	     String secureobservaciones = observaciones;
	     String securesubidoPor = escapeChars(subidoPor);
	     String secureGenero = escapeChars(genero_preferencia);
	     String secureEstavac = escapeChars(vacante_esta_en);
	     String secureDesNa = escapeChars(destacado_nacional);
	     String secureRegion = escapeChars(region);
	     String secureCorreo = correo;
	     String secureTel = tel;
		
		
	     float securesueldoVacanteAux = Float.parseFloat(securesueldoVacante);
		
	     BigDecimal AuxaniosExp = new BigDecimal(secureaniosExperiencia);
	     
	     BigDecimal AuxDestacados = new BigDecimal(securedestacado);
	     
	     BigDecimal AuxTipoVac = new BigDecimal(securetipoVacante);
	     
	     BigDecimal AuxSubPor = new BigDecimal(securesubidoPor);
	     
	     BigDecimal AuxDesNa = new BigDecimal(secureDesNa);
	     
	     BigDecimal AuxRegio = new BigDecimal(secureRegion);
		
			
	   	 	Vacante vac = new Vacante();
	     		vac.setNombreVacante(securenombreVacante+"-"+secureubicacion);
	     		vac.setFolio(securefolio);
	     		vac.setFechaPublicacion(yaFinalDecha);
	     		vac.setFechaVigencia(fechapreVigencia);
	     		vac.setTextoIntroductorio(securetextoIntroductorio);
	     		vac.setEscolaridad(secureescolaridad);
	     		vac.setSueldoVacante(securesueldoVacanteAux);
	     		vac.setAniosExperiencia(AuxaniosExp);
	     		vac.setConocimientos(secureconocimientos);
	     		vac.setTalentos(securetalentos);
	     		vac.setUbicacion(secureubicacion);
	     		vac.setUbicacion(secureubicacion);
	     		vac.setEstadoVacante(secureestadoVacante);
	     		vac.setDestacado(AuxDestacados);
	     		vac.setAreaExperiencia(secureareaExperiencia);
	     		vac.setPrinFuncionesVacante(secureprinFuncionesVacante);
	     		vac.setTipoVacante(AuxTipoVac);
	     		vac.setHorario(securehorario);
	     		vac.setEdad(secureedad);
	     		vac.setObservaciones(secureobservaciones);
	     		vac.setSubidoPor(AuxSubPor);
	     		vac.setGenero_preferencia(secureGenero);
	     		vac.setVacante_esta_en(secureEstavac);
	     		vac.setDestacado_nacional(AuxDesNa);
	     		vac.setRegion(AuxRegio);
	     		vac.setEstados(estadosp);
	     		vac.setMuni(munisp);
	     		vac.setCorreo(secureCorreo);
	     		vac.setTel(secureTel);
	     	session.save(vac);

    	tran.commit();
		
		}catch(Exception e){
			
			tran.rollback();
		}
     	
		return SUCCESS;
	}
	
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	
	public String getNombreVacante() {
		return nombreVacante;
	}

	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
	}

	public String getFolio() {
		return folio;
	}

	public void setFolio(String folio) {
		this.folio = folio;
	}

	public String getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(String fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public Date getFechaVigencia() {
		return fechaVigencia;
	}

	public void setFechaVigencia(Date fechaVigencia) {
		this.fechaVigencia = fechaVigencia;
	}

	public String getTextoIntroductorio() {
		return textoIntroductorio;
	}

	public void setTextoIntroductorio(String textoIntroductorio) {
		this.textoIntroductorio = textoIntroductorio;
	}

	public String getEscolaridad() {
		return escolaridad;
	}

	public void setEscolaridad(String escolaridad) {
		this.escolaridad = escolaridad;
	}

	public String getSueldoVacante() {
		return sueldoVacante;
	}

	public void setSueldoVacante(String sueldoVacante) {
		this.sueldoVacante = sueldoVacante;
	}

	public String getAniosExperiencia() {
		return aniosExperiencia;
	}

	public void setAniosExperiencia(String aniosExperiencia) {
		this.aniosExperiencia = aniosExperiencia;
	}

	public String getConocimientos() {
		return conocimientos;
	}

	public void setConocimientos(String conocimientos) {
		this.conocimientos = conocimientos;
	}

	public String getTalentos() {
		return talentos;
	}

	public void setTalentos(String talentos) {
		this.talentos = talentos;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public String getEstadoVacante() {
		return estadoVacante;
	}

	public void setEstadoVacante(String estadoVacante) {
		this.estadoVacante = estadoVacante;
	}

	public String getDestacado() {
		return destacado;
	}

	public void setDestacado(String destacado) {
		this.destacado = destacado;
	}

	public String getAreaExperiencia() {
		return areaExperiencia;
	}

	public void setAreaExperiencia(String areaExperiencia) {
		this.areaExperiencia = areaExperiencia;
	}

	public String getPrinFuncionesVacante() {
		return prinFuncionesVacante;
	}

	public void setPrinFuncionesVacante(String prinFuncionesVacante) {
		this.prinFuncionesVacante = prinFuncionesVacante;
	}

	public String getTipoVacante() {
		return tipoVacante;
	}

	public void setTipoVacante(String tipoVacante) {
		this.tipoVacante = tipoVacante;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public String getEdad() {
		return edad;
	}

	public void setEdad(String edad) {
		this.edad = edad;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getSubidoPor() {
		return subidoPor;
	}

	public void setSubidoPor(String subidoPor) {
		this.subidoPor = subidoPor;
	}

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}

	public BigDecimal getSecuencia() {
		return secuencia;
	}

	public void setSecuencia(BigDecimal secuencia) {
		this.secuencia = secuencia;
	}

	public BigDecimal getSecuencia_actual() {
		return secuencia_actual;
	}

	public void setSecuencia_actual(BigDecimal secuencia_actual) {
		this.secuencia_actual = secuencia_actual;
	}

	public BigDecimal getNumber_aux() {
		return number_aux;
	}

	public void setNumber_aux(BigDecimal number_aux) {
		this.number_aux = number_aux;
	}
	
	
	public String getFechapreVigencia() {
		return fechapreVigencia;
	}

	public void setFechapreVigencia(String fechapreVigencia) {
		this.fechapreVigencia = fechapreVigencia;
	}

	public String getVacante_esta_en() {
		return vacante_esta_en;
	}

	public void setVacante_esta_en(String vacante_esta_en) {
		this.vacante_esta_en = vacante_esta_en;
	}

	public String getGenero_preferencia() {
		return genero_preferencia;
	}

	public void setGenero_preferencia(String genero_preferencia) {
		this.genero_preferencia = genero_preferencia;
	}

	public Date getYaFinalDecha() {
		return yaFinalDecha;
	}

	public void setYaFinalDecha(Date yaFinalDecha) {
		this.yaFinalDecha = yaFinalDecha;
	}

	public String getDestacado_nacional() {
		return destacado_nacional;
	}

	public void setDestacado_nacional(String destacado_nacional) {
		this.destacado_nacional = destacado_nacional;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public BigDecimal getSecuenciaYa() {
		return secuenciaYa;
	}

	public void setSecuenciaYa(BigDecimal secuenciaYa) {
		this.secuenciaYa = secuenciaYa;
	}

	public String getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}

	public String getEstadosp() {
		return estadosp;
	}

	public void setEstadosp(String estadosp) {
		this.estadosp = estadosp;
	}

	public String getMunisp() {
		return munisp;
	}

	public void setMunisp(String munisp) {
		this.munisp = munisp;
	}

	public String getEstadosr() {
		return estadosr;
	}

	public void setEstadosr(String estadosr) {
		this.estadosr = estadosr;
	}

	public String getMunisr() {
		return munisr;
	}

	public void setMunisr(String munisr) {
		this.munisr = munisr;
	}

	public String getEstadosa() {
		return estadosa;
	}

	public void setEstadosa(String estadosa) {
		this.estadosa = estadosa;
	}

	public String getMunisa() {
		return munisa;
	}

	public void setMunisa(String munisa) {
		this.munisa = munisa;
	}

	public String getEstadose() {
		return estadose;
	}

	public void setEstadose(String estadose) {
		this.estadose = estadose;
	}

	public String getMunise() {
		return munise;
	}

	public void setMunise(String munise) {
		this.munise = munise;
	}

	public String getEstadosas() {
		return estadosas;
	}

	public void setEstadosas(String estadosas) {
		this.estadosas = estadosas;
	}

	public String getMunisas() {
		return munisas;
	}

	public void setMunisas(String munisas) {
		this.munisas = munisas;
	}

	public String getEstadosf() {
		return estadosf;
	}

	public void setEstadosf(String estadosf) {
		this.estadosf = estadosf;
	}

	public String getMunisf() {
		return munisf;
	}

	public void setMunisf(String munisf) {
		this.munisf = munisf;
	}

	
}
