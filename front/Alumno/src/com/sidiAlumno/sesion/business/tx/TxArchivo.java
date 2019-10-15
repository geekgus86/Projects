package com.sidiAlumno.sesion.business.tx;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.Archivo;
import com.sidiAlumno.sesion.ManagerConections;

public class TxArchivo {
	
	private static String qryArchivo = "SELECT DISTINCT CODIGO_CAMPUS,PERIODO,NOMBRE,COLUMNA_2 FROM ARCHIVO WHERE COLUMNA_1 = ? AND COLUMNA_2 = ?  AND CODIGO_CAMPUS = ? AND PERIODO = ? AND NOMBRE= 'PREINSCRITO' ";

public Archivo getObtenerDatosArchivo(String matricula,String periodo,String campus,String codigo_nivel){
		
		Archivo resArchivo = new Archivo();
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		int cont = 0;
		
		try {
			pstm = conSidi.prepareStatement(qryArchivo);
			pstm.setString(1, codigo_nivel);
			pstm.setString(2, matricula);
			pstm.setString(3, campus);
			pstm.setString(4, periodo);

			resultadoQ = pstm.executeQuery();
			
			while(resultadoQ.next())
			{
				resArchivo.setCodigoCampus(resultadoQ.getString(1));
				resArchivo.setPeriodo(resultadoQ.getString(2));
				resArchivo.setNombre(resultadoQ.getString(3));
				resArchivo.setMatricula(resultadoQ.getString(4));
				cont+=1;
				resArchivo.setNumRegistro(cont);
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
		
		return resArchivo;
		
		
	}
}
