package org.tempuri;

public class WebServicesGestorPagoTiendasSoapProxy implements org.tempuri.WebServicesGestorPagoTiendasSoap {
  private String _endpoint = null;
  private org.tempuri.WebServicesGestorPagoTiendasSoap webServicesGestorPagoTiendasSoap = null;
  
  public WebServicesGestorPagoTiendasSoapProxy() {
    _initWebServicesGestorPagoTiendasSoapProxy();
  }
  
  public WebServicesGestorPagoTiendasSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initWebServicesGestorPagoTiendasSoapProxy();
  }
  
  private void _initWebServicesGestorPagoTiendasSoapProxy() {
    try {
      webServicesGestorPagoTiendasSoap = (new org.tempuri.WebServicesGestorPagoTiendasLocator()).getWebServicesGestorPagoTiendasSoap();
      if (webServicesGestorPagoTiendasSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)webServicesGestorPagoTiendasSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)webServicesGestorPagoTiendasSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (webServicesGestorPagoTiendasSoap != null)
      ((javax.xml.rpc.Stub)webServicesGestorPagoTiendasSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public org.tempuri.WebServicesGestorPagoTiendasSoap getWebServicesGestorPagoTiendasSoap() {
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap;
  }
  
  public org.tempuri.ResultadoConexionGestorDePagos conexionGestorDePagos(java.lang.String claveTienda, java.lang.String tipoTransaccion, java.lang.String folioTienda, java.lang.String idCliente, java.lang.String nombreCliente, java.lang.String correoElectronicoCliente, java.lang.String claveFormaDePago, java.lang.String codigoPromocionTarjetaDeCredito, java.lang.String idBancoBancaElectronica, java.lang.String claveIdioma, java.lang.String datosServicios, java.lang.String codigoSeguridad) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.conexionGestorDePagos(claveTienda, tipoTransaccion, folioTienda, idCliente, nombreCliente, correoElectronicoCliente, claveFormaDePago, codigoPromocionTarjetaDeCredito, idBancoBancaElectronica, claveIdioma, datosServicios, codigoSeguridad);
  }
  
  public org.tempuri.ResultadoCatalogoServicios catalogoServiciosPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoServiciosPorTienda(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoFormasDePago catalogoFormasDePagoPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoFormasDePagoPorTienda(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoPromocionesBancarias catalogoPromocionesBancariasPorTienda(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoPromocionesBancariasPorTienda(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoCatalogoMonedas catalogoMonedas(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoMonedas(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoCatalogoBancosBE catalogoBancosBancaElectronica(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoBancosBancaElectronica(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoUnidadesDeMedida catalogoUnidadesDeMedida(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoUnidadesDeMedida(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoCatalogoIdiomas catalogoDeIdiomas(java.lang.String cveTienda, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoDeIdiomas(cveTienda, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoCampusPorInstitucion catalogoCampusPorInstitucion(java.lang.String cveTienda, int cveInstitucion, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.catalogoCampusPorInstitucion(cveTienda, cveInstitucion, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoConsultaEstatusPedido consultaEstatusPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.consultaEstatusPedido(cveTienda, cvePedido, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoConsultaPedido consultaPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.consultaPedido(cveTienda, cvePedido, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoConsultaReferenciaBancaria consultaReferenciaBancaria(java.lang.String cveTienda, java.lang.String idCliente, java.lang.String folioTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.consultaReferenciaBancaria(cveTienda, idCliente, folioTienda, cvePedido, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoInformacionCampus informacionCampus(java.lang.String cveTienda, java.lang.String codigoCampus, java.lang.String tipoCodigo, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.informacionCampus(cveTienda, codigoCampus, tipoCodigo, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoInformacionUnidadDeMedida informacionUnidadDeMedida(java.lang.String cveTienda, java.lang.String claveUnidadMedida, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.informacionUnidadDeMedida(cveTienda, claveUnidadMedida, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoConsultaMasivaEstatusPedido consultaMasivaEstatusPedido(java.lang.String cveTienda, java.lang.String[] cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.consultaMasivaEstatusPedido(cveTienda, cvePedido, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoCancelarPedido cancelarPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.cancelarPedido(cveTienda, cvePedido, llaveEncriptada);
  }
  
  public org.tempuri.ResultadoRegistrarPagoPedido registrarPagoPedido(java.lang.String cveTienda, java.lang.String cvePedido, java.lang.String montoPagado, java.lang.String formaPago, java.lang.String origenPago, java.lang.String identificadorPago, java.lang.String fecha, java.lang.String llaveEncriptada) throws java.rmi.RemoteException{
    if (webServicesGestorPagoTiendasSoap == null)
      _initWebServicesGestorPagoTiendasSoapProxy();
    return webServicesGestorPagoTiendasSoap.registrarPagoPedido(cveTienda, cvePedido, montoPagado, formaPago, origenPago, identificadorPago, fecha, llaveEncriptada);
  }
  
  
}