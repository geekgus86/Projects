package iusacell.mdc.arh.action;

import iusacell.mdc.arh.business.ICuestionarioEntrSalida;
import iusacell.mdc.arh.business.impl.CuestionarioEntrSalidaImpl;
import iusacell.mdc.arh.dao.IEntrevistaCalidad;
import iusacell.mdc.arh.dao.impl.EntrevistaCalidadImpl;
import iusacell.mdc.arh.sap.DaoSAP;
import iusacell.mdc.arh.sap.TipoBajaSap;
import iusacell.mdc.arh.util.Constante;
import iusacell.mdc.arh.util.DischargeCause;
import iusacell.mdc.arh.util.DischargeType;
import iusacell.mdc.arh.util.EncriptaCadenas;
import iusacell.mdc.arh.util.EncriptaCadenas.EncryptionException;
import iusacell.mdc.arh.util.Fecha;
import iusacell.mdc.arh.vo.CuestionarioVO;
import iusacell.mdc.arh.vo.DatosBasicosVO;
import iusacell.mdc.arh.vo.EntrevistaSalidaVO;
import iusacell.mdc.arh.vo.MdcBajasVO;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionSupport;

public class EntrevistaCalidad extends ActionSupport implements ServletRequestAware {

    private static final long serialVersionUID = 5465168412315L;
    protected HttpServletRequest servletRequest;

    /*
     * Variables
     */
    private static final String RESP_OK = "entrevistaCalidad";
    private static final String RESP_FAIL = "entrevistaCalidadFail";
    private String nomEmpleado;
    private String puestoEmpleado;
    private String nomJefeInmediato;
    private String numEmpleadoBaja;
    private String resp; 
    private String f;
    private String folio;
    private boolean ch;
    private String capitalHumano;
    private String cuest;
    private String camposSap;
    private IEntrevistaCalidad entCalidad;
    
    /**
     * Metodo Action el cual carga los valores iniciales de la URL
     * 
     * @return
     */
    public String cuestionarioCalidad() {
        String resp="";
        // Obtener folio enctriptado
        String folio = f;
        String cHumano = capitalHumano;
        
        this.folio = folio = limpiarTextoCaracteres(folio); 
        MdcBajasVO vo;
        
        try {
            EncriptaCadenas en = new EncriptaCadenas("DES", "SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS27DENOVIEBREDEL2013");
            folio = validarString(en.decrypt(folio));
//            folio = "107";
            entCalidad = new EntrevistaCalidadImpl();
            vo = entCalidad.obtenerDatosEntrevista(folio);
            System.out.println("Se obtenieron datos entrevista " + vo.getNomempladobaja()!= null ? vo.getNomempladobaja() : folio);
            
            if((vo != null && vo.getEstatus().indexOf("FOLIO ACTIVO")>=0) || (cHumano!=null && cHumano.equals("true")))
            {
            	this.nomEmpleado = "<b> NOMBRE:</b> " + vo.getNomempladobaja();
                this.numEmpleadoBaja = "<b>NUM. EMPLEADO: </b>"+ Integer.parseInt(vo.getNumerobaja());  
                this.puestoEmpleado = "<b>PUESTO: </b>" + vo.getPuestobaja();
                this.nomJefeInmediato = "<b>JEFE DIRECTO: </b>" + vo.getNomautorizador();
                resp = RESP_OK;
                System.out.println("Informaciòn obtenida Correctamente"+vo.getNomempladobaja());
            }
            else{
            	resp = RESP_FAIL;
            	System.out.println("Fail");
            }
            
        } catch (EncryptionException e) {
        	System.out.println("Excepcion 1: "+e);
            resp = RESP_FAIL;
        } catch (SQLException e) {
        	System.out.println("Excepcion 2: "+e);
            resp = RESP_FAIL;
        } catch (Exception e) {
        	System.out.println("Excepcion 3: "+e);
			e.printStackTrace();
			resp = RESP_FAIL;
		}
        
        return resp;
        
    }

