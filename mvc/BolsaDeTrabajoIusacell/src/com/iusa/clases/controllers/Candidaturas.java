package com.iusa.clases.controllers;


import com.iusa.clases.models.*; 

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;
import com.iusa.clases.interceptor.CaracterNoValidoException;



public class Candidaturas extends ActionSupport {
	

	
	private List<String> vacantes1; 		          
	private List<String> vacantes2; 		        
	private List<String> vacantes3; 		      
	private List<String> vacantes4; 		      
	private List<String> vacantes5; 		  	 
	private List<String> vacantes_id; 		
	private List<BigDecimal> postulaciones; 	
	private List<String> listaEstadoVac;	  
	private List<String> listaHorarioVac;	  
	private List<Float>  listaSueldo;		
	private List<BigDecimal> listaAnios;	
	
	private BigDecimal idUsuario;
	
	private int existe;
	
	

	private String foliox;
	private String vacantex;
	private String ubicacionx;
	private String areax;
	private String fechaxs;
	private String id_vacante;
	private BigDecimal postulacionex;
	private String horariox;
	private String estadox;
	private BigDecimal aniox;
	private float sueldox;
	
	
	private String nombre;
	private String rfc;
	private String curp;
	private String fechaNacimiento;
	private String estadoCivil;
	private String sexo;
	private String urlFoto;
	
	

	
	protected List<String> VDG;
	protected List<String> VDG2;
	protected List<String> VDG3;
	

