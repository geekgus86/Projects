package com.sidiAlumno.sesion.business.tx;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.ConfigPreins;
import com.sidiAlumno.general.PagoCveServicio;
import com.sidiAlumno.sesion.ManagerConections;

public class TxPagoCveServicio {
	
	private static String qry = "SELECT CVE_SERVICIO FROM PAGO_CLAVE_SERVICIO WHERE CODIGO_CAMPUS = ? AND CODIGO_NIVEL = ?";
	
	public String getCveServicio(String campus, String codigoNivel){
		
		PagoCveServicio pagoCveServicio = new PagoCveServicio();
		
		Connection conSidi= ManagerConections.getSidiConection();
		
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		boolean existeCveServicio=false;
		
		try {
			pstm = conSidi.prepareStatement(qry);
			pstm.setString(1, campus);
			pstm.setString(2, codigoNivel);

			resultadoQ = pstm.executeQuery();
			
			while(resultadoQ.next())
			{
				pagoCveServicio.setCveServicio(resultadoQ.getString(1));
				existeCveServicio=true;
			}
			
		} catch (SQLException e) {
			System.out.println(" Error: No se pudo consultar información de la clave de servicio (pago) para el campus: "
					+ campus + ", nivel: " + codigoNivel);
			e.printStackTrace();
			return "32";
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
			System.out.println(" Error: No se pudo obtener una conexión para obtener la clave de servicio (pago) para el campus: "
						+ campus + ", nivel: " + codigoNivel);
			e.printStackTrace();
		}

	}
	
	if(existeCveServicio)
		return pagoCveServicio.getCveServicio();
	
	return "32";
		
	}

}
