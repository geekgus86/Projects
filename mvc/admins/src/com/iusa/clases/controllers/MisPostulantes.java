package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
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

public class MisPostulantes extends ActionSupport {
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	
	private String vac;
	private BigDecimal vac_id;
	
	private List<String> vacanteLista;
	private List<BigDecimal> vacanteListaId;
	
	private String id_Vacante;
	
		
			private BigDecimal idVAC;
			private BigDecimal idPOSTU;
			private BigDecimal idADM;
			
			private String nombrePOSTU;
			private String nombreVAC;
			
			private List<BigDecimal> listaIdVAC;
			private List<BigDecimal> listaIdPOSTU;
			private List<BigDecimal> listaIdADM;
			
			private List<String> listaNombrePOSTU;
			private List<String> listaNombreVAC;
			
			
			private String areaInteres;
			private List<String> listaAreaInteres;
			
			private int edad;
			private List<Integer> listaEdad;
			
			private String sexo;
			private List<String> listaSexo;
	
			
			private String id_Postulante;
	
	
	private BigDecimal id_Usuario;
	
	Session session;
	
	public MisPostulantes(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user= escapeChars((String) sesion.getAttribute("usuario"));
        
        Transaction trans = session.beginTransaction();
       
        try{
        
        String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" = :user ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        query1.setParameter("user", user);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
         Map row1 = (Map) object;
           this.id_Usuario = (BigDecimal)row1.get("id_admin");
         }
        
        
        vacanteLista=new ArrayList<String>();
        vacanteListaId = new ArrayList<BigDecimal>();
		 String sql = "  SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :id_Usuario  ORDER BY \"vacante\".\"nombre_vacante\" ASC ";
	     Query query = session.createSQLQuery(sql);
	     query.setParameter("id_Usuario", id_Usuario);
	     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List data = query.list();
	     for (Object object : data) {
	     	Map row = (Map) object;
	     	
	     	vac_id = (BigDecimal)row.get("id_vacante");
	     	vac=(String)row.get("nombre_vacante");
	     	
	     	vacanteListaId.add(vac_id);
	     	vacanteLista.add(vac);
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
		
		return SUCCESS;
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
			factor = -1; //Aun no celebra su cumpleaños
			}
			} else {
			factor = -1; //Aun no celebra su cumpleaños
			}
			}
			age=(today.get(Calendar.YEAR)-birth.get(Calendar.YEAR))+factor;
			
			return age;
			
		}catch(Exception e){
		    return -1;
		}
	}

	public String getId_Vacante() {
		return id_Vacante;
	}

	public void setId_Vacante(String id_Vacante) {
		this.id_Vacante = id_Vacante;
	}

	public BigDecimal getId_Usuario() {
		return id_Usuario;
	}

	

	public BigDecimal getIdVAC() {
		return idVAC;
	}

	public void setIdVAC(BigDecimal idVAC) {
		this.idVAC = idVAC;
	}

	public BigDecimal getIdADM() {
		return idADM;
	}

	public void setIdADM(BigDecimal idADM) {
		this.idADM = idADM;
	}

	public BigDecimal getIdPOSTU() {
		return idPOSTU;
	}

	public void setIdPOSTU(BigDecimal idPOSTU) {
		this.idPOSTU = idPOSTU;
	}

	public String getNombrePOSTU() {
		return nombrePOSTU;
	}

	public void setNombrePOSTU(String nombrePOSTU) {
		this.nombrePOSTU = nombrePOSTU;
	}

	public String getNombreVAC() {
		return nombreVAC;
	}

	public void setNombreVAC(String nombreVAC) {
		this.nombreVAC = nombreVAC;
	}

	public List<BigDecimal> getListaIdVAC() {
		return listaIdVAC;
	}

	public void setListaIdVAC(List<BigDecimal> listaIdVAC) {
		this.listaIdVAC = listaIdVAC;
	}

	public List<BigDecimal> getListaIdPOSTU() {
		return listaIdPOSTU;
	}

	public void setListaIdPOSTU(List<BigDecimal> listaIdPOSTU) {
		this.listaIdPOSTU = listaIdPOSTU;
	}

	public List<BigDecimal> getListaIdADM() {
		return listaIdADM;
	}

	public void setListaIdADM(List<BigDecimal> listaIdADM) {
		this.listaIdADM = listaIdADM;
	}

	public List<String> getListaNombrePOSTU() {
		return listaNombrePOSTU;
	}

	public void setListaNombrePOSTU(List<String> listaNombrePOSTU) {
		this.listaNombrePOSTU = listaNombrePOSTU;
	}

	public List<String> getListaNombreVAC() {
		return listaNombreVAC;
	}

	public void setListaNombreVAC(List<String> listaNombreVAC) {
		this.listaNombreVAC = listaNombreVAC;
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

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	public String getAreaInteres() {
		return areaInteres;
	}

	public void setAreaInteres(String areaInteres) {
		this.areaInteres = areaInteres;
	}

	public List<String> getListaAreaInteres() {
		return listaAreaInteres;
	}

	public void setListaAreaInteres(List<String> listaAreaInteres) {
		this.listaAreaInteres = listaAreaInteres;
	}

	public List<Integer> getListaEdad() {
		return listaEdad;
	}

	public void setListaEdad(List<Integer> listaEdad) {
		this.listaEdad = listaEdad;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public List<String> getListaSexo() {
		return listaSexo;
	}

	public void setListaSexo(List<String> listaSexo) {
		this.listaSexo = listaSexo;
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
}
