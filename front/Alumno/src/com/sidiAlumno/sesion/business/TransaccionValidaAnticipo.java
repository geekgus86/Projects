package com.sidiAlumno.sesion.business;





import java.sql.Date;

import com.sidiAlumno.general.exception.BusinessSessionException;

public interface TransaccionValidaAnticipo {
	public String consultaCuotaColegiatura(String codigoCampus, String periodo) throws BusinessSessionException;
	public Date consultaFechaAnticipo(String codigoCampus, String periodo, String nivel) throws BusinessSessionException;
	
}


