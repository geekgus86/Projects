package com.sidiAlumno.sesion.business.tx;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.PeriodoServicio;
import com.sidiAlumno.sesion.ManagerConections;

public class TxPerServ {
	
	private static String qryArchivo = "SELECT DISTINCT CLAVE_PERIODO_SERVICIO,ESTATUS FROM PERIODO_SERVICIO WHERE CODIGO_CAMPUS = ? AND PERIODO = ? ";

public PeriodoServicio getObtenerDatosPerServ(String periodo,String codigo_nivel){
		
		PeriodoServicio resPerSer = new PeriodoServicio();
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		
		try {
			pstm = conSidi.prepareStatement(qryArchivo);
			pstm.setString(1, codigo_nivel);
			pstm.setString(2, periodo);

			resultadoQ = pstm.executeQuery();
			
			while(resultadoQ.next())
			{
				resPerSer.setClave_periodo_servicio(Integer.parseInt(resultadoQ.getString(1)));
				resPerSer.setEstatus(resultadoQ.getString(2));
			}
			
		} catch (SQLException e) {

			System.out.println("Error en TxPerServ se reporto lo siguiente: "+e.toString());
			return null;
	}
	finally {
		try {
			if (pstm != null) {
				pstm.close();
			}
			if (resultadoQ != null) {
				resultadoQ.close();
			}
		} catch (SQLException e) {
			System.out.println("Error en TxPerServ se reporto lo siguiente: "+e.toString());
		}

	}
		
		return resPerSer;
		
		
	}
}
