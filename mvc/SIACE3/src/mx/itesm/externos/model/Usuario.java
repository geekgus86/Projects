package mx.itesm.externos.model;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "Usuario")
@XmlType(propOrder = {"apellidomaterno", "apellidopaterno", "areapersonal", "curp", "clavearea","clavecampus", "clavecategoria", "clavecoas", "clavecontrato", "clavedivisionpersonal", "clavefuncionorganizativa", "claveistitucion", "clavepuesto", "claverecinto", "claverectoria", "clavesubdivisionpersonal", "claveunidadorg", "desccampus", "desccontrato", "descPuesto", "descrectoria", "descUnidadorg", "email", "estatus", "fechagraciaacad", "fechaaraciaadmv", "fechainactivainmediat", "fechanacimiento", "grupopersonal", "idpersona", "imss", "nombre", "nomina", "numeropersonal", "pidm", "puestoacademicos", "rfc", "sociedad"})
public class Usuario {
	
	private String apellidoMaterno;
	private String apellidoPaterno;
	private String areaPersonal;
	private String curp;
	private String claveArea;
	private String claveCampus;
	private String claveCategoria;
	private String claveCoas;
	private String claveContrato;
	private String claveDivisionPersonal;
	private String claveFuncionOrganizativa;
	private String claveInstitucion;
	private String clavePuesto;
	private String claveRecinto;
	private String claveRectoria;
	private String claveSubDivisionPersonal;
	private String claveUnidadOrg;
	private String descCampus;
	private String descContrato;
	private String descPuesto;
	private String descRectoria;
	private String descUnidadOrg;
	private String email;
	private String estatus;
	private String fechaGraciaAcad;
	private String fechaGraciaAdmv;
	private String fechaInactivaInmediat;
	private String fechaNacimiento;
	private String grupoPersonal;
	private String IDPersona;
	private String imss;
	private String nombre;
	private String nomina;
	private String numeroPersonal;
	private String pidm;
	private String puestoAcademicos;
	private String rfc;
	private String Return;
	private String sociedad;
	
