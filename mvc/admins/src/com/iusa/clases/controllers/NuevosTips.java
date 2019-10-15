package com.iusa.clases.controllers;

import java.math.BigDecimal;

import com.opensymphony.xwork2.ActionSupport;

public class NuevosTips extends ActionSupport{

	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	
	public String execute(){
		
		
		
		
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
		
		return SUCCESS;
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
	
	
}
