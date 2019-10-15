/**
 * WebServicesGestorPagoTiendasLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package org.tempuri;

public class WebServicesGestorPagoTiendasLocator extends org.apache.axis.client.Service implements org.tempuri.WebServicesGestorPagoTiendas {

    public WebServicesGestorPagoTiendasLocator() {
    }


    public WebServicesGestorPagoTiendasLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public WebServicesGestorPagoTiendasLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for WebServicesGestorPagoTiendasSoap
    private java.lang.String WebServicesGestorPagoTiendasSoap_address = "http://pprd023ms01.svcs.itesm.mx/GestorPagosWSTiendas/WSGestorDePagosTiendas.asmx";

    public java.lang.String getWebServicesGestorPagoTiendasSoapAddress() {
        return WebServicesGestorPagoTiendasSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String WebServicesGestorPagoTiendasSoapWSDDServiceName = "WebServicesGestorPagoTiendasSoap";

    public java.lang.String getWebServicesGestorPagoTiendasSoapWSDDServiceName() {
        return WebServicesGestorPagoTiendasSoapWSDDServiceName;
    }

    public void setWebServicesGestorPagoTiendasSoapWSDDServiceName(java.lang.String name) {
        WebServicesGestorPagoTiendasSoapWSDDServiceName = name;
    }

    public org.tempuri.WebServicesGestorPagoTiendasSoap getWebServicesGestorPagoTiendasSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(WebServicesGestorPagoTiendasSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getWebServicesGestorPagoTiendasSoap(endpoint);
    }

    public org.tempuri.WebServicesGestorPagoTiendasSoap getWebServicesGestorPagoTiendasSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            org.tempuri.WebServicesGestorPagoTiendasSoapStub _stub = new org.tempuri.WebServicesGestorPagoTiendasSoapStub(portAddress, this);
            _stub.setPortName(getWebServicesGestorPagoTiendasSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setWebServicesGestorPagoTiendasSoapEndpointAddress(java.lang.String address) {
        WebServicesGestorPagoTiendasSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (org.tempuri.WebServicesGestorPagoTiendasSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                org.tempuri.WebServicesGestorPagoTiendasSoapStub _stub = new org.tempuri.WebServicesGestorPagoTiendasSoapStub(new java.net.URL(WebServicesGestorPagoTiendasSoap_address), this);
                _stub.setPortName(getWebServicesGestorPagoTiendasSoapWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("WebServicesGestorPagoTiendasSoap".equals(inputPortName)) {
            return getWebServicesGestorPagoTiendasSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://tempuri.org/", "WebServicesGestorPagoTiendas");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://tempuri.org/", "WebServicesGestorPagoTiendasSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("WebServicesGestorPagoTiendasSoap".equals(portName)) {
            setWebServicesGestorPagoTiendasSoapEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
