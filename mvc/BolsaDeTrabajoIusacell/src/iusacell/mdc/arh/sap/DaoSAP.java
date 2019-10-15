/*
 * Created on 18/11/2008
 *
 */
package iusacell.mdc.arh.sap;

import iusacell.mdc.arh.business.IParametros;
import iusacell.mdc.arh.business.impl.ParametrosImpl;
import iusacell.mdc.arh.entities.ParametrosVO;
import iusacell.mdc.arh.util.Errores;
import iusacell.mdc.arh.util.LineException;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import iusacell.mdc.arh.vo.DatosBasicosVO;
import iusacell.mdc.arh.vo.PosicionVO;
import iusacell.mdc.arh.vo.RamoVO;


import org.apache.log4j.Logger;

import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;

/**
 * @author Leonel Gaytan Clemente
 *
 */
public class DaoSAP extends SapConnection{
	
	private Logger log = Logger.getLogger(DaoSAP.class);

	public DaoSAP() {
		super();
	}
	
	/**
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Hashtable getDatosConexionSAP() throws Exception{
		Hashtable ht = new Hashtable();
        IParametros parametros = new ParametrosImpl();
        String param[] = {"maxNumeroConexiones","usuSap","pwSap","idiSap","ipSap","puertoSap","sapGroup","sapCliente","r3Name"};
        List<ParametrosVO> params = parametros.selectListaParametroByLlave(param);
        try {
        	for (ParametrosVO parametro: params) {
        		ht.put(parametro.getParamLlave(), parametro.getParamValor());
			}
        }catch(Exception e){
        	log.info("Error insertaBitacora... MDC_CAT_PARAMETROS" + e.getMessage());
        }
        return ht;
	}
	
	
	public DatosBasicosVO getDatosBasicos(String posicion) throws Exception{
		DatosBasicosVO datosBasicosVO = null;
		try{
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_DATOS_BASICOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_POSICION", posicion);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "TABLA_1";
			
			datosBasicosVO = new DatosBasicosVO();
			datosBasicosVO = (DatosBasicosVO)getTableVO(datosBasicosVO);
			
		}catch(Exception exc){
			log.info("ERROR:"+LineException.getException(exc));
			log.info("ERROR_RFC:"+exc.getMessage() );
			throw new Exception(Errores.ERROR_RFC);
		}
		return datosBasicosVO;
	}
    
    public DatosBasicosVO getDatosBasicosDetallados(String posicion) throws Exception{
        DatosBasicosVO datosBasicosVO = null;
        try{
        	

			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_DATOS_BASICOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_POSICION", posicion);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "TABLA_2";
            
            datosBasicosVO = new DatosBasicosVO();
            String[] campos = { "Pernr", "Ename", "Plans", "Stext", "Shor2", "Direc", "Bukrs", "Butxt", "Kostl", 
                    "Ktext", "LineaReporte", "LrStext", "LrPernr", "LrEname", "Funcion", "FDesc", "division",
                    "nomDivision", "subDivision", "nomSubDivision", "cveEdificio", "nomEdificio",
                    "calleNumero", "calle", "plz", "ort", "region","abkrs","antext","vorna","nachn","nach2"};
            datosBasicosVO.setCampos(campos);
            datosBasicosVO = (DatosBasicosVO)getTableVO(datosBasicosVO);
            
        }catch(Exception exc){
            log.info("ERROR:"+LineException.getException(exc));
            log.info("ERROR_RFC:"+exc.getMessage() );
            throw new Exception(Errores.ERROR_RFC);
        }
        return datosBasicosVO;
    }
    
	public DatosBasicosVO getDatosBasicosNumero(String numEmp) throws Exception{
		List<?> lstUsuarioPos = null;
		DatosBasicosVO dbvo = null;
		try{
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_USUARIOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_EMPLEADO", numEmp);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "USUARIOS";
			
			PosicionVO pvo = new PosicionVO();
			lstUsuarioPos = getTableList(pvo);
			PosicionVO pvodesc = null;
		
			if(lstUsuarioPos!=null && lstUsuarioPos.size()>0){
				pvodesc = (PosicionVO)lstUsuarioPos.get(0);
				dbvo = obtenerDatosBasicos(pvodesc.getPosicion());
			}
		}catch(Exception exc){
			throw new Exception(exc.getMessage());
		}
		return dbvo;
	}
	
	/** Metodo encargado de obtener los datos basicos del empleado */
	public DatosBasicosVO obtenerDatosBasicos(String posicion) throws Exception {

		log.info("INICIA:::: ZRH_DATOS_BASICOS");
		log.info("Posicion Usuario = " + posicion);
		DatosBasicosVO datosBasicosVO = null;
		try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_DATOS_BASICOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_POSICION", posicion);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "TABLA_1";

			datosBasicosVO = new DatosBasicosVO();
			datosBasicosVO = (DatosBasicosVO) getTableVO(datosBasicosVO);

		} catch (Exception e) {
			log.info("ERROR:" + LineException.getException(e));
			log.info("ERROR_RFC_ZRH_DATOS_BASICOS:" + e.getMessage());
			throw new Exception(Errores.ERROR_RFC);
		}
		return datosBasicosVO;
	}
	
	/**
	 * @return ArrayList
	 */
	public List<String[]> getEstados(){
		List<String[]> lisEstadosNac     = null;
		try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_ESTADOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_PAIS", "MX");
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "ESTADOS";
			
			//this.printTable("ESTADOS");
			lisEstadosNac = this.getTableList();
	     }catch(Exception e){ 
	        org.apache.log4j.Logger.getLogger(DaoSAP.class.getClass()).info("Error: RFC Catalogo Estados"+e);
	     }
	     return lisEstadosNac;
	
	}
	
	/**
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Object> getNacionalidades(){
	    List lisPaises = new ArrayList<Object>();
		try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_NACIONALIDADES").getFunction();
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "NACIONALIDADES";
			
			lisPaises = this.getTableList();
			 LinkedHashMap aux = new  LinkedHashMap();
			for(int x = 0 ; x < lisPaises.size() ; x++)
			{
				String[] fields =  (String[]) lisPaises.get(x);
				aux.put(fields[1],fields[0]);
			}
			lisPaises = new ArrayList<Object>();
			Set set = aux.entrySet();
		    Iterator it = set.iterator();
		    while (it.hasNext()) {
			      Map.Entry entry = (Map.Entry) it.next();
			      String[] fields =  {(String)entry.getValue(),(String)entry.getKey()};
			      lisPaises.add(fields);
		    }
		}catch(Exception e){ 
			log.info("Error: RFC Catalogo Nacionalidades"+e);
		}
		return lisPaises;
	}

	@SuppressWarnings("rawtypes")
	public List getCatalogoGiros(String ramo) throws Exception {
		List lst = null;
		RamoVO rvo = new RamoVO();
		try{
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZHRGETCATRAMO").getFunction();
			// Ejecutamos el RFC
			if(ramo!=null && ramo.trim().length()>0){
				JCoParameterList inParams = function.getImportParameterList();
				//Añadimos los parametros de entrada (campo, valor)
				inParams.setValue("RAMO", ramo);
			}
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "RAMOS";
			
			lst = this.getTableListField(rvo);
		}catch(Exception exc){
			throw new Exception(Errores.ERROR_RFC);
		}
		return lst;
	}
	
}

