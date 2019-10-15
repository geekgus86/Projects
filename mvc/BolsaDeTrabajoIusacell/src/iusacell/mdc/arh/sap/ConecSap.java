/*
 * Creado el 26/09/2008
 *
 */
package iusacell.mdc.arh.sap;


import iusacell.mdc.arh.util.EncriptaCadenas.EncryptionException;

import java.util.ArrayList;

import com.sap.conn.jco.JCoField;
import com.sap.conn.jco.JCoFieldIterator;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoRepository;
import com.sap.conn.jco.JCoTable;
import org.apache.log4j.Logger;

public class ConecSap extends SapConnection{


static Logger log = Logger.getLogger(ConecSap.class);
	
	public ArrayList<Object>  Estado(String pais) throws EncryptionException{
		 ArrayList<Object> lisEstados = new ArrayList<Object>();
		 String idPais =pais;
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
			inParams.setValue("P_PAIS", idPais);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "ESTADOS";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
			

		       String land1   = "";
		       String  bland   = "";
		       String  bezei   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String estados[]= new String[3];
				        for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
		                 JCoField field = e.nextField();

						 if (field.getName().equals("LAND1")){land1 = field.getString(); }
		                 if (field.getName().equals("BLAND")){bland = field.getString(); }
					     if (field.getName().equals("BEZEI")){bezei = field.getString(); }
		 				}
				 estados[0]= land1;
				 estados[1]= bland;
				 estados[2]= bezei;
				 lisEstados.add(estados);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
		 System.out.println("2 Error  en  la  coneccion: "+e);
		}
		return lisEstados;
	}
	
	
	
	public ArrayList<Object> Municipio(String estados)
	{
		 ArrayList<Object> lisMunicipio = new ArrayList<Object>();
		 String idEstados = estados;
		   try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_MUNICIPIOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_ESTADO", idEstados);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "MUNICIPIOS";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
			   
		 
		       String  estad   = "";
		       String  munic   = "";
		       String  tmuni   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String municipio[]= new String[3];
		        	for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
		        		JCoField field = e.nextField();
		        		if (field.getName().equals("ESTAD")){estad = field.getString(); }
						if (field.getName().equals("MUNIC")){munic = field.getString(); }
						if (field.getName().equals("TMUNI")){tmuni = field.getString(); }
		 			}
				 municipio[0]= estad;
				 municipio[1]= munic;
				 municipio[2]= tmuni;
				 lisMunicipio.add(municipio);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
		 System.out.println("2 Error  en  la  coneccion: "+e);
		}
		return lisMunicipio;
	}
	
	

	
	
	public ArrayList<Object>  Formacion(String grado)
	{
		 ArrayList<Object> lisFormacion = new ArrayList<Object>();
		 String idGrado = grado;
		   try {
			   
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_FORMACIONES").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_GRADO", idGrado);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "FORMACIONES";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
			   
	        String  slart   = "";
	        String  ausbi   = "";
	        String  atext   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String formacion[]= new String[3];
				        for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
				        	JCoField field = e.nextField();

						 if (field.getName().equals("SLART")){slart = field.getString(); }
						 if (field.getName().equals("AUSBI")){ausbi = field.getString(); }
						 if (field.getName().equals("ATEXT")){atext = field.getString(); }
		 				}
				 formacion[0]= slart;
				 formacion[1]= ausbi;
				 formacion[2]= atext.replaceAll("LICENCIATURA", "LIC").replaceAll("PROFESORADO","PROF").replaceAll("TECNICATURA", "TEC").replaceAll("TRADUCTORADO","TRADUCTOR");
				 lisFormacion.add(formacion);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
		 System.out.println("2 Error  en  la  coneccion: "+e);
		}
		return lisFormacion;
	}

	
	public ArrayList<Object> Docto(String grado)
	{
		 ArrayList<Object> lisDocto = new ArrayList<Object>();
		 String idGrado = grado;
		   try {
			
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_DOCTOS_OBT").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_GRADO", idGrado);
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "DOCTOSOBT";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
			   
		       String  slart   = "";
		       String  abart   = "";
		       String  stext   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String docto[]= new String[3];
		        	 for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
				         JCoField field = e.nextField();
						 if (field.getName().equals("SLART")) slart = field.getString();
						 if (field.getName().equals("ABART")) abart = field.getString();
						 if (field.getName().equals("STEXT")) stext = field.getString();
		 			}
				 docto[0]= slart;
				 docto[1]= abart;
				 docto[2]= stext;
				 lisDocto.add(docto);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
		 System.out.println("2 Error  en  la  coneccion: "+e);
		}
		return lisDocto;
	}

	public ArrayList<Object>  Estado(String pais, String claveEdo) throws Exception{
		 ArrayList<Object> lisEstados = new ArrayList<Object>();
		 String idPais =pais;
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
			inParams.setValue("P_PAIS", idPais);
			inParams.setValue("P_REGI", claveEdo); //Validar que asi se llame el parametro en SAP
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "ESTADOS";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
				
		       String land1   = "";
		       String  bland   = "";
		       String  bezei   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String estados[]= new String[3];
		        	for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
				         JCoField field = e.nextField();

						 if (field.getName().equals("LAND1")){land1 = field.getString(); }
		                 if (field.getName().equals("BLAND")){bland = field.getString(); }
					     if (field.getName().equals("BEZEI")){bezei = field.getString(); }
		 			}
				 estados[0]= land1;
				 estados[1]= bland;
				 estados[2]= bezei;
				 lisEstados.add(estados);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
			System.out.println("2 Error  en  la  coneccion: "+e);
			throw new Exception(e.getMessage());
		}
		return lisEstados;
	}
	
	public ArrayList<Object> Municipio(String estados, String claveMcpio)throws Exception{
		 ArrayList<Object> lisMunicipio = new ArrayList<Object>();
		 String idEstados = estados;
		   try {
			   
			// Obtenemos la conexion destino
			initConnectSAP();
			// Obtenemos el repositorio, para posteriormente hacer los llamados a las
			// funciones pertenecientes a dicho repositorio.
			JCoRepository repository = destination.getRepository();
			// Hacemos el llamado al RFC (Remote Function Call)
			function = repository.getFunctionTemplate("ZRH_CAT_MUNICIPIOS").getFunction();
			// Ejecutamos el RFC
			JCoParameterList inParams = function.getImportParameterList();
			//Añadimos los parametros de entrada (campo, valor)
			inParams.setValue("P_ESTADO", idEstados);
			inParams.setValue("P_MUNIC", claveMcpio); 
			//Ejecutamos el RFC
			function.execute(destination);
			//Tabla resultado buscado
			sapTableName = "MUNICIPIOS";   
			//Resultado
			JCoTable tabOrganigrama = function.getTableParameterList().getTable(sapTableName);
			   
		       String  estad   = "";
		       String  munic   = "";
		       String  tmuni   = "";
			 if(tabOrganigrama.getNumRows()>0)
		        do {
		        	String municipio[]= new String[3];
		        	for (JCoFieldIterator e = tabOrganigrama.getFieldIterator(); e.hasNextField(); ) {
				         JCoField field = e.nextField();

						 if (field.getName().equals("ESTAD")){estad = field.getString(); }
						 if (field.getName().equals("MUNIC")){munic = field.getString(); }
						 if (field.getName().equals("TMUNI")){tmuni = field.getString(); }
		 			}
				 municipio[0]= estad;
				 municipio[1]= munic;
				 municipio[2]= tmuni;
				 lisMunicipio.add(municipio);	
		       } while (tabOrganigrama.nextRow());
		}catch(Exception e){ 
			System.out.println("2 Error  en  la  coneccion: "+e);
			throw new Exception(e.getMessage());
		}
		return lisMunicipio;
	}
	
	
}

