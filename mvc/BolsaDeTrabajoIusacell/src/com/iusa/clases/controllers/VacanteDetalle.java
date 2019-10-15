package com.iusa.clases.controllers;

import com.iusa.clases.models.*; 
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import com.opensymphony.xwork2.ActionSupport;



public class VacanteDetalle extends ActionSupport{
	
	

	
	private String num_folio;
	
	public String getNumFolio() {
		return num_folio;
		}
		public void setNumFolio(String num_folio) {
		this.num_folio = num_folio;
		}
	

	
	private List<String> detalle_vacante;
	
	public List<String> getVacanteDetalle() {
		return detalle_vacante;
	}
 
	public void setVacanteDetalle(List<String> detalle_vacante) {
		this.detalle_vacante = detalle_vacante;
	}
	
	
	
	
	private String nombre_vacante_d;
	private String folio_d;
	private String textoIntroductorio_d;
	private String escolaridad_d;
	private float sueldo_d;
	private int anios_d;
	private String conocimientos_d;
	private String talentos_d;
	private String ubicacion_d;
	private String areaExp_d;
	private String principalesFun_d;
	

	
	public String getNomVacante() {
		return nombre_vacante_d;
		}
	public void setNomVacante(String nombre_vacante_d) {
		this.nombre_vacante_d = nombre_vacante_d;
		}
		
	public String getFolioVacante() {
		return folio_d;
		}
	public void setFolioVacante(String folio_d) {
		this.folio_d = folio_d;
		}
	
	public String getTextoIntro() {
		return textoIntroductorio_d;
		}
	public void setTextoIntro(String textoIntroductorio_d) {
		this.textoIntroductorio_d = textoIntroductorio_d;
		}
		
	public String getEscolaridadVacante() {
		return escolaridad_d;
		}
	public void setEscolaridadVacante(String escolaridad_d) {
		this.escolaridad_d = escolaridad_d;
		}

	public float getSueldoVacante() {
		return sueldo_d;
		}
	public void setSueldoVacante(float sueldo_d) {
		this.sueldo_d = sueldo_d;
		}
		
	public int getAnioExp() {
		return anios_d;
		}
	public void setAnioExp(int anios_d) {
		this.anios_d = anios_d;
	}
	
	public String getConocimientosVacante() {
		return conocimientos_d;
		}
	public void setConocimientosVacante(String conocimientos_d) {
		this.conocimientos_d = conocimientos_d;
		}
		
	public String getTalentosVacante() {
		return talentos_d;
		}
	public void setTalentosVacante(String talentos_d) {
		this.talentos_d = talentos_d;
		}

	public String getUbicacionVacante() {
		return ubicacion_d;
		}
	public void setUbicacionVacante(String ubicacion_d) {
		this.ubicacion_d = ubicacion_d;
		}
		
	public String getAreaExpVacante() {
		return areaExp_d;
		}
	public void setAreaExpVacante(String areaExp_d) {
		this.areaExp_d = areaExp_d;
		}
	
	public String getPrincipalesFuncionesVacante() {
		return principalesFun_d;
		}
	public void setPrincipalesFuncionesVacante(String principalesFun_d) {
		this.principalesFun_d = principalesFun_d;
		}
		
	


	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	
	
	public String giveMe() {
		
String sql = "SELECT \"vacante\".\"nombre_vacante\",\"vacante\".\"folio\",\"vacante\".\"ubicacion\",\"vacante\".\"area_experiencia\",\"vacante\".\"texto_introductorio\",\"vacante\".\"escolaridad\",\"vacante\".\"sueldo_vacante\",\"vacante\".\"anios_experiencia\",\"vacante\".\"conocimientos\",\"vacante\".\"talentos\",\"vacante\".\"principales_funciones\" FROM \"vacante\" WHERE \"vacante\".\"folio\" = 'EJ003'";
		
		Query q = session.createSQLQuery(sql);
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
		
		for (Object object : d) {
	         Map row = (Map) object;
	         
	         nombre_vacante_d = (String) row.get("nombre_vacante");
	     	 folio_d = (String) row.get("folio");
	     	 textoIntroductorio_d = (String) row.get("texto_introductorio");
	     	 escolaridad_d = (String) row.get("escolaridad");
	     	 anios_d = (Integer) row.get("anios_experiencia");
	     	 conocimientos_d = (String) row.get("conocimientos");
	     	 talentos_d = (String) row.get("talentos");
	     	 ubicacion_d = (String) row.get("ubicacion");
	     	 areaExp_d = (String) row.get("area_experiencia");
	     	 principalesFun_d = (String) row.get("principales_funciones");

	         }
		 
		 return SUCCESS;
		}
	

}
