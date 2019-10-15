package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.models.MiNuevoFiltro;
import com.iusa.clases.models.PrimerFiltro;
import com.opensymphony.xwork2.ActionSupport;

public class InPrimerFiltro extends ActionSupport {

	private String usu;
	private String vac;
	
	
	private String arregloUsu[];
	private String arregloVac[];
	
	private BigDecimal id_Usuario;
	private BigDecimal id_Vacante;
	
	private BigDecimal idAdmin;
	
	
	private String resultado;
	private String resultado2;
	
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
	
	private BigDecimal iDVAC2;
	private String nOMVAC2;
	
	private List<BigDecimal> listaiDVAC;
	private List<String> listanOMVAC;
	
	private List<BigDecimal> listaiDVAC2;
	private List<String> listanOMVAC2;
	
	
	
	Session session;
	
	public InPrimerFiltro(){
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
	           idAdmin = (BigDecimal)row1.get("id_admin");
	         }
		
        
        int i=0;
        
        String secureArregloUsu = "";
    	String secureArregoVac = "";
        
        
        for(i=0;i<arregloUsu.length;i++){
        	
        	
        	System.out.println(arregloUsu[i]);
        	System.out.println(arregloVac[i]);
        	
        	secureArregloUsu = escapeChars(arregloUsu[i]);
        	secureArregoVac = escapeChars(arregloVac[i]);
        	
        	System.out.println(secureArregloUsu);
        	System.out.println(secureArregoVac);
        	
        	String sqlPostu = "SELECT \"mi_nuevo_filtro\".\"id_mi_nuevo_filtro\" FROM \"mi_nuevo_filtro\" WHERE \"mi_nuevo_filtro\".\"id_vacante\" = :idVacante AND \"mi_nuevo_filtro\".\"id_usuario\" = :arreglo";
			
			
			Query query3 = session.createSQLQuery(sqlPostu);
			
			query3.setParameter("idVacante", secureArregoVac).setParameter("arreglo", secureArregloUsu);
        	
			id_Usuario = new BigDecimal(secureArregloUsu);
       	 	id_Vacante = new BigDecimal(secureArregoVac);
        	
			 if (query3.list().size()==0) {
				 
				 
				 	
		        	
		       	 System.out.println(id_Usuario);
		       	 System.out.println(id_Vacante);	
		       	 	

		        		MiNuevoFiltro nuevoFiltro = new MiNuevoFiltro();
		        			nuevoFiltro.setId_admin(idAdmin);
		        			nuevoFiltro.setId_vacante(id_Vacante);
		        			nuevoFiltro.setId_usuario(id_Usuario);
		        			nuevoFiltro.setQuien_califico(idAdmin);
		        		
		        			
		        			session.save(nuevoFiltro);
		        	
				 
		        			
		        			idPostu=new ArrayList<BigDecimal>();
		        			nombrePostu = new ArrayList<String>();
		        		    
			              	String sql="SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\" FROM  \"usuario\"  WHERE \"usuario\".\"id_postulante\" = :arreglo ";
			              	
			              	resultado = "Usuario(s) Agregados a 'Mi Filtro'  Correctamente";
			              	
			              	
			        		
			              	 Query query = session.createSQLQuery(sql);
			              	 
			              	 query.setParameter("arreglo", id_Usuario);
			                 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			                 List data = query.list();
			                 
			                 
			                 System.out.println(data.toString());
			                 
			                 
			                 
			                 
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
			                 
			                 
			                 listaiDVAC=new ArrayList<BigDecimal>();
			                 listanOMVAC = new ArrayList<String>();
			                 
			                 String vac_sql = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :idVacante ";
				        	 
			                 Query query_vac = session.createSQLQuery(vac_sql);
			                 query_vac.setParameter("idVacante", id_Vacante);
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
				 
				 
				idPostu2=new ArrayList<BigDecimal>();
     			nombrePostu2 = new ArrayList<String>();
				 
	        	 String sql2="SELECT \"usuario\".\"id_postulante\", \"usuario\".\"nombre\", \"usuario\".\"apellido_paterno\", \"usuario\".\"apellido_materno\" FROM  \"usuario\"  WHERE \"usuario\".\"id_postulante\" = :arreglo  ";
	        	 
	        	 resultado2 = "Estos Usuario(s)  Ya se en Encuentran En 'Mi Filtro' ";
	        	 
	        	
	              	
	        	 Query query2 = session.createSQLQuery(sql2);
	        	 
	        	 query2.setParameter("arreglo", id_Usuario);
	        	 
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
                 
                 
                 
                 listaiDVAC2=new ArrayList<BigDecimal>();
                 listanOMVAC2 = new ArrayList<String>();
                 
                 String vac_sql = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"id_vacante\" = :idVacante ";
	        	 
                 Query query_vac = session.createSQLQuery(vac_sql);
                 query_vac.setParameter("idVacante", id_Vacante);
                 query_vac.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                 List data3 = query_vac.list();
                 for (Object object : data3) {
                 	Map row3 = (Map) object;
                 	    
                 	   
                   this.iDVAC2 = (BigDecimal)row3.get("id_vacante");
                   this.nOMVAC2 = (String)row3.get("nombre_vacante");
                 	  
                   listaiDVAC2.add(iDVAC2);
                   listanOMVAC2.add(nOMVAC2); 
                 	    
                 	    
                 	}
				 
				 
				 
			 }
        	
        	
        	
        	
        	
        	
        	
        	
        			
        	secureArregloUsu = "";
        	secureArregoVac = "";
        	
        }
        
        
        
        
        
    	
        trans.commit();
    }catch(Exception e){
    	e.printStackTrace();
    	trans.rollback();
    }
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}
	
	
	
	public String getUsu() {
		return usu;
	}
	public void setUsu(String usu) {
		this.usu = usu;
	}
	public String getVac() {
		return vac;
	}
	public void setVac(String vac) {
		this.vac = vac;
	}


	public BigDecimal getIdAdmin() {
		return idAdmin;
	}


	public void setIdAdmin(BigDecimal idAdmin) {
		this.idAdmin = idAdmin;
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


	public String[] getArregloUsu() {
		return arregloUsu;
	}


	public void setArregloUsu(String arregloUsu[]) {
		this.arregloUsu = arregloUsu;
	}


	public String[] getArregloVac() {
		return arregloVac;
	}


	public void setArregloVac(String arregloVac[]) {
		this.arregloVac = arregloVac;
	}

	public List<BigDecimal> getIdPostu() {
		return idPostu;
	}

	public void setIdPostu(List<BigDecimal> idPostu) {
		this.idPostu = idPostu;
	}

	public List<String> getNombrePostu() {
		return nombrePostu;
	}

	public void setNombrePostu(List<String> nombrePostu) {
		this.nombrePostu = nombrePostu;
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

	public List<BigDecimal> getListaiDVAC2() {
		return listaiDVAC2;
	}

	public void setListaiDVAC2(List<BigDecimal> listaiDVAC2) {
		this.listaiDVAC2 = listaiDVAC2;
	}

	public List<String> getListanOMVAC2() {
		return listanOMVAC2;
	}

	public void setListanOMVAC2(List<String> listanOMVAC2) {
		this.listanOMVAC2 = listanOMVAC2;
	}

	public BigDecimal getiDVAC2() {
		return iDVAC2;
	}

	public void setiDVAC2(BigDecimal iDVAC2) {
		this.iDVAC2 = iDVAC2;
	}

	public String getnOMVAC2() {
		return nOMVAC2;
	}

	public void setnOMVAC2(String nOMVAC2) {
		this.nOMVAC2 = nOMVAC2;
	}
	
}
