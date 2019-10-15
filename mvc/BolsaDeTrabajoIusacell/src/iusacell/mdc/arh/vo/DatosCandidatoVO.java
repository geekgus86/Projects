package iusacell.mdc.arh.vo;

import java.util.List;

public class DatosCandidatoVO {

	public int idCandidato;
	public String nombre;
	public String apellidoPaterno;
	public String appellidoMaterno;
	public int estadoCivil;
	public int hijos;
	public String calle;
	public String numExt;
	public String numInt;
	public String cp;
	public String estado;
	public String telefono;
	public String telefonoRef;
	public String celular;
	public String gdoEstudios;
	public String institucion;
	public String fechaInicio;
	public String fechaFin;
	public String CursandoActual;
	public String fechaInicioCA;
	@SuppressWarnings("rawtypes")
	public List expLaboral;
	@SuppressWarnings("rawtypes")
	public List familiares;
	public String docObtenido;
	public String ciudad;
	public String colonia;
	
	/**
	 * @return Devuelve apellidoPaterno.
	 */
	public String getApellidoPaterno() {
		return apellidoPaterno;
	}
	/**
	 * @param apellidoPaterno El apellidoPaterno a establecer.
	 */
	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}
	/**
	 * @return Devuelve appellidoMaterno.
	 */
	public String getAppellidoMaterno() {
		return appellidoMaterno;
	}
	/**
	 * @param appellidoMaterno El appellidoMaterno a establecer.
	 */
	public void setAppellidoMaterno(String appellidoMaterno) {
		this.appellidoMaterno = appellidoMaterno;
	}
	/**
	 * @return Devuelve calle.
	 */
	public String getCalle() {
		return calle;
	}
	/**
	 * @param calle El calle a establecer.
	 */
	public void setCalle(String calle) {
		this.calle = calle;
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
	 * @return Devuelve cursandoActual.
	 */
	public String getCursandoActual() {
		return CursandoActual;
	}
	/**
	 * @param cursandoActual El cursandoActual a establecer.
	 */
	public void setCursandoActual(String cursandoActual) {
		CursandoActual = cursandoActual;
	}
	/**
	 * @return Devuelve estado.
	 */
	public String getEstado() {
		return estado;
	}
	/**
	 * @param estado El estado a establecer.
	 */
	public void setEstado(String estado) {
		this.estado = estado;
	}
	/**
	 * @return Devuelve estadoCivil.
	 */
	public int getEstadoCivil() {
		return estadoCivil;
	}
	/**
	 * @param estadoCivil El estadoCivil a establecer.
	 */
	public void setEstadoCivil(int estadoCivil) {
		this.estadoCivil = estadoCivil;
	}
	/**
	 * @return Devuelve expLaboral.
	 */
	@SuppressWarnings("rawtypes")
	public List getExpLaboral() {
		return expLaboral;
	}
	/**
	 * @param expLaboral El expLaboral a establecer.
	 */
	@SuppressWarnings("rawtypes")
	public void setExpLaboral(List expLaboral) {
		this.expLaboral = expLaboral;
	}
	/**
	 * @return Devuelve familiares.
	 */
	@SuppressWarnings("rawtypes")
	public List getFamiliares() {
		return familiares;
	}
	/**
	 * @param familiares El familiares a establecer.
	 */
	@SuppressWarnings("rawtypes")
	public void setFamiliares(List familiares) {
		this.familiares = familiares;
	}
	/**
	 * @return Devuelve fechaFin.
	 */
	public String getFechaFin() {
		return fechaFin;
	}
	
	/**
	 * @return Devuelve fechaInicio.
	 */
	public String getFechaInicio() {
		
		return fechaInicio;
	}
	/**
	 * @param fechaInicio El fechaInicio a establecer.
	 */
	public void setFechaInicio(String fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	/**
	 * @return Devuelve fechaInicioCA.
	 */
	public String getFechaInicioCA() {
		return fechaInicioCA;
	}
	/**
	 * @param fechaInicioCA El fechaInicioCA a establecer.
	 */
	public void setFechaInicioCA(String fechaInicioCA) {
		this.fechaInicioCA = fechaInicioCA;
	}
	/**
	 * @return Devuelve gdoEstudios.
	 */
	public String getGdoEstudios() {
		return gdoEstudios;
	}
	/**
	 * @param gdoEstudios El gdoEstudios a establecer.
	 */
	public void setGdoEstudios(String gdoEstudios) {
		this.gdoEstudios = gdoEstudios;
	}
	/**
	 * @return Devuelve hijos.
	 */
	public int getHijos() {
		return hijos;
	}
	/**
	 * @param hijos El hijos a establecer.
	 */
	public void setHijos(int hijos) {
		this.hijos = hijos;
	}
	/**
	 * @return Devuelve idCandidato.
	 */
	public int getIdCandidato() {
		return idCandidato;
	}
	/**
	 * @param idCandidato El idCandidato a establecer.
	 */
	public void setIdCandidato(int idCandidato) {
		this.idCandidato = idCandidato;
	}
	/**
	 * @return Devuelve institucion.
	 */
	public String getInstitucion() {
		return institucion;
	}
	/**
	 * @param institucion El institucion a establecer.
	 */
	public void setInstitucion(String institucion) {
		this.institucion = institucion;
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
	 * @return Devuelve numExt.
	 */
	public String getNumExt() {
		return numExt;
	}
	/**
	 * @param numExt El numExt a establecer.
	 */
	public void setNumExt(String numExt) {
		this.numExt = numExt;
	}
	/**
	 * @return Devuelve numInt.
	 */
	public String getNumInt() {
		return numInt;
	}
	/**
	 * @param numInt El numInt a establecer.
	 */
	public void setNumInt(String numInt) {
		this.numInt = numInt;
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
		this.telefono = telefono;
	}
	/**
	 * @return Devuelve telefonoRef.
	 */
	public String getTelefonoRef() {
		return telefonoRef;
	}
	/**
	 * @param telefonoRef El telefonoRef a establecer.
	 */
	public void setTelefonoRef(String telefonoRef) {
		this.telefonoRef = telefonoRef;
	}
	public String getDocObtenido() {
		return docObtenido;
	}
	public void setDocObtenido(String docObtenido) {
		this.docObtenido = docObtenido;
	}
	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}
	public String getCiudad() {
		return ciudad;
	}
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}
	public String getColonia() {
		return colonia;
	}
	public void setColonia(String colonia) {
		this.colonia = colonia;
	}
	
	
}