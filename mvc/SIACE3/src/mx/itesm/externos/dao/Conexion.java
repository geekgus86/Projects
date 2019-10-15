package mx.itesm.externos.dao;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.util.Date;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
public class Conexion {

	
	public  Connection getConexionPoolExternos()
	{
		Connection con = null;
		String jndi_ext = "java:jboss/MySqlDS";
		try {
            Context initContext = new InitialContext();
            DataSource ds = (DataSource) initContext.lookup(jndi_ext);
            con = ds.getConnection();
         return con;
   		
		}catch(Exception ex){ex.printStackTrace(); return null;}
	
	}
	
	
	public  Connection getConexionPoolMDM()
	{
		Connection con = null;
		String jndi_mdm = "java:jboss/datasource/mdmDS";
		
		try {
            Context initContext = new InitialContext();
            DataSource ds = (DataSource) initContext.lookup(jndi_mdm);
            con = ds.getConnection();
         return con;
   		
		}catch(Exception ex){ex.printStackTrace(); return null;}	
			
	}
}
