package com.iusa.clases.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;


import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.opensymphony.xwork2.ActionSupport;

import java.util.Calendar;

public class Busqueda extends ActionSupport {
	
	private String palabra_bus;
	private String cate_bus;
	private String subcate_bus;
	private String ciudad_bus;
	private String localidad_bus;
	private int fecha_bus;
	private int desde_bus;
	private String meseval; 
	private String diaeval;
	private String añoeval;
	private int existe;
	
	/**
	 *  LISTAS PARA ALAMCENAR LAS VACANTES
	 **/
	private List<String> vacantes1;
	private List<String> vacantes2;
	private List<String> vacantes3;
	private List<String> vacantes4;
	private List<String> vacantes5;
	
	private List<String> listaHorarioVac;	  /* HORARIO VACANTE  */
	private List<Float>  listaSueldo;		 /* SUELDO VACANTE   */
	private List<BigDecimal> listaAnios;	/* AÑOS EXP			*/
	
	
	private String horariox;
	private BigDecimal aniox;
	private float sueldox;
	
	private String ubicacion;
	
	private String foliox;
	private String vacantex;
	private String ubicacionx;
	private String areax;
	private String fechax;
	private String fechaz;
	private String idvac;
	

	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();
	
	private String user;
	
	private String consulta;
	private String consulta1;
	private String consulta2;
	private String consulta3;
	private String consulta4;
	private String consulta5;
	private int inc;
	private String arregloConsulta[];
	private String arregloConsulta2[];
	
	private String fecha_resta;
	
