package iusacell.mdc.arh.vo;


public class EntrevistaSalidaVO extends ValueObject {

	String[] campos = { "NUM_EMPL","NOM_EMPL","FECHA","MOTIVO_SALIDA","TIPO_SALIDA","SOCIEDAD","DIVISION","SUBDIVISION","FUNCION",
			"JEFE_INMEDIATO","NOM_EMPJEFE","MOTIVO_RENUNCIA","TIEMPO_DEJAR_E","COND_F1","COND_F2","COND_F3","ARMONIA_LAB","AL_MOTIVO",
			"INST_ADEC","LA_MOTIV","HERR_NEC","HN_MOTIVO","PRACT_NO_ETIC","PNE_MOTIV","RECOMENDACION","RE_MOTIV","COMENTARIO","SATIS_HRS",
			"SATIS_UBIC","SATIS_DEF","SATIS_BEN","SATIS_LR","SATIS_TRAB_EQ", "SATIS_RET", "SATIS_CAP", "SATIS_CUL", "SATIS_POL"};
	
	private String NUM_EMPL;
	private String NOM_EMPL;
	private String FECHA;
	private String MOTIVO_SALIDA;
	private String TIPO_SALIDA;
	private String SOCIEDAD;
	private String DIVISION;
	private String SUBDIVISION;
	private String FUNCION;
	private String JEFE_INMEDIATO;
	private String NOM_EMPJEFE;
	private String MOTIVO_RENUNCIA;
	private String TIEMPO_DEJAR_E;
	private String COND_F1;
	private String COND_F2;
	private String COND_F3;
	private String ARMONIA_LAB;
	private String AL_MOTIVO;
	private String INST_ADEC;
	private String LA_MOTIV;
	private String HERR_NEC;
	private String HN_MOTIVO;
	private String PRACT_NO_ETIC;
	private String PNE_MOTIV;
	private String RECOMENDACION;
	private String RE_MOTIV;
	private String COMENTARIO;
	private String SATIS_HRS;
	private String SATIS_UBIC;
	private String SATIS_DEF;
	private String SATIS_BEN;
	private String SATIS_LR;
	private String SATIS_TRAB_EQ;
	private String SATIS_RET;
	private String SATIS_CAP;
	private String SATIS_CUL;
	private String SATIS_POL;
	

	public EntrevistaSalidaVO() {
		super();
	}