	@XmlElement
	public String getApellidoMaterno() {
		return apellidoMaterno;
	}
	public void setApellidoMaterno(String apellidoMaterno) {
		this.apellidoMaterno = apellidoMaterno;
	}
	@XmlElement
	public String getApellidoPaterno() {
		return apellidoPaterno;
	}
	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}
	@XmlElement
	public String getAreaPersonal() {
		return areaPersonal;
	}
	public void setAreaPersonal(String areaPersonal) {
		this.areaPersonal = areaPersonal;
	}
	@XmlElement
	public String getCurp() {
		return curp;
	}
	public void setCurp(String curp) {
		this.curp = curp;
	}
	@XmlElement
	public String getClaveArea() {
		return claveArea;
	}
	public void setClaveArea(String claveArea) {
		this.claveArea = claveArea;
	}
	@XmlElement
	public String getClaveCampus() {
		return claveCampus;
	}
	public void setClaveCampus(String claveCampus) {
		this.claveCampus = claveCampus;
	}
	@XmlElement
	public String getClaveCategoria() {
		return claveCategoria;
	}
	public void setClaveCategoria(String claveCategoria) {
		this.claveCategoria = claveCategoria;
	}
	@XmlElement
	public String getClaveCoas() {
		return claveCoas;
	}
	public void setClaveCoas(String claveCoas) {
		this.claveCoas = claveCoas;
	}
	@XmlElement
	public String getClaveContrato() {
		return claveContrato;
	}
	public void setClaveContrato(String claveContrato) {
		this.claveContrato = claveContrato;
	}
	@XmlElement
	public String getClaveDivisionPersonal() {
		return claveDivisionPersonal;
	}
	public void setClaveDivisionPersonal(String claveDivisionPersonal) {
		this.claveDivisionPersonal = claveDivisionPersonal;
	}
	@XmlElement
	public String getClaveFuncionOrganizativa() {
		return claveFuncionOrganizativa;
	}
	public void setClaveFuncionOrganizativa(String claveFuncionOrganizativa) {
		this.claveFuncionOrganizativa = claveFuncionOrganizativa;
	}
	@XmlElement
	public String getClaveInstitucion() {
		return claveInstitucion;
	}
	public void setClaveInstitucion(String claveInstitucion) {
		this.claveInstitucion = claveInstitucion;
	}
	@XmlElement
	public String getClavePuesto() {
		return clavePuesto;
	}
	public void setClavePuesto(String clavePuesto) {
		this.clavePuesto = clavePuesto;
	}
	@XmlElement
	public String getClaveRecinto() {
		return claveRecinto;
	}
	public void setClaveRecinto(String claveRecinto) {
		this.claveRecinto = claveRecinto;
	}
	@XmlElement
	public String getClaveRectoria() {
		return claveRectoria;
	}
	public void setClaveRectoria(String claveRectoria) {
		this.claveRectoria = claveRectoria;
	}
	@XmlElement
	public String getClaveSubDivisionPersonal() {
		return claveSubDivisionPersonal;
	}
	public void setClaveSubDivisionPersonal(String claveSubDivisionPersonal) {
		this.claveSubDivisionPersonal = claveSubDivisionPersonal;
	}
	@XmlElement
	public String getClaveUnidadOrg() {
		return claveUnidadOrg;
	}
	public void setClaveUnidadOrg(String claveUnidadOrg) {
		this.claveUnidadOrg = claveUnidadOrg;
	}
	@XmlElement
	public String getDescCampus() {
		return descCampus;
	}
	public void setDescCampus(String descCampus) {
		this.descCampus = descCampus;
	}
	@XmlElement
	public String getDescContrato() {
		return descContrato;
	}
	public void setDescContrato(String descContrato) {
		this.descContrato = descContrato;
	}
	@XmlElement
	public String getDescPuesto() {
		return descPuesto;
	}
	public void setDescPuesto(String descPuesto) {
		this.descPuesto = descPuesto;
	}
	@XmlElement
	public String getDescRectoria() {
		return descRectoria;
	}
	public void setDescRectoria(String descRectoria) {
		this.descRectoria = descRectoria;
	}
	@XmlElement
	public String getDescUnidadOrg() {
		return descUnidadOrg;
	}
	public void setDescUnidadOrg(String descUnidadOrg) {
		this.descUnidadOrg = descUnidadOrg;
	}
	@XmlElement
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@XmlElement
	public String getEstatus() {
		return estatus;
	}
	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	@XmlElement
	public String getFechaGraciaAcad() {
		return fechaGraciaAcad;
	}
	public void setFechaGraciaAcad(String fechaGraciaAcad) {
		this.fechaGraciaAcad = fechaGraciaAcad;
	}
	@XmlElement
	public String getFechaGraciaAdmv() {
		return fechaGraciaAdmv;
	}
	public void setFechaGraciaAdmv(String fechaGraciaAdmv) {
		this.fechaGraciaAdmv = fechaGraciaAdmv;
	}
	@XmlElement
	public String getFechaInactivaInmediat() {
		return fechaInactivaInmediat;
	}
	public void setFechaInactivaInmediat(String fechaInactivaInmediat) {
		this.fechaInactivaInmediat = fechaInactivaInmediat;
	}
	@XmlElement
	public String getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(String fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	@XmlElement
	public String getGrupoPersonal() {
		return grupoPersonal;
	}
	public void setGrupoPersonal(String grupoPersonal) {
		this.grupoPersonal = grupoPersonal;
	}
	@XmlElement
	public String getIDPersona() {
		return IDPersona;
	}
	public void setIDPersona(String iDPersona) {
		IDPersona = iDPersona;
	}
	@XmlElement
	public String getImss() {
		return imss;
	}
	public void setImss(String imss) {
		this.imss = imss;
	}
	@XmlElement
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	@XmlElement
	public String getNomina() {
		return nomina;
	}
	public void setNomina(String nomina) {
		this.nomina = nomina;
	}
	@XmlElement
	public String getNumeroPersonal() {
		return numeroPersonal;
	}
	public void setNumeroPersonal(String numeroPersonal) {
		this.numeroPersonal = numeroPersonal;
	}
	@XmlElement
	public String getPidm() {
		return pidm;
	}
	public void setPidm(String pidm) {
		this.pidm = pidm;
	}
	@XmlElement
	public String getPuestoAcademicos() {
		return puestoAcademicos;
	}
	public void setPuestoAcademicos(String puestoAcademicos) {
		this.puestoAcademicos = puestoAcademicos;
	}
	@XmlElement
	public String getrfc() {
		return rfc;
	}
	public void setrfc(String rfc) {
		rfc = rfc;
	}
	public String getReturn() {
		return Return;
	}
	public void setReturn(String return1) {
		Return = return1;
	}
	@XmlElement
	public String getSociedad() {
		return sociedad;
	}
	
	public void setSociedad(String sociedad) {
		this.sociedad = sociedad;
	}

	
	

}