    public String obtenerCuestionarioSalida(){
        System.out.println("Entra al Action Obtener Cuestionario");
        HttpServletResponse response = ServletActionContext.getResponse();
        
        response.setContentType("text/xml");
        response.setHeader("Cache-Control", "no-cache"); 
        response.setCharacterEncoding("utf-8");
        
        if(folio == null) {
            resp = RESP_FAIL;
        } else {
            try {
                // Desencriptar folio
                EncriptaCadenas en = new EncriptaCadenas("DES", "SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS27DENOVIEMBREDEL2013");
                
                folio = validarString(en.decrypt(folio));
                // Coenxión Storeprocedure
                IEntrevistaCalidad entCalidad = new EntrevistaCalidadImpl();
                //MdcBajasVO vo = entCalidad.obtenerDatosEntrevista(folio);
                if( entCalidad.obtenerDatosEntrevista(folio) != null && entCalidad.obtenerDatosEntrevista(folio).getEstatus().equals(Constante.FLAG_BAJA_ACT) ){            
                	System.out.println("Entra Folio Activo");
                    //Obtener cuestionario
                    List<CuestionarioVO> preguntas = new ArrayList<CuestionarioVO>();
                    preguntas = entCalidad.obtenerListaPreguntas();
                    
                    List<CuestionarioVO> opciones = new ArrayList<CuestionarioVO>();
                    opciones = entCalidad.obtenerListaOpciones();
                    
                    ICuestionarioEntrSalida cuestionario = new CuestionarioEntrSalidaImpl();
                    String cuestionarioSalida = cuestionario.obtenerCuestionario(preguntas, opciones);
                    
                    generarRespuesta(response,  cuestionarioSalida);
                    resp = RESP_OK;
                    
                } else if (entCalidad.obtenerDatosEntrevista(folio) != null && entCalidad.obtenerDatosEntrevista(folio).getEstatus().equals(Constante.FLAG_BAJA_CAD)) { 
                    //"regresar mensaje de folio caducado";
                    if( capitalHumano.equals("true") ){
                    	System.out.println("Entra Folio Inactivo y Consulta Cuestionario");
                        List<CuestionarioVO> preguntas = new ArrayList<CuestionarioVO>();
                        preguntas = entCalidad.obtenerListaPreguntas();
                        
                        List<CuestionarioVO> opciones = new ArrayList<CuestionarioVO>();
                        opciones = entCalidad.obtenerListaOpciones();
                        int len = numEmpleadoBaja.length();
                        String ne = this.numEmpleadoBaja.substring(len-6, len);
                        //Respuestas SAP
                        EntrevistaSalidaVO entrevista =  new EntrevistaSalidaVO();
                        entrevista = entCalidad.obtenerEntrevistaResp(ne);
                        
                        ICuestionarioEntrSalida cuestionario = new CuestionarioEntrSalidaImpl();
                        String cuestionarioSalida = null;
                        if(entrevista != null){
                            cuestionarioSalida = cuestionario.cnosultarCuestionarioResp(preguntas, opciones, entrevista);
                        }else{
                        	cuestionarioSalida = cuestionario.obtenerCuestionario(preguntas, opciones);
                        }
                        
                        generarRespuesta(response,  cuestionarioSalida);
                        resp = RESP_OK;
                        
                    } else if( capitalHumano.equals("false") ){
                        resp = RESP_FAIL;
                    }
                    
                } else if (entCalidad.obtenerDatosEntrevista(folio) != null && entCalidad.obtenerDatosEntrevista(folio).getEstatus().equals(Constante.FLAG_BAJA_NEF)) {  
                    //"regresar mensaje de folio inexistente";
                    //crear frame de acceso denegado??
                    resp = RESP_FAIL;
                }
                
            } catch (Throwable e) {
            	System.out.println("Excepcion General Obtener Cuestionario:" + e);
                return RESP_FAIL;
            }
            
        }
        
        return resp;
        
    }
    
