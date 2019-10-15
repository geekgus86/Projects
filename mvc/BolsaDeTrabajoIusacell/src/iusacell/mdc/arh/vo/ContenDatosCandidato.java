package iusacell.mdc.arh.vo;

import java.util.List;

public class ContenDatosCandidato {
	
	String flag;
	CandidatoExpressVO candExpressVO;
	List<CatEscolaridadVO> lstEscolaridad;
	List<CatEdoCivilCaptaVO> lstEdoCivil;
	List<CatTipoFamiliarVO> lstTipoFam;
	// Inicio: Para Guardar los datos del candidato son los siguientes VO
	DatosCandidatoVO   datCandidatoVO;
	List<ExpLaboralCandidatoVO> expLabCandidatoVO;
	List<FamiliaresCandidatoVO> famCandidatoVO;
	// Fin: Para Guardar los datos del candidato son los siguientes VO
	
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public CandidatoExpressVO getCandExpressVO() {
		return candExpressVO;
	}
	public void setCandExpressVO(CandidatoExpressVO candExpressVO) {
		this.candExpressVO = candExpressVO;
	}
	public List<CatEscolaridadVO> getLstEscolaridad() {
		return lstEscolaridad;
	}
	public void setLstEscolaridad(List<CatEscolaridadVO> lstEscolaridad) {
		this.lstEscolaridad = lstEscolaridad;
	}
	public List<CatEdoCivilCaptaVO> getLstEdoCivil() {
		return lstEdoCivil;
	}
	public void setLstEdoCivil(List<CatEdoCivilCaptaVO> lstEdoCivil) {
		this.lstEdoCivil = lstEdoCivil;
	}
	public List<CatTipoFamiliarVO> getLstTipoFam() {
		return lstTipoFam;
	}
	public void setLstTipoFam(List<CatTipoFamiliarVO> lstTipoFam) {
		this.lstTipoFam = lstTipoFam;
	}
	public DatosCandidatoVO getDatCandidatoVO() {
		return datCandidatoVO;
	}
	public void setDatCandidatoVO(DatosCandidatoVO datCandidatoVO) {
		this.datCandidatoVO = datCandidatoVO;
	}
	public List<ExpLaboralCandidatoVO> getExpLabCandidatoVO() {
		return expLabCandidatoVO;
	}
	public void setExpLabCandidatoVO(List<ExpLaboralCandidatoVO> expLabCandidatoVO) {
		this.expLabCandidatoVO = expLabCandidatoVO;
	}
	public List<FamiliaresCandidatoVO> getFamCandidatoVO() {
		return famCandidatoVO;
	}
	public void setFamCandidatoVO(List<FamiliaresCandidatoVO> famCandidatoVO) {
		this.famCandidatoVO = famCandidatoVO;
	}
	

}
