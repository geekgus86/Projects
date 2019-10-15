package com.iusa.clases.interceptor;

import com.iusa.clases.controllers.CerrarSesion;

public class CaracterNoValidoException extends Exception {

	public CaracterNoValidoException() {
		CerrarSesion saliendo = new CerrarSesion();
		saliendo.execute();
	 }
	
}
