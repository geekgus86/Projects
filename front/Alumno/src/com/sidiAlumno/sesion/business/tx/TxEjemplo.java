package com.sidiAlumno.sesion.business.tx;

import java.io.Serializable;

import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.business.TransaccionBasica;

public class TxEjemplo implements TransaccionBasica{

	private String parametro1;
	private String parametro2;
	
	/**
	 * 
	 * @param paramtro1 parámetro necesarios para la transaccion
	 * @param paramatro2 parámetro necesarios para la transaccion
	 */
	public TxEjemplo(String paramtro1, String paramatro2) {
		this.parametro1 = paramtro1;
		this.parametro2 = paramatro2;
	}

	@SuppressWarnings("unused")
	@Override
	public Serializable ejecutaTransaccion() throws BusinessSessionException {
		
		/*
		 * lógica de la transacción
		 * regresa resultado o resultados deseados
		 * si falla es recomendable lanzar una excepcion
		 */
		
		if(/*falla*/false) {
			throw new BusinessSessionException("Falla causada por Limon");
		}
		
		return null;
	}

	public String getParametro1() {
		return parametro1;
	}

	public void setParametro1(String parametro1) {
		this.parametro1 = parametro1;
	}

	public String getParametro2() {
		return parametro2;
	}

	public void setParametro2(String parametro2) {
		this.parametro2 = parametro2;
	}

}
