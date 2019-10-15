/**
 * 30/04/2010
 */
package iusacell.mdc.arh.sap;

import iusacell.mdc.arh.exception.ObjectNotFoundException;
import iusacell.mdc.arh.exception.PersistenceException;
import iusacell.mdc.arh.util.DischargeCause;
import iusacell.mdc.arh.util.DischargeType;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;

import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.JCoTable;

/**
 * @author codaESM
 *
 */
public class TipoBajaSap extends SapConnection{

Logger log = Logger.getLogger(TipoBajaSap.class);
    
    
    /* Constantes para el RFC ZRH_CAT_MOTIVOS_BAJA */
	public static final String DISCHARGE_CAUSE_FIELD_1 = "MASSG";
	public static final int DISCHARGE_CAUSE_FIELD_1_SIZE = 2;
	public static final String DISCHARGE_CAUSE_FIELD_2 = "MGTXT";
	public static final int DISCHARGE_CAUSE_FIELD_2_SIZE = 30;
	public static final String DISCHARGE_CAUSE_TABLE = "MOTIVOS";
	public static final String DISCHARGE_CAUSE_RFC = "ZRH_CAT_MOTIVOS_BAJA";
    
    @SuppressWarnings({ "rawtypes" })
	public List getAllDischargeCauses() throws PersistenceException{
    	
		List list = null;
		try {
    		// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_MOTIVOS_BAJA").getFunction();
			// Ejecutamos el RFC
			function.execute(destination);
			sapTableName = "MOTIVOS";

			JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
    		list = getDischargeCauseCatalog(tabla,DISCHARGE_CAUSE_FIELD_1, DISCHARGE_CAUSE_FIELD_2);
		  } catch (Exception exc) {
		      throw new PersistenceException(exc);
		  }
		  return list;
    }

	 @SuppressWarnings("rawtypes")
	public DischargeCause getDischargeCauseByLongCode(String longCode) throws ObjectNotFoundException,
	      PersistenceException
	 {
	  DischargeCause cause = null;
	  log.debug("longCode: " + longCode);
	  for (Iterator index = (Iterator) getAllDischargeCauses().iterator();
	    index.hasNext(); ) {
	   DischargeCause item = (DischargeCause )index.next();
	   log.debug("item: " + item.getLongCode());
	   if (item.getShortCode().equals(longCode)) {
	    cause = item;
	   }
	  }
	  if (cause == null) {
	   throw new ObjectNotFoundException(
	                "El elemento del catalogo no se encontro");
	  }
	  return cause;
	 }
	 
	 /* Constantes para el RFC ZRH_CAT_TIPOS_BAJA */
		public static final String DISCHARGE_TYPE_INPUT = "P_MOTIVO";
		public static final int DISCHARGE_TYPE_INPUT_SIZE = 2;
		public static final String DISCHARGE_TYPE_FIELD_1 = "SUBTY";
		public static final int DISCHARGE_TYPE_FIELD_1_SIZE = 3;
		public static final String DISCHARGE_TYPE_FIELD_2 = "STEXT";
		public static final int DISCHARGE_TYPE_FIELD_2_SIZE = 40;
		public static final String DISCHARGE_TYPE_TABLE = "TIPOS";
		public static final String DISCHARGE_TYPE_RFC = "ZRH_CAT_TIPOS_BAJA";
	 
	 @SuppressWarnings("rawtypes")
	public DischargeType getDischargeTypeByShortCode(String dischargeCauseShortCode, String dischargeTypeShortCode) throws ObjectNotFoundException,PersistenceException{
		DischargeType type = null;
		log.debug("Buscando el id: " + dischargeTypeShortCode);
		for (Iterator index = getAllDischargeTypesByDischargeCauseShortCode(dischargeCauseShortCode).iterator(); index.hasNext(); ) {
		DischargeType item = (DischargeType )index.next();
		log.debug("item: " + item.getShortCode());
		if (item.getShortCode().equals(dischargeTypeShortCode)) {
		type = item;
		}
		}
		if (type == null) {
		throw new ObjectNotFoundException(
		"El elemento del catalogo de tipos de baja no se encontro");
		}
		return type;
	}
	 
	@SuppressWarnings({ "rawtypes" })
	public List getAllDischargeTypesByDischargeCauseShortCode(String dischargeCauseShortCode)throws PersistenceException{
		List list = null;
		
		log.debug("Buscando los tipos para el motivo: " + dischargeCauseShortCode);
		try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_TIPOS_BAJA").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_MOTIVO", dischargeCauseShortCode);
			function.execute(destination);
			sapTableName = "TIPOS";

			JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
			
			list = getDischargeTypeCatalog(tabla,DISCHARGE_TYPE_FIELD_1,DISCHARGE_TYPE_FIELD_2);
		} catch (Exception exc) {
			throw new PersistenceException(exc);
		}
		return list;
	} 
	
	/**
	 * Método que extrae de la tabla <strong>result</strong> un lista con los
	 * elementos del catalogo Tipos de Baja
	 * 
	 * @param result Tabla con los datos que arrojo el RFC de SAP.
	 * @param key Campo de la tabla <strong>result</strong> que servira de llave
	 * para el combo.
	 * @param label Campo de la tabla <strong>result</strong> que servira de
	 * etiqueta para el combo.
	 * @return Lista con objetos del tipo <strong>DischargeType</strong>
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getDischargeTypeCatalog(JCoTable result, String key, String label) throws IllegalArgumentException{
		if (result == null && key == null && label == null) {
			throw new IllegalArgumentException("Los argumentos no son validos");
		}
		List list = new ArrayList(result.getNumRows());
		if (!result.isEmpty()) {
			result.firstRow();
			do {
				list.add(new DischargeType(null, result.getString(key),result.getString(label)));
			} while (result.nextRow());
		}
		return list;
	}

	
	/**
	 * Método que extrae de la tabla <strong>result</strong> un lista con los
	 * elementos del catalogo Motivos de Baja
	 * 
	 * @param result Tabla con los datos que arrojo el RFC de SAP.
	 * @param key Campo de la tabla <strong>result</strong> que servira de llave
	 * para el combo.
	 * @param label Campo de la tabla <strong>result</strong> que servira de
	 * etiqueta para el combo.
	 * @return Lista con objetos del tipo <strong>DischargeCause</strong>
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getDischargeCauseCatalog(JCoTable result,
												String key,
												String label)
		throws IllegalArgumentException
	{
		if (result == null && key == null && label == null) {
			throw new IllegalArgumentException("Los argumentos no son validos");
		}
		List list = new ArrayList(result.getNumRows());
		if (!result.isEmpty()) {
			result.firstRow();
			do {
				list.add(new DischargeCause(null, result.getString(key),
				        							  result.getString(label)));
			} while (result.nextRow());
		}
		return list;
	}

}
