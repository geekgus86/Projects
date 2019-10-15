/**
 * FormaDePago.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class FormaDePago  implements java.io.Serializable {
    private int cveFormaPago;

    private java.lang.String descripcionFormaDePago;

    private java.lang.String cveMoneda;

    private java.lang.String codigoMoneda;

    private java.lang.String mensajeError;

    public FormaDePago() {
    }

    public FormaDePago(
           int cveFormaPago,
           java.lang.String descripcionFormaDePago,
           java.lang.String cveMoneda,
           java.lang.String codigoMoneda,
           java.lang.String mensajeError) {
           this.cveFormaPago = cveFormaPago;
           this.descripcionFormaDePago = descripcionFormaDePago;
           this.cveMoneda = cveMoneda;
           this.codigoMoneda = codigoMoneda;
           this.mensajeError = mensajeError;
    }


    /**
     * Gets the cveFormaPago value for this FormaDePago.
     * 
     * @return cveFormaPago
     */
    public int getCveFormaPago() {
        return cveFormaPago;
    }


    /**
     * Sets the cveFormaPago value for this FormaDePago.
     * 
     * @param cveFormaPago
     */
    public void setCveFormaPago(int cveFormaPago) {
        this.cveFormaPago = cveFormaPago;
    }


    /**
     * Gets the descripcionFormaDePago value for this FormaDePago.
     * 
     * @return descripcionFormaDePago
     */
    public java.lang.String getDescripcionFormaDePago() {
        return descripcionFormaDePago;
    }


    /**
     * Sets the descripcionFormaDePago value for this FormaDePago.
     * 
     * @param descripcionFormaDePago
     */
    public void setDescripcionFormaDePago(java.lang.String descripcionFormaDePago) {
        this.descripcionFormaDePago = descripcionFormaDePago;
    }


    /**
     * Gets the cveMoneda value for this FormaDePago.
     * 
     * @return cveMoneda
     */
    public java.lang.String getCveMoneda() {
        return cveMoneda;
    }


    /**
     * Sets the cveMoneda value for this FormaDePago.
     * 
     * @param cveMoneda
     */
    public void setCveMoneda(java.lang.String cveMoneda) {
        this.cveMoneda = cveMoneda;
    }


    /**
     * Gets the codigoMoneda value for this FormaDePago.
     * 
     * @return codigoMoneda
     */
    public java.lang.String getCodigoMoneda() {
        return codigoMoneda;
    }


    /**
     * Sets the codigoMoneda value for this FormaDePago.
     * 
     * @param codigoMoneda
     */
    public void setCodigoMoneda(java.lang.String codigoMoneda) {
        this.codigoMoneda = codigoMoneda;
    }


    /**
     * Gets the mensajeError value for this FormaDePago.
     * 
     * @return mensajeError
     */
    public java.lang.String getMensajeError() {
        return mensajeError;
    }


    /**
     * Sets the mensajeError value for this FormaDePago.
     * 
     * @param mensajeError
     */
    public void setMensajeError(java.lang.String mensajeError) {
        this.mensajeError = mensajeError;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof FormaDePago)) return false;
        FormaDePago other = (FormaDePago) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.cveFormaPago == other.getCveFormaPago() &&
            ((this.descripcionFormaDePago==null && other.getDescripcionFormaDePago()==null) || 
             (this.descripcionFormaDePago!=null &&
              this.descripcionFormaDePago.equals(other.getDescripcionFormaDePago()))) &&
            ((this.cveMoneda==null && other.getCveMoneda()==null) || 
             (this.cveMoneda!=null &&
              this.cveMoneda.equals(other.getCveMoneda()))) &&
            ((this.codigoMoneda==null && other.getCodigoMoneda()==null) || 
             (this.codigoMoneda!=null &&
              this.codigoMoneda.equals(other.getCodigoMoneda()))) &&
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
        _hashCode += getCveFormaPago();
        if (getDescripcionFormaDePago() != null) {
            _hashCode += getDescripcionFormaDePago().hashCode();
        }
        if (getCveMoneda() != null) {
            _hashCode += getCveMoneda().hashCode();
        }
        if (getCodigoMoneda() != null) {
            _hashCode += getCodigoMoneda().hashCode();
        }
        if (getMensajeError() != null) {
            _hashCode += getMensajeError().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(FormaDePago.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "FormaDePago"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveFormaPago");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveFormaPago"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionFormaDePago");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionFormaDePago"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveMoneda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveMoneda"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoMoneda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoMoneda"));
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
