package com.iusa.clases.models;

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
@Table(name="\"vacante\"",schema="CU_CONSULTAE")

public class Vacante {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="sec_vac")
	@SequenceGenerator(name="sec_vac", sequenceName="sec_vac")
	@Column(name = "\"id_vacante\"")
	private BigDecimal idVacante;
	@Column(name = "\"nombre_vacante\"")
	private String nombreVacante;
	@Column(name = "\"folio\"")
	private String folio;
	@Column(name = "\"fecha_publicacion\"")
	private Date fechaPublicacion;
	@Column(name = "\"fecha_vigencia\"")
	private String fechaVigencia;
	@Column(name = "\"texto_introductorio\"")
	private String textoIntroductorio;
	@Column(name = "\"escolaridad\"")
	private String escolaridad;
	@Column(name = "\"sueldo_vacante\"")
	private float sueldoVacante;
	@Column(name = "\"anios_experiencia\"")
	private BigDecimal aniosExperiencia;
	@Column(name = "\"conocimientos\"")
	private String conocimientos;
	@Column(name = "\"talentos\"")
	private String talentos;
	@Column(name = "\"ubicacion\"")
	private String ubicacion;
	@Column(name = "\"estado_vacante\"")
	private String estadoVacante;
	@Column(name = "\"destacado\"")
	private BigDecimal destacado;
	@Column(name = "\"area_experiencia\"")
	private String areaExperiencia;
	@Column(name = "\"principales_funciones\"")
	private String prinFuncionesVacante;
	@Column(name = "\"tipo_vacante\"")
	private BigDecimal tipoVacante;
	@Column(name = "\"horario\"")
	private String horario;
	@Column(name = "\"edad\"")
	private String edad;
	@Column(name = "\"observaciones\"")
	private String observaciones;
	@Column(name = "\"subido_por\"")
	private BigDecimal subidoPor;
	@Column(name = "\"genero_preferencia\"")
	private String genero_preferencia;
	@Column(name = "\"vacante_esta_en\"")
	private String vacante_esta_en;
	@Column(name = "\"destacado_nacional\"")
	private BigDecimal destacado_nacional;
	@Column(name = "\"region\"")
	private BigDecimal region;
	@Column(name = "\"estado\"")
	private String estados;
	@Column(name = "\"muni\"")
	private String muni;
	@Column(name = "correo")
	private String correo;
	@Column(name = "tel")
	private String tel;
	
	
	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public BigDecimal getIdVacante() {
		return idVacante;
	}

	public String getEstados() {
		return estados;
	}

	public void setEstados(String estados) {
		this.estados = estados;
	}

	public String getMuni() {
		return muni;
	}

	public void setMuni(String muni) {
		this.muni = muni;
	}

	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}

	public String getNombreVacante() {
		return nombreVacante;
	}

	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
	}

	public String getFolio() {
		return folio;
	}

	public void setFolio(String folio) {
		this.folio = folio;
	}

	public Date getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(Date fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public String getFechaVigencia() {
		return fechaVigencia;
	}

	public void setFechaVigencia(String fechaVigencia) {
		this.fechaVigencia = fechaVigencia;
	}

	public String getTextoIntroductorio() {
		return textoIntroductorio;
	}

	public void setTextoIntroductorio(String textoIntroductorio) {
		this.textoIntroductorio = textoIntroductorio;
	}

	public String getEscolaridad() {
		return escolaridad;
	}

	public void setEscolaridad(String escolaridad) {
		this.escolaridad = escolaridad;
	}

	public float getSueldoVacante() {
		return sueldoVacante;
	}

	public void setSueldoVacante(float sueldoVacante) {
		this.sueldoVacante = sueldoVacante;
	}

	public BigDecimal getAniosExperiencia() {
		return aniosExperiencia;
	}

	public void setAniosExperiencia(BigDecimal aniosExperiencia) {
		this.aniosExperiencia = aniosExperiencia;
	}

	public String getConocimientos() {
		return conocimientos;
	}

	public void setConocimientos(String conocimientos) {
		this.conocimientos = conocimientos;
	}

	public String getTalentos() {
		return talentos;
	}

	public void setTalentos(String talentos) {
		this.talentos = talentos;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public String getEstadoVacante() {
		return estadoVacante;
	}

	public void setEstadoVacante(String estadoVacante) {
		this.estadoVacante = estadoVacante;
	}

	public BigDecimal getDestacado() {
		return destacado;
	}

	public void setDestacado(BigDecimal destacado) {
		this.destacado = destacado;
	}

	public String getAreaExperiencia() {
		return areaExperiencia;
	}

	public void setAreaExperiencia(String areaExperiencia) {
		this.areaExperiencia = areaExperiencia;
	}

	public String getPrinFuncionesVacante() {
		return prinFuncionesVacante;
	}

	public void setPrinFuncionesVacante(String prinFuncionesVacante) {
		this.prinFuncionesVacante = prinFuncionesVacante;
	}

	public BigDecimal getTipoVacante() {
		return tipoVacante;
	}

	public void setTipoVacante(BigDecimal tipoVacante) {
		this.tipoVacante = tipoVacante;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	public String getEdad() {
		return edad;
	}

	public void setEdad(String edad) {
		this.edad = edad;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public BigDecimal getSubidoPor() {
		return subidoPor;
	}

	public void setSubidoPor(BigDecimal subidoPor) {
		this.subidoPor = subidoPor;
	}

	public String getGenero_preferencia() {
		return genero_preferencia;
	}

	public void setGenero_preferencia(String genero_preferencia) {
		this.genero_preferencia = genero_preferencia;
	}

	public String getVacante_esta_en() {
		return vacante_esta_en;
	}

	public void setVacante_esta_en(String vacante_esta_en) {
		this.vacante_esta_en = vacante_esta_en;
	}

	public BigDecimal getDestacado_nacional() {
		return destacado_nacional;
	}

	public void setDestacado_nacional(BigDecimal destacado_nacional) {
		this.destacado_nacional = destacado_nacional;
	}

	public BigDecimal getRegion() {
		return region;
	}

	public void setRegion(BigDecimal region) {
		this.region = region;
	}
	
}
