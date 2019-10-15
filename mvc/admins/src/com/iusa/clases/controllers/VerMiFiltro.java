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

public class VerMiFiltro extends ActionSupport{
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	private BigDecimal id_admin;
	
	private String obsPrimeraEntre;
	private String nombre_vacante;
	private String nombre;
	private String apellido_materno;
	private String apellido_paterno;
	private BigDecimal id_vacante;
	private BigDecimal id_postulante;
	private BigDecimal id_aux;
	private BigDecimal calif;
	private String telefono;
	private String correo_electronico;
	
	
	private int edad;
	private List<Integer> listaEdad;
	
	private String sexo;
	private List<String> listaSexo;
	
	private List<BigDecimal> listaIdVacante;
	private List<BigDecimal> listaIdPostulante;
	private List<BigDecimal> listaIdAux;
	private List<BigDecimal> listaIdAdmin;
	
	private List<BigDecimal> calificacion;
	
	private List<String> listaObservaciones;
	private List<String> listaNombre_vacante;
	private List<String> listaNombre;
	private List<String> listaTelefono;
	private List<String> listaCorreoElectronico;
	
	
	Session session;
	
	
	public VerMiFiltro(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
public String execute(){
		
		
	     
	    
			
			String user;
			HttpServletRequest request = ServletActionContext.getRequest();
	        HttpSession sesion = request.getSession();
	        user =  escapeChars((String) sesion.getAttribute("usuario"));
	        
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
	        
	        
	      
	        
	        String sql_mi_filtro_ver = " SELECT \"usuario\".\"nombre\", \"usuario\".\"apellido_materno\", \"usuario\".\"apellido_paterno\", \"usuario\".\"fecha_nacimiento\", \"datos_personales\".\"sexo\", \"primer_filltro\".\"observaciones\", \"filtro\".\"id_usuario\", \"filtro\".\"id_admin\", \"filtro\".\"id_vacante\", \"usuario\".\"telefono\", \"usuario\".\"correo_electronico\", \"filtro\".\"id_aux\", \"calificacion_aux\".\"id_calificacion\" FROM \"usuario\" , \"datos_personales\" , \"filtro\" , \"primer_filltro\" , \"calificacion_aux\" WHERE \"usuario\".\"id_postulante\" = \"primer_filltro\".\"id_usuario\" AND \"usuario\".\"id_postulante\" = \"primer_filltro\".\"id_usuario\" AND \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\" AND \"usuario\".\"id_postulante\" = \"filtro\".\"id_usuario\" AND \"filtro\".\"id_admin\" = :id_admin  AND \"calificacion_aux\".\"id_admin_acalifico\" = :id_admin   AND \"calificacion_aux\".\"id_usuario\"  = \"filtro\".\"id_usuario\" ";

	        listaObservaciones = new ArrayList<String>();
	    	listaNombre = new ArrayList<String>();
	    	listaTelefono = new ArrayList<String>();
	    	listaCorreoElectronico = new ArrayList<String>();
	    	
	    	listaIdVacante = new ArrayList<BigDecimal>();
	    	listaIdPostulante = new ArrayList<BigDecimal>();
	    	listaIdAux = new ArrayList<BigDecimal>();
	    	listaIdAdmin = new ArrayList<BigDecimal>();
	    	calificacion = new ArrayList<BigDecimal>();
	    	
	    	listaEdad = new ArrayList<Integer>();
			listaSexo = new ArrayList<String>();
			
	    	
	    	
	    	Query q = session.createSQLQuery(sql_mi_filtro_ver);
	    	
	    	q.setParameter("id_admin", id_admin).setParameter("id_admin", id_admin);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
			
			for (Object object : d) {
		         Map row = (Map) object;
		         
		         id_vacante = (BigDecimal) row.get("id_vacante");
		         obsPrimeraEntre = (String)row.get("observaciones") ;
		     	 String nombreAux = (String)row.get("nombre");
	    	     String apellidoPaterno=(String)row.get("apellido_paterno");
	    	     String apellidoMaterno=(String)row.get("apellido_materno");
	    	     nombre = nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
	    	     Date fechaNac=(Date)row.get("fecha_nacimiento");
	        	    this.edad=calcularEdad(fechaNac);
	        	    sexo = (String) row.get("sexo");
		     	 id_postulante = (BigDecimal) row.get("id_usuario");
		     	 id_aux = (BigDecimal) row.get("id_aux");
		     	 id_admin = (BigDecimal) row.get("id_admin");
		     	 telefono = (String)row.get("telefono");
		     	 correo_electronico = (String)row.get("correo_electronico");
		     	 calif = (BigDecimal) row.get("id_calificacion");
		     	 
		     	listaObservaciones.add(obsPrimeraEntre);
		    	listaNombre.add(nombre);
		    	listaTelefono.add(telefono);
		    	listaCorreoElectronico.add(correo_electronico);
		    	
		    	listaIdVacante.add(id_vacante);
		    	listaIdPostulante.add(id_postulante);
		    	listaIdAux.add(id_aux);
		    	listaIdAdmin.add(id_admin);
		    	
		    	listaEdad.add(edad); 
    			listaSexo.add(sexo);
    			
    			calificacion.add(calif);
		    	
		     	
		     	
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





	public String getObsPrimeraEntre() {
		return obsPrimeraEntre;
	}





	public void setObsPrimeraEntre(String obsPrimeraEntre) {
		this.obsPrimeraEntre = obsPrimeraEntre;
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





	public BigDecimal getId_vacante() {
		return id_vacante;
	}





	public void setId_vacante(BigDecimal id_vacante) {
		this.id_vacante = id_vacante;
	}





	public BigDecimal getId_postulante() {
		return id_postulante;
	}





	public void setId_postulante(BigDecimal id_postulante) {
		this.id_postulante = id_postulante;
	}





	public BigDecimal getId_aux() {
		return id_aux;
	}





	public void setId_aux(BigDecimal id_aux) {
		this.id_aux = id_aux;
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



	public int getEdad() {
		return edad;
	}



	public void setEdad(int edad) {
		this.edad = edad;
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



	public List<BigDecimal> getCalificacion() {
		return calificacion;
	}



	public void setCalificacion(List<BigDecimal> calificacion) {
		this.calificacion = calificacion;
	}



	public BigDecimal getCalif() {
		return calif;
	}



	public void setCalif(BigDecimal calif) {
		this.calif = calif;
	}
}
