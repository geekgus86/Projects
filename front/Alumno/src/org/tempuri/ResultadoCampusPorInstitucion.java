/**
 * ResultadoCampusPorInstitucion.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoCampusPorInstitucion  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private org.tempuri.Campus[] catalogoCampusPorInstitucion;

    public ResultadoCampusPorInstitucion() {
    }

    public ResultadoCampusPorInstitucion(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           org.tempuri.Campus[] catalogoCampusPorInstitucion) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.catalogoCampusPorInstitucion = catalogoCampusPorInstitucion;
    }


    /**
     * Gets the resultadoWS value for this ResultadoCampusPorInstitucion.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoCampusPorInstitucion.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoCampusPorInstitucion.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoCampusPorInstitucion.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the catalogoCampusPorInstitucion value for this ResultadoCampusPorInstitucion.
     * 
     * @return catalogoCampusPorInstitucion
     */
    public org.tempuri.Campus[] getCatalogoCampusPorInstitucion() {
        return catalogoCampusPorInstitucion;
    }


    /**
     * Sets the catalogoCampusPorInstitucion value for this ResultadoCampusPorInstitucion.
     * 
     * @param catalogoCampusPorInstitucion
     */
    public void setCatalogoCampusPorInstitucion(org.tempuri.Campus[] catalogoCampusPorInstitucion) {
        this.catalogoCampusPorInstitucion = catalogoCampusPorInstitucion;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoCampusPorInstitucion)) return false;
        ResultadoCampusPorInstitucion other = (ResultadoCampusPorInstitucion) obj;
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
            ((this.catalogoCampusPorInstitucion==null && other.getCatalogoCampusPorInstitucion()==null) || 
             (this.catalogoCampusPorInstitucion!=null &&
              java.util.Arrays.equals(this.catalogoCampusPorInstitucion, other.getCatalogoCampusPorInstitucion())));
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
        if (getCatalogoCampusPorInstitucion() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getCatalogoCampusPorInstitucion());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getCatalogoCampusPorInstitucion(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ResultadoCampusPorInstitucion.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoCampusPorInstitucion"));
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
        elemField.setFieldName("catalogoCampusPorInstitucion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CatalogoCampusPorInstitucion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "Campus"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://tempuri.org/", "Campus"));
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
