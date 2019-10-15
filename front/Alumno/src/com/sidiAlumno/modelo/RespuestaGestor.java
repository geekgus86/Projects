package com.sidiAlumno.modelo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RESPUESTA_GESTOR")
public class RespuestaGestor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "MATRICULA")
    private String matricula;
    @Column(name = "NOMBRE")
    private String nombre;
    @Column(name = "CODIGO_CAMPUS")
    private String codigoCampus;
    @Column(name = "TIPO_MONEDA")
    private String tipoMoneda;
    @Column(name = "FOLIO_TIENDA")
    private String folioTienda;
    @Column(name = "DESC_FORMA_PAGO")
    private String desFormaPago;
    @Column(name = "TIPO_TRANSACCION")
    private String tipoTransaccion;
    @Column(name = "ESTATUS")
    private String estatus;
    @Column(name = "N_CANTIDAD", precision = 3)
    private int cantidad;
    @Column(name = "CVE_TIENDA", precision = 4)
    private int cveTienda;
    @Column(name = "N_IMPORTE_INICIAL", precision = 16, scale = 2)
    private BigDecimal importeInicial;
    @Column(name = "CVE_SERVICIO", precision = 2)
    private int cveServicio;
    @Column(name = "N_PEDIDO", precision = 12)
    private int nPedido;
    @Column(name = "CVE_FORMA_PAGO", precision = 1)
    private int cveFormaPago;
    @Column(name = "N_UMBRAL", precision = 1)
    private int umbral;
    @Column(name = "F_FECHA_DE_MOVIMIENTO")
    private Timestamp fechaModificacion;

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigoCampus() {
        return codigoCampus;
    }

    public void setCodigoCampus(String codigoCampus) {
        this.codigoCampus = codigoCampus;
    }

    public String getTipoMoneda() {
        return tipoMoneda;
    }

    public void setTipoMoneda(String tipoMoneda) {
        this.tipoMoneda = tipoMoneda;
    }

    public String getFolioTienda() {
        return folioTienda;
    }

    public void setFolioTienda(String folioTienda) {
        this.folioTienda = folioTienda;
    }

    public String getDesFormaPago() {
        return desFormaPago;
    }

    public void setDesFormaPago(String desFormaPago) {
        this.desFormaPago = desFormaPago;
    }

    public String getTipoTransaccion() {
        return tipoTransaccion;
    }

    public void setTipoTransaccion(String tipoTransaccion) {
        this.tipoTransaccion = tipoTransaccion;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad2) {
        this.cantidad = cantidad2;
    }

    public int getCveTienda() {
        return cveTienda;
    }

    public void setCveTienda(int cveTienda2) {
        this.cveTienda = cveTienda2;
    }

    public BigDecimal getImporteInicial() {
        return importeInicial;
    }

    public void setImporteInicial(BigDecimal importeInicial) {
        this.importeInicial = importeInicial;
    }

    public int getCveServicio() {
        return cveServicio;
    }

    public void setCveServicio(int cveServicio2) {
        this.cveServicio = cveServicio2;
    }

    public int getnPedido() {
        return nPedido;
    }

    public void setnPedido(int nPedido2) {
        this.nPedido = nPedido2;
    }

    public int getCveFormaPago() {
        return cveFormaPago;
    }

    public void setCveFormaPago(int cveFormaPago2) {
        this.cveFormaPago = cveFormaPago2;
    }

    public int getUmbral() {
        return umbral;
    }

    public void setUmbral(int umbral2) {
        this.umbral = umbral2;
    }

    public Timestamp getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Timestamp fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }
}
