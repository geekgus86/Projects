/**
 * Creado 28/07/2014
 * Clase utilizada para la comunicacion con SAP
 * 
 */
package iusacell.mdc.arh.sap;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.StringTokenizer;

import iusacell.mdc.arh.util.LineException;
import iusacell.mdc.arh.util.Login;
import iusacell.mdc.arh.util.Reflection;
import iusacell.mdc.arh.vo.ValueObject;


import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoTable;
import com.sap.conn.jco.ext.DestinationDataProvider;

/**
 * @author JAMES RANDI
 *
 */
public class SapConnection {
	
//	private Logger logger = Logger.getLogger(this.getClass());
	
	static final String DESTINATION_NAME_QA = "WebContent/WEB-INF/SAPQA_CONNECT";
	static final String DESTINATION_NAME_PRD = "WebContent/WEB-INF/SAPRD_CONNECT";
	static final String CONECTION_NAME_SAP = "sapconn";
	protected JCoFunction function = null;
	protected String sapTableName;
	protected JCoDestination destination = null;
	
	/***/
	protected void initConnectSAP() throws Exception{
	   System.out.println("Obteniendo conexion de SAP en SapConnection().");
	  
	  try{
		  Login lo = new Login();
		  Properties p = new Properties();
		  p.setProperty(DestinationDataProvider.JCO_ASHOST, lo.getIpSap());
		  p.setProperty(DestinationDataProvider.JCO_SYSNR, lo.getPuertoSap());
		  p.setProperty(DestinationDataProvider.JCO_CLIENT, lo.getClienteSap());
		  p.setProperty(DestinationDataProvider.JCO_USER, lo.getUsuSap());
		  p.setProperty(DestinationDataProvider.JCO_PASSWD, lo.getPwSap());
		  p.setProperty(DestinationDataProvider.JCO_LANG, lo.getIdiSap());
		  p.setProperty(DestinationDataProvider.JCO_POOL_CAPACITY, "3");
		  p.setProperty(DestinationDataProvider.JCO_PEAK_LIMIT, "10");
		  
		  createDestination(CONECTION_NAME_SAP, p);
		  
		  destination = JCoDestinationManager.getDestination(CONECTION_NAME_SAP);
		  
		  System.out.println(destination.getAttributes().getHost());
		
	  }catch(Exception exc){
		System.out.println("Error en constructor: SapConnection()");
		System.out.println(exc.toString());
		throw new Exception("Error al realiazar la conexion con SAP -> " + exc.getMessage());
	  }catch (Throwable e) {
		  System.out.println("Error en constructor: SapConnection()");
		  System.out.println(e.toString());
			throw new Exception("Error al realiazar la conexion con SAP -> " + e.getMessage());
	  }	finally{
//		  System.out.println(">>>>>>>>>>>>>"+System.getProperty("java.library.path"));
	  }
	}
	
