package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.Postulaciones;
import com.opensymphony.xwork2.ActionSupport;

public class PostularCandidato2 extends ActionSupport{

	private String arreglo[];
	private String idVacante;
	
	private BigDecimal id_Usuario;
	private BigDecimal id_Vacante;
	
	private String resultado;
	private String resultado2;
	
	int i;
	
	private List<BigDecimal> idPostu;
	private List<String> nombrePostu;
	
	private BigDecimal idPostulante;
	private String nombre;
	
	private List<BigDecimal> idPostu2;
	private List<String> nombrePostu2;
	
	private BigDecimal idPostulante2;
	private String nombre2;
	
	
	private BigDecimal iDVAC;
	private String nOMVAC;
	
	private List<BigDecimal> listaiDVAC;
	private List<String> listanOMVAC;
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	
	Session session;
	
	public PostularCandidato2(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		
		idPostu=new ArrayList<BigDecimal>();
      	nombrePostu=new ArrayList<String>();
      	 idPostu2=new ArrayList<BigDecimal>();
         nombrePostu2=new ArrayList<String>(); 
         
        listaiDVAC=new ArrayList<BigDecimal>();
     	listanOMVAC=new ArrayList<String>();
     	
     	
     	Transaction trans = session.beginTransaction();
     	
     	try{
     		
     		String secureIdVac = escapeChars(idVacante);
     		String secureArreglo = "";
		
			for(i=0;i<arreglo.length;i++){
				
				secureArreglo = escapeChars(arreglo[i]);
				
				String sqlPostu = "SELECT \"postulaciones\".\"id_postulante_aux\" FROM \"postulaciones\" WHERE \"postulaciones\".\"id_vacante\" = :idVacante  AND \"postulaciones\".\"id_usuario\" = :arreglo ";
				
				
						Query query3 = session.createSQLQuery(sqlPostu);
						
						query3.setParameter("idVacante", secureIdVac).setParameter("arreglo", secureArreglo);
				   
			         
			         if (query3.list().size()==0) {
			        	 
			        	 
			        	 id_Usuario = new BigDecimal(secureArreglo);
			        	 id_Vacante = new BigDecimal(secureIdVac);
			        	 
			        	
			        		 Postulaciones postulacion = new Postulaciones();
			              		postulacion.setIdUsuario(id_Usuario);
			              		postulacion.setIdVacante(id_Vacante);
			              	session.save(postulacion);
			            	
			             	
			            
			            	
		            	
		              
		              		
		              	
			              	String sql="SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\" FROM  \"usuario\"  WHERE \"usuario\".\"id_postulante\" = :arreglo ";
			              	
			              	resultado = "Usuario(s) Postulados Correctamente";
			              	
			              	
			        		
			              	 Query query = session.createSQLQuery(sql);
			              	 
			              	 query.setParameter("arreglo", secureArreglo);
			                 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			                 List data = query.list();
			                 for (Object object : data) {
			                 	Map row = (Map) object;
			                 	    this.idPostulante=(BigDecimal)row.get("id_postulante");
			                 	    String nombreAux=(String)row.get("nombre");
			                 	    String apellidoPaterno=(String)row.get("apellido_paterno");
			                 	    String apellidoMaterno=(String)row.get("apellido_materno");
			                 	    this.nombre=nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
			                 	   
			                 	    
			                 	   idPostu.add(idPostulante);
			                 	   nombrePostu.add(nombre);
			                 	   
			                 	    
			                 	    
			                 	}
			                 
			                 
			                 String vac_sql = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :idVacante ";
				        	 
			                 Query query_vac = session.createSQLQuery(vac_sql);
			                 query_vac.setParameter("idVacante", secureIdVac);
			                 query_vac.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			                 List data3 = query_vac.list();
			                 for (Object object : data3) {
			                 	Map row3 = (Map) object;
			                 	    
			                 	   
			                   this.iDVAC = (BigDecimal)row3.get("id_vacante");
			                   this.nOMVAC = (String)row3.get("nombre_vacante");
			                 	  
			                 	   
			                   listaiDVAC.add(iDVAC);
			                   listanOMVAC.add(nOMVAC);
			                 	    
			                 	}
			                 
			           
		                 
			         }else{
			        	 
			        	
			        	 
					        	 String sql2="SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\" FROM  \"usuario\"  WHERE \"usuario\".\"id_postulante\" = :arreglo  ";
					        	 
					        	 resultado2 = "Estos Usuario(s)  Ya se en Encuentran Postulados";
					        	 
					        	
					              	
					        	 Query query2 = session.createSQLQuery(sql2);
					        	 
					        	 query2.setParameter("arreglo", secureArreglo);
					        	 
				                 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				                 List data2 = query2.list();
				                 for (Object object : data2) {
				                 	Map row2 = (Map) object;
				                 	    this.idPostulante2=(BigDecimal)row2.get("id_postulante");
				                 	    String nombreAux=(String)row2.get("nombre");
				                 	    String apellidoPaterno=(String)row2.get("apellido_paterno");
				                 	    String apellidoMaterno=(String)row2.get("apellido_materno");
				                 	    this.nombre2=nombreAux+" "+apellidoPaterno+" "+apellidoMaterno;
				                 	   
				                 	    
				                 	   idPostu2.add(idPostulante2);
				                 	   nombrePostu2.add(nombre2);
					        	
				                 }
				                 
				                 String vac_sql = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :idVacante ";
					        	 
				                 Query query_vac = session.createSQLQuery(vac_sql);
				                 query_vac.setParameter("idVacante", secureIdVac);
				                 query_vac.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				                 List data3 = query_vac.list();
				                 for (Object object : data3) {
				                 	Map row3 = (Map) object;
				                 	    
				                 	   
				                   this.iDVAC = (BigDecimal)row3.get("id_vacante");
				                   this.nOMVAC = (String)row3.get("nombre_vacante");
				                 	  
				                   listaiDVAC.add(iDVAC);
				                   listanOMVAC.add(nOMVAC); 
				                 	    
				                 	    
				                 	}
				                 
				         
		                 
		                
					
			         }
			         
			         
			         
			         secureArreglo = "";
			   
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
	
	
	

	public String[] getArreglo() {
		return arreglo;
	}

	public void setArreglo(String arreglo[]) {
		this.arreglo = arreglo;
	}

	public String getIdVacante() {
		return idVacante;
	}

	public void setIdVacante(String idVacante) {
		
		String reg = "[=;*|()%#!&?]";
        String result = idVacante.replaceAll(reg,"");
        this.idVacante = result;
		
		
	}







	public BigDecimal getId_Usuario() {
		return id_Usuario;
	}







	public void setId_Usuario(BigDecimal id_Usuario) {
		this.id_Usuario = id_Usuario;
	}







	public BigDecimal getId_Vacante() {
		return id_Vacante;
	}







	public void setId_Vacante(BigDecimal id_Vacante) {
		this.id_Vacante = id_Vacante;
	}







	public String getResultado() {
		return resultado;
	}







	public void setResultado(String resultado) {
		this.resultado = resultado;
	}







	public String getResultado2() {
		return resultado2;
	}







	public void setResultado2(String resultado2) {
		this.resultado2 = resultado2;
	}







	public List<String> getNombrePostu() {
		return nombrePostu;
	}







	public void setNombrePostu(List<String> nombrePostu) {
		this.nombrePostu = nombrePostu;
	}







	public List<BigDecimal> getIdPostu() {
		return idPostu;
	}







	public void setIdPostu(List<BigDecimal> idPostu) {
		this.idPostu = idPostu;
	}







	public List<BigDecimal> getIdPostu2() {
		return idPostu2;
	}







	public void setIdPostu2(List<BigDecimal> idPostu2) {
		this.idPostu2 = idPostu2;
	}







	public List<String> getNombrePostu2() {
		return nombrePostu2;
	}







	public void setNombrePostu2(List<String> nombrePostu2) {
		this.nombrePostu2 = nombrePostu2;
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







	public BigDecimal getIdPostulante2() {
		return idPostulante2;
	}







	public void setIdPostulante2(BigDecimal idPostulante2) {
		this.idPostulante2 = idPostulante2;
	}







	public String getNombre2() {
		return nombre2;
	}







	public void setNombre2(String nombre2) {
		this.nombre2 = nombre2;
	}







	public BigDecimal getiDVAC() {
		return iDVAC;
	}







	public void setiDVAC(BigDecimal iDVAC) {
		this.iDVAC = iDVAC;
	}







	public String getnOMVAC() {
		return nOMVAC;
	}







	public void setnOMVAC(String nOMVAC) {
		this.nOMVAC = nOMVAC;
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







	public List<BigDecimal> getListaiDVAC() {
		return listaiDVAC;
	}







	public void setListaiDVAC(List<BigDecimal> listaiDVAC) {
		this.listaiDVAC = listaiDVAC;
	}







	public List<String> getListanOMVAC() {
		return listanOMVAC;
	}







	public void setListanOMVAC(List<String> listanOMVAC) {
		this.listanOMVAC = listanOMVAC;
	}


	
	
}
