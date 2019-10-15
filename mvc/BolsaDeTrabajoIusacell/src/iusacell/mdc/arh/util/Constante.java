/*
 * Creado el 29/08/2008
 *
 */
package iusacell.mdc.arh.util;

import org.apache.log4j.Logger;

import iusacell.mdc.arh.dao.impl.DaoParametros;
import iusacell.mdc.arh.entities.ParametrosVO;

/**
 * @author LFP
 *
 */
public class Constante {
	
	Logger log = Logger.getLogger(Constante.class);
	
	public static final int TEXT_MESSAGE = 1; //TODO
	public static final int HTML_MESSAGE = 2; //TODO
	
	public static final String RFC_ZRH_DATOS_BASICOS = "ZRH_DATOS_BASICOS";
	public static final String RFC_ZRHMF_ENTREVISTA = "ZRHMF_ENTREVISTA";
	
	public static final String AUTHORIZER_DEFAULT_EMAIL = "AUTHORIZER_DEFAULT_EMAIL";
	public static final String EMAIL_TAG_OPEN = "<Correo>";
	public static final String EMAIL_TAG_CLOSE = "</Correo>";
	
	public static final String MASTER_KEY_PREFIX = "IU";
	
	public static final String FLAG_BAJA_NEF = "NO EXISTE FOLIO";
	public static final String FLAG_BAJA_CAD = "FOLIO CADUCO";
	public static final String FLAG_BAJA_ACT = "FOLIO ACTIVO";
	
	public String valid;
	
	
	public Constante(){
		DaoParametros dao = new DaoParametros();
		try{
			ParametrosVO vo = dao.selectParametroByLlave("KEY_ENCRIPTA");
			this.valid = vo.getParamValor(); 
		}catch(Exception exc){
			log.info("ERROR:"+LineException.getException(exc));
		}
	}
	
	/**
	 * @return Devuelve valid.
	 */
	public String getValid() {
		return valid;
	}
}
