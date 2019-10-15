package com.sidiAlumno.general.exception;

import com.sidiAlumno.general.ConstantesSiDI;

public class BusinessSessionException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BusinessSessionException() {
		super(ConstantesSiDI.MENSAJE_GENERICO_BUSSINES_SESSION_EXCEPTION);
	}
	
	public BusinessSessionException(String message) {
		super(message);
	}
	
	public BusinessSessionException(Throwable cause) {
		super(cause);
	}
	
	public BusinessSessionException(String message, Throwable cause) {
		super(message, cause);
	}

}
