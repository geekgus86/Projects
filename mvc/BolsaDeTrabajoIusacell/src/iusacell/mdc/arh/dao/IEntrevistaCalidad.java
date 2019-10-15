package iusacell.mdc.arh.dao;

import iusacell.mdc.arh.entities.EntrevistaCalidadPreguntasVO;
import iusacell.mdc.arh.vo.CuestionarioVO;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;
import iusacell.mdc.arh.vo.MdcBajasVO;

import java.sql.SQLException;
import java.util.List;

public interface IEntrevistaCalidad {

    public MdcBajasVO obtenerDatosEntrevista(String folio) throws SQLException;
    
    // <!-- Remove & implementation -->
    public List<CuestionarioVO> obtenerPreguntasCuestionario(EntrevistaCalidadPreguntasVO entCalPreguntas);
    // <!-- End -->
    
    public List<CuestionarioVO> obtenerListaPreguntas();
    
    public List<CuestionarioVO> obtenerListaOpciones();
    
    public boolean guardarEntrevistaSalida(List<CuestionarioVO> cuestionarioResp, String cuestionario);
    
    public String gurdaEntrevistaEstatusBaja(String folio, String estado) throws SQLException;
    
    public EntrevistaSalidaVO obtenerEntrevistaResp(String numEmpleado);
    
}
