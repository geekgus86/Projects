package resources;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Properties;

import javax.faces.context.FacesContext;

import org.tempuri.ResultadoConsultaPedido;
import org.tempuri.WebServicesGestorPagoTiendasSoapProxy;


public class XMLConstructorAndDestructor 
{
	public static String getString(String key) {
		String valor = "";
		try {
			
			FacesContext context = FacesContext.getCurrentInstance();
			InputStream inputStream = context.getExternalContext().getResourceAsStream("/WEB-INF/connectionURL.properties");
			Properties properties = new Properties();  
            properties.load(inputStream);
			valor = properties.getProperty(key);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("Error al obtener un paramentro de archivo connectionURL.properties: "+e.toString());
		}
		return valor;
	}
	//esta variable deberia ser parametrizable en una tabla de la BD, de momento esta en codigo duro
	private String endPoint=getString("endPoint");

	/*
	 * A este metodo se le debe cambiar el nombre a como deseen
	 * la razon de ser de este metodo es consultar el pedido, y obtener un objeto
	 * que contenga toda la informacion que responde el ws del gestor de pagos, conforme al metodo consumido
	 */
	public ResultadoConsultaPedido consultarPedido(String cveTienda, String codigoTienda, String llaveTienda, String cvePedido)
	{
		float monto = -1;
		ResultadoConsultaPedido i = null;
		try
		{
			WebServicesGestorPagoTiendasSoapProxy proxy= new WebServicesGestorPagoTiendasSoapProxy();
			proxy.setEndpoint(endPoint);
			
			/* Datos de prueba */
			//cveTienda="29";
			//cvePedido="1001";
			
			String llaveEncriptada=  "5717a10d3edd741d09fc5949270f88ccb0dffb7e"; //getSHA(cveTienda+codigoTienda+llaveTienda);   //hashearSha1(cveTienda, codigoTienda, llaveTienda);
			
			i = proxy.consultaPedido(cveTienda, cvePedido, llaveEncriptada);
			monto= (float)i.getMontoTotalEnPesos();
			System.out.println("(WSConsultaPedido)Monto: " + monto);
			
			/*if(i.getResultadoWS().equals("0") && i.getDescripcionEstatus().equals("Pagado") && monto>0)
				return (int) monto;
			else
				monto = -1;*/
			
			return i;
		}
		catch(Exception ex)
		{
			System.out.println("Exception: "+ex);
			return null;
		}
		
	}
	
	
	/*
	 * //este metodo debe adaptarse para que reciba los parametros que componen la llave encriptada
		y para que devuelva la llave encriptada  en el lugar que se necesite
	 */
	public String hashearSha1(String cveTienda, String codigoTienda, String llaveTienda)
	{
		
		String password = cveTienda+codigoTienda+llaveTienda;
		 
        MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("SHA-1");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
        md.update(password.getBytes());
 
        byte byteData[] = md.digest();
 
        //forma 1 de obtener el sha1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        //forma 2 de obtener el sha1
        StringBuffer hexString = new StringBuffer();
    	for (int i=0;i<byteData.length;i++) {
    		String hex=Integer.toHexString(0xff & byteData[i]);
   	     	if(hex.length()==1) hexString.append('0');
   	     	hexString.append(hex);
    	}
    	System.out.println("Hex format : " + hexString.toString());
    	
		return hexString.toString();
	}
	
	
	public String getSHA(String cadena) {

	    String password = "Test";
	    String result = "";
	    try{
	    byte[] key = cadena.getBytes();

	    MessageDigest md = MessageDigest.getInstance("SHA-1");

	    byte[] hash = md.digest(key);

	   
	    for ( byte b : hash ) {
	        result += Integer.toHexString(b + 256) + " ";
	    }
	    }catch(Exception ex){ex.printStackTrace();}
	    //System.out.println(result);
	    return result;	
	}
	
}