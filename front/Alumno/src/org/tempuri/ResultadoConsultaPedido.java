/**
 * ResultadoConsultaPedido.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class ResultadoConsultaPedido  implements java.io.Serializable {
    private java.lang.String resultadoWS;

    private java.lang.String mensaje;

    private int cvePedido;

    private java.lang.String folioTienda;

    private java.lang.String idCliente;

    private java.lang.String nombreCliente;

    private java.lang.String correoElectronicoCliente;

    private int cveEstatus;

    private java.lang.String descripcionEstatus;

    private int cveMoneda;

    private java.lang.String codigoMoneda;

    private double montoTotal;

    private double totalAbonado;

    private double montoPendienteDePago;

    private double montoTotalEnPesos;

    private double totalAbonadoPesos;

    private double montoPendienteDePagoPesos;

    private double totalPagoExcedentePesos;

    private int cveFormaPago;

    private java.lang.String descFormaPago;

    private java.lang.String referenciaBancaria;

    private java.lang.String tipoTransaccion;

    private java.lang.String codigoPromocionTarjetaDeCredito;

    private java.lang.String idBancoBancaElectronica;

    private org.tempuri.ServicioPedido[] servicios;

    public ResultadoConsultaPedido() {
    }

    public ResultadoConsultaPedido(
           java.lang.String resultadoWS,
           java.lang.String mensaje,
           int cvePedido,
           java.lang.String folioTienda,
           java.lang.String idCliente,
           java.lang.String nombreCliente,
           java.lang.String correoElectronicoCliente,
           int cveEstatus,
           java.lang.String descripcionEstatus,
           int cveMoneda,
           java.lang.String codigoMoneda,
           double montoTotal,
           double totalAbonado,
           double montoPendienteDePago,
           double montoTotalEnPesos,
           double totalAbonadoPesos,
           double montoPendienteDePagoPesos,
           double totalPagoExcedentePesos,
           int cveFormaPago,
           java.lang.String descFormaPago,
           java.lang.String referenciaBancaria,
           java.lang.String tipoTransaccion,
           java.lang.String codigoPromocionTarjetaDeCredito,
           java.lang.String idBancoBancaElectronica,
           org.tempuri.ServicioPedido[] servicios) {
           this.resultadoWS = resultadoWS;
           this.mensaje = mensaje;
           this.cvePedido = cvePedido;
           this.folioTienda = folioTienda;
           this.idCliente = idCliente;
           this.nombreCliente = nombreCliente;
           this.correoElectronicoCliente = correoElectronicoCliente;
           this.cveEstatus = cveEstatus;
           this.descripcionEstatus = descripcionEstatus;
           this.cveMoneda = cveMoneda;
           this.codigoMoneda = codigoMoneda;
           this.montoTotal = montoTotal;
           this.totalAbonado = totalAbonado;
           this.montoPendienteDePago = montoPendienteDePago;
           this.montoTotalEnPesos = montoTotalEnPesos;
           this.totalAbonadoPesos = totalAbonadoPesos;
           this.montoPendienteDePagoPesos = montoPendienteDePagoPesos;
           this.totalPagoExcedentePesos = totalPagoExcedentePesos;
           this.cveFormaPago = cveFormaPago;
           this.descFormaPago = descFormaPago;
           this.referenciaBancaria = referenciaBancaria;
           this.tipoTransaccion = tipoTransaccion;
           this.codigoPromocionTarjetaDeCredito = codigoPromocionTarjetaDeCredito;
           this.idBancoBancaElectronica = idBancoBancaElectronica;
           this.servicios = servicios;
    }


    /**
     * Gets the resultadoWS value for this ResultadoConsultaPedido.
     * 
     * @return resultadoWS
     */
    public java.lang.String getResultadoWS() {
        return resultadoWS;
    }


    /**
     * Sets the resultadoWS value for this ResultadoConsultaPedido.
     * 
     * @param resultadoWS
     */
    public void setResultadoWS(java.lang.String resultadoWS) {
        this.resultadoWS = resultadoWS;
    }


    /**
     * Gets the mensaje value for this ResultadoConsultaPedido.
     * 
     * @return mensaje
     */
    public java.lang.String getMensaje() {
        return mensaje;
    }


    /**
     * Sets the mensaje value for this ResultadoConsultaPedido.
     * 
     * @param mensaje
     */
    public void setMensaje(java.lang.String mensaje) {
        this.mensaje = mensaje;
    }


    /**
     * Gets the cvePedido value for this ResultadoConsultaPedido.
     * 
     * @return cvePedido
     */
    public int getCvePedido() {
        return cvePedido;
    }


    /**
     * Sets the cvePedido value for this ResultadoConsultaPedido.
     * 
     * @param cvePedido
     */
    public void setCvePedido(int cvePedido) {
        this.cvePedido = cvePedido;
    }


    /**
     * Gets the folioTienda value for this ResultadoConsultaPedido.
     * 
     * @return folioTienda
     */
    public java.lang.String getFolioTienda() {
        return folioTienda;
    }


    /**
     * Sets the folioTienda value for this ResultadoConsultaPedido.
     * 
     * @param folioTienda
     */
    public void setFolioTienda(java.lang.String folioTienda) {
        this.folioTienda = folioTienda;
    }


    /**
     * Gets the idCliente value for this ResultadoConsultaPedido.
     * 
     * @return idCliente
     */
    public java.lang.String getIdCliente() {
        return idCliente;
    }


    /**
     * Sets the idCliente value for this ResultadoConsultaPedido.
     * 
     * @param idCliente
     */
    public void setIdCliente(java.lang.String idCliente) {
        this.idCliente = idCliente;
    }


    /**
     * Gets the nombreCliente value for this ResultadoConsultaPedido.
     * 
     * @return nombreCliente
     */
    public java.lang.String getNombreCliente() {
        return nombreCliente;
    }


    /**
     * Sets the nombreCliente value for this ResultadoConsultaPedido.
     * 
     * @param nombreCliente
     */
    public void setNombreCliente(java.lang.String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }


    /**
     * Gets the correoElectronicoCliente value for this ResultadoConsultaPedido.
     * 
     * @return correoElectronicoCliente
     */
    public java.lang.String getCorreoElectronicoCliente() {
        return correoElectronicoCliente;
    }


    /**
     * Sets the correoElectronicoCliente value for this ResultadoConsultaPedido.
     * 
     * @param correoElectronicoCliente
     */
    public void setCorreoElectronicoCliente(java.lang.String correoElectronicoCliente) {
        this.correoElectronicoCliente = correoElectronicoCliente;
    }


    /**
     * Gets the cveEstatus value for this ResultadoConsultaPedido.
     * 
     * @return cveEstatus
     */
    public int getCveEstatus() {
        return cveEstatus;
    }


    /**
     * Sets the cveEstatus value for this ResultadoConsultaPedido.
     * 
     * @param cveEstatus
     */
    public void setCveEstatus(int cveEstatus) {
        this.cveEstatus = cveEstatus;
    }


    /**
     * Gets the descripcionEstatus value for this ResultadoConsultaPedido.
     * 
     * @return descripcionEstatus
     */
    public java.lang.String getDescripcionEstatus() {
        return descripcionEstatus;
    }


    /**
     * Sets the descripcionEstatus value for this ResultadoConsultaPedido.
     * 
     * @param descripcionEstatus
     */
    public void setDescripcionEstatus(java.lang.String descripcionEstatus) {
        this.descripcionEstatus = descripcionEstatus;
    }


    /**
     * Gets the cveMoneda value for this ResultadoConsultaPedido.
     * 
     * @return cveMoneda
     */
    public int getCveMoneda() {
        return cveMoneda;
    }


    /**
     * Sets the cveMoneda value for this ResultadoConsultaPedido.
     * 
     * @param cveMoneda
     */
    public void setCveMoneda(int cveMoneda) {
        this.cveMoneda = cveMoneda;
    }


    /**
     * Gets the codigoMoneda value for this ResultadoConsultaPedido.
     * 
     * @return codigoMoneda
     */
    public java.lang.String getCodigoMoneda() {
        return codigoMoneda;
    }


    /**
     * Sets the codigoMoneda value for this ResultadoConsultaPedido.
     * 
     * @param codigoMoneda
     */
    public void setCodigoMoneda(java.lang.String codigoMoneda) {
        this.codigoMoneda = codigoMoneda;
    }


    /**
     * Gets the montoTotal value for this ResultadoConsultaPedido.
     * 
     * @return montoTotal
     */
    public double getMontoTotal() {
        return montoTotal;
    }


    /**
     * Sets the montoTotal value for this ResultadoConsultaPedido.
     * 
     * @param montoTotal
     */
    public void setMontoTotal(double montoTotal) {
        this.montoTotal = montoTotal;
    }


    /**
     * Gets the totalAbonado value for this ResultadoConsultaPedido.
     * 
     * @return totalAbonado
     */
    public double getTotalAbonado() {
        return totalAbonado;
    }


    /**
     * Sets the totalAbonado value for this ResultadoConsultaPedido.
     * 
     * @param totalAbonado
     */
    public void setTotalAbonado(double totalAbonado) {
        this.totalAbonado = totalAbonado;
    }


    /**
     * Gets the montoPendienteDePago value for this ResultadoConsultaPedido.
     * 
     * @return montoPendienteDePago
     */
    public double getMontoPendienteDePago() {
        return montoPendienteDePago;
    }


    /**
     * Sets the montoPendienteDePago value for this ResultadoConsultaPedido.
     * 
     * @param montoPendienteDePago
     */
    public void setMontoPendienteDePago(double montoPendienteDePago) {
        this.montoPendienteDePago = montoPendienteDePago;
    }


    /**
     * Gets the montoTotalEnPesos value for this ResultadoConsultaPedido.
     * 
     * @return montoTotalEnPesos
     */
    public double getMontoTotalEnPesos() {
        return montoTotalEnPesos;
    }


    /**
     * Sets the montoTotalEnPesos value for this ResultadoConsultaPedido.
     * 
     * @param montoTotalEnPesos
     */
    public void setMontoTotalEnPesos(double montoTotalEnPesos) {
        this.montoTotalEnPesos = montoTotalEnPesos;
    }


    /**
     * Gets the totalAbonadoPesos value for this ResultadoConsultaPedido.
     * 
     * @return totalAbonadoPesos
     */
    public double getTotalAbonadoPesos() {
        return totalAbonadoPesos;
    }


    /**
     * Sets the totalAbonadoPesos value for this ResultadoConsultaPedido.
     * 
     * @param totalAbonadoPesos
     */
    public void setTotalAbonadoPesos(double totalAbonadoPesos) {
        this.totalAbonadoPesos = totalAbonadoPesos;
    }


    /**
     * Gets the montoPendienteDePagoPesos value for this ResultadoConsultaPedido.
     * 
     * @return montoPendienteDePagoPesos
     */
    public double getMontoPendienteDePagoPesos() {
        return montoPendienteDePagoPesos;
    }


    /**
     * Sets the montoPendienteDePagoPesos value for this ResultadoConsultaPedido.
     * 
     * @param montoPendienteDePagoPesos
     */
    public void setMontoPendienteDePagoPesos(double montoPendienteDePagoPesos) {
        this.montoPendienteDePagoPesos = montoPendienteDePagoPesos;
    }


    /**
     * Gets the totalPagoExcedentePesos value for this ResultadoConsultaPedido.
     * 
     * @return totalPagoExcedentePesos
     */
    public double getTotalPagoExcedentePesos() {
        return totalPagoExcedentePesos;
    }


    /**
     * Sets the totalPagoExcedentePesos value for this ResultadoConsultaPedido.
     * 
     * @param totalPagoExcedentePesos
     */
    public void setTotalPagoExcedentePesos(double totalPagoExcedentePesos) {
        this.totalPagoExcedentePesos = totalPagoExcedentePesos;
    }


    /**
     * Gets the cveFormaPago value for this ResultadoConsultaPedido.
     * 
     * @return cveFormaPago
     */
    public int getCveFormaPago() {
        return cveFormaPago;
    }


    /**
     * Sets the cveFormaPago value for this ResultadoConsultaPedido.
     * 
     * @param cveFormaPago
     */
    public void setCveFormaPago(int cveFormaPago) {
        this.cveFormaPago = cveFormaPago;
    }


    /**
     * Gets the descFormaPago value for this ResultadoConsultaPedido.
     * 
     * @return descFormaPago
     */
    public java.lang.String getDescFormaPago() {
        return descFormaPago;
    }


    /**
     * Sets the descFormaPago value for this ResultadoConsultaPedido.
     * 
     * @param descFormaPago
     */
    public void setDescFormaPago(java.lang.String descFormaPago) {
        this.descFormaPago = descFormaPago;
    }


    /**
     * Gets the referenciaBancaria value for this ResultadoConsultaPedido.
     * 
     * @return referenciaBancaria
     */
    public java.lang.String getReferenciaBancaria() {
        return referenciaBancaria;
    }


    /**
     * Sets the referenciaBancaria value for this ResultadoConsultaPedido.
     * 
     * @param referenciaBancaria
     */
    public void setReferenciaBancaria(java.lang.String referenciaBancaria) {
        this.referenciaBancaria = referenciaBancaria;
    }


    /**
     * Gets the tipoTransaccion value for this ResultadoConsultaPedido.
     * 
     * @return tipoTransaccion
     */
    public java.lang.String getTipoTransaccion() {
        return tipoTransaccion;
    }


    /**
     * Sets the tipoTransaccion value for this ResultadoConsultaPedido.
     * 
     * @param tipoTransaccion
     */
    public void setTipoTransaccion(java.lang.String tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion;
    }


    /**
     * Gets the codigoPromocionTarjetaDeCredito value for this ResultadoConsultaPedido.
     * 
     * @return codigoPromocionTarjetaDeCredito
     */
    public java.lang.String getCodigoPromocionTarjetaDeCredito() {
        return codigoPromocionTarjetaDeCredito;
    }


    /**
     * Sets the codigoPromocionTarjetaDeCredito value for this ResultadoConsultaPedido.
     * 
     * @param codigoPromocionTarjetaDeCredito
     */
    public void setCodigoPromocionTarjetaDeCredito(java.lang.String codigoPromocionTarjetaDeCredito) {
        this.codigoPromocionTarjetaDeCredito = codigoPromocionTarjetaDeCredito;
    }


    /**
     * Gets the idBancoBancaElectronica value for this ResultadoConsultaPedido.
     * 
     * @return idBancoBancaElectronica
     */
    public java.lang.String getIdBancoBancaElectronica() {
        return idBancoBancaElectronica;
    }


    /**
     * Sets the idBancoBancaElectronica value for this ResultadoConsultaPedido.
     * 
     * @param idBancoBancaElectronica
     */
    public void setIdBancoBancaElectronica(java.lang.String idBancoBancaElectronica) {
        this.idBancoBancaElectronica = idBancoBancaElectronica;
    }


    /**
     * Gets the servicios value for this ResultadoConsultaPedido.
     * 
     * @return servicios
     */
    public org.tempuri.ServicioPedido[] getServicios() {
        return servicios;
    }


    /**
     * Sets the servicios value for this ResultadoConsultaPedido.
     * 
     * @param servicios
     */
    public void setServicios(org.tempuri.ServicioPedido[] servicios) {
        this.servicios = servicios;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ResultadoConsultaPedido)) return false;
        ResultadoConsultaPedido other = (ResultadoConsultaPedido) obj;
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
            this.cvePedido == other.getCvePedido() &&
            ((this.folioTienda==null && other.getFolioTienda()==null) || 
             (this.folioTienda!=null &&
              this.folioTienda.equals(other.getFolioTienda()))) &&
            ((this.idCliente==null && other.getIdCliente()==null) || 
             (this.idCliente!=null &&
              this.idCliente.equals(other.getIdCliente()))) &&
            ((this.nombreCliente==null && other.getNombreCliente()==null) || 
             (this.nombreCliente!=null &&
              this.nombreCliente.equals(other.getNombreCliente()))) &&
            ((this.correoElectronicoCliente==null && other.getCorreoElectronicoCliente()==null) || 
             (this.correoElectronicoCliente!=null &&
              this.correoElectronicoCliente.equals(other.getCorreoElectronicoCliente()))) &&
            this.cveEstatus == other.getCveEstatus() &&
            ((this.descripcionEstatus==null && other.getDescripcionEstatus()==null) || 
             (this.descripcionEstatus!=null &&
              this.descripcionEstatus.equals(other.getDescripcionEstatus()))) &&
            this.cveMoneda == other.getCveMoneda() &&
            ((this.codigoMoneda==null && other.getCodigoMoneda()==null) || 
             (this.codigoMoneda!=null &&
              this.codigoMoneda.equals(other.getCodigoMoneda()))) &&
            this.montoTotal == other.getMontoTotal() &&
            this.totalAbonado == other.getTotalAbonado() &&
            this.montoPendienteDePago == other.getMontoPendienteDePago() &&
            this.montoTotalEnPesos == other.getMontoTotalEnPesos() &&
            this.totalAbonadoPesos == other.getTotalAbonadoPesos() &&
            this.montoPendienteDePagoPesos == other.getMontoPendienteDePagoPesos() &&
            this.totalPagoExcedentePesos == other.getTotalPagoExcedentePesos() &&
            this.cveFormaPago == other.getCveFormaPago() &&
            ((this.descFormaPago==null && other.getDescFormaPago()==null) || 
             (this.descFormaPago!=null &&
              this.descFormaPago.equals(other.getDescFormaPago()))) &&
            ((this.referenciaBancaria==null && other.getReferenciaBancaria()==null) || 
             (this.referenciaBancaria!=null &&
              this.referenciaBancaria.equals(other.getReferenciaBancaria()))) &&
            ((this.tipoTransaccion==null && other.getTipoTransaccion()==null) || 
             (this.tipoTransaccion!=null &&
              this.tipoTransaccion.equals(other.getTipoTransaccion()))) &&
            ((this.codigoPromocionTarjetaDeCredito==null && other.getCodigoPromocionTarjetaDeCredito()==null) || 
             (this.codigoPromocionTarjetaDeCredito!=null &&
              this.codigoPromocionTarjetaDeCredito.equals(other.getCodigoPromocionTarjetaDeCredito()))) &&
            ((this.idBancoBancaElectronica==null && other.getIdBancoBancaElectronica()==null) || 
             (this.idBancoBancaElectronica!=null &&
              this.idBancoBancaElectronica.equals(other.getIdBancoBancaElectronica()))) &&
            ((this.servicios==null && other.getServicios()==null) || 
             (this.servicios!=null &&
              java.util.Arrays.equals(this.servicios, other.getServicios())));
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
        _hashCode += getCvePedido();
        if (getFolioTienda() != null) {
            _hashCode += getFolioTienda().hashCode();
        }
        if (getIdCliente() != null) {
            _hashCode += getIdCliente().hashCode();
        }
        if (getNombreCliente() != null) {
            _hashCode += getNombreCliente().hashCode();
        }
        if (getCorreoElectronicoCliente() != null) {
            _hashCode += getCorreoElectronicoCliente().hashCode();
        }
        _hashCode += getCveEstatus();
        if (getDescripcionEstatus() != null) {
            _hashCode += getDescripcionEstatus().hashCode();
        }
        _hashCode += getCveMoneda();
        if (getCodigoMoneda() != null) {
            _hashCode += getCodigoMoneda().hashCode();
        }
        _hashCode += new Double(getMontoTotal()).hashCode();
        _hashCode += new Double(getTotalAbonado()).hashCode();
        _hashCode += new Double(getMontoPendienteDePago()).hashCode();
        _hashCode += new Double(getMontoTotalEnPesos()).hashCode();
        _hashCode += new Double(getTotalAbonadoPesos()).hashCode();
        _hashCode += new Double(getMontoPendienteDePagoPesos()).hashCode();
        _hashCode += new Double(getTotalPagoExcedentePesos()).hashCode();
        _hashCode += getCveFormaPago();
        if (getDescFormaPago() != null) {
            _hashCode += getDescFormaPago().hashCode();
        }
        if (getReferenciaBancaria() != null) {
            _hashCode += getReferenciaBancaria().hashCode();
        }
        if (getTipoTransaccion() != null) {
            _hashCode += getTipoTransaccion().hashCode();
        }
        if (getCodigoPromocionTarjetaDeCredito() != null) {
            _hashCode += getCodigoPromocionTarjetaDeCredito().hashCode();
        }
        if (getIdBancoBancaElectronica() != null) {
            _hashCode += getIdBancoBancaElectronica().hashCode();
        }
        if (getServicios() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getServicios());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getServicios(), i);
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
        new org.apache.axis.description.TypeDesc(ResultadoConsultaPedido.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ResultadoConsultaPedido"));
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
        elemField.setFieldName("cvePedido");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CvePedido"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("folioTienda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "FolioTienda"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idCliente");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdCliente"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("nombreCliente");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "NombreCliente"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("correoElectronicoCliente");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CorreoElectronicoCliente"));
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
        elemField.setFieldName("cveMoneda");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CveMoneda"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
        elemField.setFieldName("montoTotal");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoTotal"));
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
        elemField.setFieldName("montoPendienteDePago");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoPendienteDePago"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("montoTotalEnPesos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoTotalEnPesos"));
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
        elemField.setFieldName("montoPendienteDePagoPesos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "MontoPendienteDePagoPesos"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("totalPagoExcedentePesos");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "TotalPagoExcedentePesos"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
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
        elemField.setFieldName("referenciaBancaria");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "ReferenciaBancaria"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tipoTransaccion");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "TipoTransaccion"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("codigoPromocionTarjetaDeCredito");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "CodigoPromocionTarjetaDeCredito"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idBancoBancaElectronica");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "IdBancoBancaElectronica"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("servicios");
        elemField.setXmlName(new javax.xml.namespace.QName("http://tempuri.org/", "Servicios"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://tempuri.org/", "ServicioPedido"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://tempuri.org/", "ServicioPedido"));
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
