package iusacell.mdc.arh.vo;

import org.owasp.esapi.ESAPI;

public class CuestionarioVO extends ValueObject {

    String[] campos = { "ID_PREGUNTA", "DESC_PREGUNTA", "CAMPOS_SAP", "ID_OPC", "DESC_OPCION", 
            "TIPO", "CAMPO_EXTRA", "OPCIONES", "TIPO_SALIDA", "UBICACION", "VENTAS" };
    
    String ID_PREGUNTA;
    String DESC_PREGUNTA;
    String CAMPOS_SAP;
    String ID_OPC;
    String DESC_OPCION;
    String TIPO;
    String CAMPO_EXTRA;
    String OPCIONES;
    String TIPO_SALIDA;
    String UBICACION;
    String VENTAS;
    
    
    @Override
    public String[] getCampos() {
        // TODO Auto-generated method stub
        return campos;
    }

    @Override
    public int[] getLongitudes() {
        // TODO Auto-generated method stub
        return null;
    }

    public String getID_PREGUNTA() {
        return ID_PREGUNTA;
    }

    public void setID_PREGUNTA(String iD_PREGUNTA) {
        ID_PREGUNTA = ESAPI.encoder().encodeForHTML(iD_PREGUNTA);
    }

    public String getDESC_PREGUNTA() {
        return DESC_PREGUNTA;
    }

    public void setDESC_PREGUNTA(String dESC_PREGUNTA) {
        DESC_PREGUNTA = ESAPI.encoder().encodeForHTML(dESC_PREGUNTA);
    }
    
    public String getCAMPOS_SAP() {
        return CAMPOS_SAP;
    }

    public void setCAMPOS_SAP(String cAMPOS_SAP) {
        CAMPOS_SAP = ESAPI.encoder().encodeForHTML(cAMPOS_SAP);
    }

    public String getID_OPC() {
        return ID_OPC;
    }

    public void setID_OPC(String iD_OPC) {
        ID_OPC = ESAPI.encoder().encodeForHTML(iD_OPC);
    }

    public String getDESC_OPCION() {
        return DESC_OPCION;
    }

    public void setDESC_OPCION(String dESC_OPCION) {
        DESC_OPCION = ESAPI.encoder().encodeForHTML(dESC_OPCION);
    }

    public String getTIPO() {
        return TIPO;
    }

    public void setTIPO(String tIPO) {
        TIPO = ESAPI.encoder().encodeForHTML(tIPO);
    }

    public String getCAMPO_EXTRA() {
        return CAMPO_EXTRA;
    }

    public void setCAMPO_EXTRA(String cAMPO_EXTRA) {
        CAMPO_EXTRA = ESAPI.encoder().encodeForHTML(cAMPO_EXTRA);
    }

    public String getOPCIONES() {
        return OPCIONES;
    }

    public void setOPCIONES(String oPCIONES) {
        OPCIONES = ESAPI.encoder().encodeForHTML(oPCIONES);
    }

    public String getTIPO_SALIDA() {
        return TIPO_SALIDA;
    }

    public void setTIPO_SALIDA(String tIPO_SALIDA) {
        TIPO_SALIDA = ESAPI.encoder().encodeForHTML(tIPO_SALIDA);
    }

    public String getUBICACION() {
        return UBICACION;
    }

    public void setUBICACION(String uBICACION) {
        UBICACION = ESAPI.encoder().encodeForHTML(uBICACION);
    }

    public String getVENTAS() {
        return VENTAS;
    }

    public void setVENTAS(String vENTAS) {
        VENTAS = ESAPI.encoder().encodeForHTML(vENTAS);
    }

}
