package iusacell.mdc.arh.sap;

import iusacell.mdc.arh.dao.IEntrevistaSalidaDaoSap;
import iusacell.mdc.arh.util.Errores;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;

//import org.apache.log4j.Logger;

import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.JCoTable;

//import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

/**
 * Clase encargada de invocar los RFC´s del requerimiento de Creacion de
 * Posiciones
 */
public class EntrevistaSalidaDaoSapImpl extends SapConnection implements IEntrevistaSalidaDaoSap {

	//private Logger log = Logger.getLogger(GeneralSapImpl.class);
	
    /* (non-Javadoc)
     * @see mx.com.iusacell.general.sap.IGeneralSap#obtenerPeriodosNominaCerrada(java.lang.String, java.lang.String, java.lang.String)
     */
	public String setEntrevistaSalida(EntrevistaSalidaVO vo) throws Exception{
        String ok_code = "";
        try{
        	
        	// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRHMF_ENTREVISTA").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_TIPO", "1");
			JCoParameterList tablesList = function.getTableParameterList();
			JCoTable entrevista = function.getTableParameterList().getTable("P_T_ENTREV");
			        		
            entrevista.appendRow();
            entrevista.setValue("NUM_EMPL",vo.getNUM_EMPL());
            entrevista.setValue("NOM_EMPL",vo.getNOM_EMPL());
            entrevista.setValue("FECHA",vo.getFECHA());
            entrevista.setValue("MOTIVO_SALIDA",vo.getMOTIVO_SALIDA());
            entrevista.setValue("TIPO_SALIDA",vo.getTIPO_SALIDA());
            entrevista.setValue("SOCIEDAD",vo.getSOCIEDAD());
            entrevista.setValue("DIVISION",vo.getDIVISION());
            entrevista.setValue("SUBDIVISION",vo.getSUBDIVISION());
            entrevista.setValue("FUNCION",vo.getFUNCION());
            entrevista.setValue("JEFE_INMEDIATO",vo.getJEFE_INMEDIATO());
            entrevista.setValue("NOM_EMPJEFE",vo.getNOM_EMPJEFE());
            entrevista.setValue("MOTIVO_RENUNCIA",vo.getMOTIVO_RENUNCIA());
            entrevista.setValue("TIEMPO_DEJAR_E",vo.getTIEMPO_DEJAR_E());
            entrevista.setValue("COND_F1",vo.getCOND_F1());
            entrevista.setValue("COND_F2",vo.getCOND_F2());
            entrevista.setValue("COND_F3",vo.getCOND_F3());
            entrevista.setValue("ARMONIA_LAB",vo.getARMONIA_LAB());
            entrevista.setValue("AL_MOTIVO",vo.getAL_MOTIVO());
            entrevista.setValue("INST_ADEC",vo.getINST_ADEC());
            entrevista.setValue("LA_MOTIV",vo.getLA_MOTIV());
            entrevista.setValue("HERR_NEC",vo.getHERR_NEC());
            entrevista.setValue("HN_MOTIVO",vo.getHN_MOTIVO());
            entrevista.setValue("PRACT_NO_ETIC",vo.getPRACT_NO_ETIC());
            entrevista.setValue("PNE_MOTIV",vo.getPNE_MOTIV());
            entrevista.setValue("RECOMENDACION",vo.getRECOMENDACION());
            entrevista.setValue("RE_MOTIV",vo.getRE_MOTIV());
            entrevista.setValue("COMENTARIO",vo.getCOMENTARIO());
            entrevista.setValue("SATIS_HRS",vo.getSATIS_HRS());
            entrevista.setValue("SATIS_UBIC",vo.getSATIS_UBIC());
            entrevista.setValue("SATIS_DEF",vo.getSATIS_DEF());
            entrevista.setValue("SATIS_BEN",vo.getSATIS_BEN());
            entrevista.setValue("SATIS_LR",vo.getSATIS_LR());
            entrevista.setValue("SATIS_TRAB_EQ",vo.getSATIS_TRAB_EQ());
            entrevista.setValue("SATIS_RET",vo.getSATIS_RET());
            entrevista.setValue("SATIS_CAP",vo.getSATIS_CAP());
            entrevista.setValue("SATIS_CUL",vo.getSATIS_CUL());
            entrevista.setValue("SATIS_POL",vo.getSATIS_POL());
            
            tablesList.setValue("P_T_ENTREV", entrevista);
            
            //Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "P_T_ENTREV";
            
			JCoParameterList output = function.getExportParameterList();
            ok_code = output.getString("P_EXCEP");
        }catch(Exception exc){
        	ok_code = "Error";
        	System.out.println("Error al guardar SAP: " + exc.getMessage());
            throw new Exception(Errores.ERROR_RFC);
        }
        return ok_code;
    }
	
	@Override
	public EntrevistaSalidaVO getEntrevistaSalida(String numEmp) throws Exception{
        EntrevistaSalidaVO entrevistaSalidaVO = null;
        try{
        	
        	// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRHMF_ENTREVISTA").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_NUM_EMPL", numEmp);
			inParams.setValue("P_TIPO", "0");
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "P_T_ENTREV";
        	
			entrevistaSalidaVO = new EntrevistaSalidaVO();
            entrevistaSalidaVO = (EntrevistaSalidaVO)getTableVO(entrevistaSalidaVO);
            
        }catch(Exception exc){
            throw new Exception(Errores.ERROR_RFC);
        }
        return entrevistaSalidaVO;
    }
    
}