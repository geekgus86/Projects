/*
 * Created on 30/01/2009
 *
 */
package iusacell.mdc.arh.vo;

/**
 * @author ggonzaleze
 *
 */
public class FechaVO {
	private String fecha;
	private String fechaCompleta;

	public FechaVO() {
		super();
	}
	

	/**
	 * @return Returns the fecha.
	 */
	public String getFecha() {
		return fecha;
	}
	/**
	 * @param fecha The fecha to set.
	 */
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return Returns the fechaCompleta.
	 */
	public String getFechaCompleta() {
		return fechaCompleta;
	}
	/**
	 * @param fechaCompleta The fechaCompleta to set.
	 */
	public void setFechaCompleta(String fechaCompleta) {
		this.fechaCompleta = fechaCompleta;
	}
	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("fecha ="+this.fecha).append(", ");
		sb.append("fecha completa ="+this.fechaCompleta);
		return sb.toString();
	}
}
