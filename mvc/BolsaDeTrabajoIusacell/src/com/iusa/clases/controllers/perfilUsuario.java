package com.iusa.clases.controllers;

import java.sql.Blob;
import java.text.SimpleDateFormat;
//import java.util.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;

import org.apache.commons.codec.binary.Base64;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
//import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//import com.iusa.clases.models.DatosPersonales;
//import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.iusa.clases.models.Foto;

public class perfilUsuario extends ActionSupport implements ServletRequestAware{

	protected BigDecimal idUsuario;
	protected String usuario;
    protected String nombre;
    protected String apellidoPaterno;
    protected String apellidoMaterno;
    protected String rfc;
    protected String homoclave;
    protected String curp;
    protected String fechaNacimiento;
    protected String colonia;
    protected String ciudadPoblado;
    protected String cp;
    protected String calleNumero;
    protected String municipioDelegacion;
    protected String estadoCivil;
    protected String nacionalidad;
    protected String sexo;
    protected String telefono;
    protected String telefono_extra;
    protected String areaDeInteres;
    protected String areaDeInteresAlterna;
    protected String estadoPais;
    protected byte[]photo;
    protected BigDecimal idFormacion;
	protected String nivelEstudios;
	protected String instituto;
	protected String paisInstituto;
	protected String estado;
	protected String fechaInicio;
	protected String fechaFin;
	protected String status;
	protected Blob dimg;
    protected byte b[]=null;
	protected BigDecimal idIdioma;
	protected BigDecimal numIdioma;
	protected String idioma;
	protected BigDecimal dominio;
	protected HttpServletRequest servletRequest;
	protected BigDecimal idEmpresa;
	protected String empresa;
	protected String puesto;
	protected String expInicio;
	protected String expFin;
	protected BigDecimal sueldo;
	protected String motivos;
	protected String funciones;
	private String edoCivil="";
    private String sex="";
    protected String red;
    protected String blue;
    protected String yellow;
    protected String gold;
    protected BigDecimal idred;
    protected BigDecimal idblue;
    protected BigDecimal idyellow;
    protected BigDecimal idgold;
    protected BigDecimal porred;
    protected BigDecimal porblue;
    protected BigDecimal poryellow;
    protected BigDecimal porgold;
	
	private BigDecimal idIdentidad;
	private String identidad;

	protected List<BigDecimal> listaIdExperiencia;
	protected List<String> listaEmpresa;
	protected List<String> listaPuesto;
	protected List<String>listaExpInicio;
	protected List<String>listaExpFin;
	protected List<BigDecimal>listaSueldo;
	protected List<String>listaMotivos;
	protected List<String>listaFunciones;
	protected List<String>listaActual;
    
	private List<BigDecimal> listaIdFormacion;
	private List<String> listaNivel;
	private List<String> listaInstituto;
	private List<String>listaPais;
	private List<String>listaEstado;
	private List<String>listaInicio;
	private List<String>listaFin;
	private List<String>listaStatus;
	
	private List<BigDecimal>listaIdIdioma;
	private List<BigDecimal>listaNumIdioma;
	private List<String> listaIdioma;
	private List<BigDecimal>listaDominio;
	
	private List<BigDecimal> listaIdEmpuje;
	private List<String> listaEmpuje;
	private List<BigDecimal> listaIdPersuasion;
	private List<String> listaPersuasion;
	private List<BigDecimal> listaIdConstancia;
	private List<String> listaConstancia;
	private List<BigDecimal> listaIdApego;
	private List<String> listaApego;
	
	private List<String> listaCategoriaSoftware;
	private List<BigDecimal> listaIdCategoriaSoftware;
	protected List<String> listaSoftware;
	protected List<BigDecimal> listaIdSoftware;
	
	private List<String>listaCategoriaUsuario;
	private List<BigDecimal>listaIdCategoriaUsuario;
	private List<String>listaSoftwareUsuario;
	private List<BigDecimal>listaIdSoftwareUsuario;
	private List<BigDecimal>listaDominioSoftware;
	protected List<String>listaTalentos; 
	protected List<String>listaTalentosEs; 
	protected List<BigDecimal>listaIdTalentos;
	protected List<String>listaTalentosDescripcion;
	
	protected List<String>listaHobbie;
	protected List<BigDecimal>listaIdHobbie;
	protected List<String>categoriaHobbie;
	
	protected List<String>listaDeportes;
	protected List<BigDecimal>listaIdDeportes;
	
	protected List<String>listaExtremos;
	protected List<BigDecimal>listaIdExtremos;
	
	protected List<String>listaArtesPlasticas;
	protected List<BigDecimal>listaIdArtesPlasticas;
	
	protected List<String>listaEntretenimientos;
	protected List<BigDecimal>listaIdEntretenimientos;
	
	protected List<String>listaRendimiento;
	protected List<BigDecimal>listaIdRendimiento;
	
	protected List<String>listaJuegosDeMesa;
	protected List<BigDecimal>listaIdJuegosDeMesa;
	
	protected List<String>listaAficiones;
	protected List<BigDecimal>listaIdAficiones;
	
	protected List<String>listaPasatiempos;
	protected List<BigDecimal>listaIdPasatiempos;
	
	protected List<String>listaPlantasyAnimales;
	protected List<BigDecimal>listaIdPlantasyAnimales;
		
	
	protected List<BigDecimal>listaIdSkill;
	protected List<String>listaSkill;
	
	protected String persuasion;
	protected String constancia;
	protected String apego;
	protected String empuje;
	
	protected String viaje;
	protected String mudanza;
	protected BigDecimal sueldoDeseado;
	protected String horarioDeseado;
	
    protected String urlFoto;
    protected List<String> paises;
    protected List<String>estados;
    protected List<BigDecimal>idEstado;
    
    Session session;
    
