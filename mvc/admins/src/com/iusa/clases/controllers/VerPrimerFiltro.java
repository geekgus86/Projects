package com.iusa.clases.controllers;

import java.math.BigDecimal;
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

import com.opensymphony.xwork2.ActionSupport;

public class VerPrimerFiltro extends ActionSupport{
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	

	private String observaciones;
	private String nombre_vacante;
	private String nombre;
	private String apellido_materno;
	private String apellido_paterno;
	private BigDecimal id_vacante;
	private BigDecimal id_postulante;
	private BigDecimal id_aux;
	private BigDecimal id_admin;
	private String telefono;
	private String correo_electronico;
	
	private List<String> listaObservaciones;
	private List<String> listaNombre_vacante;
	private List<String> listaNombre;
	private List<String> listaTelefono;
	private List<String> listaCorreoElectronico;
	
	private List<BigDecimal> listaIdVacante;
	private List<BigDecimal> listaIdPostulante;
	private List<BigDecimal> listaIdAux;
	private List<BigDecimal> listaIdAdmin;
	
	
	private List<String> vacanteLista;
	private List<BigDecimal> vacanteListaId;
	
	private String vac;
	private BigDecimal vac_id;
	
	Session session;
	
	public VerPrimerFiltro(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}

	public String execute(){
		
		
		
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        user= escapeChars((String) sesion.getAttribute("usuario"));
        
        Transaction trans = session.beginTransaction();
       
        try{
        
        String sql_admin_id = " SELECT \"admins\".\"id_admin\", \"admins\".\"nivel\" FROM \"admins\" WHERE \"admins\".\"email\" = :user   ";
        
        Query query1 = session.createSQLQuery(sql_admin_id);
        query1.setParameter("user", user);
        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data1 = query1.list();
        for (Object object : data1) {
         Map row1 = (Map) object;
         this.id_admin = (BigDecimal)row1.get("id_admin");
         }
        
        
        vacanteLista=new ArrayList<String>();
        vacanteListaId = new ArrayList<BigDecimal>();
		 String sql = "  SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"subido_por\" = :id_admin  ORDER BY \"vacante\".\"nombre_vacante\" ASC ";
	     Query query = session.createSQLQuery(sql);
	     query.setParameter("id_admin", id_admin);
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
	
	
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	public String getNombre_vacante() {
		return nombre_vacante;
	}
	public void setNombre_vacante(String nombre_vacante) {
		this.nombre_vacante = nombre_vacante;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido_materno() {
		return apellido_materno;
	}
	public void setApellido_materno(String apellido_materno) {
		this.apellido_materno = apellido_materno;
	}
	public String getApellido_paterno() {
		return apellido_paterno;
	}
	public void setApellido_paterno(String apellido_paterno) {
		this.apellido_paterno = apellido_paterno;
	}
	public BigDecimal getId_postulante() {
		return id_postulante;
	}
	public void setId_postulante(BigDecimal id_postulante) {
		this.id_postulante = id_postulante;
	}
	public BigDecimal getId_vacante() {
		return id_vacante;
	}
	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}
	public BigDecimal getId_aux() {
		return id_aux;
	}
	public void setId_aux(BigDecimal id_aux) {
		this.id_aux = id_aux;
	}
	public BigDecimal getId_admin() {
		return id_admin;
	}
	
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getCorreo_electronico() {
		return correo_electronico;
	}
	public void setCorreo_electronico(String correo_electronico) {
		this.correo_electronico = correo_electronico;
	}
	public List<String> getListaObservaciones() {
		return listaObservaciones;
	}
	public void setListaObservaciones(List<String> listaObservaciones) {
		this.listaObservaciones = listaObservaciones;
	}
	public List<String> getListaNombre_vacante() {
		return listaNombre_vacante;
	}
	public void setListaNombre_vacante(List<String> listaNombre_vacante) {
		this.listaNombre_vacante = listaNombre_vacante;
	}
	public List<String> getListaNombre() {
		return listaNombre;
	}
	public void setListaNombre(List<String> listaNombre) {
		this.listaNombre = listaNombre;
	}
	public List<String> getListaTelefono() {
		return listaTelefono;
	}
	public void setListaTelefono(List<String> listaTelefono) {
		this.listaTelefono = listaTelefono;
	}
	public List<String> getListaCorreoElectronico() {
		return listaCorreoElectronico;
	}
	public void setListaCorreoElectronico(List<String> listaCorreoElectronico) {
		this.listaCorreoElectronico = listaCorreoElectronico;
	}
	public List<BigDecimal> getListaIdVacante() {
		return listaIdVacante;
	}
	public void setListaIdVacante(List<BigDecimal> listaIdVacante) {
		this.listaIdVacante = listaIdVacante;
	}
	public List<BigDecimal> getListaIdPostulante() {
		return listaIdPostulante;
	}
	public void setListaIdPostulante(List<BigDecimal> listaIdPostulante) {
		this.listaIdPostulante = listaIdPostulante;
	}
	public List<BigDecimal> getListaIdAux() {
		return listaIdAux;
	}
	public void setListaIdAux(List<BigDecimal> listaIdAux) {
		this.listaIdAux = listaIdAux;
	}
	public List<BigDecimal> getListaIdAdmin() {
		return listaIdAdmin;
	}
	public void setListaIdAdmin(List<BigDecimal> listaIdAdmin) {
		this.listaIdAdmin = listaIdAdmin;
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
	
	
}
