/**
 * ResultadoInformacionUnidadDeMedida.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoInformacionUnidadDeMedida  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private int claveUnidadMedida;

    private java.lang.String descripcionUnidadMedida;

    private java.lang.String idUnidadMedidaBanner;

    public ResultadoInformacionUnidadDeMedida() {
    }

    public ResultadoInformacionUnidadDeMedida(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           int claveUnidadMedida,
           java.lang.String descripcionUnidadMedida,
           java.lang.String idUnidadMedidaBanner) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.claveUnidadMedida = claveUnidadMedida;
           this.descripcionUnidadMedida = descripcionUnidadMedida;
           this.idUnidadMedidaBanner = idUnidadMedidaBanner;
    }


    /**
     * Gets the resultadoWS value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the claveUnidadMedida value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @return claveUnidadMedida
     */
    public int getClaveUnidadMedida() {
        return claveUnidadMedida;
    }


    /**
     * Sets the claveUnidadMedida value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @param claveUnidadMedida
     */
    public void setClaveUnidadMedida(int claveUnidadMedida) {
        this.claveUnidadMedida = claveUnidadMedida;
    }


    /**
     * Gets the descripcionUnidadMedida value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @return descripcionUnidadMedida
     */
    public java.lang.String getDescripcionUnidadMedida() {
        return descripcionUnidadMedida;
    }


    /**
     * Sets the descripcionUnidadMedida value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @param descripcionUnidadMedida
     */
    public void setDescripcionUnidadMedida(java.lang.String descripcionUnidadMedida) {
        this.descripcionUnidadMedida = descripcionUnidadMedida;
    }


    /**
     * Gets the idUnidadMedidaBanner value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @return idUnidadMedidaBanner
     */
    public java.lang.String getIdUnidadMedidaBanner() {
        return idUnidadMedidaBanner;
    }


    /**
     * Sets the idUnidadMedidaBanner value for this ResultadoInformacionUnidadDeMedida.
     * 
     * @param idUnidadMedidaBanner
     */
    public void setIdUnidadMedidaBanner(java.lang.String idUnidadMedidaBanner) {
        this.idUnidadMedidaBanner = idUnidadMedidaBanner;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoInformacionUnidadDeMedida)) return false;
        ResultadoInformacionUnidadDeMedida other = (ResultadoInformacionUnidadDeMedida) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.resultadoWS==null && other.getResultadoWS()==null) || 
             (this.resultadoWS!=null &&
              this.resultadoWS.equals(other.getResultadoWS()))) &&
            ((this.mensaje==null && other.getMensaje()==null) || 
             (this.mensaje!=null &&
              this.mensaje.equals(other.getMensaje()))) &&
            this.claveUnidadMedida == other.getClaveUnidadMedida() &&
            ((this.descripcionUnidadMedida==null && other.getDescripcionUnidadMedida()==null) || 
             (this.descripcionUnidadMedida!=null &&
              this.descripcionUnidadMedida.equals(other.getDescripcionUnidadMedida()))) &&
            ((this.idUnidadMedidaBanner==null && other.getIdUnidadMedidaBanner()==null) || 
             (this.idUnidadMedidaBanner!=null &&
              this.idUnidadMedidaBanner.equals(other.getIdUnidadMedidaBanner())));
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
        if (getResultadoWS() != null) {
            _hashCode += getResultadoWS().hashCode();
        }
        if (getMensaje() != null) {
            _hashCode += getMensaje().hashCode();
        }
        _hashCode += getClaveUnidadMedida();
        if (getDescripcionUnidadMedida() != null) {
            _hashCode += getDescripcionUnidadMedida().hashCode();
        }
        if (getIdUnidadMedidaBanner() != null) {
            _hashCode += getIdUnidadMedidaBanner().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoInformacionUnidadDeMedida.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoInformacionUnidadDeMedida"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
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
        elemField.setFieldName("claveUnidadMedida");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "ClaveUnidadMedida"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionUnidadMedida");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionUnidadMedida"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idUnidadMedidaBanner");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdUnidadMedidaBanner"));
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
