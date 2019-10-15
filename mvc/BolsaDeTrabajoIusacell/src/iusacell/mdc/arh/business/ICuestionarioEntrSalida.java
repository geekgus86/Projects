package iusacell.mdc.arh.business;

import iusacell.mdc.arh.vo.CuestionarioVO;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;

import java.util.List;

public interface ICuestionarioEntrSalida {
    
    public String obtenerCuestionario(  List<CuestionarioVO> preguntas, List<CuestionarioVO> opciones );
    
    public String cnosultarCuestionarioResp( List<CuestionarioVO> preguntas, List<CuestionarioVO> opciones, EntrevistaSalidaVO entrevista );
    
}
