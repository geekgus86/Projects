package com.sidiAlumno.sesion.business;

import java.io.Serializable;

import com.sidiAlumno.general.exception.BusinessSessionException;

public interface TransaccionBasica {
	
	public Serializable ejecutaTransaccion() throws BusinessSessionException;

}
