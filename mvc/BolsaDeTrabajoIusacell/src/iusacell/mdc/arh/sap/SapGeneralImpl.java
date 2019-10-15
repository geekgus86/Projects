package iusacell.mdc.arh.sap;

import iusacell.mdc.arh.vo.DatosBasicosVO;

import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;

/**
 * Clase encargada de invocar los RFC´s del requerimiento de Creacion de
 * Posiciones
 */
@SuppressWarnings("unused")
public class SapGeneralImpl extends SapConnection {

	/** Metodo encargado de obtener los datos basicos del empleado */
	public DatosBasicosVO obtenerDatosBasicos(String posicion) throws Exception {

	 DatosBasicosVO datosBasicosVO = null;
	 try {
		
		// Obtenemos la conexion destino
		initConnectSAP();
		// Obtenemos el repositorio, para posteriormente hacer los llamados a las
		// funciones pertenecientes a dicho repositorio.
		JCoRepository repository = destination.getRepository();
		// Hacemos el llamado al RFC (Remote Function Call)
		function = repository.getFunctionTemplate("ZRH_DATOS_BASICOS").getFunction();
		// Ejecutamos el RFC
		JCoParameterList inParams = function.getImportParameterList();
		//Añadimos los parametros de entrada (campo, valor)
		inParams.setValue("P_POSICION", posicion);
		function.execute(destination);
		sapTableName = "TABLA_1";
		
		datosBasicosVO = new DatosBasicosVO();
		datosBasicosVO = (DatosBasicosVO) getTableVO(datosBasicosVO);
		
	 }catch (Exception e) {
		throw new Exception(e.getMessage());
	 }
		return datosBasicosVO;
	}
	
}
