///**
// * Creado 22/05/2009
// * Clase utilizada para la comunicacion con SAP
// * 
// */
//package iusacell.mdc.arh.sap;
//
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.StringTokenizer;
//
//import iusacell.mdc.arh.util.Login;
//import iusacell.mdc.arh.util.LineException;
//import iusacell.mdc.arh.util.Reflection;
//import iusacell.mdc.arh.vo.ValueObject;
//
//import org.apache.log4j.Logger;
//
//import com.sap.mw.jco.IFunctionTemplate;
//import com.sap.mw.jco.IMetaData;
//import com.sap.mw.jco.JCO;
//import com.sap.mw.jco.JCO.Client;
//import com.sap.mw.jco.JCO.Field;
//import com.sap.mw.jco.JCO.FieldIterator;
//import com.sap.mw.jco.JCO.Function;
//import com.sap.mw.jco.JCO.ParameterList;
//import com.sap.mw.jco.JCO.Repository;
//import com.sap.mw.jco.JCO.Table;
//
///**
// * @author ESM
// *
// */
//public class ConexionSap {
//	
//	private Logger log = Logger.getLogger(this.getClass());
//
//	private Repository repositorio = null;
//	protected Client client = null;
//	protected Function function = null;
//	
//	public ParameterList input;
//	public ParameterList output;
//	public ParameterList tablesList;
//	private String sapRFC;
//	private String sapTableName;
//	private String sapStruct;
//	private boolean importParameter;
//	private boolean exportParameter;
//	private boolean assignParameter;
//	private boolean importTables;
//	private boolean debug;
//	private ValueObject valueObject;
//	private List<String[]> lstStructure;
//	
//	public ConexionSap() {
//		input   = JCO.createParameterList();
//		output = JCO.createParameterList();
//		tablesList = JCO.createParameterList();
//	}
//
//	/**
//	 * Ejecuta la funcion previamente especificada en setSapRFC
//	 * Importa los parametros previamente especificados, si se activo la bandera setImportParameter
//	 * Exporta los parametros previamente especificados, si se activo la bandera setExportParameter
//	 * @throws Exception
//	 */
//	protected void execute() throws Exception{
//		try{
//			Login login = new Login();
//			client = JCO.createClient(login.getMaxNumeroConexiones(), login.getUsuSap(), login.getPwSap(), login.getIdiSap(), login.getIpSap(), login.getR3Name(), login.getGrupoSap());
//			client.connect();
//			repositorio = new JCO.Repository("RepositorioSAP", client);
//			function = this.createFunction( sapRFC );
//			if(debug)
//			    client.setAbapDebug(true);
//			if(importParameter)
//				function.setImportParameterList(input);
//			if( assignParameter && !importParameter){
//				initAssignParameter();
//				function.setImportParameterList(input);
//			}
//			if(exportParameter)
//				function.setExportParameterList(output);
//			client.execute(function);
//			client.disconnect();
//		}catch(Exception exc){
//			log.info("ERROR AL EJECUTAR LA FUNCION");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//	}
//	
//	public void executeConsults() throws Exception{
//		try{
//			Login login = new Login();
//			client = JCO.createClient(login.getMaxNumeroConexiones(), login.getUsuSap(), login.getPwSap(), login.getIdiSap(), login.getIpSap(), login.getR3Name(), login.getGrupoSap());
//			client.connect();
//			repositorio = new JCO.Repository("RepositorioSAP", client);
//			//log.info("sapRFC:"+sapRFC);
//			function = this.createFunction( sapRFC );
//			if(sapStruct!=null && sapStruct.trim().length()>0){
//				lstStructure = new ArrayList<String[]>();
//				IMetaData metaData = repositorio.getStructureDefinition(sapStruct);
//				JCO.Structure struct = new JCO.Structure(metaData);
//				String[] valorExport = null;
//				for(int i=0;struct!=null && i<struct.getFieldCount();i++){
//					valorExport = new String[5];
//						valorExport[0] = (String)struct.getName(i);
//						valorExport[1] = String.valueOf(struct.getType(i)) +"-"+ struct.getTypeAsString(i);
//						valorExport[2] = String.valueOf(struct.getLength(i));
//						valorExport[3] = String.valueOf(struct.getDescription(i));
//						valorExport[4] = String.valueOf(struct.isOptional(i));
//						lstStructure.add(valorExport);
//				}
//			}
//			client.disconnect();
//		}catch(Exception exc){
//			log.info("ERROR AL EJECUTAR LA CONSULTA");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//	};
//	
//	protected void executeFunction() throws Exception{
//		try{
//			if(debug)
//			    client.setAbapDebug(true);
//			if(importParameter)
//				function.setImportParameterList(input);
//			if( assignParameter && !importParameter){
//				initAssignParameter();
//				function.setImportParameterList(input);
//			}
//			if(exportParameter)
//				function.setExportParameterList(output);
//			if(importTables){
//				function.setTableParameterList(tablesList);
//			}
//			client.execute(function);
//			client.disconnect();
//		}catch(Exception exc){
//			log.info("ERROR AL EJECUTAR LA FUNCION");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//	};
//	
//	protected void createFunction() throws Exception{
//		try{
//			Login login = new Login();
//			client = JCO.createClient(login.getMaxNumeroConexiones(), login.getUsuSap(), login.getPwSap(), login.getIdiSap(), login.getIpSap(), login.getR3Name(), login.getGrupoSap());
//			client.connect();
//			repositorio = new JCO.Repository("RepositorioSAP", client);
//			function = this.createFunction( sapRFC );
//		}catch(Exception exc){
//			log.info("ERROR AL EJECUTAR LA FUNCION");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//	};
//	
//	
//	private void initAssignParameter() throws Exception{
//		try{
//			List<?> listaImport = getImportParameter();
//			String[] campos = valueObject.getCampos();
//			int[] longitudes = valueObject.getLongitudes();
//			String clase = ((Class<? extends ValueObject>)valueObject.getClass()).getName();
//		    Reflection ref = new Reflection(clase);
//			for(int i=0; listaImport!=null && i<listaImport.size(); i++){
//				String[] imports = (String[])listaImport.get(i);
//				String metodo = ref.getMethod("get"+campos[i]);
//				Object  obj = ref.getValorMetodo(metodo, valueObject);
//				input.addInfo(imports[0], Integer.parseInt(imports[1]), longitudes[i]);
//				input.setValue((obj!=null ? obj : ""), imports[0] );
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//	}
//	
//	/**
//	 * Regresa una lista de String[] este arreglo contiene
//	 * los valores de las columnas en el orden que 
//	 * vienen de la tabla
//	 * @return Map
//	 * @throws Exception
//	 */
//	protected Map<String, String> getTableMap(String[] nameKeys) throws Exception{
//		Map<String, String> mapa = null;
//		try{
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			//log.info("tabla.getNumRows():"+tabla.getNumRows());
//			mapa = new HashMap<String, String>();
//			if(tabla.getNumRows()!=0) {
//				int numColumns = tabla.getNumColumns();
//				//log.info("NUMERO DE COLUMNAS:"+numColumns);
//				if( tabla.getNumRows()>0) {
//					for(int j=0;j<numColumns;j++){
//						mapa.put(nameKeys[j], (String)tabla.getValue(j));
//					}
//				}
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			log.info("Error al obtener datos de la tabla");
//			throw new Exception("ERROR_RFC");
//		}
//		return mapa;
//	}
//	
//	/**
//	 * Regresa una lista de String[] este arreglo contiene
//	 * los valores de las columnas en el orden que 
//	 * vienen de la tabla
//	 * @return List
//	 * @throws Exception
//	 */
//	protected List<String[]> getTableList() throws Exception{
//		List<String[]> listaFields = null;
//		try{
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			//log.info( this.sapRFC+" tabla.getNumRows():"+tabla.getNumRows());
//			listaFields = new ArrayList<String[]>();
//			//log.info("FILAS:"+tabla.getNumRows());
//			if(tabla.getNumRows()!=0) {
//				int numColumns = tabla.getNumColumns();
//				//log.info("NUMERO DE COLUMNAS:"+numColumns);
//				for(int i=0;i<tabla.getNumRows();i++){
//					String[] fields = new String[numColumns];
//					for(int j=0;fields!=null && j<fields.length;j++){
//						fields[j] = (String)tabla.getValue(j);
//						//log.info("CAMPO[" +tabla.getName(j)+ "," +tabla.getValue(j)+ "]");
//					}
//					listaFields.add(fields);
//					tabla.nextRow();
//				}
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			log.info("Error al obtener datos de la tabla");
//			throw new Exception("ERROR_RFC");
//		}
//		return listaFields;
//	}
//	
//	/**
//	 * Regresa una lista de ValueObject el valueobject contiene
//	 * la informacion por fila en el orden que se especifique en 
//	 * la variable campos del ValueObject, 
//	 * @param vo ValueObject
//	 * @return List
//	 * @throws Exception
//	 */
//	protected List<ValueObject> getTableList(ValueObject vo) throws Exception{
//		List<ValueObject> listaFields =new ArrayList<ValueObject>();
//		String[] campos = vo.getCampos();
//		Object[] objs = null;
//		try{
//			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
//		    Reflection ref = new Reflection(clase);
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			if(tabla.getNumRows()!=0) {
////				int numColumns = tabla.getNumColumns();
//				ValueObject voNuevo = null;
//				for(int i=0;i<tabla.getNumRows();i++){
//					voNuevo = (ValueObject)vo.getClass().newInstance();
//					for(int j=0; campos!=null && j<campos.length; j++){
//						objs = new Object[1];
//						//Asignar Valor Mediante Reflexion
//						//String valor = (String)tabla.getValue(j);
//						String valor = "";
//						try{
//							valor = (String)tabla.getValue(j);
//						}catch(ClassCastException e){
//							Date valorFec = (Date)tabla.getValue(j);
//							valor = valorFec.toString();
//						}
//						
//						objs[0] = valor;
//						String metodo = ref.getMethod("set"+campos[j]);
//						ref.setValorMetodo(metodo, voNuevo, objs);
//					}
//					listaFields.add(voNuevo);
//					tabla.nextRow();
//				}
//			}
//		}catch(Exception exc){
//			log.info("Error al obtener datos de la tabla mediante reflexion");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return listaFields;
//	}
//
//	/**
//	 * Regresa una lista de ValueObject el valueobject contiene
//	 * la informacion por fila en el orden que se especifique en 
//	 * la variable campos del ValueObject y con los valores q se especifiquen
//	 * @param vo ValueObject
//	 * @return List
//	 * @throws Exception
//	 */
//	protected List<ValueObject> getTableListField(ValueObject vo) throws Exception{
//		List<ValueObject> listaFields =new ArrayList<ValueObject>();
//		String[] campos = vo.getCampos();
//		//log.info("CAMPOS:"+campos.length);
//		Object[] objs = null;
//		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//		try{
//			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
//		    Reflection ref = new Reflection(clase);
//		    //log.info("sapTableName:"+sapTableName);
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			//log.info("tabla.getNumColumns():"+tabla.getNumColumns());
//			//log.info("tabla.getNumRows():"+tabla.getNumRows());
//			if(tabla.getNumRows()!=0) {
//				//int numColumns = campos.length;
//				//log.info("NUMERO DE COLUMNAS:"+numColumns);
//				ValueObject voNuevo = null;
//				for(int i=0;i<tabla.getNumRows();i++){
//					voNuevo = (ValueObject)vo.getClass().newInstance();
//					for(int j=0; campos!=null && j<campos.length; j++){
//						StringTokenizer st = new StringTokenizer(campos[j], "|");
//						String campoOV = st.nextToken();
//						String campoSap = st.nextToken();
//						//log.info("[" +campoOV+ "," +campoSap+ "]");
//						objs = new Object[1];
//						//Asignar Valor Mediante Reflexion
//						String valor = null;
//						Object obj = (Object)tabla.getValue(campoSap);
//						if(obj instanceof java.util.Date){
//							valor = sdf.format(obj);
//						}else
//							valor = String.valueOf(obj);
//						objs[0] = valor;
//						String metodo = ref.getMethod("set"+campoOV);
//						ref.setValorMetodo(metodo, voNuevo, objs);
//					}
//					listaFields.add(voNuevo);
//					tabla.nextRow();
//				}
//			}
//		}catch(Exception exc){
//			log.info("Error al obtener datos de la tabla mediante reflexion");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return listaFields;
//	}
//	
//	/**
//	 * Regresa una lista de String[] este arreglo contiene
//	 * los valores de las columnas en el orden que 
//	 * vienen de la tabla
//	 * @return List
//	 * @throws Exception
//	 */
//	protected List<String[]> getTableListField(String[] camposSAP) throws Exception{
//		List<String[]> listaFields = null;
//		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//		try{
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			//log.info( this.sapRFC+" tabla.getNumRows():"+tabla.getNumRows());
//			listaFields = new ArrayList<String[]>();
//			//log.info("FILAS:"+tabla.getNumRows());
//			if(tabla.getNumRows()!=0) {
//				int numColumns = camposSAP.length;
//				//log.info("NUMERO DE COLUMNAS:"+numColumns);
//				for(int i=0;i<tabla.getNumRows();i++){
//					String[] fields = new String[numColumns];
//					for(int j=0;fields!=null && j<fields.length;j++){
//						String valor = null;
//						Object obj = (Object)tabla.getValue(camposSAP[j]);
//						if(obj instanceof java.util.Date){
//							valor = sdf.format(obj);
//						}else
//							valor = String.valueOf(obj);
//						fields[j] = valor;
//						//log.info("CAMPO[" +tabla.getName(j)+ "," +tabla.getValue(j)+ "]");
//					}
//					listaFields.add(fields);
//					tabla.nextRow();
//				}
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			log.info("Error al obtener datos de la tabla");
//			throw new Exception("ERROR_RFC");
//		}
//		return listaFields;
//	}
//	
//	/**
//	 * Regresa un ValueObject que contiene
//	 * la informacion de la fila devuelta por la cosulta SAP,
//	 * en el orden que se especifique en la variable campos del ValueObject, 
//	 * @param vo ValueObject
//	 * @return List
//	 * @throws Exception
//	 */
//	protected ValueObject getTableVO(ValueObject vo) throws Exception{
//		String[] campos = vo.getCampos();
//		Object[] objs = null;
//		ValueObject voNuevo = null;
//		try{
//			//log.info("campos="+campos);
//			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
//			//log.info("clase="+clase);
//			
//		    Reflection ref = new Reflection(clase);
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			
//			//log.info("tabla.getNumRows()="+tabla.getNumRows());
//			if( tabla.getNumRows()>0) {
//				//int numColumns = tabla.getNumColumns();
//				voNuevo = (ValueObject)vo.getClass().newInstance();
//				for(int j=0; campos!=null && j<campos.length; j++){
//					objs = new Object[1];
//					//Asignar Valor Mediante Reflexion
//					String valor = (String)tabla.getValue(j).toString();
//					
//					//log.info("valor="+valor);
//					objs[0] = valor;
//					String metodo = ref.getMethod("set"+campos[j]);
//					
//					//log.info("metodo="+metodo);
//					ref.setValorMetodo(metodo, voNuevo, objs);
//				}
//			}
//		}catch(Exception exc){
//			log.info("Error al obtener datos de la tabla mediante reflexion");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return voNuevo;
//	}
//	
//	
//	protected ValueObject getTableVOCAmb(ValueObject vo) throws Exception{
//		String[] campos = vo.getCampos();
//		Object[] objs = null;
//		ValueObject voNuevo = null;
//		try{
//			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
//		    Reflection ref = new Reflection(clase);
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			if( tabla.getNumRows()>0) {
//				//int numColumns = tabla.getNumColumns();
//				voNuevo = (ValueObject)vo.getClass().newInstance();
//				for(int j=0; campos!=null && j<campos.length; j++){
//					objs = new Object[1];
//					//Asignar Valor Mediante Reflexion
//					String valor = (String)tabla.getValue(j).toString();
//					objs[0] = valor;
//					String metodo = ref.getMethod("set"+campos[j]);
//					ref.setValorMetodo(metodo, voNuevo, objs);
//				}
//			}
//		}catch(Exception exc){
//			log.info("Error al obtener datos de la tabla mediante reflexion");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return voNuevo;
//	}	
//	
//	/**
//	 * Obtiene el parametro especificado
//	 * @param parametro
//	 * @return Object
//	 * @throws Exception
//	 */
//	protected Object getParameter(String parametro) throws Exception{
//		Object obj = null;
//		try{
//			obj = function.getExportParameterList().getValue(parametro);
//		}catch(Exception exc){
//			log.info("Error al obtener PARAMETRO");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return obj;
//	}
//	
//	/**
//	 * Regresa una lista de String[nombre, tipo, longitud] de los parametros a importar
//	 * @return List
//	 * @throws Exception
//	 */
//	public List<String[]> getImportParameter() throws Exception{
//		List<String[]> lst = null;
//		String[] listParameter = null;
//		try{
//			lst = new ArrayList<String[]>();
//			ParameterList importFields = function.getImportParameterList();
//			FieldIterator fi = null;
//			if(importFields!=null)
//				fi =importFields.fields();
//			for(; fi!=null && fi.hasMoreFields();){
//				Field f = fi.nextField();
//				listParameter = new String[5];
//				listParameter[0] = f.getName();
//				listParameter[1] = String.valueOf(f.getType()) +"-"+ f.getTypeAsString();
//				listParameter[2] = String.valueOf(f.getLength())+"-"+String.valueOf(f.getValue());
//				listParameter[3] = f.getDescription();
//				listParameter[4] = String.valueOf(f.isOptional());
//				lst.add(listParameter);
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			log.info("Error al obtener datos de la tabla");
//			throw new Exception("ERROR_RFC");
//		}
//		return lst;
//	}
//	
//	/**
//	 * Regresa una lista de String[nombre, tipo, longitud] de los parametros a exportar
//	 * @return List
//	 * @throws Exception
//	 */
//	public List<String[]> getExportParameter() throws Exception{
//		List<String[]> lst = null;
//		String[] listParameter = null;
//		try{
//			lst = new ArrayList<String[]>();
//			ParameterList exportFields = function.getExportParameterList();
//			FieldIterator fi = null;
//			if(exportFields!=null)
//				fi = exportFields.fields();
//			for(; fi!=null && fi.hasMoreFields();){
//				Field f = fi.nextField();
//				listParameter = new String[5];
//				listParameter[0] = f.getName();
//				listParameter[1] = String.valueOf(f.getType()) +"-"+ f.getTypeAsString();
//				listParameter[2] = String.valueOf(f.getLength())+"-"+String.valueOf(f.getValue());
//				listParameter[3] = f.getDescription();
//				listParameter[4] = String.valueOf(f.isOptional());
//				lst.add(listParameter);
//			}
//		}catch(Exception exc){
//			log.info("Error al obtener datos de la tabla");
//			log.info("ERROR:"+LineException.getException(exc));
//			throw new Exception("ERROR_RFC");
//		}
//		return lst;
//	}
//	
//	/**
//	 * Regresa el nombre las columnas de la tabla
//	 * @return String[]
//	 * @throws Exception
//	 */
//	public List<String[]> getTableNameColumn() throws Exception{
//		List<String[]> listaNameColumns = null;
//		try{
//			Table tabla = function.getTableParameterList().getTable(getSapTableName());
//			int numColumns = tabla.getNumColumns();
//			listaNameColumns = new ArrayList<String[]>();
//			String[] valorExport = null;
//			for(int j=0; j<numColumns;j++){
//				valorExport = new String[5];
//				valorExport[0] = (String)tabla.getName(j);
//				valorExport[1] = String.valueOf(tabla.getType(j)) +"-"+ tabla.getTypeAsString(j);
//				valorExport[2] = String.valueOf(tabla.getLength(j));
//				valorExport[3] = tabla.getDescription(j);
//				valorExport[4] = String.valueOf(tabla.isOptional(j));
//				listaNameColumns.add(valorExport);
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//			log.info("Error al obtener datos de la tabla");
//			throw new Exception("ERROR_RFC");
//		}
//		return listaNameColumns;
//	}
//	
//	protected void printTable(String table){
//		try{
//			//log.info("TABLA:"+ table);
//			Table tabla = function.getTableParameterList().getTable(table);
//			if(tabla.getNumRows()!=0) {
//				for(int i=0;i<tabla.getNumRows();i++){
//					for(int j=0; tabla!=null && j<tabla.getNumColumns();j++){
//						log.info("CAMPO[" +tabla.getName(j)+ "," +String.valueOf(tabla.getValue(j))+ "]");
//					}
//					tabla.nextRow();
//				}
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//		}
//	}
//	
//	protected void printParameter(){
//		try{
//			ParameterList pl = function.getImportParameterList();
//			for(int i=0; pl!=null && i<pl.getNumFields();i++){
//				Field field = pl.getField(i);
//				log.info("["+field.getName() +":"+field.getValue()+"]");
//			}
//		}catch(Exception exc){
//			log.info("ERROR:"+LineException.getException(exc));
//		}
//	}
//	/**
//	 * Crea una funcion SAP a partir de la conexion del repositorio
//	 * @param name String
//	 * @return Function
//	 * @throws Exception
//	 */
//	private Function createFunction(String name) throws Exception {
//		try {
//			IFunctionTemplate ft = repositorio.getFunctionTemplate(name.toUpperCase());
//			//log.info("FUNCION:"+ft);
//	        if (ft == null)
//	        	return null;
//	        return ft.getFunction();
//		}catch (Exception ex) {
//			log.info("Error al crear la funcion");
//			log.info("ERROR:"+LineException.getException(ex));
//			throw new Exception("ERROR_RFC");
//		}
//	}
//
//	/**
//	 * @param sapRFC String
//	 */
//	public void setSapRFC(String sapRFC) {
//		this.sapRFC = sapRFC;
//	}
//	
//	/**
//	 * @param importParameter boolean
//	 */
//	public void setImportParameter(boolean importParameter) {
//		this.importParameter = importParameter;
//	}
//	
//	/**
//	 * @param exportParameter boolean
//	 */
//	public void setExportParameter(boolean exportParameter) {
//		this.exportParameter = exportParameter;
//	}
//
//	/**
//	 * @param sapTableName String
//	 */
//	public void setSapTableName(String sapTableName) {
//		this.sapTableName = sapTableName;
//	}
//
//	/**
//	 * @param assignParameter boolean
//	 */
//	public void setAssignParameter(boolean assignParameter) {
//		this.assignParameter = assignParameter;
//	}
//
//	/**
//	 * @param valueObject ValueObject
//	 */
//	public void setValueObject(ValueObject valueObject) {
//		this.valueObject = valueObject;
//	}
//
//
//    /**
//     * @return Returns the debug.
//     */
//    public boolean isDebug() {
//        return debug;
//    }
//    /**
//     * @param debug The debug to set.
//     */
//    public void setDebug(boolean debug) {
//        this.debug = debug;
//    }
//
//	/**
//	 * Retorna el valor de importTables
//	 * @return boolean
//	 */
//	public boolean isImportTables() {
//		return importTables;
//	}
//
//	/**
//	 * Asigna importTables
//	 * @param importTables boolean
//	 */
//	public void setImportTables(boolean importTables) {
//		this.importTables = importTables;
//	}
//
//	/**
//	 * Retorna el valor de sapStruct
//	 * @return String
//	 */
//	public String getSapStruct() {
//		return sapStruct;
//	}
//
//	/**
//	 * Asigna sapStruct
//	 * @param sapStruct String
//	 */
//	public void setSapStruct(String sapStruct) {
//		this.sapStruct = sapStruct;
//	}
//
//	/**
//	 * Retorna el valor de lstStructure
//	 * @return List
//	 */
//	public List<String[]> getLstStructure() {
//		return lstStructure;
//	}
//
//	/**
//	 * Asigna lstStructure
//	 * @param lstStructure List
//	 */
//	public void setLstStructure(List<String[]> lstStructure) {
//		this.lstStructure = lstStructure;
//	}
//
//	public String getSapTableName() {
//		return sapTableName;
//	}
//}