	private String fecha_hoy;
	
	
	
	
	
	
	public String execute() {
		
	
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
        if(sesion!=null){
        	this.user=(String) sesion.getAttribute("usuario");
	    }
        
        
        if(user==null){
        	existe=0;
        }else{
        	existe=1;
        }
        
        
        consulta  = "";
        consulta1 = "nada";
        consulta2 = "nada";
        consulta3 = "nada";
        consulta4 = "nada";
        consulta5 = "nada";
        
        inc = 0;
        
        Calendar c0 = Calendar.getInstance();
        meseval= Integer.toString(c0.get(Calendar.MONTH)+1);
        diaeval = Integer.toString(c0.get(Calendar.DATE));
        añoeval = Integer.toString(c0.get(Calendar.YEAR));
        if(!(palabra_bus.equals("Palabra de búsqueda"))){	
        	consulta1 = "  \"vacante\".\"nombre_vacante\"  IN ( SELECT \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE REGEXP_LIKE (\"vacante\".\"nombre_vacante\", :palabra_bus, 'i') OR REGEXP_LIKE (\"vacante\".\"ubicacion\", :palabra_bus, 'i') OR REGEXP_LIKE (\"vacante\".\"sueldo_vacante\", :palabra_bus, 'i') OR REGEXP_LIKE (\"vacante\".\"area_experiencia\", :palabra_bus, 'i') OR REGEXP_LIKE (\"vacante\".\"observaciones\", :palabra_bus, 'i') ) ";
        	inc = inc + 1;
        }
        
        
        if(!(cate_bus.equals("Categoria"))){
        	consulta2 = "  \"vacante\".\"area_experiencia\" LIKE :cate_bus "; 
        	inc = inc + 1;
        }
        
        
        if(fecha_bus != 0){
        	
        	/**
    		 *  OBTENIEDO LA FECHA DEL SITEMA DE HOY PARA RESTARLE LO QUE VIENE DEL COMBO DE LOGIN "DESDE_BUS" 
    		 **/
    		
    		Calendar c1 = Calendar.getInstance(); /** CREANDO INSTANCIA DE LA CLASE CALENDAR PARA OBTENER LA FECHA DEL SISTEMA DE HOY **/
    		String dia = Integer.toString(c1.get(Calendar.DATE));   /** OBTENIENDO EL DIA **/
    		String mes = Integer.toString(c1.get(Calendar.MONTH)+1);  /** OBTENIENDO EL MES **/
    		String annio = Integer.toString(c1.get(Calendar.YEAR)); /** OBTENIENDO EL AÑO **/
    		 
    		
    		this.fecha_hoy = dia+"-"+mes+"-"+annio; /** CONCATENANDO PARA LA POSTERIOR BUSQUEDA Y OBTENER SU TIMESTAMP **/
    		
    		Calendar c2 = Calendar.getInstance();
    		c2.add(Calendar.DATE, - fecha_bus);
    		String dia2 = Integer.toString(c2.get(Calendar.DATE));   /** OBTENIENDO EL DIA CON LA RESTA DE LOS DIAS ENVIADOS POR EL USUARIO **/
    		String mes2 = Integer.toString(c2.get(Calendar.MONTH)+1);  /** OBTENIENDO EL MES CON LA RESTA DE LOS DIAS ENVIADOS POR EL USUARIO **/
    		String annio2 = Integer.toString(c2.get(Calendar.YEAR)); /** OBTENIENDO EL AÑO CON LA RESTA DE LOS DIAS ENVIADOS POR EL USUARIO **/
    		
    		this.fecha_resta = dia2+"-"+mes2+"-"+annio2; /** CONCATENANDO PARA LA POSTERIOR BUSQUEDA Y OBTENER SU TIMESTAMP **/
       	
        	consulta3 = "  \"vacante\".\"fecha_publicacion\" BETWEEN :fecha_resta  AND :fecha_hoy  ";
        	inc = inc + 1;
        }
        
        if(!( ciudad_bus.equals("Ciudad/Estado") ) ){        		
        	consulta4 =  "  \"vacante\".\"ubicacion\"  LIKE :ciudad_bus  ";
        	inc = inc + 1;
        }
        
        

        
        
        
       
        
        
        
        arregloConsulta = new String[5];
        
        arregloConsulta[0] = consulta1;
        arregloConsulta[1] = consulta2;
        arregloConsulta[2] = consulta3;
        arregloConsulta[3] = consulta4;
        arregloConsulta[4] = consulta5;
        
        
        
        arregloConsulta2 = new String[inc];
       
       int h=0;
        
        for(int j=0;j<=4;j++){
        	if(arregloConsulta[j] != "nada"){
        		arregloConsulta2[h] = arregloConsulta[j];
        		h = h+1;
        	}	
        }
        
        
        
        if(arregloConsulta[0] == "nada" && arregloConsulta[1] == "nada" && arregloConsulta[2] == "nada" && arregloConsulta[3] == "nada" &&arregloConsulta[4] == "nada"){
        	consulta = "";
        }else{
        	consulta = " WHERE ";
        }
        
        
        for(int i=0;i<=inc-1;i++){
        		consulta = consulta + "  "+arregloConsulta2[i]+"  ";
            	if(i < inc-1 ){
            		consulta = consulta + "AND";
            		continue;
            	}else{
            		break;
            	}
        		
        }
      
        
        
        
        
        
        Transaction tr = session.beginTransaction();
        Query q = session.createSQLQuery("SELECT \"vacante\".\"id_vacante\",\"vacante\".\"folio\",\"vacante\".\"nombre_vacante\",\"vacante\".\"ubicacion\",\"vacante\".\"area_experiencia\",\"vacante\".\"fecha_publicacion\",\"vacante\".\"fecha_vigencia\", \"vacante\".\"horario\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\" FROM \"vacante\" "+consulta+" ORDER BY \"fecha_publicacion\" DESC");
		//q.setParameter("consulta",consulta);

		
		
		if(!(palabra_bus.equals("Palabra de búsqueda"))){q.setParameter("palabra_bus", palabra_bus );}
		
		if(!(cate_bus.equals("Categoria"))){q.setParameter("cate_bus", '%' + cate_bus + '%');}
		
		if(fecha_bus != 0){q.setParameter("fecha_resta", fecha_resta).setParameter("fecha_hoy", fecha_hoy);  }
		
		if(!( ciudad_bus.equals("Ciudad/Estado") ) ){q.setParameter("ciudad_bus", '%' + ciudad_bus + '%');}
		
        try{
		if (q.list().size()>=1) {
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List d = q.list();
			
			
			
			listaHorarioVac = new ArrayList<String>();	  
			listaSueldo = new ArrayList<Float>();		 
			listaAnios = new ArrayList<BigDecimal>();	
			
			vacantes1 = new ArrayList<String>();
			vacantes2 = new ArrayList<String>();
			vacantes3 = new ArrayList<String>();
			vacantes4 = new ArrayList<String>();
			vacantes5 = new ArrayList<String>();
			
			
			 for (Object object : d) {
		         Map row = (Map) object;
		         idvac=String.valueOf((BigDecimal) row.get("id_vacante"));
		         fechaz = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		         String[] fechaArray = fechaz.split("/");
		         int dfec1=Integer.parseInt(diaeval);
		         int mfec1=Integer.parseInt(meseval);
		         int añfec1=Integer.parseInt(añoeval);
		         int dfec2=Integer.parseInt(fechaArray[0]);
		         int mfec2=Integer.parseInt(fechaArray[1]);
		         int añfec2=Integer.parseInt(fechaArray[2]);
		         
		         if(mfec2==mfec1 && añfec2>=añfec1){
		        	 if(dfec2>=dfec1){
		         	foliox = (String) row.get("folio");
		         	vacantex = (String) row.get("nombre_vacante");
		         	ubicacionx = (String) row.get("ubicacion");
		         	areax = (String) row.get("area_experiencia");
		         	
		         	fechax = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         	
		         	
		         	horariox = (String) row.get("horario");
		        	aniox = (BigDecimal) row.get("anios_experiencia");
		        	BigDecimal jup = (BigDecimal) row.get("sueldo_vacante");
		        	sueldox = jup.floatValue();
		         	
		         	
		         	//fechax = (String) row.get("fecha_publicacion");
		         	
		         	
		         	vacantes1.add(foliox);
		         	vacantes2.add(vacantex);
		         	vacantes3.add(ubicacionx);
		         	vacantes4.add(areax);
		         	vacantes5.add(fechax);
		         	
		         	
		         	listaHorarioVac.add(horariox);
		         	listaSueldo.add(sueldox);
		         	listaAnios.add(aniox);
		        	 }else{
		        		 Query a = session.createSQLQuery("UPDATE \"vacante\"  SET \"estado_vacante\"='Inactiva' WHERE \"vacante\".\"id_vacante\"= :inacvac ");
						 a.setParameter("inacvac",idvac);
						 a.executeUpdate();
		        	 }
			 }else if(mfec2>mfec1 && añfec2>=añfec1){
				 foliox = (String) row.get("folio");
		         	vacantex = (String) row.get("nombre_vacante");
		         	ubicacionx = (String) row.get("ubicacion");
		         	areax = (String) row.get("area_experiencia");
		         	
		         	fechax = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		         	
		         	
		         	horariox = (String) row.get("horario");
		        	aniox = (BigDecimal) row.get("anios_experiencia");
		        	BigDecimal jup = (BigDecimal) row.get("sueldo_vacante");
		        	sueldox = jup.floatValue();
		         	
		         	
		         	//fechax = (String) row.get("fecha_publicacion");
		         	
		         	
		         	vacantes1.add(foliox);
		         	vacantes2.add(vacantex);
		         	vacantes3.add(ubicacionx);
		         	vacantes4.add(areax);
		         	vacantes5.add(fechax);
		         	
		         	
		         	listaHorarioVac.add(horariox);
		         	listaSueldo.add(sueldox);
		         	listaAnios.add(aniox);
			 } else{
				 Query a = session.createSQLQuery("UPDATE \"vacante\" SET \"estado_vacante\"='Inactiva' WHERE \"vacante\".\"id_vacante\"= :inacvac ");
				 a.setParameter("inacvac",idvac);
				 a.executeUpdate();
			 }
			 }
			
			 
				addActionMessage("Los criterios que solicitaste arrojaron las Siguientes Ofertas");
				
				
				
				
				if(existe==0){

		        	
		        	
					
		        }else{
		        	
		        	
		        	
		        }
				
				
				tr.commit();
			 	return SUCCESS;
			 	
			} else {
				
				
			addActionError("No existen ofertas con los Criterios que Solicitaste");
			
			
			
			
			if(existe==0){

	        	
	        
	        }else{
	        	
	        	
	        	
	        	
	        }
			
			
			
			return ERROR;
			
		}

        }catch(Exception e){
        	e.printStackTrace();
        	tr.rollback();
        	return ERROR;
        }
	}
	