    private List<String>dias;
    private List<String>mes;
    private List<String>anio;
    private Map<String,String>meses;
    
    
    public perfilUsuario() {
    	
    	session=HibernateUtil.getSessionFactory().getCurrentSession();
    }
    
    
    public String execute(){
    	
    	HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
    	
		Transaction tr = session.beginTransaction();
		try{
	      this.usuario=escapeChars((String) sesion.getAttribute("usuario"));
        
        String sql = "SELECT \"usuario\".\"id_postulante\",\"usuario\".\"nombre\",\"usuario\".\"apellido_paterno\",\"usuario\".\"apellido_materno\",\"usuario\".\"correo_electronico\",\"usuario\".\"area_de_interes\",\"usuario\".\"telefono\",\"usuario\".\"telefono_extra\",\"usuario\".\"nivel_de_estudios\",\"usuario\".\"area_formacion\",\"usuario\".\"fecha_nacimiento\",\"usuario\".\"area_de_interes_alterna\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:username";
        Query query = session.createSQLQuery(sql).setParameter("username", usuario);
        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data = query.list();
        for (Object object : data) {
        	Map row = (Map) object;
        	  this.idUsuario=(BigDecimal)row.get("id_postulante");
        	  this.nombre=(String)row.get("nombre");
        	  this.apellidoPaterno=(String)row.get("apellido_paterno");
        	  this.apellidoMaterno=(String)row.get("apellido_materno");
        	  this.telefono=(String)row.get("telefono");
        	  this.telefono_extra=(String)row.get("telefono_extra");
        	  this.fechaNacimiento=new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_nacimiento"));
        	  this.areaDeInteres=(String)row.get("area_de_interes");
        	  this.areaDeInteresAlterna=(String)row.get("area_de_interes_alterna");
        	  
        	}
		
        
        
        edoCivil="";
        sex="";
        String sql2 = "SELECT \"datos_personales\".\"rfc\",\"datos_personales\".\"homoclave\",\"datos_personales\".\"curp\",\"datos_personales\".\"sexo\",\"datos_personales\".\"estado_civil\" FROM \"datos_personales\"WHERE \"datos_personales\".\"id_usuario\"=:idUsername";
        Query query2 = session.createSQLQuery(sql2).setParameter("idUsername", idUsuario);
        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = query2.list();
        for (Object object : data2) {
        	Map row1 = (Map) object;
        	   this.rfc=(String)row1.get("rfc");
        	   this.curp=(String)row1.get("curp");
        	   edoCivil=(String)row1.get("estado_civil");
        	   this.homoclave=(String)row1.get("homoclave");
        	   sex=(String)row1.get("sexo");
        	    
        	}
        if(edoCivil.equals("c")){this.estadoCivil="Casado";}else{this.estadoCivil="Soltero";}
        if(sex.equals("M")){this.sexo="Masculino";}else{this.sexo="Femenino";}
       
        String sql8 = "SELECT \"Ubicacion\".\"calle_numero\",\"Ubicacion\".\"colonia\",\"Ubicacion\".\"municipio_delegacion\",\"Ubicacion\".\"cp\",\"Ubicacion\".\"ciudad_poblado\",\"Ubicacion\".\"estado\",\"Ubicacion\".\"nacionalidad\" FROM \"Ubicacion\"WHERE \"Ubicacion\".\"id_usuario\"=:idUsername";
        Query query8 = session.createSQLQuery(sql8).setParameter("idUsername", idUsuario);
        query8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data8 = query8.list();
        for (Object object : data8) {
        	Map row1 = (Map) object;
        	   this.colonia=(String)row1.get("colonia");
        	   this.ciudadPoblado=(String)row1.get("ciudad_poblado");
        	   this.cp=(String)row1.get("cp");
        	   this.calleNumero=(String)row1.get("calle_numero");
        	   this.municipioDelegacion=(String)row1.get("municipio_delegacion");
        	   this.nacionalidad=(String)row1.get("nacionalidad");
        	   this.estadoPais=(String)row1.get("estado");
        	    
        	}
        
        
     
        
        listaIdFormacion=new ArrayList<BigDecimal>();
        listaNivel=new ArrayList<String>();
    	listaInstituto=new ArrayList<String>();
    	listaPais=new ArrayList<String>();
    	listaEstado=new ArrayList<String>();
    	listaInicio=new ArrayList<String>();
    	listaFin=new ArrayList<String>();
    	listaStatus=new ArrayList<String>();
        
        
        String sql4 = "SELECT \"formacion_academica\".\"id_formacion\",\"nivel_academico\".\"nivel_academico\",\"formacion_academica\".\"instituto\",\"formacion_academica\".\"estado_instituto\",\"formacion_academica\".\"fecha_inicio\",\"formacion_academica\".\"fecha_fin\",\"formacion_academica\".\"status\",\"formacion_academica\".\"pais_instituto\"FROM \"formacion_academica\", \"nivel_academico\" WHERE \"formacion_academica\".\"id_usuario\"=:idUsername AND \"nivel_academico\".\"id_academico\"=\"formacion_academica\".\"nivel_estudios\"";
        Query query4 = session.createSQLQuery(sql4).setParameter("idUsername", idUsuario);
        query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data4 = query4.list();
        for (Object object : data4) {
        	Map row3 = (Map) object;
        	this.idFormacion=(BigDecimal)row3.get("id_formacion");
        	this.nivelEstudios=(String)row3.get("nivel_academico");
        	this.instituto=(String)row3.get("instituto");
        	this.paisInstituto=(String)row3.get("pais_instituto");
        	this.estado=(String)row3.get("estado_instituto");
        	this.fechaInicio=new SimpleDateFormat("dd/MM/yyyy").format(row3.get("fecha_inicio"));
        	this.fechaFin=new SimpleDateFormat("dd/MM/yyyy").format(row3.get("fecha_fin"));
        	this.status=(String)row3.get("status");
        	
        	
        	listaIdFormacion.add(idFormacion);
        	listaNivel.add(nivelEstudios);
        	listaInstituto.add(instituto);
        	listaPais.add(paisInstituto);
        	listaEstado.add(estado);
        	listaInicio.add(fechaInicio);
        	listaFin.add(fechaFin);
        	listaStatus.add(status);
        	
        	}
        
    
        
        
        
    
        listaIdIdioma=new ArrayList<BigDecimal>();
        listaIdioma=new ArrayList<String>();
    	listaDominio=new ArrayList<BigDecimal>();
    	listaNumIdioma=new ArrayList<BigDecimal>();
    	
        String sql5 = "SELECT \"idioma_aux\".\"id_idioma_aux\",\"idioma\".\"idioma\", \"idioma_aux\".\"dominio\", \"idioma\".\"id_idioma\" FROM \"idioma\",\"idioma_aux\" WHERE \"idioma_aux\".\"id_usuario\"=:idUsername AND \"idioma_aux\".\"id_idioma\"=\"idioma\".\"id_idioma\"";
        Query query5 = session.createSQLQuery(sql5).setParameter("idUsername", idUsuario);
        query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data5 = query5.list();
        for (Object object : data5) {
        	Map row4 = (Map) object;
        	
            this.idIdioma=(BigDecimal)row4.get("id_idioma_aux");
        	this.idioma=(String)row4.get("idioma");
        	this.dominio=(BigDecimal)row4.get("dominio");
        	this.numIdioma=(BigDecimal)row4.get("id_idioma");
        	
        	listaIdIdioma.add(idIdioma);
        	listaIdioma.add(idioma);
        	listaDominio.add(dominio);
        	listaNumIdioma.add(numIdioma);
        	
        	
        	}
        
       
        
             
        
  
        
        listaIdPersuasion=new ArrayList<BigDecimal>();
        listaPersuasion=new ArrayList<String>();
        
        
        String sql9 = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\"WHERE \"identidad\".\"categoria_identidad\"='Persuasion'";
        Query query9 = session.createSQLQuery(sql9);
        query9.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data9 = query9.list();
        for (Object object : data9) {
        	Map row9 = (Map) object;
              this.idIdentidad=(BigDecimal)row9.get("id_identidad");
              this.identidad=(String)row9.get("identidad");
         	  
              listaIdPersuasion.add(idIdentidad);
              listaPersuasion.add(identidad);
              
        	}
        
        String sql9usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\", \"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Persuasion' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsername";
        Query query9usu = session.createSQLQuery(sql9usu).setParameter("idUsername", idUsuario);
        query9usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data9usu = query9usu.list();
        for (Object object : data9usu) {
        	Map row9usu = (Map) object;
              this.persuasion=(String)row9usu.get("identidad");
              
        	}
        
   
        listaIdConstancia=new ArrayList<BigDecimal>();
        listaConstancia=new ArrayList<String>();
        
        
        String sql10 = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\"WHERE \"identidad\".\"categoria_identidad\"='Constancia'";
        Query query10 = session.createSQLQuery(sql10);
        query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data10 = query10.list();
        for (Object object : data10) {
        	Map row10 = (Map) object;
              this.idIdentidad=(BigDecimal)row10.get("id_identidad");
              this.identidad=(String)row10.get("identidad");
         	  
              listaIdConstancia.add(idIdentidad);
              listaConstancia.add(identidad);
              
        	}
 
        String sql10usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\" ,\"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Constancia' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsername";
        Query query10usu = session.createSQLQuery(sql10usu).setParameter("idUsername", idUsuario);
        query10usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data10usu = query10usu.list();
        for (Object object : data10usu) {
        	Map row10usu = (Map) object;
              this.constancia=(String)row10usu.get("identidad");
              
        	}
        
  
        listaIdApego=new ArrayList<BigDecimal>();
        listaApego=new ArrayList<String>();
        
        
        String sql11 = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\"WHERE \"identidad\".\"categoria_identidad\"='Apego'";
        Query query11 = session.createSQLQuery(sql11);
        query11.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data11 = query11.list();
        for (Object object : data11) {
        	Map row11 = (Map) object;
              this.idIdentidad=(BigDecimal)row11.get("id_identidad");
              this.identidad=(String)row11.get("identidad");
         	  
              listaIdApego.add(idIdentidad);
              listaApego.add(identidad);
              
        	}

        String sql11usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\",\"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Apego' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsername";
        Query query11usu = session.createSQLQuery(sql11usu).setParameter("idUsername", idUsuario);
        query11usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data11usu = query11usu.list();
        for (Object object : data11usu) {
        	Map row11usu = (Map) object;
              this.apego=(String)row11usu.get("identidad");
              
              
        	}

        
        
   
        listaIdEmpuje=new ArrayList<BigDecimal>();
        listaEmpuje=new ArrayList<String>();
        
        
        String sql12 = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\"WHERE \"identidad\".\"categoria_identidad\"='Empuje'";
        Query query12 = session.createSQLQuery(sql12);
        query12.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data12 = query12.list();
        for (Object object : data12) {
        	Map row12 = (Map) object;
              this.idIdentidad=(BigDecimal)row12.get("id_identidad");
              this.identidad=(String)row12.get("identidad");
         	  

              listaIdEmpuje.add(idIdentidad);
              listaEmpuje.add(identidad);
           
        	}
        
        String sql12usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\", \"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Empuje' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsername";
        Query query12usu = session.createSQLQuery(sql12usu).setParameter("idUsername", idUsuario);
        query12usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data12usu = query12usu.list();
        for (Object object : data12usu) {
        	Map row12usu = (Map) object;
              
              this.empuje=(String)row12usu.get("identidad");
         	  
              
        	}
        
     
        

        
        
        
   
        listaTalentos=new ArrayList<String>();
    	listaIdTalentos=new ArrayList<BigDecimal>();
    	listaTalentosDescripcion= new ArrayList<String>();
    	
    	 String sqlTal = "SELECT \"talento\".\"id_talento\",\"talento\".\"talento\",\"talento\".\"descripcion\" FROM \"talento\"";
         Query queryTal = session.createSQLQuery(sqlTal);
         queryTal.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List dataTal = queryTal.list();
         for (Object object : dataTal) {
         	Map rowTal = (Map) object;
            
               listaTalentos.add((String)rowTal.get("talento"));
               listaIdTalentos.add((BigDecimal)rowTal.get("id_talento"));
               listaTalentosDescripcion.add((String)rowTal.get("descripcion"));
               
         	}
    	
         String sqlTalEs = "SELECT \"talento\".\"talento\",\"talento_aux\".\"porcentaje\",\"talento_aux\".\"color\",\"talento_aux\".\"grado\" FROM \"talento\",\"talento_aux\" WHERE \"talento\".\"id_talento\"=\"talento_aux\".\"id_talento\" AND \"talento_aux\".\"id_usuario\"=:idUsername ";
         Query queryTalEs = session.createSQLQuery(sqlTalEs).setParameter("idUsername", idUsuario);
         queryTalEs.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
         List dataTalEs = queryTalEs.list();
         for (Object object : dataTalEs) {
         	Map rowTalEs = (Map) object;
         	 String var=(String)rowTalEs.get("color");
         	 if(var.equals("red")){
         		 idred=(BigDecimal)rowTalEs.get("id_talento");
         		 porred=(BigDecimal)rowTalEs.get("porcentaje");
         		 red=(String)rowTalEs.get("talento");
         	 }
         	 else if(var.equals("blue")){
         		 idblue=(BigDecimal)rowTalEs.get("id_talento");
         		porblue=(BigDecimal)rowTalEs.get("porcentaje");
         		blue=(String)rowTalEs.get("talento");
         	 }
         	else if(var.equals("yellow")){
         		idyellow=(BigDecimal)rowTalEs.get("id_talento");
         		poryellow=(BigDecimal)rowTalEs.get("porcentaje");
         		yellow=(String)rowTalEs.get("talento");
        	 }
         	else if(var.equals("gold")){
         		idgold=(BigDecimal)rowTalEs.get("id_talento");
         		porgold=(BigDecimal)rowTalEs.get("porcentaje");
         		gold=(String)rowTalEs.get("talento");
        	 }
         	}
         
        listaCategoriaSoftware=new ArrayList<String>();
        listaIdCategoriaSoftware=new ArrayList<BigDecimal>();
        String sqlCatSw = "SELECT \"categoria_software\".\"categoria\",\"categoria_software\".\"id_categoria\" FROM \"categoria_software\"";
        Query queryCatSw = session.createSQLQuery(sqlCatSw);
        queryCatSw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataCatSw = queryCatSw.list();
        for (Object object : dataCatSw) {
        	Map rowCatSw = (Map) object;
             String categoria=(String)rowCatSw.get("categoria");
             BigDecimal idCategoria=(BigDecimal)rowCatSw.get("id_categoria");
             
             listaCategoriaSoftware.add(categoria);
             listaIdCategoriaSoftware.add(idCategoria);
        	}
        
        listaCategoriaUsuario=new ArrayList<String>();
        listaIdCategoriaUsuario=new ArrayList<BigDecimal>();
        String sqlCat = "SELECT \"categoria_software\".\"id_categoria\",\"categoria_software\".\"categoria\" FROM \"categoria_software\",\"software_aux\",\"software\" WHERE \"software_aux\".\"id_usuario\"=:idUsername AND \"software_aux\".\"id_software\"=\"software\".\"id_software\" AND \"categoria_software\".\"id_categoria\"=\"software\".\"categoria\" GROUP BY \"categoria_software\".\"categoria\",\"categoria_software\".\"id_categoria\"";
        Query queryCat = session.createSQLQuery(sqlCat).setParameter("idUsername", idUsuario);
        queryCat.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataCat = queryCat.list();
        for (Object object : dataCat) {
        	Map rowCat = (Map) object;
             String categoriaUsu=(String)rowCat.get("categoria");
             BigDecimal idCategoriaUsu=(BigDecimal)rowCat.get("id_categoria");
             listaCategoriaUsuario.add(categoriaUsu);
             listaIdCategoriaUsuario.add(idCategoriaUsu);
        	}
        
        
        listaSoftwareUsuario=new ArrayList<String>();
    	listaIdSoftwareUsuario=new ArrayList<BigDecimal>();
    	listaDominioSoftware=new ArrayList<BigDecimal>();
    	
    	String sqlUsuSoft = "SELECT \"software_aux\".\"id_aux\",\"software\".\"nombre\",\"software_aux\".\"dominio\" FROM \"software\",\"software_aux\" WHERE  \"software\".\"id_software\"=\"software_aux\".\"id_software\" AND \"software_aux\".\"id_usuario\"=:idUsername";
        Query queryUsuSoft = session.createSQLQuery(sqlUsuSoft).setParameter("idUsername", idUsuario);
        queryUsuSoft.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataUsuSoft = queryUsuSoft.list();
        for (Object object : dataUsuSoft) {
        	Map rowUsuSoft = (Map) object;
        	 listaSoftwareUsuario.add((String)rowUsuSoft.get("nombre"));   
        	 listaIdSoftwareUsuario.add((BigDecimal)rowUsuSoft.get("id_aux"));
        	 listaDominioSoftware.add((BigDecimal)rowUsuSoft.get("dominio"));
        	
        	}
        
        
   
        listaIdHobbie=new ArrayList<BigDecimal>();
        listaHobbie=new ArrayList<String>();
        
        String sqlHob = "SELECT \"hobbie\".\"id_hob\",\"hobbie\".\"hobbie\" FROM \"hobbie\"";
        Query queryHob = session.createSQLQuery(sqlHob);
        queryHob.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataHob = queryHob.list();
        for (Object object : dataHob) {
        	Map rowHob = (Map) object;
           
              listaHobbie.add((String)rowHob.get("hobbie"));
              listaIdHobbie.add((BigDecimal)rowHob.get("id_hob"));
                            
        	}
        
        listaIdExtremos=new ArrayList<BigDecimal>();
        listaExtremos=new ArrayList<String>();
        
        String sqlExtre = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Deportes Extremos' ";
        Query queryExtre = session.createSQLQuery(sqlExtre);
        queryExtre.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataExtre = queryExtre.list();
        for (Object object : dataExtre) {
        	Map rowExtre = (Map) object;
           
              listaExtremos.add((String)rowExtre.get("hobbie"));
              listaIdExtremos.add((BigDecimal)rowExtre.get("id_hob"));
                            
        	}
        
        listaIdDeportes=new ArrayList<BigDecimal>();
        listaDeportes=new ArrayList<String>();
        
        
        String sqlDep = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Deportes' ";
        Query queryDep = session.createSQLQuery(sqlDep);
        queryDep.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataDep = queryDep.list();
        for (Object object : dataDep) {
        	Map rowDep = (Map) object;
           
              listaDeportes.add((String)rowDep.get("hobbie"));
              listaIdDeportes.add((BigDecimal)rowDep.get("id_hob"));
                            
        	}
        
        
        listaIdArtesPlasticas=new ArrayList<BigDecimal>();
        listaArtesPlasticas=new ArrayList<String>();
        
        String sqlArt = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Artes Plasticas' ";
        Query queryArt = session.createSQLQuery(sqlArt);
        queryArt.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataArt = queryArt.list();
        for (Object object : dataArt) {
        	Map rowArt = (Map) object;
           
              listaArtesPlasticas.add((String)rowArt.get("hobbie"));
              listaIdArtesPlasticas.add((BigDecimal)rowArt.get("id_hob"));
                            
        	}
        
        listaIdEntretenimientos=new ArrayList<BigDecimal>();
        listaEntretenimientos=new ArrayList<String>();
        
        String sqlEnt = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Entretenimiento' ";
        Query queryEnt = session.createSQLQuery(sqlEnt);
        queryEnt.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataEnt = queryEnt.list();
        for (Object object : dataEnt) {
        	Map rowEnt = (Map) object;
           
              listaEntretenimientos.add((String)rowEnt.get("hobbie"));
              listaIdEntretenimientos.add((BigDecimal)rowEnt.get("id_hob"));
                            
        	}
        
        
        listaIdRendimiento=new ArrayList<BigDecimal>();
        listaRendimiento=new ArrayList<String>();
        
        String sqlRend = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Rendimiento' ";
        Query queryRend = session.createSQLQuery(sqlRend);
        queryRend.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataRend = queryRend.list();
        for (Object object : dataRend) {
        	Map rowRend = (Map) object;
           
              listaRendimiento.add((String)rowRend.get("hobbie"));
              listaIdRendimiento.add((BigDecimal)rowRend.get("id_hob"));
                            
        	}
        
        listaIdJuegosDeMesa=new ArrayList<BigDecimal>();
        listaJuegosDeMesa=new ArrayList<String>();
        
        String sqlJuegos = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Juegos de Mesa' ";
        Query queryJuegos = session.createSQLQuery(sqlJuegos);
        queryJuegos.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataJuegos = queryJuegos.list();
        for (Object object : dataJuegos) {
        	Map rowJuegos = (Map) object;
           
        	  listaJuegosDeMesa.add((String)rowJuegos.get("hobbie"));
              listaIdJuegosDeMesa.add((BigDecimal)rowJuegos.get("id_hob"));
                            
        	}
        
        listaIdAficiones=new ArrayList<BigDecimal>();
        listaAficiones=new ArrayList<String>();
        
        String sqlAfi = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Aficiones' ";
        Query queryAfi = session.createSQLQuery(sqlAfi);
        queryAfi.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataAfi = queryAfi.list();
        for (Object object : dataAfi) {
        	Map rowAfi = (Map) object;
           
              listaAficiones.add((String)rowAfi.get("hobbie"));
              listaIdAficiones.add((BigDecimal)rowAfi.get("id_hob"));
                            
        	}
        
        
        listaIdPasatiempos=new ArrayList<BigDecimal>();
        listaPasatiempos=new ArrayList<String>();
        
        String sqlPasa = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Pasatiempos' ";
        Query queryPasa = session.createSQLQuery(sqlPasa);
        queryPasa.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataPasa = queryPasa.list();
        for (Object object : dataPasa) {
        	Map rowPasa = (Map) object;
           
              listaPasatiempos.add((String)rowPasa.get("hobbie"));
              listaIdPasatiempos.add((BigDecimal)rowPasa.get("id_hob"));
                            
        	}
        
        listaIdPlantasyAnimales=new ArrayList<BigDecimal>();
        listaPlantasyAnimales=new ArrayList<String>();
        
        String sqlPlant = "SELECT \"hobbie\".\"hobbie\",\"hobbie\".\"id_hob\" FROM \"hobbie\" WHERE \"hobbie\".\"categoria\"='Plantas y Animales' ";
        Query queryPlant = session.createSQLQuery(sqlPlant);
        queryPlant.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataPlant = queryPlant.list();
        for (Object object : dataPlant) {
        	Map rowPlant = (Map) object;
           
              listaPlantasyAnimales.add((String)rowPlant.get("hobbie"));
              listaIdPlantasyAnimales.add((BigDecimal)rowPlant.get("id_hob"));
                            
        	}
        

        String sqlDis = "SELECT \"disposicion\".\"viajar\",\"disposicion\".\"mudarse\"  FROM \"disposicion\" WHERE  \"disposicion\".\"id_usuario\"=:idUsername";
	     Query queryDis = session.createSQLQuery(sqlDis).setParameter("idUsername", idUsuario);
	     queryDis.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataDis = queryDis.list();
	     for (Object object : dataDis) {
	     	Map rowDis = (Map) object;

	         this.viaje=(String) rowDis.get("viajar");
	         this.mudanza=(String) rowDis.get("mudarse");
	        
    	}
	     
	     String sqlSal = "SELECT \"salario_deseado\".\"salario_deseado\"  FROM \"salario_deseado\" WHERE  \"salario_deseado\".\"id_usuario\"=:idUsername";
	     Query querySal = session.createSQLQuery(sqlSal).setParameter("idUsername", idUsuario);
	     querySal.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataSal = querySal.list();
	     for (Object object : dataSal) {
	     	Map rowSal = (Map) object;

	        this.sueldoDeseado= (BigDecimal) rowSal.get("salario_deseado");
	            
     	}
	     
	     String sqlHor = "SELECT \"horario_preferido\".\"horario_preferido\"  FROM \"horario_preferido\" WHERE  \"horario_preferido\".\"id_usuario\"=:idUsername";
	     Query queryHor = session.createSQLQuery(sqlHor).setParameter("idUsername", idUsuario);
	     queryHor.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataHor = queryHor.list();
	     for (Object object : dataHor) {
	     	Map rowHor = (Map) object;

	          this.horarioDeseado=(String) rowHor.get("horario_preferido");
	              
     	}
	     
    
	        listaSkill=new ArrayList<String>();
	    	listaIdSkill=new ArrayList<BigDecimal>();
	     
	     String sqlSkill="SELECT \"habilidad\".\"id_aux_habilidad\",\"habilidad\".\"habilidad\" FROM \"habilidad\" WHERE \"habilidad\".\"id_usuario\"=:idUsername";
	     Query querySkill = session.createSQLQuery(sqlSkill).setParameter("idUsername", idUsuario);
	     querySkill.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	     List dataSkill = querySkill.list();
	     for (Object object : dataSkill) {
	     	Map rowSkill = (Map) object;

	     	 listaSkill.add((String)rowSkill.get("habilidad"));
             listaIdSkill.add((BigDecimal)rowSkill.get("id_aux_habilidad"));
	              
     	}
	     
     /*
        String sql3 = "SELECT \"foto\".\"url_foto\"FROM \"foto\"WHERE \"foto\".\"id_usuario\"=:idUsername";
        Query query3 = session.createSQLQuery(sql3).setParameter("idUsername", idUsuario);
        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data3 = query3.list();
        for (Object object : data3) {
        	Map row2 = (Map) object;
        	   String url=(String)row2.get("url_foto");
        	   this.urlFoto="/BolsaDeTrabajoIusacell"+url;
        	   
        	}
        	
        	*/
	    
	   
	    
	     
        llenarListas();
       
        paises=new ArrayList<String>();
        String sqlpais = "SELECT \"pais\".\"pais\" FROM \"pais\"";
        Query querypais = session.createSQLQuery(sqlpais);
        querypais.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List datapais = querypais.list();
        for (Object object : datapais) {
        	Map rowpais = (Map) object;
        	
        	paises.add((String)rowpais.get("pais"));
        	   
        	}

        
        estados=new ArrayList<String>();
        idEstado=new ArrayList<BigDecimal>();
        String sqlestado = "SELECT \"estado\".\"id_estado\",\"estado\".\"nombre_estado\" FROM \"estado\" ORDER BY \"estado\".\"nombre_estado\"";
        Query queryestado = session.createSQLQuery(sqlestado);
        queryestado.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List dataestado = queryestado.list();
        for (Object object : dataestado) {
        	Map rowestado = (Map) object;
        	
        	estados.add((String)rowestado.get("nombre_estado"));
        	idEstado.add((BigDecimal)rowestado.get("id_estado"));
        	}
        
		
      
        tr.commit();
		}catch(CaracterNoValidoException e){
			
		
			
			tr.rollback();
		}catch(Exception e){
		    e.printStackTrace();
			tr.rollback();
		}
     //   session.close();
		 return SUCCESS;
	}

