package com.iusa.clases.controllers;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.*; 

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;



public class DetalleVacante extends ActionSupport {
	

	private String num_folio;
	
	public String getNumFolio() {
		return num_folio;
		}

	
	
	private LinkedHashMap<String, Object> jsonData = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	

	
	private List<String> detalle_vacante;
	
	public List<String> getVacanteDetalle() {
		return detalle_vacante;
	}
 
	public void setVacanteDetalle(List<String> detalle_vacante) {
		this.detalle_vacante = detalle_vacante;
	}
	
	
	public LinkedHashMap<String, Object> getJsonData() {
		return jsonData;
		}
	
	public Set<Map<String, Object>> getItems() {
		return items;
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
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
        
        
        
        
        
        
        
        Transaction tr = session.beginTransaction();
        try{
        String usu=escapeChars(request.getParameter("num_folio"));
		
		Query q = session.createSQLQuery("SELECT \"vacante\".\"nombre_vacante\",\"vacante\".\"folio\",\"vacante\".\"ubicacion\",\"vacante\".\"area_experiencia\",\"vacante\".\"texto_introductorio\",\"vacante\".\"escolaridad\",\"vacante\".\"sueldo_vacante\",\"vacante\".\"anios_experiencia\",\"vacante\".\"conocimientos\",\"vacante\".\"talentos\",\"vacante\".\"principales_funciones\",\"vacante\".\"horario\",\"vacante\".\"edad\",\"vacante\".\"observaciones\",\"vacante\".\"fecha_publicacion\" FROM \"vacante\" WHERE \"vacante\".\"folio\" =:usu");
		q.setParameter("usu", usu);
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
		
		detalle_vacante = new ArrayList<String>();
		
		 
		 
		 
		 
		
		for (Object object : d) {
	         Map row = (Map) object;
	         
	         HashMap<String, Object> itemMap = new HashMap<String, Object>();
	         
	         
	         itemMap.put("nombre", (String) row.get("nombre_vacante"));
	         itemMap.put("folio", (String) row.get("folio"));
	         itemMap.put("texto", (String) row.get("texto_introductorio"));
	         itemMap.put("escolaridad", (String) row.get("escolaridad"));
	         itemMap.put("conocimientos", (String) row.get("conocimientos"));
	         itemMap.put("talentos", (String) row.get("talentos"));
	         itemMap.put("ubicaciones", (String) row.get("ubicacion"));
	         itemMap.put("area", (String) row.get("area_experiencia"));
	         itemMap.put("funciones", (String) row.get("principales_funciones"));
	         itemMap.put("sueldo", (BigDecimal) row.get("sueldo_vacante"));
	         itemMap.put("horario", (String) row.get("horario"));
	         itemMap.put("edad", (String) row.get("edad"));
	         itemMap.put("observaciones", (String) row.get("observaciones"));
	         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
	         itemMap.put("fecha", (String) fechaxs );
	         
	         
	         items.add(itemMap);
	         
	
	         
	     	
	     	
	         }
		
		jsonData.put("items", items);
		tr.commit();

        }catch(Exception e){
        	tr.rollback();
        }
		return SUCCESS;
	}
	
	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  
		   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		   	
		   	
		   	return escapedString;
		   }

}