	protected List<String> VDR;
	protected List<String> VDR2;
	protected List<String> VDR3;
	
	
	
	
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	public String execute() {
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();

        Transaction tr = session.beginTransaction();
        try{
        	user=escapeChars((String) sesion.getAttribute("usuario"));
        	if(user==null){
            	setExiste(0);
            }else{
            	setExiste(1);
            }
        String sqlUsu = "SELECT \"usuario\".\"id_postulante\"FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:user";
        Query query = session.createSQLQuery(sqlUsu).setParameter("user", user);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
         Map row = (Map) object;
           this.idUsuario=(BigDecimal)row.get("id_postulante");
         }
        
        
      String sex="";
        String sql2 = "  SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\",\"usuario\".\"apellido_paterno\",\"usuario\".\"apellido_materno\", \"usuario\".\"usuario_nombre\", \"datos_personales\".\"curp\", \"datos_personales\".\"sexo\", \"datos_personales\".\"rfc\",\"datos_personales\".\"estado_civil\" FROM \"usuario\" , \"datos_personales\" WHERE \"usuario\".\"usuario_nombre\" = :user AND \"datos_personales\".\"id_usuario\" = \"usuario\".\"id_postulante\"   ";
        Query query2 = session.createSQLQuery(sql2).setParameter("user", user);;
        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = query2.list();
        for (Object object : data2) {
         Map row1 = (Map) object;
         	this.idUsuario = (BigDecimal)row1.get("id_postulante");
         	String nombreAux=(String)row1.get("nombre");
         	String apellidoPaterno=(String)row1.get("apellido_paterno");
 	    	String apellidoMaterno=(String)row1.get("apellido_materno");
 	    	this.nombre=nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
            this.rfc=(String)row1.get("rfc");
            this.curp=(String)row1.get("curp");
           
            this.estadoCivil=(String)row1.get("estado_civil");
            sex=(String)row1.get("sexo");
             
         }
        if(sex.equals("M")){this.sexo="Masculino";}else{this.sexo="Femenino";}
 
        
        String sql3 = "SELECT \"foto\".\"url_foto\"FROM \"foto\"WHERE \"foto\".\"id_usuario\"=:idUsuario";
        Query query3 = session.createSQLQuery(sql3).setParameter("idUsuario", idUsuario);
        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data3 = query3.list();
        for (Object object : data3) {
         Map row2 = (Map) object;
            String url=(String)row2.get("url_foto");
            this.urlFoto="/BolsaDeTrabajoIusacell"+url;
            
         }
        
        
        
        
        
        
   
        
        String sql =" SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"ubicacion\", \"vacante\".\"area_experiencia\", \"vacante\".\"horario\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"estado_vacante\", \"vacante\".\"anios_experiencia\" FROM \"vacante\" , \"postulaciones\" WHERE \"vacante\".\"id_vacante\" = \"postulaciones\".\"id_vacante\" AND \"postulaciones\".\"id_usuario\" = :idUsuario ";
		
		Query q = session.createSQLQuery(sql).setParameter("idUsuario", idUsuario);;
		
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List d = q.list();
		
		vacantes_id = new ArrayList<String>();
		vacantes1 = new ArrayList<String>();
		vacantes2 = new ArrayList<String>();
		vacantes3 = new ArrayList<String>();
		vacantes4 = new ArrayList<String>();
		vacantes5 = new ArrayList<String>();
		
		listaEstadoVac = new ArrayList<String>();	  
		listaHorarioVac = new ArrayList<String>();	  
		listaSueldo = new ArrayList<Float>();		 
		listaAnios = new ArrayList<BigDecimal>();	
		
		
		
		 for (Object object : d) {
	         Map row = (Map) object;
	         	id_vacante = (String) row.get(id_vacante);
	         	foliox = (String) row.get("folio");
	         	vacantex = (String) row.get("nombre_vacante");
	         	ubicacionx = (String) row.get("ubicacion");
	         	areax = (String) row.get("area_experiencia");
	         	fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
	         	horariox = (String) row.get("horario");
	        	estadox = (String) row.get("estado_vacante");
	        	aniox = (BigDecimal) row.get("anios_experiencia");
	        	BigDecimal jup = (BigDecimal) row.get("sueldo_vacante");
	        	sueldox = jup.floatValue();
	         	
	         	
	         	
	         	vacantes_id.add(id_vacante);
	         	vacantes1.add(foliox);
	         	vacantes2.add(vacantex);
	         	vacantes3.add(ubicacionx);
	         	vacantes4.add(areax);
	         	vacantes5.add(fechaxs);
	         	
	         	listaEstadoVac.add(estadox);
	         	listaHorarioVac.add(horariox);
	         	listaSueldo.add(sueldox);
	         	listaAnios.add(aniox);
	         }
		 
		 
			
			
		

		 tr.commit();
        }catch(Exception e){
        	tr.commit();
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

	public int getExiste() {
		return existe;
	}

	public void setExiste(int existe) {
		this.existe = existe;
	}
	
	
	public List<String> getVacantes1() {
		return vacantes1;
	}
 
	public void setVacantes1(List<String> vacantes1) {
		this.vacantes1 = vacantes1;
	}
	
	public List<String> getVacantes2() {
		return vacantes2;
	}
 
	public void setVacantes2(List<String> vacantes2) {
		this.vacantes2 = vacantes2;
	}
	
	public List<String> getVacantes3() {
		return vacantes3;
	}
 
	public void setVacantes3(List<String> vacantes3) {
		this.vacantes3 = vacantes3;
	}
	
	public List<String> getVacantes4() {
		return vacantes4;
	}
 
	public void setVacantes4(List<String> vacantes4) {
		this.vacantes4 = vacantes4;
	}
	
	public List<String> getVacantes5() {
		return vacantes5;
	}
 
	public void setVacantes5(List<String> vacantes5) {
		this.vacantes5 = vacantes5;
	}
	
	public List<String> getVacantes_id() {
		return vacantes_id;
	}
 
	public void setVacantes_id(List<String> vacantes_id) {
		this.vacantes_id = vacantes_id;
	}
	
	public BigDecimal setIdUsuario(){
		return idUsuario;
	}
	
	public BigDecimal getIdUSuario(BigDecimal idUsuario){
		return this.idUsuario = idUsuario;
	}
	
	
	public List<BigDecimal> getPostulaciones() {
		return postulaciones;
	}
 
	public void setPostulaciones(List<BigDecimal> postulaciones) {
		this.postulaciones = postulaciones;
	}
	
	
	public List<String> getVDG() {
		return VDG;
	}
	public List<String> getVDG2() {
		return VDG2;
	}
	public List<String> getVDG3() {
		return VDG3;
	}
	
	
	

	public List<String> getVDR() {
		return VDR;
	}
	public List<String> getVDR2() {
		return VDR2;
	}
	public List<String> getVDR3() {
		return VDR3;
	}

	public List<String> getListaEstadoVac() {
		return listaEstadoVac;
	}

	public void setListaEstadoVac(List<String> listaEstadoVac) {
		this.listaEstadoVac = listaEstadoVac;
	}

	public List<String> getListaHorarioVac() {
		return listaHorarioVac;
	}

	public void setListaHorarioVac(List<String> listaHorarioVac) {
		this.listaHorarioVac = listaHorarioVac;
	}

	public List<Float> getListaSueldo() {
		return listaSueldo;
	}

	public void setListaSueldo(List<Float> listaSueldo) {
		this.listaSueldo = listaSueldo;
	}

	public List<BigDecimal> getListaAnios() {
		return listaAnios;
	}

	public void setListaAnios(List<BigDecimal> listaAnios) {
		this.listaAnios = listaAnios;
	}

	public BigDecimal getPostulacionex() {
		return postulacionex;
	}

	public void setPostulacionex(BigDecimal postulacionex) {
		this.postulacionex = postulacionex;
	}

	public String getHorariox() {
		return horariox;
	}

	public void setHorariox(String horariox) {
		this.horariox = horariox;
	}

	public String getEstadox() {
		return estadox;
	}

	public void setEstadox(String estadox) {
		this.estadox = estadox;
	}

	public BigDecimal getAniox() {
		return aniox;
	}

	public void setAniox(BigDecimal aniox) {
		this.aniox = aniox;
	}

	public float getSueldox() {
		return sueldox;
	}

	public void setSueldox(float sueldox) {
		this.sueldox = sueldox;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getRfc() {
		return rfc;
	}

	public void setRfc(String rfc) {
		this.rfc = rfc;
	}

	public String getCurp() {
		return curp;
	}

	public void setCurp(String curp) {
		this.curp = curp;
	}

	public String getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(String fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getUrlFoto() {
		return urlFoto;
	}

	public void setUrlFoto(String urlFoto) {
		this.urlFoto = urlFoto;
	}

}
