package mx.itesm.externos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import mx.itesm.externos.model.Log;
public class LogDAO {
	
	private static String insert="insert into log(clave_usuario,tipo_de_movimiento,evidencia,estatus_operacion,f_fecha_de_movimiento) "
			+ "values(?,?,?,?,NOW())";
	
	
	
	public int insertaLog(Log log)
	{
		Conexion conexion = new Conexion();
		Connection con= conexion.getConexionPoolExternos();
		PreparedStatement pstm = null;
		ResultSet resultadoQ = null;
		try{
			pstm = con.prepareStatement(insert);
			pstm.setString(1, log.getClave_usuario());
			pstm.setString(2, log.getTipo_de_moviento());
			pstm.setString(3,log.getEvidencia());
			pstm.setString(4, log.getEstatus_operacion());
		
			
			return pstm.executeUpdate();
		}catch(Exception ex){ex.printStackTrace(); return 0;}
		
	}

}
