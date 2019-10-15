package iusacell.mdc.arh.dao;

import java.util.List;

import iusacell.mdc.arh.entities.ParametrosVO;


public interface IDaoParametros {
	/**
	 * Obtiene el parametro por la clave de la tabla MDC_CAT_PARAMETROS
	 * @param parametro representa a la columna PARAM_LLAVE
	 * @return
	 * @throws Exception
	 */
	public ParametrosVO selectParametroByLlave(String parametro) throws Exception;
	
	/**
	 * Obtiene la lista de paramtros por la clave de la tabla MDC_CAT_PARAMETROS
	 * @param parametros lista de parametros que representan a la columna PARAM_LLAVE
	 * @return
	 * @throws Exception
	 */
	public List<ParametrosVO> selectListaParametroByLlave(String[] parametros) throws Exception;
	
}
