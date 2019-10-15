package iusacell.mdc.arh.vo;


public class DatosBasicosVO extends ValueObject {

	String[] campos = { "Pernr", "Ename", "Plans", "Stext", "Shor2", "Direc", "Bukrs", "Butxt", "Kostl", 
						"Ktext", "LineaReporte", "LrStext", "LrPernr", "LrEname", "Funcion", "FDesc", "division",
						"nomDivision", "subDivision", "nomSubDivision", "cveEdificio", "nomEdificio",
						"calleNumero", "calle", "plz", "ort", "region","abkrs","antext"};
	
	private String Pernr;
	private String Ename;
	private String Plans;
	private String Stext;
	private String Shor2;
	private String Direc;
	private String Bukrs;
	private String Butxt;
	private String Kostl;			//Centro de Costos
	private String Ktext;
	private String LineaReporte;
	private String LrStext;
	private String LrPernr;
	private String LrEname;
	private String Funcion;
	private String FDesc;
	private String division;
	private String nomDivision;
	private String subDivision;
	private String nomSubDivision;
	private String cveEdificio;
	private String nomEdificio;
	private String calleNumero;
	private String calle;
	private String plz;
	private String ort;
	private String region;
	private String abkrs;
	private String antext;
    private String vorna;
    private String nachn;
    private String nach2;
	
	private String movimiento;
	private String posicion;
	private String sueldo;
	

