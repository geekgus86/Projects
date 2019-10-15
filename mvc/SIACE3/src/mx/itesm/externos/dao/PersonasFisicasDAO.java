package mx.itesm.externos.dao;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.regex.Pattern;

import javax.faces.convert.BigDecimalConverter;

import mx.itesm.externos.model.PersonaFisicaMasivo;
import mx.itesm.externos.model.PersonasFisicas;

public class PersonasFisicasDAO {
	
	/*
	     "ID" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"NOMBRE" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"A_PATERNO" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"A_MATERNO" VARCHAR2(100 BYTE),
    "F_NACIMIENTO" DATE NOT NULL ENABLE,
	"GENERO"  VARCHAR2(1 BYTE) NOT NULL ENABLE,
    "EDO_CIVIL"  VARCHAR2(30 BYTE) NOT NULL ENABLE,	
    "NACIONALIDAD" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"LUGAR_NACIMIENTO"  VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"CURP"  VARCHAR2(20 BYTE) NOT NULL ENABLE,
	"RFC"  VARCHAR2(13 BYTE) NOT NULL ENABLE,
	"INSTITUCION" VARCHAR2(100 BYTE) NOT NULL ENABLE,
	"CODIGO_CAMPUS" VARCHAR2(3 BYTE) NOT NULL ENABLE,
	"F_FECHA_DE_MOVIMIENTO" TIMESTAMP(6) NOT NULL ENABLE,
	 * */
	
	public static final String insert = "insert into PERSONA_FISICA (id,nombre,a_parterno,a_materno,f_nacimiento,genero,edo_civil,nacionalidad,"
			+ "lugar_nacimiento,curp,rfc,institucion,codigo_campus,f_fecha_de_movimiento) values (?,?,?,?,?,?,?,?,?,?,?,?,?,sysdate)";
	
	
	public int Inserta(Conexion con,PersonasFisicas pf)
	{
		int registro = 0;
		PreparedStatement Enunciado=null;
		try{
		Connection mdm = con.getConexionPoolMDM();
		mdm.setAutoCommit(true);
		Enunciado = mdm.prepareStatement(insert);
		Enunciado.setString(1, pf.getId());
		Enunciado.setString(2, pf.getNombre());
		Enunciado.setString(3, pf.getA_paterno());
		Enunciado.setString(4, pf.getA_materno());
		Enunciado.setString(5, pf.getF_nacimiento());
		Enunciado.setString(6, pf.getGenero());
		Enunciado.setString(7, pf.getEdo_civil());
		Enunciado.setString(8, pf.getNacionalidad());
		Enunciado.setString(9, pf.getLugar_nacimiento());
		Enunciado.setString(10, pf.getCurp());
		Enunciado.setString(11, pf.getRfc());
		Enunciado.setString(12, pf.getInstitucion());
		Enunciado.setString(13, pf.getCodigo_campus());
		
		  registro = Enunciado.executeUpdate();
		
		  
		
		}catch(SQLException ex){ex.printStackTrace(); return 0;}
		
		return registro;

	}
	
	public String[] InsertaPersona(PersonaFisicaMasivo pfm,Conexion con)
	{	String estatus = "";	
		String mensaje = "";
	    String salida[] = new String[2];
		try{
	      Connection mdm = con.getConexionPoolMDM();
		   mdm.setAutoCommit(true);
			
			
			CallableStatement storedProc = mdm.prepareCall("{call P_PREMDM_INSERTA_PERSONA(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}");
			storedProc.registerOutParameter(1, java.sql.Types.VARCHAR);
			storedProc.registerOutParameter(2, java.sql.Types.VARCHAR);
			storedProc.setString(3,pfm.sistema);
			storedProc.setLong(4, Long.parseLong(pfm.getPiv_clave_candidato()));
			storedProc.setString(5,pfm.getPiv_nombre());
			storedProc.setString(6,pfm.getPiv_apellido_paterno());
			storedProc.setString(7,pfm.getPiv_apellido_materno());
			storedProc.setString(8,pfm.getPiv_fecha_nacimiento());
			storedProc.setString(9,pfm.getPiv_genero());
			storedProc.setString(10,pfm.getPiv_curp());
			storedProc.setString(11,pfm.getPiv_rfc());
			storedProc.setString(12,pfm.getPiv_imss());
			storedProc.setString(13,pfm.getPiv_clave_pais_nacimiento());
			storedProc.setString(14,pfm.getPiv_clave_estado_nacimiento());
			storedProc.setString(15,pfm.getPiv_clave_pais_nacionalidad());
			storedProc.setString(16,pfm.getPiv_clave_tipo_domicilio());
			storedProc.setString(17,pfm.getPiv_calle1_domicilio());
			storedProc.setString(18,pfm.getPiv_calle2_domicilio());
			storedProc.setString(19,pfm.getPiv_colonia_domicilio());
			storedProc.setString(20,pfm.getPiv_codigo_postal_domicilio());
			storedProc.setString(21,pfm.getPiv_clave_pais_domicilio());
			storedProc.execute();
			estatus = storedProc.getString(1);
			mensaje = storedProc.getString(2);
			salida[0]=estatus;
			salida[1]=mensaje;
			mdm.close();
			System.out.println(mensaje);	
	      return salida;
		}catch(Exception ex){ex.printStackTrace(); return salida;}	
	}
	
	
	
	
	
	

}
