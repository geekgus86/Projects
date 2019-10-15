package iusacell.mdc.arh.dao;

import iusacell.mdc.arh.vo.EntrevistaSalidaVO;

/**
 * Clase encargada de invocar los RFC´s del requerimiento de Creacion de
 * Posiciones
 */
public interface IEntrevistaSalidaDaoSap {

    public String setEntrevistaSalida(EntrevistaSalidaVO entrevistaSalidaVO) throws Exception;
    
    public EntrevistaSalidaVO getEntrevistaSalida(String numEmp) throws Exception;
    
}