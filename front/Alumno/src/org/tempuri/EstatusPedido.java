/**
 * EstatusPedido.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class EstatusPedido  implements java.io.Serializable {
    private java.lang.String cvePedido;

    private int cveEstatus;

    private java.lang.String descripcionEstatus;

    private int cveFormaPago;

    private java.lang.String descFormaPago;

    private java.lang.String mensajeError;

    public EstatusPedido() {
    }

    public EstatusPedido(
           java.lang.String cvePedido,
           int cveEstatus,
           java.lang.String descripcionEstatus,
           int cveFormaPago,
           java.lang.String descFormaPago,
           java.lang.String mensajeError) {
           this.cvePedido = cvePedido;
           this.cveEstatus = cveEstatus;
           this.descripcionEstatus = descripcionEstatus;
           this.cveFormaPago = cveFormaPago;
           this.descFormaPago = descFormaPago;
           this.mensajeError = mensajeError;
    }


    /**
     * Gets the cvePedido value for this EstatusPedido.
     * 
     * @return cvePedido
     */
    public java.lang.String getCvePedido() {
        return cvePedido;
    }


    /**
     * Sets the cvePedido value for this EstatusPedido.
     * 
     * @param cvePedido
     */
    public void setCvePedido(java.lang.String cvePedido) {
        this.cvePedido = cvePedido;
    }


    /**
     * Gets the cveEstatus value for this EstatusPedido.
     * 
     * @return cveEstatus
     */
    public int getCveEstatus() {
        return cveEstatus;
    }


    /**
     * Sets the cveEstatus value for this EstatusPedido.
     * 
     * @param cveEstatus
     */
    public void setCveEstatus(int cveEstatus) {
        this.cveEstatus = cveEstatus;
    }


    /**
     * Gets the descripcionEstatus value for this EstatusPedido.
     * 
     * @return descripcionEstatus
     */
    public java.lang.String getDescripcionEstatus() {
        return descripcionEstatus;
    }


    /**
     * Sets the descripcionEstatus value for this EstatusPedido.
     * 
     * @param descripcionEstatus
     */
    public void setDescripcionEstatus(java.lang.String descripcionEstatus) {
        this.descripcionEstatus = descripcionEstatus;
    }


    /**
     * Gets the cveFormaPago value for this EstatusPedido.
     * 
     * @return cveFormaPago
     */
    public int getCveFormaPago() {
        return cveFormaPago;
    }


    /**
     * Sets the cveFormaPago value for this EstatusPedido.
     * 
     * @param cveFormaPago
     */
    public void setCveFormaPago(int cveFormaPago) {
        this.cveFormaPago = cveFormaPago;
    }


    /**
     * Gets the descFormaPago value for this EstatusPedido.
     * 
     * @return descFormaPago
     */
    public java.lang.String getDescFormaPago() {
        return descFormaPago;
    }


    /**
     * Sets the descFormaPago value for this EstatusPedido.
     * 
     * @param descFormaPago
     */
    public void setDescFormaPago(java.lang.String descFormaPago) {
        this.descFormaPago = descFormaPago;
    }


    /**
     * Gets the mensajeError value for this EstatusPedido.
     * 
     * @return mensajeError
     */
    public java.lang.String getMensajeError() {
        return mensajeError;
    }


    /**
     * Sets the mensajeError value for this EstatusPedido.
     * 
     * @param mensajeError
     */
    public void setMensajeError(java.lang.String mensajeError) {
        this.mensajeError = mensajeError;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof EstatusPedido)) return false;
        EstatusPedido other = (EstatusPedido) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.cvePedido==null && other.getCvePedido()==null) || 
             (this.cvePedido!=null &&
              this.cvePedido.equals(other.getCvePedido()))) &&
            this.cveEstatus == other.getCveEstatus() &&
            ((this.descripcionEstatus==null && other.getDescripcionEstatus()==null) || 
             (this.descripcionEstatus!=null &&
              this.descripcionEstatus.equals(other.getDescripcionEstatus()))) &&
            this.cveFormaPago == other.getCveFormaPago() &&
            ((this.descFormaPago==null && other.getDescFormaPago()==null) || 
             (this.descFormaPago!=null &&
              this.descFormaPago.equals(other.getDescFormaPago()))) &&
            ((this.mensajeError==null && other.getMensajeError()==null) || 
             (this.mensajeError!=null &&
              this.mensajeError.equals(other.getMensajeError())));
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
        if (getCvePedido() != null) {
            _hashCode += getCvePedido().hashCode();
        }
        _hashCode += getCveEstatus();
        if (getDescripcionEstatus() != null) {
            _hashCode += getDescripcionEstatus().hashCode();
        }
        _hashCode += getCveFormaPago();
        if (getDescFormaPago() != null) {
            _hashCode += getDescFormaPago().hashCode();
        }
        if (getMensajeError() != null) {
            _hashCode += getMensajeError().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(EstatusPedido.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "EstatusPedido"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cvePedido");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CvePedido"));
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
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("mensajeError");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MensajeError"));
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
