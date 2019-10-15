/*
 * Creado el 27/03/2014
 *
 * TODO Para cambiar la plantilla de este archivo generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
package mx.itesm.externos.controller;

/**
 * @author yo
 *
 * TODO Para cambiar la plantilla de este comentario generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;


public class ibm_sol {

    public static void main(String[] args) {

        try {
        	 // Carga del fichero que tiene los certificados de los servidores en
            // los que confiamos.
            InputStream fileCertificadosConfianza = new FileInputStream(new File(
                  "c:/mia/alcmsa01_itesm_mx.jks"));
            KeyStore ksCertificadosConfianza = KeyStore.getInstance(KeyStore
                  .getDefaultType());
            ksCertificadosConfianza.load(fileCertificadosConfianza,
                  "tec12345".toCharArray());
            fileCertificadosConfianza.close();

            // Ponemos el contenido en nuestro manager de certificados de
            // confianza.
            TrustManagerFactory tmf = TrustManagerFactory
                  .getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ksCertificadosConfianza);

            // Creamos un contexto SSL con nuestro manager de certificados en los
            // que confiamos.
            SSLContext context = SSLContext.getInstance("TLS");
            context.init(null, tmf.getTrustManagers(), null);
            SSLSocketFactory sslSocketFactory = context.getSocketFactory();
            
            URL url = new URL ("https://fs.itesm.mx/adfs/ls/");
            String encoding = "tVLLbtswEPwVgXeJkqykNmEbcGIUNZAmRuzmkEvBkiubAB8qd1Ulfx9GagH30Nx6WmC4Mzs73CVKZzux6ensH%2BFnD0jZi7MexfiwYn30Ikg0KLx0gIKUOGy%2B3om6KEUXAwUVLLugfMyQiBDJBM%2By3XbFvuu2Xcy1hKtZDVrPdFsrqK%2FnGqq2%2FLRYNE2jF6qaNVqx7AkiJuaKJaFER%2Bxh55GkpwSV1XVeNnldHqu5qEtRzp9Ztk3bGC9pZJ2JOhSct1gYAnSFe%2BFSt8gtcpZt%2Fhi7DR57B%2FEA8ZdR8O3x7oJqXAcX9KHLVfAEnnhn%2B5PxyN8jSC5yNP5kIZWTz4MfYT4MA3dB9xaK7txNGE61zqXCEa1Ytv8d643xOsl8nOiPqQnFl%2BNxn%2B8fDke2Xr5LijGhuP6%2F5h2Q1JLk5H3JLycvp9u6T553232wRr1mn0N0kv69UlVUI2J03o6tApw0dqN1BMT0T9aG4TaCJFgxij0wvp6m%2Fn3E6zc%3D&RelayState=https%3A%2F%2Ffimpes.itesm.mx%2Fwp-login.php%3Fredirect_to%3Dhttps%253A%252F%252Ffimpes.itesm.mx%252Fwp-login.php%253Fredirect_to%253Dhttps%25253A%25252F%25252Ffimpes.itesm.mx%25252F&SigAlg=http%3A%2F%2Fwww.w3.org%2F2000%2F09%2Fxmldsig%23rsa-sha1&Signature=ON1yjO31PEMktLd2NtTEoCIbb7mK1JgIbDkIbG531L1zaaT8lHSHdA5I%2B165k%2Blj%2BIsOXKj%2BvUgEN8bcvAkfHUM6wPhvoKCIPY57HdF%2B13wwAqJz9xfjA581AzLWhn4aEoThTaMX3%2FQiyNuqn%2BtifXYJV7GF49a4GrE9A8L6lUHvXwxKArZHG9%2FjuGQDIWpw8T%2B9ejUU9VTRuauY52RDsEPdVSuHyQh8m9jc9EBSVxA5LhS0VOyLN3y0GLxRg29NxuYghdKUgtCcoabvtfXFQR%2FiwCW9fBkwYoiPXUGVnN3GunZaGv0xvfpyQ4R2prvTrjPW46DM9g5Q36vrkCs3Ng%3D%3D";

            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            ((HttpsURLConnection) connection).setSSLSocketFactory(sslSocketFactory);
            connection.setRequestMethod("GET");
            connection.setDoOutput(true);
            connection.setRequestProperty  ("?SAMLRequest", encoding);
            InputStream content = (InputStream)connection.getInputStream();
            BufferedReader in   = 
                new BufferedReader (new InputStreamReader (content));
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

    }

}

