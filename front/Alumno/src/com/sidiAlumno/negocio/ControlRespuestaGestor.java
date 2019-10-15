package com.sidiAlumno.negocio;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Calendar;

import com.sidiAlumno.modelo.ModeloEntity;
import com.sidiAlumno.modelo.RespuestaGestor;

public class ControlRespuestaGestor {

    private RespuestaGestor respuestaGestor;

    public ControlRespuestaGestor() {
        this.respuestaGestor = new RespuestaGestor();
    }

    public ControlRespuestaGestor(
            String matricula,
            String nombre,
            String codigoCampus,
            String tipoMoneda,
            String folioTienda,
            String descFormaPago,
            String tipoTransaccion,
            String estatus,
            BigDecimal importeInicial,
            int cantidad,
            int cveTienda,
            int cveServicio,
            int nPedido,
            int cveFormaPago,
            int umbral) {
        this.respuestaGestor = new RespuestaGestor();
        this.respuestaGestor.setMatricula(matricula);
        this.respuestaGestor.setNombre(nombre);
        this.respuestaGestor.setCodigoCampus(codigoCampus);
        this.respuestaGestor.setTipoMoneda(tipoMoneda);
        this.respuestaGestor.setFolioTienda(folioTienda);
        this.respuestaGestor.setDesFormaPago(descFormaPago);
        this.respuestaGestor.setTipoTransaccion(tipoTransaccion);
        this.respuestaGestor.setEstatus(estatus);
        this.respuestaGestor.setImporteInicial(importeInicial);
        this.respuestaGestor.setCantidad(cantidad);
        this.respuestaGestor.setCveTienda(cveTienda);
        this.respuestaGestor.setCveServicio(cveServicio);
        this.respuestaGestor.setnPedido(nPedido);
        this.respuestaGestor.setCveFormaPago(cveFormaPago);
        this.respuestaGestor.setUmbral(umbral);
        this.respuestaGestor.setFechaModificacion(new Timestamp(Calendar.getInstance().getTime().getTime()));
    }

    public ControlRespuestaGestor(String matricula) {
        ModeloEntity modelo = new ModeloEntity();
        try {
            respuestaGestor = modelo.getEntityManager().find(RespuestaGestor.class, matricula);
        } finally {
            if (modelo != null) {
                modelo.close();
            }
        }
    }

    public boolean guardar() {

        ModeloEntity modelo = new ModeloEntity();

        try {
            modelo.getEntityManager().getTransaction().begin();
            modelo.getEntityManager().persist(respuestaGestor);
            modelo.getEntityManager().getTransaction().commit();
            return true;
        } finally {
            if (modelo != null) {
                if (modelo.getEntityManager().getTransaction().isActive()) {
                    modelo.getEntityManager().getTransaction().rollback();
                }

                modelo.close();
            }
        }
    }

    public RespuestaGestor getrespuestaGestor() {
        return respuestaGestor;
    }

    public void setrespuestaGestor(RespuestaGestor respuestaGestor) {
        this.respuestaGestor = respuestaGestor;
    }

    public RespuestaGestor getRespuestaGestor() {
        return respuestaGestor;
    }

    public void setRespuestaGestor(RespuestaGestor respuestaGestor) {
        this.respuestaGestor = respuestaGestor;
    }
}