	public EntrevistaSalidaVO(String nUMEMPL, String nOM_EMPL, String fECHA,
			String mOTIVOSALIDA, String tIPOSALIDA, String sOCIEDAD,
			String dIVISION, String sUBDIVISION, String fUNCION,
			String jEFEINMEDIATO, String nOM_EMPJEFE, String mOTIVORENUNCIA, String tIEMPODEJARE,
			String cONDF1, String cONDF2, String cONDF3, String aRMONIALAB,
			String aLMOTIVO, String iNSTADEC, String lAMOTIV, String hERRNEC,
			String hNMOTIVO, String pRACTNOETIC, String pNEMOTIV,
			String rECOMENDACION, String rEMOTIV, String cOMENTARIO,
			String sATISHRS, String sATISUBIC, String sATISDEF,
			String sATISBEN, String sATISLR, String sATISTRABEQ,
			String sATISRET, String sATISCAP, String sATISCUL, String sATISPOL) {
		super();
		NUM_EMPL = nUMEMPL;
		NOM_EMPL = nOM_EMPL;
		FECHA = fECHA;
		MOTIVO_SALIDA = mOTIVOSALIDA;
		TIPO_SALIDA = tIPOSALIDA;
		SOCIEDAD = sOCIEDAD;
		DIVISION = dIVISION;
		SUBDIVISION = sUBDIVISION;
		FUNCION = fUNCION;
		JEFE_INMEDIATO = jEFEINMEDIATO;
		NOM_EMPJEFE = nOM_EMPJEFE;
		MOTIVO_RENUNCIA = mOTIVORENUNCIA;
		TIEMPO_DEJAR_E = tIEMPODEJARE;
		COND_F1 = cONDF1;
		COND_F2 = cONDF2;
		COND_F3 = cONDF3;
		ARMONIA_LAB = aRMONIALAB;
		AL_MOTIVO = aLMOTIVO;
		INST_ADEC = iNSTADEC;
		LA_MOTIV = lAMOTIV;
		HERR_NEC = hERRNEC;
		HN_MOTIVO = hNMOTIVO;
		PRACT_NO_ETIC = pRACTNOETIC;
		PNE_MOTIV = pNEMOTIV;
		RECOMENDACION = rECOMENDACION;
		RE_MOTIV = rEMOTIV;
		COMENTARIO = cOMENTARIO;
		SATIS_HRS = sATISHRS;
		SATIS_UBIC = sATISUBIC;
		SATIS_DEF = sATISDEF;
		SATIS_BEN = sATISBEN;
		SATIS_LR = sATISLR;
		SATIS_TRAB_EQ = sATISTRABEQ;
		SATIS_RET = sATISRET;
		SATIS_CAP = sATISCAP;
		SATIS_CUL = sATISCUL;
		SATIS_POL = sATISPOL;
	}


	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("NUM_EMPL = ").append(this.NUM_EMPL).append(",");
		sb.append("NOM_EMPL = ").append(this.NOM_EMPL).append(",");
		sb.append("FECHA = ").append(this.FECHA).append(",");
		sb.append("MOTIVO_SALIDA = ").append(this.MOTIVO_SALIDA).append(",");
		sb.append("TIPO_SAIDA = ").append(this.TIPO_SALIDA).append(",");
		sb.append("SOCIEDAD = ").append(this.SOCIEDAD).append(",");
		sb.append("DIVISION = ").append(this.DIVISION).append(",");
		sb.append("SUBDIVISION = ").append(this.SUBDIVISION).append(",");
		sb.append("FUNCION = ").append(this.FUNCION).append(",");
		sb.append("JEFE_INMEDIATO = ").append(this.JEFE_INMEDIATO).append(",");
		sb.append("NOM_EMPJEFE = ").append(this.NOM_EMPJEFE).append(";");
		sb.append("MOTIVO_RENUNCIA = ").append(this.MOTIVO_RENUNCIA).append(",");
		sb.append("TIEMPO_DEJAR_E = ").append(this.TIEMPO_DEJAR_E).append(",");
		sb.append("COND_F1 = ").append(this.COND_F1).append(",");
		sb.append("COND_F2 = ").append(this.COND_F2).append(",");
		sb.append("COND_F3 = ").append(this.COND_F3).append(",");
		sb.append("ARMONIA_LAB = ").append(this.ARMONIA_LAB).append(",");
		sb.append("AL_MOTIVO = ").append(this.AL_MOTIVO).append(",");
		sb.append("INST_ADEC = ").append(this.INST_ADEC).append(",");
		sb.append("LA_MOTIV = ").append(this.LA_MOTIV).append(",");
		sb.append("HERR_NEC = ").append(this.HERR_NEC).append(",");
		sb.append("HN_MOTIVO = ").append(this.HN_MOTIVO).append(",");
		sb.append("PRACT_NO_ETIC = ").append(this.PRACT_NO_ETIC).append(",");
		sb.append("PNE_MOTIV = ").append(this.PNE_MOTIV).append(",");
		sb.append("RECOMENDACION = ").append(this.RECOMENDACION).append(",");
		sb.append("RE_MOTIV = ").append(this.RE_MOTIV).append(",");
		sb.append("COMENTARIO = ").append(this.COMENTARIO).append(",");
		sb.append("SATIS_HRS = ").append(this.SATIS_HRS).append(",");
		sb.append("SATIS_UBIC = ").append(this.SATIS_UBIC).append(",");
		sb.append("SATIS_DEF = ").append(this.SATIS_DEF).append(",");
		sb.append("SATIS_BEN = ").append(this.SATIS_BEN).append(",");
		sb.append("SATIS_LR = ").append(this.SATIS_LR).append(",");
		sb.append("SATIS_TRAB_EQ = ").append(this.SATIS_TRAB_EQ).append(",");
		sb.append("SATIS_RET = ").append(this.SATIS_RET).append(",");
		sb.append("SATIS_CAP = ").append(this.SATIS_CAP).append(",");
		sb.append("SATIS_CUL = ").append(this.SATIS_CUL).append(",");
		sb.append("SATIS_POL = ").append(this.SATIS_POL).append("");
		return sb.toString();
	}
	
	
	public String getSATIS_RET() {
		return SATIS_RET;
	}


	public void setSATIS_RET(String sATISRET) {
		SATIS_RET = sATISRET;
	}


	public String getSATIS_CAP() {
		return SATIS_CAP;
	}


	public void setSATIS_CAP(String sATISCAP) {
		SATIS_CAP = sATISCAP;
	}


	public String getSATIS_CUL() {
		return SATIS_CUL;
	}


	public void setSATIS_CUL(String sATISCUL) {
		SATIS_CUL = sATISCUL;
	}


	public String getSATIS_POL() {
		return SATIS_POL;
	}


	public void setSATIS_POL(String sATISPOL) {
		SATIS_POL = sATISPOL;
	}


	/**
	 * @return Devuelve aL_MOTIVO.
	 */
	public String getAL_MOTIVO() {
		return AL_MOTIVO;
	}
	/**
	 * @param al_motivo El aL_MOTIVO a establecer.
	 */
	public void setAL_MOTIVO(String al_motivo) {
		AL_MOTIVO = al_motivo;
	}
	/**
	 * @return Devuelve aRMONIA_LAB.
	 */
	public String getARMONIA_LAB() {
		return ARMONIA_LAB;
	}
	/**
	 * @param armonia_lab El aRMONIA_LAB a establecer.
	 */
	public void setARMONIA_LAB(String armonia_lab) {
		ARMONIA_LAB = armonia_lab;
	}
	/**
	 * @return Devuelve campos.
	 */
	public String[] getCampos() {
		return campos;
	}
	/**
	 * @param campos El campos a establecer.
	 */
	public void setCampos(String[] campos) {
		this.campos = campos;
	}
	/**
	 * @return Devuelve cOMENTARIO.
	 */
	public String getCOMENTARIO() {
		return COMENTARIO;
	}
	/**
	 * @param comentario El cOMENTARIO a establecer.
	 */
	public void setCOMENTARIO(String comentario) {
		COMENTARIO = comentario;
	}
	/**
	 * @return Devuelve cOND_F1.
	 */
	public String getCOND_F1() {
		return COND_F1;
	}
	/**
	 * @param cond_f1 El cOND_F1 a establecer.
	 */
	public void setCOND_F1(String cond_f1) {
		COND_F1 = cond_f1;
	}
	/**
	 * @return Devuelve cOND_F2.
	 */
	public String getCOND_F2() {
		return COND_F2;
	}
	/**
	 * @param cond_f2 El cOND_F2 a establecer.
	 */
	public void setCOND_F2(String cond_f2) {
		COND_F2 = cond_f2;
	}
	/**
	 * @return Devuelve cOND_F3.
	 */
	public String getCOND_F3() {
		return COND_F3;
	}
	/**
	 * @param cond_f3 El cOND_F3 a establecer.
	 */
	public void setCOND_F3(String cond_f3) {
		COND_F3 = cond_f3;
	}
	/**
	 * @return Devuelve dIVISION.
	 */
	public String getDIVISION() {
		return DIVISION;
	}
	/**
	 * @param division El dIVISION a establecer.
	 */
	public void setDIVISION(String division) {
		DIVISION = division;
	}
	/**
	 * @return Devuelve fECHA.
	 */
	public String getFECHA() {
		return FECHA;
	}
	/**
	 * @param fecha El fECHA a establecer.
	 */
	public void setFECHA(String fecha) {
		FECHA = fecha;
	}
	/**
	 * @return Devuelve fUNCION.
	 */
	public String getFUNCION() {
		return FUNCION;
	}
	/**
	 * @param funcion El fUNCION a establecer.
	 */
	public void setFUNCION(String funcion) {
		FUNCION = funcion;
	}
	/**
	 * @return Devuelve hERR_NEC.
	 */
	public String getHERR_NEC() {
		return HERR_NEC;
	}
	/**
	 * @param herr_nec El hERR_NEC a establecer.
	 */
	public void setHERR_NEC(String herr_nec) {
		HERR_NEC = herr_nec;
	}
	/**
	 * @return Devuelve hN_MOTIVO.
	 */
	public String getHN_MOTIVO() {
		return HN_MOTIVO;
	}
	/**
	 * @param hn_motivo El hN_MOTIVO a establecer.
	 */
	public void setHN_MOTIVO(String hn_motivo) {
		HN_MOTIVO = hn_motivo;
	}
	/**
	 * @return Devuelve iNST_ADEC.
	 */
	public String getINST_ADEC() {
		return INST_ADEC;
	}
	/**
	 * @param inst_adec El iNST_ADEC a establecer.
	 */
	public void setINST_ADEC(String inst_adec) {
		INST_ADEC = inst_adec;
	}
	/**
	 * @return Devuelve jEFE_INMEDIATO.
	 */
	public String getJEFE_INMEDIATO() {
		return JEFE_INMEDIATO;
	}
	/**
	 * @param jefe_inmediato El jEFE_INMEDIATO a establecer.
	 */
	public void setJEFE_INMEDIATO(String jefe_inmediato) {
		JEFE_INMEDIATO = jefe_inmediato;
	}
	/**
	 * @return Devuelve lA_MOTIV.
	 */
	public String getLA_MOTIV() {
		return LA_MOTIV;
	}
	/**
	 * @param la_motiv El lA_MOTIV a establecer.
	 */
	public void setLA_MOTIV(String la_motiv) {
		LA_MOTIV = la_motiv;
	}
	/**
	 * @return Devuelve mOTIVO_RENUNCIA.
	 */
	public String getMOTIVO_RENUNCIA() {
		return MOTIVO_RENUNCIA;
	}
	/**
	 * @param motivo_renuncia El mOTIVO_RENUNCIA a establecer.
	 */
	public void setMOTIVO_RENUNCIA(String motivo_renuncia) {
		MOTIVO_RENUNCIA = motivo_renuncia;
	}
	/**
	 * @return Devuelve mOTIVO_SALIDA.
	 */
	public String getMOTIVO_SALIDA() {
		return MOTIVO_SALIDA;
	}
	/**
	 * @param motivo_salida El mOTIVO_SALIDA a establecer.
	 */
	public void setMOTIVO_SALIDA(String motivo_salida) {
		MOTIVO_SALIDA = motivo_salida;
	}
	/**
	 * @return Devuelve nUM_EMPL.
	 */
	public String getNUM_EMPL() {
		return NUM_EMPL;
	}
	/**
	 * @param num_empl El nUM_EMPL a establecer.
	 */
	public void setNUM_EMPL(String num_empl) {
		NUM_EMPL = num_empl;
	}
	/**
	 * @return Devuelve pNE_MOTIV.
	 */
	public String getPNE_MOTIV() {
		return PNE_MOTIV;
	}
	/**
	 * @param pne_motiv El pNE_MOTIV a establecer.
	 */
	public void setPNE_MOTIV(String pne_motiv) {
		PNE_MOTIV = pne_motiv;
	}
	/**
	 * @return Devuelve pRACT_NO_ETIC.
	 */
	public String getPRACT_NO_ETIC() {
		return PRACT_NO_ETIC;
	}
	/**
	 * @param pract_no_etic El pRACT_NO_ETIC a establecer.
	 */
	public void setPRACT_NO_ETIC(String pract_no_etic) {
		PRACT_NO_ETIC = pract_no_etic;
	}
	/**
	 * @return Devuelve rE_MOTIV.
	 */
	public String getRE_MOTIV() {
		return RE_MOTIV;
	}
	/**
	 * @param re_motiv El rE_MOTIV a establecer.
	 */
	public void setRE_MOTIV(String re_motiv) {
		RE_MOTIV = re_motiv;
	}
	/**
	 * @return Devuelve rECOMENDACION.
	 */
	public String getRECOMENDACION() {
		return RECOMENDACION;
	}
	/**
	 * @param recomendacion El rECOMENDACION a establecer.
	 */
	public void setRECOMENDACION(String recomendacion) {
		RECOMENDACION = recomendacion;
	}
	/**
	 * @return Devuelve sATIS_BEN.
	 */
	public String getSATIS_BEN() {
		return SATIS_BEN;
	}
	/**
	 * @param satis_ben El sATIS_BEN a establecer.
	 */
	public void setSATIS_BEN(String satis_ben) {
		SATIS_BEN = satis_ben;
	}
	/**
	 * @return Devuelve sATIS_DEF.
	 */
	public String getSATIS_DEF() {
		return SATIS_DEF;
	}
	/**
	 * @param satis_def El sATIS_DEF a establecer.
	 */
	public void setSATIS_DEF(String satis_def) {
		SATIS_DEF = satis_def;
	}
	/**
	 * @return Devuelve sATIS_HRS.
	 */
	public String getSATIS_HRS() {
		return SATIS_HRS;
	}
	/**
	 * @param satis_hrs El sATIS_HRS a establecer.
	 */
	public void setSATIS_HRS(String satis_hrs) {
		SATIS_HRS = satis_hrs;
	}
	/**
	 * @return Devuelve sATIS_LR.
	 */
	public String getSATIS_LR() {
		return SATIS_LR;
	}
	/**
	 * @param satis_lr El sATIS_LR a establecer.
	 */
	public void setSATIS_LR(String satis_lr) {
		SATIS_LR = satis_lr;
	}
	/**
	 * @return Devuelve sATIS_TRAB_EQ.
	 */
	public String getSATIS_TRAB_EQ() {
		return SATIS_TRAB_EQ;
	}
	/**
	 * @param satis_trab_eq El sATIS_TRAB_EQ a establecer.
	 */
	public void setSATIS_TRAB_EQ(String satis_trab_eq) {
		SATIS_TRAB_EQ = satis_trab_eq;
	}
	/**
	 * @return Devuelve sATIS_UBIC.
	 */
	public String getSATIS_UBIC() {
		return SATIS_UBIC;
	}
	/**
	 * @param satis_ubic El sATIS_UBIC a establecer.
	 */
	public void setSATIS_UBIC(String satis_ubic) {
		SATIS_UBIC = satis_ubic;
	}
	/**
	 * @return Devuelve sOCIEDAD.
	 */
	public String getSOCIEDAD() {
		return SOCIEDAD;
	}
	/**
	 * @param sociedad El sOCIEDAD a establecer.
	 */
	public void setSOCIEDAD(String sociedad) {
		SOCIEDAD = sociedad;
	}
	/**
	 * @return Devuelve sUBDIVISION.
	 */
	public String getSUBDIVISION() {
		return SUBDIVISION;
	}
	/**
	 * @param subdivision El sUBDIVISION a establecer.
	 */
	public void setSUBDIVISION(String subdivision) {
		SUBDIVISION = subdivision;
	}
	/**
	 * @return Devuelve tIEMPO_DEJAR_E.
	 */
	public String getTIEMPO_DEJAR_E() {
		return TIEMPO_DEJAR_E;
	}
	/**
	 * @param tiempo_dejar_e El tIEMPO_DEJAR_E a establecer.
	 */
	public void setTIEMPO_DEJAR_E(String tiempo_dejar_e) {
		TIEMPO_DEJAR_E = tiempo_dejar_e;
	}
	/**
	 * @return Devuelve tIPO_SAIDA.
	 */
	public String getTIPO_SALIDA() {
		return TIPO_SALIDA;
	}
	/**
	 * @param tipo_saida El tIPO_SAIDA a establecer.
	 */
	public void setTIPO_SALIDA(String tipo_salida) {
		TIPO_SALIDA = tipo_salida;
	}


	/* (sin Javadoc)
	 * @see iusacell.mdc.vo.ValueObject#getLongitudes()
	 */
	public int[] getLongitudes() {
		// TODO Apéndice de método generado automáticamente
		return null;
	}


	public String getNOM_EMPL() {
		return NOM_EMPL;
	}


	public void setNOM_EMPL(String nOM_EMPL) {
		NOM_EMPL = nOM_EMPL;
	}


	public String getNOM_EMPJEFE() {
		return NOM_EMPJEFE;
	}


	public void setNOM_EMPJEFE(String nOM_EMPJEFE) {
		NOM_EMPJEFE = nOM_EMPJEFE;
	}
}

