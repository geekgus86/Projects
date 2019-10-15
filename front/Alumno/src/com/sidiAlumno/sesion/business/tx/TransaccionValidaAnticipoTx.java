package com.sidiAlumno.sesion.business.tx;


import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.ManagerConections;
import com.sidiAlumno.sesion.business.TransaccionValidaAnticipo;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class TransaccionValidaAnticipoTx implements TransaccionValidaAnticipo{
	
	private String codigoCampus;
	private String periodo;
	PreparedStatement pstm = null;
	ResultSet resultadoQ = null;
	
	
	
	private static String qryCuotaColegiatura = "select IMPTE_COLEGIATURA from CUOTA_ADELANTO_COLEGIATURA \n"
			+ "where CODIGO_CAMPUS = ? \n" + "  and periodo = ? \n  and rownum < 2";
			
	
	private static String qryFechaAnticipo = "SELECT F_FECHA_VENC_ANTICIPO FROM CONFIGURACION_REGISTRO_ADM \n"
			+ "where CODIGO_CAMPUS = ? \n" + "  and periodo = ? \n" + " and codigo_nivel = ? \n" +  " and b_con_anticipo = 1 and rownum < 2";
	

		
	
	@Override
	public String consultaCuotaColegiatura(String codigoCampus, String periodo) throws BusinessSessionException {
		
		this.codigoCampus = codigoCampus;
		this.periodo = periodo;
		String cuotaColegiatura = "";
		
		Connection connSidi = ManagerConections.getSidiConection();
		try {
			pstm = connSidi.prepareStatement(qryCuotaColegiatura);
			pstm.setString(1, codigoCampus);
			pstm.setString(2, periodo);
			
			resultadoQ = pstm.executeQuery();
			
			if (resultadoQ.next()) {

				if (resultadoQ.getString("IMPTE_COLEGIATURA") != null) {
					cuotaColegiatura =  resultadoQ.getString("IMPTE_COLEGIATURA");
				}
			}	

			return cuotaColegiatura;

		} catch (SQLException e) {
			
			e.printStackTrace();
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
//				e.printStackTrace();
			}

		}
		
		
		return null;
	}
	
	

	@Override
	public Date consultaFechaAnticipo(String codigoCampus, String periodo,
			String nivel) throws BusinessSessionException {
		this.codigoCampus = codigoCampus;
		this.periodo = periodo;
		Date fechaAnticipo = null;

		// Obtenemos conexión

		Connection connSidi = ManagerConections.getSidiConection();
		try {
			pstm = connSidi.prepareStatement(qryFechaAnticipo);
			pstm.setString(1, codigoCampus);
			pstm.setString(2, periodo);
			pstm.setString(3, nivel);

			resultadoQ = pstm.executeQuery();

			if (resultadoQ.next()) {

				if (resultadoQ.getString("F_FECHA_VENC_ANTICIPO") != null) {
					fechaAnticipo = resultadoQ.getDate("F_FECHA_VENC_ANTICIPO");
				}
			}

			return fechaAnticipo;

		} catch (SQLException e) {

			e.printStackTrace();
		} finally {
			try {
				if (pstm != null) {
					pstm.close();
				}
				if (resultadoQ != null) {
					resultadoQ.close();
				}
			} catch (SQLException e) {
				// e.printStackTrace();
			}

		}

		return null;
	}
	
	
	public String getCodigoCampus() {
		return codigoCampus;
	}
	public void setCodigoCampus(String codigoCampus) {
		this.codigoCampus = codigoCampus;
	}
	public String getPeriodo() {
		return periodo;
	}
	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}
	
	public boolean validaAdeudo(){
		return true;
	}
	
	
	
	
}