    public String botonGuardarCuestionario(){
    	System.out.println("Entra Action Guardar Cuestionario");
        HttpServletResponse response = ServletActionContext.getResponse();
        MdcBajasVO vo;
        
        response.setContentType("text/xml");
        response.setHeader("Cache-Control", "no-cache"); 
        response.setCharacterEncoding("utf-8");
        
        // Desencriptar folio
        EncriptaCadenas en;
        IEntrevistaCalidad entCalidad = new EntrevistaCalidadImpl();
        
        try {
            en = new EncriptaCadenas("DES","SISTEMADEAUTOGESTIÓNRECURSOSHUMANOS27DENOVIEMBREDEL2013");
            
            folio = validarString(en.decrypt(folio));
            entCalidad = new EntrevistaCalidadImpl();
            vo = entCalidad.obtenerDatosEntrevista(folio);                    
            this.nomEmpleado = "NOMBRE: " + vo.getNomempladobaja();
            this.numEmpleadoBaja = "NUM. EMPLEADO: "+ Integer.parseInt(vo.getNumerobaja());  
            this.puestoEmpleado = "PUESTO: " + vo.getPuestobaja();
            this.nomJefeInmediato = "JEFE DIRECTO: " + vo.getNomautorizador();
            System.out.println("Obtuvo los datos");
            System.out.println("Inician consultas Sap");
            DaoSAP sap = new DaoSAP();
            System.out.println("DaoSAP instaciado correctamente");
            MdcBajasVO  bajasVO = entCalidad.obtenerDatosEntrevista(folio);
            System.out.println("Obtiene bajasVO");
            String posicion = bajasVO.getPosicion();
            System.out.println("Inicia Obtener datos basicos");
            DatosBasicosVO datosBasicos = sap.obtenerDatosBasicos(posicion);
            System.out.println("Finaliza obtener datos basicos");
            TipoBajaSap contrato = new TipoBajaSap();
            System.out.println("Inicia obtener motivos baja sap");
            DischargeCause cause = contrato.getDischargeCauseByLongCode(bajasVO.getMotivo());
            System.out.println("Finaliza obtener motivos baja sap");
            System.out.println("Inicia obtener tipos baja sap");
            DischargeType type = contrato.getDischargeTypeByShortCode(cause.getShortCode(), bajasVO.getTipo());
            System.out.println("Finaliza obtener tipos ");
            
            String cuest = bajasVO.getNumerobaja() +";"+ 
            		vo.getNomempladobaja() +";"+
                    Fecha.getFechaActual("yyyyMMdd")+";"+
                    cause.getDescription() +";"+
                    type.getDescription() +";"+
                    bajasVO.getSociedad() +";"+
                    datosBasicos.getDivision().substring(1) +";"+
                    datosBasicos.getNomSubDivision() +";"+
                    datosBasicos.getFuncion() +";"+
                    bajasVO.getNumautorizador() +";" +
                    vo.getNomautorizador() +";" +
                    this.cuest;
            
            //Obtener Pregutnas con Campos SAP
            List<CuestionarioVO> camposSap = new ArrayList<CuestionarioVO>();
            camposSap = entCalidad.obtenerListaPreguntas();
            System.out.println("Inicia guardar entrevista SAP");
            if( entCalidad.guardarEntrevistaSalida(camposSap, cuest) ){
                
                //guardar en SP mdc_registro_estatus_es_baja
            	System.out.println("Inicia guardar entrevista");
                String msg_encuesta = entCalidad.gurdaEntrevistaEstatusBaja(folio, "1");
                System.out.println("Finaliza guardar entrevista" + msg_encuesta);
                
                generarRespuesta(response,  msg_encuesta);
                //Enviar pantalla de éxito 
                resp = RESP_OK;
                
            } else {
                
                resp = RESP_FAIL;
                
            }
            
        } catch (Exception e) {
            resp = RESP_FAIL;
            System.out.println("Error:" + e.getMessage());
            e.printStackTrace();
        } catch (Throwable e) {
        	 resp = RESP_FAIL;
        	System.out.println("Error:" + e.getMessage());
        	e.printStackTrace();
		}
        
        return resp;
        
    }
    
