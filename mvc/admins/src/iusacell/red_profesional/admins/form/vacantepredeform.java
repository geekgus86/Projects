package iusacell.red_profesional.admins.form;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import java.math.*;
import java.util.*;

@Entity
@Table(name="Vacantes_Pre",schema="CU_CONSULTAE")

public class vacantepredeform {

	@Id
	@Column(name = "id_vacpre")
	private BigDecimal id_vacpre;
	@Column(name = "puesto_ofre")
	private String puesto_ofre;
	@Column(name = "desc_emp")
	private String desc_emp;
	@Column(name = "edad")
	private String edad;
	@Column(name = "escolaridad")
	private String escolaridad;
	@Column(name = "func_respo")
	private String func_respo;
	@Column(name = "compe")
	private String compe;
	@Column(name = "conoci")
	private String conoci;
	@Column(name = "id_vac")
	protected BigDecimal id_vac;
	@Column(name = "status")
	protected BigDecimal status;
	
	
	public BigDecimal getId_vac() {
		return id_vac;
	}
	public void setId_vac(BigDecimal id_vac) {
		this.id_vac = id_vac;
	}
	public BigDecimal getStatus() {
		return status;
	}
	public void setStatus(BigDecimal status) {
		this.status = status;
	}
	public BigDecimal getId_vacpre() {
		return id_vacpre;
	}
	public void setId_vacpre(BigDecimal id_vacpre) {
		this.id_vacpre = id_vacpre;
	}
	public String getPuesto_ofre() {
		return puesto_ofre;
	}
	public void setPuesto_ofre(String puesto_ofre) {
		this.puesto_ofre = puesto_ofre;
	}
	public String getDesc_emp() {
		return desc_emp;
	}
	public void setDesc_emp(String desc_emp) {
		this.desc_emp = desc_emp;
	}
	public String getEdad() {
		return edad;
	}
	public void setEdad(String edad) {
		this.edad = edad;
	}
	public String getEscolaridad() {
		return escolaridad;
	}
	public void setEscolaridad(String escolaridad) {
		this.escolaridad = escolaridad;
	}
	public String getFunc_respo() {
		return func_respo;
	}
	public void setFunc_respo(String func_respo) {
		this.func_respo = func_respo;
	}
	public String getCompe() {
		return compe;
	}
	public void setCompe(String compe) {
		this.compe = compe;
	}
	public String getConoci() {
		return conoci;
	}
	public void setConoci(String conoci) {
		this.conoci = conoci;
	}

}
