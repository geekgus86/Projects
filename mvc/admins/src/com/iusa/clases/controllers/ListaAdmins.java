package com.iusa.clases.controllers;

import java.math.BigDecimal;

//import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


//import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;





public class ListaAdmins  {
    
	protected BigDecimal idAdmin; 
	protected String nombre;
	protected String cec;
	protected String email;
	protected BigDecimal nivel;
	protected String ubicacion;
	protected BigDecimal region; 
	
	protected List<BigDecimal> listaIdAdmin;
	protected List<String> listaNombre;
	protected List<String> listaCec;
	protected List<String> listaEmail;
	protected List<String> listaNivel;
	
	protected List<String> listaUbicacion;
	protected List<BigDecimal> listaRegion;
	protected List<String> listaEstatus;
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	private String estatus;

	Session session;
	
	public ListaAdmins(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		listaIdAdmin=new ArrayList<BigDecimal>();
		listaNombre=new ArrayList<String>();
		listaCec=new ArrayList<String>();
		listaEmail=new ArrayList<String>();
		listaNivel=new ArrayList<String>();
		listaEstatus=new ArrayList<String>();
		
		Transaction trans  = session.beginTransaction();
		
		try{
			
		
	        String sql = "SELECT \"admins\".\"id_admin\",\"admins\".\"cec\",\"admins\".\"nombre\",\"admins\".\"email\",\"admins\".\"nivel\",\"admins\".\"estatus_admin\" FROM \"admins\" order by \"admins\".\"nombre\" asc ";
	        Query query = session.createSQLQuery(sql);
	        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data = query.list();
	        for (Object object : data) {
	        	Map row = (Map) object;
	        	this.idAdmin=(BigDecimal)row.get("id_admin");
	        	this.nombre=(String)row.get("nombre");
	        	this.cec=(String)row.get("cec");
	        	this.email=(String)row.get("email");
	        	this.nivel=(BigDecimal)row.get("nivel");
	        	this.estatus = (String)row.get("estatus_admin");
	        	
	        	String rol=Rol(nivel.intValue());
	        	
	        	
	        	 listaIdAdmin.add(idAdmin);
	             listaNombre.add(nombre);
	             listaCec.add(cec);
	             listaEmail.add(email);
	             listaNivel.add(rol);
	             listaEstatus.add(estatus);
	        	
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
        
		return "success";
	}
	
	
	public String Rol(int nivel){
		if(nivel==1){
			return "DSI Administrador";
		}else if(nivel==2){
			return "Super Administrador";
		}else if(nivel==3){
			return "Administrador";
		}else{
			return "Calificador";
		}
		
	}
	
	public BigDecimal getIdAdmin() {
		return idAdmin;
	}
	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCec() {
		return cec;
	}
	public void setCec(String cec) {
		this.cec = cec;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public BigDecimal getNivel() {
		return nivel;
	}
	public void setNivel(BigDecimal nivel) {
		this.nivel = nivel;
	}
	
    public List<BigDecimal> getListaIdAdmin(){
		
		return listaIdAdmin;
	}
	
	public List<String> getListaNombre(){
		
		return listaNombre;
	}
	
   public List<String> getListaCec(){
		
		return listaCec;
	}

    public List<String> getListaEmail(){
	
	return listaEmail;
   }

   public List<String> getListaNivel(){
	
	return listaNivel;
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


public List<String> getListaUbicacion() {
	return listaUbicacion;
}


public void setListaUbicacion(List<String> listaUbicacion) {
	this.listaUbicacion = listaUbicacion;
}


public List<BigDecimal> getListaRegion() {
	return listaRegion;
}


public void setListaRegion(List<BigDecimal> listaRegion) {
	this.listaRegion = listaRegion;
}

public List<String> getListaEstatus() {
	return listaEstatus;
}

public void setListaEstatus(List<String> listaEstatus) {
	this.listaEstatus = listaEstatus;
}

public String getEstatus() {
	return estatus;
}

public void setEstatus(String estatus) {
	this.estatus = estatus;
}
	
	
}
