/**
 * 
 */
package iusacell.mdc.arh.dao.impl;

import iusacell.mdc.arh.dao.IEntrevistaCalidad;
import iusacell.mdc.arh.dao.IEntrevistaSalidaDaoSap;
import iusacell.mdc.arh.entities.EntrevistaCalidadPreguntasVO;
import iusacell.mdc.arh.sap.EntrevistaSalidaDaoSapImpl;
import iusacell.mdc.arh.util.ConnectDS;
import iusacell.mdc.arh.util.Constante;
import iusacell.mdc.arh.vo.CuestionarioVO;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;
import iusacell.mdc.arh.vo.MdcBajasVO;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import oracle.jdbc.OracleTypes;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.iusa.clases.controllers.HibernateUtil;

/**
 * @author MFFERNANDEZ
 *
 */
public class EntrevistaCalidadImpl implements IEntrevistaCalidad {
    
    private static final String MENSAJE_ERROR = "/accesoDenegado.jsp";
    private static final String MENSAJE_EXITO = "Tu opinión es muy valiosa, gracias por contestar la encuesta.";
    private static final String CUERPO = "<div id='contenedor' style='-webkit-box-shadow: #ABABAB 0 3px 10px; -moz-box-shadow: #ABABAB 0 3px 10px; box-shadow: " +
            "#ABABAB 0 3px 10px;-moz-border-radius: 7px; background: #FFFFFF; width: 600px; padding: 20px; margin-top: 20px'><div id='saludo' style='color: #898989; " +
            "font-weight: bold;'>&&saludo&&</div><br><div id='promocion' style='font-weight: bold;'>&&textoPromocion&&</div><br><br>&&botones&&</div></div>";
    
    private Session session;
    private Logger log = Logger.getLogger(EntrevistaCalidadImpl.class);
    
