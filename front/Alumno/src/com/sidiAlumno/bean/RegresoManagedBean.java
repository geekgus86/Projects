package com.sidiAlumno.bean;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
//import javax.faces.context.FacesContext;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpSession;

@ManagedBean(name = "RegresoMB")
@SessionScoped
public class RegresoManagedBean 
{
	private String matricula;
	private String nombre;
	private String campus;
	private String tipoMoneda;
	private String folioTienda;
	private String descFormaPago;
	private String tipoTransaccion;
	private String estatus;
	private String montoInicial;
	private String cantidad;
	private String cveTienda;
	private String servicio;
	private String pedido;
	private String cveFormaPago;
	private String q;
	
	
	public String recibeParametros() {
//    TODO BXTL ¿Que debe hacer este MB y este metodo?
//		HttpServletRequest request = (HttpServletRequest) FacesContext
//				.getCurrentInstance().getExternalContext().getRequest();
//
//		HttpSession session = null;
		
		


		return null;
	}


	public String getMatricula() {
		return matricula;
	}


	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getCampus() {
		return campus;
	}


	public void setCampus(String campus) {
		this.campus = campus;
	}


	public String getTipoMoneda() {
		return tipoMoneda;
	}


	public void setTipoMoneda(String tipoMoneda) {
		this.tipoMoneda = tipoMoneda;
	}


	public String getFolioTienda() {
		return folioTienda;
	}


	public void setFolioTienda(String folioTienda) {
		this.folioTienda = folioTienda;
	}


	public String getDescFormaPago() {
		return descFormaPago;
	}


	public void setDescFormaPago(String descFormaPago) {
		this.descFormaPago = descFormaPago;
	}


	public String getTipoTransaccion() {
		return tipoTransaccion;
	}


	public void setTipoTransaccion(String tipoTransaccion) {
		this.tipoTransaccion = tipoTransaccion;
	}


	public String getEstatus() {
		return estatus;
	}


	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}


	public String getMontoInicial() {
		return montoInicial;
	}


	public void setMontoInicial(String montoInicial) {
		this.montoInicial = montoInicial;
	}


	public String getCantidad() {
		return cantidad;
	}


	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}


	public String getCveTienda() {
		return cveTienda;
	}


	public void setCveTienda(String cveTienda) {
		this.cveTienda = cveTienda;
	}


	public String getServicio() {
		return servicio;
	}


	public void setServicio(String servicio) {
		this.servicio = servicio;
	}


	public String getPedido() {
		return pedido;
	}


	public void setPedido(String pedido) {
		this.pedido = pedido;
	}


	public String getCveFormaPago() {
		return cveFormaPago;
	}


	public void setCveFormaPago(String cveFormaPago) {
		this.cveFormaPago = cveFormaPago;
	}


	public String getQ() {
		return q;
	}


	public void setQ(String q) {
		this.q = q;
	}
	
	

	
}
