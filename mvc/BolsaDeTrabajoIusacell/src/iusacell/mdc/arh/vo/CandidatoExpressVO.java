package iusacell.mdc.arh.vo;

//import iusacell.mdc.arh.form.AltaExpressForm;
//import iusacell.mdc.utils.Fecha;
import java.util.Date;

/**
 * @author YOLMEDO
 *
 * TODO Para cambiar la plantilla de este comentario generado, vaya a
 * Ventana - Preferencias - Java - Estilo de código - Plantillas de código
 */
public class CandidatoExpressVO {
	
	public int idCandidato;
	public Date fecha;
	public int puestoId;
	public CandidatoExpressVO puestoVO;
	public String puesto;
	public String nombre;
	public String aPaterno;
	public String aMaterno;
	public String sexo;
	public String fechaNacimiento;
	public String nacionalidad;
	public String nacionalidad2;
	public String estadoNacimiento;
	public String lugarNacimiento;
	public String rfc;
	public String rfc_check;
	public String curp_check;
	public String curp;
	public String imss;
	public String eMail;
	public String telefono;
	public String gradoEstudios;
	public String colonia;
	public String cp;
	public String estadoActual;
	public String ciudadActual;
	public int cambiarResidencia;
	public String estadoInteres1;
	public String ciudadInteres1;
	public String estadoInteres2;
	public String ciudadInteres2;
	public int estatusId;
	//public EstatusCandidatoExpressVO estatus;
	public String numEmpRegistro;
	public int cl;
	public int aceptaCML;
	public int apruebaPsycowin;
	public Date fechaPsycowin;
	public int idEntrevista;
	public String usuarioActualiza;
	public Date fechaActualiza;
	public String entrevistaComp;
	public String estSocioeco;
	//inicio :Solo para mostrar en candidato viable  RVT
	public String  estadoInteres;
	public String  ciudadInteres;
	public String estadoInteresDesc;
	public String ciudadInteresDesc;
	public String estadoInteres1Desc;
	public String ciudadInteres1Desc;
	public String estadoInteres2Desc;
	public String ciudadInteres2Desc;
	public String estadoActualDesc;
	public String ciudadActualDesc;
	public String strFechaRegistro;
	public int reingreso;
	public String posicionConcat;
	public String proceso;
	public int ventas;
	public String descMedio;
	public int examenMedico;
	public String celular ; 
	public String lada ;
	public int capta ; 
	public String funcion;
	public int envio_mail_cand;
	public int reg_candidato;
	public Date fechaRegCandidato;
	
	/**
	 * @param candidatoExpressForm
	 * @throws Exception
	 */
/*	public CandidatoExpressVO(AltaExpressForm candidatoExpressForm, String numEmpRegistro){
		this.nombre =candidatoExpressForm.getNombre();
	    this.puestoId = Integer.parseInt(candidatoExpressForm.getPuestoID());
	    this.puesto = candidatoExpressForm.getPuestoID();
	    this.aPaterno = candidatoExpressForm.getApellidoPaterno();
	    this.aMaterno = candidatoExpressForm.getApellidoMaterno();
	    this.sexo = candidatoExpressForm.getSexo();
	    this.fechaNacimiento = candidatoExpressForm.getFechaNacimiento();
	    this.nacionalidad = candidatoExpressForm.getNacionalidad();
	    this.estadoNacimiento = candidatoExpressForm.getEstadoNacimiento();
	    this.lugarNacimiento = candidatoExpressForm.getLugarNacimiento();
	    this.rfc = candidatoExpressForm.getRfc();
	    this.curp = candidatoExpressForm.getCurp();
	    this.imss = candidatoExpressForm.getImss()!=null ? candidatoExpressForm.getImss() : "";
	    this.eMail = candidatoExpressForm.getEmail();
	    this.telefono = candidatoExpressForm.getTelefono();
	    this.gradoEstudios = candidatoExpressForm.getGradoUltimoEstudios();
	    this.cp = candidatoExpressForm.getCp();
	    this.colonia = candidatoExpressForm.getColonia();
	    this.estadoActual = candidatoExpressForm.getEstado();
	    this.ciudadActual = candidatoExpressForm.getCiudad();
	    this.cambiarResidencia = candidatoExpressForm.getInteresCambiarResidencia();
	    this.estadoInteres1 = candidatoExpressForm.getInteres1Estado();
	    this.ciudadInteres1 = candidatoExpressForm.getInteres1Ciudad();
	    this.estadoInteres2 = candidatoExpressForm.getInteres2Estado();
	    this.ciudadInteres2 = candidatoExpressForm.getInteres2Ciudad();
	    this.estadoInteres = candidatoExpressForm.getInteresEstado();
	    this.ciudadInteres = candidatoExpressForm.getInteresCiudad();
	    this.descMedio = candidatoExpressForm.getDescMedio();
	    this.numEmpRegistro = numEmpRegistro;
	    this.celular = candidatoExpressForm.getCelular();

	}*/
	public CandidatoExpressVO(){
	super();
	}
	
	

