/**
 * ResultadoInformacionCampus.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoInformacionCampus  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private int cveCampus;

    private java.lang.String codigoCampusBanner;

    private java.lang.String codigoCampusSAP;

    private java.lang.String nombreCampus;

    private int cveInstitucion;

    public ResultadoInformacionCampus() {
    }

    public ResultadoInformacionCampus(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           int cveCampus,
           java.lang.String codigoCampusBanner,
           java.lang.String codigoCampusSAP,
           java.lang.String nombreCampus,
           int cveInstitucion) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.cveCampus = cveCampus;
           this.codigoCampusBanner = codigoCampusBanner;
           this.codigoCampusSAP = codigoCampusSAP;
           this.nombreCampus = nombreCampus;
           this.cveInstitucion = cveInstitucion;
    }


    /**
     * Gets the resultadoWS value for this ResultadoInformacionCampus.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoInformacionCampus.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoInformacionCampus.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoInformacionCampus.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the cveCampus value for this ResultadoInformacionCampus.
     * 
     * @return cveCampus
     */
    public int getCveCampus() {
        return cveCampus;
    }


    /**
     * Sets the cveCampus value for this ResultadoInformacionCampus.
     * 
     * @param cveCampus
     */
    public void setCveCampus(int cveCampus) {
        this.cveCampus = cveCampus;
    }


    /**
     * Gets the codigoCampusBanner value for this ResultadoInformacionCampus.
     * 
     * @return codigoCampusBanner
     */
    public java.lang.String getCodigoCampusBanner() {
        return codigoCampusBanner;
    }


    /**
     * Sets the codigoCampusBanner value for this ResultadoInformacionCampus.
     * 
     * @param codigoCampusBanner
     */
    public void setCodigoCampusBanner(java.lang.String codigoCampusBanner) {
        this.codigoCampusBanner = codigoCampusBanner;
    }


    /**
     * Gets the codigoCampusSAP value for this ResultadoInformacionCampus.
     * 
     * @return codigoCampusSAP
     */
    public java.lang.String getCodigoCampusSAP() {
        return codigoCampusSAP;
    }


    /**
     * Sets the codigoCampusSAP value for this ResultadoInformacionCampus.
     * 
     * @param codigoCampusSAP
     */
    public void setCodigoCampusSAP(java.lang.String codigoCampusSAP) {
        this.codigoCampusSAP = codigoCampusSAP;
    }


    /**
     * Gets the nombreCampus value for this ResultadoInformacionCampus.
     * 
     * @return nombreCampus
     */
    public java.lang.String getNombreCampus() {
        return nombreCampus;
    }


    /**
     * Sets the nombreCampus value for this ResultadoInformacionCampus.
     * 
     * @param nombreCampus
     */
    public void setNombreCampus(java.lang.String nombreCampus) {
        this.nombreCampus = nombreCampus;
    }


    /**
     * Gets the cveInstitucion value for this ResultadoInformacionCampus.
     * 
     * @return cveInstitucion
     */
    public int getCveInstitucion() {
        return cveInstitucion;
    }


    /**
     * Sets the cveInstitucion value for this ResultadoInformacionCampus.
     * 
     * @param cveInstitucion
     */
    public void setCveInstitucion(int cveInstitucion) {
        this.cveInstitucion = cveInstitucion;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoInformacionCampus)) return false;
        ResultadoInformacionCampus other = (ResultadoInformacionCampus) obj;
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
            this.cveInstitucion == other.getCveInstitucion();
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
        _hashCode += getCveInstitucion();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoInformacionCampus.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoInformacionCampus"));
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
        elemField.setFieldName("cveInstitucion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveInstitucion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
