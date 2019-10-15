package com.sidiAlumno.sesion.business.tx;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.Alumno;
import com.sidiAlumno.general.Archivo;
import com.sidiAlumno.general.RespuestaGestor;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.ManagerConections;
import com.sidiAlumno.sesion.business.TransaccionAlumno;
public class TxAlumno implements TransaccionAlumno {

	private static String qryAlumno = "SELECT distinct ALUMNO.MATRICULA, \n"+
										 "ALUMNO.CODIGO_CAMPUS, ALUMNO.PERIODO,ALUMNO.N_PIDM,ALUMNO.CODIGO_CARRERA,ALUMNO.CODIGO_ADMISION, \n"	
										+ "ALUMNO.NOMBRE_PROPIO,ALUMNO.A_PATERNO,ALUMNO.A_MATERNO,to_char(ALUMNO.F_FECHA_NACIMIENTO_ALUMNO,'mm/dd/yyyy'), \n" 
										+ "campus.nombre_campus,carrera.nombre,ALUMNO.CONCENTRACION,ALUMNO.CODIGO_NIVEL,ALUMNO.MINOR, \n"
										+ "correos_alumno.cuenta_academica, ALUMNO.B_ETAPA_INSCRIPCION, ALUMNO.B_INSCRITO_EN_BANNER FROM ALUMNO \n"
										+" inner join CAMPUS ON ALUMNO.CODIGO_CAMPUS = campus.codigo_campus \n"
						                +  "INNER JOIN carrera ON alumno.codigo_carrera = carrera.codigo_carrera  \n"
										+  "Inner join correos_alumno on alumno.MATRICULA = correos_alumno.matricula \n"
										+  "and alumno.codigo_campus=carrera.codigo_campus and alumno.periodo = carrera.periodo \n"
										+  "WHERE ALUMNO.MATRICULA = ? \n" + "  AND ALUMNO.CODIGO_CAMPUS = ? \n"
										+  "  AND ALUMNO.PERIODO = ?";
	
	@Override
	public Alumno getDatosAlumno(String matricula,String periodo,String campus)throws BusinessSessionException
	{
		Alumno alumno = new Alumno();
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		
		try {
			pstm = conSidi.prepareStatement(qryAlumno);
			pstm.setString(1, matricula);
			pstm.setString(2, campus);
			pstm.setString(3, periodo);

			resultadoQ = pstm.executeQuery();
			
			while(resultadoQ.next())
			{
				alumno.setMatricula(resultadoQ.getString(1));
				alumno.setCod_campus(resultadoQ.getString(2));
				alumno.setPeriodo(resultadoQ.getString(3));
				alumno.setPidem(resultadoQ.getString(4));
				alumno.setCod_carrera(resultadoQ.getString(5));
				alumno.setCod_adminision(resultadoQ.getString(6));
				alumno.setNombre(resultadoQ.getString(7));
				alumno.setaPaterno(resultadoQ.getString(8));
				alumno.setaMaterno(resultadoQ.getString(9));
				alumno.setFechaNacimiento(resultadoQ.getString(10));
				alumno.setCampus(resultadoQ.getString(11));
				alumno.setCarrera(resultadoQ.getString(12));
				alumno.setConcentracion(resultadoQ.getString(13));
				alumno.setCod_nivel(resultadoQ.getString(14));
				alumno.setModalidad(resultadoQ.getString(15));
				alumno.setCorreo(resultadoQ.getString(16));
				alumno.setEtapa_inscripcion(resultadoQ.getInt(17)==1);
				alumno.setInscrito_en_Banner(resultadoQ.getInt(18)==1);
				
				String descPeriodo = recuperaDescPeriodo(alumno.getCod_campus(), alumno.getPeriodo());
				alumno.setPeriodoDesc(descPeriodo == null ? "S/D" : descPeriodo);
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
//				e.printStackTrace();
			}

		}

		return alumno;
	}

	
	private String recuperaDescPeriodo(String campus, String periodo) {
		String qry =
				"select DESCRIPCION_PERIODO from DATOS_CONF_SIDI \n"
					+ " where CODIGO_CAMPUS= ?  and \n"
					+ "      PERIODO =     ?";
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		
		try {
			pstm = conSidi.prepareStatement(qry);
			pstm.setString(1, campus);
			pstm.setString(2, periodo);

			resultadoQ = pstm.executeQuery();
			
			while (resultadoQ.next()) {
				return resultadoQ.getString("DESCRIPCION_PERIODO");
			}
		} catch (Exception e) {
			// TODO: handle exception
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
	public boolean getHolds(String matricula, String campus, String periodo)
			throws BusinessSessionException {
		
		Connection conBanner = ManagerConections.getBannerConection();
		
		try{
			
			CallableStatement storedProc = conBanner.prepareCall("{call SOAREGRESOSIDI_ITESM.REGISTRAR_INSCRIPCION(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			/*storedProc.setString(1,alumno.getMatricula());
			storedProc.setInt(2,alumno.getN_pidm());
			storedProc.setString(3,alumno.getCampus());
			storedProc.setString(4,alumno.getPeriodo());
			storedProc.setString(5,alumno.getNivel());
			storedProc.setString(6,alumno.getCursosAlumno().get(i).getSub_code());
			storedProc.setString(7,alumno.getCursosAlumno().get(i).getCrse_num());
			storedProc.setString(8,alumno.getCursosAlumno().get(i).getSeq_num());
    		storedProc.setString(9,alumno.getF_fecha_inscripcion());
			storedProc.setString(10,"RE");
			storedProc.setString(11,"A");
			storedProc.setString(12,alumno.getUds_academicas());
			storedProc.setString(13,alumno.getUds_administrativas());
			storedProc.registerOutParameter(14, java.sql.Types.VARCHAR);
			storedProc.execute();*/
		}
		catch(SQLException e) {
			e.printStackTrace();
			return true;
			
		}
		finally {
		}
		return false;
		
	}
	
	
	
}