	private String saeo;
	
	

	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("Pernr = ").append(this.Pernr).append(",");
		sb.append("Ename = ").append(this.Ename).append(",");
		sb.append("Plans = ").append(this.Plans).append(",");
		sb.append("Stext = ").append(this.Stext).append(",");
		sb.append("Shor2 = ").append(this.Shor2).append(",");
		sb.append("Direc = ").append(this.Direc).append(",");
		sb.append("Bukrs = ").append(this.Bukrs).append(",");
		sb.append("Butxt = ").append(this.Butxt).append(",");
		sb.append("Kostl = ").append(this.Kostl).append(",");
		sb.append("Ktext = ").append(this.Ktext).append(",");
		sb.append("LineaReporte = ").append(this.LineaReporte).append(",");
		sb.append("LrStext = ").append(this.LrStext).append(",");
		sb.append("LrPernr = ").append(this.LrPernr).append(",");
		sb.append("LrEname = ").append(this.LrEname).append(",");
		sb.append("Funcion = ").append(this.Funcion).append(",");
		sb.append("FDesc = ").append(this.FDesc).append(",");
		sb.append("division = ").append(this.division).append(",");
		sb.append("nomDivision = ").append(this.nomDivision).append(",");
		sb.append("subDivision = ").append(this.subDivision).append(",");
		sb.append("nomSubDivision = ").append(this.nomSubDivision).append(",");
		sb.append("cveEdificio = ").append(this.cveEdificio).append(",");
		sb.append("nomEdificio = ").append(this.nomEdificio).append(",");
		sb.append("calleNumero = ").append(this.calleNumero).append(",");
		sb.append("calle = ").append(this.calle).append(",");
		sb.append("plz = ").append(this.plz).append(",");
		sb.append("ort = ").append(this.ort).append(",");
		sb.append("region = ").append(this.region).append(",");
		sb.append("abkrs = ").append(this.abkrs).append(",");
		sb.append("antext = ").append(this.antext).append(",");
		return sb.toString();
	}
	
	
	/**
	 * @return Devuelve nach2.
	 */
	public String getNach2() {
		return nach2;
	}
	/**
	 * @param nach2 El nach2 a establecer.
	 */
	public void setNach2(String nach2) {
		this.nach2 = nach2;
	}
	/**
	 * @return Devuelve nachn.
	 */
	public String getNachn() {
		return nachn;
	}
	/**
	 * @param nachn El nachn a establecer.
	 */
	public void setNachn(String nachn) {
		this.nachn = nachn;
	}
	/**
	 * @return Devuelve vorna.
	 */
	public String getVorna() {
		return vorna;
	}
	/**
	 * @param vorna El vorna a establecer.
	 */
	public void setVorna(String vorna) {
		this.vorna = vorna;
	}
	public String getSaeo() {
		return saeo;
	}
	public void setSaeo(String saeo) {
		this.saeo = saeo;
	}

	public String getSueldo() {
		return sueldo;
	}
	public void setSueldo(String sueldo) {
		this.sueldo = sueldo;
	}
	public String getMovimiento() {
		return movimiento;
	}
	public void setMovimiento(String movimiento) {
		this.movimiento = movimiento;
	}
	/**
	 * @return String[]
	 */
	public String[] getCampos() {
		return campos;
	}
	/**
	 * @return String
	 */
	public String getPernr() {
		return Pernr;
	}
	/**
	 * @param pernr String
	 */
	public void setPernr(String pernr) {
		Pernr = pernr;
	}
	/**
	 * @return String
	 */
	public String getEname() {
		return Ename;
	}
	/**
	 * @param ename String
	 */
	public void setEname(String ename) {
		Ename = ename;
	}
	/**
	 * @return String
	 */
	public String getPlans() {
		return Plans;
	}
	/**
	 * @param plans String
	 */
	public void setPlans(String plans) {
		Plans = plans;
	}
	/**
	 * @return String
	 */
	public String getStext() {
		return Stext;
	}
	/**
	 * @param stext String
	 */
	public void setStext(String stext) {
		Stext = stext;
	}
	/**
	 * @return String
	 */
	public String getShor2() {
		return Shor2;
	}
	/**
	 * @param shor2 String
	 */
	public void setShor2(String shor2) {
		Shor2 = shor2;
	}
	/**
	 * @return String
	 */
	public String getDirec() {
		return Direc;
	}
	/**
	 * @param direc String
	 */
	public void setDirec(String direc) {
		Direc = direc;
	}
	/**
	 * @return String
	 */
	public String getBukrs() {
		return Bukrs;
	}
	/**
	 * @param bukrs String
	 */
	public void setBukrs(String bukrs) {
		Bukrs = bukrs;
	}
	/**
	 * @return String
	 */
	public String getButxt() {
		return Butxt;
	}
	/**
	 * @param butxt String
	 */
	public void setButxt(String butxt) {
		Butxt = butxt;
	}
	/**
	 * @return String
	 */
	public String getKostl() {
		return Kostl;
	}
	/**
	 * @param kostl String
	 */
	public void setKostl(String kostl) {
		Kostl = kostl;
	}
	/**
	 * @return String
	 */
	public String getKtext() {
		return Ktext;
	}
	/**
	 * @param ktext String
	 */
	public void setKtext(String ktext) {
		Ktext = ktext;
	}
	/**
	 * @return String
	 */
	public String getLineaReporte() {
		return LineaReporte;
	}
	/**
	 * @param lineaReporte String
	 */
	public void setLineaReporte(String lineaReporte) {
		LineaReporte = lineaReporte;
	}
	/**
	 * @return String
	 */
	public String getLrStext() {
		return LrStext;
	}
	/**
	 * @param lrStext String
	 */
	public void setLrStext(String lrStext) {
		LrStext = lrStext;
	}
	/**
	 * @return String
	 */
	public String getLrPernr() {
		return LrPernr;
	}
	/**
	 * @param lrPernr String
	 */
	public void setLrPernr(String lrPernr) {
		LrPernr = lrPernr;
	}
	/**
	 * @return String
	 */
	public String getLrEname() {
		return LrEname;
	}
	/**
	 * @param lrEname String
	 */
	public void setLrEname(String lrEname) {
		LrEname = lrEname;
	}
	/**
	 * @return String
	 */
	public String getFuncion() {
		return Funcion;
	}
	/**
	 * @param funcion String
	 */
	public void setFuncion(String funcion) {
		Funcion = funcion;
	}
	/**
	 * @return String
	 */
	public String getFDesc() {
		return FDesc;
	}
	/**
	 * @param desc String
	 */
	public void setFDesc(String desc) {
		FDesc = desc;
	}
	public int[] getLongitudes() {
		return null;
	}
	/**
	 * @return the division
	 */
	public String getDivision() {
		return division;
	}
	/**
	 * @param division the division to set
	 */
	public void setDivision(String division) {
		this.division = division;
	}
	/**
	 * @return the nomDivision
	 */
	public String getNomDivision() {
		return nomDivision;
	}
	/**
	 * @param nomDivision the nomDivision to set
	 */
	public void setNomDivision(String nomDivision) {
		this.nomDivision = nomDivision;
	}
	/**
	 * @return the subDivision
	 */
	public String getSubDivision() {
		return subDivision;
	}
	/**
	 * @param subDivision the subDivision to set
	 */
	public void setSubDivision(String subDivision) {
		this.subDivision = subDivision;
	}
	/**
	 * @return the nomSubDivision
	 */
	public String getNomSubDivision() {
		return nomSubDivision;
	}
	/**
	 * @param nomSubDivision the nomSubDivision to set
	 */
	public void setNomSubDivision(String nomSubDivision) {
		this.nomSubDivision = nomSubDivision;
	}
	/**
	 * @return the cveEdificio
	 */
	public String getCveEdificio() {
		return cveEdificio;
	}
	/**
	 * @param cveEdificio the cveEdificio to set
	 */
	public void setCveEdificio(String cveEdificio) {
		this.cveEdificio = cveEdificio;
	}
	/**
	 * @return the nomEdificio
	 */
	public String getNomEdificio() {
		return nomEdificio;
	}
	/**
	 * @param nomEdificio the nomEdificio to set
	 */
	public void setNomEdificio(String nomEdificio) {
		this.nomEdificio = nomEdificio;
	}
	/**
	 * @return the calleNumero
	 */
	public String getCalleNumero() {
		return calleNumero;
	}
	/**
	 * @param calleNumero the calleNumero to set
	 */
	public void setCalleNumero(String calleNumero) {
		this.calleNumero = calleNumero;
	}
	/**
	 * @return the calle
	 */
	public String getCalle() {
		return calle;
	}
	/**
	 * @param calle the calle to set
	 */
	public void setCalle(String calle) {
		this.calle = calle;
	}
	/**
	 * @return the plz
	 */
	public String getPlz() {
		return plz;
	}
	/**
	 * @param plz the plz to set
	 */
	public void setPlz(String plz) {
		this.plz = plz;
	}
	/**
	 * @return the ort
	 */
	public String getOrt() {
		return ort;
	}
	/**
	 * @param ort the ort to set
	 */
	public void setOrt(String ort) {
		this.ort = ort;
	}
	/**
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}
	/**
	 * @param region the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}
	/**
	 * @param campos the campos to set
	 */
	public void setCampos(String[] campos) {
		this.campos = campos;
	}

	public String getAbkrs() {
		return abkrs;
	}
	public void setAbkrs(String abkrs) {
		this.abkrs = abkrs;
	}
	public String getAntext() {
		return antext;
	}
	public void setAntext(String antext) {
		this.antext = antext;
	}
	public String getPosicion() {
		return posicion;
	}
	public void setPosicion(String posicion) {
		this.posicion = posicion;
	}
}
