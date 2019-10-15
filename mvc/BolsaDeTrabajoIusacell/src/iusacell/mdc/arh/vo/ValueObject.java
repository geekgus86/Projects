
package iusacell.mdc.arh.vo;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public abstract class ValueObject{

	@Transient
    public abstract String[] getCampos();
	
	@Transient
    public abstract int[] getLongitudes();
	
	@Transient
    private String[] headerReporte;
    
    public String toString()
    {
        return "";
    }
    
    public ValueObject(){
    }
	/**
	 * @return the headerReporte
	 */
	public String[] getHeaderReporte() {
		return headerReporte;
	}
	/**
	 * @param headerReporte the headerReporte to set
	 */
	public void setHeaderReporte(String[] headerReporte) {
		this.headerReporte = headerReporte;
	}

}