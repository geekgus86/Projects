package com.sidiAlumno.sesion.business.tx;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.ConfigPreins;
import com.sidiAlumno.sesion.ManagerConections;

public class TxConfPreinscripcion {
	
	private static String qryPreIns = "SELECT CODIGO_CAMPUS, PERIODO, CODIGO_NIVEL,"
				+ "N_MONTO_ANTICIPO_COLEG,"
				+ "F_FECHA_INICIO_CAMPUS, F_FECHA_VENC_CAMPUS,"
				+ "B_CONFIG_HORARIO,"
				+ "F_FECHA_DE_MOVIMIENTO FROM CONFIGURACION_PREINSCRIPCION WHERE CODIGO_NIVEL = ?  AND CODIGO_CAMPUS = ? AND PERIODO = ? ";
	
	public ConfigPreins getConfPreins(String codigoNivel,String periodo,String campus){
		
		ConfigPreins confPre = new ConfigPreins();
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		
		try {
			pstm = conSidi.prepareStatement(qryPreIns);
			pstm.setString(1, codigoNivel);
			pstm.setString(2, campus);
			pstm.setString(3, periodo);

			resultadoQ = pstm.executeQuery();
			
			while(resultadoQ.next())
			{
				confPre.setCodigoCampus(resultadoQ.getString(1));
				confPre.setPeriodo(resultadoQ.getString(2));
				confPre.setCodigoNivel(resultadoQ.getString(3));
				confPre.setMontoAnticipoColeg(Double.parseDouble(resultadoQ.getString(4)));
				confPre.setFechaInicioCampus(resultadoQ.getString(5));
				confPre.setFechaVencCampus(resultadoQ.getString(6));
				confPre.setConfigHorario((Integer.parseInt(resultadoQ.getString(7))==1)?true:false);
				confPre.setFechaDeMovimiento(resultadoQ.getString(5));
			}
			
		} catch (SQLException e) {

			e.printStackTrace();
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
			e.printStackTrace();
		}

	}
		
	return confPre;
		
	}

}
