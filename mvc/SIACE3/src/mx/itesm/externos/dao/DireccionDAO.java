package mx.itesm.externos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import mx.itesm.externos.model.Direccion;


public class DireccionDAO {

	private static final String insert = "insert into DIRECCION (calle,colonia,numero_interior,numero_exterior,codigo_postal,pais,estado,"
			+ "ciudad,municio_delegacion,id_sucursal,id_persona_moral,id_persona_fisica,institucion,F_FECHA_DE_MOVIMIENTO) values (?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate)";

	
	public int InsertaDireccion(Direccion dir,Conexion con)
	{
		int registro = 0;
		PreparedStatement Enunciado=null;
		try{
		Connection mdm = con.getConexionPoolMDM();
		mdm.setAutoCommit(true);
		Enunciado = mdm.prepareStatement(insert);
		Enunciado.setString(1, dir.getCalle());
		Enunciado.setString(2, dir.getColonia());
		Enunciado.setString(3, dir.getNum_int());
		Enunciado.setString(4, dir.getNum_ext());
		Enunciado.setInt(5, dir.getC_postal());
		Enunciado.setString(6, dir.getPais());
		Enunciado.setString(7, dir.getEstado());
		Enunciado.setString(8, dir.getCiudad());
		Enunciado.setString(9, dir.getMunicipio());
		Enunciado.setString(10, dir.getIdSucursal());
		Enunciado.setString(11, dir.getPersonaMorales().getId());
		Enunciado.setString(12, dir.getPersnonaFisica().getId());
		Enunciado.setString(13, dir.getPersnonaFisica().getInstitucion());
		
		  registro = Enunciado.executeUpdate();
		
		  
		
		}catch(SQLException ex){ex.printStackTrace(); return 0;}
		
		return registro;
		
	}
	
	
	
	
}
