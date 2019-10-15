package iusacell.mdc.arh.vo;

public class CatEscolaridadVO extends ValueObject{

	String idSap;
	String descripcion;
	
	public String getIdSap() {
		return idSap;
	}

	public void setIdSap(String idSap) {
		this.idSap = idSap;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	@Override
	public String[] getCampos() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[] getLongitudes() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