    public String getRed() {
		return red;
	}


	public void setRed(String red) {
		this.red = red;
	}


	public String getBlue() {
		return blue;
	}


	public void setBlue(String blue) {
		this.blue = blue;
	}


	public String getYellow() {
		return yellow;
	}


	public void setYellow(String yellow) {
		this.yellow = yellow;
	}


	public String getGold() {
		return gold;
	}


	public void setGold(String gold) {
		this.gold = gold;
	}


	public void llenarListas(){
    	
    	 this.dias=new ArrayList<String>();
         this.mes=new ArrayList<String>();
         this.anio=new ArrayList<String>();
         this.meses=new TreeMap<String,String>();
         meses.put("JAN", "Enero");
         meses.put("FEB", "Febrero");
         meses.put("MAR", "Marzo");
         meses.put("APR", "Abril");
         meses.put("MAY", "Mayo");
         meses.put("JUN", "Junio");
         meses.put("JUL", "Julio");
         meses.put("AUG", "Agosto");
         meses.put("SEP", "Septiembre");
         meses.put("OCT", "Octubre");
         meses.put("NOV", "Noviembre");
         meses.put("DEC", "Diciembre");
         
         Date date=new Date();
         
         Calendar calendar=Calendar.getInstance();
         calendar.setTime(date);
         int anho=calendar.get(Calendar.YEAR);
         
         
         String d;
         String m;
         String y;
         
         this.dias.add("Dia");
         this.mes.add("Mes");
         
         for(int i=1;i<=31;i++){
        	 
        	 if(i<10){
        		 d="0"+i;
        	 }else{
        		 d=""+i; 
        	 }
        	 this.dias.add(d);
         }
         
         for(int k=0;k<=12;k++){
        	 m=""+k;
        	 this.mes.add(m);
         }
         
         for(int j=anho;j>=1900;j--){
        	 y=""+j;
        	 this.anio.add(y);
         }
    	
    	
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
    
  
    

	public String getUsuario() {
		return usuario;
	}

	public String getNombre() {
		return nombre;
	}


	public String getApellidoPaterno() {
		return apellidoPaterno;
	}



	public String getApellidoMaterno() {
		return apellidoMaterno;
	}





	public String getRfc() {
		return rfc;
	}


	public String getCurp() {
		return curp;
	}

   public String getTelefono(){
	   return telefono;
   }
   
   public String getTelefono_extra(){
	   return telefono_extra;
   }
	
	public String getFechaNacimiento() {
		return fechaNacimiento;
	}




	public String getColonia() {
		return colonia;
	}


	
	public String getCiudadPoblado() {
		return ciudadPoblado;
	}


	public String getCp() {
		return cp;
	}


	public String getCalleNumero() {
		return calleNumero;
	}


	public String getMunicipioDelegacion() {
		return municipioDelegacion;
	}


	public String getEstadoCivil() {
		return estadoCivil;
	}


	public String getNacionalidad() {
		return nacionalidad;
	}


	public String getSexo() {
		return sexo;
	}

	public String getUrlFoto() {
		return urlFoto;
	}


	public String getNivelEstudios() {
		return nivelEstudios;
	}


	public String getInstituto() {
		return instituto;
	}


	public String getPaisInstituto() {
		return paisInstituto;
	}



	public String getEstado() {
		return estado;
	}


	
	public String getFechaInicio() {
		return fechaInicio;
	}


	

	public String getFechaFin() {
		return fechaFin;
	}



	public String getStatus() {
		return status;
	}


	public List<String> getListaNivel() {
		return listaNivel;
	}



	public List<String> getListaInstituto() {
		return listaInstituto;
	}



	public List<String> getListaPais() {
		return listaPais;
	}


	

	public List<String> getListaEstado() {
		return listaEstado;
	}



	public List<String> getListaInicio() {
		return listaInicio;
	}



	public List<String> getListaFin() {
		return listaFin;
	}


	public List<String> getListaStatus() {
		return listaStatus;
	}


	public String getIdioma() {
		return idioma;
	}


	public BigDecimal getDominio() {
		return dominio;
	}

	public BigDecimal getIdIdioma() {
		return idIdioma;
	}


	public List<BigDecimal> getListaIdIdioma() {
		return listaIdIdioma;
	}


	public List<String> getListaIdioma() {
		return listaIdioma;
	}


	public List<BigDecimal> getListaDominio() {
		return listaDominio;
	}



	public String getEmpresa() {
		return empresa;
	}


	public String getPuesto() {
		return puesto;
	}


	public String getExpInicio() {
		return expInicio;
	}


	public String getExpFin() {
		return expFin;
	}


	public BigDecimal getSueldo() {
		return sueldo;
	}


	public String getMotivos() {
		return motivos;
	}


	public String getFunciones() {
		return funciones;
	}


	public List<String> getListaEmpresa() {
		return listaEmpresa;
	}


	public List<String> getListaPuesto() {
		return listaPuesto;
	}


	public List<String> getListaExpInicio() {
		return listaExpInicio;
	}


	public List<String> getListaExpFin() {
		return listaExpFin;
	}


	public List<BigDecimal> getListaSueldo() {
		return listaSueldo;
	}



	public List<String> getListaMotivos() {
		return listaMotivos;
	}


	

	public List<String> getListaFunciones() {
		return listaFunciones;
	}


	

	public List<String> getDias() {
		return dias;
	}


	public List<String> getMes() {
		return mes;
	}


	public List<String> getAnio() {
		return anio;
	}

	public BigDecimal getIdFormacion() {
		return idFormacion;
	}

	public List<BigDecimal> getListaIdFormacion() {
		return listaIdFormacion;
	}

	public BigDecimal getIdEmpresa() {
		return idEmpresa;
	}

	public List<BigDecimal> getListaIdExperiencia() {
		return listaIdExperiencia;
	}

	public void setListaIdExperiencia(List<BigDecimal> listaIdExperiencia) {
		this.listaIdExperiencia = listaIdExperiencia;
	}



	protected List<String> VDG;
	protected List<String> VDG2;
	protected List<String> VDG3;
	
	
	protected List<String> VDP;
	protected List<String> VDP2;
	protected List<String> VDP3;
	
	protected List<String> VDR;
	protected List<String> VDR2;
	protected List<String> VDR3;
	

	public List<String> getVDG() {
		return VDG;
	}
	public List<String> getVDG2() {
		return VDG2;
	}
	public List<String> getVDG3() {
		return VDG3;
	}
	

	public List<String> getVDP() {
		return VDP;
	}
	public List<String> getVDP2() {
		return VDP2;
	}
	public List<String> getVDP3() {
		return VDP3;
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


	
	public List<String> getListaEmpuje() {
		return listaEmpuje;
	}




	public List<BigDecimal> getListaIdEmpuje() {
		return listaIdEmpuje;
	}

	public List<BigDecimal> getListaIdPersuasion() {
		return listaIdPersuasion;
	}

	public void setListaIdPersuasion(List<BigDecimal> listaIdPersuasion) {
		this.listaIdPersuasion = listaIdPersuasion;
	}

	public BigDecimal getIdIdentidad() {
		return idIdentidad;
	}


	public String getIdentidad() {
		return identidad;
	}

	public List<String> getListaCategoriaSoftware() {
		return listaCategoriaSoftware;
	}

	public List<String> getListaSoftware() {
		return listaSoftware;
	}

	public List<BigDecimal> getListaIdCategoriaSoftware() {
		return listaIdCategoriaSoftware;
	}

	public List<BigDecimal> getListaIdSoftware() {
		return listaIdSoftware;
	}

	public List<String> getListaCategoriaUsuario() {
		return listaCategoriaUsuario;
	}


	public List<String> getListaSoftwareUsuario() {
		return listaSoftwareUsuario;
	}

	public List<BigDecimal> getListaIdCategoriaUsuario() {
		return listaIdCategoriaUsuario;
	}



	public List<String> getListaTalentos() {
		return listaTalentos;
	}


	public List<String> getListaDescripcion() {
		return listaTalentosDescripcion;
	}

	public List<BigDecimal> getListaIdTalentos() {
		return listaIdTalentos;
	}
	

	public List<String> getListaHobbie() {
		return listaHobbie;
	}

	
	public List<BigDecimal> getListaIdHobbie() {
		return  listaIdHobbie;
	}

	public List<String> getListaPlantasyAnimales() {
		return listaPlantasyAnimales;
	}

	
	public List<BigDecimal> getListaIdPlantasyAnimales() {
		return  listaIdPlantasyAnimales;
	}

	
	public List<String> getListaExtremos() {
		return listaExtremos;
	}

	
	public List<BigDecimal> getListaIdExtremos() {
		return  listaIdExtremos;
	}
	
	public List<String> getListaArtesPlasticas() {
		return listaArtesPlasticas;
	}

	
	public List<BigDecimal> getListaIdArtesPlasticas() {
		return  listaIdArtesPlasticas;
	}
	
	public List<String> getListaEntretenimientos() {
		return listaEntretenimientos;
	}

	
	public List<BigDecimal> getListaIdEntretenimientos() {
		return  listaIdEntretenimientos;
	}
	
	public List<String> getListaRendimiento() {
		return listaRendimiento;
	}

	
	public List<BigDecimal> getListaIdRendimiento() {
		return  listaIdRendimiento;
	}
	
	public List<String> getListaJuegosDeMesa() {
		return listaJuegosDeMesa;
	}

	
	public List<BigDecimal> getListaIdJuegosDeMesa() {
		return  listaIdJuegosDeMesa;
	}
	
	public List<String> getListaAficiones() {
		return listaAficiones;
	}

	
	public List<BigDecimal> getListaIdAficiones() {
		return  listaIdAficiones;
	}
	
	public List<String> getListaPasatiempos() {
		return listaPasatiempos;
	}

	
	public List<BigDecimal> getListaIdPasatiempos() {
		return  listaIdPasatiempos;
	}
	
	public List<String> getListaDeportes() {
		return listaDeportes;
	}

	
	public List<BigDecimal> getListaIdDeportes() {
		return  listaIdDeportes;
	}
		
	
	public String getPersuasion(){
		return persuasion;
	}
	public String getConstancia(){
		return constancia;
	}
	public String getApego(){
		return apego;
	}
	
	public String getEmpuje(){
		return empuje;
	}

	public List<BigDecimal> getListaNumIdioma() {
		return listaNumIdioma;
	}

	public BigDecimal getNumIdioma() {
		return numIdioma;
	}

    public BigDecimal getSueldoDeseado(){
    	return sueldoDeseado;
    }
	
    public String getHorarioDeseado(){
    	return horarioDeseado;
    }
    
    public String getViaje(){
    	return viaje;
    }
    
    public String getMudanza(){
    	return mudanza;
    }
    
    public String getAreaDeInteres(){
    	return areaDeInteres;
    }

    public List<String> getListaSkill(){
		return listaSkill;
	}

	public List<BigDecimal> getListaIdSkill() {
		return listaIdSkill;
	}

	public List<String> getPaises(){
		return paises;
	}

	public List<String> getEstados(){
		return estados;
	}
	
	public List<BigDecimal> getIdEstado(){
		return idEstado;
	}

	public Map<String,String> getMeses() {
		return meses;
	}

	public void setMeses(Map<String,String> meses) {
		this.meses = meses;
	}
	
	public void setEstadoPais(String estadoPais){
		this.estadoPais=estadoPais;
	}
	
	public String getEstadoPais(){
		return estadoPais;
	}

	public List<String> getListaPersuasion() {
		return listaPersuasion;
	}

	public void setListaPersuasion(List<String> listaPersuasion) {
		this.listaPersuasion = listaPersuasion;
	}

	public List<BigDecimal> getListaIdConstancia() {
		return listaIdConstancia;
	}

	public void setListaIdConstancia(List<BigDecimal> listaIdConstancia) {
		this.listaIdConstancia = listaIdConstancia;
	}

	public List<String> getListaConstancia() {
		return listaConstancia;
	}

	public String getHomoclave() {
		return homoclave;
	}


	public void setHomoclave(String homoclave) {
		this.homoclave = homoclave;
	}


	public void setListaConstancia(List<String> listaConstancia) {
		this.listaConstancia = listaConstancia;
	}

	public List<BigDecimal> getListaIdApego() {
		return listaIdApego;
	}

	public void setListaIdApego(List<BigDecimal> listaIdApego) {
		this.listaIdApego = listaIdApego;
	}

	public List<String> getListaApego() {
		return listaApego;
	}

	public void setListaApego(List<String> listaApego) {
		this.listaApego = listaApego;
	}


	public List<BigDecimal> getListaIdSoftwareUsuario() {
		return listaIdSoftwareUsuario;
	}


	public void setListaIdSoftwareUsuario(List<BigDecimal> listaIdSoftwareUsuario) {
		this.listaIdSoftwareUsuario = listaIdSoftwareUsuario;
	}


	public List<BigDecimal> getListaDominioSoftware() {
		return listaDominioSoftware;
	}


	public void setListaDominioSoftware(List<BigDecimal> listaDominioSoftware) {
		this.listaDominioSoftware = listaDominioSoftware;
	}


	public String getAreaDeInteresAlterna(){
		return areaDeInteresAlterna;
	}


	public void setUrlFoto(String urlFoto) {
		this.urlFoto = urlFoto;
	}


	public String getEdoCivil() {
		return edoCivil;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public void setEdoCivil(String edoCivil) {
		this.edoCivil = edoCivil;
	}


	public byte[] getB() {
		return b;
	}


	public BigDecimal getIdred() {
		return idred;
	}


	public void setIdred(BigDecimal idred) {
		this.idred = idred;
	}


	public BigDecimal getIdblue() {
		return idblue;
	}


	public void setIdblue(BigDecimal idblue) {
		this.idblue = idblue;
	}


	public BigDecimal getIdyellow() {
		return idyellow;
	}


	public void setIdyellow(BigDecimal idyellow) {
		this.idyellow = idyellow;
	}


	public BigDecimal getIdgold() {
		return idgold;
	}


	public void setIdgold(BigDecimal idgold) {
		this.idgold = idgold;
	}


	public BigDecimal getPorred() {
		return porred;
	}


	public void setPorred(BigDecimal porred) {
		this.porred = porred;
	}


	public BigDecimal getPorblue() {
		return porblue;
	}


	public void setPorblue(BigDecimal porblue) {
		this.porblue = porblue;
	}


	public BigDecimal getPoryellow() {
		return poryellow;
	}


	public void setPoryellow(BigDecimal poryellow) {
		this.poryellow = poryellow;
	}


	public BigDecimal getPorgold() {
		return porgold;
	}


	public void setPorgold(BigDecimal porgold) {
		this.porgold = porgold;
	}


	public void setB(byte[] b) {
		this.b = b;
	}


	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		
	}




	
}
