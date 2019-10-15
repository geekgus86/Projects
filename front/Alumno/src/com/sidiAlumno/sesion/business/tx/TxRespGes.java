package com.sidiAlumno.sesion.business.tx;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.sidiAlumno.general.RespuestaGestor;
import com.sidiAlumno.general.exception.BusinessSessionException;
import com.sidiAlumno.sesion.ManagerConections;

public class TxRespGes {
	
	private static String qryRespGes = "SELECT DISTINCT CODIGO_CAMPUS,PERIODO,MATRICULA,NOMBRE,N_IMPORTE_INICIAL,N_CANTIDAD,CVE_TIENDA,TIPO_MONEDA,CVE_SERVICIO,N_PEDIDO,FOLIO_TIENDA,CVE_FORMA_PAGO,DESC_FORMA_PAGO,TIPO_TRANSACCION,ESTATUS,N_UMBRAL,F_FECHA_DE_MOVIMIENTO FROM RESPUESTA_GESTOR WHERE MATRICULA = ? AND CODIGO_CAMPUS = ? AND PERIODO = ?";
	
	
	public RespuestaGestor getObtenerPedido(String matricula,String periodo,String campus) throws BusinessSessionException{
		
		RespuestaGestor respGes = new RespuestaGestor();
			
		Connection conSidi= ManagerConections.getSidiConection();
			
			PreparedStatement pstm = null;
			ResultSet resultadoQ = null;
			
			try {
				pstm = conSidi.prepareStatement(qryRespGes);
				pstm.setString(1, "A"+matricula);
				pstm.setString(2, campus);
				pstm.setString(3, periodo);

				resultadoQ = pstm.executeQuery();
				
				while(resultadoQ.next())
				{
					respGes.setCantidad(Integer.parseInt(resultadoQ.getString("N_CANTIDAD")));
					respGes.setCodigoCampus(resultadoQ.getString("CODIGO_CAMPUS"));
					respGes.setCveFormaPago(Integer.parseInt(resultadoQ.getString("CVE_FORMA_PAGO")));
					respGes.setCveServicio(Integer.parseInt(resultadoQ.getString("CVE_SERVICIO")));
					respGes.setCveTienda(Integer.parseInt(resultadoQ.getString("CVE_TIENDA")));
					respGes.setDescFormaPago(resultadoQ.getString("DESC_FORMA_PAGO"));
					respGes.setEstatus(resultadoQ.getString("ESTATUS"));
					respGes.setFechaMovimiento(resultadoQ.getString("F_FECHA_DE_MOVIMIENTO"));
					respGes.setFolioTienda(resultadoQ.getString("FOLIO_TIENDA"));
					respGes.setImporteInicial(resultadoQ.getFloat("N_IMPORTE_INICIAL"));
					respGes.setMatricula(resultadoQ.getString("MATRICULA"));
					respGes.setNombre(resultadoQ.getString("NOMBRE"));
					respGes.setPedido(Integer.parseInt(resultadoQ.getString("N_PEDIDO")));
					respGes.setPeriodo(resultadoQ.getString("PERIODO"));
					respGes.setTipoMoneda(resultadoQ.getString("TIPO_MONEDA"));
					respGes.setTipoTransaccion(resultadoQ.getString("TIPO_TRANSACCION"));
					respGes.setUmbral(Integer.parseInt(resultadoQ.getString("N_UMBRAL")));				
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
			
			
			return respGes;
		}
		
public boolean getGuardarPedido(String matricula,
        String nombre,
        String codigoCampus,
        String tipoMoneda,
        String folioTienda,
        String descFormaPago,
        String tipoTransaccion,
        String estatus,
        String periodo,
        BigDecimal importeInicial,
        int cantidad,
        int cveTienda,
        int cveServicio,
        int nPedido,
        int cveFormaPago,
        int umbral,
        String fecMov) throws BusinessSessionException{
			
		Connection conSidi= ManagerConections.getSidiConection();
			
			PreparedStatement pstm = null;
			int resultadoQ = 0;
			
			try {
				String updRespGes = "INSERT INTO SIDI.RESPUESTA_GESTOR (CODIGO_CAMPUS,PERIODO,MATRICULA,NOMBRE,N_IMPORTE_INICIAL,N_CANTIDAD,CVE_TIENDA,TIPO_MONEDA,CVE_SERVICIO,N_PEDIDO,FOLIO_TIENDA,CVE_FORMA_PAGO,DESC_FORMA_PAGO,TIPO_TRANSACCION,ESTATUS,N_UMBRAL,F_FECHA_DE_MOVIMIENTO) VALUES ('"+codigoCampus+"', '"+periodo+"', '"+matricula+"', '"+nombre+"', "+importeInicial+", "+cantidad+", "+cveTienda+", '"+tipoMoneda+"', "+cveServicio+", "+nPedido+", '"+folioTienda+"', "+cveFormaPago+", '"+descFormaPago+"', '"+tipoTransaccion+"', '"+estatus+"', "+umbral+", SYSDATE)";
				
				pstm = conSidi.prepareStatement(updRespGes);
				System.out.println("Query de insercion a ejecutar: "+updRespGes);
				
				resultadoQ = pstm.executeUpdate(updRespGes);
				conSidi.commit();
				
				if(resultadoQ==1){
					System.out.println("El almacenado en la B.D fue hecho con exito.");
					return true;
				}else{
					System.out.println("El almacenado en la B.D no fue hecho con exito.");
					return false;	
				}
				
			} catch (SQLException e) {
				
				System.out.println("Error al tratar de insertar la Respuesta del Gestor de Pagos: "+e.toString());
				return false;
		}
		finally {
			try {
				if (pstm != null) {
					pstm.close();
					System.out.println("Se cerro la conexion con exito");
				}
			} catch (SQLException e) {
				System.out.println("Error al tratar de finalizar la conexion: "+e.toString());
			}

		}
			
		}
		

}
