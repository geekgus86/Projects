/*
 * Creado el 23/04/2013
 *
 * TODO Para cambiar la plantilla de este archivo generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
package iusacell.mdc.arh.vo;

/**
 * @author JVEGAT
 *
 * TODO Para cambiar la plantilla de este comentario generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
public class GenericoComboJsonVO {
	
	public String valor;
	public String descripcion;
	
	public GenericoComboJsonVO(){
		
	}
	public GenericoComboJsonVO(String valor,String descripcion){
		this.valor=valor;
		this.descripcion=descripcion;
	}
	
	/**
	 * @return Devuelve descripcion.
	 */
	public String getDescripcion() {
		return descripcion;
	}
	/**
	 * @param descripcion El descripcion a establecer.
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion.toUpperCase();
	}
	/**
	 * @return Devuelve valor.
	 */
	public String getValor() {
		return valor;
	}
	/**
	 * @param valor El valor a establecer.
	 */
	public void setValor(String valor) {
		this.valor = valor;
	}
}