	public String getPalabra_bus() {
		return palabra_bus;
	}
	public void setPalabra_bus(String palabra_bus) {
		this.palabra_bus = palabra_bus;
	}
	
	public String getCate_bus() {
		return cate_bus;
	}
	public void setCate_bus(String cate_bus) {
		this.cate_bus = cate_bus;
	}
	
	public String getSubcate_bus() {
		return subcate_bus;
	}
	public void setSubcate_bus(String subcate_bus) {
		this.subcate_bus = subcate_bus;
	}
	
	public String getCiudad_bus() {
		return ciudad_bus;
	}
	public void setCiudad_bus(String ciudad_bus) {
		this.ciudad_bus = ciudad_bus;
	}
	
	public String getLocalidad_bus() {
		return localidad_bus;
	}
	public void setLocalidad_bus(String localidad_bus) {
		this.localidad_bus = localidad_bus;
	}
	
	public int getDesdeBus() {
		return desde_bus;
	}
	public void setDesdeBus(int desde_bus) {
		this.desde_bus = desde_bus;
	}
	
	
	public int getFecha_bus() {
		return fecha_bus;
	}
	public void setFecha_bus(int fecha_bus) {
		this.fecha_bus = fecha_bus;
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
	
	
	public int getExiste() {
		return existe;
	}
	public void setExiste(int existe) {
		this.existe = existe;
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

	public String getHorariox() {
		return horariox;
	}

	public void setHorariox(String horariox) {
		this.horariox = horariox;
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

	public String getConsulta1() {
		return consulta1;
	}

	public void setConsulta1(String consulta1) {
		this.consulta1 = consulta1;
	}

	public String getConsulta2() {
		return consulta2;
	}

	public void setConsulta2(String consulta2) {
		this.consulta2 = consulta2;
	}

	public String getConsulta3() {
		return consulta3;
	}

	public void setConsulta3(String consulta3) {
		this.consulta3 = consulta3;
	}

	public String getConsulta4() {
		return consulta4;
	}

	public void setConsulta4(String consulta4) {
		this.consulta4 = consulta4;
	}

	public String getConsulta5() {
		return consulta5;
	}

	public void setConsulta5(String consulta5) {
		this.consulta5 = consulta5;
	}

	public int getInc() {
		return inc;
	}

	public void setInc(int inc) {
		this.inc = inc;
	}

	public String getConsulta() {
		return consulta;
	}

	public void setConsulta(String consulta) {
		this.consulta = consulta;
	}

	public String[] getArregloConsulta() {
		return arregloConsulta;
	}

	public void setArregloConsulta(String arregloConsulta[]) {
		this.arregloConsulta = arregloConsulta;
	}

	public String[] getArregloConsulta2() {
		return arregloConsulta2;
	}

	public void setArregloConsulta2(String arregloConsulta2[]) {
		this.arregloConsulta2 = arregloConsulta2;
	}
	
	
}
