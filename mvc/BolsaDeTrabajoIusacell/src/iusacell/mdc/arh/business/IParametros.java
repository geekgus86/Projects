package iusacell.mdc.arh.business;



import java.util.List;

import iusacell.mdc.arh.entities.ParametrosVO;

public interface IParametros {

	abstract ParametrosVO selectParametroByLlave(String parametro) throws Exception;
	abstract List<ParametrosVO> selectListaParametroByLlave(String[] parametros) throws Exception;
	
}