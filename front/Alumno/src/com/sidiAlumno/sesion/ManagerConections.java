package com.sidiAlumno.sesion;

import java.sql.Connection;

import com.sidiAlumno.general.exception.BusinessSessionException;

public class ManagerConections {

	private static Connection sidiConection;
	private static Connection pcConection;
	private static Connection bannerConection;
	
	static {
		try {
			sidiConection = DataSourceConections.getConexionPoolSIDI();
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
		
		try {
			setPcConection(DataSourceConections.getConexionPoolPC());
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
		
	    try {
			bannerConection = DataSourceConections.getConexionPoolBanner();
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
	}

	public static Connection getBannerConection() {
		try {
			bannerConection = DataSourceConections.getConexionPoolBanner();
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
		
		
		return bannerConection;
	}

	public static void setBannerConection(Connection bannerConection) {
		ManagerConections.bannerConection = bannerConection;
	}
	
	public static Connection getSidiConection() {
		try {
			sidiConection = DataSourceConections.getConexionPoolSIDI();
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
		return sidiConection;
	}

	public static void setSidiConection(Connection sidiConection) {
		ManagerConections.sidiConection = sidiConection;
	}

	public static Connection getPcConection() {
		try {
			pcConection = DataSourceConections.getConexionPoolPC();
		} catch (BusinessSessionException e) {
			e.printStackTrace();
		}
		return pcConection;
	}

	public static void setPcConection(Connection pcConection) {
		ManagerConections.pcConection = pcConection;
	}
	
}
