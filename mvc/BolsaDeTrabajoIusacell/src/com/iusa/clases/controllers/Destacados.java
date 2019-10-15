package com.iusa.clases.controllers;



import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;




import org.apache.struts2.ServletActionContext;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;


public class Destacados extends ActionSupport {
	

	protected List<String> vacantesDestacadosOro;
	protected List<String> vacantesDestacadosOro2;
	protected List<String> vacantesDestacadosOro3;
	protected String folioG;
	protected String areaG;
	protected String ubicacionG;	
	private int existe;
	private String user;
	private List<String>dias;
    private List<String>anio;
    private Map<Integer,String>meses;
    
    private LinkedHashMap<String, Object> jsonDataDPS = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	Session session=HibernateUtil.getSessionFactory().getCurrentSession();	
	
	public String giveMe() {
		
	
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
       
        
        
        Transaction tr = session.beginTransaction();
        try{
        	
        	 if(sesion!=null){
             	this.user=escapeChars((String) sesion.getAttribute("usuario"));
     	    }
             
             
             if(user==null){
             	existe=0;
             }else{
             	existe=1;
             }
        	
			String sqlG ="SELECT \"vacante\".\"area_experiencia\", \"vacante\".\"ubicacion\", \"vacante\".\"folio\",  \"vacante\".\"nombre_vacante\" FROM \"vacante\" WHERE \"vacante\".\"destacado_nacional\" = 1 and not \"estado_vacante\"='Inactiva'";
			
			Query G = session.createSQLQuery(sqlG);
			
			G.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List dG = G.list();
			
			vacantesDestacadosOro = new ArrayList<String>();
			vacantesDestacadosOro2 = new ArrayList<String>();
			vacantesDestacadosOro3 = new ArrayList<String>();
			
			for (Object object : dG) {
		         Map row = (Map) object;
		         
		         HashMap<String, Object> itemMap = new HashMap<String, Object>();
		         
		         itemMap.put("folioG",(String) row.get("folio"));
		         itemMap.put("nombreG",(String) row.get("nombre_vacante"));
		         itemMap.put("ubicacionG",(String) row.get("ubicacion"));
		         itemMap.put("areaG",(String) row.get("area_experiencia"));
		         
		         items.add(itemMap);
		         	
		         	
		    }
			
			
			jsonDataDPS.put("items", items);
			
			tr.commit();
			llenarListas();
			
        }catch(Exception e){
        	
        	tr.commit();
        }
        
		return SUCCESS;
	}

	
	
	 public String escapeChars(String cadena)throws CaracterNoValidoException{

		   	String escapedString="";
		  if(cadena!=null){
		   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
		   		
		   		String reg = "[=;*|()%#!&?]";
		   		   
		       	escapedString= cadena.replaceAll(reg,"");
		   		
		   	}else{
		   		
		   		throw new CaracterNoValidoException();
		   		
		   	}
		  }
		   	
		   	
		   	return escapedString;
		   }
	
	public int getExiste() {
		return existe;
	}

	public void setExiste(int existe) {
		this.existe = existe;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	public List<String> getVacantesDestacadosOro() {
		return vacantesDestacadosOro;
	}
	
	public void setVacantesDestacados(List<String> vacantesDestacadosOro) {
		this.vacantesDestacadosOro = vacantesDestacadosOro;
	}
	
	public List<String> getVacantesDestacadosOro2() {
		return vacantesDestacadosOro2;
	}
	
	public void setVacantesDestacados2(List<String> vacantesDestacadosOro2) {
		this.vacantesDestacadosOro2 = vacantesDestacadosOro2;
	}
	
	public List<String> getVacantesDestacadosOro3() {
		return vacantesDestacadosOro3;
	}
	
	public void setVacantesDestacados3(List<String> vacantesDestacadosOro3) {
		this.vacantesDestacadosOro3 = vacantesDestacadosOro3;
	}



	 public void llenarListas(){
	    	
    	 this.dias=new ArrayList<String>();
         this.anio=new ArrayList<String>();
         this.meses=new TreeMap<Integer,String>();
         meses.put(1, "Enero");
         meses.put(2, "Febrero");
         meses.put(3, "Marzo");
         meses.put(4, "Abril");
         meses.put(5, "Mayo");
         meses.put(6, "Junio");
         meses.put(7, "Julio");
         meses.put(8, "Agosto");
         meses.put(9, "Septiembre");
         meses.put(10, "Octubre");
         meses.put(11, "Noviembre");
         meses.put(12, "Diciembre");
         
         String d;
         String m;
         String y;
         
         this.dias.add("Dia");

         this.anio.add("Año");
         
         for(int i=1;i<=31;i++){
        	 d=""+i;
        	 this.dias.add(d);
         }
                  
         for(int j=2012;j>=1900;j--){
        	 y=""+j;
        	 this.anio.add(y);
         }
    	
    	
    }



	public List<String> getDias() {
		return dias;
	}





	public void setDias(List<String> dias) {
		this.dias = dias;
	}





	public List<String> getAnio() {
		return anio;
	}





	public void setAnio(List<String> anio) {
		this.anio = anio;
	}





	public Map<Integer,String> getMeses() {
		return meses;
	}





	public void setMeses(Map<Integer,String> meses) {
		this.meses = meses;
	}





	public LinkedHashMap<String, Object> getJsonDataDPS() {
		return jsonDataDPS;
	}





	public void setJsonDataDPS(LinkedHashMap<String, Object> jsonDataDPS) {
		this.jsonDataDPS = jsonDataDPS;
	}





	public Set<Map<String, Object>> getItems() {
		return items;
	}





	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}
	
}
