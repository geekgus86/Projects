/**
 * 
 */
package iusacell.mdc.arh.vo;


/**
 * @author codaESM
 *
 */
public class RamoVO extends ValueObject{

	private String[] campos = {"claveRamo|BRSCH", "descRamo|BRTXT"};
	private int[] longitudes = null;
	
	private String claveRamo;
	private String descRamo;
	
	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("claveRamo = ").append(this.claveRamo).append(",");
		sb.append("descRamo =").append(this.descRamo).append(",");
		return sb.toString();
	}
	/**
	 * @return the campos
	 */
	public String[] getCampos() {
		return campos;
	}
	/**
	 * @param campos the campos to set
	 */
	public void setCampos(String[] campos) {
		this.campos = campos;
	}
	/**
	 * @return the longitudes
	 */
	public int[] getLongitudes() {
		return longitudes;
	}
	/**
	 * @param longitudes the longitudes to set
	 */
	public void setLongitudes(int[] longitudes) {
		this.longitudes = longitudes;
	}
	/**
	 * @return the claveRamo
	 */
	public String getClaveRamo() {
		return claveRamo;
	}
	/**
	 * @param claveRamo the claveRamo to set
	 */
	public void setClaveRamo(String claveRamo) {
		this.claveRamo = claveRamo;
	}
	/**
	 * @return the descRamo
	 */
	public String getDescRamo() {
		return descRamo;
	}
	/**
	 * @param descRamo the descRamo to set
	 */
	public void setDescRamo(String descRamo) {
		this.descRamo = descRamo;
	}

}
