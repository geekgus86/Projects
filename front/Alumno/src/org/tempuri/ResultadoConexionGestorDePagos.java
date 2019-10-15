/**
 * ResultadoConexionGestorDePagos.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoConexionGestorDePagos  implements java.io.Serializable {
    private java.lang.String conexion;

    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private java.lang.String folioPedido;

    private java.lang.String URLDestino;

    private java.lang.String LLave;

    public ResultadoConexionGestorDePagos() {
    }

    public ResultadoConexionGestorDePagos(
           java.lang.String conexion,
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           java.lang.String folioPedido,
           java.lang.String URLDestino,
           java.lang.String LLave) {
           this.conexion = conexion;
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.folioPedido = folioPedido;
           this.URLDestino = URLDestino;
           this.LLave = LLave;
    }


    /**
     * Gets the conexion value for this ResultadoConexionGestorDePagos.
     * 
     * @return conexion
     */
    public java.lang.String getConexion() {
        return conexion;
    }


    /**
     * Sets the conexion value for this ResultadoConexionGestorDePagos.
     * 
     * @param conexion
     */
    public void setConexion(java.lang.String conexion) {
        this.conexion = conexion;
    }


    /**
     * Gets the resultadoWS value for this ResultadoConexionGestorDePagos.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoConexionGestorDePagos.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoConexionGestorDePagos.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoConexionGestorDePagos.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the folioPedido value for this ResultadoConexionGestorDePagos.
     * 
     * @return folioPedido
     */
    public java.lang.String getFolioPedido() {
        return folioPedido;
    }


    /**
     * Sets the folioPedido value for this ResultadoConexionGestorDePagos.
     * 
     * @param folioPedido
     */
    public void setFolioPedido(java.lang.String folioPedido) {
        this.folioPedido = folioPedido;
    }


    /**
     * Gets the URLDestino value for this ResultadoConexionGestorDePagos.
     * 
     * @return URLDestino
     */
    public java.lang.String getURLDestino() {
        return URLDestino;
    }


    /**
     * Sets the URLDestino value for this ResultadoConexionGestorDePagos.
     * 
     * @param URLDestino
     */
    public void setURLDestino(java.lang.String URLDestino) {
        this.URLDestino = URLDestino;
    }


    /**
     * Gets the LLave value for this ResultadoConexionGestorDePagos.
     * 
     * @return LLave
     */
    public java.lang.String getLLave() {
        return LLave;
    }


    /**
     * Sets the LLave value for this ResultadoConexionGestorDePagos.
     * 
     * @param LLave
     */
    public void setLLave(java.lang.String LLave) {
        this.LLave = LLave;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoConexionGestorDePagos)) return false;
        ResultadoConexionGestorDePagos other = (ResultadoConexionGestorDePagos) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.conexion==null && other.getConexion()==null) || 
             (this.conexion!=null &&
              this.conexion.equals(other.getConexion()))) &&
            ((this.resultadoWS==null && other.getResultadoWS()==null) || 
             (this.resultadoWS!=null &&
              this.resultadoWS.equals(other.getResultadoWS()))) &&
            ((this.mensaje==null && other.getMensaje()==null) || 
             (this.mensaje!=null &&
              this.mensaje.equals(other.getMensaje()))) &&
            ((this.folioPedido==null && other.getFolioPedido()==null) || 
             (this.folioPedido!=null &&
              this.folioPedido.equals(other.getFolioPedido()))) &&
            ((this.URLDestino==null && other.getURLDestino()==null) || 
             (this.URLDestino!=null &&
              this.URLDestino.equals(other.getURLDestino()))) &&
            ((this.LLave==null && other.getLLave()==null) || 
             (this.LLave!=null &&
              this.LLave.equals(other.getLLave())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getConexion() != null) {
            _hashCode += getConexion().hashCode();
        }
        if (getResultadoWS() != null) {
            _hashCode += getResultadoWS().hashCode();
        }
        if (getMensaje() != null) {
            _hashCode += getMensaje().hashCode();
        }
        if (getFolioPedido() != null) {
            _hashCode += getFolioPedido().hashCode();
        }
        if (getURLDestino() != null) {
            _hashCode += getURLDestino().hashCode();
        }
        if (getLLave() != null) {
            _hashCode += getLLave().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoConexionGestorDePagos.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoConexionGestorDePagos"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("conexion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "Conexion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("resultadoWS");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoWS"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("mensaje");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "Mensaje"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("folioPedido");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "FolioPedido"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("URLDestino");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "URLDestino"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("LLave");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "LLave"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
