/**
 * Campus.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class Campus  implements java.io.Serializable {
    private int cveCampus;

    private java.lang.String codigoCampusBanner;

    private java.lang.String codigoCampusSAP;

    private java.lang.String nombreCampus;

    private java.lang.String mensajeError;

    public Campus() {
    }

    public Campus(
           int cveCampus,
           java.lang.String codigoCampusBanner,
           java.lang.String codigoCampusSAP,
           java.lang.String nombreCampus,
           java.lang.String mensajeError) {
           this.cveCampus = cveCampus;
           this.codigoCampusBanner = codigoCampusBanner;
           this.codigoCampusSAP = codigoCampusSAP;
           this.nombreCampus = nombreCampus;
           this.mensajeError = mensajeError;
    }


    /**
     * Gets the cveCampus value for this Campus.
     * 
     * @return cveCampus
     */
    public int getCveCampus() {
        return cveCampus;
    }


    /**
     * Sets the cveCampus value for this Campus.
     * 
     * @param cveCampus
     */
    public void setCveCampus(int cveCampus) {
        this.cveCampus = cveCampus;
    }


    /**
     * Gets the codigoCampusBanner value for this Campus.
     * 
     * @return codigoCampusBanner
     */
    public java.lang.String getCodigoCampusBanner() {
        return codigoCampusBanner;
    }


    /**
     * Sets the codigoCampusBanner value for this Campus.
     * 
     * @param codigoCampusBanner
     */
    public void setCodigoCampusBanner(java.lang.String codigoCampusBanner) {
        this.codigoCampusBanner = codigoCampusBanner;
    }


    /**
     * Gets the codigoCampusSAP value for this Campus.
     * 
     * @return codigoCampusSAP
     */
    public java.lang.String getCodigoCampusSAP() {
        return codigoCampusSAP;
    }


    /**
     * Sets the codigoCampusSAP value for this Campus.
     * 
     * @param codigoCampusSAP
     */
    public void setCodigoCampusSAP(java.lang.String codigoCampusSAP) {
        this.codigoCampusSAP = codigoCampusSAP;
    }


    /**
     * Gets the nombreCampus value for this Campus.
     * 
     * @return nombreCampus
     */
    public java.lang.String getNombreCampus() {
        return nombreCampus;
    }


    /**
     * Sets the nombreCampus value for this Campus.
     * 
     * @param nombreCampus
     */
    public void setNombreCampus(java.lang.String nombreCampus) {
        this.nombreCampus = nombreCampus;
    }


    /**
     * Gets the mensajeError value for this Campus.
     * 
     * @return mensajeError
     */
    public java.lang.String getMensajeError() {
        return mensajeError;
    }


    /**
     * Sets the mensajeError value for this Campus.
     * 
     * @param mensajeError
     */
    public void setMensajeError(java.lang.String mensajeError) {
        this.mensajeError = mensajeError;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Campus)) return false;
        Campus other = (Campus) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.cveCampus == other.getCveCampus() &&
            ((this.codigoCampusBanner==null && other.getCodigoCampusBanner()==null) || 
             (this.codigoCampusBanner!=null &&
              this.codigoCampusBanner.equals(other.getCodigoCampusBanner()))) &&
            ((this.codigoCampusSAP==null && other.getCodigoCampusSAP()==null) || 
             (this.codigoCampusSAP!=null &&
              this.codigoCampusSAP.equals(other.getCodigoCampusSAP()))) &&
            ((this.nombreCampus==null && other.getNombreCampus()==null) || 
             (this.nombreCampus!=null &&
              this.nombreCampus.equals(other.getNombreCampus()))) &&
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
        _hashCode += getCveCampus();
        if (getCodigoCampusBanner() != null) {
            _hashCode += getCodigoCampusBanner().hashCode();
        }
        if (getCodigoCampusSAP() != null) {
            _hashCode += getCodigoCampusSAP().hashCode();
        }
        if (getNombreCampus() != null) {
            _hashCode += getNombreCampus().hashCode();
        }
        if (getMensajeError() != null) {
            _hashCode += getMensajeError().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Campus.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "Campus"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveCampus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveCampus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoCampusBanner");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoCampusBanner"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoCampusSAP");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoCampusSAP"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("nombreCampus");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "NombreCampus"));
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