	/**
	 * @return Devuelve curp_check.
	 */
	public String getCurp_check() {
		return curp_check;
	}
	/**
	 * @param curp_check El curp_check a establecer.
	 */
	public void setCurp_check(String curp_check) {
		this.curp_check = curp_check;
	}
	/**
	 * @return Devuelve rfc_check.
	 */
	public String getRfc_check() {
		return rfc_check;
	}
	/**
	 * @param rfc_check El rfc_check a establecer.
	 */
	public void setRfc_check(String rfc_check) {
		this.rfc_check = rfc_check;
	}
	/**
	 * @return Devuelve envio_mail_cand.
	 */
	public int getEnvio_mail_cand() {
		return envio_mail_cand;
	}
	/**
	 * @param envio_mail_cand El envio_mail_cand a establecer.
	 */
	public void setEnvio_mail_cand(int envio_mail_cand) {
		this.envio_mail_cand = envio_mail_cand;
	}
	/**
	 * @return Devuelve fechaRegCandidato.
	 */
	public Date getFechaRegCandidato() {
		return fechaRegCandidato;
	}
	/**
	 * @param fechaRegCandidato El fechaRegCandidato a establecer.
	 */
	public void setFechaRegCandidato(Date fechaRegCandidato) {
		this.fechaRegCandidato = fechaRegCandidato;
	}
	/**
	 * @return Devuelve reg_candidato.
	 */
	public int getReg_candidato() {
		return reg_candidato;
	}
	/**
	 * @param reg_candidato El reg_candidato a establecer.
	 */
	public void setReg_candidato(int reg_candidato) {
		this.reg_candidato = reg_candidato;
	}
	/**
	 * @return Devuelve nacionalidad2.
	 */
	public String getNacionalidad2() {
		return nacionalidad2;
	}
	/**
	 * @param nacionalidad2 El nacionalidad2 a establecer.
	 */
	public void setNacionalidad2(String nacionalidad2) {
		this.nacionalidad2 = nacionalidad2;
	}
	/**
	 * @return Devuelve capta.
	 */
	public int getCapta() {
		return capta;
	}
	/**
	 * @param capta El capta a establecer.
	 */
	public void setCapta(int capta) {
		this.capta = capta;
	}
	/**
	 * @return Devuelve funcion.
	 */
	public String getFuncion() {
		return funcion;
	}
	/**
	 * @param funcion El funcion a establecer.
	 */
	public void setFuncion(String funcion) {
		this.funcion = funcion;
	}
	/**
	 * @return Devuelve celular.
	 */
	public String getCelular() {
		return celular;
	}
	/**
	 * @param celular El celular a establecer.
	 */
	public void setCelular(String celular) {
		this.celular = celular;
	}
	/**
	 * @return Devuelve examenMedico.
	 */
	public int getExamenMedico() {
		return examenMedico;
	}
	/**
	 * @param examenMedico El examenMedico a establecer.
	 */
	public void setExamenMedico(int examenMedico) {
		this.examenMedico = examenMedico;
	}
	/**
	 * @return Devuelve idEntrevista.
	 */
	public int getIdEntrevista() {
		return idEntrevista;
	}
	/**
	 * @param idEntrevista El idEntrevista a establecer.
	 */
	public void setIdEntrevista(int idEntrevista) {
		this.idEntrevista = idEntrevista;
	}
	/**
	 * @return Devuelve fechaActualizacion.
	 */
	public Date getFechaPsycowin() {
		return fechaPsycowin;
	}
	/**
	 * @param fechaActualizacion El fechaActualizacion a establecer.
	 */
	public void setFechaPsycowin(Date fechaPsycowin) {
		this.fechaPsycowin = fechaPsycowin;
	}
	/**
	 * @return Devuelve aceptaCML.
	 */
	public int getAceptaCML() {
		return aceptaCML;
	}
	/**
	 * @param aceptaCML El aceptaCML a establecer.
	 */
	public void setAceptaCML(int aceptaCML) {
		this.aceptaCML = aceptaCML;
	}
	/**
	 * @return Devuelve aMaterno.
	 */
	public String getAMaterno() {
		return aMaterno;
	}
	/**
	 * @param materno El aMaterno a establecer.
	 */
	public void setAMaterno(String materno) {
		aMaterno = materno;
	}
	/**
	 * @return Devuelve aPaterno.
	 */
	public String getAPaterno() {
		return aPaterno;
	}
	/**
	 * @param paterno El aPaterno a establecer.
	 */
	public void setAPaterno(String paterno) {
		aPaterno = paterno;
	}
	/**
	 * @return Devuelve apruebaPsycowin.
	 */
	public int getApruebaPsycowin() {
		return apruebaPsycowin;
	}
	/**
	 * @param apruebaPsycowin El apruebaPsycowin a establecer.
	 */
	public void setApruebaPsycowin(int apruebaPsycowin) {
		this.apruebaPsycowin = apruebaPsycowin;
	}
	/**
	 * @return Devuelve cambiarResidencia.
	 */
	public int getCambiarResidencia() {
		return cambiarResidencia;
	}
	/**
	 * @param cambiarResidencia El cambiarResidencia a establecer.
	 */
	public void setCambiarResidencia(int cambiarResidencia) {
		this.cambiarResidencia = cambiarResidencia;
	}
	/**
	 * @return Devuelve ciudadActual.
	 */
	public String getCiudadActual() {
		return ciudadActual;
	}
	/**
	 * @param ciudadActual El ciudadActual a establecer.
	 */
	public void setCiudadActual(String ciudadActual) {
		this.ciudadActual = ciudadActual;
	}
	/**
	 * @return Devuelve ciudadInteres1.
	 */
	public String getCiudadInteres1() {
		return ciudadInteres1;
	}
	/**
	 * @param ciudadInteres1 El ciudadInteres1 a establecer.
	 */
	public void setCiudadInteres1(String ciudadInteres1) {
		this.ciudadInteres1 = ciudadInteres1;
	}
	/**
	 * @return Devuelve ciudadInteres2.
	 */
	public String getCiudadInteres2() {
		return ciudadInteres2;
	}
	/**
	 * @param ciudadInteres2 El ciudadInteres2 a establecer.
	 */
	public void setCiudadInteres2(String ciudadInteres2) {
		this.ciudadInteres2 = ciudadInteres2;
	}
	/**
	 * @return Devuelve cl.
	 */
	public int getCl() {
		return cl;
	}
	/**
	 * @param cl El cl a establecer.
	 */
	public void setCl(int cl) {
		this.cl = cl;
	}
	/**
	 * @return Devuelve cp.
	 */
	public String getCp() {
		return cp;
	}
	/**
	 * @param cp El cp a establecer.
	 */
	public void setCp(String cp) {
		this.cp = cp;
	}
	/**
	 * @return Devuelve curp.
	 */
	public String getCurp() {
		return curp;
	}
	/**
	 * @param curp El curp a establecer.
	 */
	public void setCurp(String curp) {
		this.curp = curp;
	}
	/**
	 * @return Devuelve eMail.
	 */
	public String getEMail() {
		return eMail;
	}
	/**
	 * @param mail El eMail a establecer.
	 */
	public void setEMail(String mail) {
		eMail = mail;
	}
	/**
	 * @return Devuelve estadoActual.
	 */
	public String getEstadoActual() {
		return estadoActual;
	}
	/**
	 * @param estadoActual El estadoActual a establecer.
	 */
	public void setEstadoActual(String estadoActual) {
		this.estadoActual = estadoActual;
	}
	/**
	 * @return Devuelve estadoInteres1.
	 */
	public String getEstadoInteres1() {
		return estadoInteres1;
	}
	/**
	 * @param estadoInteres1 El estadoInteres1 a establecer.
	 */
	public void setEstadoInteres1(String estadoInteres1) {
		this.estadoInteres1 = estadoInteres1;
	}
	/**
	 * @return Devuelve estadoInteres2.
	 */
	public String getEstadoInteres2() {
		return estadoInteres2;
	}
	/**
	 * @param estadoInteres2 El estadoInteres2 a establecer.
	 */
	public void setEstadoInteres2(String estadoInteres2) {
		this.estadoInteres2 = estadoInteres2;
	}
	/**
	 * @return Devuelve estadoNacimiento.
	 */
	public String getEstadoNacimiento() {
		return estadoNacimiento;
	}
	/**
	 * @param estadoNacimiento El estadoNacimiento a establecer.
	 */
	public void setEstadoNacimiento(String estadoNacimiento) {
		this.estadoNacimiento = estadoNacimiento;
	}
	/**
	 * @return Devuelve estatus.
	 */
	//public EstatusCandidatoExpressVO getEstatus() {
	//	return estatus;
	//}
	/**
	 * @param estatus El estatus a establecer.
	 */
	//public void setEstatus(EstatusCandidatoExpressVO estatus) {
	//	this.estatus = estatus;
	//}
	/**
	 * @return Devuelve estatusId.
	 */
	public int getEstatusId() {
		return estatusId;
	}
	/**
	 * @param estatusId El estatusId a establecer.
	 */
	public void setEstatusId(int estatusId) {
		this.estatusId = estatusId;
	}
	/**
	 * @return Devuelve fecha.
	 */
	public Date getFecha() {
		return fecha;
	}
	/**
	 * @param fecha El fecha a establecer.
	 */
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return Devuelve fechaNacimiento.
	 */
	public String getFechaNacimiento() {
		return fechaNacimiento;
	}
	public String getDiaNacimiento(){
		return fechaNacimiento.split("\\.")[0];
	}
	//public String getMesNacimiento(){
	//	return Fecha.getMES(fechaNacimiento.split("\\.")[1]);
	//}
	public String getAnioNacimiento(){
		return fechaNacimiento.split("\\.")[2];
	}
	/**
	 * @param fechaNacimiento El fechaNacimiento a establecer.
	 */
//	public void setFechaNacimiento(Date fechaNacimiento) {
//		String fechaNacimientoString = Fecha.getDateFormat(fechaNacimiento, "dd.MM.yyyy");
//		this.fechaNacimiento = fechaNacimientoString;
//	}
	public void setFechaNacimiento(String fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	/**
	 * @return Devuelve gradoEstudios.
	 */
	public String getGradoEstudios() {
		return gradoEstudios;
	}
	/**
	 * @param gradoEstudios El gradoEstudios a establecer.
	 */
	public void setGradoEstudios(String gradoEstudios) {
		this.gradoEstudios = gradoEstudios;
	}
	/**
	 * @return Devuelve id_candidato.
	 */
	public int getIdCandidato() {
		return idCandidato;
	}
	/**
	 * @param id_candidato El id_candidato a establecer.
	 */
	public void setIdCandidato(int idCandidato) {
		this.idCandidato = idCandidato;
	}
	/**
	 * @return Devuelve imss.
	 */
	public String getImss() {
		return imss;
	}
	/**
	 * @param imss El imss a establecer.
	 */
	public void setImss(String imss) {
		this.imss = imss;
	}
	/**
	 * @return Devuelve lugarNacimiento.
	 */
	public String getLugarNacimiento() {
		return lugarNacimiento;
	}
	/**
	 * @param lugarNacimiento El lugarNacimiento a establecer.
	 */
	public void setLugarNacimiento(String lugarNacimiento) {
		this.lugarNacimiento = lugarNacimiento;
	}
	/**
	 * @return Devuelve nacionalidad.
	 */
	public String getNacionalidad() {
		return nacionalidad;
	}
	/**
	 * @param nacionalidad El nacionalidad a establecer.
	 */
	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}
	/**
	 * @return Devuelve nombre.
	 */
	public String getNombre() {
		return nombre;
	}
	/**
	 * @param nombre El nombre a establecer.
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	/**
	 * @return Devuelve nombre.
	 */
	public String getNombreCompleto() {
		return nombre + " "+ aPaterno + " " + aMaterno;
	}
	/**
	 * @return Devuelve numEmpRegistro.
	 */
	public String getNumEmpRegistro() {
		return numEmpRegistro;
	}
	/**
	 * @param numEmpRegistro El numEmpRegistro a establecer.
	 */
	public void setNumEmpRegistro(String numEmpRegistro) {
		this.numEmpRegistro = numEmpRegistro;
	}
	/**
	 * @return Devuelve puesto.
	 */
	public String getPuesto() {
		return puesto;
	}
	/**
	 * @param puesto El puesto a establecer.
	 */
	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}
	/**
	 * @return Devuelve puestoId.
	 */
	public int getPuestoId() {
		return puestoId;
	}
	/**
	 * @param puestoId El puestoId a establecer.
	 */
	public void setPuestoId(int puestoId) {
		this.puestoId = puestoId;
	}
	/**
	 * @return Devuelve puestoVO.
	 */
	public CandidatoExpressVO getPuestoVO() {
		return puestoVO;
	}
	/**
	 * @param puestoVO El puestoVO a establecer.
	 */
	public void setPuestoVO(CandidatoExpressVO puestoVO) {
		this.puestoVO = puestoVO;
	}
	/**
	 * @return Devuelve rfc.
	 */
	public String getRfc() {
		return rfc;
	}
	/**
	 * @param rfc El rfc a establecer.
	 */
	public void setRfc(String rfc) {
		this.rfc = rfc;
	}
	/**
	 * @return Devuelve sexo.
	 */
	public String getSexo() {
		return sexo;
	}
	/**
	 * @param sexo El sexo a establecer.
	 */
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	/**
	 * @return Devuelve telefono.
	 */
	public String getTelefono() {
		return telefono;
	}
	/**
	 * @param telefono El telefono a establecer.
	 */
	public void setTelefono(String telefono) {
		if(telefono.lastIndexOf("-")>-1){
			String[] tel = telefono.split("-");
			this.lada = tel[0];
			this.telefono = tel[1];
		}else{
			if(telefono.length()>8)
			{
				this.lada = telefono.substring(0,2);
				this.telefono = telefono.substring(2,telefono.length());
			}
			else
				this.telefono = telefono;
		}
	}
	
	/**
	 * @return Devuelve ciudadActualDesc.
	 */
	public String getCiudadActualDesc() {
		return ciudadActualDesc;
	}
	/**
	 * @param ciudadActualDesc El ciudadActualDesc a establecer.
	 */
	public void setCiudadActualDesc(String ciudadActualDesc) {
		this.ciudadActualDesc = ciudadActualDesc;
	}
	/**
	 * @return Devuelve ciudadInteres1Desc.
	 */
	public String getCiudadInteres1Desc() {
		return ciudadInteres1Desc;
	}
	/**
	 * @param ciudadInteres1Desc El ciudadInteres1Desc a establecer.
	 */
	public void setCiudadInteres1Desc(String ciudadInteres1Desc) {
		this.ciudadInteres1Desc = ciudadInteres1Desc;
	}
	/**
	 * @return Devuelve ciudadInteres2Desc.
	 */
	public String getCiudadInteres2Desc() {
		return ciudadInteres2Desc;
	}
	/**
	 * @param ciudadInteres2Desc El ciudadInteres2Desc a establecer.
	 */
	public void setCiudadInteres2Desc(String ciudadInteres2Desc) {
		this.ciudadInteres2Desc = ciudadInteres2Desc;
	}
	/**
	 * @return Devuelve estadoActualDesc.
	 */
	public String getEstadoActualDesc() {
		return estadoActualDesc;
	}
	/**
	 * @param estadoActualDesc El estadoActualDesc a establecer.
	 */
	public void setEstadoActualDesc(String estadoActualDesc) {
		this.estadoActualDesc = estadoActualDesc;
	}
	/**
	 * @return Devuelve estadoInteres1Desc.
	 */
	public String getEstadoInteres1Desc() {
		return estadoInteres1Desc;
	}
	/**
	 * @param estadoInteres1Desc El estadoInteres1Desc a establecer.
	 */
	public void setEstadoInteres1Desc(String estadoInteres1Desc) {
		this.estadoInteres1Desc = estadoInteres1Desc;
	}
	/**
	 * @return Devuelve estadoInteres2Desc.
	 */
	public String getEstadoInteres2Desc() {
		return estadoInteres2Desc;
	}
	/**
	 * @param estadoInteres2Desc El estadoInteres2Desc a establecer.
	 */
	public void setEstadoInteres2Desc(String estadoInteres2Desc) {
		this.estadoInteres2Desc = estadoInteres2Desc;
	}
	
	/**
	 * @return Devuelve ciudadInteres.
	 */
	public String getCiudadInteres() {
		return ciudadInteres;
	}
	/**
	 * @param ciudadInteres El ciudadInteres a establecer.
	 */
	public void setCiudadInteres(String ciudadInteres) {
		this.ciudadInteres = ciudadInteres;
	}
	/**
	 * @return Devuelve estadoInteres.
	 */
	public String getEstadoInteres() {
		return estadoInteres;
	}
	/**
	 * @param estadoInteres El estadoInteres a establecer.
	 */
	public void setEstadoInteres(String estadoInteres) {
		this.estadoInteres = estadoInteres;
	}
	
	/**
	 * @return Devuelve ciudadInteresDesc.
	 */
	public String getCiudadInteresDesc() {
		return ciudadInteresDesc;
	}
	/**
	 * @param ciudadInteresDesc El ciudadInteresDesc a establecer.
	 */
	public void setCiudadInteresDesc(String ciudadInteresDesc) {
		this.ciudadInteresDesc = ciudadInteresDesc;
	}
	/**
	 * @return Devuelve estadoInteresDesc.
	 */
	public String getEstadoInteresDesc() {
		return estadoInteresDesc;
	}
	/**
	 * @param estadoInteresDesc El estadoInteresDesc a establecer.
	 */
	public void setEstadoInteresDesc(String estadoInteresDesc) {
		this.estadoInteresDesc = estadoInteresDesc;
	}
	
	/**
	 * @return Devuelve fechaActualiza.
	 */
	public Date getFechaActualiza() {
		return fechaActualiza;
	}
	/**
	 * @param fechaActualiza El fechaActualiza a establecer.
	 */
	public void setFechaActualiza(Date fechaActualiza) {
		this.fechaActualiza = fechaActualiza;
	}
	/**
	 * @return Devuelve usuarioActualiza.
	 */
	public String getUsuarioActualiza() {
		return usuarioActualiza;
	}
	/**
	 * @param usuarioActualiza El usuarioActualiza a establecer.
	 */
	public void setUsuarioActualiza(String usuarioActualiza) {
		this.usuarioActualiza = usuarioActualiza;
	}
	/**
	 * @return Devuelve entrevistaComp.
	 */
	public String getEntrevistaComp() {
		return entrevistaComp;
	}
	/**
	 * @param entrevistaComp El entrevistaComp a establecer.
	 */
	public void setEntrevistaComp(String entrevistaComp) {
		this.entrevistaComp = entrevistaComp;
	}
	
	/**
	 * @return Devuelve estSocioeco.
	 */
	public String getEstSocioeco() {
		return estSocioeco;
	}
	/**
	 * @param estSocioeco El estSocioeco a establecer.
	 */
	public void setEstSocioeco(String estSocioeco) {
		this.estSocioeco = estSocioeco;
	}
	
	/**
	 * @return Devuelve strFechaRegistro.
	 */
	public String getStrFechaRegistro() {
		return strFechaRegistro;
	}
	/**
	 * @param strFechaRegistro El strFechaRegistro a establecer.
	 */
	public void setStrFechaRegistro(String strFechaRegistro) {
		this.strFechaRegistro = strFechaRegistro;
	}
	
	/**
	 * @return Devuelve posicionConcat.
	 */
	public String getPosicionConcat() {
		return posicionConcat;
	}
	/**
	 * @param posicionConcat El posicionConcat a establecer.
	 */
	public void setPosicionConcat(String posicionConcat) {
		this.posicionConcat = posicionConcat;
	}
	/**
	 * @return Devuelve reingreso.
	 */
	public int getReingreso() {
		return reingreso;
	}
	/**
	 * @param reingreso El reingreso a establecer.
	 */
	public void setReingreso(int reingreso) {
		this.reingreso = reingreso;
	}
	/**
	 * @param string
	 */
	public void setProcesos(String string) {
		this.proceso = string;
		
	}
	
	public String getProcesos(){
		return proceso;
	}
	
	/**
	 * @return Devuelve isVentas.
	 */
	public int isVentas() {
		return ventas;
	}
	/**
	 * @param isVentas El isVentas a establecer.
	 */
	public void setVentas(int isVentas) {
		ventas = isVentas;
	}

	public String getDescMedio() {
		return descMedio;
	}
	public void setDescMedio(String descMedio) {
		this.descMedio = descMedio;
	}
	/**
	 * @return Devuelve lada.
	 */
	public String getLada() {
		return lada;
	}
	/**
	 * @param lada El lada a establecer.
	 */
	public void setLada(String lada) {
		this.lada = lada;
	}
	
	
	/**
	 * @return Devuelve colonia.
	 */
	public String getColonia() {
		return colonia;
	}
	/**
	 * @param colonia El colonia a establecer.
	 */
	public void setColonia(String colonia) {
		this.colonia = colonia;
	}
	/**
	 * @return Devuelve ventas.
	 */
	public int getVentas() {
		return ventas;
	}
}

