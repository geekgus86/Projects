package com.sidiAlumno.listener;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Hashtable;
import java.util.Map;
import java.util.logging.Logger;

import javax.el.ELContext;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.sidiAlumno.bean.RegresoManagedBean;
import com.sidiAlumno.negocio.ControlMensaje;

public class ValidacionRegresoListener implements PhaseListener {

    private static final long serialVersionUID = 1L;

    public ValidacionRegresoListener() {
    }

    @Override
    public void afterPhase(PhaseEvent e) {

        if (e.getPhaseId().equals(PhaseId.RENDER_RESPONSE)) {

            FacesContext facesContext = e.getFacesContext();
            ControlMensaje ms = new ControlMensaje();
            ms.guardarMensajes(facesContext);
        }
    }

    @Override
    public void beforePhase(PhaseEvent e) {
        FacesContext contexto = e.getFacesContext();
        ControlMensaje ms = new ControlMensaje();
        ms.guardarMensajes(contexto);
        RegresoManagedBean regreso = new RegresoManagedBean();
        
       
            HttpServletRequest request = (HttpServletRequest) contexto
                    .getExternalContext().getRequest();

            String matricula = request.getParameter("matricula");
            String nombre = request.getParameter("nombre");
            String campus = request.getParameter("campus");
            String montoInicial = request.getParameter("montoInicial");
            String cantidad = request.getParameter("cantidad");
            String cveTienda = request.getParameter("cveTienda");
            String tipoMoneda = request.getParameter("tipoMoneda");
            String servicio = request.getParameter("servicio");
            String pedido = request.getParameter("pedido");
            String folioTienda = request.getParameter("folioTienda");
            String cveFormaPago = request.getParameter("cveFormaPago");
            String descFormaPago = request.getParameter("descFormaPago");
            String tipoTransaccion = request.getParameter("tipoTransaccion");
            String estatus = request.getParameter("estatus");
            String q = request.getParameter("q");

            regreso.setMatricula(matricula);
            regreso.setNombre(nombre);
            regreso.setCampus(campus);
            regreso.setMontoInicial(montoInicial);
            regreso.setCantidad(cantidad);
            regreso.setCveTienda(cveTienda);
            regreso.setTipoMoneda(tipoMoneda);
            regreso.setServicio(servicio);
            regreso.setPedido(pedido);
            regreso.setFolioTienda(folioTienda);
            regreso.setCveFormaPago(cveFormaPago);
            regreso.setDescFormaPago(descFormaPago);
            regreso.setTipoTransaccion(tipoTransaccion);
            regreso.setEstatus(estatus);
            regreso.setQ(q);
        

        if (!contexto.getResponseComplete()) {
            ms.restaurarMensajes(contexto);
        }
    }

    @Override
    public PhaseId getPhaseId() {
        return PhaseId.ANY_PHASE;
    }

    private boolean existenParametrosEntrada(RegresoManagedBean regreso) {
        return (regreso.getMatricula() != null && regreso.getMontoInicial() != null);
    }
}
