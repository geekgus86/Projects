package iusacell.mdc.arh.vo;

public class CatTipoFamiliarVO extends ValueObject {

	private int idFamiliar;
	private String descFamiliar;
	
	
	
	public int getIdFamiliar() {
		return idFamiliar;
	}

	public void setIdFamiliar(int idFamiliar) {
		this.idFamiliar = idFamiliar;
	}

	public String getDescFamiliar() {
		return descFamiliar;
	}

	public void setDescFamiliar(String descFamiliar) {
		this.descFamiliar = descFamiliar;
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
