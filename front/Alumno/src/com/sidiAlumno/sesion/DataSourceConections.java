package com.sidiAlumno.sesion;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.sidiAlumno.general.ConstantesSiDI;
import com.sidiAlumno.general.exception.BusinessSessionException;


public class DataSourceConections {
	
	private static Connection sidiConection;
	private static Connection pcConection;
	private static Connection bannerConection;
	
	public static Connection getConexionPoolBanner()
			throws BusinessSessionException {

		try {
			if (bannerConection != null && !bannerConection.isClosed()) {
				return bannerConection;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		String jndi = ConstantesSiDI.JNDI_BANNER;

		try {
			Context initContext = new InitialContext();
			DataSource ds = (DataSource) initContext.lookup(jndi);
			bannerConection = ds.getConnection();
			return bannerConection;
		} catch (Exception ex) {
			throw new BusinessSessionException("Error al consumir DataSource BANNER", ex);
		}
	}
	
	public static Connection getConexionPoolSIDI()
			throws BusinessSessionException {

		// System.out.println("VALOR SIDICONECTION " + sidiConection);

		// if(sidiConection != null){
		// try {
		// System.out.println("IS VALID " + sidiConection.isValid(0));
		// System.out.println("IS CLOSED " + sidiConection.isClosed());
		// System.out.println("IS READY ONLY " + sidiConection.isReadOnly());
		// System.out.println("GET CLIENT INFO " +
		// sidiConection.getClientInfo());
		// } catch (SQLException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// }

		try {
			if (sidiConection != null && !sidiConection.isClosed()) {
				// System.out.println("REGRESA CONEXION " + sidiConection);
				return sidiConection;
			}
		} catch (SQLException e) {
			System.out.println("ENTRA A EXCEPCION SQL ");
//			TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("INTENTA OBTENER NUEVA CONEXION");

		String jndi = ConstantesSiDI.JNDI_CIDI;

		try {
			Context initContext = new InitialContext();
			DataSource ds = (DataSource) initContext.lookup(jndi);
			sidiConection = ds.getConnection();
			System.out.println("NUEVA CONEXION " + sidiConection);
			return sidiConection;
		} catch (Exception ex) {
			System.out.println("ERROR AL CONSUMIR DATASOURCE ");
			throw new BusinessSessionException(
					"Error al consumir DataSoruce SIDI", ex);
		}
	}
	
	public static Connection getConexionPoolPC() throws BusinessSessionException {

		try {
			if (pcConection != null && !pcConection.isClosed()) {
				return pcConection;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		String jndi = ConstantesSiDI.JNDI_PC;

		try {
			Context initContext = new InitialContext();
			DataSource ds = (DataSource) initContext.lookup(jndi);
			pcConection = ds.getConnection();
			return pcConection;
		} catch (Exception ex) {
			throw new BusinessSessionException("Error al consumir DataSource BANNER", ex);
		}
	}

}