    /*
     * Metodos
     */
    /**
     * Convierte la primera letra de cada palabra en mayusculas
     * @param texto
     * @return
     */
	public static String primeraMayusculas(String texto){
    	
    	texto = texto.toLowerCase();
    	char[] caracteres = texto.toCharArray();
    	caracteres[0] = Character.toUpperCase(caracteres[0]);
    	// el -2 es para evitar una excepción al caernos del arreglo
		for (int i = 0; i < texto.length()- 2; i++){
			// Es 'palabra'
			if (caracteres[i] == ' ' || caracteres[i] == '.' || caracteres[i] == ','){
				// Reemplazamos
				caracteres[i + 1] = Character.toUpperCase(caracteres[i + 1]);
			}
		}
    	
    	return new String(caracteres);
    }
    
    
    private void generarRespuesta(HttpServletResponse response, String respuesta) {
        try {
            PrintWriter writer = response.getWriter();
            writer.print("<xml><cuestionario><![CDATA["+respuesta+"]]></cuestionario></xml>");
            writer.flush();
            writer.close();
            
            resp = RESP_OK;
            
        } catch (IOException ex) {
            resp = RESP_FAIL;
            Logger.getLogger(EntrevistaCalidad.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    private String validarString(String cadena){
        String ret = "";
        
        Pattern pattern = Pattern.compile("[^<>&%//]+");
 
        Matcher matcher = pattern.matcher(cadena);   
        if(matcher.find()){
            ret = cadena.trim().toString();
        }
        
        return ret;
    }
    
    /**
     * Limpia el texto de caracteres vacios o extraños: 1- Cambia el espacio por
     * mas " " = "+"
     * 
     * @param texto
     * @return
     */
    private String limpiarTextoCaracteres(String texto) {
        String ret = "";
        if (texto != null && !texto.isEmpty()) {
            for (int i = 0; i < texto.length(); i++) {
                char caracter = texto.charAt(i);
                int numCode = caracter;
                if (numCode == 32) {
                    caracter = '+';
                }
                ret += caracter;
            }
        }
        return ret;
    }

    
    @Override
    public void setServletRequest(HttpServletRequest servletRequest) {
        this.servletRequest = servletRequest;

    }

    public String getNomEmpleado() {
        return nomEmpleado;
    }
    public void setNomEmpleado(String nomEmpleado) {
        this.nomEmpleado = nomEmpleado;
    }
    public String getPuestoEmpleado() {
        return puestoEmpleado;
    }
    public void setPuestoEmpleado(String puestoEmpleado) {
        this.puestoEmpleado = puestoEmpleado;
    }
    public String getNomJefeInmediato() {
        return nomJefeInmediato;
    }
    public void setNomJefeInmediato(String nomJefeInmediato) {
        this.nomJefeInmediato = nomJefeInmediato;
    }
    public String getNumEmpleadoBaja() {
        return numEmpleadoBaja;
    }
    public void setNumEmpleadoBaja(String numEmpleadoBaja) {
        this.numEmpleadoBaja = numEmpleadoBaja;
    }
    public String getF() {
        return f;
    }
    public void setF(String f) {
        this.f = f;
    }
    public boolean getCh() {
        return ch;
    }
    public void setCh(boolean ch) {
        this.ch = ch;
    }
    public String getFolio() {
        return folio;
    }
    public void setFolio(String folio) {
        this.folio = folio;
    }
    public String getCuest(){
        return cuest;
    }
    
    public void setCuest(String cuest){
        this.cuest = cuest;
    }
    public String getCapitalHumano() {
        return capitalHumano;
    }
    public void setCapitalHumano(String capitalHumano) {
        this.capitalHumano = capitalHumano;
    }
    public String getCamposSap() {
        return camposSap;
    }
    public void setCamposSap(String camposSap) {
        this.camposSap = camposSap;
    }
    
}
