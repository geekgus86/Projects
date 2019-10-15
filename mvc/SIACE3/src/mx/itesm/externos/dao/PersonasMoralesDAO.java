package mx.itesm.externos.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import mx.itesm.externos.model.PersonasMorales;

public class PersonasMoralesDAO {
	
	/*
	 "ID"           VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"NOMBRE" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"R_SOCIAL" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"R_COMERCIAL" VARCHAR2(12 BYTE) NOT NULL ENABLE,
	"RFC"  VARCHAR2(13 BYTE) NOT NULL ENABLE,
	"INSTITUCION" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"CODIGO_CAMPUS" VARCHAR2(3 BYTE) NOT NULL ENABLE,
	"F_FECHA_DE_MOVIMIENTO" TIMESTAMP(6) NOT NULL ENABLE,
	 * */

	private static final String insert = "insert into persona_moral (id,nombre,r_social,r_comercial,rfc,"
			+ "institucion,codigo_campus,f_fecha_movimiento) values (?,?,?,?,?,?,?,sysdate)";
	
	public int Inserta(Conexion con,PersonasMorales pm)
	{
		int registro = 0;
		PreparedStatement Enunciado=null;
		try{
		Connection mdm = con.getConexionPoolMDM();
		mdm.setAutoCommit(true);
		Enunciado = mdm.prepareStatement(insert);
		Enunciado.setString(1, pm.getId());
		Enunciado.setString(2, pm.getNombre());
		Enunciado.setString(3, pm.getR_social());
		Enunciado.setString(4, pm.getR_comercial());
		Enunciado.setString(5, pm.getRfc());
		Enunciado.setString(6, pm.getInstitucion());
		Enunciado.setString(7, pm.getCodigo_campus());
		
		  registro = Enunciado.executeUpdate();
		
		  
		
		}catch(SQLException ex){ex.printStackTrace(); return 0;}
		
		return registro;

		

	}
											
	
}
