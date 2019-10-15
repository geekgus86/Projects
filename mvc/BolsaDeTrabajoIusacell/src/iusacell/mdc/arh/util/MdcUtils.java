/*
 * Creado el 12/03/2012
 *
 * TODO Para cambiar la plantilla de este archivo generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
package iusacell.mdc.arh.util;

/*import iusacell.agestion.bs.IParametros;
import iusacell.agestion.bs.ParametrosImpl;
import iusacell.encripta.EncriptaCadenas;
import iusacell.mdc.vo.ParametrosVO;
*/
import java.text.DecimalFormat;

/**
 * @author YOLMEDO
 *
 * TODO Para cambiar la plantilla de este comentario generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
public class MdcUtils {
    
    public static final char[][] ch = { { 'á', 'a' }, { 'é', 'e' },
            { 'í', 'i' }, { 'ó', 'o' }, { 'ú', 'u' }, { 'Á', 'A' },
            { 'É', 'E' }, { 'Í', 'I' }, { 'Ó', 'O' }, { 'Ú', 'U' },
            { 'ñ', 'n' }, { 'Ñ', 'N' } };

    //MÉTODO PARA QUITAR ACENTOS Y SUPLANTARLOS POR LA VOCAL CORRESPONDIENTE
    public static String QuitaAcentos(String str) {

        for (int i = 0; i < ch.length; i++)
            for (int j = 0; j < str.length(); j++)
                if (str.charAt(j) == ch[i][0])
                    str = str.replace(ch[i][0], ch[i][1]);
        return str;

    }
    
    public static String notNull(String str){
        if(str==null)
            return "";
        return str;
    }
    
    
    //Método para generar RFC genérico
    public static String getRFC(String nombre, String paterno, String materno, String fecha){
        String auxiliar = "";  
        if(paterno.length()==1)
        {
            auxiliar = paterno ;
            paterno = materno ;
            materno = auxiliar ; 
        }
        
        String rfc = "";
        String c1 = QuitaAcentos ( String.valueOf(buscaCaracter( eliminaArticulos(paterno),0,'X' )) );
        String c2 = QuitaAcentos ( String.valueOf( buscaCaracter( eliminaArticulos(paterno),1,'V' ) ));
        String c3 = (materno.equals("") || materno.equals("X")) ? "X": QuitaAcentos ( String.valueOf(buscaCaracter( eliminaArticulos(materno),0,'X' )) );
        String c4 = QuitaAcentos ( String.valueOf(buscaCaracter( ignoraPrimerNombre(eliminaArticulos(nombre)),0,'X' )));
        
        c1 = c1.equals("Ñ") ? "" : c1;
        c3 = c3.equals("Ñ") ? "" : c3;
        c4 = c4.equals("Ñ") ? "" : c4;
        
        if(fecha!=null && fecha.length() < 10)
        {
            String []arrayFecha = fecha.split(".");
            String anio = arrayFecha[2];
            String mess = arrayFecha[1];
            String diaa = arrayFecha[0];
            String fechaFormato = anio.substring(2,4)+mess+diaa;
            rfc = c1 + c2 + c3 + c4 + fechaFormato;
        }
        else
            rfc = c1 + c2 + c3 + c4 +"000000" ;
        
        return rfc;
    } 

    //Ignorar nombres que se toman en cuenta en RFC
    public static String ignoraPrimerNombre(String nombre) //JOSE, MARIA, MA, MA.
    {
        String []nombres = nombre.split(" ");
        String nom = "";
        int tam = nombres.length;
        
        if(tam > 1)
        {
            if( nombres[0]=="JOSE"||nombres[0]=="JOSÉ"||nombres[0]=="MARIA"||nombres[0]=="MARÍA"||nombres[0]=="MA."||nombres[0]=="MA" )
            {
                if( tam > 2 ) for(int i=1;i<tam;i++) nom += nombres[i]+' ';
                else nom = nombres[1];
                return nom;
            }
        }
        return nombre.split(" ")[0];
    }
    //Método para buscar un caracter en cierta posición a partir de una cadena
    public static char buscaCaracter(String palabra, int posicion, char tipo){
    
        //alert("palabra "+palabra +"posicion ="+posicion+"tipo="+tipo);
        if( (palabra.length() > 0) && (posicion > -1) )
        {
            for(int i=posicion;i<palabra.length();i++)
            {
                if( tipo=='V' ){ if( esVocal(palabra.charAt(i)) ) return palabra.charAt(i); }
                else if( tipo=='C' ){ if( !esVocal(palabra.charAt(i)) ) return palabra.charAt(i); }
                else if( tipo=='X' ){ return palabra.charAt(i); }
            }
            return 'X';
        }
        else return 'X';

    }

    //regresa true/false en caso de que el char que se envíe sea vocal o no
    public static boolean esVocal(char letra)
    {
        if ( letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U' ||
             letra == 'Á' || letra == 'É' || letra == 'Í' || letra == 'Ó' || letra == 'Ú' )
            return true;
        return false;
    }

    //Quita del texto los artículos: DEL, LAS, DE, LA...
    public static String eliminaArticulos(String palabra)
    {
        String regreso;      
        regreso = palabra = palabra.replaceAll(" DEL ", " ").replaceAll(" LAS ", " ").replaceAll(" DE ", " ").replaceAll(" LA ", " ").replaceAll(" Y ", " ").replaceAll(" A ", " ").replaceAll(" MC "," ").replaceAll(" LOS ", " ").replaceAll(" VON ", " ").replaceAll(" VAN "," ");
            
        if( regreso.charAt(0)=='D' && regreso.charAt(1)=='E' && regreso.charAt(2)=='L' && regreso.charAt(3)==' ' ) regreso = palabra.replaceAll("DEL ","");
        if( regreso.charAt(0)=='L' && regreso.charAt(1)=='A' && regreso.charAt(2)=='S' && regreso.charAt(3)==' ' ) regreso = palabra.replaceAll("LAS ","");
        if( regreso.charAt(0)=='L' && regreso.charAt(1)=='O' && regreso.charAt(2)=='S' && regreso.charAt(3)==' ' ) regreso = palabra.replaceAll("LOS ","");
        if( regreso.charAt(0)=='V' && regreso.charAt(1)=='O' && regreso.charAt(2)=='N' && regreso.charAt(3)==' ' ) regreso = palabra.replaceAll("VON ","");
        if( regreso.charAt(0)=='V' && regreso.charAt(1)=='A' && regreso.charAt(2)=='N' && regreso.charAt(3)==' ' ) regreso = palabra.replaceAll("VAN ","");
        if( regreso.charAt(0)=='D' && regreso.charAt(1)=='E' && regreso.charAt(2)==' ' ) regreso = palabra.replaceAll("DE ","");
        if( regreso.charAt(0)=='L' && regreso.charAt(1)=='A' && regreso.charAt(2)==' ' ) regreso = palabra.replaceAll("LA ","");
        if( regreso.charAt(0)=='M' && regreso.charAt(1)=='C' && regreso.charAt(2)==' ' ) regreso = palabra.replaceAll("MC ","");
        if( regreso.charAt(0)=='Y' && regreso.charAt(1)==' ' ) regreso = palabra.replaceAll("Y ","");
        if( regreso.charAt(0)=='A' && regreso.charAt(1)==' ' ) regreso = palabra.replaceAll("A ","");
        //alert("regreso ="+regreso);
        return regreso;
    }

    public static boolean like(String toBeCompare, String by){
        if(by != null){
            if(toBeCompare != null){
                if(by.startsWith("%") && by.endsWith("%")){
                    int index = toBeCompare.toLowerCase().indexOf(by.replaceAll("%", ""));
                    if(index < 0){
                        return false;
                    } else {
                        return true;
                    }
                } else if(by.startsWith("%")){
                    return toBeCompare.endsWith(by);
                } else if(by.endsWith("%")){
                    return toBeCompare.startsWith(by);
                } else {
                    return toBeCompare.equals(by);
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**
     * Formatea cantidades en moneda
     * @param valor
     * @return
     */
    public static String formatMoneda(double valor){
       String valorStr="";  
       DecimalFormat format = new DecimalFormat("'$'#,###,###,###.##"); 
       valorStr=format.format(valor);
       return valorStr;    
    }
    
    /**
     * Formatea cantidades en moneda
     * @param valor
     * @return
     */
    public static String quitarFormato(String valor){
       String valorStr="";  
       String res=null;
        res=valor.replace('$',':'); 
        res=res.replace('%',':');
        res=res.replace(',',':');
        String []cadena=res.split(":");
        for(int i = 0; i < cadena.length; i++){
            if(i==0){
                valorStr=cadena[i];
           }else{
                valorStr=valorStr+cadena[i];
           }
        }
       return valorStr;    
    }
    
    /**
     * Formatea fecha YYYYMMDD
     * @param valor
     * @return
     */
    public static String formatoFecha(String fecha){
        String valorStr="";
        
        if(fecha != null && fecha.length() == 10){
            valorStr = fecha.substring(6,10) + fecha.substring(3,5) + fecha.substring(0,2);
        }else{
            return fecha;
        }
            
        return valorStr;    
     }

    /*
     public static void GuardarArchivoFTP(String archivo,String carpeta, byte []archByte) throws Exception{ 
        byte [] buffer = null; 
        FTPFiles ftpClient = null; 
        String file = null; 
        IParametros iparam = new ParametrosImpl();
        ParametrosVO param = new ParametrosVO();
        String sFTP = null; 
        String port = null; 
        String sUser = null; 
        String sPassword = null; 
        StringBuffer ruta = null;
        try{ 

                
                ftpClient = new FTPFiles(); 
                EncriptaCadenas ec = new EncriptaCadenas("DES", "SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS01DESEPTIEMBREDEL2008");
                param = iparam.selectParametroByLlave("hostFTP"); 
                sFTP = ec.decrypt(param.getParamValor()); 
                param = iparam.selectParametroByLlave("portFTP"); 
                port = ec.decrypt(param.getParamValor()); 
                param = iparam.selectParametroByLlave("usuFTP"); 
                sUser = ec.decrypt(param.getParamValor()); 
                param = iparam.selectParametroByLlave("pasFTP"); 
                sPassword = ec.decrypt(param.getParamValor()); 
                
                ftpClient.setHost(sFTP); 
                ftpClient.setPort(port); 
                ftpClient.setUser(sUser); 
                ftpClient.setPassword(sPassword); 
                ftpClient.connect(); 
                
                ruta = new StringBuffer(); 
                if(carpeta!=null && carpeta.trim().length()>0){
                    ruta.append("/"+carpeta+"/");
                }
                 
                ruta.append(archivo); 
                ftpClient.put(archByte,ruta.toString()); 
                
        }catch(Exception exc){ 
                throw new Exception(exc.getMessage()); 
        } 
        ftpClient.disconnect(); 
    }
    */
    
}
