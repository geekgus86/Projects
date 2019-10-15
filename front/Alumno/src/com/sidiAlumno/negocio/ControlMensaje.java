package com.sidiAlumno.negocio;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

public class ControlMensaje {

	private static final String tokenSesion = "MENSAJES_ENTRE_PAGINAS_JSF";
	
	public ControlMensaje() {
	}
	
    public int guardarMensajes(final FacesContext facesContext)
    {
        List<FacesMessage> mensajes = new ArrayList<FacesMessage>();
        for (Iterator<FacesMessage> iter = facesContext.getMessages(null); iter.hasNext();)
        {
            mensajes.add(iter.next());
            iter.remove();
        }
 
        if (mensajes.size() == 0)
        {
            return 0;
        }
 
        Map<String, Object> mensajeSesion = facesContext.getExternalContext().getSessionMap();
        @SuppressWarnings("unchecked")
		List<FacesMessage> mensajesExistentes = (List<FacesMessage>) mensajeSesion.get(tokenSesion);
        if (mensajesExistentes != null)
        {
            mensajesExistentes.addAll(mensajes);
        }
        else
        {
            mensajeSesion.put(tokenSesion, mensajes);
        }
        return mensajes.size();
    }
 
    public int restaurarMensajes(FacesContext facesContext)
    {
        Map<String, Object> mapaSesion = facesContext.getExternalContext().getSessionMap();
        @SuppressWarnings("unchecked")
		List<FacesMessage> mensajes = (List<FacesMessage>) mapaSesion.remove(tokenSesion);
 
        if (mensajes == null)
        {
            return 0;
        }
 
        int cuentaR = mensajes.size();
        for (Object element : mensajes)
        {
            facesContext.addMessage(null, (FacesMessage) element);
        }
        return cuentaR;
    }
	
}
