package com.sidiAlumno.general.validaStatus;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

public class EstatusProcesoInscripcion {
	
	public ResultadoEstatusProcesoInscripcion estatusInscripcionBanner(long nPidm,
																	   String periodo,
																	   Connection unaConexion) {
		ResultadoEstatusProcesoInscripcion unResultado = new ResultadoEstatusProcesoInscripcion();
		
		CallableStatement cstmt = null;
		
		try {			
			
			cstmt = unaConexion.prepareCall("{? = call SIDIVALIDAHOLDS_ITESM.fn_ConsultaEstatusInscrBanner(?,?,?)}");
			
			cstmt.registerOutParameter(1, Types.VARCHAR);
			
			cstmt.setLong  (2, nPidm);
			cstmt.setString(3, periodo);
			
			cstmt.registerOutParameter(4, Types.VARCHAR);
		
			cstmt.execute();
			
			String resultado = cstmt.getString(1);
			
			if (resultado.equals("@")) {
				
				unResultado.setEstatusProcesoInscripcion(ResultadoEstatusProcesoInscripcion.C_ESTATUS_PROCESO_INSCRIPCION_NO_TIENE_ESTATUS);
				unResultado.setDescripcionEstatusProcesoInscripcion("No se encontró información de estatus de inscripción en Banner para este alumno");
				return unResultado;
			}
			
			
			unResultado.setEstatusProcesoInscripcion(cstmt.getString(4));
			unResultado.setDescripcionEstatusProcesoInscripcion(ResultadoEstatusProcesoInscripcion.C_ESTATUS_PROCESO_INSCRIPCION_MSG_EXITOSO);
		
			return unResultado;
			
		} catch (Exception e) {
			System.err.println(nPidm+"|"+periodo+"|EstatusProcesoInscripcion.estatusInscripcionBanner:" + e.toString());
			
			unResultado.setEstatusProcesoInscripcion(ResultadoEstatusProcesoInscripcion.C_ESTATUS_PROCESO_INSCRIPCION_ERROR);
			unResultado.setDescripcionEstatusProcesoInscripcion(ResultadoEstatusProcesoInscripcion.C_ESTATUS_PROCESO_INSCRIPCION_MSG_ERROR+":"+e.toString());
			
			return unResultado;
			
		} finally {					
			
			try {
				if (cstmt != null) {
					cstmt.close();
				}
			} catch (SQLException e) {
				System.err.println(nPidm+"|"+periodo+"|EstatusProcesoInscripcion.estatusInscripcionBanner:" + e.toString());
			}
		}
	}
	
	public ResultadoValidaHold validaHold(long nPidm,
			                              Connection unaConexion) {
		
		ResultadoValidaHold unResultado = new ResultadoValidaHold();
				
		CallableStatement cstmt = null;
		
		try {			
			
			cstmt = unaConexion.prepareCall("{? = call SIDIVALIDAHOLDS_ITESM.fn_ValidaHold(?,?,?,?,?,?)}");
			
			cstmt.registerOutParameter(1, Types.VARCHAR);
			
			cstmt.setLong  (2, nPidm);
			
			cstmt.registerOutParameter(3, Types.VARCHAR);
			cstmt.registerOutParameter(4, Types.VARCHAR);
			
			cstmt.registerOutParameter(5, Types.VARCHAR);
			cstmt.registerOutParameter(6, Types.VARCHAR);
			cstmt.registerOutParameter(7, Types.VARCHAR);
		
			cstmt.execute();
			
			String resultado = cstmt.getString(1);
			
			if (resultado.equals("@")) {
				unResultado.setIndicadorHoldRegistrado(ResultadoValidaHold.C_IND_NO_BLOQUEADO);
				
				unResultado.setEstatusValidaHOld(ResultadoValidaHold.C_RESULTADO_OPERACION_VALIDA_HOLD_EXITOSA);
				
				unResultado.setDescripcionResultadoValidarHold(ResultadoValidaHold.C_RESULTADO_VALIDA_HOLD_MSG_EXITOSO+":no existe bloqueo para el alumno");
				return unResultado;
			}
			
			unResultado.setFechaInicioValidezHold(cstmt.getString(3));
			unResultado.setFechaFinValidezHold(cstmt.getString(4));
			
			unResultado.setIndicadorHoldRegistrado(cstmt.getString(5));
			
			unResultado.setCodigoHold( cstmt.getString(6) );
			
			unResultado.setDescripcionHold (cstmt.getString(7) );
			
			unResultado.setDescripcionResultadoValidarHold(ResultadoValidaHold.C_RESULTADO_VALIDA_HOLD_MSG_EXITOSO);
			
			unResultado.setEstatusValidaHOld(ResultadoValidaHold.C_RESULTADO_OPERACION_VALIDA_HOLD_EXITOSA);
			
			return unResultado;
			
		} catch (Exception e) {
			System.err.println(nPidm+"|"+"EstatusProcesoInscripcion.validaHold:" + e.toString());
			
			unResultado.setDescripcionResultadoValidarHold(ResultadoValidaHold.C_RESULTADO_VALIDA_HOLD_MSG_ERROR+":"+ e.toString());
			
			unResultado.setEstatusValidaHOld(ResultadoValidaHold.C_RESULTADO_OPERACION_VALIDA_HOLD_ERROR);
			
			return unResultado;
			
		} finally {					
			
			try {
				if (cstmt != null) {
					cstmt.close();
				}
			} catch (SQLException e) {
				System.err.println(nPidm+"|"+"EstatusProcesoInscripcion.validaHold:" + e.toString());
			}
		}
	}
}