    @Override
    public MdcBajasVO obtenerDatosEntrevista(String folio) throws SQLException {
        MdcBajasVO bajasvo =  null;
        
        ResultSet res=null;
        Connection conn = null;
        CallableStatement cstmt = null;
        String sp = "{call CU_CONSULTA.MDC_CONS_ES_EMPLEADO_BAJA(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            
            conn = ConnectDS.getConnection();
            
            if (conn == null) {
              throw new Exception("Error de conexion al LMS.");
            } else {
                
                cstmt = conn.prepareCall(sp);
                cstmt.setString(1, folio.toString());
                cstmt.registerOutParameter(2, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(3, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(4, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(5, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(6, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(7, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(8, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(9, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(10, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(11, OracleTypes.VARCHAR);
                cstmt.registerOutParameter(12, OracleTypes.CURSOR);
                cstmt.execute();
                
                System.out.println("Folio: "+folio.toString());
                String flag = String.valueOf(cstmt.getObject(2));
                String numEmp = String.valueOf(cstmt.getObject(3));
                String posicion = String.valueOf(cstmt.getObject(4));
                String nombre = String.valueOf(cstmt.getObject(5));
                String puestoEmp = String.valueOf(cstmt.getObject(6));
                String nomJefe = String.valueOf(cstmt.getObject(7));
                String motivo = String.valueOf(cstmt.getObject(8));
                String tipo = String.valueOf(cstmt.getObject(9));
                String sociedad = String.valueOf(cstmt.getObject(10));
                String numEmpAut = String.valueOf(cstmt.getObject(11));
                
                if( flag.equals(Constante.FLAG_BAJA_ACT) || flag.equals(Constante.FLAG_BAJA_CAD) ){
                    //Folio Activo
                    System.out.println("Flag: "+flag.toString());
                    System.out.println("NumEmp: "+numEmp.toString());
                    System.out.println("Posiciòn: "+posicion.toString());
                    System.out.println("nombre: "+nombre.toString());
                    System.out.println("puestoEmp: "+puestoEmp.toString());
                    System.out.println("nomJefe: "+nomJefe.toString());
                    System.out.println("motivo: "+motivo.toString());
                    System.out.println("tipo: "+tipo.toString());
                    System.out.println("sociedad: "+sociedad.toString());
                    System.out.println("numEmpAut:"+numEmpAut);
                    
                    /*lstSolicitudBaja = new ArrayList<MdcBajasVO>();
                    System.out.println("lstSolicitudBaja = new ArrayList<MdcBajasVO>();");
                    if(cstmt.getObject(3)!=null){
                    	System.out.println("if(cstmt.getObject(3)!=null){");
                        res=(ResultSet )cstmt.getObject(3);
                        System.out.println("res=(ResultSet )cstmt.getObject(3);");
                        lstSolicitudBaja = createCollection(res);
                        System.out.println("lstSolicitudBaja = createCollection(res); -->"+lstSolicitudBaja!=null ? lstSolicitudBaja.size() : "0");
                    }
                    System.out.println("SALIÒ DEL IF");
                    for( MdcBajasVO vo : lstSolicitudBaja ){
                    	System.out.println("Entra a for");
                        vo.setEstatus(flag);
                        System.out.println("Id: "+vo.getId());
                        System.out.println("Motivo Baja: "+vo.getMotivo());
                        System.out.println("Tipo Baja: "+vo.getTipo());
                        System.out.println("Num Empleado Baja: "+vo.getNumerobaja());
                        System.out.println("Nom Empleado Baja: "+vo.getNomempladobaja());
                        System.out.println("Nom Puesto Baja: "+vo.getPuestobaja());
                        System.out.println("Nom Jefe Directo: "+vo.getNomautorizador());
                        
                        bajasvo = vo;
                    }*/
                    
                    bajasvo = new MdcBajasVO();
                    bajasvo.setNumerobaja(numEmp.toString());
                    bajasvo.setPosicion(posicion.toString());
                    bajasvo.setEstatus(flag.toString());
                    bajasvo.setNomempladobaja(nombre.toString());
                    bajasvo.setPuestobaja(puestoEmp.toString());
                    bajasvo.setNomautorizador(nomJefe.toString());
                    bajasvo.setMotivo(motivo);
                    bajasvo.setTipo(tipo);
                    bajasvo.setSociedad(sociedad);
                    bajasvo.setNumautorizador(numEmpAut);
                    System.out.println("Guardo todo.");
                    
                } else if (flag.equals(Constante.FLAG_BAJA_NEF)){
                    //Folio No Existe
                    System.out.println("Flag: "+flag.toString());
                    bajasvo =  null;
                }
            }
            
        } catch (SQLException e) {
            log.error("Error de SQL Store Procedure: " + e.getMessage());
           System.out.println("Excepcion: " + e);
            throw new SQLException(e.getMessage());
        } catch (Throwable e) {
           System.out.println("Excepcion: " + e);
            log.error("Error: " + e.getMessage());
        } finally {
            if(res!=null)
                res.close();
            if(cstmt!=null)
                cstmt.close();
            if(conn!=null)
                conn.close();
        }
        
        return bajasvo;
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<CuestionarioVO> obtenerPreguntasCuestionario(EntrevistaCalidadPreguntasVO entCalPreguntas) {
        
        List<CuestionarioVO> cuestionario = new ArrayList<CuestionarioVO>();
        try {
            session=HibernateUtil.getSessionFactory().getCurrentSession();
            try {
                
                Query query = session.createSQLQuery("SELECT pg.ID_PREGUNTA, pg.DESC_PREGUNTA, po.DESC_OPCION, po.TIPO, po.CAMPO_EXTRA, po.OPCIONES, pg.TIPO_SALIDA, pg.UBICACION, pg.VENTAS FROM MDC_CAT_PREGUNTAS_ES pg INNER JOIN MDC_OPC_PREGUNTAS_ES po ON pg.ID_PREGUNTA = po.ID_PREGUNTA WHERE pg.TIPO_SALIDA LIKE :tipoSalida ORDER BY pg.ID_PREGUNTA ASC, po.ID_OPC ASC");
        		
                String tipoSalida = "%" + entCalPreguntas.getTipoSalida() + "%";
                query.setParameter("tipoSalida", tipoSalida);
                query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                List<Object> data = query.list();
                int i=0;
                for (Object object : data) {
                    Map<Object,Object> row = (Map<Object,Object>) object;
                    CuestionarioVO vo = new CuestionarioVO();
                    String[] camposVO = vo.getCampos();
                    vo.setID_PREGUNTA(row.get(camposVO[0])!=null?String.valueOf(row.get(camposVO[0])):"");
                    vo.setDESC_PREGUNTA(row.get(camposVO[1])!=null?String.valueOf(row.get(camposVO[1])):"");
                    vo.setID_OPC(row.get(camposVO[2])!=null?String.valueOf(row.get(camposVO[2])):"");
                    vo.setDESC_OPCION(row.get(camposVO[3])!=null?String.valueOf(row.get(camposVO[3])):"");
                    vo.setTIPO(row.get(camposVO[4])!=null?String.valueOf(row.get(camposVO[4])):"");
                    vo.setCAMPO_EXTRA(row.get(camposVO[5])!=null?String.valueOf(row.get(camposVO[5])):"");
                    vo.setOPCIONES(row.get(camposVO[6])!=null?String.valueOf(row.get(camposVO[6])):"");
                    vo.setTIPO_SALIDA(row.get(camposVO[7])!=null?String.valueOf(row.get(camposVO[7])):"");
                    vo.setUBICACION(row.get(camposVO[8])!=null?String.valueOf(row.get(camposVO[8])):"");
                    vo.setVENTAS(row.get(camposVO[9])!=null?String.valueOf(row.get(camposVO[9])):"");
                    cuestionario.add(i, vo);
                    i++;
                }
                
            } catch (Exception e) {
               System.out.println("Excepcion: " + e);
                System.out.println(e.getMessage());
                throw new Exception("ERROR_BD: MDC_CAT_PREGUTNAS_ES");
            }
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
        }
        
        return cuestionario;
    }
    
    
    
    @SuppressWarnings({ "unchecked", "unused" })
	@Override
    public List<CuestionarioVO> obtenerListaPreguntas(){
        List<CuestionarioVO> lstPreguntas =  new ArrayList<CuestionarioVO>();
        try {
            session=HibernateUtil.getSessionFactory().getCurrentSession();
            try {
            	Transaction tr = session.beginTransaction();
                Query query = session.createSQLQuery("SELECT * FROM MDC_CAT_PREGUNTAS_ES ORDER BY ID_PREGUNTA ASC");
                query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                List<Object> data = query.list();
                int i=0;
                
                for (Object obj : data) {
                    Map<Object,Object> row = (Map<Object,Object>) obj; 
                    CuestionarioVO vo = new CuestionarioVO();
                    String[] camposVO = vo.getCampos();
                    vo.setID_PREGUNTA(row.get(camposVO[0])!=null?String.valueOf(row.get(camposVO[0])):"");
                    vo.setDESC_PREGUNTA(row.get(camposVO[1])!=null?String.valueOf(row.get(camposVO[1])):"");
                    vo.setCAMPOS_SAP(row.get(camposVO[2])!=null?String.valueOf(row.get(camposVO[2])):"");
                    vo.setTIPO_SALIDA(row.get(camposVO[7])!=null?String.valueOf(row.get(camposVO[7])):"");
                    vo.setUBICACION(row.get(camposVO[8])!=null?String.valueOf(row.get(camposVO[8])):"");
                    vo.setVENTAS(row.get(camposVO[9])!=null?String.valueOf(row.get(camposVO[9])):"");
                    lstPreguntas.add(i, vo);
                    i++;
                    
                }
                
            } catch (Exception e) {
               System.out.println("Excepcion: " + e);
                System.out.println(e.getMessage());
                throw new Exception("ERROR_BD: MDC_CAT_PREGUTNAS_ES");
            }
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
        }
        
        
        return lstPreguntas;
    }
    
    @SuppressWarnings({ "unchecked", "unused" })
	@Override
    public List<CuestionarioVO> obtenerListaOpciones(){
        List<CuestionarioVO> lstPreguntas =  new ArrayList<CuestionarioVO>();
        try {
            session=HibernateUtil.getSessionFactory().getCurrentSession();
            try {
            	Transaction tr = session.beginTransaction();
                Query query = session.createSQLQuery("SELECT ID_PREGUNTA, ID_OPC, DESC_OPCION, TIPO, CAMPO_EXTRA, OPCIONES  FROM MDC_OPC_PREGUNTAS_ES ORDER BY ID_PREGUNTA ASC, ID_OPC ASC");
                query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                List<Object> data = query.list();
                int i=0;
                
                
                for (Object object : data) {
                    Map<Object,Object> row = (Map<Object,Object>) object;
                    CuestionarioVO vo = new CuestionarioVO();
                    String[] camposVO = vo.getCampos();
                    vo.setID_OPC(row.get(camposVO[3])!=null?String.valueOf(row.get(camposVO[3])):"");
                    vo.setID_PREGUNTA(row.get(camposVO[0])!=null?String.valueOf(row.get(camposVO[0])):"");
                    vo.setDESC_OPCION(row.get(camposVO[4])!=null?String.valueOf(row.get(camposVO[4])):"");
                    vo.setTIPO(row.get(camposVO[5])!=null?String.valueOf(row.get(camposVO[5])):"");
                    vo.setCAMPO_EXTRA(row.get(camposVO[6])!=null?String.valueOf(row.get(camposVO[6])):"");
                    vo.setOPCIONES(row.get(camposVO[7])!=null?String.valueOf(row.get(camposVO[7])):"");
                    lstPreguntas.add(i, vo);
                    i++;
                }
                
            } catch (Exception e) {
               System.out.println("Excepcion: " + e);
                System.out.println(e.getMessage());
                throw new Exception("ERROR_BD: MDC_OPC_PREGUTNAS_ES");
            }
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
        }
        
        
        return lstPreguntas;
    }
    
    @Override
    public boolean guardarEntrevistaSalida(List<CuestionarioVO> preguntas, String cuest) {
        boolean resp = true;
        //Guarda en SAP las respuestas del custionario
        IEntrevistaSalidaDaoSap generalSap = new EntrevistaSalidaDaoSapImpl();
        String[] cuestionario = {}, respuestas={};
        EntrevistaSalidaVO vo = new EntrevistaSalidaVO();
        
        try {
            
            cuestionario = cuest.split(";");
            
            //Datos de usuario
            vo.setNUM_EMPL(Integer.parseInt(cuestionario[0])+"");
            vo.setNOM_EMPL(cuestionario[1]);
            vo.setFECHA(cuestionario[2]);
            vo.setMOTIVO_SALIDA(cuestionario[3]);
            vo.setTIPO_SALIDA(cuestionario[4]);
            vo.setSOCIEDAD(cuestionario[5]);
            vo.setDIVISION(cuestionario[6]);
            vo.setSUBDIVISION(cuestionario[7]);
            vo.setFUNCION(cuestionario[8]);
            vo.setJEFE_INMEDIATO(cuestionario[9]);
            vo.setNOM_EMPJEFE(cuestionario[10]);
            
            //Datos Cuestionario
            //Pregunta1
            vo.setMOTIVO_RENUNCIA(cuestionario[11]);
            
            //Pregunta2
            vo.setTIEMPO_DEJAR_E(cuestionario[12]);
            
            //Pregunta3
            respuestas = cuestionario[13].split(",");
            vo.setCOND_F1(respuestas[0]);
            vo.setCOND_F2(respuestas[1]);
            vo.setCOND_F3(respuestas[2]);
            
            
            //Pregunta4
            respuestas = cuestionario[14].split(",");
            vo.setARMONIA_LAB(respuestas[0]);
            if(respuestas.length == 2){
                vo.setAL_MOTIVO(respuestas[1]);
            } else {
                vo.setAL_MOTIVO("");
            } 
            
            //Pregunta5
            respuestas = cuestionario[15].split(",");
            vo.setINST_ADEC(respuestas[0]);
            if(respuestas.length == 2){
                vo.setLA_MOTIV(respuestas[1]);
            } else {
                vo.setLA_MOTIV("");
            } 
            
            //Pregunta6
            respuestas = cuestionario[16].split(",");
            vo.setHERR_NEC(respuestas[0]);
            if(respuestas.length == 2){
                vo.setHN_MOTIVO(respuestas[1]);
            } else {
                vo.setHN_MOTIVO("");
            } 
            
            //Pregunta7
            respuestas = cuestionario[17].split(",");
            vo.setPRACT_NO_ETIC(respuestas[0]);
            if(respuestas.length == 2){
                vo.setPNE_MOTIV(respuestas[1]);
            } else {
                vo.setPNE_MOTIV("");
            }

            //Pregunta8
            respuestas = cuestionario[18].split(",");
            vo.setRECOMENDACION(respuestas[0]);
            if(respuestas.length == 2){
                vo.setRE_MOTIV(respuestas[1]);
            } else {
                vo.setRE_MOTIV("");
                
            }
            
            //Pregunta9
            vo.setCOMENTARIO(cuestionario[19]);
            
            //Pregunta10
            respuestas = cuestionario[20].split(",");
            vo.setSATIS_HRS(respuestas[0]);
            vo.setSATIS_UBIC(respuestas[1]);
            vo.setSATIS_DEF(respuestas[2]);
            vo.setSATIS_BEN(respuestas[3]);
            vo.setSATIS_LR(respuestas[4]);
            vo.setSATIS_TRAB_EQ(respuestas[5]);
            vo.setSATIS_RET(respuestas[6]);
            vo.setSATIS_CAP(respuestas[7]);
            vo.setSATIS_CUL(respuestas[8]);
            vo.setSATIS_POL(respuestas[9]);

            generalSap.setEntrevistaSalida(vo);
            System.out.println("Finaliza guardar entrevista SAP" + resp);
            
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
        }
        
        return resp;
    }
    
    @Override
    public String gurdaEntrevistaEstatusBaja(String folio, String estado) throws SQLException  {
        String resp="";
        
        ResultSet res=null;
        Connection conn = null;
        CallableStatement cstmt = null;
        String sp = "{call CU_CONSULTA.MDC_REGISTRO_ESTATUS_ES_BAJA(?,?,?)}";

        try {
            
            conn = ConnectDS.getConnection();
            
            if (conn == null) {
              throw new Exception("Error de conexion al LMS.");
            } else {
                
                cstmt = conn.prepareCall(sp);
                cstmt.setString(1, folio.toString());
                cstmt.setString(2, estado.toString());
                cstmt.registerOutParameter(3, OracleTypes.VARCHAR);
                cstmt.execute();
                
                System.out.println("Folio: "+folio.toString());
                String flag = String.valueOf(cstmt.getObject(3));
                
                if( flag.equals("1") ){
                    //Folio Activo
                    System.out.println("Flag: "+flag.toString());
                    //resp = flag + ";" + CUERPO.replaceAll("&&saludo&&", "")
                    resp = CUERPO.replaceAll("&&saludo&&", "")
                            .replaceAll("&&textoPromocion&&", MENSAJE_EXITO)
                            .replaceAll("&&botones&&", "");
                    
                } else if (flag.equals("0") ) {
                    //Folio Caduco retornar custionario contestado
                    System.out.println("Flag: "+flag.toString());
                    //resp = flag + ";" + CUERPO.replaceAll("&&saludo&&", "")
                    resp = CUERPO.replaceAll("&&saludo&&", "")
                            .replaceAll("&&textoPromocion&&", MENSAJE_ERROR)
                            .replaceAll("&&botones&&", "");
                } 
            }
            
        } catch (SQLException e) {
            log.error("Error de SQL Store Procedure: " + e.getMessage());
           System.out.println("Excepcion: " + e);
            throw new SQLException(e.getMessage());
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
            log.error("Error: " + e.getMessage());
        } finally {
            if(res!=null)
                res.close();
            if(cstmt!=null)
                cstmt.close();
            if(conn!=null)
                conn.close();
        }
        
                
        return resp;
    }
    
    @Override
    public EntrevistaSalidaVO obtenerEntrevistaResp(String numEmpleado) {
        IEntrevistaSalidaDaoSap generalSap = new EntrevistaSalidaDaoSapImpl();
        EntrevistaSalidaVO vo = null;
        try {
            vo = generalSap.getEntrevistaSalida(numEmpleado);
            
        } catch (Exception e) {
           System.out.println("Excepcion: " + e);
        }
        return vo;
    }
    
}
