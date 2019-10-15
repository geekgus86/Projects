package com.iusa.clases.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class ListaCuentaRapida extends ActionSupport {
	
	
	private List<String>dias;
    private List<String>anio;
    private Map<Integer,String>meses;
    
    private String user;
	private int existe;
    
    
    public String execute(){
    	
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
    	
    	
    	return SUCCESS;
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




	public String getUser() {
		return user;
	}




	public void setUser(String user) {
		this.user = user;
	}




	public int getExiste() {
		return existe;
	}




	public void setExiste(int existe) {
		this.existe = existe;
	}
	

}
