/*
 * Creado el 27/05/2014
 *
 * TODO Para cambiar la plantilla de este archivo generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
package iusacell.mdc.arh.vo;

/**
 * @author YOLMEDO
 *
 * TODO Para cambiar la plantilla de este comentario generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
public class InstitucionesEducativasVO {

	String id;
	String nombreInstitucion;
	String cveEstado;
	String cveGrado;
	
	
	
	/**
	 * @return Devuelve cveEstado.
	 */
	public String getCveEstado() {
		return cveEstado;
	}
	/**
	 * @param cveEstado El cveEstado a establecer.
	 */
	public void setCveEstado(String cveEstado) {
		this.cveEstado = cveEstado;
	}
	/**
	 * @return Devuelve cveGrado.
	 */
	public String getCveGrado() {
		return cveGrado;
	}
	/**
	 * @param cveGrado El cveGrado a establecer.
	 */
	public void setCveGrado(String cveGrado) {
		this.cveGrado = cveGrado;
	}
	/**
	 * @return Devuelve id.
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id El id a establecer.
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return Devuelve nombreInstitucion.
	 */
	public String getNombreInstitucion() {
		return nombreInstitucion;
	}
	/**
	 * @param nombreInstitucion El nombreInstitucion a establecer.
	 */
	public void setNombreInstitucion(String nombreInstitucion) {
		this.nombreInstitucion = nombreInstitucion;
	}
}
