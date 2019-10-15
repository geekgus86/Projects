/**
 * ResultadoConsultaReferenciaBancaria.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoConsultaReferenciaBancaria  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private java.lang.String URLFichaDeposito;

    public ResultadoConsultaReferenciaBancaria() {
    }

    public ResultadoConsultaReferenciaBancaria(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           java.lang.String URLFichaDeposito) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.URLFichaDeposito = URLFichaDeposito;
    }


    /**
     * Gets the resultadoWS value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the URLFichaDeposito value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @return URLFichaDeposito
     */
    public java.lang.String getURLFichaDeposito() {
        return URLFichaDeposito;
    }


    /**
     * Sets the URLFichaDeposito value for this ResultadoConsultaReferenciaBancaria.
     * 
     * @param URLFichaDeposito
     */
    public void setURLFichaDeposito(java.lang.String URLFichaDeposito) {
        this.URLFichaDeposito = URLFichaDeposito;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoConsultaReferenciaBancaria)) return false;
        ResultadoConsultaReferenciaBancaria other = (ResultadoConsultaReferenciaBancaria) obj;
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
            ((this.URLFichaDeposito==null && other.getURLFichaDeposito()==null) || 
             (this.URLFichaDeposito!=null &&
              this.URLFichaDeposito.equals(other.getURLFichaDeposito())));
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
        if (getURLFichaDeposito() != null) {
            _hashCode += getURLFichaDeposito().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoConsultaReferenciaBancaria.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoConsultaReferenciaBancaria"));
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
        elemField.setFieldName("URLFichaDeposito");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "URLFichaDeposito"));
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