	public static void createDestination (String destinationName, Properties connectProperties){
		File destCfg = new File(destinationName+".jcoDestination");
		try {
			FileOutputStream fos = new FileOutputStream(destCfg,false);
			connectProperties.store(fos, "For tests!");
			fos.close();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.toString());
		}
	}
	
	/***/
	@SuppressWarnings("rawtypes")
	protected ValueObject getTableVO(ValueObject vo) throws Exception{
		String[] campos = vo.getCampos();
		Object[] objs = null;
		ValueObject voNuevo = null;
		try{
			//log.info("campos="+campos);
			String clase = ((Class)vo.getClass()).getName();
			//log.info("clase="+clase);
			
		    Reflection ref = new Reflection(clase);
		    JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
			
			//log.info("tabla.getNumRows()="+tabla.getNumRows());
			if( tabla.getNumRows()>0) {
				//int numColumns = tabla.getNumColumns();
				voNuevo = (ValueObject)vo.getClass().newInstance();
				for(int j=0; campos!=null && j<campos.length; j++){
					objs = new Object[1];
					//Asignar Valor Mediante Reflexion
					String valor = (String)tabla.getValue(j).toString();
					
					//log.info("valor="+valor);
					objs[0] = valor;
					String metodo = ref.getMethod("set"+campos[j]);
					
					//log.info("metodo="+metodo);
					ref.setValorMetodo(metodo, voNuevo, objs);
				}
			}
		}catch(Exception exc){
			System.out.println("Error al obtener datos de la tabla mediante reflexion");
			throw new Exception("ERROR_RFC");
		}
		return voNuevo;
	}	
	
	/**
	 * Regresa una lista de String[] este arreglo contiene
	 * los valores de las columnas en el orden que 
	 * vienen de la tabla
	 * @return List
	 * @throws Exception
	 */
	protected List<String[]> getTableList() throws Exception{
		List<String[]> listaFields = null;
		try{
			JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
			//log.info( this.sapRFC+" tabla.getNumRows():"+tabla.getNumRows());
			listaFields = new ArrayList<String[]>();
			//log.info("FILAS:"+tabla.getNumRows());
			if(tabla.getNumRows()!=0) {
				int numColumns = tabla.getNumColumns();
				//log.info("NUMERO DE COLUMNAS:"+numColumns);
				for(int i=0;i<tabla.getNumRows();i++){
					String[] fields = new String[numColumns];
					for(int j=0;fields!=null && j<fields.length;j++){
						fields[j] = (String)tabla.getValue(j);
						//log.info("CAMPO[" +tabla.getName(j)+ "," +tabla.getValue(j)+ "]");
					}
					listaFields.add(fields);
					tabla.nextRow();
				}
			}
		}catch(Exception exc){
			System.out.println("ERROR:"+LineException.getException(exc));
			System.out.println("Error al obtener datos de la tabla");
			throw new Exception("ERROR_RFC");
		}
		return listaFields;
	}
	
	/**
	 * Regresa una lista de ValueObject el valueobject contiene
	 * la informacion por fila en el orden que se especifique en 
	 * la variable campos del ValueObject, 
	 * @param vo ValueObject
	 * @return List
	 * @throws Exception
	 */
	protected List<ValueObject> getTableList(ValueObject vo) throws Exception{
		List<ValueObject> listaFields =new ArrayList<ValueObject>();
		String[] campos = vo.getCampos();
		Object[] objs = null;
		try{
			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
		    Reflection ref = new Reflection(clase);
		    JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
			if(tabla.getNumRows()!=0) {
//				int numColumns = tabla.getNumColumns();
				ValueObject voNuevo = null;
				for(int i=0;i<tabla.getNumRows();i++){
					voNuevo = (ValueObject)vo.getClass().newInstance();
					for(int j=0; campos!=null && j<campos.length; j++){
						objs = new Object[1];
						//Asignar Valor Mediante Reflexion
						//String valor = (String)tabla.getValue(j);
						String valor = "";
						try{
							valor = (String)tabla.getValue(j);
						}catch(ClassCastException e){
							Date valorFec = (Date)tabla.getValue(j);
							valor = valorFec.toString();
						}
						
						objs[0] = valor;
						String metodo = ref.getMethod("set"+campos[j]);
						ref.setValorMetodo(metodo, voNuevo, objs);
					}
					listaFields.add(voNuevo);
					tabla.nextRow();
				}
			}
		}catch(Exception exc){
			System.out.println("Error al obtener datos de la tabla mediante reflexion");
			System.out.println("ERROR:"+LineException.getException(exc));
			throw new Exception("ERROR_RFC");
		}
		return listaFields;
	}
	
	/**
	 * Regresa una lista de ValueObject el valueobject contiene
	 * la informacion por fila en el orden que se especifique en 
	 * la variable campos del ValueObject y con los valores q se especifiquen
	 * @param vo ValueObject
	 * @return List
	 * @throws Exception
	 */
	protected List<ValueObject> getTableListField(ValueObject vo) throws Exception{
		List<ValueObject> listaFields =new ArrayList<ValueObject>();
		String[] campos = vo.getCampos();
		//log.info("CAMPOS:"+campos.length);
		Object[] objs = null;
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		try{
			String clase = ((Class<? extends ValueObject>)vo.getClass()).getName();
		    Reflection ref = new Reflection(clase);
		    //log.info("sapTableName:"+sapTableName);
		    JCoTable tabla = function.getTableParameterList().getTable(sapTableName);
			//log.info("tabla.getNumColumns():"+tabla.getNumColumns());
			//log.info("tabla.getNumRows():"+tabla.getNumRows());
			if(tabla.getNumRows()!=0) {
				//int numColumns = campos.length;
				//log.info("NUMERO DE COLUMNAS:"+numColumns);
				ValueObject voNuevo = null;
				for(int i=0;i<tabla.getNumRows();i++){
					voNuevo = (ValueObject)vo.getClass().newInstance();
					for(int j=0; campos!=null && j<campos.length; j++){
						StringTokenizer st = new StringTokenizer(campos[j], "|");
						String campoOV = st.nextToken();
						String campoSap = st.nextToken();
						//log.info("[" +campoOV+ "," +campoSap+ "]");
						objs = new Object[1];
						//Asignar Valor Mediante Reflexion
						String valor = null;
						Object obj = (Object)tabla.getValue(campoSap);
						if(obj instanceof java.util.Date){
							valor = sdf.format(obj);
						}else
							valor = String.valueOf(obj);
						objs[0] = valor;
						String metodo = ref.getMethod("set"+campoOV);
						ref.setValorMetodo(metodo, voNuevo, objs);
					}
					listaFields.add(voNuevo);
					tabla.nextRow();
				}
			}
		}catch(Exception exc){
			System.out.println("Error al obtener datos de la tabla mediante reflexion");
			System.out.println("ERROR:"+LineException.getException(exc));
			throw new Exception("ERROR_RFC");
		}
		return listaFields;
	}
	
}
