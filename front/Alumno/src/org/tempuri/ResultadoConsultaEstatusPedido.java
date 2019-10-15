/**
 * ResultadoConsultaEstatusPedido.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoConsultaEstatusPedido  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private int cveEstatus;

    private java.lang.String descripcionEstatus;

    private int cveFormaPago;

    private java.lang.String descFormaPago;

    public ResultadoConsultaEstatusPedido() {
    }

    public ResultadoConsultaEstatusPedido(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           int cveEstatus,
           java.lang.String descripcionEstatus,
           int cveFormaPago,
           java.lang.String descFormaPago) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.cveEstatus = cveEstatus;
           this.descripcionEstatus = descripcionEstatus;
           this.cveFormaPago = cveFormaPago;
           this.descFormaPago = descFormaPago;
    }


    /**
     * Gets the resultadoWS value for this ResultadoConsultaEstatusPedido.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoConsultaEstatusPedido.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoConsultaEstatusPedido.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoConsultaEstatusPedido.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the cveEstatus value for this ResultadoConsultaEstatusPedido.
     * 
     * @return cveEstatus
     */
    public int getCveEstatus() {
        return cveEstatus;
    }


    /**
     * Sets the cveEstatus value for this ResultadoConsultaEstatusPedido.
     * 
     * @param cveEstatus
     */
    public void setCveEstatus(int cveEstatus) {
        this.cveEstatus = cveEstatus;
    }


    /**
     * Gets the descripcionEstatus value for this ResultadoConsultaEstatusPedido.
     * 
     * @return descripcionEstatus
     */
    public java.lang.String getDescripcionEstatus() {
        return descripcionEstatus;
    }


    /**
     * Sets the descripcionEstatus value for this ResultadoConsultaEstatusPedido.
     * 
     * @param descripcionEstatus
     */
    public void setDescripcionEstatus(java.lang.String descripcionEstatus) {
        this.descripcionEstatus = descripcionEstatus;
    }


    /**
     * Gets the cveFormaPago value for this ResultadoConsultaEstatusPedido.
     * 
     * @return cveFormaPago
     */
    public int getCveFormaPago() {
        return cveFormaPago;
    }


    /**
     * Sets the cveFormaPago value for this ResultadoConsultaEstatusPedido.
     * 
     * @param cveFormaPago
     */
    public void setCveFormaPago(int cveFormaPago) {
        this.cveFormaPago = cveFormaPago;
    }


    /**
     * Gets the descFormaPago value for this ResultadoConsultaEstatusPedido.
     * 
     * @return descFormaPago
     */
    public java.lang.String getDescFormaPago() {
        return descFormaPago;
    }


    /**
     * Sets the descFormaPago value for this ResultadoConsultaEstatusPedido.
     * 
     * @param descFormaPago
     */
    public void setDescFormaPago(java.lang.String descFormaPago) {
        this.descFormaPago = descFormaPago;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoConsultaEstatusPedido)) return false;
        ResultadoConsultaEstatusPedido other = (ResultadoConsultaEstatusPedido) obj;
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
            this.cveEstatus == other.getCveEstatus() &&
            ((this.descripcionEstatus==null && other.getDescripcionEstatus()==null) || 
             (this.descripcionEstatus!=null &&
              this.descripcionEstatus.equals(other.getDescripcionEstatus()))) &&
            this.cveFormaPago == other.getCveFormaPago() &&
            ((this.descFormaPago==null && other.getDescFormaPago()==null) || 
             (this.descFormaPago!=null &&
              this.descFormaPago.equals(other.getDescFormaPago())));
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
        _hashCode += getCveEstatus();
        if (getDescripcionEstatus() != null) {
            _hashCode += getDescripcionEstatus().hashCode();
        }
        _hashCode += getCveFormaPago();
        if (getDescFormaPago() != null) {
            _hashCode += getDescFormaPago().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoConsultaEstatusPedido.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoConsultaEstatusPedido"));
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
        elemField.setFieldName("cveEstatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveEstatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionEstatus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionEstatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveFormaPago");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveFormaPago"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descFormaPago");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescFormaPago"));
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
