/**
 * Creado 04/06/2009
 */
package iusacell.mdc.arh.business.impl;

import java.util.List;

import iusacell.mdc.arh.business.IParametros;
import iusacell.mdc.arh.dao.impl.DaoParametros;
import iusacell.mdc.arh.entities.ParametrosVO;

/**
 * @author ESM
 *
 */
public class ParametrosImpl implements IParametros {
	
	
	public ParametrosVO selectParametroByLlave(String parametro) throws Exception{
		ParametrosVO paramVO = null;
		try{
			DaoParametros paramDao = new DaoParametros();
			paramVO = paramDao.selectParametroByLlave(parametro);
		}catch(Exception exc){
			throw new Exception(exc.getMessage());
		}
		return paramVO;
	}

	@Override
	public List<ParametrosVO> selectListaParametroByLlave(String[] parametros) throws Exception {
		List<ParametrosVO> paramVO = null;
		try{
			DaoParametros paramDao = new DaoParametros();
			paramVO = paramDao.selectListaParametroByLlave(parametros);
		}catch(Exception exc){
			throw new Exception(exc.getMessage());
		}
		return paramVO;
	}
	
}