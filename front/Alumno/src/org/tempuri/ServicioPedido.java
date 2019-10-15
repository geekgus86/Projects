/**
 * ServicioPedido.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ServicioPedido  implements java.io.Serializable {
    private int consecutivoEnRecibo;

    private int cveProducto;

    private java.lang.String codigoBannerServicio;

    private java.lang.String codigoBannerMoneda;

    private java.lang.String descripcionTienda;

    private double cantidad;

    private double montoAPagar;

    private double precioUnitarioSinIVA;

    private double totalAbonado;

    private double montoAPagarPesos;

    private double totalAbonadoPesos;

    private java.lang.String transaccionAbonoBanner;

    private int cveCampus;

    private java.lang.String codigoCampusBanner;

    public ServicioPedido() {
    }

    public ServicioPedido(
           int consecutivoEnRecibo,
           int cveProducto,
           java.lang.String codigoBannerServicio,
           java.lang.String codigoBannerMoneda,
           java.lang.String descripcionTienda,
           double cantidad,
           double montoAPagar,
           double precioUnitarioSinIVA,
           double totalAbonado,
           double montoAPagarPesos,
           double totalAbonadoPesos,
           java.lang.String transaccionAbonoBanner,
           int cveCampus,
           java.lang.String codigoCampusBanner) {
           this.consecutivoEnRecibo = consecutivoEnRecibo;
           this.cveProducto = cveProducto;
           this.codigoBannerServicio = codigoBannerServicio;
           this.codigoBannerMoneda = codigoBannerMoneda;
           this.descripcionTienda = descripcionTienda;
           this.cantidad = cantidad;
           this.montoAPagar = montoAPagar;
           this.precioUnitarioSinIVA = precioUnitarioSinIVA;
           this.totalAbonado = totalAbonado;
           this.montoAPagarPesos = montoAPagarPesos;
           this.totalAbonadoPesos = totalAbonadoPesos;
           this.transaccionAbonoBanner = transaccionAbonoBanner;
           this.cveCampus = cveCampus;
           this.codigoCampusBanner = codigoCampusBanner;
    }


    /**
     * Gets the consecutivoEnRecibo value for this ServicioPedido.
     * 
     * @return consecutivoEnRecibo
     */
    public int getConsecutivoEnRecibo() {
        return consecutivoEnRecibo;
    }


    /**
     * Sets the consecutivoEnRecibo value for this ServicioPedido.
     * 
     * @param consecutivoEnRecibo
     */
    public void setConsecutivoEnRecibo(int consecutivoEnRecibo) {
        this.consecutivoEnRecibo = consecutivoEnRecibo;
    }


    /**
     * Gets the cveProducto value for this ServicioPedido.
     * 
     * @return cveProducto
     */
    public int getCveProducto() {
        return cveProducto;
    }


    /**
     * Sets the cveProducto value for this ServicioPedido.
     * 
     * @param cveProducto
     */
    public void setCveProducto(int cveProducto) {
        this.cveProducto = cveProducto;
    }


    /**
     * Gets the codigoBannerServicio value for this ServicioPedido.
     * 
     * @return codigoBannerServicio
     */
    public java.lang.String getCodigoBannerServicio() {
        return codigoBannerServicio;
    }


    /**
     * Sets the codigoBannerServicio value for this ServicioPedido.
     * 
     * @param codigoBannerServicio
     */
    public void setCodigoBannerServicio(java.lang.String codigoBannerServicio) {
        this.codigoBannerServicio = codigoBannerServicio;
    }


    /**
     * Gets the codigoBannerMoneda value for this ServicioPedido.
     * 
     * @return codigoBannerMoneda
     */
    public java.lang.String getCodigoBannerMoneda() {
        return codigoBannerMoneda;
    }


    /**
     * Sets the codigoBannerMoneda value for this ServicioPedido.
     * 
     * @param codigoBannerMoneda
     */
    public void setCodigoBannerMoneda(java.lang.String codigoBannerMoneda) {
        this.codigoBannerMoneda = codigoBannerMoneda;
    }


    /**
     * Gets the descripcionTienda value for this ServicioPedido.
     * 
     * @return descripcionTienda
     */
    public java.lang.String getDescripcionTienda() {
        return descripcionTienda;
    }


    /**
     * Sets the descripcionTienda value for this ServicioPedido.
     * 
     * @param descripcionTienda
     */
    public void setDescripcionTienda(java.lang.String descripcionTienda) {
        this.descripcionTienda = descripcionTienda;
    }


    /**
     * Gets the cantidad value for this ServicioPedido.
     * 
     * @return cantidad
     */
    public double getCantidad() {
        return cantidad;
    }


    /**
     * Sets the cantidad value for this ServicioPedido.
     * 
     * @param cantidad
     */
    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }


    /**
     * Gets the montoAPagar value for this ServicioPedido.
     * 
     * @return montoAPagar
     */
    public double getMontoAPagar() {
        return montoAPagar;
    }


    /**
     * Sets the montoAPagar value for this ServicioPedido.
     * 
     * @param montoAPagar
     */
    public void setMontoAPagar(double montoAPagar) {
        this.montoAPagar = montoAPagar;
    }


    /**
     * Gets the precioUnitarioSinIVA value for this ServicioPedido.
     * 
     * @return precioUnitarioSinIVA
     */
    public double getPrecioUnitarioSinIVA() {
        return precioUnitarioSinIVA;
    }


    /**
     * Sets the precioUnitarioSinIVA value for this ServicioPedido.
     * 
     * @param precioUnitarioSinIVA
     */
    public void setPrecioUnitarioSinIVA(double precioUnitarioSinIVA) {
        this.precioUnitarioSinIVA = precioUnitarioSinIVA;
    }


    /**
     * Gets the totalAbonado value for this ServicioPedido.
     * 
     * @return totalAbonado
     */
    public double getTotalAbonado() {
        return totalAbonado;
    }


    /**
     * Sets the totalAbonado value for this ServicioPedido.
     * 
     * @param totalAbonado
     */
    public void setTotalAbonado(double totalAbonado) {
        this.totalAbonado = totalAbonado;
    }


    /**
     * Gets the montoAPagarPesos value for this ServicioPedido.
     * 
     * @return montoAPagarPesos
     */
    public double getMontoAPagarPesos() {
        return montoAPagarPesos;
    }


    /**
     * Sets the montoAPagarPesos value for this ServicioPedido.
     * 
     * @param montoAPagarPesos
     */
    public void setMontoAPagarPesos(double montoAPagarPesos) {
        this.montoAPagarPesos = montoAPagarPesos;
    }


    /**
     * Gets the totalAbonadoPesos value for this ServicioPedido.
     * 
     * @return totalAbonadoPesos
     */
    public double getTotalAbonadoPesos() {
        return totalAbonadoPesos;
    }


    /**
     * Sets the totalAbonadoPesos value for this ServicioPedido.
     * 
     * @param totalAbonadoPesos
     */
    public void setTotalAbonadoPesos(double totalAbonadoPesos) {
        this.totalAbonadoPesos = totalAbonadoPesos;
    }


    /**
     * Gets the transaccionAbonoBanner value for this ServicioPedido.
     * 
     * @return transaccionAbonoBanner
     */
    public java.lang.String getTransaccionAbonoBanner() {
        return transaccionAbonoBanner;
    }


    /**
     * Sets the transaccionAbonoBanner value for this ServicioPedido.
     * 
     * @param transaccionAbonoBanner
     */
    public void setTransaccionAbonoBanner(java.lang.String transaccionAbonoBanner) {
        this.transaccionAbonoBanner = transaccionAbonoBanner;
    }


    /**
     * Gets the cveCampus value for this ServicioPedido.
     * 
     * @return cveCampus
     */
    public int getCveCampus() {
        return cveCampus;
    }


    /**
     * Sets the cveCampus value for this ServicioPedido.
     * 
     * @param cveCampus
     */
    public void setCveCampus(int cveCampus) {
        this.cveCampus = cveCampus;
    }


    /**
     * Gets the codigoCampusBanner value for this ServicioPedido.
     * 
     * @return codigoCampusBanner
     */
    public java.lang.String getCodigoCampusBanner() {
        return codigoCampusBanner;
    }


    /**
     * Sets the codigoCampusBanner value for this ServicioPedido.
     * 
     * @param codigoCampusBanner
     */
    public void setCodigoCampusBanner(java.lang.String codigoCampusBanner) {
        this.codigoCampusBanner = codigoCampusBanner;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ServicioPedido)) return false;
        ServicioPedido other = (ServicioPedido) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.consecutivoEnRecibo == other.getConsecutivoEnRecibo() &&
            this.cveProducto == other.getCveProducto() &&
            ((this.codigoBannerServicio==null && other.getCodigoBannerServicio()==null) || 
             (this.codigoBannerServicio!=null &&
              this.codigoBannerServicio.equals(other.getCodigoBannerServicio()))) &&
            ((this.codigoBannerMoneda==null && other.getCodigoBannerMoneda()==null) || 
             (this.codigoBannerMoneda!=null &&
              this.codigoBannerMoneda.equals(other.getCodigoBannerMoneda()))) &&
            ((this.descripcionTienda==null && other.getDescripcionTienda()==null) || 
             (this.descripcionTienda!=null &&
              this.descripcionTienda.equals(other.getDescripcionTienda()))) &&
            this.cantidad == other.getCantidad() &&
            this.montoAPagar == other.getMontoAPagar() &&
            this.precioUnitarioSinIVA == other.getPrecioUnitarioSinIVA() &&
            this.totalAbonado == other.getTotalAbonado() &&
            this.montoAPagarPesos == other.getMontoAPagarPesos() &&
            this.totalAbonadoPesos == other.getTotalAbonadoPesos() &&
            ((this.transaccionAbonoBanner==null && other.getTransaccionAbonoBanner()==null) || 
             (this.transaccionAbonoBanner!=null &&
              this.transaccionAbonoBanner.equals(other.getTransaccionAbonoBanner()))) &&
            this.cveCampus == other.getCveCampus() &&
            ((this.codigoCampusBanner==null && other.getCodigoCampusBanner()==null) || 
             (this.codigoCampusBanner!=null &&
              this.codigoCampusBanner.equals(other.getCodigoCampusBanner())));
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
        _hashCode += getConsecutivoEnRecibo();
        _hashCode += getCveProducto();
        if (getCodigoBannerServicio() != null) {
            _hashCode += getCodigoBannerServicio().hashCode();
        }
        if (getCodigoBannerMoneda() != null) {
            _hashCode += getCodigoBannerMoneda().hashCode();
        }
        if (getDescripcionTienda() != null) {
            _hashCode += getDescripcionTienda().hashCode();
        }
        _hashCode += new Double(getCantidad()).hashCode();
        _hashCode += new Double(getMontoAPagar()).hashCode();
        _hashCode += new Double(getPrecioUnitarioSinIVA()).hashCode();
        _hashCode += new Double(getTotalAbonado()).hashCode();
        _hashCode += new Double(getMontoAPagarPesos()).hashCode();
        _hashCode += new Double(getTotalAbonadoPesos()).hashCode();
        if (getTransaccionAbonoBanner() != null) {
            _hashCode += getTransaccionAbonoBanner().hashCode();
        }
        _hashCode += getCveCampus();
        if (getCodigoCampusBanner() != null) {
            _hashCode += getCodigoCampusBanner().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ServicioPedido.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ServicioPedido"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("consecutivoEnRecibo");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "ConsecutivoEnRecibo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cveProducto");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveProducto"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoBannerServicio");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoBannerServicio"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoBannerMoneda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoBannerMoneda"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descripcionTienda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "DescripcionTienda"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("cantidad");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "Cantidad"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("montoAPagar");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoAPagar"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("precioUnitarioSinIVA");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "PrecioUnitarioSinIVA"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("totalAbonado");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "TotalAbonado"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("montoAPagarPesos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoAPagarPesos"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("totalAbonadoPesos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "TotalAbonadoPesos"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("transaccionAbonoBanner");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "TransaccionAbonoBanner"));
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
