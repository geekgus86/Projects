package iusacell.mdc.arh.util;


public class Catalog
{
	Integer id;
	String shortCode;
	String longCode;
	
	public Catalog() { }
	
	public Catalog(Integer id,
	        	   String shortCode,
	        	   String longCode)
	{
		this.id = id;
		this.shortCode = shortCode;
		this.longCode = longCode;
	}
	
	/**
	 * Texto que se devolvera como etiqueta para usar el catalogo en un dropdown
	 */
	public String getDescription()
	{
	    return this.longCode;
	}
	
	public String toString()
	{
		StringBuffer buffer = new StringBuffer();
		buffer.append("[");
		buffer.append(id);
		buffer.append(",");
		buffer.append(shortCode);
		buffer.append(",");
		buffer.append(longCode);
		buffer.append("]");
		return buffer.toString();
	}
	
	
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getLongCode() {
        return longCode;
    }
    public void setLongCode(String longCode) {
        this.longCode = longCode;
    }
    public String getShortCode() {
        return shortCode;
    }
    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }
}
