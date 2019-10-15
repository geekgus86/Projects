package com.sidiAlumno.sesion.business;


import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.general.Alumno;
public interface TransaccionAlumno {
	
	public Alumno getDatosAlumno(String matricula,String periodo,String campus)throws BusinessSessionException;
	
	public boolean  getHolds(String matricula,String campus,String periodo) throws BusinessSessionException;
}
