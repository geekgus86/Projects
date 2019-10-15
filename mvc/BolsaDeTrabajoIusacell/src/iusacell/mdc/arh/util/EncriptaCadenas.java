package iusacell.mdc.arh.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.log4j.Logger;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class EncriptaCadenas
{
	static Logger log = Logger.getLogger(EncriptaCadenas.class);
    public static class EncryptionException extends Exception {
		private static final long serialVersionUID = 1L;

		public EncryptionException(Throwable t)
        {
            super(t);
        }
    }


    public static final String DESEDE_ESQUEMA_ENCRIPT = "DESede";
    public static final String DES_ESQUEMA_ENCRIPT = "DES";
    public static final String DEFAULT_ENCRIPT_KEY = "SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS01DESEPTIEMBREDEL2008";
    												      
    private KeySpec keySpec;
    private SecretKeyFactory keyFactory;
    private Cipher cipher;
    private static final String UNICODE_FORMAT = "UTF8";

    public EncriptaCadenas(String encript_esquema)
        throws EncryptionException
    {
        this(encript_esquema, "test");
    }

    public EncriptaCadenas(String encript_esquema, String encript_key)
        throws EncryptionException
    {
        if(encript_key == null)
        {
        	log.info("ERROR - key fue null");
            throw new IllegalArgumentException("key fue null");
        }
        if(encript_key.trim().length() < 24)
        {
        	log.info("ERROR - key tienen menos de 24 caracteres");
            throw new IllegalArgumentException("key tienen menos de 24 caracteres");
        }
        try
        {
            byte keyAsBytes[] = encript_key.getBytes(UNICODE_FORMAT);
            if(encript_esquema.equals("DESede"))
            {
                keySpec = new DESedeKeySpec(keyAsBytes);
            } else
            if(encript_esquema.equals("DES"))
            {
                keySpec = new DESKeySpec(keyAsBytes);
            } else
            {
            	log.info("ERROR - Esquema de encriptaci\363n no soportado: " + encript_esquema);
                throw new IllegalArgumentException("Esquema de encriptaci\363n no soportado: " + encript_esquema);
            }
            keyFactory = SecretKeyFactory.getInstance(encript_esquema);
            cipher = Cipher.getInstance(encript_esquema);
        }
        catch(InvalidKeyException e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
        catch(UnsupportedEncodingException e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
        catch(NoSuchAlgorithmException e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
        catch(NoSuchPaddingException e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
    }

    public String encrypt(String unencryptedString)
        throws EncryptionException
    {
        if(unencryptedString == null || unencryptedString.trim().length() == 0)
        {
        	log.info("ERROR - unencrypted string was null or empty");
            throw new IllegalArgumentException("unencrypted string was null or empty");
        }
        try
        {
            javax.crypto.SecretKey key = keyFactory.generateSecret(keySpec);
            cipher.init(1, key);
            byte cleartext[] = unencryptedString.getBytes(UNICODE_FORMAT);
            byte ciphertext[] = cipher.doFinal(cleartext);
            BASE64Encoder base64encoder = new BASE64Encoder();
            return base64encoder.encode(ciphertext);
        }
        catch(Exception e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
    }

    public String decrypt(String encryptedString)
        throws EncryptionException
    {
        if(encryptedString == null || encryptedString.trim().length() <= 0)
        {
        	log.info("ERROR - encrypted string was null or empty");
            throw new IllegalArgumentException("encrypted string was null or empty");
        }
        try
        {
            javax.crypto.SecretKey key = keyFactory.generateSecret(keySpec);
            cipher.init(2, key);
            BASE64Decoder base64decoder = new BASE64Decoder();
            byte cleartext[] = base64decoder.decodeBuffer(encryptedString);
            byte ciphertext[] = cipher.doFinal(cleartext);
            return bytes2String(ciphertext);
        }
        catch(Exception e)
        {
        	log.info("ERROR - "+e);
            throw new EncryptionException(e);
        }
    }

    private static String bytes2String(byte bytes[])
    {
        StringBuffer stringBuffer = new StringBuffer();
        for(int i = 0; i < bytes.length; i++)
        {
            stringBuffer.append((char)bytes[i]);
        }

        return stringBuffer.toString();
    }
    
//    public static String encriptaLineasExternas(String cadena) throws Exception{
//		StringBuffer car = new StringBuffer();		  
//		try{
//			DecimalFormat df = new DecimalFormat("00");
//			String longitud = df.format(cadena.length());
//			cadena = longitud + cadena;
//			int total = cadena.length();
//			for(int j=total;j<22;j++){
//				cadena = cadena + String.valueOf((int)(Math.random()*9+0));
//			}
//			for(int i=0; i<cadena.length();i++){
//				car.append(LoadMapAuth.getInstance().props.getProperty(cadena.substring(i, i+1).toUpperCase()));
//			}
//		}catch(Exception exc){
//			throw new Exception(exc.getMessage());
//		}
//		return car.toString();
//	}
//    
//    public static String desencriptaLineasExternas(String strMapaCaracteres) throws Exception{
//		StringBuffer usuario = new StringBuffer();
//		String nCaractere1 = strMapaCaracteres.substring(0, 3);
//		String nCaractere2 = strMapaCaracteres.substring(3, 6);
//		String caracteresUsuario = strMapaCaracteres.substring(6);
//		int numeroCaracteres =
//			Integer.valueOf(
//					LoadMapAuth.getInstance().props.getProperty(nCaractere1)
//					+ LoadMapAuth.getInstance().props.getProperty(nCaractere2))
//					.intValue();
//		int indiceActual = 0;
//		for (int i = 0; i < numeroCaracteres; i++) {
//			String caracterActual = caracteresUsuario.substring(indiceActual, indiceActual + 3);
//			usuario.append(LoadMapAuth.getInstance().props.getProperty(caracterActual));
//			indiceActual += 3;
//			if(indiceActual>caracteresUsuario.length()-3)
//				break;
//		}
//		return usuario.toString();
//	}
}