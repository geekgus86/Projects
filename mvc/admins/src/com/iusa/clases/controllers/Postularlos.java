package com.iusa.clases.controllers;

import com.opensymphony.xwork2.ActionSupport;


public class Postularlos extends  ActionSupport{
	
	private String idVacante;
	
	
	
	public String execute(){
		
		if(idVacante == null){
			
		}else{
			
		}
		
		return SUCCESS;
	}



	public String getIdVacante() {
		return idVacante;
	}



	public void setIdVacante(String idVacante) {
		this.idVacante = idVacante;
	}

}
