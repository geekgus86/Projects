/*
 * Created on 28/10/2008
 *
 */
package iusacell.mdc.arh.util;

import iusacell.mdc.arh.business.IParametros;
import iusacell.mdc.arh.business.impl.ParametrosImpl;
import iusacell.mdc.arh.entities.ParametrosVO;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.List;

import org.apache.log4j.Logger;


/**
 * 
 * @author jarredondoi
 *
 */
public class ConnectDS {

	private static final Logger log =Logger.getLogger(ConnectDS.class);
	private static Driver driver = null;
	
	public ConnectDS() {
		super();
	}

	/**
	 * Genera la conexion obteniendo los parametros de MDC_CAT_PARAMTROS
	 * @return
	 * @throws Exception 
	 */
	public static synchronized Connection getConnection() throws Exception {
		
		IParametros iparam = null;
        List<ParametrosVO> params = null;
        String ip = "";
        String port = "";
        String sid = "";
        String usr = "";
        String pass = "";
		
		try{
            EncriptaCadenas ec = new EncriptaCadenas("DES", "SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS01DESEPTIEMBREDEL2008");
            iparam = new ParametrosImpl();
            String[] claves = {"ipMDCBolsa","portMDCBolsa","sidMDCBolsa","usrMDCBolsa","passMDCBolsa"};
            params = iparam.selectListaParametroByLlave(claves);
            
            for (ParametrosVO pa : params) {
				if(pa.getParamLlave().equals("ipMDCBolsa")){
					ip = ec.decrypt(pa.getParamValor());
				}
				if(pa.getParamLlave().equals("portMDCBolsa")){
					port = ec.decrypt(pa.getParamValor());
				}
				if(pa.getParamLlave().equals("sidMDCBolsa")){
					sid = ec.decrypt(pa.getParamValor());
				}
				if(pa.getParamLlave().equals("usrMDCBolsa")){
					usr = ec.decrypt(pa.getParamValor());
				}
				if(pa.getParamLlave().equals("passMDCBolsa")){
					pass = ec.decrypt(pa.getParamValor());
				}
			}

        }catch(Exception e){
            throw new Exception("Error al obtener parametros del MDC: " + e.getMessage());
        }
		Connection con = null;
		if (driver == null) {
			try {

				Class.forName("oracle.jdbc.driver.OracleDriver");
				con = DriverManager.getConnection("jdbc:oracle:thin:@" + ip + ":" + port + ":" + sid , usr, pass);

			} catch (Exception e) {
				log.error("Error en metodo: getConnection" + e.getMessage());
			}
		}
		return con;
	}
	
}
