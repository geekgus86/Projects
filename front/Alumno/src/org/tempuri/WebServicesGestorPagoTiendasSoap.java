/**
 * WebServicesGestorPagoTiendasSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public interface WebServicesGestorPagoTiendasSoap extends java.rmi.Remote {
    public org.tempuri.ResultadoConexionGestorDePagos conexionGestorDePagos(java.lang.String claveTienda, java.lang.String tipoTransaccion, java.lang.String folioTienda, java.lang.String idCliente, java.lang.String nombreCliente, java.lang.String correoElectronicoCliente, java.lang.String claveFormaDePago, java.lang.String codigoPromocionTarjetaDeCredito, java.lang.String idBancoBancaElectronica, java.lang.String claveIdioma, java.lang.String datosServicios, java.lang.String codigoSeguridad) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCatalogoServicios catalogoServiciosPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoFormasDePago catalogoFormasDePagoPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoPromocionesBancarias catalogoPromocionesBancariasPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCatalogoMonedas catalogoMonedas(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCatalogoBancosBE catalogoBancosBancaElectronica(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoUnidadesDeMedida catalogoUnidadesDeMedida(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCatalogoIdiomas catalogoDeIdiomas(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCampusPorInstitucion catalogoCampusPorInstitucion(java.lang.String cveTienda, int cveInstitucion, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoConsultaEstatusPedido consultaEstatusPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoConsultaPedido consultaPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoConsultaReferenciaBancaria consultaReferenciaBancaria(java.lang.String cveTienda, java.lang.String idCliente, java.lang.String folioTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoInformacionCampus informacionCampus(java.lang.String cveTienda, java.lang.String codigoCampus, java.lang.String tipoCodigo, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoInformacionUnidadDeMedida informacionUnidadDeMedida(java.lang.String cveTienda, java.lang.String claveUnidadMedida, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoConsultaMasivaEstatusPedido consultaMasivaEstatusPedido(java.lang.String cveTienda, java.lang.String[] cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoCancelarPedido cancelarPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
    public org.tempuri.ResultadoRegistrarPagoPedido registrarPagoPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String montoPagado, java.lang.String formaPago, java.lang.String origenPago, java.lang.String identificadorPago, java.lang.String fecha, java.lang.String llaveEncriptada) throws java.rmi.RemoteException;
}
