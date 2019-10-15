/**
 * BancoBancaElectronica.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class BancoBancaElectronica  implements java.io.Serializable {
    private java.lang.String cveBanco;

    private java.lang.String descripcionBanco;

    private java.lang.String idBancoMotorPagos;

    private java.lang.String descripcionBancoMotor;

    private java.lang.String idBancoBanner;

    private java.lang.String idBancoSAP;

    private java.lang.String mensajeError;

    public BancoBancaElectronica() {
    }

    public BancoBancaElectronica(
           java.lang.String cveBanco,
           java.lang.String descripcionBanco,
           java.lang.String idBancoMotorPagos,
           java.lang.String descripcionBancoMotor,
           java.lang.String idBancoBanner,
           java.lang.String idBancoSAP,
           java.lang.String mensajeError) {
           this.cveBanco = cveBanco;
           this.descripcionBanco = descripcionBanco;
           this.idBancoMotorPagos = idBancoMotorPagos;
           this.descripcionBancoMotor = descripcionBancoMotor;
           this.idBancoBanner = idBancoBanner;
           this.idBancoSAP = idBancoSAP;
           this.mensajeError = mensajeError;
    }


    /**
     * Gets the cveBanco value for this BancoBancaElectronica.
     * 
     * @return cveBanco
     */
    public java.lang.String getCveBanco() {
        return cveBanco;
    }


    /**
     * Sets the cveBanco value for this BancoBancaElectronica.
     * 
     * @param cveBanco
     */
    public void setCveBanco(java.lang.String cveBanco) {
        this.cveBanco = cveBanco;
    }


    /**
     * Gets the descripcionBanco value for this BancoBancaElectronica.
     * 
     * @return descripcionBanco
     */
    public java.lang.String getDescripcionBanco() {
        return descripcionBanco;
    }


    /**
     * Sets the descripcionBanco value for this BancoBancaElectronica.
     * 
     * @param descripcionBanco
     */
    public void setDescripcionBanco(java.lang.String descripcionBanco) {
        this.descripcionBanco = descripcionBanco;
    }


    /**
     * Gets the idBancoMotorPagos value for this BancoBancaElectronica.
     * 
     * @return idBancoMotorPagos
     */
    public java.lang.String getIdBancoMotorPagos() {
        return idBancoMotorPagos;
    }


    /**
     * Sets the idBancoMotorPagos value for this BancoBancaElectronica.
     * 
     * @param idBancoMotorPagos
     */
    public void setIdBancoMotorPagos(java.lang.String idBancoMotorPagos) {
        this.idBancoMotorPagos = idBancoMotorPagos;
    }


    /**
     * Gets the descripcionBancoMotor value for this BancoBancaElectronica.
     * 
     * @return descripcionBancoMotor
     */
    public java.lang.String getDescripcionBancoMotor() {
        return descripcionBancoMotor;
    }


    /**
     * Sets the descripcionBancoMotor value for this BancoBancaElectronica.
     * 
     * @param descripcionBancoMotor
     */
    public void setDescripcionBancoMotor(java.lang.String descripcionBancoMotor) {
        this.descripcionBancoMotor = descripcionBancoMotor;
    }


    /**
     * Gets the idBancoBanner value for this BancoBancaElectronica.
     * 
     * @return idBancoBanner
     */
    public java.lang.String getIdBancoBanner() {
        return idBancoBanner;
    }


    /**
     * Sets the idBancoBanner value for this BancoBancaElectronica.
     * 
     * @param idBancoBanner
     */
    public void setIdBancoBanner(java.lang.String idBancoBanner) {
        this.idBancoBanner = idBancoBanner;
    }


    /**
     * Gets the idBancoSAP value for this BancoBancaElectronica.
     * 
     * @return idBancoSAP
     */
    public java.lang.String getIdBancoSAP() {
        return idBancoSAP;
    }


    /**
     * Sets the idBancoSAP value for this BancoBancaElectronica.
     * 
     * @param idBancoSAP
     */
    public void setIdBancoSAP(java.lang.String idBancoSAP) {
        this.idBancoSAP = idBancoSAP;
    }


    /**
     * Gets the mensajeError value for this BancoBancaElectronica.
     * 
     * @return mensajeError
     */
    public java.lang.String getMensajeError() {
        return mensajeError;
    }


    /**
     * Sets the mensajeError value for this BancoBancaElectronica.
     * 
     * @param mensajeError
     */
    public void setMensajeError(java.lang.String mensajeError) {
        this.mensajeError = mensajeError;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof BancoBancaElectronica)) return false;
        BancoBancaElectronica other = (BancoBancaElectronica) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.cveBanco==null && other.getCveBanco()==null) || 
             (this.cveBanco!=null &&
              this.cveBanco.equals(other.getCveBanco()))) &&
            ((this.descripcionBanco==null && other.getDescripcionBanco()==null) || 
             (this.descripcionBanco!=null &&
              this.descripcionBanco.equals(other.getDescripcionBanco()))) &&
            ((this.idBancoMotorPagos==null && other.getIdBancoMotorPagos()==null) || 
             (this.idBancoMotorPagos!=null &&
              this.idBancoMotorPagos.equals(other.getIdBancoMotorPagos()))) &&
            ((this.descripcionBancoMotor==null && other.getDescripcionBancoMotor()==null) || 
             (this.descripcionBancoMotor!=null &&
              this.descripcionBancoMotor.equals(other.getDescripcionBancoMotor()))) &&
            ((this.idBancoBanner==null && other.getIdBancoBanner()==null) || 
             (this.idBancoBanner!=null &&
              this.idBancoBanner.equals(other.getIdBancoBanner()))) &&
            ((this.idBancoSAP==null && other.getIdBancoSAP()==null) || 
             (this.idBancoSAP!=null &&
              this.idBancoSAP.equals(other.getIdBancoSAP()))) &&
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
        if (getCveBanco() != null) {
            _hashCode += getCveBanco().hashCode();
        }
        if (getDescripcionBanco() != null) {
            _hashCode += getDescripcionBanco().hashCode();
        }
        if (getIdBancoMotorPagos() != null) {
            _hashCode += getIdBancoMotorPagos().hashCode();
        }
        if (getDescripcionBancoMotor() != null) {
            _hashCode += getDescripcionBancoMotor().hashCode();
        }
        if (getIdBancoBanner() != null) {
            _hashCode += getIdBancoBanner().hashCode();
        }
        if (getIdBancoSAP() != null) {
            _hashCode += getIdBancoSAP().hashCode();
        }
        if (getMensajeError() != null) {
            _hashCode += getMensajeError().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(BancoBancaElectronica.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "BancoBancaElectronica"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveBanco");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveBanco"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionBanco");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionBanco"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idBancoMotorPagos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdBancoMotorPagos"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionBancoMotor");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionBancoMotor"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idBancoBanner");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdBancoBanner"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idBancoSAP");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdBancoSAP"));
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
